import Axios from "axios";
import { alert } from './../../components/modal/Alert';
import {url} from './../../url';

export const getAdmin = (token) => dispatch => {
    dispatch({
        type: 'GET_ADMIN_REQUEST'
    })
    return Axios({
        method: 'GET',
        url: `${url}/admin/allAdmin/`,
        headers: {
            Authorization: token
        }
    })
        .then(res => {
            dispatch({
                type: 'GET_ADMIN_SUCCESS',
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type: 'GET_ADMIN_FAILED'
            })
        })
}

export const addAdmin = (token, data) => dispatch => {
    dispatch({
        type: 'ADD_ADMIN_REQUEST'
    })
    return Axios({
        method: 'POST',
        url: `${url}/admin/`,
        headers: {
            Authorization: token
        },
        data: {
            'username': data.username,
            'password': data.password
        }
    })
        .then(res => {
            dispatch({
                type: 'ADD_ADMIN_SUCCESS'
            })
            alert('Admin is added!').then(
                () => {
                    dispatch(getAdmin(token, data))
                },
                () => { }
            )
        })
        .catch(err => {
            dispatch({
                type: 'ADD_ADMIN_FAILED'
            })
            alert(err.response.data.message)
        })
}

export const deleteAdmin = (token, id) => dispatch => {
    dispatch({
        type: 'DELETE_ADMIN_REQUEST'
    })
    return Axios({
        method: 'DELETE',
        url: `${url}/admin/deleteAdmin/` + id,
        headers: {
            Authorization: token
        }
    })
        .then(res => {
            dispatch({
                type: 'DELETE_ADMIN_SUCCESS',
            });
            alert('Admin has been deleted');
            dispatch(getAdmin(token))
        })
        .catch(err => {
            dispatch({
                type: 'DELETE_ADMIN_FAILED',
                // payload: err.response.data.message
            })
            alert(err.response.data.message)
        })
}