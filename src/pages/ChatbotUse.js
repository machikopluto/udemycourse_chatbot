import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import copyIcon from "../assets/copy-icon.png";
import userIcon from "../assets/user-icon_blue.png";
import sendIcon from "../assets/send-icon.png";
// import { openDB } from "idb";

const ChatbotUse = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatbot, setChatbot] = useState({});
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const storedChatbots = JSON.parse(localStorage.getItem("chatbots")) || [];
    const bot = storedChatbots.find((b) => b.id === id);
    if (bot) {
      setChatbot(bot);
    }
  }, [id]);

  const chatbotID = window.location.href
    .split("/")
    .filter((elem) => elem !== "")[3];

  const handleSend = async () => {
    if (input.trim() === "") return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const openAiApiKey = localStorage.getItem("apiKey");
      const pineconeApiKey = localStorage.getItem("pineconeApiKey");
      const pineconeEnvironment = localStorage.getItem("pineconeEnvironment");
      const pineconeIndex = localStorage.getItem("pineconeIndex");

      // IndexedDBからデータを取得
      // const db = await openDB("KnowledgeDB", 1);
      // console.log(db);
      // const vectorStoreData = await db.get("knowledgeStore", id);

      // console.log(
      //   "Retrieved vector store data:",
      //   JSON.stringify(vectorStoreData, null, 2)
      // );

      // if (vectorStoreData && vectorStoreData.texts && vectorStoreData.metadatas) {
      console.log("Sending request to server with vector store");
      const response = await axios.post(
        "http://localhost:3001/api/generate-response",
        {
          // vectorStore: vectorStoreData,
          question: input,
          chatbotID,
          openAiApiKey,
          pineconeApiKey,
          pineconeEnvironment,
          pineconeIndex,
        }
      );

      console.log("Received response from server:", response.data);
      const botResponse = response.data.text;

      setMessages([...newMessages, { role: "bot", content: botResponse }]);

    } catch (error) {
      console.error("Error generating response:", error);
      if (error.response) {
        console.error("Server error response:", error.response.data);
      }
      alert("Error generating response: " + error.message);
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src={userIcon} alt="User Icon" />
        <h2>会話 {chatbot.name}</h2>
        <div className="chat-info">
          <Link to={`/chatbot-detail/${id}`} className="nav-button">
            設定する
          </Link>
          <Link to="/chatbots" className="nav-button">
            一覧に戻る
          </Link>
        </div>
      </div>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            <div className="message-content">
              <p>
                <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>{" "}
                {msg.content}
              </p>
            </div>
            {msg.role === "bot" && (
              <div
                className="copy-button"
                onClick={() => handleCopy(msg.content)}
              >
                <img src={copyIcon} alt="Copy" className="icon" />
                {isCopied && <span className="copied-feedback">Copied!</span>}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="メッセージを入力してください。"
          className="chat-input"
        />
        <button onClick={handleSend} className="chat-send-button">
          <img src={sendIcon} alt="Send" className="icon" />
        </button>
      </div>
      <div className="button-group"></div>
    </div>
  );
};

export default ChatbotUse;
