import reddit from '../apis/reddit';
import axios from 'axios';
import { FETCH_POSTS, SEARCH_SUBS, ADD_SUBREDDIT, REMOVE_SUBREDDIT } from './types';
import { pull } from 'lodash';

export const fetchPosts = () => async (dispatch, getState) => {
    const { subreddits } = getState().search;
    const sub_map = subreddits.map((subreddit) => {
        return reddit.get(`/r/${subreddit}/top/.json`);
    });
    const res = await axios.all(sub_map);
    dispatch({
        type: FETCH_POSTS,
        payload: res
    });
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

export const addSubreddit = (subreddit) => (dispatch, getState) => { 
    const { subreddits } = getState().search;
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