import React from 'react';
import ValidatedField from '../validated_field';
import LabelledInput from '../labelled_input';
import classNames from 'classnames';
import Spinner from '../spinner';

class PostcodeInput extends ValidatedField {

  static defaultProps = {
    label: 'Postcode',
    type: 'text',
    placeholder: 'e.g. AB1 0YZ',
    errorTextId: 'postcode-field-error-text',
  };

  constructor(props) {
    super(props);

    this.state.fieldId = this.props.id;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  // when the postcode is updated
  // first tell ValidatedForm via updateValue
  // then inform the parent Address component
  handleInputChange(e) {
    this.updateValue(e);
    this.props.postcodeValueUpdated(e.target.value);
  }

  handleBlur(e) {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(e);
    }

    this.blurField(e);
  }

  render() {
    const valid = this.props.valid ? 'valid' : 'invalid';

    const classes = classNames(
      this.props.classes,
      'ui-component__validated-field',
      `ui-component__validated-field--${valid}`,
      'ui-component__postcode-input'
    );

    const defaultProps = {
      onBlur: this.handleBlur,
      'aria-invalid': !this.props.valid,
      'aria-required': true,
    };

    const inputProps = Object.assign({}, this.props, defaultProps);

    this.errorText = this.renderErrorText();

    if (this.errorText) {
      inputProps['aria-describedby'] = this.props.errorTextId;
    }

    const spinner = this.props.showSpinner ? <Spinner /> : null;

    return (
      <div className={classes}>
        <LabelledInput
          onChange={this.handleInputChange}
          {...inputProps}
        >
          {spinner}
          {this.renderErrorText()}
        </LabelledInput>
      </div>

    );
  }
}

PostcodeInput.propTypes = {
  valid: React.PropTypes.bool.isRequired,
  id: React.PropTypes.string,
  postcodeValueUpdated: React.PropTypes.func.isRequired,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  showToggleTextButton: React.PropTypes.bool,
  errorTextId: React.PropTypes.string,
  serverErrorText: React.PropTypes.string,
  name: React.PropTypes.string,
  classes: React.PropTypes.array,
};

export default PostcodeInput;
