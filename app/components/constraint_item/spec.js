import React from 'react';
import ConstraintItem from './';

describe('ConstraintItem component', () => {
  it('renders an li tag', () => {
    const constraint = {
      type: 'minLength',
      hintText: '8 x characters',
      validator: (val) => val.length >= 8,
    };

    expect(shallow(<ConstraintItem hintText={constraint.hintText} isValid />))
      .to.have.tagName('li');
  });

  it('renders the correct text for the constraint', () => {
    const constraint = {
      type: 'minLength',
      hintText: '8 x characters',
      validator: (val) => val.length >= 8,
    };

    expect(shallow(<ConstraintItem hintText={constraint.hintText} isValid />))
    .to.have.text('8 x characters');
  });

  it('renders the correct class for a valid constraint', () => {
    const constraint = {
      type: 'minLength',
      hintText: '8 x characters',
      validator: (val) => val.length >= 8,
    };

    expect(shallow(<ConstraintItem hintText={constraint.hintText} isValid />)
      .find('li'))
      .to.have.className('constraints__item--valid');
  });

  it('renders the correct class for an invalid constraint', () => {
    const constraint = {
      type: 'minLength',
      hintText: '8 x characters',
      validator: (val) => val.length >= 8,
    };

    expect(
      shallow(
        <ConstraintItem hintText={constraint.hintText} isValid={false} />
      )
      .find('li'))
      .to.have.className('constraints__item--invalid');
  });
});
