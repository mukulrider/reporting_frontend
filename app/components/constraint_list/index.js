import React from 'react';
import classNames from 'classnames';
import BaseValidator from '../base_validator';
import ConstraintItem from '../constraint_item';

const renderConstraint = Symbol();
const renderConstraints = Symbol();

class ConstraintList extends BaseValidator {

  static propTypes = {
    constraints: React.PropTypes.array.isRequired,
    constraintsHint: React.PropTypes.string.isRequired,
    isVisible: React.PropTypes.bool,
    currentVal: React.PropTypes.string,
    renderedOnClient: React.PropTypes.bool,
  };

  static defaultProps = {
    constraints: [],
    isVisible: false,
    currentVal: '',
  };

  // render list of constraints
  [renderConstraints]() {
    return this.props.constraints.map((constraint, i) =>
      this[renderConstraint](constraint, i));
  }

  // render a single constraint
  [renderConstraint](constraint, i) {
    // is value valid against constraint
    const isValid = this.validateConstraint(constraint, this.props.currentVal);

    return (
      <ConstraintItem
        hintText={constraint.hintText}
        key={i}
        isValid={isValid}
      />
    );
  }

  render() {
    let visibilityClass = 'server-init';

    if (!Array.isArray(this.props.constraints) ||
      !this.props.constraints.length) {
      // Cannot return null from stateless functional components until React 15
      // Relevant Stack Overflow question: http://stackoverflow.com/questions/33705195/return-null-from-a-stateless-component-functional-component
      // React Github issue: https://github.com/facebook/react/issues/4599
      return <noscript />;
    }

    if (this.props.renderedOnClient) {
      visibilityClass = this.props.isVisible ? 'focused' : 'blurred';
    }

    const classes = classNames(
     'constraints',
     `constraints--${visibilityClass}`
    );

    return (
      <div id="constraints" className={classes}>
        <p className="constraints__hint">{this.props.constraintsHint}</p>
        <ul className="constraints__list">
          {this[renderConstraints]()}
        </ul>
      </div>
    );
  }
}

export default ConstraintList;
