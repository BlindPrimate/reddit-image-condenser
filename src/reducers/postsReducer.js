import { FETCH_POSTS } from "../actions/types";

function _prune_payload(pay) {
    return pay.map((item) => {
        return item.data;
    })
}

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_POSTS:
            const payload = _prune_payload(action.payload.data.data.children);
            return [...state, ...payload];
        default:
            return state;
    }
}