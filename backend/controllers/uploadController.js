import { parsePDF } from "../utils/fileParser.js";
import { chunkText } from "../utils/chunkText.js";
import { getEmbedding } from "../services/embeddingService.js";
import { insertVectors } from "../services/endeeService.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    // rest of code...

    const text = await parsePDF(filePath);
    const chunks = chunkText(text);

    const vectors = [];

    for (let i = 0; i < chunks.length; i++) {
      const embedding = await getEmbedding(chunks[i]);

      vectors.push({
        id: `chunk-${i}`,
        values: embedding,
        metadata: {
          text: chunks[i]
        }
      });
    }

    await insertVectors(vectors);

    res.json({ message: "File processed & stored in Endee" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};