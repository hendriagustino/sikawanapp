import Axios from "axios";
import {alert} from './../../components/modal/Alert';
import {url} from './../../url';


export const getClassroom = (token) => dispatch => {
    dispatch({
        type: 'GET_CLASSROOM_REQUEST'
    })
    return Axios({
        method: 'GET',
        url: `${url}/school/classroom`,
        headers: {
            Authorization: token,

        }
    })
    .then(res => {
        dispatch({
            type: 'GET_CLASSROOM_SUCCESS',
            payload: res.data.data
        })
    })
    .catch(err => {
        dispatch({
            type: 'GET_CLASSROOM_FAILED',
            // payload: err.respond.data.message
        })
        alert(err.message);
    })
}

export const addClassroom = (token, data) => dispatch => {
    dispatch({
        type: 'ADD_CLASSROOM_REQUEST'
    })
    return Axios({
        method: 'POST',
        url: `${url}/school/classroom`,
        headers: {
            Authorization: token,
        },
        data: {
            'grade': data.grade,
            'major': data.major,
            'classes': data.classes
        }
    })
    .then(res => {
        dispatch({
            type: 'ADD_CLASSROOM_SUCCESS'
        });
        alert('Class is added!').then(
            () => {
                dispatch(getClassroom(token,data));
            },
            () => { }

        )
    })
    .catch(err => {
        // console.log(err.response.data)
        dispatch({
            type: 'ADD_CLASSROOM_FAILED',
            // payload: err.response.data.message
        })
        alert(err.response.data.message);
    })
}

export const deleteClassroom = (token, id) => dispatch => {
    dispatch({
        type: 'DELETE_CLASSROOM_REQUEST'
    })
    return Axios({
        method: 'DELETE',
        url: `${url}/school/classroom/` + id,
        headers: {
            Authorization: token
        }
    })
    .then(res => {
        dispatch({
            type: 'DELETE_CLASSROOM_SUCCESS',
        });
        alert('classes has been deleted');
        dispatch(getClassroom(token));
    })
    .catch(err => {
        dispatch({
            type: 'DELETE_CLASSROOM_FAILED',
            payload: err.response.data.message
        })
    })
}

export const updateClassroom = (token, id, data) => dispatch => {
    dispatch({
        type: 'UPDATE_CLASSROOM_REQUEST'
    })
    
    return Axios({
        method: 'PUT',
        url: `${url}/school/classroom/` + id,
        headers: {
            Authorization: token
        },
        data: {
            'grade': data.grade,
            'major': data.major,
            'classes': data.classes
        }
    })
    .then(res => {
        dispatch({
            type: 'UPDATE_CLASSROOM_SUCCESS',
        });
        alert('classes has been updated');
        dispatch(getClassroom(token));
    })
    .catch(err => {
        dispatch({
            type: 'UPDATE_CLASSROOM_FAILED',
            payload: err.message
        })
        alert(err.response.data.message)
    })
}
