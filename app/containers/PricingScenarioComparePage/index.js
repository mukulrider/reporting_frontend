/*
 *
 * PricingScenarioComparePage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectPricingScenarioComparePage from './selectors';
import messages from './messages';
import Button from 'components/button';
import Panel from 'components/panel';
import {fetchScenarioData} from './actions';
import {makePricingScenarioData} from './selectors';

export class PricingScenarioComparePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    this.props.onFetchScenarioComparisonData();
  };

  render() {
    return (
      <div style={{fontSize: '14px'}}>
        <Helmet
          title="PricingScenarioComparePage"
          meta={[
            {name: 'description', content: 'Description of PricingScenarioComparePage'},
          ]}
        />
        <br/>
        <Button style={{float: 'right'}}>Add Scenario</Button>
        <br/>
        <Panel>
          {((data) => {
            data = data.toJS();
            if (data.length) {
              let createComp = () => {
                let comp = [];
                console.log(data);
                for (let scenario = 0; scenario < data.length; scenario++) {
                  console.log(data[scenario][0][0]['id']);
                  for (let i = 0; i < data[scenario].length; i++) {

                      comp.push(
                        <div className="col-xs-2">
                          {data[scenario][i][0]['id']}
                          {data[scenario][i][0]['values'].reduce(function (a, b) {
                            return a + b.temperature;
                          }, 0)}
                        </div>
                      )

                  }
                }
                return comp;
              };
              return (
                <div>
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="row">
                        {createComp()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })(this.props.pricingScenarioComparisonData)}
        </Panel>
      </div>
    );
  }
}

PricingScenarioComparePage.propTypes = {
  onFetchScenarioComparisonData: React.PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  pricingScenarioComparisonData: makePricingScenarioData()
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchScenarioComparisonData: (e) => dispatch(fetchScenarioData(e))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingScenarioComparePage);
