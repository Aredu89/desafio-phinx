import React from 'react';
import { mount } from 'enzyme';
import Header from './Header.js';

const clickFavoritos = jest.fn()
const onChange = jest.fn()

describe('Header', () => {
  const props = {
    setFiltrarFavoritos: clickFavoritos,
    onFilterChange: onChange,
    filterValue: 'spider'
  }
  const component = mount(<Header {...props} />);
  it('Click en botón favoritos', () => {
    component
      .find('img.favoritos')
      .simulate('click');
    expect(clickFavoritos).toHaveBeenCalled();
  });
  it('OnChange del input',()=>{
    component
      .find('input.input')
      .simulate('change', {
        target:{
          value: 'spider'
        }
      })
    expect(onChange).toHaveBeenCalled();
  })
  it('Valor del input por props',()=>{
    expect(component
      .find('input.input')
      .prop('value')).toEqual('spider')
  })
  it('Render',()=>{
    expect(component).toMatchSnapshot();
  })
})