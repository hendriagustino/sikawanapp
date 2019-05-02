import Axios from 'axios';
import {alert} from './../../components/modal/Alert';
import {url} from './../../url';

export const getSubjects = (token) => dispatch => {
    dispatch({
        type: 'GET_SUBJECTS_REQUEST'
    })
    return Axios({
        method: 'GET',
        url: `${url}/school/subject`,
        headers: {
            Authorization: token
        }
    })
        .then(res => {
            dispatch({
                type: 'GET_SUBJECTS_SUCCESS',
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type: 'GET_SUBJECTS_FAILED',
                payload: err.message
            })
            alert(err.message)
        })
}

export const addSubjects = (token, data) => dispatch => {
    dispatch({
        type: 'POST_SUBJECTS_REQUEST'
    })
    return Axios({
        method: 'POST',
        url: `${url}/school/subject`,
        headers: {
            Authorization: token
        },
        data: {
            'name': data
        }
    })
        .then(res => {
            dispatch({
                type: 'POST_SUBJECTS_SUCCESS'
            });
            alert("subject is added!").then(
                () => {
                    dispatch(getSubjects(token));
                },
                () => { }
            )
        })
        .catch(err => {
            dispatch({
                type: 'POST_SUBJECTS_FAILED',
                payload: err.message
            })
            alert(err.message);
        })
}

export const deleteSubjects = (token, id) => dispatch =>{
    dispatch({
        type: 'DELETE_SUBJECTS_REQUEST'
    })
    return Axios({
        method: 'DELETE',
        url: `${url}/school/subject/${id}`,
        headers: {
            Authorization: token
        }
    })
        .then(res=>{
            dispatch({
                type: 'DELETE_SUBJECTS_SUCCESS'
            });
            alert("Subject has been deleted");
            dispatch(getSubjects(token));
        })
        .catch(err => {
            dispatch({
                type: 'DELETE_SUBJECTS_FAILED',
                payload: err.message
            })
            alert(err.message);
        })
}

export const editSubjects = (token, id, data) => dispatch => {
    dispatch({
        type: 'EDIT_SUBJECTS_REQUEST'
    })
    return Axios({
        method: 'PUT',
        url: `${url}/school/subject/${id}`,
        headers: {
            Authorization: token
        },
        data: {
            'id': data.id,
            'name': data.subjects
        }
    })
        .then(res=>{
            dispatch({
                type: 'EDIT_SUBJECTS_SUCCESS'
            });
            alert('Subjects has been edited');
            dispatch(getSubjects(token));
        })
        .catch(err=>{
            dispatch({
                type: 'EDIT_SUBJECTS_FAILED',
                payload: err.message
            })
            alert(err.message);
        })
}

