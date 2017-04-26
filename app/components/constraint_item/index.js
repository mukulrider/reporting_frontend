import React from 'react';
import classNames from 'classnames';

const ConstraintItem = (props) => {
  const validClass = props.isValid ? 'valid' : 'invalid';

  const classes = classNames(
    'constraints__item',
    `constraints__item--${validClass}`
  );

  return (
    <li className={classes}>{props.hintText}</li>
  );
};

ConstraintItem.propTypes = {
  isValid: React.PropTypes.bool.isRequired,
  hintText: React.PropTypes.string.isRequired,
};

export default ConstraintItem;
