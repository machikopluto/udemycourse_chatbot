import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  // この行を変更
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;