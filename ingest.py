from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

import os

print("🔹 Initializing embedding model...")
embedding = HuggingFaceEmbeddings(
    model_name="all-MiniLM-L6-v2"
)

documents = []

print("🔹 Loading legacy documents...")
for file in os.listdir("data/legacy"):
    if file.endswith(".txt"):
        loader = TextLoader(os.path.join("data/legacy", file))
        documents.extend(loader.load())

print("🔹 Loading digital documents...")
for file in os.listdir("data/digital"):
    if file.endswith(".txt"):
        loader = TextLoader(os.path.join("data/digital", file))
        documents.extend(loader.load())

print(f"🔹 Total documents loaded: {len(documents)}")

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=100
)

chunks = splitter.split_documents(documents)

print(f"🔹 Total chunks created: {len(chunks)}")

db = Chroma(
    persist_directory="./db",
    embedding_function=embedding
)

db.add_documents(chunks)
db.persist()

print("✅ Ingestion complete. Knowledge base is ready.")

