import React, { PropTypes } from 'react';
import classNames from 'classnames';

function Notice({ className, children, type }) {
  const classes = classNames(
    'ui-component__notice',
    className
  );

  /* eslint-disable max-len */

  return (
    <div className={classes}>
      <span className={`ui-component__notice__img ui-component__notice__img--${type}`} />
      <span className="ui-component__notice__canvas">{children}</span>
    </div>
  );

  /* eslint-enable max-len */
}

Notice.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'exclamation',
    'error',
    'success',
    'information',
  ]).isRequired,
};

export default Notice;
