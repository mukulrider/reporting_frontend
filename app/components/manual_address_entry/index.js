import React from 'react';
import ValidatedInput from '../validated_input';
import Label from '../label';
import classNames from 'classnames';

class ManualAddressEntry extends React.Component {

  static propTypes = {
    fieldBlurred: React.PropTypes.func.isRequired,
    valueUpdated: React.PropTypes.func.isRequired,
    manualAddressEdited: React.PropTypes.func.isRequired,
    addressLinesValid: React.PropTypes.bool.isRequired,
    label: React.PropTypes.string,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    classes: React.PropTypes.string,
    address: React.PropTypes.object,
    addressLine1ServerError: React.PropTypes.string,
    addressLine1ClientError: React.PropTypes.string,
    addressLine1ErrorText: React.PropTypes.string,
  };

  static defaultProps = {
    isVisible: false,
    address: {
      line1: {
        label: 'Address line 1',
        value: '',
        id: 'address-line1',
        placeholder: 'Company name, house or flat number and street',
      },
      line2: {
        label: 'Address line 2 (optional)',
        value: '',
        id: 'address-line2',
        placeholder: null,

      },
      line3: {
        label: 'Address line 3 (optional)',
        value: '',
        id: 'address-line3',
        placeholder: null,

      },
      town: {
        label: 'Town / City',
        value: '',
        id: 'town',
        placeholder: null,
      },
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      fieldValues: [],
    };
    this.handleStopPropagation = this.handleStopPropagation.bind(this);
    this.handleOnValueChange = this.handleOnValueChange.bind(this);
  }

  componentWillMount() {
    this.initialValues = this.props.address;
    this.setAddressValuesOnState(this.props.address);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.address.line1.value !== this.props.address.line1.value ||
      nextProps.address.town.value !== this.props.address.town.value
    ) {
      this.initialValues = nextProps.address;
      this.setAddressValuesOnState(nextProps.address);
    }
  }

  // Manual address Fields need to be controlled input
  // so that it is possible to set their values via props
  setAddressValuesOnState(address) {
    const fieldValues = [];

    Object.keys(address).map((key) => { // eslint-disable-line array-callback-return, padded-blocks

      const field = address[key];

      if (field.id === 'address-line1') {
        this.props.valueUpdated(field.id, field.value);
      }

      fieldValues.push({
        id: field.id,
        value: field.value || '',
      });
    });

    this.setState({
      fieldValues,
    });
  }

  // controlled inputs - update their value on  state
  handleOnValueChange(id, e) {
    const value = e.target.value;
    const fieldValues = this.state.fieldValues.map((field) =>
      field.id === id ? { ...field, ...{ value } } : field
    );

    this.setState({
      fieldValues,
    }, () => {
      // Once the field value have been updated it's necessary to see if any
      // of the values are different from the initial values
      // if they are then call the manualAddressEdited callback
      // this clear the value of the address-id hidden field in the parent
      // component so that the address service knows to create a new address

      let fieldsEdited = false;

      this.state.fieldValues.forEach((field) => {
        const initialField = Object.keys(this.initialValues)
          .find((fieldKey) =>
            this.initialValues[fieldKey].id === field.id
          );
        const initialFieldValue = this.initialValues[initialField].value;

        if (field.value !== initialFieldValue) {
          fieldsEdited = true;
        }
      });
      this.props.manualAddressEdited(fieldsEdited);
    });

    if (id === 'address-line1') {
      this.props.valueUpdated(id, value);
    }
  }

  getField(fieldId) {
    return this.state.fieldValues.find((field) => field.id === fieldId);
  }

  handleStopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    const rootClass = 'ui-component__manual-address';
    const classes = classNames(
     rootClass,
    );

    return (
      <div
        className={classes}
      >
        {
          Object.keys(this.props.address).map((key) => {
            const field = this.props.address[key];

            if (field.id === 'address-line1') {
              const fieldValid = this.props.addressLinesValid;

              return (
                <ValidatedInput
                  {...field}
                  name={field.id}
                  value={this.getField(field.id).value}
                  key={field.id}
                  autoComplete="off"
                  onValueChange={this.handleOnValueChange}
                  valueUpdated={() => { // eslint-disable-line react/jsx-no-bind
                    // ManualAddressEntry uses a custom onChange handler
                    // (handleOnValueChange) which takes care of informing
                    // ValidatedForm that the field value has updated
                  }}
                  fieldBlurred={() => { // eslint-disable-line react/jsx-no-bind
                    this.props.fieldBlurred(
                      'address-line1',
                      this.getField(field.id).value
                    );
                  }}
                  valid={fieldValid}
                  type="text"
                  constraints={[
                    {
                      type: 'mandatory',
                      validator: true,
                      errorText: this.props.addressLine1ErrorText,
                    },
                  ]}
                  clientErrorText={this.props.addressLine1ClientError}
                  serverErrorText={this.props.addressLine1ServerError}
                />
              );
            }

            return (
              <div
                className="ui-component__manual-address__field"
                key={field.id}
              >
                <Label text={field.label}>
                  <input
                    type="text"
                    id={field.id}
                    name={field.id}
                    className="ui-component__input-field"
                    onChange={this.handleOnValueChange.bind(this, field.id)} // eslint-disable-line react/jsx-no-bind
                    value={this.getField(field.id).value}
                  />
                </Label>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default ManualAddressEntry;
