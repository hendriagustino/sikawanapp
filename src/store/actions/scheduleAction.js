import Axios from "axios";
import history from './../../history';
import {alert} from './../../components/modal/Alert';
import {url} from './../../url';

export const getSchedules = (token) => dispatch => {
  dispatch({
    type: 'GET_SCHEDULE_REQUEST'
  })

  return Axios({
    method: 'GET',
    url: `${url}/school/schedule`,
    headers: {
      Authorization: token
    }
  })
  .then(res => {
    dispatch({
      type: 'GET_SCHEDULE_SUCCESS',
      payload: res.data.data
    })
  })
  .catch(err => {
    dispatch({
      type: 'GET_SCHEDULE_FAILED'
    })
    alert(err.message);
  })
}

export const getSchedulesByTeacher = (token) => dispatch => {
  dispatch({
    type: 'GET_SCHEDULE_BY_TEACHER_REQUEST'
  })

  return Axios({
    method: 'GET',
    url: `${url}/teacher/schedule`,
    headers: {
      Authorization: token
    }
  })
  .then(res => {
    dispatch({
      type: 'GET_SCHEDULE_BY_TEACHER_SUCCESS',
      payload: res.data.data
    })
  })
  .catch(err => {  
    dispatch({
      type: 'GET_SCHEDULE_BY_TEACHER_FAILED'
    });
    alert(err.message);
  })
}

export const getSchedulesHistoryByTeacher = (token) => dispatch => {
  dispatch({
    type: 'GET_SCHEDULE_HISTORY_BY_TEACHER_REQUEST'
  })

  return Axios({
    method: 'GET',
    url: `${url}/teacher/schedule/history`,
    headers: {
      Authorization: token
    }
  })
  .then(res => {
    dispatch({
      type: 'GET_SCHEDULE_HISTORY_BY_TEACHER_SUCCESS',
      payload: res.data.data
    })
  })
  .catch(err => {  
    dispatch({
      type: 'GET_SCHEDULE_HISTORY_BY_TEACHER_FAILED'
    });
    alert(err.message);
  })
}

export const getSchedulesHistoryDetailByTeacher = (token, scheduleId, date) => dispatch => {
  dispatch({
    type: 'GET_SCHEDULE_HISTORY_DETAIL_BY_TEACHER_REQUEST'
  })

  return Axios({
    method: 'GET',
    url: `${url}/teacher/schedule/history/details?schedule=${scheduleId}&date=${date}`,
    headers: {
      Authorization: token
    }
  })
  .then(res => {
    dispatch({
      type: 'GET_SCHEDULE_HISTORY_DETAIL_BY_TEACHER_SUCCESS',
      payload: res.data.data
    })
  })
  .catch(err => {  
    dispatch({
      type: 'GET_SCHEDULE_HISTORY_DETAIL_BY_TEACHER_FAILED'
    });
    alert(err.message);
  })
}

export const addSchedules = (token, schedules) => dispatch => {
  dispatch({
    type: 'ADD_SCHEDULE_REQUEST'
  })

  return Axios({
    method: 'POST',
    url: `${url}/school/schedule`,
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': token
    },
    data: JSON.stringify({
      schedules: schedules
    })
  })
  .then(res => {
    dispatch({
      type: 'ADD_SCHEDULE_SUCCESS',
      payload: res.data.data
    });
    alert('Schedule is successfuly added');
    history.push("/scheduleData")
  })
  .catch(err => {
    dispatch({
      type: 'ADD_SCHEDULE_FAILED',
      message: err.response.data.message
    })
    alert('Adding schedule is fail!' + err.response.data.message);
  })
}

export const deleteSchedule = (token, id) => dispatch => {
  dispatch({
    type: 'DELETE_SCHEDULE_REQUEST'
  })

  return Axios({
    method: 'DELETE',
    url: `${url}/school/schedule/${id}`,
    headers: {
      'Content-Type': 'Application/json',
      'Authorization': token
    }
  })
  .then(res => {
    dispatch({
      type: 'DELETE_SCHEDULE_SUCCESS'
    });
    alert('Schedule is successfuly deleted');
    dispatch(getSchedules(token));
  })
  .catch(err => {
    dispatch({
      type: 'DELETE_SCHEDULE_FAILED',
    })
    alert('Deleting schedule is fail!' + err.message);
  })
}

export const getScheduleDetail = (token, scheduleId) => dispatch => {
  dispatch({
    type: 'GET_SCHEDULE_DETAIL_REQUEST'
  })
  return Axios({
    method: 'GET',
    url: `${url}/teacher/schedule/${scheduleId}`,
    headers: {
      'Authorization': token
    }
  })
  .then(res => {
    dispatch({
      type: 'GET_SCHEDULE_DETAIL_SUCCESS',
      payload: res.data.data ? res.data.data : [],
    })
  })
  .catch(err => {
    dispatch({
      type: 'GET_SCHEDULE_DETAIL_FAILED'
    })
    alert(err.message);
  })
}
