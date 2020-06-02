import React from 'react';
import { shallow } from 'enzyme';
import ComicsModal from './ComicsModal.js';

const clickFavorito = jest.fn()

describe('Comics Modal', () => {
  const props = {
    selectedCharacter:{
      URI: "http://gateway.marvel.com/v1/public/characters/1009482/comics",
      id: 1009482,
      name: "Omega Red"
    },
    history: {
      location: {
        search: "?character=Omega Red"
      }
    },
    setComicFavorito: clickFavorito
  }
  const component = shallow(<ComicsModal {...props} />);
  it('Renderizado con personaje seleccionado', () => {
    expect(component).toMatchSnapshot();
  });
  it('Debería tener un componente ComicsList',() => {
    expect(component.find('ComicsList').length).toEqual(1)
  })
  it('Click en favoritos',() => {
    component.find('ComicsList').prop('setComicFavorito')(
      14281,
      true
    )
    expect(clickFavorito).toHaveBeenCalled();
  })
})