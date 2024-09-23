import React from 'react';
import { Link } from 'react-router-dom';

const KnowledgeItem = ({ item }) => {
    return (
        <div className="knowledge-item">
            <div className="knowledge-info">
                <div className="knowledge-details">
                    <h3>{item.title}</h3>
                    <p>Chatbot: {item.chatbot}</p>
                    <div className="knowledge-meta">
                        <span>Created at: {item.createdAt}</span>
                        <span>Updated at: {item.updatedAt}</span>
                        <span>Created by: {item.createdBy}</span>
                    </div>
                </div>
            </div>
            <div className="knowledge-actions">
                <Link to={`/knowledge-detail/${item.id}`}>
                    <button className="edit-button">編集</button>
                </Link>
            </div>
        </div>
    );
}

export default KnowledgeItem;