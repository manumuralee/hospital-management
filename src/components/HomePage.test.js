import { AgGridReact } from 'ag-grid-react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { HomePage } from './HomePage';


configure({ adapter: new Adapter() });

const initialState = {
    patients: {
        loading: true,
        items: []
    }
};
const props = {
    patients: {
        loading: true,
        items: []
    },
    getAllPatients: jest.fn()
}
let store;

beforeEach(() => {
    const mockStore = configureMockStore([thunk]);
    store = mockStore(initialState)
});

describe('<HomePage />', () => {

    it('should display loading when loading is true', () => {
        let wrapper = shallow(<HomePage store={store} {...props} />).dive();
        expect(wrapper.containsMatchingElement(<em>Loading patients...</em>)).toBe(true);
    });

    it('should dispatch action to fetch all users on loading the page', () => {
        store.dispatch = jest.fn();
        shallow(<HomePage store={store} {...props} />).dive();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should render AGGridReact when patients are available', () => {
        let wrapper = shallow(<HomePage store={store} {...props} />).dive();
        const patients = {
            loading: false,
            items: [
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

            ]
        }
        wrapper.setProps({ patients: patients });
        expect(wrapper.find(AgGridReact)).toHaveLength(1);
    });

});

