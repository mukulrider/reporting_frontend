import React from 'react';

const buttonTypeClasses = {
  primary: 'ui-component__button',
  secondary: 'ui-component__button--secondary',
};

function getClassName(buttonType) {
  return buttonTypeClasses[buttonType] || buttonTypeClasses.primary;
}

function Button({
  children,
  buttonType,
  ...otherProps,
}) {
  return (
    <button className={getClassName(buttonType)} {...otherProps}>
      <span>{children}</span>
    </button>
  );
}

Button.propTypes = {
  children: React.PropTypes.node,
  buttonType: React.PropTypes.string,
};

export default Button;
