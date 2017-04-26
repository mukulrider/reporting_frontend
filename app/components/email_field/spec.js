import React from 'react';
import EmailField from './';

describe('Email component', () => {
  it('renders the correct default label', () => {
    const callback = () => {
      // do nothing.
    };

    expect(mount(
      <EmailField
        valueUpdated={callback}
        fieldBlurred={callback} valid id="someId"
      />)
      .find('label'))
      .to.have.text('Email address');
  });

  it('has an input field of specified type', () => {
    const callback = () => {
      // do nothing.
    };

    expect(mount(
      <EmailField
        type="email"
        label="test"
        valueUpdated={callback}
        fieldBlurred={callback} valid id="someId"
      />)
      .find('input'))
      .to.have.attr('type', 'email');
  });

  it('renders a ui-component__validated-field--valid class ' +
  ' when passed the corresponding valid flag via props', () => {
    const callback = () => {
      // do nothing.
    };

    expect(mount(
      <EmailField
        type="email"
        label="test"
        valueUpdated={callback}
        fieldBlurred={callback}
        valid id="someId"
      />)
      .find('.ui-component__validated-field'))
      .to.have.className('ui-component__validated-field--valid');
  });

  it('renders a ui-component__validated-field--invalid class ' +
  ' when passed the corresponding valid flag via props', () => {
    const callback = () => {
      // do nothing.
    };

    expect(mount(
      <EmailField
        type="email"
        label="test"
        valueUpdated={callback}
        fieldBlurred={callback}
        valid={false}
        id="someId"
      />)
      .find('.ui-component__validated-field'))
      .to.have.className('ui-component__validated-field--invalid');
  });

  it('renders an aria-invalid attribute with a falsey value when ' +
  ' the fields valid flag is false', () => {
    const callback = () => {
      // do nothing.
    };

    expect(mount(
      <EmailField
        type="email"
        label="test"
        valueUpdated={callback}
        fieldBlurred={callback}
        valid
        id="someId"
      />)
      .find('.ui-component__input-field'))
      .to.have.attr('aria-invalid', 'false');
  });

  it('renders an aria-invalid attribute with a truthy value when ' +
  ' the fields valid flag is true', () => {
    const callback = () => {
      // do nothing.
    };

    expect(mount(
      <EmailField
        type="email"
        label="test"
        valueUpdated={callback}
        fieldBlurred={callback}
        valid={false}
        id="someId"
      />)
      .find('.ui-component__input-field'))
    .to.have.attr('aria-invalid', 'true');
  });

  it('renders an span with an id of email-field-error-text when ' +
  ' the valid flag is false', () => {
    const callback = () => {
      // do nothing.
    };

    expect(
      mount(
        <EmailField
          type="email"
          label="test"
          valueUpdated={callback}
          fieldBlurred={callback}
          valid={false}
          id="someId"
          errorTextId="email-field-error-text"
          clientErrorText="Please enter a valid email address"
        />
      ).find('#email-field-error-text')
    ).to.have.text('Please enter a valid email address');
  });

  it('renders with the classes that were passed in', () => {
    const callback = () => {
      // do nothing.
    };

    expect(
      mount(
        <EmailField
          type="email"
          label="test"
          valueUpdated={callback}
          fieldBlurred={callback}
          valid={false}
          id="someId"
          classes="test1"
        />
      )
    ).to.have.className('test1');
  });

  it('renders with default placeholder email attribute when no prop supplied', () => {
    const callback = () => {
      // do nothing.
    };

    expect(mount(
      <EmailField
        type="email"
        label="test"
        valueUpdated={callback}
        fieldBlurred={callback}
        valid={false}
        id="someId"
        classes="test1"
      />)
      .find('.ui-component__input-field'))
      .to.have.attr('placeholder', 'name@example.com');
  });

  it('renders a placeholder email attribute when prop is supplied', () => {
    const callback = () => {
      // do nothing.
    };

    expect(mount(
      <EmailField
        type="email"
        label="test"
        placeholder="testing123"
        valueUpdated={callback}
        fieldBlurred={callback}
        valid={false}
        id="someId"
        classes="test1"
      />)
      .find('.ui-component__input-field'))
      .to.have.attr('placeholder', 'testing123');
  });
});
