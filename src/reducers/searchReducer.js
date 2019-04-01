import { SEARCH_SUBS, CHANGE_FETCH_STATUS } from "../actions/types";

const initialState = {
    search_results: [],
    isFetching: false
}
export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_SUBS:
            return {...state, search_results: action.payload};
        case CHANGE_FETCH_STATUS:
            return {...state, isFetching: action.payload};
        default:
            return state;
    }
}