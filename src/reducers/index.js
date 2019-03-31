import postsReducer from './postsReducer';
import searchReducer from './searchReducer';
import subredditReducer from './subredditReducer';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    search: combineReducers({
        search_results: searchReducer,
        subreddits: subredditReducer
    }),
    posts: postsReducer,
    form: formReducer
});
