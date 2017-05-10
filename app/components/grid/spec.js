import React from 'react';
import Grid from './';

describe('Grid component', () => {
  it('renders a grid container with correct class', () => {
    expect(mount(<Grid />).find('.ui-component__grid').length)
      .to.have.equal(1);
  });
});
