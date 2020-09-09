
import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { PrivateRoute } from './PrivateRoute';
import { HomePage } from '../Components';
const defaultProp = {};

describe('56730186', () => {
    it('should render component if user has been authenticated', () => {
       
        const props = { path: '/home', component: HomePage };

        const enzymeWrapper = shallow(
            <MemoryRouter initialEntries={[props.path]}>
                <PrivateRoute props={props} {...props} />
            </MemoryRouter>,
        );

        expect(enzymeWrapper.exists(HomePage)).toBe(false);
    });

    it('should redirect if user is not authenticated', () => {     
        const props = { path: '/home', component: HomePage };

        const enzymeWrapper = shallow(
            <MemoryRouter initialEntries={[props.path]}>
                <PrivateRoute props={props} {...props} />
            </MemoryRouter>,
        );
        const history = enzymeWrapper.find('Router').prop('history');
        expect(history.location.pathname).toBe('/home');
    });
});