import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { alertConstants, patientConstants } from '../constants';
import { patientActions } from './patient.actions';


describe('add patient async actions', () => {
    let store;
    let httpMock;
    //    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));
    const initialState = {
        patient: {
            id: '',
            gender: '',
            firstName: '',
            surName: '',
            age: '',
            meritialStatus: '',
            dob: '',
            emailAddress: '',
            phoneNumber: '',
            nationality: '',
            stateId: '',
            occupation: '',
            address: '',
            kinName: '',
            kinRelation: '',
            kinPhoneNumber: '',
            kinEmailAddress: '',
            kinOccupation: '',
            kinAddress: ''
        }
    };

    beforeEach(() => {
        httpMock = new MockAdapter(axios);
        const mockStore = configureMockStore([thunk]);
        store = mockStore(initialState);
    });

    it('creates ADD_PATIENT_SUCCESS when patient is added', async () => {

        const patient = {
            id: '4',
            gender: 'Male',
            firstName: 'test',
            surName: 'test',
            age: '44',
            meritialStatus: 'Married',
            dob: '1980/02/01',
            emailAddress: 'test@tes.test',
            phoneNumber: '',
            nationality: '',
            stateId: '',
            occupation: '',
            address: '',
            kinName: '',
            kinRelation: '',
            kinPhoneNumber: '',
            kinEmailAddress: '',
            kinOccupation: '',
            kinAddress: ''
        }
        
        httpMock.onPost('http://localhost:3003/patients', patient).reply(201);
        store.dispatch(patientActions.addPatient(patient)).then(() => {
            const expectedActions = [{ type: patientConstants.ADD_PATIENT_REQUEST, patient },
            { type: patientConstants.ADD_PATIENT_SUCCESS, patient },
            { type: alertConstants.SUCCESS, message: 'Registration successful' }];
            expect(store.getActions()).toEqual(expectedActions);
        });

    });


    it('creates GETALL_PATIENT_SUCCESS when all patients fetched', async () => {
        const patients = {
            "patients": [{
                id: '4',
                gender: 'Male',
                firstName: 'test',
                surName: 'test',
                age: '44',
                meritialStatus: 'Married',
                dob: '1980/02/01',
                emailAddress: 'test@tes.test',
                phoneNumber: '',
                nationality: '',
                stateId: '',
                occupation: '',
                address: '',
                kinName: '',
                kinRelation: '',
                kinPhoneNumber: '',
                kinEmailAddress: '',
                kinOccupation: '',
                kinAddress: ''
            }]
        };
        httpMock.onGet('http://localhost:3003/patients').reply(201, patients);
        store.dispatch(patientActions.getAllPatients()).then(() => {
            const expectedActions = [{ type: patientConstants.GETALL_PATIENT_REQUEST },
            { type: patientConstants.GETALL_PATIENT_SUCCESS, patients }];
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it('creates GET_PATIENT_SUCCESS when a patient is fetched by id', async () => {
        const patient = {
            id: '4',
            gender: 'Male',
            firstName: 'test',
            surName: 'test',
            age: '44',
            meritialStatus: 'Married',
            dob: '1980/02/01',
            emailAddress: 'test@tes.test',
            phoneNumber: '',
            nationality: '',
            stateId: '',
            occupation: '',
            address: '',
            kinName: '',
            kinRelation: '',
            kinPhoneNumber: '',
            kinEmailAddress: '',
            kinOccupation: '',
            kinAddress: ''
        };
        
        httpMock.onGet('http://localhost:3003/patients/4').reply(201, patient);
        store.dispatch(patientActions.getPatientById(4)).then(() => {
            const expectedActions = [{ type: patientConstants.GET_PATIENT_REQUEST },
            { type: patientConstants.GET_PATIENT_SUCCESS, patient }];
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

});