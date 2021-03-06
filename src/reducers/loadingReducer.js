export const loadingReducer = (state = {}, action) => {
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(action.type);

    if (!matches) return state;

    const [, requestName, requestState] = matches;
    return {
        ...state,
        [requestName]: requestState === 'REQUEST'
    };
}