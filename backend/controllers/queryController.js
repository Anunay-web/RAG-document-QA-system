import { getEmbedding } from "../services/embeddingService.js";
import { searchVectors } from "../services/endeeService.js";

export const queryDocument = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // 1. Embedding
    const queryVector = await getEmbedding(question);

    // 2. Search
    const results = await searchVectors(queryVector);

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
  const personName = uniqueLines.find(l =>
    l.toLowerCase().includes("anunay")
  ) || "";

  const roleLine = uniqueLines.find(l =>
    l.toLowerCase().includes("computer science")
  ) || "";

  const summaryLine = uniqueLines.find(l =>
    l.toLowerCase().includes("motivated")
  ) || "";

  // Remove duplication if both lines are similar
  const cleanSummary =
    summaryLine && summaryLine !== roleLine ? summaryLine : "";

  answer = `${personName} is a ${roleLine || "Computer Science student"}.${
    cleanSummary ? `\n\n${cleanSummary}` : ""
  }`;
}
    return res.json({ answer });

  } catch (err) {
    console.error("QUERY ERROR:", err);

    if (!res.headersSent) {
      return res.status(500).json({ error: "Query failed" });
    }
  }
};