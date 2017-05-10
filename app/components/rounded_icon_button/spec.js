import React from 'react';
import RoundedIconButton from './';

describe('RoundedIconButton component', () => {
  it('has the appropriate class name', () => {
    expect(shallow(<RoundedIconButton icon="menu" />).find('button'))
      .to.have.className('ui-component__rounded-icon-button');
  });

  it('adds the appropriate icon class name', () => {
    const icon = 'menu';

    expect(shallow(<RoundedIconButton icon={icon} />).find('span'))
      .to.have.className(`ui-component__icon--${icon}`);
  });
});
