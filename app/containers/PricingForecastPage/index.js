/*
 *
 * PricingForecastPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import {makePricingGraphData, makePricingForecastSelectedType} from './selectors';
import {fetchGraphData, selectedType} from './actions';
import messages from './messages';
// import unt1 from './ut1.csv';
import Button from 'components/button';
// import jsonfile from './data.json';
// import jsonfile2 from './data2.json';
import BarChart from 'components/BarChart';
import LineChart from 'components/LineChart';
import Panel from 'components/panel';
import MultiSeriesLineChart from 'components/MultiSeriesLineChart';
import WaterFallChart from 'components/WaterFallChart';
import {Modal} from 'react-bootstrap';
import SelectInput from 'components/select_input';
import {browserHistory} from 'react-router'
export class PricingForecastPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  x = (fileName = 'department') => {

  };

  componentDidMount = () => {
    this.props.onFetchGraphData();
    document.body.scrollTop = 0;
    // or
    window.scrollTo(0, 0);
    console.log(this.props.params.scenario);
    console.log(this.props.params.forecast);
    // console.log(this.state);

    this.props.onFetchGraphData();
  };

  componentDidUpdate = () => {
    document.body.scrollTop = 0;
    // or
    window.scrollTo(0, 0);
  };

  constructor(props) {
    super(props);
    this.state = {smShow: false, lgShow: false, showGraphTable: false};
  }

  render() {
    let lgClose = () => this.setState({lgShow: false});
    const callback = (e) => {
      // do nothing.
    };

    return (
      <div style={{fontSize: '14px'}}>
        <Helmet
          title="PricingForecastPage"
          meta={[
            {name: 'description', content: 'Description of PricingForecastPage'},
          ]}
        />
        <h3 style={{textAlign: 'center', color: '#333'}}>Forecasts</h3>
        <div className="row">
          <div className="col-xs-12">
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-xs-0 col-lg-4">
                <SelectInput
                  valueUpdated={callback}
                  fieldBlurred={callback}
                  id="selectStoreFormat"
                  name="selectStoreFormat"
                  label=""
                  placeholder="Select Event"
                  onChange={(e) => {
                    this.props.onSelectedType(e.target.value);
                    this.props.onFetchGraphData();
                  }}
                  data={[
                    {
                      name: 'Christmas',
                      rowText: 'Christmas'
                    },
                    {
                      name: 'Super Market Scenario	',
                      rowText: 'Super Market Scenario	'
                    },
                    {
                      name: 'BWS Scenario',
                      rowText: 'BWS Scenario'
                    }
                  ]}
                  valid
                />
              </div>
              <div className="col-xs-12 col-lg-4">
                <SelectInput
                  valueUpdated={callback}
                  fieldBlurred={callback}
                  id="selectStoreFormat"
                  name="selectStoreFormat"
                  label=""
                  placeholder="Select Scenario"
                  onChange={(e) => {
                    this.props.onSelectedType(e.target.value);
                    this.props.onFetchGraphData();
                    if (!this.props.params.scenario) {
                      window.location = '/pricing/forecast/christmas-901/' + e.target.value;
                    }
                    {/*browserHistory.push(`/pricing/forecast/christmas-901/department-890`);*/}
                  }}
                  data={[
                    {
                      name: '7-mar-2017-bws-20170309_080826',
                      rowText: 'DepartmentLevelReportOutput_main-estate-7-mar-2017-bws-20170309_080826'
                    },
                    {
                      name: '7-mar-2017-bws_20170309_080635',
                      rowText: 'ProductLevelReportOutput_main-estate-7-mar-2017-bws_20170309_080635'
                    }]}
                  valid
                />
              </div>
              <div className="col-lg-2"></div>
            </div>

            {(() => {
              if (this.props.params.scenario && this.props.params.forecast) {

                return (
                  <div>
                    <div className="row">
                      <div className="col-xs-6 col-lg-12 text-center">
                        <Button buttonType={'primary'}
                                onClick={(e) => {
                                  this.props.onSelectedType('departmentlevel');
                                  this.props.onFetchGraphData();
                                }}>Category Level</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button buttonType={'primary'}
                                onClick={(e) => {
                                  this.props.onSelectedType('productlevel');
                                  this.props.onFetchGraphData();
                                }}>Buyer Level</Button>
                        {/*<Button buttonType={'primary'}*/}
                        {/*style={{float: 'right'}}>Export</Button>*/}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-lg-6">
                        <Panel>
                          <h3 style={{textAlign: 'center'}}>Units</h3>
                          <MultiSeriesLineChart id={'mlc1'}
                                                graphData={this.props.graphData[0]}
                                                xAxisVar={'date'}
                                                yAxisVar={'temperature'}
                                                yAixsName={'Units (K)'}/>
                        </Panel>
                      </div>
                      <div className="col-xs-12 col-lg-6">
                        <Panel>

                          <h3 style={{textAlign: 'center'}}>Sales</h3>
                          <MultiSeriesLineChart id={'mlc2'}
                                                graphData={this.props.graphData[1]}
                                                xAxisVar={'date'}
                                                yAxisVar={'temperature'}
                                                yAixsName={'Sales (K)'}/>
                        </Panel>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-lg-6">
                        <Panel>

                          <h3 style={{textAlign: 'center'}}>Profit</h3>
                          <MultiSeriesLineChart id={'mlc3'}
                                                graphData={this.props.graphData[2]}
                                                xAxisVar={'date'}
                                                yAxisVar={'temperature'}
                                                yAixsName={'Profit (£)'}/>
                        </Panel>
                      </div>
                      <div className="col-xs-12 col-lg-6">
                        <Panel>

                          <h3 style={{textAlign: 'center'}}>Margin</h3>
                          <MultiSeriesLineChart id={'mlc4'}
                                                graphData={this.props.graphData[3]}
                                                xAxisVar={'date'}
                                                yAxisVar={'temperature'}
                                                yAixsName={'Margin %'}
                                                yAxisType={'percentage'}/>
                        </Panel>
                      </div>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div style={{height: '300px'}}>
                    <br/>
                    <br/>
                    <br/>
                    <h1 style={{textAlign: 'center'}}>Please Select Event and Scenario</h1>

                  </div>
                )
              }
            })()}
          </div>
        </div>
        <br/>
        {(() => {
          if (this.props.params.scenario && this.props.params.forecast) {
            return (
              <Panel>
                <h3 className="text-center">How does price change impact my product sales</h3>
                <table className="table table-striped">
                  <thead style={{fontWeight: 700, textAlign: 'center'}}>
                  <tr>
                    <td>Product ID</td>
                    <td>Product Desc.</td>
                    <td>Current Price (£)</td>
                    <td>Current Cost (£)</td>
                    <td>Scenario Price (£)</td>
                    <td>Scenario Cost (£)</td>
                    <td>Rule Violation</td>
                    <td>Baseline Value (£)</td>
                    <td>Scenario Value (£)</td>
                    <td>Abs. Uplift Value (£)</td>
                    <td>Baseline Value (£)</td>
                    <td>Scenario Volume</td>
                    <td>Abs. Uplift Volume</td>
                    <td>Baseline Profit (£)</td>

                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    {[11234, 'Smirnoff Red Vodka', '1.50', '1.13', '1.40', '1.13',
                      <button className="btn btn-danger"
                              onClick={() => this.setState({lgShow: true})}>3</button>
                      , '532', '571', '40', '355', '408K', '53K', '131'].map(obj => {
                      return (<td>{obj}</td>)
                    })}
                  </tr>
                  <tr>
                    {[12234, 'Smirnoff White Vodka', '1.50', '1.13', '1.40', '1.13',
                      <button className="btn btn-danger"
                              onClick={() => this.setState({lgShow: true})}>3</button>
                      , '532', '571', '40', '355', '408K', '53K', '131'].map(obj => {
                      return (<td>{obj}</td>)
                    })}
                  </tr>
                  </tbody>
                </table>
              </Panel>
            )
          }
        })()}


        <Modal show={this.state.lgShow} bsSize="small" aria-labelledby="contained-modal-title-sm">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-sm">
              <div style={{textAlign: 'center'}}><b>Rules Violation</b></div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table " style={{fontSize: '16px'}}>
              <thead>
              <tr style={{fontWeight: 'bold'}}>
                <td>Index</td>
                <td>Name</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1</td>
                <td>Product variants</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Bigger pack, better value</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Own Label vs Branded</td>
              </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.setState({lgShow: false})}
              style={{display: 'block', margin: '0 auto'}}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

PricingForecastPage.propTypes = {
  onFetchGraphData: React.PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  graphData: makePricingGraphData(),
  selectedType: makePricingForecastSelectedType()
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchGraphData: (e) => dispatch(fetchGraphData(e)),
    onSelectedType: (e) => dispatch(selectedType(e))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingForecastPage);
