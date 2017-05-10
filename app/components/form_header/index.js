import React from 'react';

function FormHeader(props) {
  return (
    <div className="ui-component__form-header">
      <h1 className="ui-component__form-header--title">{props.title}</h1>
      <p className="ui-component__form-header--description">
        {props.description}
      </p>
    </div>
  );
}

FormHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node,
  ]).isRequired,
};

export default FormHeader;
