import React, { useState } from "react";
import axios from "axios";
import { Upload, Send, CheckCircle, Loader2, FileText, Sparkles } from "lucide-react";

function App() {
  const [file, setFile] = useState(null);
  const [documentId, setDocumentId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      setDocumentId(res.data.documentId);
    } catch (err) {
      alert("Upload failed. Ensure backend is running at :5000");
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async () => {
    if (!question || !documentId) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/query", { question, documentId });
      setAnswer(res.data.answer);
    } catch (err) {
      alert("Query failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-6 md:p-12">
      <div className="fixed top-0 left-0 w-full h-1 bg-indigo-600"></div>
      
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Sparkles className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">DocuMind AI</h1>
          </div>
          
        </header>

        <main className="space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">1</div>
              <h2 className="font-semibold text-slate-700">Source Document</h2>
            </div>

            {!documentId ? (
              <div className="flex flex-col items-center">
                <label className="w-full flex flex-col items-center justify-center h-40 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 hover:border-indigo-300 transition-all group">
                  <Upload className="text-slate-400 group-hover:text-indigo-500 mb-2 transition-colors" size={30} />
                  <p className="text-sm text-slate-500">
                    {file ? <span className="text-indigo-600 font-medium">{file.name}</span> : "Click to select a PDF"}
                  </p>
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept=".pdf" />
                </label>
                
                {file && (
                  <button 
                    onClick={uploadFile}
                    disabled={loading}
                    className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "Process Document"}
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-emerald-500" size={24} />
                  <div>
                    <p className="text-sm font-bold text-emerald-800">Knowledge Ingested</p>
                    <p className="text-xs text-emerald-600 opacity-80">{file?.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {setDocumentId(""); setFile(null); setAnswer("")}}
                  className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase tracking-wider"
                >
                  Reset
                </button>
              </div>
            )}
          </section>

          <section className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-8 transition-all ${!documentId && 'opacity-50 pointer-events-none'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">2</div>
              <h2 className="font-semibold text-slate-700">Intelligence Query</h2>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Ask me anything about the document..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
                className="w-full pl-4 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <button 
                onClick={askQuestion}
                disabled={loading || !question}
                className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 transition-all"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>

            {/* Answer Display */}
            {answer && (
              <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-start gap-4 p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                    <FileText className="text-indigo-600" size={20} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">AI Response</p>
                    <p className="text-slate-700 leading-relaxed italic">{answer}</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>

        <footer className="mt-12 text-center text-slate-400 text-xs tracking-wide">
          POWRED BY RAG TECHNOLOGY • LOCALHOST:5000
        </footer>
      </div>
    </div>
  );
}

export default App;