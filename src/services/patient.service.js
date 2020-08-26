import { authHeader } from '../helpers';

export const patientService = {     
    addPatient,
    getAllPatients,
    getPatientById,
    updatePatient    
};


function getAllPatients() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/patients`, requestOptions).then(handleResponse);
}

function getPatientById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/patients/${id}`, requestOptions).then(handleResponse);
}

function addPatient(patient) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient)
    };

    return fetch(`/patients/addPatient`, requestOptions).then(handleResponse);
}

function updatePatient(patient) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(patient)
    };

    return fetch(`/patients/${patient.id}`, requestOptions).then(handleResponse);;
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api               
                //localStorage.removeItem('patient');
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}