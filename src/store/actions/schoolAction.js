import Axios from 'axios';
import { alert } from './../../components/modal/Alert';
import { url } from './../../url';

export const getSchool = token => dispatch => {
    dispatch({
        type: 'GET_SCHOOL_REQUEST'
    })
    return Axios({
        method: 'GET',
        url: `${url}/admin/school`,
        headers: {
            Authorization: token
        }
    })
        .then(res => {
            dispatch({
                type: 'GET_SCHOOL_SUCCESS',
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type: 'GET_SCHOOL_FAILED',
                payload: err.message
            })
        })
}

export const addSchool = (token, data) => dispatch => {
    dispatch({
        type: 'POST_SCHOOL_REQUEST'
    })
    return Axios({
        method: 'POST',
        url: `${url}/admin/addSchool`,
        headers: {
            Authorization: token
        },
        data: {
            'npsn': data.npsn,
            'fullname': data.fullname,
            'email': data.email,
            'address': data.address,
            'doe': data.doe
        }
    })
        .then(res => {
            dispatch({
                type: 'POST_SCHOOL_SUCCESS'
            });
            alert('School is added!');
            dispatch(getSchool(token));
        })
        .catch(err => {
            dispatch({
                type: 'POST_SCHOOL_FAILED',
                payload: err.message
            })
            alert(err.message);
        })
}

export const deleteSchool = (token, id) => dispatch => {
    dispatch({
        type: 'DELETE_SCHOOL_SUCCESS'
    })
    return Axios({
        method: 'DELETE',
        url: `${url}/admin/deleteSchool/${id}`,
        headers: {
            Authorization: token
        }
    })
        .then(res => {
            dispatch({
                type: 'DELETE_SCHOOL_SUCCESS'
            });
            alert('School has been deleted');
            dispatch(getSchool(token));
        })
        .catch(err => {
            dispatch({
                type: 'DELETE_SCHOOL_FAILED',
                payload: err.message
            })
            alert(err.message);
        })
}

export const editSchool = (token, id, data) => dispatch => {
    dispatch({
        type: 'EDIT_SCHOOL_REQUEST'
    })
    return Axios({
        method: 'PUT',
        url: `${url}/admin/updateSchool/${id}`,
        headers: {
            Authorization: token
        },
        data: {
            'npsn': data.npsn,
            'fullname': data.name,
            'address': data.address,
            'email': data.email,
            'doe': data.doe
        }
    })
        .then(res => {
            dispatch({
                type: 'EDIT_SCHOOL_SUCCESS'
            });
            alert('School has been edited');
            dispatch(getSchool(token));
        })
        .catch(err => {
            dispatch({
                type: 'EDIT_SCHOOL_FAILED',
                payload: err.message
            })
            alert(err.response.data.message)
        })
}