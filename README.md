# 🚀 DocuMind AI – Intelligent Document Query System (RAG)

DocuMind AI is a **Retrieval-Augmented Generation (RAG)** system that enables users to query documents using natural language.
It combines **semantic search, vector embeddings, and a local LLM** to generate accurate, context-aware answers.

---

## 🧠 Features

* 🔍 Semantic search using embeddings (MiniLM)
* 📄 PDF parsing and intelligent text chunking
* 🧮 Vector similarity search (cosine similarity)
* 🤖 Local LLM (Flan-T5) for answer generation
* 🧹 Context filtering to remove noise (emails, links, etc.)
* 📊 Handles both descriptive and count-based queries
* 🌐 Full-stack application (Node.js + React)

---

## ⚙️ Tech Stack

**Backend**

* Node.js
* Express.js
* @xenova/transformers

**Frontend**

* React.js
* Axios

**AI / ML**

* Embeddings: all-MiniLM-L6-v2
* LLM: flan-t5-small
* Similarity: Cosine Similarity

---

## 🏗️ System Architecture

PDF → Text Extraction → Chunking → Embeddings → Vector Store
User Query → Embedding → Similarity Search → Top Context → LLM → Answer

---

## 📂 Project Structure

documind-ai/
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── frontend/
│   └── src/
└── README.md

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Anunay-web/documind-ai.git
cd documind-ai
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Usage

1. Upload a PDF document
2. System processes and stores embeddings
3. Ask questions like:

   * "What is this document about?"
   * "How many projects are mentioned?"
4. Get answers based on document content

---

## 🧩 Endee Integration

This project is built using concepts inspired by Endee:

* Vector database design
* Semantic search pipeline
* Retrieval-based AI system

🔗 Endee Fork: https://github.com/Anunay-web/endee

---

## ⚡ Challenges

* Removing noisy text (emails, links)
* Improving retrieval accuracy
* Managing local LLM performance
* Designing efficient RAG pipeline

---

## 🚀 Future Improvements

* Use scalable vector DB (Endee / Pinecone)
* Multi-document querying
* Hybrid search (keyword + semantic)
* Streaming responses

---

## 👨‍💻 Author

**Anunay Kumar**
B.Tech CSE | AI & Full Stack Enthusiast

---

## ⭐ Summary

DocuMind AI demonstrates how modern AI systems combine **retrieval + generation** to build practical, real-world applications.
