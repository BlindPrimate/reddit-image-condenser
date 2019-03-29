import reddit from '../apis/reddit';
import { FETCH_POSTS } from './types';

export const fetchPosts = () => async (dispatch) => {
    const response = await reddit.get('/r/pics/top/.json');
    dispatch({
        type: FETCH_POSTS,
        payload: response
    })
}