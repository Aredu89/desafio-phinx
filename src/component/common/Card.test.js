import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card.js';

const selectCharacter = jest.fn()
const setPersonajeFavorito = jest.fn()

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
  it('Selección de favorito',()=>{
    const props = {
      character:{
        id: 1
      },
      selectCharacter: selectCharacter,
      setPersonajeFavorito: setPersonajeFavorito
    }
    const component = shallow(<Card {...props} />);
    component
      .find('img.favorito')
      .simulate('click')
    expect(setPersonajeFavorito).toHaveBeenCalled()
  })
  it('Selección de personaje',()=>{
    const props = {
      character:{
        id: 1,
        name: "",
        comics:{
          collectionURI: ""
        }
      },
      selectCharacter: selectCharacter,
      setPersonajeFavorito: setPersonajeFavorito
    }
    const component = shallow(<Card {...props} />);
    component
      .find('div.name')
      .simulate('click')
    expect(selectCharacter).toHaveBeenCalled()
  })

})