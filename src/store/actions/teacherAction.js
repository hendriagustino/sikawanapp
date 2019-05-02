import Axios from "axios";
import { alert } from './../../components/modal/Alert';
import { url } from './../../url';

export const getTeacher = token => dispatch => {
  dispatch({
    type: 'GET_TEACHER_REQUEST'
  })
  return Axios({
    method: 'GET',
    url: `${url}/school/teacher`,
    headers: {
      Authorization: token
    }
  })
    .then(res => {
      dispatch({
        type: 'GET_TEACHER_SUCCESS',
        payload: res.data.data
      })
    })
    .catch(err => {
      dispatch({
        type: 'GET_TEACHER_FAILED',
        payload: err.message
      })
      alert(err.message);
    })
}

export const addTeacher = (token, data) => dispatch => {
  dispatch({
    type: 'POST_TEACHER_REQUEST'
  })
  return Axios({
    method: 'POST',
    url: `${url}/school/teacher`,
    headers: {
      Authorization: token
    },
    data: data
  })
    .then(res => {
      dispatch({
        type: 'POST_TEACHER_SUCCESS'
      });
      alert('Teacher is added!');
      dispatch(getTeacher(token));
    })
    .catch(err => {
      dispatch({
        type: 'POST_TEACHER_FAILED',
        payload: err.message
      })
      alert(err.message);
    })
}

export const deleteTeacher = (token, id) => dispatch => {
  dispatch({
    type: 'DELETE_TEACHER_REQUEST'
  })
  return Axios({
    method: 'DELETE',
    url: `${url}/school/teacher/${id}`,
    headers: {
      Authorization: token
    }
  })
    .then(res => {
      dispatch({
        type: 'DELETE_TEACHER_SUCCESS'
      });
      alert("Teacher has been deleted");
      dispatch(getTeacher(token));
    })
    .catch(err => {
      dispatch({
        type: 'DELETE_TEACHER_FAILED',
        payload: err.message
      })
      alert(err.message);
    })
}

export const editTeacher = (token, id, data) => dispatch => {
  dispatch({
    type: 'EDIT_TEACHER_REQUEST'
  })
  return Axios({
    method: 'PUT',
    url: `${url}/school/teacher/${id}`,
    headers: {
      Authorization: token
    },
    data: data
  })
    .then(res => {
      dispatch({
        type: 'EDIT_TEACHER_SUCCESS'
      });
      alert('Teacher has been edited');

      console.log(res.data);
      dispatch(getTeacher(token));
    })
    .catch(err => {
      dispatch({
        type: 'EDIT_TEACHER_FAILED',
        payload: err.message
      })
      alert(err.message);
    })
}