import { ADD_SUBREDDIT, REMOVE_SUBREDDIT  } from "../actions/types";
import { uniq, pull } from 'lodash';


export default (state = [], action) => {
    switch (action.type) {
        case ADD_SUBREDDIT:
            return uniq([...state, action.payload]);
        case REMOVE_SUBREDDIT:
            return pull([...state], action.payload);
        default:
            return state;
    }
}