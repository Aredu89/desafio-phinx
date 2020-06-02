import React from 'react';
import { shallow } from 'enzyme';
import Lista from './Lista.js';

describe('Lista', () => {
  it('Debería renderizar sin datos',()=>{
    const props = {
      data: []
    }
    const component = shallow(<Lista {...props} />);
    expect(component).toMatchSnapshot();
  })
  it('Debería listar 2 cards',()=>{
    const props = {
      data: [
        {
          id: 1,
          name: "1"
        },
        {
          id: 2,
          name: "2"
        },
      ]
    }
    const component = shallow(<Lista {...props} />);
    expect(component
      .find('Card')
      .length).toEqual(2)
  })
  it('Debería mostrar Spinner',()=>{
    const props = {
      data: [],
      isLoading: true
    }
    const component = shallow(<Lista {...props} />);
    expect(component
      .find('Spinner')
      .length).toEqual(1)
  })
  it('Debería mostrar error',()=>{
    const props = {
      data: [],
      isError: true
    }
    const component = shallow(<Lista {...props} />);
    expect(component
      .find('Error')
      .length).toEqual(1)
  })
})