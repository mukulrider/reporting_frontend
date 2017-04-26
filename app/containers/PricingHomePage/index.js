/*
 *
 * PricingHomePage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectPricingHomePage from './selectors';
import messages from './messages';
import InputField from 'components/input_field';
import Button from 'components/button';
import Panel from 'components/panel';
// import Panel from 'components/constraint_list';
import Label from 'components/label';
import Notice from 'components/notice';
import style from './style.scss';

export class PricingHomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <Panel>
              <div style={{height: '150px'}}>
                <div style={{textAlign: 'center', fontSize: '100px'}}>Pricing</div>
              </div>
            </Panel>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-xs-4">
            <Panel>
              <h3 style={{textAlign: 'center'}}><b>Create New Event</b></h3>
              <div className="row">
                <div className="col-xs-6">
                  <h4>Enter Event Name</h4>
                  <InputField type="text"/>
                  <br/>
                </div>
                <div className="col-xs-6">
                  <h4>Forecast Time Period</h4>
                  <InputField type="text"/>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <Button buttonType={'primary'}
                          style={{display:'block', margin: '0 auto'}}>Create</Button>
                </div>
              </div>
            </Panel>
          </div>
          <div className="col-xs-12 col-xs-4">
            <Panel>
              <h3 style={{textAlign: 'center'}}><b>Choose From Existing Events</b></h3>
              <div className="row">
                <div className="col-xs-12">
                  <h4>Choose Event</h4>
                  <InputField type="text"/>
                  <br/>
                  <Button style={{display:'block', margin: '0 auto'}}>Select</Button>
                </div>
              </div>
            </Panel>
          </div>
          <div className="col-xs-12 col-xs-4">
            <Panel>
              <h3 style={{textAlign: 'center'}}><b>Compare Scenarios</b></h3>
              <div className="row">
                <div className="col-xs-12">
                  <h4><b>&nbsp;</b></h4>
                  <Button style={{display:'block', margin: '0 auto'}}>Compare Scenarios</Button>
                  <h4>&nbsp;</h4>
                  <br/>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

PricingHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  PricingHomePage: makeSelectPricingHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingHomePage);
