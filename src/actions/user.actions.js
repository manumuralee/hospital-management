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
        const user = { username, password };

        axios.get(json_server_url + '/users?username=' + username + '&password=' + password)
            .then(
                user => {
                    dispatch(success(user.data));
                    localStorage.setItem('user', JSON.stringify(user.data));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
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
            axios.get(json_server_url + '/users?username=' + user.username)
                .then(
                    res => {
                        if (res === null || res.data === null || res.data.length <= 0) {
                            axios.post(json_server_url + '/users', user)
                                .then(
                                    res => {
                                        dispatch(success());
                                        history.push('/login');
                                        dispatch(alertActions.success('Registration successful'));
                                    },
                                    error => {
                                        dispatch(failure(error));
                                        dispatch(alertActions.error(error));
                                    }
                                );
                        } else {
                            dispatch(alertActions.error('User Name Already Exists!'));
                            dispatch(failure('User Name Already Exists!'));
                        }

                    },
                    error => {
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
                );
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

        axios.get(json_server_url + '/users')
            .then(
                res => {
                    dispatch(success(res.data))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        axios.delete(json_server_url + '/users/' + id)
            .then(
                user => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}