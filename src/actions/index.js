import reddit from '../apis/reddit';
import axios from 'axios';
import { FETCH_POSTS, SEARCH_SUBS, ADD_SUBREDDIT, REMOVE_SUBREDDIT } from './types';
import { pull } from 'lodash';

export const fetchPosts = (subreddits) => (dispatch) => {
    console.log(subreddits);
    const sub_map = subreddits.map((subreddit) => {
        return reddit.get(`/r/${subreddit}/top/.json`);
    });
    axios.all(sub_map).then((res) => {
        dispatch({
            type: FETCH_POSTS,
            payload: res
        })
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
    const { search } = getState();
    dispatch({
        type: ADD_SUBREDDIT,
        payload: subreddit
    });
    return dispatch(fetchPosts([...search.subreddits, subreddit]));
}

export const removeSubreddit = (subreddit) => (dispatch, getState) => { 
    const currentState = getState();
    dispatch({
        type: REMOVE_SUBREDDIT,
        payload: subreddit
    });
    console.log(currentState);
    
    return dispatch(fetchPosts(pull(currentState.search.subreddits, subreddit)));
}