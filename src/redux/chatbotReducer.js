// src/redux/chatbotReducer.js

const initialState = {
    chatbots: [],
    currentChatbot: null,
};

const chatbotReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CHATBOTS_SUCCESS':
            return {
                ...state,
                chatbots: action.payload,
            };
        case 'CREATE_CHATBOT_SUCCESS':
            return {
                ...state,
                chatbots: [...state.chatbots, action.payload],
            };
        case 'SET_CURRENT_CHATBOT':
            return {
                ...state,
                currentChatbot: action.payload,
            };
        default:
            return state;
    }
};

export default chatbotReducer;