import { 
         SEARCH_SUBS_SUCCESS,
       } from "../actions/types";


export const searchReducer = (state = [], action) => {
    switch (action.type) {
        case SEARCH_SUBS_SUCCESS:
            return [...state, ...action.payload]
        default:
            return state;
    }
}