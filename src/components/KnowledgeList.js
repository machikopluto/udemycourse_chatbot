import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import editIcon from '../assets/edit-icon_blue.png';
import viewIcon from '../assets/view-icon_blue.png';
import trashIcon from '../assets/trash-icon_red.png'; // 新しいアイコンをインポート

const KnowledgeList = ({ knowledgeData, setKnowledgeData }) => {
    const navigate = useNavigate();
    const [selectedIds, setSelectedIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleRowClick = (id) => {
        navigate(`/knowledge-view/${id}`);
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
            const updatedKnowledgeData = knowledgeData.filter(
                (knowledge) => !selectedIds.includes(knowledge.id)
            );
            setKnowledgeData(updatedKnowledgeData);
            setSelectedIds([]);
            localStorage.setItem('knowledgeData', JSON.stringify(updatedKnowledgeData));
        }
    };

    const handleSingleDelete = (id) => {
        if (window.confirm('この項目を削除してもよろしいですか？')) {
            const updatedKnowledgeData = knowledgeData.filter(
                (knowledge) => knowledge.id !== id
            );
            setKnowledgeData(updatedKnowledgeData);
            localStorage.setItem('knowledgeData', JSON.stringify(updatedKnowledgeData));
        }
    };

    const handleBulkSelect = () => {
        if (selectedIds.length === knowledgeData.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(knowledgeData.map((knowledge) => knowledge.id));
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the displayed items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = knowledgeData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(knowledgeData.length / itemsPerPage); i++) {
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
                                checked={selectedIds.length === knowledgeData.length}
                                onChange={handleBulkSelect}
                            />
                        </th>
                        <th>名前</th>
                        <th>チャットボットの名前</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((knowledge) => (
                        <tr key={knowledge.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(knowledge.id)}
                                    onChange={() => handleCheckboxChange(knowledge.id)}
                                />
                            </td>
                            <td onClick={() => handleRowClick(knowledge.id)}>{knowledge.name}</td>
                            <td onClick={() => handleRowClick(knowledge.id)}>{knowledge.chatbotName}</td>
                            <td>
                                <div className="table-actions">
                                    <button className="button-link" onClick={() => navigate(`/knowledge-detail/${knowledge.id}`)}>
                                        <img src={editIcon} alt="編集" className="icon" />
                                        編集
                                    </button>
                                    <button className="button-link" onClick={() => navigate(`/knowledge-view/${knowledge.id}`)}>
                                        <img src={viewIcon} alt="表示" className="icon" />
                                        表示
                                    </button>
                                    <button className="button-link-delete" onClick={() => handleSingleDelete(knowledge.id)}>
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

export default KnowledgeList;