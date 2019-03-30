import postsReducer from './postsReducer';
import searchReducer from './searchReducer';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    search_options: searchReducer,
    posts: postsReducer,
    form: formReducer
});
