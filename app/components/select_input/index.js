import React from 'react';
import classNames from 'classnames';
import Label from '../label/index';
import ValidatedField from '../validated_field';
import { camelCaseToHyphen, validDOMProps } from '../../common/utils';

const renderOptions = Symbol();
const getSelectedClass = Symbol();

class SelectInput extends ValidatedField {
  static propTypes = {
    valueUpdated: React.PropTypes.func.isRequired,
    fieldBlurred: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
    optionSelected: React.PropTypes.func,
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    data: React.PropTypes.array,
    valid: React.PropTypes.bool,
    classes: React.PropTypes.string,
  };

  static defaultProps = {
    placeholder: 'Please select',
  };

  constructor(props) {
    super(props);

    this.state.fieldId = this.props.id;
    this.optionSelected = this.optionSelected.bind(this);
  }

  [renderOptions](data) {
    return data.map((row, i) =>
      <option
        key={i}
        value={row.rowValue || row.rowText}
        dangerouslySetInnerHTML={{ __html: row.rowText }}
      />
    );
  }

  [getSelectedClass]() {
    return this.state.currentVal.length > 0 ? 'selected' : '';
  }

  optionSelected(e) {
    if (this.props.optionSelected) {
      this.props.optionSelected(e);
    }
    this.updateValue(e);
  }

  render() {
    const {
      valid, classes, label, placeholder, data, ...otherProps,
    } = this.props;

    const classList = classNames(
      'ui-component__validated-field',
      `ui-component__validated-field--${valid ? 'valid' : 'invalid'}`,
      `${camelCaseToHyphen(this.props.id)}`,
      classes
    );

    const selectClasses = classNames(
      'ui-component__select__input',
      this[getSelectedClass]()
    );

    const defaultProps = {
      onChange: this.optionSelected,
      onBlur: this.blurField,
      'aria-invalid': !valid,
      'aria-required': true,
    };

    const selectProps = Object.assign({},
      defaultProps,
      validDOMProps(otherProps)
    );

    const errorText = this.renderErrorText();

    if (errorText) {
      selectProps['aria-describedby'] = this.props.errorTextId;
    }

    return (
      <div className={classList}>
        {/*<Label text={label}>*/}
          <span className="ui-component__select">
            <select
              className={selectClasses}
              {...selectProps}
            >
              <option value="">{placeholder}</option>
              {this[renderOptions](data)}
            </select>
          </span>
          {errorText}
        {/*</Label>*/}
      </div>
    );
  }
}

export default SelectInput;
