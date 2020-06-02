import React from 'react';
import { shallow } from 'enzyme';
import Error from './Error.js';

describe('Error',()=>{
  it('Render sin props',()=>{
    const component = shallow(<Error />);
    expect(component).toMatchSnapshot()
  })
  it('Mensaje de error por props',()=>{
    const props = {
      message: 'Error'
    }
    const component = shallow(<Error {...props} />);
    expect(component
      .find('.alert-danger p')
      .length).toEqual(1)
  })
})