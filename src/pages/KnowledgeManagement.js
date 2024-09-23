import React, { useState, useEffect } from 'react';
import KnowledgeList from '../components/KnowledgeList';

const KnowledgeManagement = () => {
    const [knowledgeData, setKnowledgeData] = useState([]);

    useEffect(() => {
        const storedKnowledgeData = JSON.parse(localStorage.getItem('knowledgeData')) || [];
        setKnowledgeData(storedKnowledgeData);
    }, []);

    return (
        <div className="knowledge-management-page">
            <h2>ナレッジ管理</h2>
            <KnowledgeList knowledgeData={knowledgeData} setKnowledgeData={setKnowledgeData} />
        </div>
    );
}

export default KnowledgeManagement;