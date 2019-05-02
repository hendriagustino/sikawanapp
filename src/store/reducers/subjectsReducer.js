const initState = {
    isFetching: false,
    subjects: []
}

export const subjectsReducer = ( state = initState, action) => {
    if (action.type === "GET_SUBJECTS_REQUEST"){
        return {
            ...state,
            isFetching : true
        }
    }
    if (action.type === "GET_SUBJECTS_SUCCESS"){
        return {
            ...state,
            isFetching: false,
            subjects: action.payload
        }
    }
    if (action.type === "GET_SUBJECTS_FAILED"){

    }
    if (action.type === "POST_SUBJECTS_REQUEST"){
        return {
            ...state,
            isFetching: true
        }
    }
    if (action.type === "POST_SUBJECTS_SUCCESS"){
        return {
            ...state,
            isFetching: false
        }
    }
    if (action.type === "POST_SUBJECTS_FAILED"){
        return {
            ...state,
            isFetching: false
        }
    }
    
    if(action.type === "DELETE_SUBJECTS_REQUEST"){
        return {
            ...state,
            isFetching: true
        }
    }
    if (action.type === "DELETE_SUBJECTS_SUCCESS"){
        return {
            ...state,
            isFetching: false
        }
    }
    if (action.type ==="DELETE_SUBJECTS_FAILED"){
        return {
            ...state,
            isFetching: false
        }
    }

    if(action.type === 'EDIT_SUBJECTS_REQUEST'){
        return{
            ...state,
            isFetching: true
        }
    }
    if(action.type === 'EDIT_SUBJECTS_SUCCESS'){
        return{
            ...state,
            isFetching: false
        }
    }
    if(action.type === 'EDIT_SUBJECTS_FAILED'){
        return{
            ...state,
            isFetching: false
        }
    }

    return state;
}
