const initState = {
  isFetching: false,
  isLogin: false,
  token: '',
  role: '',
  message: ''
}

export const loginReducer = (state = initState, action) => {

  if(action.type === 'LOGIN_REQUEST'){
    return {
      ...state,
      isFetching: true
    } 
  }

  if(action.type === 'LOGIN_SUCCESS'){
    return {
      isFetching: false,
      isLogin: true,
      id: action.id,
      token: action.token,
      role: action.role,
      subjects: action.subjects,
      fullname: action.fullname,
      email: action.email,
      image: action.image
    }
  }

  if(action.type === 'LOGIN_FAIL'){
    return {
      ...state,
      isFetching: false,
      message: action.message
    }
  }

  if(action.type === 'ALREADY_LOGIN'){
    return{
      ...state,
      token: action.token,
      role: action.role,
      fullname: action.fullname,
      email: action.email,
      image: action.image,
      isLogin: true
    }
  }

  if(action.type === 'NOT_LOGIN'){
    return state
  }

  if(action.type === 'LOG_OUT'){
    return {
      ...state,
      isLogin: false
    }
  }

  return state;
}

