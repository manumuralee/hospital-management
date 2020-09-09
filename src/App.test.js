import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Router } from 'react-router-dom';
import App from './App';

const defaultProp = {};
const setup = (props = {}) => {
  const setupProps = { ...defaultProp, ...props };
  return shallow(<App {...setupProps} />);
};

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<App />', () => {

  it('renders render Routes', () => {
    const wrapper = setup();
    expect(wrapper.find(Router).length).toBe(1);
  });
});