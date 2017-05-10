import React from 'react';
import ValidatedField from '../validated_field';
import classNames from 'classnames';
import update from 'react-addons-update';
import Label from '../label';
import InputField from '../input_field';
import ConstraintList from '../constraint_list';
import ToggleMaskButton from '../toggle_mask_button';

class PasswordField extends ValidatedField {

  static propTypes = {
    valueUpdated: React.PropTypes.func.isRequired,
    fieldBlurred: React.PropTypes.func.isRequired,
    valid: React.PropTypes.bool.isRequired,
    constraints: React.PropTypes.array.isRequired,
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    showConstraints: React.PropTypes.bool,
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    showToggleTextButton: React.PropTypes.bool,
    classes: React.PropTypes.array,
  };

  static defaultProps = {
    label: 'Password',
    type: 'password',
    name: 'password',
    showToggleTextButton: false,
    valid: true,
    constraints: [],
    showConstraints: false,
    classes: [],
    errorTextId: 'password-field-error-text',
  };

  constructor(props) {
    super(props);
    this.state.fieldId = this.props.id;

    this.onChange = this.onChange.bind(this);
    this.onButtonToggle = this.onButtonToggle.bind(this);
    this.showConstraints = this.showConstraints.bind(this);
    this.hideConstraints = this.hideConstraints.bind(this);

    // this.state.passwordFieldFocused = false;
    this.state.type = this.props.type;
    this.state.renderedOnClient = false;
  }

  componentDidMount() {
    // set renderedOnClient flag and augment
    // initialState originating from ValidatedField
    const updatedState = update(this.state, {
      renderedOnClient: { $set: true },
      constraintsVisible: { $set: false },
    });

    this.setState(updatedState); // eslint-disable-line react/no-did-mount-set-state
  }

  shouldShowToggleTextButton() {
    return this.props.showToggleTextButton && this.state.renderedOnClient;
  }

  showConstraints() {
    this.setState({
      constraintsVisible: true,
      passwordFieldFocused: true,
    });
  }

  hideConstraints() {
    // only validate if constraints are to be shown
    const isVisible = this.props.showConstraints ?
      !this.validate(this.state.currentVal) &&
      this.state.currentVal.length > 0 : false;

    this.setState({
      constraintsVisible: isVisible,
      passwordFieldFocused: false,
    });

    this.blurField(this.state.fieldId, this.state.currentVal);
  }

  onChange(e) {
    // tell ValidatedField value has updated
    this.updateValue(e);
  }

  onButtonToggle(isMasked) {
    this.setState({
      type: isMasked ? 'password' : 'text',
    });
  }

  renderToggleTextButton() {
    if (this.shouldShowToggleTextButton()) {
      return (
        <ToggleMaskButton onToggle={this.onButtonToggle} /> // eslint-disable-line react/jsx-handler-names
      );
    }

    // TODO: Change to return null when we upgrade to React 15
    return false;
  }

  renderConstraintList() {
    // constraints list is visible if one of these is true:
    //  1. field is focused upon (this.state.constraintsVisible)
    //  2. prop 'showErrorText' is true (which is due to an attempt to
    //     submit an invalid form)
    const showConstraints =
      this.state.constraintsVisible ||
      (this.props.showErrorText && !this.validate(this.state.currentVal));

    if (this.props.showConstraints &&
        this.props.constraints.length > 0) {
      return (
        <ConstraintList
          constraints={this.props.constraints}
          constraintsHint="Your password must include at least:"

          // We may want constraints to be initially visible,
          // for example if invalid form submission attempt occurred.
          // Prop 'showErrorText' will tell us if this is necessary
          isVisible={showConstraints}
          currentVal={this.state.currentVal}
          renderedOnClient={this.state.renderedOnClient}
        />
      );
    }

    return <noscript />;
  }

  render() {
    // In the server render, the password constraints should be visible
    // This caters for ie8 and users without js
    // Once rendered on the client they are hidden
    let passwordFieldFocused = 'blurred';

    if (this.state.renderedOnClient) {
      passwordFieldFocused =
        this.state.passwordFieldFocused ? 'focused' : 'blurred';
    }

    const passwordValid = this.props.valid ? 'valid' : 'invalid';

    const classes = classNames(
      'ui-component__validated-field',
      `ui-component__validated-field--${passwordValid}`,
      'ui-component__password-field',
      `ui-component__password-field--${passwordFieldFocused}`,
      this.props.classes
    );

    // the input element should be full width in its container
    // if Show/Hide button is not rendered
    const fullWidthClass =
      this.shouldShowToggleTextButton() ?
        '' : 'ui-component__password-field__input-wrapper--full-width';

    const wrapperClasses = classNames(
      'ui-component__password-field__input-wrapper',
      fullWidthClass
    );

    const defaultProps = {
      onChange: this.onChange,
      onBlur: this.hideConstraints,
      onFocus: this.showConstraints,
      'aria-invalid': !this.props.valid,
      'aria-describedby': this.props.errorText ? this.props.errorTextId : 'constraints', // eslint-disable-line max-len
      'aria-required': true,
    };

    const inputProps = Object.assign({}, this.props, defaultProps);
    const field = <InputField {...inputProps} type={this.state.type} />;
    const label = ( // eslint-disable-line no-extra-parens
      <Label text={this.props.label} htmlFor={this.props.id}>
        {this.renderErrorText()}
      </Label>
    );

    // Input type is managed by state so we don't need it here.
    delete inputProps.type; // eslint-disable-line prefer-reflect

    if (this.state.renderedOnClient) {
      return (
        <div className={classes}>
          {label}
          <div className={wrapperClasses}>
            {field}
            {this.renderToggleTextButton()}
          </div>
          {this.renderConstraintList()}
        </div>
      );
    }

    return (
      <div className={classes}>
        {label}
        {field}
        {this.renderConstraintList()}
      </div>
    );
  }
}

export default PasswordField;
