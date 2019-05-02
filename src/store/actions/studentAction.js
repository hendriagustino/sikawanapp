import Axios from 'axios';
import { alert } from './../../components/modal/Alert';
import { url } from './../../url';

export const getStudent = (token) => dispatch => {
  dispatch({
    type: 'GET_STUDENT_REQUEST'
  })

  return Axios({
    method: 'GET',
    url: `${url}/school/student`,
    headers: {
      Authorization: token
    }
  })
    .then(res => {
      dispatch({
        type: 'GET_STUDENT_SUCCESS',
        payload: res.data.data
      })
    })
    .catch(err => {
      dispatch({
        type: 'GET_STUDENT_FAILED',
        // message: err.response.message
      })
      alert(err.message)
    })
}

export const addStudent = (token, data) => dispatch => {
  dispatch({
    type: 'ADD_STUDENT_REQUEST'
  })
  return Axios({
    method: 'POST',
    url: `${url}/school/student`,
    headers: {
      Authorization: token,
    },
    data: data
  })
    .then(res => {
      dispatch({
        type: 'ADD_STUDENT_SUCCESS'
      });
      alert('Student is added!').then(
        () => {
          dispatch(getStudent(token, data));
        },
        () => { }
      )
    })
    .catch(err => {
      dispatch({
        type: 'ADD_STUDENT_FAILED',
      });
      err.response.data ? alert(err.response.data.message) : alert(err.message)
    })
}

export const editStudent = (token, id, data) => dispatch => {
  dispatch({
    type: 'EDIT_STUDENT_REQUEST'
  })
  return Axios({
    method: 'PUT',
    url: `${url}/school/student/${id}`,
    headers: {
      Authorization: token,
    },
    data: data
  })
    .then(res => {
      dispatch({
        type: 'EDIT_STUDENT_SUCCESS'
      });
      alert('Student is updated!')
      dispatch(getStudent(token, data));  
    })
    .catch(err => {
      dispatch({
        type: 'EDIT_STUDENT_FAILED',
      });
      alert(err.message)
    })
}

export const deleteStudent = (token, id) => dispatch => {
  dispatch({
    type: 'DELETE_STUDENT_REQUEST'
  })
  return Axios({
    method: 'DELETE',
    url: `${url}/school/student/${id}`,
    headers: {
      Authorization: token
    }
  })
    .then(res => {
      dispatch({
        type: 'DELETE_STUDENT_SUCCESS',
      });
      alert('Student has been deleted');
      dispatch(getStudent(token));
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: 'DELETE_STUDENT_FAILED',
        // payload: err.response.data.message
      })
      err.response.data ? alert(err.response.data.message) : alert(err.message)
    })
}
