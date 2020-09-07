import expect from 'expect';
import { patientConstants } from '../constants';
import { patients } from './patients.reducer';

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
describe('patients reducer', () => {

  it('should return the initial state', () => {
    expect(patients(initialState, {})).toEqual(initialState)
  });

  it('should handle GETALL_PATIENT_REQUEST', () => {
    expect(
      patients({}, {
        type: patientConstants.GETALL_PATIENT_REQUEST
      })).toEqual({
        loading: true
      });
  });

  it('should handle GETALL_PATIENT_SUCCESS', () => {
    const patientDetails = [{
      id: '1',
      gender: 'Male',
      firstName: 'TestFirstName',
      surName: 'TestSurName',
      age: '25',
      meritialStatus: 'Marrried',
      dob: '10/05/1985',
      emailAddress: 'test@testuser.test',
      phoneNumber: '12312312',
      nationality: 'test',
      stateId: 'testid',
      occupation: 'testjob',
      address: 'test street, test',
      kinName: 'testkin  ',
      kinRelation: 'father',
      kinPhoneNumber: '123322',
      kinEmailAddress: 'test@kintest.t',
      kinOccupation: 'test',
      kinAddress: 'test street, test city'
    }]
    expect(
      patients({}, {
        type: patientConstants.GETALL_PATIENT_SUCCESS,
        patients: patientDetails
      })).toEqual({
        items: patientDetails
      });
  });

  it('should handle GETALL_PATIENT_FAILURE', () => {
    const errorMessage = "Error occured"
    expect(
      patients({}, {
        type: patientConstants.GETALL_PATIENT_FAILURE,
        error: errorMessage
      })).toEqual({
        error: errorMessage
      })
  });
  
  it('should handle GET_PATIENT_REQUEST', () => {
    expect(
      patients({}, {
        type: patientConstants.GET_PATIENT_REQUEST
      })).toEqual({
        loading: true
      });
  });

  it('should handle GET_PATIENT_SUCCESS', () => {
    const patient = {
      "id": "P20200831015632",
      "gender": "F",
      "firstName": "GGGGGGG",
      "surName": "MMMMMM",
      "age": "44",
      "meritialStatus": "Married",
      "dob": "2020-08-26",
      "emailAddress": "mmm@mail.com",
      "phoneNumber": "3453453457",
      "nationality": "India",
      "stateId": "FFFF",
      "occupation": "Occupation",
      "address": "ADDDDD",
      "kinName": "KKKK NN",
      "kinRelation": "K Relation",
      "kinPhoneNumber": "3534534534",
      "kinEmailAddress": "mmmmm@mail.com",
      "kinOccupation": "sdfsd",
      "kinAddress": "sdfsdfsd"
    };
    expect(
      patients({}, {
        type: patientConstants.GET_PATIENT_SUCCESS,
        patient: patient
      })).toEqual({
        patient: patient
      });
  });

  it('should handle GET_PATIENT_FAILURE', () => {
    const errorMsg = "An error has occured"
    expect(
      patients({}, {
        type: patientConstants.GET_PATIENT_FAILURE,
        error: errorMsg
      })).toEqual({
        error: errorMsg
      });
  });

  it('should handle DELETE_REQUEST', () => {
    const items = [
      {
        "id": 1,
        "gender": "M",
        "firstName": "MM",
        "surName": "AA",
        "age": "22",
        "meritialStatus": "",
        "dob": "",
        "emailAddress": "mmm@Mail.com",
        "phoneNumber": "",
        "nationality": "",
        "stateId": "",
        "occupation": "",
        "address": "",
        "kinName": "",
        "kinRelation": "",
        "kinPhoneNumber": "",
        "kinEmailAddress": "",
        "kinOccupation": "",
        "kinAddress": ""
      },
      {
        "id": "P20200831015632",
        "gender": "F",
        "firstName": "GGGGGGG",
        "surName": "MMMMMM",
        "age": "44",
        "meritialStatus": "Married",
        "dob": "2020-08-26",
        "emailAddress": "mmm@mail.com",
        "phoneNumber": "3453453457",
        "nationality": "India",
        "stateId": "FFFF",
        "occupation": "Occupation",
        "address": "ADDDDD",
        "kinName": "KKKK NN",
        "kinRelation": "K Relation",
        "kinPhoneNumber": "3534534534",
        "kinEmailAddress": "mmmmm@mail.com",
        "kinOccupation": "sdfsd",
        "kinAddress": "sdfsdfsd"
      }

    ];
    const itemsAfterDeletionOfId1 = [
      {
        "id": 1,
        "gender": "M",
        "firstName": "MM",
        "surName": "AA",
        "age": "22",
        "meritialStatus": "",
        "dob": "",
        "emailAddress": "mmm@Mail.com",
        "phoneNumber": "",
        "nationality": "",
        "stateId": "",
        "occupation": "",
        "address": "",
        "kinName": "",
        "kinRelation": "",
        "kinPhoneNumber": "",
        "kinEmailAddress": "",
        "kinOccupation": "",
        "kinAddress": "",
        deleting: true
      },
      {
        "id": "P20200831015632",
        "gender": "F",
        "firstName": "GGGGGGG",
        "surName": "MMMMMM",
        "age": "44",
        "meritialStatus": "Married",
        "dob": "2020-08-26",
        "emailAddress": "mmm@mail.com",
        "phoneNumber": "3453453457",
        "nationality": "India",
        "stateId": "FFFF",
        "occupation": "Occupation",
        "address": "ADDDDD",
        "kinName": "KKKK NN",
        "kinRelation": "K Relation",
        "kinPhoneNumber": "3534534534",
        "kinEmailAddress": "mmmmm@mail.com",
        "kinOccupation": "sdfsd",
        "kinAddress": "sdfsdfsd"
      }

    ]
    const patientIdToBeDeleted = 1;
    expect(
      patients({ items: items }, {
        type: patientConstants.DELETE_REQUEST,
        id: patientIdToBeDeleted
      })).toEqual({
        items: itemsAfterDeletionOfId1
      })
  });

  it('should handle DELETE_SUCCESS', () => {
    const items = [
      {
        "id": 1,
        "gender": "M",
        "firstName": "MM",
        "surName": "AA",
        "age": "22",
        "meritialStatus": "",
        "dob": "",
        "emailAddress": "mmm@Mail.com",
        "phoneNumber": "",
        "nationality": "",
        "stateId": "",
        "occupation": "",
        "address": "",
        "kinName": "",
        "kinRelation": "",
        "kinPhoneNumber": "",
        "kinEmailAddress": "",
        "kinOccupation": "",
        "kinAddress": ""
      },
      {
        "id": "P20200831015632",
        "gender": "F",
        "firstName": "GGGGGGG",
        "surName": "MMMMMM",
        "age": "44",
        "meritialStatus": "Married",
        "dob": "2020-08-26",
        "emailAddress": "mmm@mail.com",
        "phoneNumber": "3453453457",
        "nationality": "India",
        "stateId": "FFFF",
        "occupation": "Occupation",
        "address": "ADDDDD",
        "kinName": "KKKK NN",
        "kinRelation": "K Relation",
        "kinPhoneNumber": "3534534534",
        "kinEmailAddress": "mmmmm@mail.com",
        "kinOccupation": "sdfsd",
        "kinAddress": "sdfsdfsd"
      }

    ];
    const itemsAfterDeletionOfId1 = [{
      "id": "P20200831015632",
      "gender": "F",
      "firstName": "GGGGGGG",
      "surName": "MMMMMM",
      "age": "44",
      "meritialStatus": "Married",
      "dob": "2020-08-26",
      "emailAddress": "mmm@mail.com",
      "phoneNumber": "3453453457",
      "nationality": "India",
      "stateId": "FFFF",
      "occupation": "Occupation",
      "address": "ADDDDD",
      "kinName": "KKKK NN",
      "kinRelation": "K Relation",
      "kinPhoneNumber": "3534534534",
      "kinEmailAddress": "mmmmm@mail.com",
      "kinOccupation": "sdfsd",
      "kinAddress": "sdfsdfsd"
    }

    ]
    const patientIdToBeDeleted = 1;
    expect(
      patients({ items: items }, {
        type: patientConstants.DELETE_SUCCESS,
        id: patientIdToBeDeleted
      })).toEqual({
        items: itemsAfterDeletionOfId1
      })
  });

  it('should handle DELETE_FAILURE', () => {
    const items = [
      {
        "id": 1,
        "gender": "M",
        "firstName": "MM",
        "surName": "AA",
        "age": "22",
        "meritialStatus": "",
        "dob": "",
        "emailAddress": "mmm@Mail.com",
        "phoneNumber": "",
        "nationality": "",
        "stateId": "",
        "occupation": "",
        "address": "",
        "kinName": "",
        "kinRelation": "",
        "kinPhoneNumber": "",
        "kinEmailAddress": "",
        "kinOccupation": "",
        "kinAddress": ""
      },
      {
        "id": "P20200831015632",
        "gender": "F",
        "firstName": "GGGGGGG",
        "surName": "MMMMMM",
        "age": "44",
        "meritialStatus": "Married",
        "dob": "2020-08-26",
        "emailAddress": "mmm@mail.com",
        "phoneNumber": "3453453457",
        "nationality": "India",
        "stateId": "FFFF",
        "occupation": "Occupation",
        "address": "ADDDDD",
        "kinName": "KKKK NN",
        "kinRelation": "K Relation",
        "kinPhoneNumber": "3534534534",
        "kinEmailAddress": "mmmmm@mail.com",
        "kinOccupation": "sdfsd",
        "kinAddress": "sdfsdfsd"
      }

    ];
    const errorMessage = 'Error occured';
    const itemsAfterDeletionError = [{
      "id": 1,
      "gender": "M",
      "firstName": "MM",
      "surName": "AA",
      "age": "22",
      "meritialStatus": "",
      "dob": "",
      "emailAddress": "mmm@Mail.com",
      "phoneNumber": "",
      "nationality": "",
      "stateId": "",
      "occupation": "",
      "address": "",
      "kinName": "",
      "kinRelation": "",
      "kinPhoneNumber": "",
      "kinEmailAddress": "",
      "kinOccupation": "",
      "kinAddress": "",
      deleteError: 'Error occured'
    },
    {
      "id": "P20200831015632",
      "gender": "F",
      "firstName": "GGGGGGG",
      "surName": "MMMMMM",
      "age": "44",
      "meritialStatus": "Married",
      "dob": "2020-08-26",
      "emailAddress": "mmm@mail.com",
      "phoneNumber": "3453453457",
      "nationality": "India",
      "stateId": "FFFF",
      "occupation": "Occupation",
      "address": "ADDDDD",
      "kinName": "KKKK NN",
      "kinRelation": "K Relation",
      "kinPhoneNumber": "3534534534",
      "kinEmailAddress": "mmmmm@mail.com",
      "kinOccupation": "sdfsd",
      "kinAddress": "sdfsdfsd"
    }

    ];
    const patientIdToBeDeleted = 1;
    expect(
      patients({ items: items }, {
        type: patientConstants.DELETE_FAILURE,
        id: patientIdToBeDeleted,
        error: errorMessage
      })).toEqual({
        items: itemsAfterDeletionError
      });
  });

  it('should handle INPUT_VALUE_CHANGE', () => {
    const patient = {
      "id": "P20200831015632",
      "gender": "F",
      "firstName": "GGGGGGG",
      "surName": "MMMMMM",
      "age": "44",
      "meritialStatus": "Married",
      "dob": "2020-08-26",
      "emailAddress": "mmm@mail.com",
      "phoneNumber": "3453453457",
      "nationality": "India",
      "stateId": "FFFF",
      "occupation": "Occupation",
      "address": "ADDDDD",
      "kinName": "KKKK NN",
      "kinRelation": "K Relation",
      "kinPhoneNumber": "3534534534",
      "kinEmailAddress": "mmmmm@mail.com",
      "kinOccupation": "sdfsd",
      "kinAddress": "sdfsdfsd"
    };
    const patientAfterInputValueChange = {
      "id": "P20200831015632",
      "gender": "F",
      "firstName": "GGGGGGG",
      "surName": "MMMMMM",
      "age": "44",
      "meritialStatus": "Married",
      "dob": "2020-08-26",
      "emailAddress": "mmm@mail.com",
      "phoneNumber": "3453453457",
      "nationality": "India",
      "stateId": "GGGG",
      "occupation": "Occupation",
      "address": "ADDDDD",
      "kinName": "KKKK NN",
      "kinRelation": "K Relation",
      "kinPhoneNumber": "3534534534",
      "kinEmailAddress": "mmmmm@mail.com",
      "kinOccupation": "sdfsd",
      "kinAddress": "sdfsdfsd"
    };
    expect(
      patients({ patient: patient }, {
        type: patientConstants.INPUT_VALUE_CHANGE,
        name: 'stateId',
        value: 'GGGG'
      })).toEqual({
        patient: patientAfterInputValueChange
      })
  });

  it('should handle LOAD_PATIENT_DETAILS', () => {
    const patient = {
      "id": "P20200831015632",
      "gender": "F",
      "firstName": "GGGGGGG",
      "surName": "MMMMMM",
      "age": "44",
      "meritialStatus": "Married",
      "dob": "2020-08-26",
      "emailAddress": "mmm@mail.com",
      "phoneNumber": "3453453457",
      "nationality": "India",
      "stateId": "FFFF",
      "occupation": "Occupation",
      "address": "ADDDDD",
      "kinName": "KKKK NN",
      "kinRelation": "K Relation",
      "kinPhoneNumber": "3534534534",
      "kinEmailAddress": "mmmmm@mail.com",
      "kinOccupation": "sdfsd",
      "kinAddress": "sdfsdfsd"
    }
    expect(
      patients({}, {
        type: patientConstants.LOAD_PATIENT_DETAILS,
        patient: patient
      })).toEqual({
        patient: patient
      });
  });

})