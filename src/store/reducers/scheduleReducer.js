const initState = {
  failMsg: '',
  isFail: false,
  isFetching: false,
  schedules: [],
  schedule: {
    classroom: {
      fullname: ''
    }
  },
  student: [],
}

export const scheduleReducer = (state = initState, action) => {
  if(
    action.type === 'GET_SCHEDULE_REQUEST' ||
    action.type === 'GET_SCHEDULE_BY_TEACHER_REQUEST' ||
    action.type === 'GET_SCHEDULE_HISTORY_BY_TEACHER_REQUEST' ||
    action.type === 'GET_SCHEDULE_HISTORY_DETAIL_BY_TEACHER_REQUEST' ||
    action.type === 'ADD_SCHEDULE_REQUEST' ||
    action.type === 'DELETE_SCHEDULE_REQUEST' ||
    action.type === 'GET_SCHEDULE_DETAIL_REQUEST'
  ){
    return {
      ...state,
      isFetching: true
    }
  }

  if(action.type === 'GET_SCHEDULE_SUCCESS'){
    return {
      ...state,
      isFetching: false,
      schedules: action.payload
    }
  }

  if(action.type === 'GET_SCHEDULE_FAIL'){
    return {
      ...state,
      isFetching: false,
      isFail: true,
      failMsg: action.message
    }
  }

  if(action.type === 'GET_SCHEDULE_DETAIL_SUCCESS'){
    return {
      ...state,
      isFetching: false,
      student: action.payload.students,
      schedule: action.payload.schedule
    }
  }

  if(action.type === 'GET_SCHEDULE_DETAIL_FAILED'){
    return {
      ...state,
      isFetching: false,
      message: action.message
    }
  }

  if(action.type === 'GET_SCHEDULE_BY_TEACHER_SUCCESS'){
    return {
      ...state,
      isFetching: false,
      schedules: action.payload
    }
  }

  if(action.type === 'GET_SCHEDULE_BY_TEACHER_FAIL'){
    return {
      ...state,
      isFetching: false,
      isFail: true,
      failMsg: action.message
    }
  }

  if(action.type === 'GET_SCHEDULE_HISTORY_BY_TEACHER_SUCCESS'){
    return {
      ...state,
      isFetching: false,
      schedules: action.payload
    }
  }

  if(action.type === 'GET_SCHEDULE_HISTORY_BY_TEACHER_FAIL'){
    return {
      ...state,
      isFetching: false,
      isFail: true,
      failMsg: action.message
    }
  }

  if(action.type === 'GET_SCHEDULE_HISTORY_DETAIL_BY_TEACHER_SUCCESS'){
    return {
      ...state,
      isFetching: false,
      student: action.payload.students,
      schedule: action.payload.schedule
    }
  }

  if(action.type === 'GET_SCHEDULE_HISTORY_DETAIL_BY_TEACHER_FAILED'){
    return {
      ...state,
      isFetching: false,
      message: action.message
    }
  }

  if(action.type === 'ADD_SCHEDULE_SUCCESS'){
    return {
      ...state,
      isFetching: false
    }
  }

  if(action.type === 'ADD_SCHEDULE_FAILED'){
    return {
      ...state,
      isFetching: false
    }
  }

  if(action.type === 'DELETE_SCHEDULE_SUCCESS'){
    return {
      ...state,
      isFetching: false
    }
  }

  if(action.type === 'DELETE_SCHEDULE_FAILED'){
    return {
      ...state,
      isFetching: false
    }
  }

  return state
}
