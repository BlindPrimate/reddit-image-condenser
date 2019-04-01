import reddit from '../apis/reddit';
import axios from 'axios';
import { FETCH_POSTS_REQUEST, 
         FETCH_POSTS_SUCCESS, 
         FETCH_POSTS_FAILURE, 
         SEARCH_SUBS_REQUEST,
         SEARCH_SUBS_SUCCESS,
         SEARCH_SUBS_FAILURE,
         ADD_SUBREDDIT, 
         REMOVE_SUBREDDIT, 
        } from './types';

export const fetchPosts = () => async (dispatch, getState) => {

    dispatch({
        type: FETCH_POSTS_REQUEST
    });

    const { subreddits } = getState();
    const sub_map = subreddits.map((subreddit) => {
        return reddit.get(`/r/${subreddit}/top/.json`);
    });

    try {
        const res = await axios.all(sub_map);
        dispatch({
            type: FETCH_POSTS_SUCCESS,
            payload: res
        });
    } catch (err) {
        dispatch({
            type: FETCH_POSTS_FAILURE,
            payload: err
        });
    }
}

export const searchSubs = (search_term) => async (dispatch) => {

    dispatch({
        type: SEARCH_SUBS_REQUEST,
    });

    try {
        const response = await reddit.get(`/subreddits/search/.json`, {params: {q: search_term}});
        if (response.data.data.children.length < 0) {
            dispatch({
                type: SEARCH_SUBS_FAILURE,
                payload: null
            });
            return 
        }
        const pruned = response.data.data.children.map((post) => {
            return post.data;
        });
        dispatch({
            type: SEARCH_SUBS_SUCCESS,
            payload: pruned
        });
    } catch (err) {
        dispatch({
            type: SEARCH_SUBS_FAILURE,
            payload: err
        });
    }
}

export const addSubreddit = (subreddit) => (dispatch, getState) => { 
    const { subreddits } = getState();
    dispatch({
        type: ADD_SUBREDDIT,
        payload: subreddit
    });
    dispatch(fetchPosts([...subreddits, subreddit]));
}

export const removeSubreddit = (subreddit) => (dispatch, getState) => { 
    const { subreddits } = getState().search;
    dispatch({
        type: REMOVE_SUBREDDIT,
        payload: subreddit
    });
    dispatch(fetchPosts(subreddits));
}
