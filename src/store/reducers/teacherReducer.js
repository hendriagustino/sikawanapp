const initState = {
  isFetching: false,
  teacher: []
}

export const teacherReducer = (state = initState, action) => {
  if(action.type === 'GET_TEACHER_REQUEST'){
    return {
      ...state,
      isFetching: true
    }
  }
  if(action.type === 'GET_TEACHER_SUCCESS'){
    return {
      ...state,
      teacher: action.payload,
      isFetching: false
    }
  }
  if(action.type === 'GET_TEACHER_FAILED'){
    return {
      ...state,
      isFetching: false
    }
  }

  if(action.type === 'POST_TEACHER_REQUEST' ){
    return {
      ...state,
      isFetching: true
    }
  }
  if(action.type === 'POST_TEACHER_SUCCESS'){
    return {
      ...state,
      isFetching: false
    }
  }
  if(action.type === 'POST_TEACHER_FAILED'){
    return {
      ...state,
      isFetching: false
    }
  }

  if(action.type === 'DELETE_TEACHER_REQUEST' ){
    return {
      ...state,
      isFetching: true
    }
  }
  if(action.type === 'DELETE_TEACHER_SUCCESS'){
    return {
      ...state,
      isFetching: false
    }
  }
  if(action.type === 'DELETE_TEACHER_FAILED'){
    return {
      ...state,
      isFetching: false
    }
  }
  
  if(action.type === 'EDIT_TEACHER_REQUEST'){
    return {
      ...state,
      isFetching: true
    }
  }
  if(action.type === 'EDIT_TEACHER_SUCCESS'){
    return {
      ...state,
      isFetching: false
    }
  }
  if(action.type === 'EDIT_TEACHER_FAILED'){
    return{
      ...state,
      isFetching: false
    }
  }

  return state;
}
