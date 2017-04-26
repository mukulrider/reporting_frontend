/*
 *
 * UserInputPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectUserInputPage from './selectors';
import messages from './messages';

export class UserInputPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>

      </div>
    );
  }
}

UserInputPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userInputPage: makeSelectUserInputPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInputPage);
