import React from 'react';
import classNames from 'classnames';
import { validDOMProps } from '../../common/utils';

function RadioButton(props) {
  const {
    onChange,
    valid,
  } = props;

  const classes = classNames(
    'ui-component__radio-button-wrapper',
    !valid ? 'ui-component__radio-button-wrapper--invalid' : ''
  );

  return (
    <div className={classes}>
      <input
        className="ui-component__radio-button"
        {...validDOMProps(props)}
        onChange={onChange}
        type="radio"
      />
      <label
        htmlFor={props.id}
        className="ui-component__radio-button-label"
      >
        <span className="ui-component__radio-button-dot" />
        <span
          className="ui-component__radio-button-label--text"
          dangerouslySetInnerHTML={{ __html: props.label }}
        />
      </label>
    </div>
  );
}

RadioButton.propTypes = {
  onChange: React.PropTypes.func,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  valid: React.PropTypes.bool,
};

export default RadioButton;
