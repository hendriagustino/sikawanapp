const initState = {
  isFetching: false,
  complaints: []
}

export const complaintReducer = (state = initState, action) => {
  if(
    action.type === 'GET_COMPLAINTS_BY_SCHOOL_REQUEST' ||
    action.type === 'GET_COMPLAINTS_BY_DOE_REQUEST' ||
    action.type === 'APPROVE_COMPLAINT_REQUEST' ||
    action.type === 'ADD_SCHOOL_RESPONSE_REQUEST' ||
    action.type === 'DELETE_SCHOOL_RESPONSE_REQUEST'){
    return {
      ...state,
      isFetching: true,
    }
  }

  if(action.type === 'GET_COMPLAINTS_BY_SCHOOL_SUCCESS'){
    return {
      ...state,
      isFetching: false,
      complaints: action.payload
    }
  }

  if(action.type === 'GET_COMPLAINTS_BY_SCHOOL_FAILED'){
    return {
      ...state,
      isFetching: false,
    }
  }

  if(action.type === 'GET_COMPLAINTS_BY_DOE_SUCCESS'){
    return {
      ...state,
      isFetching: false,
      complaints: action.payload
    }
  }

  if(action.type === 'GET_COMPLAINTS_BY_DOE_FAILED'){
    return {
      ...state,
      isFetching: false,
    }
  }

  if(action.type === 'APPROVE_COMPLAINT_SUCCESS'){
    return {
      ...state,
      isFetching: false,
    }
  }

  if(action.type === 'APPROVE_COMPLAINT_FAILED'){
    return {
      ...state,
      isFetching: false,
    }
  }

  if(action.type === 'ADD_SCHOOL_RESPONSE_SUCCESS'){
    return {
      ...state,
      isFetching: false,
    }
  }

  if(action.type === 'ADD_SCHOOL_RESPONSE_FAILED'){
    return {
      ...state,
      isFetching: false,
    }
  }

  if(action.type === 'DELETE_SCHOOL_RESPONSE_SUCCESS'){
    return {
      ...state,
      isFetching: false,
    }
  }

  if(action.type === 'DELETE_SCHOOL_RESPONSE_FAILED'){
    return {
      ...state,
      isFetching: false,
    }
  }

  return state
}