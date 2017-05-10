import React from 'react';
import ValidatedField from '../validated_field';
import LabelledInput from '../labelled_input';
import classNames from 'classnames';

class EmailField extends ValidatedField {

  static propTypes = {
    valueUpdated: React.PropTypes.func.isRequired,
    fieldBlurred: React.PropTypes.func.isRequired,
    valid: React.PropTypes.bool.isRequired,
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    classes: React.PropTypes.string,
  };

  static defaultProps = {
    label: 'Email address',
    type: 'email',
    placeholder: 'name@example.com',
    errorTextId: 'email-field-error-text',
  };

  constructor(props) {
    super(props);
    this.state.fieldId = this.props.id;
  }

  render() {
    const valid = this.props.valid ? 'valid' : 'invalid';

    const classes = classNames(
      this.props.classes,
      'ui-component__validated-field',
      `ui-component__validated-field--${valid}`
    );

    const defaultProps = {
      onChange: this.updateValue,
      onBlur: this.blurField,
      'aria-invalid': !this.props.valid,
      'aria-required': true,
    };

    const errorText = this.renderErrorText();

    if (errorText) {
      defaultProps['aria-describedby'] = this.props.errorTextId;
    }
    const inputProps = Object.assign({}, this.props, defaultProps);

    return (
      <div className={classes}>
        <LabelledInput {...inputProps}>
          {errorText}
        </LabelledInput>
      </div>
    );
  }
}

export default EmailField;
