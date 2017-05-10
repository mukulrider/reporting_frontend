import React from 'react';
import BaseValidator from '../base_validator';
import ErrorText from '../error_text';

const getErrorText = Symbol();

class ValidatedField extends BaseValidator {

  static propTypes = {
    serverErrorText: React.PropTypes.string,
    errorTextId: React.PropTypes.string.isRequired,
    showErrorText: React.PropTypes.bool,
  };

  static defaultProps = {
    errorText: '',
    showErrorText: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentVal: props.defaultValue || '',
      clientErrorText: '',
    };

    this.blurField = this.blurField.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  // occasionaly a field will need to know if it is valid or not before
  // the parent validatedForm sends validity as a prop  this validate method
  // provides a way for a field to validate itself when it is necessary
  validate(value) {
    return this.props.constraints.every((constraint) =>
      this.validateConstraint(constraint, value)
    );
  }

  blurField() {
    this.props.fieldBlurred(this.state.fieldId, this.state.currentVal);
  }

  updateValue(e) {
    this.setState({
      currentVal: e.target.value,
    }, () => {
      this.props.valueUpdated(
        this.state.fieldId, this.state.currentVal
      );
    });
  }

  [getErrorText]() {
    // either rendering server-side error text, which is passed via prop
    // or rendering client-side error text, which comes from failing constraint
    return this.props.clientErrorText || this.props.serverErrorText || '';
  }

  renderErrorText() {
    const errorMsg = this[getErrorText]();

    return !this.props.valid && errorMsg ?
      <ErrorText
        id={this.props.errorTextId}
        text={errorMsg}

        // 'showErrorText' could be passed in when an invalid form submission
        // is attempted. In this case, the error text should be visible
        visuallyHidden={!this.props.showErrorText}
      /> : false;
  }
}

export default ValidatedField;
