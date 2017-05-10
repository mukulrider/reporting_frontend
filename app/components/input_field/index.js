import React, { PropTypes } from 'react';
import { validDOMProps } from '../../common/utils';

function InputField(props) {
  const { type, ...inputProps } = props;

  return (
    <input
      className="ui-component__input-field"
      type={type}
      {...validDOMProps(inputProps)}
    />
  );
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
};

export default InputField;
