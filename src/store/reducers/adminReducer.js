const initState = {
    isFetching: false,
    admin : []
}

export const adminReducer = (state = initState, action) => {

    // SHOW ACTION
    if (action.type === "GET_ADMIN_REQUEST"){
        return{
            ...state,
            isFetching: true
        }
    }
    if (action.type === "GET_ADMIN_SUCCESS"){
        return{
            ...state,
            isFetching: false,
            admin: action.payload
        }
    }
    if (action.type === "GET_ADMIN_FAILED"){
    }

    //  ADD ACTION
    if (action.type === 'ADD_ADMIN_REQUEST'){
        return{
            ...state,
            isFetching: true
        }
    }
    if (action.type === "ADD_ADMIN_SUCCESS"){
        return{
            ...state,
            isFetching: false,
        }
    }
    if (action.type === "ADD_ADMIN_FAILED"){
    }

    return state;
}

