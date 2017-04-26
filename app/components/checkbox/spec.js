import React from 'react';
import Checkbox from './';

describe('Checkbox component', () => {
  it('should render a wrapping div initially with the expected class', () => {
    expect(shallow(<Checkbox id="some-id" label="some label text" />))
    .to.have.className('ui-component__checkbox-wrapper');
  });

  it('should render the correct class if a valid flag is not passed', () => {
    expect(shallow(<Checkbox id="some-id" label="some label text" />))
    .to.have.className('ui-component__checkbox-wrapper--invalid');
  });

  it('should render a checkbox with the correct class', () => {
    expect(mount(<Checkbox id="some-id" label="some label text" />)
    .find('input.ui-component__checkbox'))
    .to.have.length(1);
  });

  it('should render the checkbox element with the id passed in', () => {
    expect(shallow(<Checkbox id="some-id" label="some label text" />)
    .find('input'))
    .to.have.attr('id', 'some-id');
  });

  it('should disable the checkbox if passed the corresponding prop', () => {
    expect(shallow(<Checkbox isDisabled id="some-id" label="some label text" />)
    .find('input'))
    .to.have.attr('disabled');
  });

  it('should not disable the checkbox if the corresponding prop is not passed', () => {
    expect(shallow(<Checkbox id="some-id" label="some label text" />)
    .find('input'))
    .to.not.have.attr('disabled');
  });

  it('should render a name attribute if its passed', () => {
    expect(shallow(<Checkbox id="some-id" label="some label text" name="some-name" />)
    .find('input'))
    .to.have.attr('name', 'some-name');
  });

  it('should render a tick icon inside the dummy checkbox', () => {
    expect(shallow(<Checkbox id="some-id" label="some label text" />)
    .find('.ui-component__dummy-checkbox .ui-component__icon--checkmark'))
    .to.have.length(1);
  });

  it('should render a label with the correct for attribute', () => {
    expect(shallow(<Checkbox id="some-id" label="some label text" />)
    .find('label.ui-component__checkbox-label'))
    .to.have.attr('for', 'some-id');
  });

  it('should render the label with the correct text', () => {
    expect(mount(<Checkbox id="some-id" label="some label text" />)
    .find('.ui-component__checkbox-label--text'))
    .to.have.text('some label text');
  });
});
