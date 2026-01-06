from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
DB_DIR = os.getenv("DB_DIR", "./db")
DATA_DIR_LEGACY = os.getenv("DATA_DIR_LEGACY", "data/legacy")
DATA_DIR_DIGITAL = os.getenv("DATA_DIR_DIGITAL", "data/digital")
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4o-mini")

embedding = HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL)
db = Chroma(persist_directory=DB_DIR, embedding_function=embedding)

class QueryIn(BaseModel):
    query: str
    k: int = 5

@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "Vidhan-Buddhi API",
        "endpoints": ["POST /ingest", "POST /query", "GET /docs"],
    }

@app.get("/ingest")
def ingest_get():
    return {
        "detail": "Use POST /ingest to build the knowledge base.",
        "example": "curl -X POST http://localhost:8000/ingest",
    }

@app.get("/query")
def query_get():
    return {
        "detail": "Use POST /query with JSON body: { query: string, k?: number }",
        "example": "curl -X POST http://localhost:8000/query -H 'Content-Type: application/json' -d '{\"query\":\"...\",\"k\":3}'",
    }

@app.post("/ingest")
def ingest():
    documents = []
    for base in [DATA_DIR_LEGACY, DATA_DIR_DIGITAL]:
        if os.path.isdir(base):
            for file in os.listdir(base):
                if file.endswith(".txt"):
                    loader = TextLoader(os.path.join(base, file))
                    documents.extend(loader.load())
    splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100)
    chunks = splitter.split_documents(documents)
    if chunks:
        db.add_documents(chunks)
        db.persist()
    return {"added": len(chunks)}

@app.post("/query")
def query(body: QueryIn):
    results = db.similarity_search(body.query, k=body.k)
    return {
        "matches": [
            {
                "content": r.page_content,
                "metadata": r.metadata,
            }
            for r in results
        ]
    }

class AnswerIn(BaseModel):
    query: str
    k: int = 5
    model: str = LLM_MODEL

@app.post("/answer")
def answer(body: AnswerIn):
    key = os.getenv("OPENAI_API_KEY")
    if not key:
        raise HTTPException(status_code=400, detail="OPENAI_API_KEY not set")
    results = db.similarity_search(body.query, k=body.k)
    context = "\n\n".join([r.page_content for r in results])
    llm = ChatOpenAI(api_key=key, model=body.model, temperature=0)
    prompt = f"Use the provided context to answer the query.\n\nContext:\n{context}\n\nQuery:\n{body.query}\n\nAnswer with citations where possible."
    resp = llm.invoke(prompt)
    return {
        "answer": resp.content,
        "used_chunks": len(results),
        "model": body.model,
    }
