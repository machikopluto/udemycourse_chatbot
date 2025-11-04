import React, { useState, useEffect } from 'react';
import { getChatbotHistories, deleteHistory, renameHistory } from '../utils/historyManager';
import '../styles/ChatHistory.css';

const ChatHistory = ({ chatbotId, currentHistoryId, onSelectHistory, onNewChat }) => {
  const [histories, setHistories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  // 履歴を読み込む
  const loadHistories = () => {
    const chatbotHistories = getChatbotHistories(chatbotId);
    setHistories(chatbotHistories);
  };

  useEffect(() => {
    loadHistories();
  }, [chatbotId]);

  // 履歴を選択
  const handleSelectHistory = (history) => {
    if (editingId) return; // 編集中は選択できない
    onSelectHistory(history);
  };

  // 履歴を削除
  const handleDeleteHistory = (historyId, e) => {
    e.stopPropagation(); // 親要素のクリックイベントを防ぐ
    if (window.confirm('この履歴を削除してもよろしいですか?')) {
      deleteHistory(historyId);
      loadHistories();

      // 現在選択している履歴が削除された場合は新しいチャットを開始
      if (currentHistoryId === historyId) {
        onNewChat();
      }
    }
  };

  // 名前変更モードを開始
  const handleStartEdit = (history, e) => {
    e.stopPropagation();
    setEditingId(history.id);
    setEditName(history.name);
  };

  // 名前変更を保存
  const handleSaveEdit = (historyId, e) => {
    if (e) e.stopPropagation();

    if (editName.trim() === '') {
      alert('名前を入力してください');
      return;
    }

    renameHistory(historyId, editName.trim());
    setEditingId(null);
    setEditName('');
    loadHistories();
  };

  // 名前変更をキャンセル
  const handleCancelEdit = (e) => {
    if (e) e.stopPropagation();
    setEditingId(null);
    setEditName('');
  };

  // Enterキーで保存、Escapeキーでキャンセル
  const handleKeyDown = (historyId, e) => {
    if (e.key === 'Enter') {
      handleSaveEdit(historyId);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className="chat-history-sidebar">
      <div className="chat-history-header">
        <h3>会話履歴</h3>
        <button className="new-chat-button" onClick={onNewChat}>
          + 新しい会話
        </button>
      </div>
      <div className="chat-history-list">
        {histories.length === 0 ? (
          <div className="no-history">履歴がありません</div>
        ) : (
          histories.map((history) => (
            <div
              key={history.id}
              className={`history-item ${currentHistoryId === history.id ? 'active' : ''}`}
              onClick={() => handleSelectHistory(history)}
            >
              {editingId === history.id ? (
                <div className="edit-mode" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(history.id, e)}
                    autoFocus
                    className="edit-input"
                  />
                  <div className="edit-buttons">
                    <button
                      className="save-button"
                      onClick={(e) => handleSaveEdit(history.id, e)}
                    >
                      ✓
                    </button>
                    <button
                      className="cancel-button"
                      onClick={handleCancelEdit}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="history-name">{history.name}</div>
                  <div className="history-actions">
                    <button
                      className="edit-button"
                      onClick={(e) => handleStartEdit(history, e)}
                      title="名前を変更"
                    >
                      ✎
                    </button>
                    <button
                      className="delete-button"
                      onClick={(e) => handleDeleteHistory(history.id, e)}
                      title="削除"
                    >
                      🗑
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
