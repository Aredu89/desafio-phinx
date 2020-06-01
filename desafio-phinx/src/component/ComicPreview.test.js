import React from 'react';
import { shallow } from 'enzyme';
import ComicPreview from './ComicPreview.js';

describe('ComicPreview', () => {
  it('Debería renderizar bien sin props', () => {
    const component = shallow(<ComicPreview />);
    expect(component).toMatchSnapshot();
  });
  it('Debería renderizar bien con id de comic por props', () => {
    const props = {
      idComicPreview: '70719'
    }
    const component = shallow(<ComicPreview {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('Debería renderizar bien con error e id por props', () => {
    const props = {
      idComicPreview: '70719',
      error: 'Error'
    }
    const component = shallow(<ComicPreview {...props} />);
    expect(component).toMatchSnapshot();
  });
})