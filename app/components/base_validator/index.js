import React from 'react';
import ConstraintLookup from '../constraint_lookup';

class BaseValidator extends React.Component {

  validateConstraint(constraint, value) {
    // if no constraint or value then skip the validation
    if (!constraint || typeof value === 'undefined') {
      return true;
    }

    // sometimes only a constraint type will be provided
    // if the constraint doesn't have a validator
    if (!constraint.validator) {
      // retrieve the object from a lookup, which will contain the validator
      /* eslint-disable no-param-reassign */
      constraint = ConstraintLookup.get(constraint.type);
    }

    // do not proceed if no constraint to validate against
    if (!constraint || !constraint.validator) {
      return true;
    }

    // otherwise, it should be a string containing regex
    // perform validation
    return ConstraintLookup.validate(constraint, value);
  }
}

export default BaseValidator;
