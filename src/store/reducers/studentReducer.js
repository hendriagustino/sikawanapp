const initState = {
  isFetching: false,
  student: []
}

// export const studentReducer = (state = initState, action) => {
//   if(
//     action.type === 'GET_STUDENT_REQUEST' ||
//     action.type === 'ADD_STUDENT_REQUEST' ||
//     action.type === 'DELETE_STUDENT_REQUEST'){
//     return {
//       ...state,
//       isFetching: true
//     }
//   }

//   if(action.type === 'GET_STUDENT_SUCCESS'){
//     return {
//       ...state,
//       isFetching: false,
//       student: action.payload
//     }
//   }

//   if(action.type === 'GET_STUDENT_FAILED'){
//     return {
//       ...state,
//       isFetching: false,
//       message: action.message
//     }
//   }

//   if(action.type === 'ADD_STUDENT_SUCCESS'){
//     return {
//       ...state,
//       isFetching: false,
//     }
//   }

//   if(action.type === 'ADD_STUDENT_FAILED'){
//     return {
//       ...state,
//       isFetching: false,
//     }
//   }

//   if(action.type === 'DELETE_STUDENT_SUCCESS'){
//     return {
//       ...state,
//       isFetching: false,
//     }
//   }

//   if(action.type === 'DELETE_STUDENT_FAILED'){
//     return {
//       ...state,
//       isFetching: false,
//     }
//   }




//   return state
// }


export const studentReducer = (state = initState, action) => {
  if (action.type === 'GET_STUDENT_REQUEST') {
    return {
      ...state,
      isFetching: true
    }
  }
  if(action.type === 'GET_STUDENT_SUCCESS'){
    return{
      ...state,
      student : action.payload,
      isFetching: false
    }
  }
  if(action.type === 'GET_STUDENT_FAILED'){
    return{
      ...state,
      isFetching: false
    }
  }
  if(action.type === 'ADD_STUDENT_REQUEST'){
    return {
      ...state,
      isFetching: true
    }
  }
  if(action.type === 'ADD_STUDENT_SUCCESS'){
    return {
      ...state,
      isFetching: false
    }
  }
  if(action.type === 'ADD_STUDENT_FAILED'){
    return {
      ...state,
      isFetching: false
    }
  }
  if(action.type === 'DELETE_STUDENT_REQUEST'){
    return{
      ...state,
      isFetching: true
    }
  }
  if(action.type === 'DELETE_STUDENT_SUCCESS'){
    return{
      ...state,
      isFetching: false
    }
  }
  if(action.type === 'DELETE_STUDENT_FAILED'){
    return{
      ...state,
      isFetching: false
    }
  }
  if(action.type === 'EDIT_STUDENT_REQUEST'){
    return {
      ...state,
      isFetching: true
    }
  }
  if(action.type=== 'EDIT_STUDENT_SUCCESS'){
    return{
      ...state,
      isFetching: false
    }
  }
  if(action.type === 'EDIT_STUDENT_FAILED'){
    return{
      ...state,
      isFetching : false
    }
  }

  return state;
}

