import { SEARCH_SUBS } from "../actions/types";


export default (state = [], action) => {
    switch (action.type) {
        case SEARCH_SUBS:
            return [...state, ...action.payload]
        default:
            return state;
    }
}