from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

embedding = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
db = Chroma(persist_directory="./db", embedding_function=embedding)

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
    for base in ["data/legacy", "data/digital"]:
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
