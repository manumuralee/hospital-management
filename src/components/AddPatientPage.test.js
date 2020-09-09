import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { MemoryRouter } from 'react-router';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AddPatientPage } from './AddPatientPage';


configure({ adapter: new Adapter() });

const initialState = {
    patients: {
        patient: {
            "id": "",
            "gender": "",
            "firstName": "",
            "surName": "",
            "age": "",
            "meritialStatus": "",
            "dob": "",
            "emailAddress": "",
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
        }
    },
    submitted: false,
    mode: 'add',
    id: '',
    hasData: false,
    viewMode: false
};
const props = {
    addPatient: jest.fn(),
    editPatient: jest.fn(),
    getPatientById: jest.fn(),
    patient: {},
    match: {
        params: {
            mode: '',
            id: ''
        }
    }
}
let store;

beforeEach(() => {
    const mockStore = configureMockStore([thunk]);
    store = mockStore(initialState)
});

describe('<AddPatientPage />', () => {

    it('should check viewMode is true for view', () => {
        store.dispatch = jest.fn();
        let wrapper = shallow(<MemoryRouter initialEntries={["/patients/add"]}><AddPatientPage store={store} {...props} /></MemoryRouter>).dive().dive().dive();
        wrapper.setState({
            patient: {
                "id": "",
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
            },
            submitted: false,
            mode: 'add',
            id: '',
            hasData: true,
            viewMode: false
        });
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {
            }
        })
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('firstName check', () => {
        let wrapper = shallow(<MemoryRouter initialEntries={["/patients/add"]}><AddPatientPage store={store} {...props} /></MemoryRouter>).dive().dive().dive();
        wrapper.find('input[name="firstName"]').simulate('change', {
            target: {
                name: 'firstName', value: 'test'
            }
        })
        expect(wrapper.state('patient').firstName).toEqual('test');
    })

    it('kin address check', () => {
        let wrapper = shallow(<MemoryRouter initialEntries={["/patients/add"]}><AddPatientPage store={store} {...props} /></MemoryRouter>).dive().dive().dive();
        wrapper.find('input[name="kinAddress"]').simulate('change', {
            target: {
                name: 'kinAddress', value: 'test kin address'
            }
        })
        expect(wrapper.state('patient').kinAddress).toEqual('test kin address');
    })

    it('kin Phone Number check', () => {
        let wrapper = shallow(<MemoryRouter initialEntries={["/patients/add"]}><AddPatientPage store={store} {...props} /></MemoryRouter>).dive().dive().dive();
        wrapper.find('input[name="kinPhoneNumber"]').simulate('change', {
            target: {
                name: 'kinPhoneNumber', value: '11112223334'
            }
        })
        expect(wrapper.state('patient').kinPhoneNumber).toEqual('11112223334');
    })

    it('kin Email check', () => {
        let wrapper = shallow(<MemoryRouter initialEntries={["/patients/add"]}><AddPatientPage store={store} {...props} /></MemoryRouter>).dive().dive().dive();
        wrapper.find('input[name="kinEmailAddress"]').simulate('change', {
            target: {
                name: 'kinEmailAddress', value: 'test@t.t'
            }
        })
        expect(wrapper.state('patient').kinEmailAddress).toEqual('test@t.t');
    })

    it('should be able to edit patient', () => {
        store.dispatch = jest.fn();
        let wrapper = shallow(<MemoryRouter initialEntries={["/patients/edit/1"]}><AddPatientPage store={store} {...props} /></MemoryRouter>).dive().dive().dive();
        wrapper.setState({
            patient: {
                "id": "1",
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
            },
            submitted: false,
            mode: 'edit',
            id: '',
            hasData: true,
            viewMode: false
        });
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {
            }
        })
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('invalid kin Phone Number check', () => {
        store.dispatch = jest.fn();
        let wrapper = shallow(<MemoryRouter initialEntries={["/patients/edit/1"]}><AddPatientPage store={store} {...props} /></MemoryRouter>).dive().dive().dive();
        wrapper.setState({
            patient: {
                "id": "1",
                "gender": "F",
                "firstName": "GGGGGGG",
                "surName": "MMMMMM",
                "age": "44",
                "meritialStatus": "Married",
                "dob": "2020-08-26",
                "emailAddress": "mmm@mail.com",
                "phoneNumber": "1",
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
            },
            submitted: false,
            mode: 'add',
            id: '',
            hasData: true,
            viewMode: false
        });
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {
            }
        })
        expect(store.dispatch).toHaveBeenCalledTimes(0);
    })

});