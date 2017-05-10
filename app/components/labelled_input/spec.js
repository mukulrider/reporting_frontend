import React from 'react';
import LabelledInput from './';

describe('Labelled component', () => {
  it('has a label with the appropriate class name', () => {
    expect(mount(<LabelledInput text="A label" type="text" label="a label" />).find('label'))
    .to.have.className('ui-component__label');
  });

  it('has an input the appropriate class name', () => {
    expect(mount(<LabelledInput text="A label" type="text" label="a label" />).find('input'))
    .to.have.className('ui-component__input-field');
  });
});
