import Axios from "axios";
import {url} from './../../url';
import {alert} from './../../components/modal/Alert';

export const getStudentScore = token => dispatch => {
  dispatch({
    type: 'GET_STUDENT_SCORE_REQUEST'
  })
  return Axios({
    method: 'GET',
    url: `${url}/teacher/score`,
    headers: {
      Authorization: token
    }
  })
  .then(res => {
    dispatch({
      type: 'GET_STUDENT_SCORE_SUCCESS',
      payload: res.data.data
    })
  })
  .catch(err => {
    dispatch({
      type: 'GET_STUDENT_SCORE_FAILED'
    })
    alert(err.message)
  })
}

export const getScoreByStudent = (token, studentId) => dispatch => {
  dispatch({
    type: 'GET_SCORE_BY_STUDENT_REQUEST'
  })
  return Axios({
    method: 'GET',
    url: `${url}/teacher/score/${studentId}`,
    headers: {
      Authorization: token
    }
  })
  .then(res => {
    dispatch({
      type: 'GET_SCORE_BY_STUDENT_SUCCESS',
      payload: res.data.data
    })
  })
  .catch(err => {
    dispatch({
      type: 'GET_SCORE_BY_STUDENT_FAILED'
    })
    alert(err.message)
  })
}

export const addScore = (token, studentId, data) => dispatch => {
  dispatch({
    type: 'ADD_SCORE_REQUEST'
  })
  return Axios({
    method: 'POST',
    url: `${url}/teacher/score`,
    headers: {
      Authorization: token
    },
    data: {
      students: studentId,
      category: data.category,
      point: data.point
    }
  })
  .then(res => {
    dispatch({
      type: 'ADD_SCORE_SUCCESS',
      // payload: res.data.data
    })
    alert("Score added successfuly!")
    dispatch(getScoreByStudent(token, studentId))
  })
  .catch(err => {
    dispatch({
      type: 'ADD_SCORE_FAILED'
    })
    alert(err.message)
  })
}

export const deleteScore = (token, studentId, scoreId) => dispatch => {
  dispatch({
    type: 'DELETE_SCORE_REQUEST'
  })
  return Axios({
    method: 'DELETE',
    url: `${url}/teacher/score`,
    headers: {
      Authorization: token
    },
    data: {
      scoreId: scoreId
    }
  })
  .then(res => {
    dispatch({
      type: 'DELETE_SCORE_SUCCESS',
      // payload: res.data.data
    })
    alert("Score deleted successfuly!")
    dispatch(getScoreByStudent(token, studentId))
  })
  .catch(err => {
    dispatch({
      type: 'DELETE_SCORE_FAILED'
    })
    alert(err.message)
  })
}