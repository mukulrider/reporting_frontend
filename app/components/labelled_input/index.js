import React from 'react';
import Label from '../label';
import InputField from '../input_field';

function LabelledInput(props) {
  const { label, children, ...inputProps } = props;
  return (
    <Label text={label}>
      <InputField {...inputProps} />
      {children}
    </Label>
  );
}

LabelledInput.propTypes = {
  label: React.PropTypes.string.isRequired,
};

export default LabelledInput;
