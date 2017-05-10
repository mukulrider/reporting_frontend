import React from 'react';
import ErrorText from './';

describe('ErrorText component', () => {
  it('should have the appropriate class name', () => {
    expect(mount(<ErrorText text="An error message" />).find('span'))
      .to.have.className('ui-component__error-text');
  });

  it('should have the appropriate text', () => {
    expect(mount(<ErrorText text="An error message" />).find('span'))
      .to.have.text('An error message');
  });

  it('should be visually hidden if appropriate prop set', () => {
    expect(mount(<ErrorText text="An error message" visuallyHidden />)
      .find('span'))
      .to.have.className('visuallyhidden');
  });

  it('should have an alert role', () => {
    expect(mount(<ErrorText text="An error message" />).find('span'))
      .to.have.attr('role', 'alert');
  });
});
