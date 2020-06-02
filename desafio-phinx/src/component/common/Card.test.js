import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card.js';

describe('Card', () => {
  it('Render',()=>{
    const props = {
      character:{
        id: 1
      }
    }
    const component = shallow(<Card {...props} />);
    expect(component).toMatchSnapshot();
  })
})