let database = [];

export const insertVectors = async (vectors) => {
  database.push(...vectors);
  return { success: true };
};

export const searchVectors = async (queryVector) => {
  console.log("DB SIZE:", database.length); 

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
    .map(v => ({
      score: similarity(queryVector, v.values),
      metadata: v.metadata
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  console.log("RESULTS FOUND:", results.length); 

  return { data: { matches: results } };
};