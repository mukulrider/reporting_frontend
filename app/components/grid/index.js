import React from 'react';
import classNames from 'classnames';
import { validDOMProps } from '../../common/utils';

function Grid(props) {
  const classes = classNames(
    'ui-component__grid',
    props.className || null,
  );

  return (
    <div {...validDOMProps(props)} className={classes} >
      {props.children}
    </div>
  );
}

Grid.propTypes = {
  className: React.PropTypes.string,
};

export default Grid;
