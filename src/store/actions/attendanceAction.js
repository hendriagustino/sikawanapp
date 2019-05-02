import Axios from "axios";
import {url} from './../../url';
import {alert} from './../../components/modal/Alert';
import history from './../../history';

export const addAttendance = (token, data) => dispatch => {
  dispatch({
    type: 'ADD_ATTENDANCE_REQUEST'
  })
  return Axios({
    method: 'POST',
    url: `${url}/teacher/attendance`,
    headers: {
      Authorization: token
    },
    data: {
      attendances: data
    }
  })
  .then(res => {
    dispatch({
      type: 'ADD_ATTENDANCE_SUCCESS'
    })
    alert("Attendance is successfully added!");
    history.push('/scheduleData');
  })
  .catch(err => {
    dispatch({
      type: 'ADD_ATTENDANCE_FAILED'
    });
    alert(err.message);
  })
}