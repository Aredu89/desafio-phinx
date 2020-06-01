import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header.js';

const clickFavoritos = jest.fn()

describe('Header', () => {
  it('Click en botón favoritos', () => {
    const props = {
      setFiltrarFavoritos: clickFavoritos
    }
    const component = mount(<Header {...props} />);
    component
      .find('img.favoritos')
      .simulate('click');
    expect(clickFavoritos).toHaveBeenCalled();
    component.unmount();
  });
})