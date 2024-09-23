const express = require("express");
const router = express.Router();
const { OpenAIEmbeddings } = require("@langchain/openai");
const { Pinecone } = require("@pinecone-database/pinecone");
const multer = require("multer");
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const { PineconeStore } = require("@langchain/pinecone");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const { chatbotID, openAiApiKey, pineconeApiKey, userPineconeIndex } =
      req.body;

    const pinecone = new Pinecone({
      apiKey: pineconeApiKey,
    });

    const pineconeIndex = pinecone.Index(userPineconeIndex); // Make sure this is a string

    const openaiEmbeddings = new OpenAIEmbeddings({
      apiKey: openAiApiKey,
    });

    const loader = new PDFLoader(filePath); // Load the uploaded PDF
    const docs = await loader.load();
    console.log("docs loaded");

    // Update metadata for each document
    const updatedDocs = docs.map((doc) => {
      doc.metadata.uniqueID = chatbotID;
      return doc;
    });

    console.log(updatedDocs);

    await PineconeStore.fromDocuments(updatedDocs, openaiEmbeddings, {
      pineconeIndex,
    });
    res.send("PDF processed and indexed.");
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
