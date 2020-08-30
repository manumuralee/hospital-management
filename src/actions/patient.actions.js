import { patientConstants } from '../constants';
import { patientService } from '../services';
import { alertActions } from './';
// import { history } from '../helpers';

export const patientActions = {
    addPatient,
    getAllPatients,
    getPatientById,
    delete: _delete
};


function addPatient(patient) {
    return dispatch => {
        dispatch(request(patient));

        patientService.addPatient(patient)
            .then(
                patient => {
                    dispatch(success(patient));
                    // history.push('/login');
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

        patientService.getAllPatients()
            .then(
                patients => dispatch(success(patients)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: patientConstants.GETALL_PATIENT_REQUEST } }
    function success(patients) { return { type: patientConstants.GETALL_PATIENT_SUCCESS, patients } }
    function failure(error) { return { type: patientConstants.GETALL_PATIENT_FAILURE, error } }
}

function getPatientById(id) {
    return dispatch => {
        dispatch(request(id));

        patientService.getPatientById(id)
            .then(
                patient => dispatch(success(patient)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: patientConstants.GET_PATIENT_REQUEST } }
    function success(patient) { return { type: patientConstants.GET_PATIENT_SUCCESS, patient } }
    function failure(error) { return { type: patientConstants.GET_PATIENT_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        patientService.delete(id)
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
}
