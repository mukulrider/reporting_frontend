import React from 'react';
import Panel from './';

describe('Panel component', () => {
  it('has the appropriate class name', () => {
    expect(shallow(<Panel />).first())
      .to.have.className('ui-component__panel');
  });

  it('renders children when passed in', () => {
    const panel = shallow(
      <Panel>
        <div id="panel-child" />
      </Panel>
    );
    expect(panel.contains(<div id="panel-child" />)).to.equal(true);
  });
});
