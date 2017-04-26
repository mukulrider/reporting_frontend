import React from 'react';
import BaseValidator from './';

class TestComponent extends BaseValidator {

  constructor(...props) {
    super(...props);

    this.state = {
      isValid: this.validateConstraint(this.props.constraint, this.props.value),
    };
  }

  render() {
    const isValid = this.state.isValid ? 'valid' : 'invalid';

    return (
      <input
        id="textField"
        className={isValid}
        type="text"
      />
    );
  }
}

describe('BaseValidator', () => {
  const valid = 'valid';
  const invalid = 'invalid';
  const constraints = [
    { type: 'minLength' },
    { type: 'hasFunctionValidator', validator: (val) => val === 'test' },
    { type: 'regex', validator: '^.+@.+$' },
    { type: 'notInLookup' },
  ];

  describe('when validateConstraint() is called', () => {
    it('should remain valid when no constraint & value is passed', () => {
      const component = mount(<TestComponent />);

      expect(component.find('#textField')).to.have.className(valid);
    });

    it('should remain valid when no value is passed', () => {
      const component = mount(
        <TestComponent constraint={constraints[0]} />);

      expect(component.find('#textField')).to.have.className(valid);
    });

    it('should remain valid when no constraint is passed', () => {
      const component = mount(<TestComponent value="abc123" />);

      expect(component.find('#textField')).to.have.className(valid);
    });

    it('should return false with type "minLength" and value "1234"', () => {
      const component = mount(
        <TestComponent constraint={constraints[0]} value="1234" />);

      expect(component.find('#textField')).to.have.className(invalid);
    });

    it('should return true with type "minLength" and value "123456789"', () => {
      const component = mount(
        <TestComponent constraint={constraints[0]} value="123456789" />);

      expect(component.find('#textField')).to.have.className(valid);
    });

    it(
    'should return false with type "hasFunctionValidator" and value "test123"',
    () => {
      const component = mount(
        <TestComponent constraint={constraints[1]} value="test123" />);

      expect(component.find('#textField')).to.have.className(invalid);
    });

    it('should return true with type "hasFunctionValidator" and value "test"',
    () => {
      const component = mount(
        <TestComponent constraint={constraints[1]} value="test" />);

      expect(component.find('#textField')).to.have.className(valid);
    });

    it('should return false with type "hasRegexValidator" and value "abc123"',
    () => {
      const component = mount(
        <TestComponent constraint={constraints[2]} value="abc123" />);

      expect(component.find('#textField')).to.have.className(invalid);
    });

    it('should return true with type "hasRegexValidator" and value "abcd@123"',
    () => {
      const component = mount(
        <TestComponent constraint={constraints[2]} value="abcd@123" />);

      expect(component.find('#textField')).to.have.className(valid);
    });

    it('should return true with type "notInLookup" and value "abcd@123"',
    () => {
      const component = mount(
        <TestComponent constraint={constraints[3]} value="abcd@123" />);

      expect(component.find('#textField')).to.have.className(valid);
    });
  });
});
