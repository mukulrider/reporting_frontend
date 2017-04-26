import React from 'react';
import classNames from 'classnames';

function ErrorText(props) {
  const { text, visuallyHidden, ...otherProps } = props;
  const classes = classNames(
    'ui-component__error-text', {
      visuallyhidden: visuallyHidden,
    }
  );

  return (
    <span className={classes} {...otherProps} role="alert">
      {text}
    </span>
  );
}

ErrorText.defaultProps = {
  visuallyHidden: true,
};

ErrorText.propTypes = {
  text: React.PropTypes.string.isRequired,
  visuallyHidden: React.PropTypes.bool,
};

export default ErrorText;
