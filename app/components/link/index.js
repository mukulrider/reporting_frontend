import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';

function Links(props) {
  const { className, arrow, icon, children, disabled, text, ...otherProps } = props;
  const classes = classNames('ui-component__link', className, {
    [`ui-component__icon--chevron_${arrow}`]: arrow,
    [`ui-component__icon--${icon}`]: icon,
    'ui-component__button--disabled': disabled,
  });

  if (disabled) {
    return (
      <span className={classes}>
        <span>{children}</span>
      </span>
    );
  }

  return (
    <Link className={classes} {...otherProps} >
      <span>{children} {text}</span>
    </Link>
  );
}

Links.PropType = React.PropTypes.shape({
  href: React.PropTypes.string,
  text: React.PropTypes.string,
  icon: React.PropTypes.string,
});

Links.propTypes = {
  arrow: React.PropTypes.oneOf([
    'left',
    'right',
  ]),
  className: React.PropTypes.string,
  href: React.PropTypes.string,
  icon: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default Links;
