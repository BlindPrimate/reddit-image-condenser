

export const errorReducer = (state = [], action) => {
    const matches = /(.*)_(FAILURE)/.exec(action.type);
    if (!matches) return state;


    const [, requestName, requestState] = matches;

    return {
        ...state,
        [requestName]: requestState === 'FAILURE' ? action.payload : ''
    };
}