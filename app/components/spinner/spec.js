import React from 'react';
import Spinner from './';

describe('Spinner component', () => {
  it('renders a spinner cointainer', () => {
    expect(shallow(<Spinner />).find('.spinner-container'))
      .to.have.length(1);
  });

  it('renders a spinner overlay', () => {
    expect(shallow(<Spinner />).find('.spinner-overlay'))
      .to.have.length(1);
  });

  it('renders a spinner', () => {
    expect(shallow(<Spinner />).find('.spinner'))
      .to.have.length(1);
  });
});
