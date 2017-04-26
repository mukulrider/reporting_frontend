import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import BaseValidator from '../base_validator';

function getFormElement(domElement) {
  // first check for an input with type of text,
  // as this is most likely the one we want
  const inputTextElement = domElement.querySelector('input[type="text"]');

  // if that failed, let's attempt to get any other
  // form element type
  return inputTextElement || domElement.querySelector(
    'input, select, textarea'
  );
}

function getChildFields(children) {
  const fields = [];

  React.Children.forEach(children, (child) =>

    // only get fields that have constraints
    child && fields.push(...child.props.fields.filter((field) =>
      field.constraints && field.constraints.length > 0
    ))
  );

  return fields;
}

class ValidatedForm extends BaseValidator {

  static propTypes = {
    fields: React.PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      fields: [],
      formSubmitting: false,
      showErrorText: false,
    };

    this.initFields();

    this.fieldBlurred = this.fieldBlurred.bind(this);
    this.valueUpdated = this.valueUpdated.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.focusOnFirstErrorOnMount) {
      this.focusOnFirstError();
    }
  }

  initFields() {
    let fields = this.props.fields || [];

    // if the fields are children passed into the form
    if (this.props.children) {
      fields = getChildFields(this.props.children);
    }

    fields.forEach((field) => {
      // if the isValid flag is false in props then we need to set
      // blurredWithValue to true this allows the field to be validated onChange
      let blurredWithValue = false;

      if (!field.isValid) {
        blurredWithValue = true;
        this.state.showErrorText = true;
      }

      this.state.fields.push({
        value: field.value || '',
        blurredWithValue,

        // whether or not client-side validation
        // has been performed on a field
        clientValidated: false,
        ...field,
      });
    });
  }

  getField(fieldId) {
    return this.state.fields.find((field) => field.id === fieldId);
  }

  getInput(fieldId) {
    const fieldRef = `${fieldId}Field`;
    let domElement;

    // if form has children (FieldSet components),
    // have to traverse FieldSet -> Field to get ref
    if (this.props.children) {
      // for each FieldSet ref
      Object.keys(this.refs).some((fieldSetRef) => {
        // get field component within FieldSet
        let refLocation = this.refs[fieldSetRef].refs[fieldRef];

        // this is a termporary workaround for the manual address
        // fields as they are nested inside the address component
        // The normal refLocation  pointer above does not work as
        // they are a level below inside the addressField
        // A refactor is needed so that manualAddressEntry component
        // sits at the same level as the addressField component
        if (
          fieldId === 'address-line1' &&
          fieldSetRef === 'address-field-set'
        ) {
          refLocation =
            this
              .refs[fieldSetRef]
              .refs.postcodeField
              .refs[fieldRef];
        }
        domElement = ReactDOM.findDOMNode( // eslint-disable-line react/no-find-dom-node
          refLocation
        );

        // return true if we've found one
        return !!domElement;
      });
    } else { // otherwise refs are on field components
      domElement = ReactDOM.findDOMNode(this.refs[fieldRef]); // eslint-disable-line react/no-find-dom-node
    }

    return domElement ? getFormElement(domElement) : false;
  }

  fieldBlurred(fieldId, value) {
    let blurredWithValue = false;
    const field = this.getField(fieldId);

    // validating gives us isValid and client error text
    const result = this.validateField(fieldId, value);

    // if field has a value or form has already been submitted, validate field
    if (value.length > 0) {
      blurredWithValue = true;

    // otherwise if form has been submitted (all error text should be displayed)
    } else if (this.state.showErrorText) {
      // exclude optional empty fields from validation state
      if (field.blurredWithValue) {
        // when a field is empty after attempting to submit the form
        // it should be in an error state
        result.isValid = false;
        blurredWithValue = true;
      }
    } else {
      // if field has never been interacted with and is empty, should be valid
      result.isValid = true;
    }

    this.updateField(fieldId, {
      blurredWithValue,
      isValid: result.isValid,
      clientErrorText: result.clientErrorText,
    });
  }

  valueUpdated(fieldId, value) {
    const field = this.getField(fieldId);
    let result = {
      isValid: true,
      clientErrorText: '',
    };
    let blurredWithValue = false;

    // validate field if one of the following:
    //  1. field has been previously blurred and has value
    //  2. form has previously been submitted
    if (this.state.showErrorText ||
        (field.blurredWithValue && value.length > 0)) {
      result = this.validateField(fieldId, value);
      blurredWithValue = true;
    }

    this.updateField(fieldId, {
      blurredWithValue,
      isValid: result.isValid,
      clientErrorText: result.clientErrorText,
      value,

      // can only be set on user interaction a.k.a. the client-side
      clientValidated: true,
    });
  }

  updateField(id, attributes) {
    const fields = update(this.state.fields, {
      [this.state.fields.findIndex((field) => field.id === id)]: {
        $merge: attributes,
      },
    });

    this.setState({
      fields,
    }, () => {
      // called upon completion of validation
      this.afterValidation(id);
    });
  }

  // validate a single field against it's constraints
  validateField(fieldId, value) {
    const field = this.getField(fieldId);
    const mandatory = field.constraints.find((c) => c.type === 'mandatory');

    // TODO: is mandatory.validator === true check still necessary?
    // It has been removed from ConstraintLookup
    const isMandatory = mandatory &&
      (mandatory.validator === true || mandatory.validator === 'true');

    let failedConstraint = {
      errorText: '',
    };
    let isFieldValid = true;

    // Run validation rules on following conditions
    // 1. Field is mandatory then always run validation
    // 2. Field is optional but value is provided then always run validation
    if (isMandatory || String(value).length > 0) {
      // returns upon finding the first failed constraint
      isFieldValid = field.constraints.every((constraint) => {
        let isConstraintValid = true;

        // if constraint rule is to compare field values
        if (constraint.type === 'matchField') {
          isConstraintValid = this.validateMatchField(constraint, value);
        } else {
          isConstraintValid = this.validateConstraint(constraint, value);
        }

        if (!isConstraintValid) {
          failedConstraint = constraint;

          return false;
        }

        return true;
      });
    }

    return {
      isValid: isFieldValid,
      clientErrorText: failedConstraint.errorText,
    };
  }

  validateMatchField(constraint, value) {
    // get target field to compare value against
    const targetField = this.getField(constraint.target);

    // return whether values match
    return value === targetField.value;
  }

  // called upon completion of validating a field
  afterValidation(fieldId) {
    const currentField = this.getField(fieldId);

    if (currentField.triggerValidation) {
      // get field to trigger validation on
      const fieldToTrigger = this.getField(currentField.triggerValidation);

      // trigger validation on field
      if (fieldToTrigger.value.length > 0) {
        this.valueUpdated(fieldToTrigger.id, fieldToTrigger.value);
      }
    }
  }

  validateForm() {
    let formValid = true;

    let fields = this.state.fields.concat([]);

    this.state.fields.forEach((field) => {
      const input = this.getInput(field.id);
      const result = this.validateField(field.id, input.value);

      if (input &&
          !result.isValid &&
          !input.disabled) {
        fields = update(fields, {
          [this.state.fields.findIndex(
            (currentField) => currentField.id === field.id
          )]:
          {
            $merge: {
              blurredWithValue: true,
              isValid: false,
              clientErrorText: result.clientErrorText,
            },
          },
        });
        formValid = false;
      }
    });

    this.setState({
      showErrorText: !formValid,
      fields,
    });

    return formValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.formSubmitting && this.validateForm()) {
      this.setState({
        formSubmitting: true,
      });
      e.target.submit();
    } else if (!this.state.formSubmitting) {
      this.focusOnFirstError();
    }
  }

  focusOnFirstError() {
    let focused = false;

    this.state.fields.forEach((field) => {
      // the first field that is invalid or is empty then it should be focused
      const input = this.getInput(field.id);

      if (input && (!field.isValid || input.value.length === 0)) {
        if (!focused) {
          input.focus();
          focused = true;
        }
      }
    });
  }
}

export default ValidatedForm;
