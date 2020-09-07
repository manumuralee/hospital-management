import { patientConstants } from '../constants';
import { alertActions } from './';
import axios from 'axios';
import { history } from '../helpers';

const json_server_url = 'http://localhost:3004';

export const patientActions = {
    addPatient,
    getAllPatients,
    getPatientById, 
    editPatient   
};


function addPatient(patient) {
    return dispatch => {
        dispatch(request(patient));

        return axios.post(json_server_url + '/patients', patient)
            .then(
                res => {
                    dispatch(success(patient));
                    history.push('/');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(patient) { return { type: patientConstants.ADD_PATIENT_REQUEST, patient } }
    function success(patient) { return { type: patientConstants.ADD_PATIENT_SUCCESS, patient } }
    function failure(error) { return { type: patientConstants.ADD_PATIENT_FAILURE, error } }
}

function getAllPatients() {
    return dispatch => {
        dispatch(request());

        return axios.get(json_server_url + '/patients')
            .then(
                patients => {
                    dispatch(success(patients.data))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };

    function request() { return { type: patientConstants.GETALL_PATIENT_REQUEST } }
    function success(patients) { return { type: patientConstants.GETALL_PATIENT_SUCCESS, patients } }
    function failure(error) { return { type: patientConstants.GETALL_PATIENT_FAILURE, error } }
}

function getPatientById(id) {
    return dispatch => {
        dispatch(request(id));

        return axios.get(json_server_url + '/patients/' + id)
            .then(
                res => {
                    dispatch(success(res.data))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };

    function request() { return { type: patientConstants.GET_PATIENT_REQUEST } }
    function success(patient) { return { type: patientConstants.GET_PATIENT_SUCCESS, patient } }
    function failure(error) { return { type: patientConstants.GET_PATIENT_FAILURE, error } }
}

/*function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        return axios.delete(json_server_url + '/patients/' + id)
            .then(
                patient => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: patientConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: patientConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: patientConstants.DELETE_FAILURE, id, error } }

}*/


function editPatient(patient) {
    return dispatch => {
        dispatch(request(patient));      
        return axios.put(json_server_url + '/patients/' + patient.id, patient)
            .then(
                res => {                   
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Edit successful'));
                },
                error => {                   
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );       
    };

    function request(patient) { return { type: patientConstants.EDIT_PATIENT_REQUEST, patient } }
    function success(patient) { return { type: patientConstants.EDIT_PATIENT_SUCCESS, patient } }
    function failure(error) { return { type: patientConstants.EDIT_PATIENT_FAILURE, error } }
}
