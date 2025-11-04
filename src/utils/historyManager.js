// 履歴管理ユーティリティ
const HISTORY_STORAGE_KEY = 'chatHistory';

/**
 * 全ての履歴を取得
 */
export const getAllHistories = () => {
  const histories = localStorage.getItem(HISTORY_STORAGE_KEY);
  return histories ? JSON.parse(histories) : {};
};

/**
 * 特定のチャットボットの履歴を取得
 */
export const getChatbotHistories = (chatbotId) => {
  const allHistories = getAllHistories();
  return Object.values(allHistories).filter(
    (history) => history.chatbotId === chatbotId
  ).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

/**
 * 特定の履歴を取得
 */
export const getHistory = (historyId) => {
  const allHistories = getAllHistories();
  return allHistories[historyId] || null;
};

/**
 * 新しい履歴を作成
 */
export const createHistory = (chatbotId, messages = []) => {
  const historyId = `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const timestamp = new Date().toISOString();

  const newHistory = {
    id: historyId,
    chatbotId,
    name: `会話 ${new Date().toLocaleString('ja-JP')}`,
    messages,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const allHistories = getAllHistories();
  allHistories[historyId] = newHistory;
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(allHistories));

  return newHistory;
};

/**
 * 履歴を更新
 */
export const updateHistory = (historyId, updates) => {
  const allHistories = getAllHistories();
  const history = allHistories[historyId];

  if (!history) {
    console.error(`History with ID ${historyId} not found`);
    return null;
  }

  const updatedHistory = {
    ...history,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  allHistories[historyId] = updatedHistory;
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(allHistories));

  return updatedHistory;
};

/**
 * 履歴のメッセージを更新
 */
export const updateHistoryMessages = (historyId, messages) => {
  return updateHistory(historyId, { messages });
};

/**
 * 履歴の名前を変更
 */
export const renameHistory = (historyId, newName) => {
  return updateHistory(historyId, { name: newName });
};

/**
 * 履歴を削除
 */
export const deleteHistory = (historyId) => {
  const allHistories = getAllHistories();

  if (!allHistories[historyId]) {
    console.error(`History with ID ${historyId} not found`);
    return false;
  }

  delete allHistories[historyId];
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(allHistories));

  return true;
};

/**
 * 特定のチャットボットの全履歴を削除
 */
export const deleteChatbotHistories = (chatbotId) => {
  const allHistories = getAllHistories();
  const updatedHistories = {};

  Object.keys(allHistories).forEach((historyId) => {
    if (allHistories[historyId].chatbotId !== chatbotId) {
      updatedHistories[historyId] = allHistories[historyId];
    }
  });

  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistories));
  return true;
};
