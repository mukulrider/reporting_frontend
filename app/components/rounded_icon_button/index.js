import React from 'react';

function RoundedIconButton(props) {
  const { icon, label, ...rest } = props;

  return (
    <button className="ui-component__rounded-icon-button" {...rest}>
      <span className={`ui-component__icon--${icon}`} />
      { label ? <span className="visually-hidden">{label}</span> : '' }
    </button>
  );
}

RoundedIconButton.propTypes = {
  icon: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
};

export default RoundedIconButton;
