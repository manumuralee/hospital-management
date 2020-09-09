import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

import Layout from './Layout';
import HospitalNavbar from "./HospitalNavbar";

configure({adapter: new Adapter()});
describe('<Layout />', () => {
  it('should render HospitalNavbar component', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find(HospitalNavbar)).toHaveLength(1);
  });
})