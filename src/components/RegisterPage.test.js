import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RegisterPage } from './RegisterPage';

configure({ adapter: new Adapter() });

const initialState = {
    registration: {
        registering: false
    }
};
const props = {
    registering: false,
    clearAlerts: jest.fn(),
    register: jest.fn()
}
let store;

beforeEach(() => {
    const mockStore = configureMockStore([thunk]);
    store = mockStore(initialState)
});

describe('<RegisterPage />', () => {

    it('should dispatch register action on register button click', () => {
        store.dispatch = jest.fn();
        let wrapper = shallow(<RegisterPage store={store} {...props} />).dive();
        wrapper.setState({user: {firstName: 'test', lastName: 'testuser', username: 'testuser', password: 'test'}});
        // wrapper.find('input[type="text"]').simulate('change', {
        //     target: {
        //         name: 'username', value: 'manumurali'
        //     }
        // })
        // wrapper.find('input[type="password"]').simulate('change', {
        //     target: {
        //         name: 'password', value: 'password'
        //     }
        // })
        wrapper.find('form').simulate('submit', { 
            preventDefault: () => {
        } })
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    })
});

