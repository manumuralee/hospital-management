import axios from 'axios';
import _ from 'lodash';
import { userConstants } from '../constants';
import { history } from '../helpers';
import { alertActions } from './';

const json_server_url = 'http://localhost:3004';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        // const user = { username, password };

        return axios.get(json_server_url + '/users?username=' + username + '&password=' + password)
            .then(
                res => {
                    if (res && res.data && res.data.length > 0) {
                        dispatch(success(res.data));
                        localStorage.setItem('user', JSON.stringify(res.data));
                        history.push('/');
                    } else {
                        dispatch(failure({ error: 'Invalid Credentials' }));
                        dispatch(alertActions.error('Invalid Credentials'));
                    }
                }).catch(error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                });
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    localStorage.removeItem('user');
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        if (user && _.trim(user.username) !== "") {
            return axios.get(json_server_url + '/users?username=' + user.username)
                .then(
                    res => {
                        if (res === null || res.data === null || res.data.length <= 0) {
                            return axios.post(json_server_url + '/users', user)
                                .then(
                                    res => {
                                        dispatch(success(user));
                                        //history.push('/login');
                                        dispatch(alertActions.success('Registration successful'));
                                    }).catch(error => {
                                        dispatch(failure(error.message));
                                        dispatch(alertActions.error(error.message));
                                    })
                        } else {
                            dispatch(alertActions.error('User Name Already Exists!'));
                            dispatch(failure('User Name Already Exists!'));
                        }

                    }).catch(error => {
                        dispatch(failure(error.message));
                        dispatch(alertActions.error(error.message));
                    });
        } else {
            dispatch(alertActions.error('Invalid Use Name'));
            dispatch(failure('Invalid Use Name'));
        }

    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        return axios.get(json_server_url + '/users')
            .then(
                res => {
                    dispatch(success(res.data))
                }).catch(error => {
                    dispatch(failure(error.message));
                    dispatch(alertActions.error(error.message));
                });
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        return axios.delete(json_server_url + '/users/' + id)
            .then(
                user => {
                    dispatch(success(id));
                }).catch(error => {
                    dispatch(failure(id, error.message));
                    dispatch(alertActions.error(error.message));
                });
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}