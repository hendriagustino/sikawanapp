const initState = {
  isFetching: false,
  attendance: []
}

export const attendanceReducer = (state = initState, action) => {
  if(action.type === 'ADD_ATTENDANCE_REQUEST'){
    return {
      ...state,
      isFetching: true
    }
  }

  if(action.type === 'ADD_ATTENDANCE_SUCCESS'){
    return {
      ...state,
      isFetching: false
    }
  }

  if(action.type === 'ADD_ATTENDANCE_FAILED'){
    return {
      ...state,
      isFetching: false
    }
  }

  return state
}