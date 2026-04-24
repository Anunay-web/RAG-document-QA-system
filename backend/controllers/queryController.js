import { getEmbedding } from "../services/embeddingService.js";
import { searchVectors } from "../services/endeeService.js";

export const queryDocument = async (req, res) => {
  try {
    const { question, documentId } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }
    // Embedding
    const queryVector = await getEmbedding(question);
    // Search
    const results = await searchVectors(queryVector, documentId, question);
    const matches = results?.data?.matches || [];
    const contexts = matches
      .map(m => m?.metadata?.text || "")
      .join("\n");
    const lines = contexts
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);
    const uniqueLines = [...new Set(lines)];

let answer = "No relevant information found.";

if (uniqueLines.length > 0) {

  const q = question.toLowerCase();
  if (q.includes("how many") || q.includes("number of")) {
  const projectIndex = uniqueLines.findIndex(line =>
    line.toLowerCase().includes("project")
  );
  if (projectIndex !== -1) {
    const projectSection = uniqueLines.slice(projectIndex + 1);
    const stopIndex = projectSection.findIndex(line =>
      line.toLowerCase().includes("skills") ||
      line.toLowerCase().includes("education") ||
      line.toLowerCase().includes("certification") ||
      line.toLowerCase().includes("internship")
    );
    const cleanProjects = stopIndex !== -1
      ? projectSection.slice(0, stopIndex)
      : projectSection;
    const projects = cleanProjects.filter(line => {
  const lower = line.toLowerCase();

  return (
    (line.includes("–") || line.includes("-")) &&  
    !lower.includes("tech stack") &&
    !lower.includes("built") &&
    !lower.includes("implemented") &&
    !lower.includes("developed") &&
    !lower.includes("using") &&
    line.length < 100   // 
  );
});
    const count = projects.length;
    answer = count > 0
      ? `There are ${count} projects mentioned in the document.`
      : "Could not determine project count.";

  } else {
    answer = "Project section not found in the document.";
  }
} 
  else {
    // Default: return clean context
    answer = uniqueLines.slice(0, 5).join("\n");
  }
}
console.log("MATCHES:", matches);
console.log("CONTEXT:", contexts);
    return res.json({ answer });

  } 
  catch (err) {
    console.error("QUERY ERROR:", err);

    if (!res.headersSent) {
      return res.status(500).json({ error: "Query failed" });
    }
  }
};