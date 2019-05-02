const initState = {
    isFetching: false,
    classroom : []
}

export const classroomReducer = (state = initState, action) => {

    // SHOW ACTION
    if (action.type === "GET_CLASSROOM_REQUEST"){
        return{
            ...state,
            isFetching: true
        }
    }
    if (action.type === "GET_CLASSROOM_SUCCESS"){
        return{
            ...state,
            isFetching: false,
            classroom: action.payload
        }
    }
    if (action.type === "GET_CLASSROOM_FAILED"){
    }

    // ADD ACTION
    if (action.type === 'ADD_CLASSROOM_REQUEST'){
        return{
            ...state,
            isFetching: true
        }
    }
    if (action.type === "ADD_CLASSROOM_SUCCESS"){
        return{
            ...state,
            isFetching: false,
        }
    }

    if (action.type === "ADD_CLASSROOM_FAILED"){
        return{
            ...state,
            isFetching: false,
        }
    }

    if (action.type === 'DELETE_CLASSROOM_REQUEST'){
        return{
            ...state,
            isFetching: true
        }
    }

    if (action.type === "DELETE_CLASSROOM_SUCCESS"){
        return{
            ...state,
            isFetching: false,
        }
    }

    if (action.type === "DELETE_CLASSROOM_FAILED"){
        return{
            ...state,
            isFetching: false,
        }
    }

    if (action.type === 'UPDATE_CLASSROOM_REQUEST'){
        return{
            ...state,
            isFetching: true
        }
    }
    
    if (action.type === "UPDATE_CLASSROOM_SUCCESS"){
        return{
            ...state,
            isFetching: false,
        }
    }

    if (action.type === "UPDATE_CLASSROOM_FAILED"){
        return{
            ...state,
            isFetching: false,
        }
    }

    return state;
}

