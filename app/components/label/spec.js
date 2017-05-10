import React from 'react';
import Label from './';

describe('Label component', () => {
  it('has the appropriate class name', () => {
    expect(shallow(<Label text="A label" />).find('label'))
    .to.have.className('ui-component__label');
  });

  it('has the appropriate text', () => {
    expect(shallow(<Label text="A label" />).find('label'))
    .to.have.text('A label');
  });

  it('renders any children nested inside it', () => {
    expect(mount(<Label text="A label"><input type="text" /></Label>).find('input'))
    .to.have.length(1);
  });
});
