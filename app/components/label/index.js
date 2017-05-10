import React from 'react';

function Label(props) {
  const { text, children, ...inputProps } = props;
  return (
    <label className="ui-component__label" {...inputProps}>
      <span className="ui-component__label-text">{text}</span>
      {children}
    </label>
  );
}

Label.propTypes = {
  text: React.PropTypes.string.isRequired,
};

export default Label;
