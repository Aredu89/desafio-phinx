import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App.js';

describe('App', () => {
  const props = {
    history: {
      location:{
        search: '',
        pathname: ''
      }
    }
  }
  const component = shallow(<App {...props} debug />);
  it('Debería renderizar bien en "debug mode"', () => {
    expect(component).toMatchSnapshot();
  });
  it('Debería renderizar bien con query string', () => {
    const props2 = {
      history: {
        location:{
          search: '?character=spider',
          pathname: ''
        }
      }
    }
    const component2 = shallow(<App {...props2} debug />);
    expect(component2).toMatchSnapshot();
  });
  it('Debería tener Header con sus props', () => {
    expect(component.find('Header').props()).toEqual({
      filterValue: "",
      filtrarFavoritos: false,
      onFilterChange: expect.any(Function),
      onFilterEnter: expect.any(Function),
      setFiltrarFavoritos: expect.any(Function)
    })
  })
  it('Debería tener un componente Lista con sus props', () => {
    expect(component.find('Lista').props()).toEqual({
      data: expect.any(Array),
      isLoading: false,
      isError: false,
      selectCharacter: expect.any(Function),
      setPersonajeFavorito: expect.any(Function)
    })
  })
  it('OnChange del filtro en header debería actualizar el estado', () => {
    component.find('Header').prop('onFilterChange')({
      target: {
        value: 'Spider'
      }
    })
    expect(component.find('Header').prop('filterValue')).toEqual(
      'Spider'
    )
  })
  it('Filtro de favoritos', () => {
    expect(component.find('Header').prop('filtrarFavoritos')).toEqual(false)
    component.find('Header').prop('setFiltrarFavoritos')(true)
    expect(component.find('Header').prop('filtrarFavoritos')).toEqual(true)
  })
  it('Preview al ingresar URL valida', ()=>{
    expect(component.find('ComicPreview').length).toEqual(0)
    component.find('Header').prop('onFilterEnter')({
      key: 'Enter',
      target:{
        value: 'https://www.marvel.com/comics/issue/70718/the_amazing_spider-man_2018_22'
      }
    })
    expect(component.find('ComicPreview').length).toEqual(1)
  })
});