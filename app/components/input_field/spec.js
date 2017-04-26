import React from 'react';
import InputField from './';

describe('InputField component', () => {
  it('has the appropriate class name', () => {
    expect(shallow(<InputField type="text" label="test" />).find('input'))
    .to.have.className('ui-component__input-field');
  });

  it('has an input field of specified type', () => {
    expect(shallow(<InputField type="email" label="test" />).find('input'))
    .to.have.attr('type', 'email');
  });

  it('renders any additional props that are passed to it', () => {
    expect(shallow(<InputField type="email" label="test" placeholder="test" />).find('input'))
    .to.have.attr('placeholder', 'test');
  });
});
