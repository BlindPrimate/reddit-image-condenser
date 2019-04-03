import { FETCH_POSTS_SUCCESS } from "../actions/types";
import _ from 'lodash';

// second map function to remove nested data from reddit responses
function _prune_payload(pay) {
    return pay.map((item) => {
        return item.data;
    });
}

export const postsReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            const payload = action.payload.map((sub) => {
                return _prune_payload(sub.data.data.children);
            });

            // merge and sort response data from multiple subs into array sorted by most upvoted
            const merged = _.chain(payload)
                .flatten()
                .orderBy('ups', 'desc')
                .value();

            return [...merged]

        default:
            return state;
    }
}