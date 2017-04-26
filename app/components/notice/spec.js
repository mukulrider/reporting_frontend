import React from 'react';
import Notice from './';

describe('Signpost Panel component', () => {
  it('has the appropriate class name', () => {
    expect(mount(<Notice type="exclamation" />))
      .to.have.className('ui-component__notice');
  });

  it('has the appropriate img class defined', () => {
    expect(mount(<Notice type="exclamation" />)
      .find('.ui-component__notice__img--exclamation')).to.have.length(1);
  });

  it('renders children when passed in', () => {
    const panel = shallow(
      <Notice type="exclamation">
        <div id="panel-child" />
      </Notice>
    );

    expect(panel.contains(<div id="panel-child" />)).to.equal(true);
  });

  it('should apply classes within className', () => {
    expect(mount(<Notice type="exclamation" className="test-class" />)
      .find('.test-class')).to.have.length(1);
  });
});
