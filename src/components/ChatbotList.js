import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import editIcon from '../assets/edit-icon_blue.png';
import viewIcon from '../assets/view-icon_blue.png';
import trashIcon from '../assets/trash-icon_red.png';

const ChatbotList = ({ chatbots, setChatbots }) => {
    const navigate = useNavigate();
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleRowClick = (id) => {
        navigate(`/chatbot-use/${id}`);
    };

    const handleCheckboxChange = (id) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.includes(id)
                ? prevSelectedIds.filter((selectedId) => selectedId !== id)
                : [...prevSelectedIds, id]
        );
    };

    const handleDelete = () => {
        if (window.confirm('選択した項目を削除してもよろしいですか？')) {
            const updatedChatbots = chatbots.filter(
                (chatbot) => !selectedIds.includes(chatbot.id)
            );
            setChatbots(updatedChatbots);
            setSelectedIds([]);
            localStorage.setItem('chatbots', JSON.stringify(updatedChatbots));
        }
    };

    const handleSingleDelete = (id) => {
        if (window.confirm('この項目を削除してもよろしいですか？')) {
            const updatedChatbots = chatbots.filter(
                (chatbot) => chatbot.id !== id
            );
            setChatbots(updatedChatbots);
            localStorage.setItem('chatbots', JSON.stringify(updatedChatbots));
        }
    };

    const handleBulkSelect = () => {
        if (selectedIds.length === chatbots.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(chatbots.map((chatbot) => chatbot.id));
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the displayed items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = chatbots.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(chatbots.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className="table-header">
                <div className="actions">
                    {selectedIds.length > 0 && (
                        <button className="button-link" onClick={handleDelete}>削除</button>
                    )}
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectedIds.length === chatbots.length}
                                onChange={handleBulkSelect}
                            />
                        </th>
                        <th>名前</th>
                        <th>説明</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((chatbot) => (
                        <tr key={chatbot.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(chatbot.id)}
                                    onChange={() => handleCheckboxChange(chatbot.id)}
                                />
                            </td>
                            <td onClick={() => handleRowClick(chatbot.id)}>{chatbot.name}</td>
                            <td onClick={() => handleRowClick(chatbot.id)}>{chatbot.description}</td>
                            <td>
                                <div className="table-actions">
                                    <button className="button-link" onClick={() => navigate(`/chatbot-detail/${chatbot.id}`)}>
                                        <img src={editIcon} alt="編集" className="icon" />
                                        編集
                                    </button>
                                    <button className="button-link" onClick={() => navigate(`/chatbot-use/${chatbot.id}`)}>
                                        <img src={viewIcon} alt="表示" className="icon" />
                                        表示
                                    </button>
                                    <button className="button-link-delete" onClick={() => handleSingleDelete(chatbot.id)}>
                                        <img src={trashIcon} alt="削除" className="icon" />
                                        削除
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {pageNumbers.map((number) => (
                    <span key={number} onClick={() => handlePageChange(number)} className={number === currentPage ? 'active' : ''}>
                        {number}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ChatbotList;
