const express = require("express");
const router = express.Router();
const { OpenAIEmbeddings } = require("@langchain/openai");

const { Pinecone } = require("@pinecone-database/pinecone");
const { PineconeStore } = require("@langchain/pinecone");

const { loadQAStuffChain } = require("langchain/chains");
const { OpenAI } = require("@langchain/openai");

router.post("/", async (req, res) => {
  const {
    question,
    chatbotID,
    openAiApiKey,
    pineconeApiKey,
    pineconeIndex: userPineConeIndex,
  } = req.body; // Ensure you're extracting the question from the request body

  const pc = new Pinecone({ apiKey: pineconeApiKey });
  const pineconeIndex = pc.index(userPineConeIndex);

  const openaiEmbeddings = new OpenAIEmbeddings({
    apiKey: openAiApiKey,
  });

  const vectorStore = await PineconeStore.fromExistingIndex(openaiEmbeddings, {
    pineconeIndex,
    filter: { uniqueID: { $in: [chatbotID] } },
  });

  const results = await vectorStore.similaritySearch(question, 1); // Get top 5 relevant chunks
  const chain = loadQAStuffChain(
    new OpenAI({
      apiKey: openAiApiKey,
    })
  );

  const answer = await chain._call({
    input_documents: results,
    question,
  });

  res.send(answer);
});
module.exports = router;
