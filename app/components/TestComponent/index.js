/**
*
* TestComponent
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class TestComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1>{this.props.name} | {this.props.age}</h1>
      </div>
    );
  }
}

TestComponent.propTypes = {

};

export default TestComponent;
