import { SEARCH_SUBS, ADD_SUBREDDIT, REMOVE_SUBREDDIT  } from "../actions/types";
import { uniq, remove } from 'lodash';

export default (state = [], action) => {
    switch (action.type) {
        case SEARCH_SUBS:
            return [...state, ...action.payload];
        default:
            return state;
    }
}