import { patientConstants } from "../constants";


export function patients(state = {}, action) {
  switch (action.type) {
    case patientConstants.GETALL_PATIENT_REQUEST:
      return {
        loading: true
      };
    case patientConstants.GETALL_PATIENT_SUCCESS:
      return {
        items: action.patients
      };
    case patientConstants.GETALL_PATIENT_FAILURE:
      return {
        error: action.error
      };
    case patientConstants.DELETE_REQUEST:
      // add 'deleting:true' property to patient being deleted
      return {
        ...state,
        items: state.items.map(patient =>
          patient.id === action.id
            ? { ...patient, deleting: true }
            : patient
        )
      };
    case patientConstants.DELETE_SUCCESS:
      // remove deleted patient from state
      return {
        items: state.items.filter(patient => patient.id !== action.id)
      };
    case patientConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to patient 
      return {
        ...state,
        items: state.items.map(patient => {
          if (patient.id === action.id) {
            // make copy of patient without 'deleting:true' property
            const { deleting, ...userCopy } = patient;
            // return copy of patient with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return patient;
        })
      };
    default:
      return state
  }
}