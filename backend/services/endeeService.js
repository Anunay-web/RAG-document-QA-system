let database = [];
export const insertVectors = async (vectors) => {
  database.push(...vectors);
  return { success: true };
};
export const searchVectors = async (queryVector, documentId, question) => {
  const similarity = (a, b) => {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  };
  const results = database
    .filter(v => String(v.metadata.documentId) === String(documentId)) // 🔥 FIX type issue
    .map(v => {
      const sim = similarity(queryVector, v.values);
      const text = v.metadata.text.toLowerCase();
      const query = question.toLowerCase();
      let boost = 0;
      // semantic hint
      if (query.includes("project") && text.includes("project")) {
        boost += 0.5;
      }
      return {
        score: sim + boost,
        metadata: v.metadata
      };
    })
    .sort((a, b) => b.score - a.score)  
    .slice(0, 5);                        
  console.log("DB SIZE:", database.length);
  console.log("FILTERED RESULTS:", results.length);

  return {
    data: {
      matches: results
    }
  };
};