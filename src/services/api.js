import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const getChatbotDetails = async (id) => {
    const response = await api.get(`/chatbots/${id}`);
    return response.data;
};

export const createChatbot = async (chatbotData) => {
    const response = await api.post('/chatbots', chatbotData);
    return response.data;
};

// その他のAPI呼び出し関数