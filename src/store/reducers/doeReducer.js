const initState = {
    isFetching: false,
    doe: []
}

export const doeReducer = (state = initState, action) => {
    if (action.type === 'GET_DOE_REQUEST') {
        return {
            ...state,
            isFetching: true
        }
    }
    if (action.type === 'GET_DOE_SUCCESS') {
        return {
            ...state,
            doe: action.payload,
            isFetching: false
        }
    }
    if (action.type === 'GET_DOE_FAILED') {
        return {
            ...state,
            isFetching: false
        }
    }
    if (action.type === ' POST_DOE_REQUEST') {
        return {
            ...state,
            isFetching: true
        }
    }
    if (action.type === 'POST_DOE_SUCCESS') {
        return {
            ...state,
            isFetching: false
        }
    }
    if (action.type === 'POST_DOE_FAILED') {
        return {
            ...state,
            isFetching: false
        }
    }

    if (action.type === 'DELETE_DOE_REQUEST') {
        return {
            ...state,
            isFetching: true
        }
    }
    if (action.type === 'DELETE_DOE_SUCCESS') {
        return {
            ...state,
            isFetching: false
        }
    }
    if (action.type === 'DELETE_DOE_FAILED') {
        return {
            ...state,
            isFetching: false
        }
    }

    if (action.type === 'EDIT_DOE_REQUEST') {
        return {
            ...state,
            isFetching: true
        }
    }
    if (action.type === 'EDIT_DOE_SUCCESS') {
        return {
            ...state,
            isFetching: false
        }
    }
    if (action.type === 'EDIT_DOE_FAILED') {
        return {
            ...state,
            isFetching: false
        }
    }

    return state;
}