import React from 'react';
import FormHeader from './';

describe('FormHeader component', () => {
  it('has the appropriate class name', () => {
    expect(shallow(
      <FormHeader title="Default" description="Default" />
      ).find('div'))
      .to.have.className('ui-component__form-header');
  });

  it('has a title', () => {
    expect(shallow(
      <FormHeader title="Default" description="Default" />
      ).find('h1'))
      .to.have.text('Default');
  });

  it('has a description', () => {
    expect(shallow(
      <FormHeader title="Default" description="Default" />
      ).find('p'))
      .to.have.text('Default');
  });
});
