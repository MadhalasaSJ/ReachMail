const { ChromaClient } = require("chromadb");
const fs = require("fs");

const chroma = new ChromaClient();
const contextData = JSON.parse(fs.readFileSync("./src/data/context.json"));

async function loadContext() {
  const collection = await chroma.getOrCreateCollection({ name: "context" });

  for (const item of contextData) {
    await collection.add({
      ids: [item.id],
      documents: [item.content],
      metadatas: [{ source: "context" }],
    });
  }

  return collection;
}

module.exports = { loadContext };
