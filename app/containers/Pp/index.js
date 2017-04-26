/*
 *
 * Pp
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectPp from './selectors';
import messages from './messages';

export class Pp extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>pp pp pp
        <Helmet
          title="Pp"
          meta={[
            { name: 'description', content: 'Description of Pp' },
          ]}
        />
        pp pp pp
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Pp.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pp: makeSelectPp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pp);
