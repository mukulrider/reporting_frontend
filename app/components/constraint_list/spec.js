import React from 'react';
import ConstraintList from './';

describe('ConstraintList component', () => {
  const constraints = [
    { type: 'minLength',
      text: <span>8 x characters</span>,
      validator: (val) => val.length >= 8 },
    { type: 'oneLowercase',
      text: <span>1 x lowercase letter</span>,
      validator: (val) => /[a-z]/.test(val) },
    { type: 'oneUppercase',
      text: <span>1 x uppercase letter</span>,
      validator: (val) => /[A-Z]/.test(val) },
    { type: 'oneUppercase',
      text:
        <span>
          1 x number or special character
          <br /> (e.g. 1 2 3 4 or £ $ ! ?)
        </span>,
      validator: (val) => /[0-9£$!?<>_-]/.test(val) },
  ];
  const constraintsHint = 'Your password must include at least:';

  it('renders constraints div with a class of ' +
  'constraints--blurred when isVisible set to false', () => {
    expect(shallow(
      <ConstraintList
        constraints={constraints}
        constraintsHint={constraintsHint}
        renderedOnClient
      />
    ).find('.constraints')).to.have.className('constraints--blurred');
  });

  it('renders constraints div with a class of constraints--focused ' +
  'when isVisible set to true', () => {
    expect(shallow(
      <ConstraintList
        constraints={constraints}
        constraintsHint={constraintsHint}
        isVisible
        renderedOnClient
      />
    ).find('.constraints')).to.have.className('constraints--focused');
  });

  it('renders constraints div with a class of constraints--server-init ' +
  'when not rendered on client', () => {
    expect(shallow(
      <ConstraintList
        constraints={constraints}
        constraintsHint={constraintsHint}
        renderedOnClient={false}
      />
    ).find('.constraints')).to.have.className('constraints--server-init');
  });

  it('renders a constraints hint with the correct text', () => {
    expect(shallow(
      <ConstraintList
        constraints={constraints}
        constraintsHint={constraintsHint}
        renderedOnClient
      />
    ).find('.constraints__hint'))
    .to.have.text('Your password must include at least:');
  });

  it('renders a constraints list', () => {
    expect(shallow(
      <ConstraintList
        constraints={constraints}
        constraintsHint={constraintsHint}
        renderedOnClient
      />
    ).find('.constraints__list')).to.have.length(1);
  });

  it('renders nothing when no constraints are passed via props', () => {
    expect(mount(
      <ConstraintList
        constraintsHint={constraintsHint}
        renderedOnClient
      />
    ).find('.constraints')).to.have.length(0);
  });

  it(
  'renders the corresponding amount of contstraint list items ' +
  ' when constraints are passed via props', () => {
    const constraint = { type: 'minLength' };
    const component = mount(
      <ConstraintList
        constraints={[constraint]}
        constraintsHint={constraintsHint}
        renderedOnClient
      />
    );

    expect(component.find('.constraints__item')).to.have.length(1);
  });
});
