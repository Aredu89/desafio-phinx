import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner.js';

describe('Spinner',()=>{
  it('Render sin props',()=>{
    const component = shallow(<Spinner />);
    expect(component).toMatchSnapshot()
  })
})