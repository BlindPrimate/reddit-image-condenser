import { FETCH_POSTS, CHANGE_FETCH_STATUS } from "../actions/types";
import _ from 'lodash';

// second map function to remove nested data from reddit responses
function _prune_payload(pay) {
    return pay.map((item) => {
        return item.data;
    });
}

const initialState = {
    data: [],
    isFetching: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            const payload = action.payload.map((sub) => {
                return _prune_payload(sub.data.data.children);
            });

            // merge and sort response data from multiple subs into array sorted by most upvoted
            const merged = _.chain(payload)
                .flatten()
                .orderBy('ups', 'desc')
                .value();

            return {...state, data: merged};
        case CHANGE_FETCH_STATUS:
            return {...state, isFetching: action.payload}
        default:
            return state;
    }
}