// src/redux/reducers.js

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatbotReducer from './chatbotReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    chatbot: chatbotReducer,
    // その他のリデューサー
});

export default rootReducer;