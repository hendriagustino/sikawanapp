const initState = {
  isFetching: false,
  classrooms: [],
  scores: []
}

export const scoreReducer = (state=initState, action) => {

  if(
    action.type === 'GET_STUDENT_SCORE_REQUEST' ||
    action.type === 'GET_SCORE_BY_STUDENT_REQUEST' ||
    action.type === 'ADD_SCORE_REQUEST' ||
    action.type === 'DELETE_SCORE_REQUEST'){
    return {
      ...state,
      isFetching: true
    }
  }

  if(action.type === 'GET_STUDENT_SCORE_SUCCESS'){
    return {
      ...state,
      isFetching: false,
      classrooms: action.payload
    }
  }

  if(action.type === 'GET_STUDENT_SCORE_FAILED'){
    return {
      ...state,
      isFetching: false
    }
  }

  if(action.type === 'GET_SCORE_BY_STUDENT_SUCCESS'){
    return {
      ...state,
      isFetching: false,
      scores: action.payload
    }
  }

  if(action.type === 'GET_SCORE_BY_STUDENT_FAILED'){
    return {
      ...state,
      isFetching: false
    }
  }

  if(action.type === 'ADD_SCORE_SUCCESS'){
    return {
      ...state,
      isFetching: false
    }
  }

  if(action.type === 'ADD_SCORE_FAILED'){
    return {
      ...state,
      isFetching: false
    }
  }

  if(action.type === 'DELETE_SCORE_SUCCESS'){
    return {
      ...state,
      isFetching: false
    }
  }

  if(action.type === 'DELETE_SCORE_FAILED'){
    return {
      ...state,
      isFetching: false
    }
  }

  return state
}