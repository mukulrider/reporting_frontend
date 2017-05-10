import React from 'react';
import ValidatedField from './';
import classNames from 'classnames';

/* create a fake component that extends validatedField to allow for testing */
class TestComponent extends ValidatedField {

  static defaultProps = {
    id: 'testField',
    value: '',
  };

  constructor(props) {
    super(props);
    this.state.fieldId = props.id;
  }

  render() {
    const valid = this.state.valid ? 'valid' : 'invalid';
    const classes = classNames(
      'ui-component__validated-field',
      `ui-component__validated-field--${valid}`
    );

    return (
      <div className={classes}>
        <input
          value={this.props.value}
          type="text"
          onChange={this.updateValue} // eslint-disable-line react/jsx-handler-names
          onBlur={this.blurField} // eslint-disable-line react/jsx-handler-names
          onFocus={this.focusField} // eslint-disable-line react/jsx-handler-names
        />
        {this.renderErrorText()}
      </div>
    );
  }
}

describe('ValidatedField component', () => {
  it('renders a containing .ui-component__validated-field-wrapper div', () => {
    expect(
      mount(
        <TestComponent label="validated field" type="text" />
      ).find('.ui-component__validated-field'))
    .to.have.length(1);
  });

  it('renders children that are passed to it', () => {
    expect(
      mount(
        <TestComponent label="validated field" type="text" />
      ).find('input')
    )
    .to.have.length(1);
  });

  it('calls the fieldBlurred prop with the correct fieldId arg', () => {
    let fieldId = '';
    let value = '';
    const callback = (id, val) => {
      fieldId = id;
      value = val;
    };
    const valueUpdatedCallback = () => {}; // eslint-disable-line no-empty-function
    const component = mount(
      <TestComponent
        label="validated field"
        type="text"
        fieldBlurred={callback}
        valueUpdated={valueUpdatedCallback}
      />
    );
    const input = component.find('input');

    input.simulate('focus');
    input.simulate('change', { target: { value: '123' } });
    input.simulate('blur');
    expect(fieldId).to.equal('testField');
    expect(value).to.equal('123');
  });

  it('calls the value updated prop with the correct value arg', () => {
    let value = '';
    const valueUpdatedCallback = (fieldId, val) => {
      value = val;
    };
    const component = mount(
      <TestComponent
        label="validated field"
        type="text"
        valueUpdated={valueUpdatedCallback}
      />
    );
    const input = component.find('input');

    input.simulate('focus');
    input.simulate('change', { target: { value: '123' } });
    expect(value).to.equal('123');
  });

  it('should display correct error text upon submitting empty email', () => {
    const component = mount(
      <TestComponent
        label="validated field"
        type="text"
        valid={false}
        showErrorText // simulates form submit
        errorTextId="email-error-text"
        constraints={[
          {
            fieldId: 'email',
            type: 'mandatory',
            errorText: 'field is empty',
          },
        ]}
        clientErrorText="field is empty"
      />
    );

    expect(
      component.find('#email-error-text')
    ).to.have.text('field is empty');
  });

  it('should display correct error text upon submitting invalid email', () => {
    const component = mount(
      <TestComponent
        label="validated field"
        type="text"
        valid={false}
        defaultValue="invalid-address"
        showErrorText // simulates form submit
        errorTextId="email-error-text"
        constraints={[
          {
            fieldId: 'email',
            type: 'regex',
            errorText: 'field is invalid',
            validator: '^.+@.+$',
          },
        ]}
        clientErrorText="field is invalid"
      />
    );

    expect(
      component.find('#email-error-text')
    ).to.have.text('field is invalid');
  });

  it('should not render error element when field is valid', () => {
    const component = mount(
      <TestComponent
        label="validated field"
        type="text"
        valid
        defaultValue="valid@address.com"
        showErrorText // simulates form submit
        errorTextId="email-error-text"
        clientErrorText="field is empty"
      />
    );

    expect(
      component.find('#email-error-text').length
    ).to.equal(0);
  });

  it('should not render error text element if none passed in', () => {
    const component = mount(
      <TestComponent
        label="validated field"
        type="text"
        valid={false}
        defaultValue="invalid-address"
        showErrorText // simulates form submit
        errorTextId="email-error-text"
      />
    );

    expect(component.find('#email-error-text').length).to.equal(0);
  });

  it('should not render error element if empty clientErrorText prop', () => {
    const component = mount(
      <TestComponent
        label="validated field"
        type="text"
        valid={false}
        defaultValue="invalid-address"
        showErrorText // simulates form submit
        errorTextId="email-error-text"
        clientErrorText=""
      />
    );

    expect(component.find('#email-error-text').length).to.equal(0);
  });

  it('should render server error if provided and no clientErrorText', () => {
    const component = mount(
      <TestComponent
        label="validated field"
        type="text"
        valid={false}
        defaultValue="invalid-address"
        showErrorText // simulates form submit
        errorTextId="email-error-text"
        serverErrorText="server error message"
      />
    );

    expect(
      component.find('#email-error-text')
    ).to.have.text('server error message');
  });
});
