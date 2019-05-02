import {getjwt, getRole} from './../../helpers/getJwt';
import Axios from 'axios';
import jwt from 'jsonwebtoken';
import history from './../../history';
import {alert} from './../../components/modal/Alert';
import {url} from './../../url';

export const login = (username, password) => dispatch => {
  dispatch({type: 'LOGIN_REQUEST'});

  return Axios({
    method: 'POST',
    url: `${url}/login`,
    header: {
      'Content-Type': 'application/json'
    },
    data: {
      'username': username,
      'password': password
    }
  })
  .then( res => {

    const decoded = jwt.decode(res.data.data.token)

    dispatch({
      type: 'LOGIN_SUCCESS',
      role: decoded.role,
      id: decoded._id,
      subjects: decoded.role === 'teacher' ? decoded.subjects.name : '',
      token: res.data.data.token,
      fullname: decoded.fullname,
      email: decoded.email,
      image: decoded.image
    })

    localStorage.setItem('token', res.data.data.token);
    localStorage.setItem('role', res.data.data.role);

    history.push("/");
  })
  .catch(err => {
    dispatch({
      type: 'LOGIN_FAIL',
    })
    err.response ? alert(err.response.data.message) : alert(err.message);
  })
}

export const checkLogin = () => dispatch => {
  if(getjwt()){

    const decoded = jwt.decode(getjwt())

    return dispatch({
      type: 'ALREADY_LOGIN',
      token: getjwt(),
      role: decoded.role,
      fullname: decoded.fullname,
      email: decoded.email,
      image: decoded.image
    })
  }

  return dispatch({
    type: 'NOT_LOGIN'
  })
}
  
export const logout = () => dispatch => {

  localStorage.removeItem('token');
  localStorage.removeItem('role');

  return dispatch({
    type: 'LOGOUT',
  })

}

