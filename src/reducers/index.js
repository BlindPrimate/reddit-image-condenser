import { createStore, combineReducers } from 'redux';
import postsReducer from './postsReducer';

const rootReducer = combineReducers({
    postsReducer
});

export default createStore(rootReducer);