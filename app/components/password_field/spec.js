import React from 'react';
import PasswordField from './';

const valueUpdated = () => { /* empty func */ };
const fieldBlurred = () => { /* empty FUNK */ };
const id = 'password';
const fieldClass = 'ui-component__password-field';
const inputClass = 'ui-component__input-field';
const toggleButtonClass = 'ui-component__password-field__show-hide';
const blurredClass = 'ui-component__password-field--blurred';
const focusedClass = 'ui-component__password-field--focused';
const constraintsClass = 'constraints';
const errorTextId = 'password-field-error-text';

describe('PasswordField component', () => {
  it('renders .ui-component__password-field div', () => {
    expect(
      shallow(
        <PasswordField
          id={id}
          valueUpdated={valueUpdated}
          fieldBlurred={fieldBlurred}
        />
      ).find(`.${fieldClass}`)
    ).to.have.length(1);
  });

  it('does not render a toggle password text button', () => {
    expect(
      mount(
        <PasswordField
          id={id}
          valueUpdated={valueUpdated}
          fieldBlurred={fieldBlurred}
        />
      ).find(`.${toggleButtonClass}`)
    ).to.be.length(0);
  });

  it('initially renders the PasswordField with a class of .ui-component__password-field--blurred', () => { // eslint-disable-line max-len
    expect(
      shallow(
        <PasswordField
          id={id}
          valueUpdated={valueUpdated}
          fieldBlurred={fieldBlurred}
        />
      ).find(`.${fieldClass}`)
    ).to.have.className(blurredClass);
  });

  it('adds a class of .ui-component__password-field--focused when the input receives focus', () => { // eslint-disable-line max-len
    const component = mount( // eslint-disable-line newline-after-var
      <PasswordField
        id={id}
        valueUpdated={valueUpdated}
        fieldBlurred={fieldBlurred}
      />
    );
    component.find('input').simulate('focus');
    expect(component.find(`.${fieldClass}`)).to.have.className(focusedClass);
  });

  it('adds a class of .ui-component__password-field--blurred when the input is blurred', () => { // eslint-disable-line max-len
    const constraints = [
      {
        type: 'minLength',
        text: <span>8 x characters</span>,
        validator: (val) => val.length >= 8,
      },
    ];
    const component = mount( // eslint-disable-line newline-after-var
      <PasswordField
        id={id}
        valueUpdated={valueUpdated}
        fieldBlurred={fieldBlurred}
        constraints={constraints}
      />
    );
    component.find('input').simulate('focus');
    component.find('input').simulate('blur');
    expect(component.find(`.${fieldClass}`)).to.have.className(blurredClass);
  });

  it('renders a constraints div if showConstraints is passed in', () => {
    const constraints = [ // eslint-disable-line newline-after-var
      {
        type: 'minLength',
        text: <span>8 x characters</span>,
        validator: (val) => val.length >= 8,
      },
    ];
    expect(
      mount(
        <PasswordField
          id={id}
          valueUpdated={valueUpdated}
          fieldBlurred={fieldBlurred}
          constraints={constraints}
          showConstraints
        />
      ).find(`.${constraintsClass}`)
    ).to.have.length(1);
  });

  it('renders no constraints div if showConstraints is not passed in', () => {
    const constraints = [ // eslint-disable-line newline-after-var
      {
        type: 'minLength',
        text: <span>8 x characters</span>,
        validator: (val) => val.length >= 8,
      },
    ];
    expect(
      mount(
        <PasswordField
          id={id}
          valueUpdated={valueUpdated}
          fieldBlurred={fieldBlurred}
          constraints={constraints}
        />
      ).find(`.${constraintsClass}`)
    ).to.have.length(0);
  });

  it('renders no constraints div if showConstraints is passed and constraints array is empty', () => { // eslint-disable-line max-len
    expect(
      mount(
        <PasswordField
          id={id}
          valueUpdated={valueUpdated}
          fieldBlurred={fieldBlurred}
          showConstraints
        />
      ).find(`.${constraintsClass}`)
    ).to.have.length(0);
  });

  it('prevents the constraints div from being hidden onblur if the valid flag is false', () => { // eslint-disable-line max-len
    const constraints = [
      {
        type: 'minLength',
        text: <span>8 x characters</span>,
        validator: (val) => val.length >= 8,
      },
    ];
    const component = mount(
      <PasswordField
        id={id}
        valid={false}
        constraints={constraints}
        valueUpdated={valueUpdated}
        fieldBlurred={fieldBlurred}
        showConstraints
      />
    );
    const input = component.find('input');

    input.simulate('focus');
    input.simulate('change', { target: { value: '12345' } });
    input.simulate('blur');
    expect(
      component.find(`.${constraintsClass}`)
    ).to.have.className('constraints--focused');
  });

  it('renders aria-invalid=false when field is valid', () => {
    expect(
      mount(
        <PasswordField
          id={id}
          valueUpdated={valueUpdated}
          fieldBlurred={fieldBlurred}
        />
      ).find(`.${inputClass}`)
    ).to.have.attr('aria-invalid', 'false');
  });

  it('renders aria-invalid=true when field is invalid', () => {
    expect(
      mount(
        <PasswordField
          id={id}
          valueUpdated={valueUpdated}
          fieldBlurred={fieldBlurred}
          valid={false}
        />
      ).find(`.${inputClass}`)
    ).to.have.attr('aria-invalid', 'true');
  });

  it('renders no error message if it is passed in but field is valid', () => {
    expect(
      mount(
        <PasswordField
          id={id}
          valueUpdated={valueUpdated}
          fieldBlurred={fieldBlurred}
          clientErrorText="this is an error message"
        />
      ).find(`#${errorTextId}`)
    ).to.have.length(0);
  });

  it('renders no error message if it is not passed in and field is invalid', () => { // eslint-disable-line max-len
    expect(
      mount(
        <PasswordField
          id={id}
          valueUpdated={valueUpdated}
          fieldBlurred={fieldBlurred}
          valid={false}
        />
      ).find(`#${errorTextId}`)
    ).to.have.length(0);
  });

  it('renders additional classes that were passed in', () => {
    const classes = ['testClass1', 'testClass2'];
    const component = mount( // eslint-disable-line newline-after-var
      <PasswordField
        id={id}
        valueUpdated={valueUpdated}
        fieldBlurred={fieldBlurred}
        classes={classes}
      />
    );
    expect(component).to.have.className(classes[0]);
    expect(component).to.have.className(classes[1]);
  });
});

describe('PasswordField component with toggle password text option turned on', () => { // eslint-disable-line max-len
  it('renders toggle text button', () => {
    expect(
      mount(
        <PasswordField
          id={id}
          valueUpdated={valueUpdated}
          fieldBlurred={fieldBlurred}
          showToggleTextButton
        />
      ).find(`.${toggleButtonClass}`)
    ).to.be.length(1);
  });

  it('renders toggle text button initially with "Show" button', () => {
    expect(
      mount(
        <PasswordField
          id={id}
          valueUpdated={valueUpdated}
          fieldBlurred={fieldBlurred}
          showToggleTextButton
        />
      ).find(`.${toggleButtonClass}`).text()
    ).to.equal('Show');
  });

  it('renders toggle text button with password masked initially', () => {
    expect(
      mount(
        <PasswordField
          id={id}
          valueUpdated={valueUpdated}
          fieldBlurred={fieldBlurred}
          showToggleTextButton
        />
      ).find('input').props().type
    ).to.equal('password');
  });

  it('clicking "Show" button reveals password', () => {
    const component = mount(
      <PasswordField
        id={id}
        valueUpdated={valueUpdated}
        fieldBlurred={fieldBlurred}
        showToggleTextButton
      />
    );
    const toggleButton = component.find(`.${toggleButtonClass}`);

    toggleButton.simulate('click'); // click Hide
    expect(component.find('input').props().type).to.equal('text');
  });

  it('clicking "Show" button changes button text to "Hide"', () => {
    const component = mount(
      <PasswordField
        id={id}
        valueUpdated={valueUpdated}
        fieldBlurred={fieldBlurred}
        showToggleTextButton
      />
    );
    const toggleButton = component.find(`.${toggleButtonClass}`);

    toggleButton.simulate('click'); // click Show
    expect(toggleButton.text()).to.equal('Hide');
  });

  it('clicking "Hide" button masks password', () => {
    const component = mount(
      <PasswordField
        id={id}
        valueUpdated={valueUpdated}
        fieldBlurred={fieldBlurred}
        showToggleTextButton
      />
    );
    const toggleButton = component.find(`.${toggleButtonClass}`);

    toggleButton.simulate('click'); // click Show
    toggleButton.simulate('click'); // click Hide
    expect(component.find('input').props().type).to.equal('password');
  });

  it('clicking "Hide" button restores button text to "Show"', () => {
    const component = mount(
      <PasswordField
        id={id}
        valueUpdated={valueUpdated}
        fieldBlurred={fieldBlurred}
        showToggleTextButton
      />
    );
    const toggleButton = component.find(`.${toggleButtonClass}`);

    toggleButton.simulate('click'); // click Show
    toggleButton.simulate('click'); // click Hide
    expect(toggleButton.text()).to.equal('Show');
  });
});
