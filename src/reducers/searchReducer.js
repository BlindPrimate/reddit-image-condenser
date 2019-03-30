import { SEARCH_SUBS, ADD_SUBREDDIT, REMOVE_SUBREDDIT  } from "../actions/types";
import { uniq, remove } from 'lodash';

const initial_state = {
    search_options: [],
    subreddits: []
}

export default (state = initial_state, action) => {
    switch (action.type) {
        case SEARCH_SUBS:
            return {...state, search_options: [...action.payload]};
        case ADD_SUBREDDIT:
            const payload = uniq([...state.subreddits, action.payload]);
            return {...state, subreddits: payload};
        case REMOVE_SUBREDDIT:
            const removed_arr = remove(state.subreddits, (subreddit) => subreddit !== action.payload);
            return {...state, subreddits: removed_arr};
        default:
            return state;
    }
}