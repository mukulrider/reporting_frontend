import React from 'react';
import classNames from 'classnames';
import { validDOMProps } from '../../common/utils';


function Checkbox(props) {
  const {
    id,
    valid,
    isDisabled,
    label,
  } = props;

  const classes = classNames(
    'ui-component__checkbox-wrapper',
    !valid ? 'ui-component__checkbox-wrapper--invalid' : ''
  );

  return (
    <div className={classes}>
      <input
        className="ui-component__checkbox visuallyhidden"
        type="checkbox"
        disabled={isDisabled}
        {...validDOMProps(props)}
      />
      <label htmlFor={id} className="ui-component__checkbox-label">
        <span className="ui-component__dummy-checkbox">
          <span className="ui-component__icon--checkmark" />
        </span>
        <span
          className="ui-component__checkbox-label--text"
          dangerouslySetInnerHTML={{
            __html: label,
          }}
        />
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  valid: React.PropTypes.bool,
  isDisabled: React.PropTypes.bool,
};

export default Checkbox;
