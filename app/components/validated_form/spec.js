import React from 'react';
import Button from '../button';
import EmailField from '../email_field';
import PasswordField from '../password_field';
import ValidatedForm from './';

describe('ValidatedForm component', () => {
  describe('using fields array', () => {
    // create a fake component that extends
    // validatedField to allow for testing
    class TestComponent extends ValidatedForm {

      static defaultProps = {
        fields: [
          {
            id: 'email',
            constraints: [
              {
                type: 'regex',
                validator: /.@./,
              },
              {
                type: 'mandatory',
                validator: true,
              },
            ],
            isValid: true,
            value: '',
          },
        ],
      };

      getRef(str) {
        return str;
      }

      render() {
        return (
          <form
            noValidate
            onSubmit={this.handleSubmit}
          >
            {
              this.state.fields.map((field, i) => {
                switch (field.id) {
                case 'email':
                  return (
                    <EmailField
                      valueUpdated={this.valueUpdated}
                      fieldBlurred={this.fieldBlurred}
                      valid={field.isValid}
                      id={field.id}
                      value={field.value}
                      ref={this.getRef('emailField')}
                      key={i}
                    />
                );
                case 'password':
                  return (
                    <PasswordField
                      valueUpdated={this.valueUpdated}
                      fieldBlurred={this.fieldBlurred}
                      valid={field.isValid}
                      id={field.id}
                      key={i}
                      ref={this.getRef('passwordField')}
                    />
                );
                default:
                }

                return true;
              })
            }
            <Button disabled={this.state.formSubmitting}>Log in</Button>
          </form>
        );
      }
    }

    it('outputs fields based on specified props', () => {
      expect(mount(<TestComponent />).find('.ui-component__validated-field'))
      .to.have.length(1);
    });

    it('onblur, a field with an invalid value should receive a class of .ui-component__validated-field--invalid', () => { // eslint-disable-line max-len
      const component = mount(<TestComponent />);
      const input = component.find('input');

      input.simulate('focus');
      input.node.value = '12345';
      input.simulate('change');
      input.simulate('blur');
      expect(
        component.find('.ui-component__validated-field')
      ).to.have.className('ui-component__validated-field--invalid');
    });

    it('if a field has not been previously blurred it should not be validated onchange', () => { // eslint-disable-line max-len
      const component = mount(<TestComponent />);
      const input = component.find('input');

      input.simulate('focus');
      input.node.value = '12345';
      input.simulate('change');
      expect(
        component.find('.ui-component__validated-field')
      ).to.have.className('ui-component__validated-field--valid');
    });

    it('if a field has been previously blurred it should be validated onchange', () => { // eslint-disable-line max-len
      const component = mount(<TestComponent />);
      const input = component.find('input');

      input.simulate('focus');
      input.node.value = '12345';
      input.simulate('change');
      input.simulate('blur');
      input.simulate('focus');
      input.node.value = 'j@j';
      input.simulate('change');
      expect(
        component.find('.ui-component__validated-field')
      ).to.have.className('ui-component__validated-field--valid');
    });

    it('if the form is submitted and the field is empty it should receive the correct class', () => { // eslint-disable-line max-len
      const component = mount(<TestComponent />);
      const input = component.find('input');
      const form = component.find('form');

      input.simulate('focus');
      form.simulate('submit');
      expect(
        component.find('.ui-component__validated-field')
      ).to.have.className('ui-component__validated-field--invalid');
    });

    it('if the form is submitted and the field has an invalid value it should receive the correct class', () => { // eslint-disable-line max-len
      const component = mount(<TestComponent />);
      const input = component.find('input');
      const form = component.find('form');

      input.node.value = 'j@';
      form.simulate('submit');
      expect(
        component.find('.ui-component__validated-field')
      ).to.have.className('ui-component__validated-field--invalid');
    });

    it('if the form is submitted and the field has a valid value it should receive the correct class', () => { // eslint-disable-line max-len
      const component = mount(<TestComponent />);
      const input = component.find('input');
      const form = component.find('form');

      input.node.value = 'j@j';
      form.simulate('submit');
      expect(
        component.find('.ui-component__validated-field')
      ).to.have.className('ui-component__validated-field--valid');
    });

    it('it should set the correct state when the form passes validation and submits', () => { // eslint-disable-line max-len
      const component = mount(<TestComponent />);
      const input = component.find('input');
      const form = component.find('form');

      input.node.value = 'j@j';
      form.simulate('submit');
      expect(component.state().formSubmitting).to.equal(true);
    });

    it('add a disabled attribute to the button if the form is submitting', () => { // eslint-disable-line max-len
      const component = mount(<TestComponent />);
      const emailInput = component.find('input[type="email"]');
      const form = component.find('form');
      const button = form.find('.ui-component__button');

      emailInput.node.value = 'j@j';
      form.simulate('submit');
      expect(button).to.have.html('<button class="ui-component__button" disabled=""><span>Log in</span></button>'); // eslint-disable-line max-len
    });

    it('should not add a disabled attribrute to the button if the form fails validation', () => { // eslint-disable-line max-len
      const component = mount(<TestComponent />);
      const emailInput = component.find('input[type="email"]');
      const form = component.find('form');
      const button = form.find('.ui-component__button');

      emailInput.node.value = '123';
      form.simulate('submit');
      expect(button).to.have.html(
        '<button class="ui-component__button"><span>Log in</span></button>'
      );
    });

    it('should set a fields validity based on the isValid prop', () => {
      const fields = [
        {
          id: 'email',
          constraints: [
            { validator: /.@./ },
          ],
          isValid: false,
        },
      ];
      const component = mount(<TestComponent fields={fields} />);
      const emailInput = component.find('.ui-component__validated-field');

      expect(emailInput)
        .to.have.className('ui-component__validated-field--invalid');
    });

    it('if a field is initially rendered with a falsey isValid prop then it should validate onChange', () => { // eslint-disable-line max-len
      const fields = [
        {
          id: 'email',
          constraints: [
            { validator: /.@./ },
          ],
          isValid: false,
        },
      ];
      const component = mount(<TestComponent fields={fields} />);
      const emailField = component.find('.ui-component__validated-field');
      const emailInput = component.find('input[type="email"]');

      emailInput.node.value = 'j@j';
      emailInput.simulate('change');
      expect(emailField)
        .to.have.className('ui-component__validated-field--valid');
    });

    it('if a field is initially rendered with a truthy isValid prop then it should validate onBlur only', () => { // eslint-disable-line max-len
      const fields = [
        {
          id: 'email',
          constraints: [
            { validator: /.@./ },
          ],
          isValid: true,
        },
      ];
      const component = mount(<TestComponent fields={fields} />);
      const emailField = component.find('.ui-component__validated-field');
      const emailInput = component.find('input[type="email"]');

      emailInput.node.value = '123';
      expect(emailField)
        .to.have.className('ui-component__validated-field--valid');
    });

    it('should focus the first field when there are no errors', () => {
      const fields = [
        {
          id: 'email',
          constraints: [
            { validator: (val) => /.@./.test(val) },
          ],
          isValid: true,
        },
      ];

      mount(<TestComponent fields={fields} />);
      expect(global.document.activeElement.id).to.equal(fields[0].id);
    });

    it('should there be two fields and one is automatically populated then the second empty field should be in a valid state', () => { // eslint-disable-line max-len
      const fields = [
        {
          id: 'email',
          constraints: [
            { validator: /.@./ },
          ],
          isValid: true,
          value: 'test@test.com',
        },
        {
          id: 'password',
          constraints: [
            { type: 'minLength', validator: (val) => val.length >= 8 },
          ],
          isValid: true,
        },
      ];

      const component = mount(<TestComponent fields={fields} />);

      expect(component.find('.ui-component__password-field'))
        .to.have.className('ui-component__validated-field--valid');
    });

    it('should set showErrorText=true on state after submit attempt', () => {
      const component = mount(<TestComponent />);
      const form = component.find('form');

      form.simulate('submit');
      expect(
        component.state().showErrorText
      ).to.equal(true);
    });

    it('should have invalid state on empty field that is blurred after submit', () => { // eslint-disable-line max-len
      const component = mount(<TestComponent />);
      const form = component.find('form');
      const input = component.find('input');

      form.simulate('submit');
      input.simulate('focus');
      input.simulate('blur');
      expect(
        component.find('.ui-component__validated-field')
      ).to.have.className('ui-component__validated-field--invalid');
    });
  });

  describe('using fields array with optional validation rules', () => {
    // create a fake component that extends
    // validatedField to allow for testing
    class TestComponent extends ValidatedForm {

      static defaultProps = {
        fields: [
          {
            id: 'email',
            constraints: [
              {
                type: 'regex',
                validator: /.@./,
              },
            ],
            isValid: true,
            value: '',
          },
          {
            id: 'password',
            constraints: [
              { type: 'minLength', validator: 3 },
              { type: 'maxLength', validator: 10 },
            ],
            isValid: true,
            value: '',
          },
        ],
      };

      getRef(str) {
        return str;
      }

      render() {
        return (
          <form
            noValidate
            onSubmit={this.handleSubmit}
          >
            {
              this.state.fields.map((field, i) => {
                switch (field.id) {
                case 'email':
                  return (
                    <EmailField
                      valueUpdated={this.valueUpdated}
                      fieldBlurred={this.fieldBlurred}
                      valid={field.isValid}
                      id={field.id}
                      value={field.value}
                      ref={this.getRef('emailField')}
                      key={i}
                    />
                  );
                case 'password':
                  return (
                    <PasswordField
                      valueUpdated={this.valueUpdated}
                      fieldBlurred={this.fieldBlurred}
                      valid={field.isValid}
                      id={field.id}
                      key={i}
                      ref={this.getRef('passwordField')}
                    />
                  );
                default:
                }

                return true;
              })
            }
            <Button disabled={this.state.formSubmitting}>Log in</Button>
          </form>
        );
      }
    }

    it('should skip validation on optional fields when no value is provided', () => { // eslint-disable-line max-len
      const component = mount(<TestComponent />);
      const input = component.find('input');
      const email = input.at(0);
      const password = input.at(1);

      email.simulate('focus');
      email.node.value = '';
      email.simulate('change');
      email.simulate('blur');

      password.simulate('focus');
      password.node.value = '12';
      password.simulate('change');
      password.simulate('blur');

      const fields = component.find('.ui-component__validated-field');

      expect(fields.at(0))
        .to.have.className('ui-component__validated-field--valid');
      expect(fields.at(1))
        .to.have.className('ui-component__validated-field--invalid');
    });

    it('should run validation on optional fields when value is provided', () => { // eslint-disable-line max-len
      const component = mount(<TestComponent />);
      const input = component.find('input');
      const email = input.at(0);
      const password = input.at(1);

      email.simulate('focus');
      email.node.value = '12';
      email.simulate('change');
      email.simulate('blur');

      password.simulate('focus');
      password.node.value = '12';
      password.simulate('change');
      password.simulate('blur');

      const fields = component.find('.ui-component__validated-field');

      expect(fields.at(0))
        .to.have.className('ui-component__validated-field--invalid');
      expect(fields.at(1))
        .to.have.className('ui-component__validated-field--invalid');
    });
  });

  describe('using children fields', () => {
    let component;

    class FieldSet extends React.Component { // eslint-disable-line react/prefer-stateless-function
      static propTypes = {
        id: React.PropTypes.string.isRequired,
        fields: React.PropTypes.array.isRequired,
      };

      getRef(field) {
        return field.id;
      }

      renderFields() {
        return this.props.fields.map((field, i) =>
          <div key={i} ref={this.getRef(field)} />
        );
      }

      render() {
        return (
          <div id={this.props.id}>
            {this.renderFields()}
          </div>
        );
      }
    }

    class TestComponent extends ValidatedForm {
      renderChildren() {
        return (
          React.Children.map(this.props.children, (child) =>
            React.cloneElement(child, {
              ref: child.props.id,
            })
          )
        );
      }

      render() {
        return (
          <div>
            {this.renderChildren()}
          </div>
        );
      }

    }

    const mockFields = [
      {
        id: 'testField1',
      },
      {
        id: 'testField2',
      },
    ];

    beforeEach(() => {
      component = mount(
        <TestComponent>
          <FieldSet id="mock1" fields={mockFields} />
        </TestComponent>
      );
    });

    it('should have accessible child refs', () => {
      // when the fields are wrapped inside another component,
      // they're accessed through the refs chain
      expect(component.get(0).refs.mock1.refs.testField1).to.be.an('object');
      expect(component.get(0).refs.mock1.refs.testField2).to.be.an('object');
    });

    it('should render child elements', () => {
      expect(component.find('#mock1').children()).to.have.length(2);
    });
  });
});
