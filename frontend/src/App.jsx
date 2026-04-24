import React, { useState } from "react";
import axios from "axios";
import { 
  Upload, 
  Send, 
  FileText, 
  CheckCircle, 
  Loader2, 
  Sparkles, 
  XCircle,
  Database,
  ShieldCheck,
  Cpu
} from "lucide-react";

const App = () => {
  const [file, setFile] = useState(null);
  const [documentId, setDocumentId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle file selection
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnswer("");
  };

  // Upload Logic
  const uploadFile = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      
      // Replace with your actual backend URL
      const res = await axios.post("http://localhost:5000/upload", formData);
      setDocumentId(res.data.documentId);
    } catch (err) {
      console.error(err);
      alert("System Error: Failed to ingest document.");
    } finally {
      setLoading(false);
    }
  };

  // Query Logic
  const askQuestion = async () => {
    if (!question || !documentId) return;
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/query", {
        question,
        documentId,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      alert("Neural Link Failure: Query could not be processed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30">
      
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full" />
        <div className="absolute top-[60%] -right-[5%] w-[30%] h-[30%] bg-cyan-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto py-12 px-6">
        
        {/* Header Section */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <Cpu size={14} className="text-indigo-400" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-400 uppercase">Neural Processing Unit Active</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              RAG-Based
            </span>
            <br /> Document Intelligence System
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
            Extract insights and query complex PDFs using advanced Retrieval-Augmented Generation.
          </p>
        </header>

        <main className="grid gap-8">
          
          {/* Step 1: Document Ingestion */}
          <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
                <Database size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white leading-none">Document Ingestion</h2>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Phase 01: Vectorization</p>
              </div>
            </div>

            {!documentId ? (
              <div className="space-y-4">
                <label className="relative group flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-800 rounded-2xl hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all cursor-pointer">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <Upload className="mb-3 text-slate-600 group-hover:text-indigo-400 transition-colors" size={32} />
                    <p className="text-sm font-medium text-slate-400">
                      {file ? <span className="text-indigo-400 font-bold">{file.name}</span> : "Drop PDF or Click to Browse"}
                    </p>
                    <p className="text-[10px] text-slate-600 mt-2">PDF, DOCX, or TXT up to 20MB</p>
                  </div>
                  <input type="file" className="hidden" onChange={onFileChange} accept=".pdf,.doc,.docx,.txt" />
                </label>
                
                {file && (
                  <button 
                    onClick={uploadFile}
                    disabled={loading}
                    className="w-full bg-white hover:bg-slate-100 text-black font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <><Sparkles size={20} /> Initialize Ingestion</>}
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-emerald-500 rounded-full">
                    <CheckCircle className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-400">Index Finalized</p>
                    <p className="text-xs text-slate-400 truncate max-w-[200px]">{file?.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {setDocumentId(""); setFile(null); setAnswer("")}}
                  className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                >
                  <XCircle size={22} />
                </button>
              </div>
            )}
          </section>

          {/* Step 2: Contextual Query */}
          <section className={`transition-all duration-700 ${!documentId ? "opacity-30 blur-[2px] pointer-events-none" : "opacity-100"}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-cyan-600 rounded-2xl shadow-lg shadow-cyan-500/20">
                <Send size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white leading-none">Intelligence Query</h2>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Phase 02: Semantic Retrieval</p>
              </div>
            </div>

            <div className="relative group">
              <input
                type="text"
                placeholder="Query the document insights..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-5 pl-6 pr-16 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/5 transition-all shadow-xl"
              />
              <button 
                onClick={askQuestion}
                disabled={loading || !question}
                className="absolute right-3 top-3 bottom-3 px-5 bg-cyan-600 text-white rounded-xl hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 transition-all flex items-center justify-center shadow-lg shadow-cyan-600/20"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>

            {/* Answer Panel */}
            {answer && (
              <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden animate-in slide-in-from-top-6 duration-500 shadow-2xl">
                <div className="px-6 py-3 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={14} className="text-cyan-400" /> Synthesized Response
                  </span>
                </div>
                <div className="p-8 leading-relaxed text-slate-200">
                  <p className="whitespace-pre-wrap">{answer}</p>
                </div>
              </div>
            )}
          </section>
        </main>

        <footer className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            Local Instance: 127.0.0.1:5000
          </p>
          <div className="flex gap-6">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-mono text-slate-500 uppercase">Vector Database Linked</span>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;