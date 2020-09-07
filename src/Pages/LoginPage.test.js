import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LoginPage } from './LoginPage';

configure({ adapter: new Adapter() });

const initialState = {
    username: '',
    password: '',
    submitted: false,
    authentication: {
        loggingIn: false
    }
};
const props = {
    loggingIn: false,
    login: jest.fn(),
    logout: jest.fn()
}
let store;
beforeEach(() => {
    const mockStore = configureMockStore([thunk]);
    store = mockStore(initialState);
});

describe('<LoginPage />', () => {
    it('username check', () => {
        let wrapper = shallow(<LoginPage store={store} />).dive();
        wrapper.find('input[type="text"]').simulate('change', {
            target: {
                name: 'username', value: 'testuser'
            }
        })
        expect(wrapper.state('username')).toEqual('testuser');
    });

    it('password check', () => {
        let wrapper = shallow(<LoginPage store={store} />).dive();
        wrapper.find('input[type="password"]').simulate('change', {
            target: {
                name: 'password', value: 'test'
            }
        })
        expect(wrapper.state('password')).toEqual('test');
    })
});

