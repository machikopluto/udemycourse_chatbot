import React, { useState } from 'react';

const ChatbotPreview = ({ name, description, prompt }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;
        const userMessage = { role: 'user', content: input };
        const botMessage = { role: 'bot', content: `${prompt} ${input}` }; // プロンプトに基づくダミー応答
        setMessages([...messages, userMessage, botMessage]);
        setInput('');
    };

    return (
        <div>
            <h3>チャットボットプレビュー</h3>
            <p><strong>名前:</strong> {name}</p>
            <p><strong>説明:</strong> {description}</p>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                        <p><strong>{msg.role === 'user' ? 'あなた' : 'ボット'}:</strong> {msg.content}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="メッセージを入力してください..."
                style={{ width: '80%', padding: '10px' }}
            />
            <button onClick={handleSend} style={{ width: '20%', padding: '10px' }}>送信</button>
        </div>
    );
};

export default ChatbotPreview;