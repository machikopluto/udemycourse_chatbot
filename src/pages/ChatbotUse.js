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
  const [chatHistories, setChatHistories] = useState([]);
  const [currentHistoryId, setCurrentHistoryId] = useState(null);
  const [historyName, setHistoryName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showHistoryList, setShowHistoryList] = useState(false);

  useEffect(() => {
    const storedChatbots = JSON.parse(localStorage.getItem("chatbots")) || [];
    const bot = storedChatbots.find((b) => b.id === id);
    if (bot) {
      setChatbot(bot);
    }
    loadChatHistories();
  }, [id]);

  const loadChatHistories = () => {
    const histories = JSON.parse(localStorage.getItem(`chatHistories_${id}`)) || [];
    setChatHistories(histories);
  };

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

  const handleSaveHistory = () => {
    if (messages.length === 0) {
      alert("保存するメッセージがありません。");
      return;
    }
    setShowSaveDialog(true);
  };

  const saveHistory = () => {
    if (!historyName.trim()) {
      alert("履歴に名前を付けてください。");
      return;
    }

    const newHistory = {
      id: currentHistoryId || Date.now().toString(),
      chatbotId: id,
      name: historyName,
      messages: messages,
      createdAt: currentHistoryId ? chatHistories.find(h => h.id === currentHistoryId)?.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const histories = JSON.parse(localStorage.getItem(`chatHistories_${id}`)) || [];
    const existingIndex = histories.findIndex(h => h.id === newHistory.id);

    if (existingIndex >= 0) {
      histories[existingIndex] = newHistory;
    } else {
      histories.push(newHistory);
    }

    localStorage.setItem(`chatHistories_${id}`, JSON.stringify(histories));
    setChatHistories(histories);
    setCurrentHistoryId(newHistory.id);
    setShowSaveDialog(false);
    setHistoryName("");
    alert("チャット履歴を保存しました。");
  };

  const loadHistory = (history) => {
    setMessages(history.messages);
    setCurrentHistoryId(history.id);
    setHistoryName(history.name);
    setShowHistoryList(false);
  };

  const deleteHistory = (historyId) => {
    if (!window.confirm("この履歴を削除してもよろしいですか?")) {
      return;
    }

    const histories = chatHistories.filter(h => h.id !== historyId);
    localStorage.setItem(`chatHistories_${id}`, JSON.stringify(histories));
    setChatHistories(histories);

    if (currentHistoryId === historyId) {
      setMessages([]);
      setCurrentHistoryId(null);
      setHistoryName("");
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentHistoryId(null);
    setHistoryName("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src={userIcon} alt="User Icon" />
        <h2>会話 {chatbot.name} {currentHistoryId && historyName && `- ${historyName}`}</h2>
        <div className="chat-info">
          <button onClick={startNewChat} className="nav-button">
            新規チャット
          </button>
          <button onClick={handleSaveHistory} className="nav-button">
            履歴を保存
          </button>
          <button onClick={() => setShowHistoryList(!showHistoryList)} className="nav-button">
            {showHistoryList ? "履歴を閉じる" : "履歴を開く"}
          </button>
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

      {showSaveDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>チャット履歴を保存</h3>
            <input
              type="text"
              value={historyName}
              onChange={(e) => setHistoryName(e.target.value)}
              placeholder="履歴の名前を入力してください"
              className="history-name-input"
            />
            <div className="modal-buttons">
              <button onClick={saveHistory} className="save-button">
                保存
              </button>
              <button onClick={() => {
                setShowSaveDialog(false);
                setHistoryName("");
              }} className="cancel-button">
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {showHistoryList && (
        <div className="history-sidebar">
          <h3>保存された履歴</h3>
          {chatHistories.length === 0 ? (
            <p className="no-history">保存された履歴がありません</p>
          ) : (
            <ul className="history-list">
              {chatHistories.map((history) => (
                <li key={history.id} className="history-item">
                  <div className="history-info">
                    <strong>{history.name}</strong>
                    <small>{new Date(history.updatedAt).toLocaleString()}</small>
                  </div>
                  <div className="history-actions">
                    <button onClick={() => loadHistory(history)} className="load-button">
                      読み込む
                    </button>
                    <button onClick={() => deleteHistory(history.id)} className="delete-button">
                      削除
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="button-group"></div>
    </div>
  );
};

export default ChatbotUse;
