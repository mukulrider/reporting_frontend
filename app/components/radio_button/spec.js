import React from 'react';
import RadioButton from './';
import sinon from 'sinon';

const isValid = () => true;

describe('RadioButton component', () => {
  it('should render a wrapping div initially with the expected class', () => {
    expect(shallow(
      <RadioButton id="some-id" label="some label text" valid={isValid} />))
      .to.have.className('ui-component__radio-button-wrapper');
  });

  it('should render the correct class if a valid flag is not passed', () => {
    expect(shallow(<RadioButton id="some-id" label="some label text" />))
    .to.have.className('ui-component__radio-button-wrapper--invalid');
  });

  it('should render a radio-button with the correct class', () => {
    expect(mount(
      <RadioButton id="some-id" label="some label text" valid={isValid} />)
      .find('input.ui-component__radio-button'))
      .to.have.length(1);
  });

  it('should render the radio-button element with the id passed in', () => {
    expect(shallow(
      <RadioButton id="some-id" label="some label text" valid={isValid} />)
      .find('input'))
      .to.have.attr('id', 'some-id');
  });

  it('should disable the radio-button if passed the corresponding prop', () => {
    expect(shallow(
      <RadioButton
        disabled
        id="some-id"
        label="some label text"
        valid
      />)
    .find('input'))
    .to.have.attr('disabled');
  });

  it('should not disable the radio-button if the corresponding prop ' +
    ' is not passed', () => {
    expect(shallow(<RadioButton id="some-id" label="some label text" />)
    .find('input'))
    .to.not.have.attr('disabled');
  });

  it('should render a label with the correct for attribute', () => {
    expect(shallow(<RadioButton id="some-id" label="some label text" />)
    .find('label.ui-component__radio-button-label'))
    .to.have.attr('for', 'some-id');
  });

  it('should render the label with the correct text', () => {
    expect(mount(<RadioButton id="some-id" label="some label text" />)
    .find('.ui-component__radio-button-label--text'))
    .to.have.text('some label text');
  });

  it('should call onChange callback after change ', () => {
    const callback = sinon.spy();
    const component = mount(
      <RadioButton onChange={callback} />);

    component
      .find('.ui-component__radio-button')
      .simulate('change', { target: { checked: true } });
    expect(callback).to.have.property('callCount', 1);
  });
});
