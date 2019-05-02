import Axios from 'axios';
import { alert } from './../../components/modal/Alert';

import { url } from './../../url';

export const getDoe = token => dispatch => {
    dispatch({
        type: 'GET_DOE_REQUEST'
    })
    return Axios({
        method: 'GET',
        url: `${url}/admin/doe/`,
        headers: {
            Authorization: token
        }
    })
        .then(res => {
            dispatch({
                type: 'GET_DOE_SUCCESS',
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type: 'GET_DOE_FAILED',
                payload: err.message
            })
        })
}

export const addDoe = (token, data) => dispatch => {
    dispatch({
        type: 'POST_DOE_REQUEST'
    })
    return Axios({
        method: 'POST',
        url: `${url}/admin/addDoe/`,
        headers: {
            Authorization: token
        },
        data: {
            'fullname': data.name,
            'email': data.email
        }
    })
        .then(res => {
            dispatch({
                type: 'POST_DOE_SUCCESS'
            });
            alert('DOE is added!');
            dispatch(getDoe(token));
        })
        .catch(err => {
            dispatch({
                type: 'POST_DOE_FAILED',
                payload: err.message
            })
            alert(err.response.data.message);
        })
}

export const deleteDoe = (token, id) => dispatch => {
    dispatch({
        type: 'DELETE_DOE_REQUEST'
    })
    return Axios({
        method: 'DELETE',
        url: `${url}/admin/deleteDoe/${id}`,
        headers: {
            Authorization: token
        }
    })
        .then(res => {
            dispatch({
                type: 'DELETE_DOE_SUCCESS'
            });
            alert('DOE has been deleted');
            dispatch(getDoe(token));
        })
        .catch(err => {
            dispatch({
                type: 'DELETE_DOE_FAILED',
                payload: err.message
            })
            alert(err.response.data.message);
        })
}

export const editDoe = (token, id, data) => dispatch => {
    dispatch({
        type: 'EDIT_DOE_REQUEST'
    })
    return Axios({
        method: 'PUT',
        url: `${url}/admin/updateDoe/${id}`,
        headers: {
            Authorization: token
        },
        data: {
            'fullname': data.name,
            'email': data.email
        }

    })
        .then(res => {
            dispatch({
                type: 'EDIT_DOE_SUCCESS'
            });
            alert('DOE has been edited');
            dispatch(getDoe(token));
        })
        .catch(err => {
            dispatch({
                type: 'EDIT_DOE_FAILED',
                payload: err.message
            })
            alert(err.response.data.message);
        })
}