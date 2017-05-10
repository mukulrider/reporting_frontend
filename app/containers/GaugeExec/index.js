/*
 *
 * GaugeExec
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectGaugeExec from './selectors';
import messages from './messages';

export class GaugeExec extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="GaugeExec"
          meta={[
            { name: 'description', content: 'Description of GaugeExec' },
          ]}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

GaugeExec.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gauge_exec: makeSelectGaugeExec(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GaugeExec);
