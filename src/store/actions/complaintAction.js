import Axios from "axios";
import {url} from '../../url';
import {alert} from '../../components/modal/Alert';

export const getComplaintsBySchool = (token) => dispatch => {
  dispatch({
    type: 'GET_COMPLAINTS_BY_SCHOOL_REQUEST'
  })
  return Axios({
    method: 'GET',
    url:`${url}/school/complaints`,
    headers: {
      Authorization: token
    }
  })
  .then(res => {
    dispatch({
      type: 'GET_COMPLAINTS_BY_SCHOOL_SUCCESS',
      payload: res.data.data
    })
  })
  .catch(err => {
    dispatch({
      type: 'GET_COMPLAINTS_BY_SCHOOL_FAILED',
    })
    alert(err.message);
  })
}

export const getComplaintsByDoe = token => dispatch => {
  dispatch({
    type: 'GET_COMPLAINTS_BY_DOE_REQUEST'
  })
  return Axios({
    method: 'GET',
    url:`${url}/doe/complaints`,
    headers: {
      Authorization: token
    }
  })
  .then(res => {
    dispatch({
      type: 'GET_COMPLAINTS_BY_DOE_SUCCESS',
      payload: res.data.data
    })
    console.log(res);
  })
  .catch(err => {
    dispatch({
      type: 'GET_COMPLAINTS_BY_DOE_FAILED',
    })
    alert(err.message);
  })
}

export const approveComplaint = (token, id) => dispatch => {
  dispatch({
    type: 'APPROVE_COMPLAINT_REQUEST'
  })
  return Axios({
    method: 'PUT',
    url: `${url}/doe/response`,
    headers: {
      Authorization: token
    },
    data: {
      'id': id,
      'approvedDoe': true
    }
  })
  .then(res => {
    dispatch({
      type: 'APPROVE_COMPLAINT_SUCCESS'      
    })
    alert("Complaint has been sended to the school");
    dispatch(getComplaintsByDoe(token));
  })
  .catch(err => {
    dispatch({
      type: 'APPROVE_COMPLAINT_FAILED'            
    })
    alert(err.message)
  })
}

export const addSchoolResponse = (token, id, response) => dispatch => {
  dispatch({
    type: 'ADD_SCHOOL_RESPONSE_REQUEST'
  })

  return Axios({
    method: 'PUT',
    url: `${url}/school/response`,
    headers: {
      Authorization: token
    },
    data: {
      id: id,
      response: response
    }
  })
  .then(res => {
    dispatch({
      type: 'ADD_SCHOOL_RESPONSE_SUCCESS'      
    })
    alert("Response has been added");
    dispatch(getComplaintsBySchool(token));
  })
  .catch(err => {
    dispatch({
      type: 'ADD_SCHOOL_RESPONSE_FAILED'            
    })
    alert(err.message)
  })
}

export const deleteSchoolResponse = (token, id) => dispatch => {
  dispatch({
    type: 'DELETE_SCHOOL_RESPONSE_REQUEST'
  })

  return Axios({
    method: 'PUT',
    url: `${url}/school/response`,
    headers: {
      Authorization: token
    },
    data: {
      id: id,
      response: ''
    }
  })
  .then(res => {
    dispatch({
      type: 'DELETE_SCHOOL_RESPONSE_SUCCESS'      
    })
    alert("Response has been deleted");
    dispatch(getComplaintsBySchool(token));
  })
  .catch(err => {
    dispatch({
      type: 'DELETE_SCHOOL_RESPONSE_FAILED'            
    })
    alert(err.message)
  })
}