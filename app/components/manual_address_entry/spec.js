import React from 'react';
import ManualAddressEntry from './';

const addressData = {
  line1: {
    label: 'Address line 1',
    value: '1 some road',
    id: 'address-line1',
    placeholder: 'Company name, house or flat number and street',
  },
  line2: {
    label: 'Address line 2 (optional)',
    value: 'some place',
    id: 'address-line2',
    placeholder: null,
  },
  line3: {
    label: 'Address line 3 (optional)',
    value: 'somewhere',
    id: 'address-line3',
    placeholder: null,
  },
  town: {
    label: 'Town / City',
    value: 'chatham',
    id: 'town',
    placeholder: null,
  },
};

describe('ManualAddressEntry component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <ManualAddressEntry
        fieldBlurred={() => {}} // eslint-disable-line react/jsx-no-bind, no-empty-function
        valueUpdated={() => {}} // eslint-disable-line react/jsx-no-bind, no-empty-function
        isHidden={true} // eslint-disable-line react/jsx-boolean-value
        addressLinesValid={true} // eslint-disable-line react/jsx-boolean-value
        address={addressData}
        renderedOnClient={false}
      />
    );
  });

  it('renders the correct wrapping class', () => {
    expect(
      component.find('.ui-component__manual-address')
    ).to.have.length(1);
  });

  it('renders the fields as specified in the address props', () => {
    expect(
      component.find('input')
    ).to.have.length(4);
  });

  it('should render the address fields with the correct values', () => {
    expect(
      mount(
        <ManualAddressEntry
          fieldBlurred={() => {}} // eslint-disable-line react/jsx-no-bind, no-empty-function
          valueUpdated={() => {}} // eslint-disable-line react/jsx-no-bind, no-empty-function
          isHidden={false}
          addressLinesValid={true} // eslint-disable-line react/jsx-boolean-value
          address={addressData}
          renderedOnClient={false}
          manualAddressEdited={() => {}} // eslint-disable-line react/jsx-no-bind, no-empty-function
        />
      ).find('#address-line1')
    ).to.have.value('1 some road');
  });

  it('should render the address fields with the name attributes', () => {
    expect(
      mount(
        <ManualAddressEntry
          fieldBlurred={() => {}} // eslint-disable-line react/jsx-no-bind, no-empty-function
          valueUpdated={() => {}} // eslint-disable-line react/jsx-no-bind, no-empty-function
          isHidden={false}
          addressLinesValid={true} // eslint-disable-line react/jsx-boolean-value
          address={addressData}
          renderedOnClient={false}
          manualAddressEdited={() => {}} // eslint-disable-line react/jsx-no-bind, no-empty-function
        />
      ).find('#address-line1')
    ).to.have.attr('name', 'address-line1');
  });

  it('should render the address fields with the correct placeholders', () => {
    expect(
      component.find('#address-line1')
    ).to.have.attr(
      'placeholder', 'Company name, house or flat number and street'
    );
  });

  it('should render the address fields with the correct labels', () => {
    expect(
      component.find('.ui-component__validated-field').at(0).find('label')
    ).to.have.text('Address line 1');
  });

  // inputs in ManualAddressEntry are controlled inputs so that their
  // values can be manipulated by the parent component
  // so testing here that when their value is changed it is reflected in the ui
  it('updating a field value should get reflected on state', () => {
    const ManualAddress = mount(
      <ManualAddressEntry
        fieldBlurred={() => {}} // eslint-disable-line react/jsx-no-bind, no-empty-function
        valueUpdated={() => {}} // eslint-disable-line react/jsx-no-bind, no-empty-function
        isHidden={false}
        addressLinesValid={true} // eslint-disable-line react/jsx-boolean-value
        address={addressData}
        renderedOnClient={false}
        manualAddressEdited={() => {}} // eslint-disable-line react/jsx-no-bind, no-empty-function
      />
    );

    const addressLine1 = ManualAddress.find('#address-line1');

    addressLine1.simulate('focus');
    addressLine1.simulate('change', { target: { value: '12345' } });
    addressLine1.simulate('blur');
    expect(ManualAddress.state().fieldValues[0].value).to.equal('12345');
  });

  it('if new address props are received then they should be updated on state', () => { // eslint-disable-line max-len
    component.setProps({
      address: {
        line1: {
          label: 'Address line 1',
          value: 'new val',
          id: 'address-line1',
          placeholder: 'Company name, house or flat number and street',
        },
      },
    });
    expect(component.state().fieldValues[0].value).to.equal('new val');
  });

  it('if addressLinesValid prop is falsey then adddresLine1 should be invalid', () => { // eslint-disable-line max-len
    component.setProps({
      addressLinesValid: false,
    });
    expect(component.find('.ui-component__validated-field').at(0))
      .to.have.className('ui-component__validated-field--invalid');
  });

  it('calls the manualAddressEdited callback when a field is edited', () => { // eslint-disable-line max-len
    let called = false;
    const callback = () => {
      called = true;
    };

    const ManualAddress = mount(
      <ManualAddressEntry
        fieldBlurred={() => {}} // eslint-disable-line react/jsx-no-bind, no-empty-function
        valueUpdated={() => {}} // eslint-disable-line react/jsx-no-bind, no-empty-function
        isHidden={false}
        addressLinesValid={true} // eslint-disable-line react/jsx-boolean-value
        address={addressData}
        renderedOnClient={false}
        manualAddressEdited={callback}
      />
      );

    const addressLine1 = ManualAddress.find('#address-line1');

    addressLine1.simulate('focus');
    addressLine1.simulate('change', { target: { value: '12345' } });
    expect(called).to.equal(true);
  });
});
