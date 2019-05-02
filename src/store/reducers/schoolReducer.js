const initState = {
    isFetching: false,
    school: []
}

export const schoolReducer = (state = initState, action) => {
    if (action.type === 'GET_SCHOOL_REQUEST') {
        return {
            ...state,
            isFetching: true
        }
    }
    if (action.type === 'GET_SCHOOL_SUCCESS') {
        return {
            ...state,
            school: action.payload,
            isFetching: false
        }
    }
    if (action.type === 'GET_SCHOOL_FAILED') {
        return {
            ...state,
            isFetching: false
        }
    }

    if (action.type === 'POST_SCHOOL_REQUEST') {
        return {
            ...state,
            isFetching: true
        }
    }
    if (action.type === 'POST_SCHOOL_SUCCESS') {
        return {
            ...state,
            isFetching: false
        }
    }
    if (action.type === 'POST_SCHOOL_SUCCESS') {
        return {
            ...state,
            isFetching: false
        }
    }
    if (action.type === 'POST_TEACHER_FAILED') {
        return {
            ...state,
            isFetching: false
        }
    }

    if (action.type === 'DELETE_TEACHER_REQUEST') {
        return {
            ...state,
            isFetching: true
        }
    }
    if (action.type === 'DELETE_TEACHER_SUCCESS') {
        return {
            ...state,
            isFetching: false
        }
    }

    if (action.type === 'DELETE_TEACHER_FAILED'){
        return {
            ...state,
            isFetching: false
        }
    }

    if(action.type === 'EDIT_SCHOOL_REQUEST'){
        return{
            ...state,
            isFetching: true
        }
    }
    if(action.type === 'EDIT_SCHOOL_SUCCESS'){
        return {
            ...state,
            isFetching: false
        }
    }
    if(action.type=== 'EDIT_SCHOOL_FAILED'){
        return {
            ...state,
            isFetching: false
        }
    }

    return state;
}