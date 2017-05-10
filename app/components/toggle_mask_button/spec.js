import React from 'react';
import sinon from 'sinon';
import ToggleMaskButton from './';

describe('ToggleMaskButton component', () => {
  it('renders a toggle button', () => {
    expect(shallow(<ToggleMaskButton />)).to.have.tagName('button');
  });

  it('renders with "Show" as button text', () => {
    expect(shallow(<ToggleMaskButton />)).to.have.text('Show');
  });

  it('clicking button changes text to "Hide"', () => {
    const component = shallow(<ToggleMaskButton />);
    component.simulate('click', { preventDefault: () => {} });
    expect(component).to.have.text('Hide');
  });

  it('clicking button triggers callback function', () => {
    const callback = sinon.spy();
    sinon.spy(ToggleMaskButton.prototype, 'handleClick');
    const component = shallow(<ToggleMaskButton onToggle={callback} />);
    component.simulate('click', { preventDefault: () => {} });
    expect(ToggleMaskButton.prototype.handleClick.calledOnce).to.equal(true);
    expect(callback.calledOnce).to.equal(true);
  });
});
