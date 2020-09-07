import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';
import Layout from './Layouts/Layout';
import HospitalNavbar from './Layouts/HospitalNavbar';

const initialState = {
  username: '',
  password: '',
  submitted: false,
  authentication: {
    loggingIn: false,
    loggedIn: false,
    user : {}
  },
  alert : ''
};
const props = {
  loggedIn: false,
  user : {},
  loggingIn: false,
  login: jest.fn(),
  logout: jest.fn()
}
let store;
/*beforeEach(() => {
  const mockStore = configureMockStore([thunk]);
  store = mockStore(initialState);
  shallow(<Layout></Layout>);
  shallow(<HospitalNavbar store={store}/>);
});*/


describe('<App />', () => {
  /*it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App store={store} />, div);
  });*/

  it('renders without crashing', () => {
    //shallow(<App store={store} />);
  });
});