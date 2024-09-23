import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import AccountSettings from './pages/AccountSettings';
import CreateChatbot from './pages/CreateChatbot';
import ChatbotDetail from './pages/ChatbotDetail';
import ChatbotUse from './pages/ChatbotUse';
import KnowledgeManagement from './pages/KnowledgeManagement';
import Chatbots from './pages/Chatbots';
import BlogGenerator from './pages/BlogGenerator';
import './styles/styles.css';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Sidebar />
                <main>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/account-settings" element={<AccountSettings />} />
                        <Route path="/create-chatbot" element={<CreateChatbot />} />
                        <Route path="/chatbot-detail/:id" element={<ChatbotDetail />} />
                        <Route path="/chatbot-use/:id" element={<ChatbotUse />} />
                        <Route path="/knowledge-management" element={<KnowledgeManagement />} />
                        <Route path="/chatbots" element={<Chatbots />} />
                        <Route path="/blog-generator" element={<BlogGenerator />} />
                        <Route path="/" element={
                            <>
                                <h2>あなただけのオリジナルAIを作ろう</h2>
                                <p>ChatGPTのAPIを使って、あなただけのオリジナルAIを作りましょう。</p>
                            </>
                        } />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
