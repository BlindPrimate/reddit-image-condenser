import { postsReducer } from './postsReducer';
import { searchReducer } from './searchReducer';
import { subredditReducer } from './subredditReducer';
import { errorReducer } from './errorReducer';
import { loadingReducer } from './loadingReducer';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    search_results: searchReducer,
    subreddits: subredditReducer,
    posts: postsReducer,
    isFetching: loadingReducer,
    form: formReducer,
    errors: errorReducer
});
