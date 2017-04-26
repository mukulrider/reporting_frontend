/**
 * A lookup for validation constraints used by input fields
 */

export default class ConstraintLookup {

  // lookup array
  static constraints = [
    {
      type: 'minLength',
      validator: 8,
    },
    {
      type: 'oneLowercase',
      validator: '[a-z]',
    },
    {
      type: 'oneUppercase',
      validator: '[A-Z]',
    },
    {
      type: 'oneNumberOrSpecial',
      validator: '[0-9£$!?<>_-]',
    },
  ];

  /**
   * Get a constraint of a certain type
   */
  static get(type) {
    return ConstraintLookup.constraints.find(
      (contraint) => contraint.type === type
    );
  }

  static validate(constraint, val) {
    const value = String(val);

    switch (constraint.type) {
    case 'minLength':
      return value.length >= Number(constraint.validator);
    case 'maxLength':
      return value.length < Number(constraint.validator);
    case 'mandatory':
      return constraint.validator === true ||
      constraint.validator === 'true' ? value.length > 0 : true;
    case 'regex':
    case 'oneLowercase':
    case 'oneUppercase':
    case 'oneNumberOrSpecial':
      // if invalid regex then SyntaxError will be thrown
      //  - this is expected as we should never arrive at that point
      //  - the user should never be able to proceed if the validator is broken
      return new RegExp(constraint.validator).test(val);
    default:
      if (typeof constraint.validator === 'function') {
        return constraint.validator(val);
      }
    }

    return true;
  }
}
