import ConstraintLookup from './';

describe('ConstraintLookup', () => {
  const minLength = 'minLength';
  const oneLowercase = 'oneLowercase';
  const oneUppercase = 'oneUppercase';
  const oneNumberOrSpecial = 'oneNumberOrSpecial';

  it('should retrieve correct type property for "minLength" constraint', () => {
    const constraint = ConstraintLookup.get(minLength);

    expect(constraint.type).to.equal(minLength);
  });

  it('should retrieve default validator for "minLength" constraint',
  () => {
    const constraint = ConstraintLookup.get(minLength);

    expect(constraint.validator).to.equal(8);
  });

  it(
  'should run correct validator function for "minLength" constraint',
  () => {
    const constraint = ConstraintLookup.get(minLength);

    expect(ConstraintLookup.validate(constraint, '1234')).to.equal(false);
    expect(ConstraintLookup.validate(constraint, '123456789')).to.equal(true);
  });

  it('should retrieve correct type property for "oneLowercase" constraint',
  () => {
    const constraint = ConstraintLookup.get(oneLowercase);

    expect(constraint.type).to.equal(oneLowercase);
  });

  it('should retrieve default validator for "oneLowercase" constraint',
  () => {
    const constraint = ConstraintLookup.get(oneLowercase);

    expect(constraint.validator).to.equal('[a-z]');
  });

  it('should run correct validator function ' +
    'for "oneLowercase" constraint', () => {
    const constraint = ConstraintLookup.get(oneLowercase);

    expect(ConstraintLookup.validate(constraint, 'F')).to.equal(false);
    expect(ConstraintLookup.validate(constraint, 'h')).to.equal(true);
  });

  it('should retrieve correct type property for "oneUppercase" constraint',
  () => {
    const constraint = ConstraintLookup.get(oneUppercase);

    expect(constraint.type).to.equal(oneUppercase);
  });

  it('should retrieve the correct helper text for "oneUppercase" constraint',
  () => {
    const constraint = ConstraintLookup.get(oneUppercase);

    expect(constraint.validator).to.equal('[A-Z]');
  });

  it('should run correct validator function ' +
  'for "oneUppercase" constraint', () => {
    const constraint = ConstraintLookup.get(oneUppercase);

    expect(ConstraintLookup.validate(constraint, 'u')).to.equal(false);
    expect(ConstraintLookup.validate(constraint, 'K')).to.equal(true);
  });

  it('should retrieve correct type property ' +
  ' for "oneNumberOrSpecial" constraint', () => {
    const constraint = ConstraintLookup.get(oneNumberOrSpecial);

    expect(constraint.type).to.equal(oneNumberOrSpecial);
  });

  it('should retrieve the correct helper text for ' +
  ' "oneNumberOrSpecial" constraint', () => {
    const constraint = ConstraintLookup.get(oneNumberOrSpecial);

    expect(constraint.validator)
      .to.equal('[0-9£$!?<>_-]');
  });

  it('should run correct validator function ' +
  ' for "oneNumberOrSpecial" constraint', () => {
    const constraint = ConstraintLookup.get(oneNumberOrSpecial);

    expect(ConstraintLookup.validate(constraint, 'uonoin')).to.equal(false);
    expect(ConstraintLookup.validate(constraint, '$')).to.equal(true);
  });
});
