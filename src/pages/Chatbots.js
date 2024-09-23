import React, { useState, useEffect } from 'react';
import ChatbotList from '../components/ChatbotList';

const Chatbots = () => {
    const [chatbots, setChatbots] = useState([]);

    useEffect(() => {
        const storedChatbots = JSON.parse(localStorage.getItem('chatbots')) || [];
        setChatbots(storedChatbots);
    }, []);

    return (
        <div className="chatbots-page">
            <h2>Chatbot List</h2>
            <ChatbotList chatbots={chatbots} setChatbots={setChatbots} />
        </div>
    );
};

export default Chatbots;