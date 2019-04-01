import postsReducer from './postsReducer';
import searchReducer from './searchReducer';
import subredditReducer from './subredditReducer';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    search: searchReducer,
    subreddits: subredditReducer,
    posts: postsReducer,
    form: formReducer
    // search: combineReducers({
    //     search_results: searchReducer,
    //     subreddits: subredditReducer,
    // }),
    // posts: combineReducers({
    //     posts: postsReducer,
    // }),
    // form: formReducer
});
