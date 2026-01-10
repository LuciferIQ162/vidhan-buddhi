# Vidhan-Buddhi 🏛️

**Agentic AI for Legislative Research & Sovereign Intelligence**

Vidhan-Buddhi is a local, evidence-backed AI assistant designed for legal professionals and government researchers. It ingests legislative archives, builds a semantic knowledge base, and uses Retrieval-Augmented Generation (RAG) to provide citations-aware answers.

---

## 🚀 System Architecture

- **Backend**: FastAPI service serving ingestion, vector search (ChromaDB), and LLM-based answering (OpenAI/LangChain).
- **Frontend**: React + Vite application (GovConnect Hub) providing a modern query interface.
- **Data**: Ingests `.txt` documents from `data/legacy` and `data/digital`.
- **Privacy**: Runs vector search locally; LLM calls are optional and configurable.

---

## 🛠️ Prerequisites

- **Python** 3.10+
- **Node.js** 18+ (or Bun)
- **OpenAI API Key** (Optional, for "Generate AI Answer" feature)

---

## 🏁 Quick Start Guide

### 1. Backend Setup (API)

The backend handles document processing and semantic search.

1.  **Set up the environment:**
    ```bash
    # Create virtual environment
    python3 -m venv venv
    source venv/bin/activate

    # Install dependencies
    pip install -r requirements.txt
    ```

2.  **Configure Environment Variables:**
    Copy the example file and add your OpenAI key (if using LLM features).
    ```bash
    cp .env.example .env
    # Edit .env to set OPENAI_API_KEY=sk-...
    ```

3.  **Prepare Data:**
    Place your text documents (`.txt`) in the data folders:
    - `data/legacy/` (Archives)
    - `data/digital/` (Current records)

4.  **Run the Server:**
    ```bash
    python3 -m uvicorn api:app --host 0.0.0.0 --port 8000
    ```
    *The API is now running at `http://localhost:8000`. Documentation available at `/docs`.*

### 2. Frontend Setup (UI)

The frontend provides the "GovConnect Hub" interface for research.

1.  **Navigate to the frontend directory:**
    ```bash
    cd rohan/govconnect-hub
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Configure Environment:**
    ```bash
    cp .env.development.example .env.development
    # Ensure VITE_API_BASE matches your backend URL (default: http://localhost:8000)
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    *Open the URL shown in the terminal (usually `http://localhost:8080` or `8081`).*

---

## 📖 How to Operate

### 1. Build the Knowledge Base
Before querying, you must ingest your documents into the vector database.
- **Via UI**: Click the **"Build Knowledge Base"** button in the Research section.
- **Via API**: Run `curl -X POST http://localhost:8000/ingest`.

### 2. Search & Analysis
- **Search**: Enter a query (e.g., *"Mahanadi water dispute history"*) to retrieve relevant document excerpts.
- **AI Answer**: Click **"Generate AI Answer"**. The system will:
  1. Retrieve relevant chunks from your local database.
  2. Send context to OpenAI (GPT-4o/Mini).
  3. Generate a synthesized answer with citations.
  4. Allow you to compare outputs between models (e.g., GPT-4o vs GPT-4o-mini).

### 3. Model Switching
- Use the toggle buttons in the UI to switch between model responses.
- Configure default models in `.env` (`LLM_MODEL`) or frontend `.env.development` (`VITE_OPENAI_MODEL`).

---

## 📂 Project Structure

```
.
├── api.py                 # FastAPI backend endpoints
├── ingest.py              # Standalone ingestion script
├── app.py                 # (Legacy) Streamlit demo
├── data/                  # Document storage
│   ├── legacy/
│   └── digital/
├── db/                    # Persisted ChromaDB vector store
├── requirements.txt       # Python dependencies
└── rohan/govconnect-hub/  # React Frontend application
    ├── src/
    │   ├── components/    # UI Components
    │   └── lib/api.ts     # API client
    └── ...
```

---

## 🛡️ Troubleshooting

- **"Connection Refused"**: Ensure the backend is running on port 8000.
- **"OPENAI_API_KEY not set"**: Check your `.env` file in the root directory and restart the backend.
- **No Results**: Ensure you have run the **Ingest** step and that `data/` folders contain `.txt` files.
