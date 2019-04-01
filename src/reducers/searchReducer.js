import { 
         SEARCH_SUBS_SUCCESS,
         SEARCH_SUBS_FAILURE,
       } from "../actions/types";

const initialState = {
    search_results: [],
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_SUBS_SUCCESS:
            return {...state, search_results: action.payload}
        case SEARCH_SUBS_FAILURE:
            return {...state, error: action.payload}
        default:
            return state;
    }
}