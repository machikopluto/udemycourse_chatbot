import React from 'react';
import { Link } from 'react-router-dom';
import './ChatbotItem.css'; // CSSファイルをインポート

const ChatbotItem = ({ chatbot, isSelected, onToggleSelect, onDelete }) => {
    return (
        <div className={`chatbot-item ${isSelected ? 'selected' : ''}`}>
            <div className="chatbot-info">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(chatbot.id)}
                />
                <div className="chatbot-details">
                    <h3>{chatbot.name}</h3>
                    <p>{chatbot.description}</p>
                    <div className="chatbot-meta">
                        <span>作成日: {chatbot.createdAt}</span>
                        <span>更新日: {chatbot.updatedAt}</span>
                        <span>作成者: {chatbot.createdBy}</span>
                    </div>
                </div>
            </div>
            <div className="chatbot-actions">
                <Link to={`/chatbot-detail/${chatbot.id}`}>
                    <button className="edit-button">編集</button>
                </Link>
                <button className="delete-button" onClick={() => onDelete(chatbot.id)}>削除</button>
            </div>
        </div>
    );
}

export default ChatbotItem;