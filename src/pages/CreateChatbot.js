import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateChatbot = () => {
    const [chatbotName, setChatbotName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newChatbot = {
            id: Date.now().toString(),
            name: chatbotName,
            description,
            prompt: '',
            createdAt: new Date()
        };
        // ローカルストレージにチャットボットを保存
        const storedChatbots = JSON.parse(localStorage.getItem('chatbots')) || [];
        storedChatbots.push(newChatbot);
        localStorage.setItem('chatbots', JSON.stringify(storedChatbots));
        // チャットボット詳細ページにリダイレクト
        navigate(`/chatbot-detail/${newChatbot.id}`);
    };

    return (
        <div className="create-chatbot">
            <h2>チャットボットの作成</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>チャットボットの名前</label>
                    <input
                        type="text"
                        value={chatbotName}
                        onChange={(e) => setChatbotName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>説明</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">チャットボットを作成</button>
            </form>
        </div>
    );
};

export default CreateChatbot;