import reddit from '../apis/reddit';
import { FETCH_POSTS, SEARCH_SUBS, ADD_SUBREDDIT, REMOVE_SUBREDDIT } from './types';

export const fetchPosts = () => async (dispatch) => {
    const response = await reddit.get('/r/pics/top/.json');
    dispatch({
        type: FETCH_POSTS,
        payload: response
    })
}

export const searchSubs = (search_term) => async (dispatch) => {
    const response = await reddit.get(`/subreddits/search/.json`, {params: {q: search_term}});
    const pruned = response.data.data.children.map((post) => {
        return post.data;
    });
    dispatch({
        type: SEARCH_SUBS,
        payload: pruned
    });
}

export const addSubreddit = (subreddit) => { 
    return {
        type: ADD_SUBREDDIT,
        payload: subreddit
    }
}

export const removeSubreddit = (subreddit) => { 
    return {
        type: REMOVE_SUBREDDIT,
        payload: subreddit
    }
}