import React from 'react';
import ValidatedField from '../validated_field';
import LabelledInput from '../labelled_input';
import classNames from 'classnames';
import { camelCaseToHyphen } from '../../common/utils';

class ValidatedInput extends ValidatedField {

  static defaultProps = {
    label: null,
    type: 'text',
    placeholder: 'Validated input',
    errorTextId: 'validated-input-error-text',
    onValueChange: () => {}, // eslint-disable-line no-empty-function
  };

  constructor(props) {
    super(props);
    this.state.fieldId = this.props.id;
    this.inputValueUpdated = this.inputValueUpdated.bind(this);
    this.inputBlurred = this.inputBlurred.bind(this);
  }

  // if an onChange prop has been passed through to ValidatedInput
  // it will need to be called as well as the updateValue method
  // from ValidatedField
  inputValueUpdated(e) {
    this.props.onValueChange(this.props.id, e);
    this.updateValue(e);
  }

  inputBlurred(e) {
    this.props.onValueChange(this.props.id, e);
    this.blurField(e);
  }

  render() {
    const valid = this.props.valid ? 'valid' : 'invalid';
    const description = this.props.description ?
      <p className="ui-component__validated-field__description">
        {this.props.description}
      </p> : null;
    const classes = classNames(
      this.props.classes,
      'ui-component__validated-field',
      `ui-component__validated-field--${valid}`,
      `${camelCaseToHyphen(this.props.id)}`
    );

    const defaultProps = {
      onChange: this.inputValueUpdated,
      onBlur: this.inputBlurred,
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
        {description}
      </div>
    );
  }
}

ValidatedInput.propTypes = {
  valueUpdated: React.PropTypes.func.isRequired,
  fieldBlurred: React.PropTypes.func.isRequired,
  onValueChange: React.PropTypes.func,
  valid: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  errorTextId: React.PropTypes.string.isRequired,
  classes: React.PropTypes.string,
};

export default ValidatedInput;
