import React from 'react';
import SelectInput from './';

const callback = () => {
  // do nothing.
};

const mock = [
  { id: 0, name: 'Mr' },
  { id: 1, name: 'Mrs' },
  { id: 2, name: 'Miss' },
  { id: 3, name: 'Dr' },
];

const prepData = (dataObject) => {
  const dataToShow = [];

  dataObject.forEach((title) => {
    title.rowText = title.name;
    dataToShow.push(title);
  });

  return dataToShow;
};

describe('Select component', () => {
  let selectCmp;

  beforeEach(() => {
    selectCmp = mount(
      <SelectInput
        valueUpdated={callback}
        fieldBlurred={callback}
        data={prepData(mock)}
        label="Title"
        id="testId"
        classes="test1"
        valid
      />);
  });

  it('renders the correct default label', () => {
    expect(selectCmp.find('.ui-component__label-text')).to.have.text('Title');
  });

  it('has an input field of specified type', () => {
    expect(selectCmp.find('select')).to.have.lengthOf(1);
  });

  it('renders a ui-component__validated-field--valid class ' +
    ' when passed the corresponding valid flag via props', () => {
    expect(selectCmp.find('.ui-component__validated-field'))
      .to.have.className('ui-component__validated-field--valid');
  });

  it('renders a ui-component__validated-field--invalid class ' +
    ' when passed the corresponding valid flag via props', () => {
    expect(mount(
      <SelectInput
        valueUpdated={callback}
        fieldBlurred={callback}
        data={prepData(mock)}
        label="Title"
        id="testId"
      />)
      .find('.ui-component__validated-field'))
      .to.have.className('ui-component__validated-field--invalid');
  });

  it('renders an aria-invalid attribute with a falsey value when ' +
    ' the fields valid flag is false', () => {
    expect(selectCmp.find('.ui-component__select__input'))
      .to.have.attr('aria-invalid', 'false');
  });

  it('renders an aria-invalid attribute with a truthy value when ' +
    ' the fields valid flag is true', () => {
    expect(mount(
      <SelectInput
        valueUpdated={callback}
        fieldBlurred={callback}
        data={prepData(mock)}
        label="Title"
        id="testId"
      />)
      .find('.ui-component__select__input'))
      .to.have.attr('aria-invalid', 'true');
  });

  it('renders an span with an id of field-error-text when ' +
    ' the valid flag is false', () => {
    const component = mount(
      <SelectInput
        valueUpdated={callback}
        fieldBlurred={callback}
        data={prepData(mock)}
        label="Title"
        id="testId"
        errorTextId="field-error-text"
        clientErrorText="Please select an option"
      />
    );

    expect(component.find('#field-error-text'))
      .to.have.text('Please select an option');
  });

  it('renders with the classes that were passed in', () => {
    expect(selectCmp).to.have.className('test1');
  });

  it('renders with a class for the ID that was passed in', () => {
    expect(selectCmp).to.have.className('test-id');
  });
});
