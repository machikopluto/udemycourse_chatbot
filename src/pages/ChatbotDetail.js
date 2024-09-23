import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import { openDB } from "idb";

const ChatbotDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chatbotName, setChatbotName] = useState("");
  const [description, setDescription] = useState("");
  const [promptDesign, setPromptDesign] = useState("");
  const [fileName, setFileName] = useState("");

  // Api Keys

  const openAiApiKey = localStorage.getItem("apiKey");
  const pineconeApiKey = localStorage.getItem("pineconeApiKey");
  const pineconeEnvironment = localStorage.getItem("pineconeEnvironment");
  const pineconeIndex = localStorage.getItem("pineconeIndex");

  useEffect(() => {
    const storedChatbots = JSON.parse(localStorage.getItem("chatbots")) || [];
    const chatbot = storedChatbots.find((bot) => bot.id === id);
    if (chatbot) {
      setChatbotName(chatbot.name);
      setDescription(chatbot.description);
      setPromptDesign(chatbot.promptDesign || "");
      setFileName(chatbot.fileName || "");
    }
  }, [id]);

  const handleSave = () => {
    const storedChatbots = JSON.parse(localStorage.getItem("chatbots")) || [];
    const updatedChatbots = storedChatbots.map((bot) =>
      bot.id === id
        ? { ...bot, name: chatbotName, description, promptDesign, fileName }
        : bot
    );
    localStorage.setItem("chatbots", JSON.stringify(updatedChatbots));
    navigate("/chatbots");
  };

  const chatbotID = window.location.href
    .split("/")
    .filter((elem) => elem !== "")[3];

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("chatbotID", chatbotID);
    formData.append("openAiApiKey", openAiApiKey);
    formData.append("pineconeApiKey", pineconeApiKey);
    formData.append("pineconeEnvironment", pineconeEnvironment);
    formData.append("userPineconeIndex", pineconeIndex);

    const apiKey = localStorage.getItem("apiKey");

    if (!apiKey) {
      alert("APIキーをアカウント設定画面で登録してください。");
      return;
    }

    formData.append("apiKey", apiKey);

    try {
      const response = await fetch("http://localhost:3001/api/process-pdf", {
        method: "POST",
        body: formData,
      });
      setFileName(file.name);
      alert("ファイルが無事にアップロードされました。");
    } catch (error) {
      console.error("ファイルの読み込みエラー:", error);
      alert(
        `ファイルの読み込みエラー：${error.message}\n\n詳細はコンソールを確認ください。`
      );
    }
  };

  return (
    <div>
      <h2>チャットボットの詳細設定</h2>
      <div className="button-group right-align">
        <Link to="/chatbots" className="nav-button">
          リストに戻る
        </Link>
      </div>
      <div>
        <label>名前</label>
        <input
          type="text"
          value={chatbotName}
          onChange={(e) => setChatbotName(e.target.value)}
        />
      </div>
      <div>
        <label>詳細</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>プロンプト設定</label>
        <textarea
          value={promptDesign}
          onChange={(e) => setPromptDesign(e.target.value)}
          placeholder="ユーザーが入力したキーワードに関連するストーリーを教えてください。"
        />
      </div>
      <div className="file-upload-section">
        <h3>ナレッジに登録するファイルをアップロードする</h3>
        <FileUpload onFileUpload={handleFileUpload} />
        <div className="uploaded-file">
          アップロードされたファイル：{fileName}
        </div>
      </div>
      <div className="save-button">
        <button onClick={handleSave}>保存</button>
      </div>
    </div>
  );
};

export default ChatbotDetail;
