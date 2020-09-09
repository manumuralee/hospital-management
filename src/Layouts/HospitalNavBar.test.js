import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Nav } from 'react-bootstrap';

import HospitalNavbar from './HospitalNavbar';

configure({adapter: new Adapter()});

const mockStore = configureStore([]);

describe('<HospitalNavbar />', () => {
    let store;
 
  beforeEach(() => {
    store = mockStore({
        authentication: {
            loggedIn: true,
            user: [
                {
                  "firstName": "Manu",
                  "lastName": "Murali",
                  "username": "manumurali",
                  "password": "password",
                  "id": 2
                }
              ]
        }
    });
  });

  it('should render 5 nav links if loggedIn is true and user has value', () => {
    const wrapper = shallow(<HospitalNavbar store={store} />).dive();
    expect(wrapper.find(Nav.Link)).toHaveLength(5);
  })
})