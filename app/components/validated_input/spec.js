import React from 'react';
import ValidatedInput from './';

describe('ValidatedInput component', () => {
  it('renders the correct label', () => {
    const callback = () => {
      // do nothing.
    };

    expect(mount(
      <ValidatedInput
        valueUpdated={callback}
        label="A label"
        fieldBlurred={callback} valid id="someId"
      />)
      .find('label'))
      .to.have.text('A label');
  });

  it('has an input field of specified type', () => {
    const callback = () => {
      // do nothing.
    };

    expect(mount(
      <ValidatedInput
        type="text"
        label="test"
        valueUpdated={callback}
        fieldBlurred={callback} valid id="someId"
      />)
      .find('input'))
      .to.have.attr('type', 'text');
  });

  it('renders a ui-component__validated-field--valid class ' +
  ' when passed the corresponding valid flag via props', () => {
    const callback = () => {
      // do nothing.
    };

    expect(mount(
      <ValidatedInput
        type="text"
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
      <ValidatedInput
        type="text"
        label="test"
        valueUpdated={callback}
        fieldBlurred={callback}
        valid={false} id="someId"
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
      <ValidatedInput
        type="text"
        label="test"
        valueUpdated={callback}
        fieldBlurred={callback} valid id="someId"
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
      <ValidatedInput
        type="text"
        label="test"
        valueUpdated={callback}
        fieldBlurred={callback}
        valid={false}
        id="someId"
      />)
      .find('.ui-component__input-field'))
    .to.have.attr('aria-invalid', 'true');
  });

  it('renders an span with an id of text-field-error-text when ' +
  ' the valid flag is false', () => {
    const callback = () => {
      // do nothing.
    };

    expect(
      mount(
        <ValidatedInput
          type="text"
          label="test"
          valueUpdated={callback}
          fieldBlurred={callback}
          valid={false}
          id="someId"
          errorTextId="text-field-error-text"
          clientErrorText="Please enter a valid text address"
        />
      ).find('#text-field-error-text')
    ).to.have.text('Please enter a valid text address');
  });

  it('renders with the classes that were passed in', () => {
    const callback = () => {
      // do nothing.
    };

    expect(
      mount(
        <ValidatedInput
          type="text"
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

  it('calls the onValueChange prop onChange if it is passed in', () => {
    let called = false;
    const callback = () => {
      called = true;
    };

    const component = mount(
      <ValidatedInput
        type="text"
        label="test"
        valueUpdated={callback}
        fieldBlurred={callback}
        valid={false}
        id="someId"
        classes="test1"
        onValueChange={callback}
      />
    );

    component.find('input').simulate('change', { target: '123456789' });
    expect(called).to.equal(true);
  });

  it('renders a class for the passed in ID', () => {
    const callback = () => {
      // do nothing.
    };

    expect(
      mount(
        <ValidatedInput
          type="text"
          label="test"
          valueUpdated={callback}
          fieldBlurred={callback}
          valid={false}
          id="someId"
        />
      )
    ).to.have.className('some-id');
  });
  it('renders description passed from props', () => {
    const callback = () => {
      // do nothing.
    };
    const component = mount(
      <ValidatedInput
        label="validated input"
        valueUpdated={callback}
        fieldBlurred={callback}
        valid
        id="id"
        description="Example description"
      />
    );

    expect(component.find('p').length).to.be.equal(1);
  });
});
