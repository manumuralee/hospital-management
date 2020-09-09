import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { UsersPage } from './UsersPage';
import { authentication } from '../reducers/authentication.reducer';

configure({ adapter: new Adapter() });

const initialState = {
    users: {
        loading: true,
    },
    authentication: {
        loggedIn: true
    }
};
const props = {
    getUsers: jest.fn(),
    deleteUser: jest.fn(),
    users: {},
    user: []
}
let store;

beforeEach(() => {
    const mockStore = configureMockStore([thunk]);
    store = mockStore(initialState)
});

describe('<UsersPage />', () => {
    it('should display loading when loading is true', () => {
        let wrapper = shallow(<UsersPage store={store} {...props} />).dive();
        expect(wrapper.containsMatchingElement(<em>Loading users...</em>)).toBe(true);
    });
    it('should dispatch delete action on delete button click', () => {
        store.dispatch = jest.fn();
        const newProps = {
            users: {
                loading: false,
                items: [
                    {
                      "firstName": "Manu",
                      "lastName": "Murali",
                      "username": "manumurali",
                      "password": "password",
                      "id": 2
                    }
                  ]
            }
        }
        let wrapper = shallow(<UsersPage store={store}/>).dive();
        wrapper.setProps({users: newProps.users});
        expect(wrapper.find('tr')).toHaveLength(2);
    })
});

