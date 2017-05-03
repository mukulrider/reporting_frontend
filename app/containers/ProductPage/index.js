/*
 *
 * ProductPage
 *
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// or in ECMAScript 5

import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import MultiLineChart2 from 'components/MultiLineChart2';
import * as d3 from 'd3';
import DualLineChart from 'components/DualLineChart';
import Panel from 'components/panel';
import Button from 'components/button';
import Spinner from 'components/spinner';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectProductPage from './selectors';
import messages from './messages';
require('react-bootstrap-table/css/react-bootstrap-table.css')
import NewSelector2 from 'components/NewSelector2';
import {
  makeUrlParamsString,
} from './selectors';
import {
  saveWeekParam,productPageValues,saveMetricParam,fetchSaveWeekParam,generateUrlParamsString
} from './actions';

import styles from './style.scss';


function triangleColumnFormatter(cell, row) {
  if (cell > 0) {
    return '<i class="glyphicon glyphicon-chevron-up productTablePositive"></i>&nbsp'+ cell;
  }
  else if (cell < 0) {
    return '<i class="glyphicon glyphicon-chevron-down productTableNegative"></i>&nbsp'+ cell;
  } else {
    return '<i class="glyphicon glyphicon-minus-sign productTableNeutral"></i>&nbsp'+ cell;
  }
}

function tickColumnFormatter(cell, row) {

  if (cell == 1) {
    return '<i class="glyphicon glyphicon-ok-sign productTablePositive"></i>&nbsp'+ cell;
  }
  else {
    return '<i class="glyphicon glyphicon-remove-sign productTableNegative"></i>&nbsp'+ cell;
  }
}

export class ProductPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount = () => {

  }

  componentDidMount = () => {
    let dataWeekParams = this.props.ProductPage.dataWeekParams;
    let dataMetricParams = this.props.ProductPage.dataMetricParams;
    console.log('dataWeekParams',dataWeekParams);
    console.log('dataMetricParams',dataMetricParams);

    this.props.onSaveMetricParam(dataMetricParams);
    this.props.onGenerateUrlParamsString();

    console.log('Function called from index');

  };

  constructor(props) {
    super(props);
    this.state = {
      smShow: false,
      lgShow: false,
      activePage: 1,
      activeKey: "1",
      activeKey2: "7",
    };
  }
  render() {
    //For url parameters
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: '15', value: 15
      }, {
        text: 'All', value: 25
      } ], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      expandRowBgColor: 'rgb(242, 255, 163)'
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };


    return (
      <div className="row">
          <div style={{ float: 'left', borderRadius: 4, borderWidth: 0.5, borderColor: '#d6d7da', color: 'red' }}>
            <div className="flexleft" style={{ marginTop:"24px"}}>

              {/*<Panel>*/}
              {/*<SelectorDelist sideFilter={this.props.DelistContainer.sideFilter}*/}
              {/*location={this.props.location}*/}
              {/*onGenerateTable={this.props.onGenerateTable}*/}
              {/*onGenerateUrlParams={this.props.onGenerateUrlParams}*/}
              {/*onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}/>*/}

              {/*{console.log("this.props.DelistContainer.sideFilter", this.props.DelistContainer.sideFilter)}*/}


              {(() => {
              if (this.props.ProductPage.sideFilter) {
              return (
              <NewSelector2 sideFilter={this.props.ProductPage.sideFilter}
              location={this.props.location}
              onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
              onProductPage={this.props.onProductPageValues}
              />
              )
              } else {
              return (
              <div style={{padding: '10px'}}>LOADING</div>
              )
              }
              })()}





            </div>
          </div>
          <div className="col-xs-10" style={{ float: 'right', paddingLeft: '15px' }}>
            <div className="col-xs-12">
              <Nav bsStyle="tabs"  activeKey={this.state.activeKey} >
                <NavItem
                  className=" tabsCustomList col-xs-2" eventKey="1" onClick={() => {
                  this.setState({activeKey: "1"});
                  let dataWeekParams="week_flag=Latest Week";
                  this.props.onSaveWeekParam(dataWeekParams);
                  /*
                  let week_no = "time_period=13_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
            this.props.onWeekTabClick("Week: 13 weeks ")*/
                  }} style={{ fontSize: '14px',width:'15%',paddingLeft:'0%',paddingRight:'0%' }}
                ><b>Selected Week</b></NavItem>
                <NavItem
                  className="tabsCustomList col-xs-2" eventKey="2" onClick={() => {
                  this.setState({activeKey: "2"});
                  let dataWeekParams="week_flag=Last 4 Weeks";
                  this.props.onSaveWeekParam(dataWeekParams);
                  /*
                  let week_no = "time_period=26_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
            this.props.onWeekTabClick("Week: 26 weeks ")*/
                  }} style={{ fontSize: '14px',width:'15%',paddingLeft:'0%',paddingRight:'0%' }}
                ><b>Last 4 Weeks</b></NavItem>
                <NavItem
                  className="tabsCustomList col-xs-2" eventKey="3" onClick={() => {
                  this.setState({activeKey: "3"});
                  let dataWeekParams="week_flag=Last 13 Weeks";
                  this.props.onSaveWeekParam(dataWeekParams);
//                  this.props.onFetchSaveWeekParam();
                  /*
                  let week_no = "time_period=52_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
            this.props.onWeekTabClick("Week: 52 weeks ")*/
                  }} style={{ fontSize: '14px',width:'15%',paddingLeft:'0%',paddingRight:'0%' }}
                ><b>Last 13 Weeks</b></NavItem>
                <NavItem
                  className="tabsCustomList col-xs-2" eventKey="4" onClick={() => {
                  this.setState({activeKey: "4"});
                  let dataWeekParams="week_flag=Last 52 Weeks";
                  this.props.onSaveWeekParam(dataWeekParams);
                  /*
                  let week_no = "time_period=52_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
                  this.props.onWeekTabClick("Week: 52 weeks ")*/
                  }} style={{ fontSize: '14px',width:'15%',paddingLeft:'0%',paddingRight:'0%' }}
                ><b>Last 52 Weeks</b></NavItem>
                <NavItem
                  className="tabsCustomList col-xs-2" eventKey="5" onClick={() => {
                  this.setState({activeKey: "5"});
                  let dataWeekParams="YTD";
                  this.props.onSaveWeekParam(dataWeekParams);
                  /*
                  let week_no = "time_period=52_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
                  this.props.onWeekTabClick("Week: 52 weeks ")*/
                  }} style={{ fontSize: '14px',width:'15%',paddingLeft:'0%',paddingRight:'0%' }}
                ><b>YTD</b></NavItem>
                <NavItem
                  className="tabsCustomList col-xs-2" eventKey="6" onClick={() => {
                  this.setState({activeKey: "6"});
                  let dataWeekParams="week_flag=PTD";
                  this.props.onSaveWeekParam(dataWeekParams);
                  /*
                  let week_no = "time_period=52_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
                  this.props.onWeekTabClick("Week: 52 weeks ")*/
                  }} style={{ fontSize: '14px',width:'15%',paddingLeft:'0%',paddingRight:'0%' }}
                ><b>PTD</b></NavItem>
              </Nav>
            </div>

            <div className="col-xs-12">
              <Nav bsStyle="tabs" className="tabsCustom tabsCustomInner" activeKey={this.state.activeKey2} onSelect={this.handleSelect}>
                <NavItem
                  eventKey="7" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "7"});
                  let dataMetricParams="metric_flag=Value";
                  this.props.onSaveMetricParam(dataMetricParams);
                  /*
                  let week_no = "time_period=13_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
            this.props.onWeekTabClick("Week: 13 weeks ")*/
                  }} style={{ fontSize: '14px' }}
                ><b>Value</b></NavItem>
                <NavItem
                  eventKey="8" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "8"});
                  let dataMetricParams="metric_flag=Volume";

                  this.props.onSaveMetricParam(dataMetricParams);
                  /*
                  let week_no = "time_period=26_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
            this.props.onWeekTabClick("Week: 26 weeks ")*/
                  }} style={{ fontSize: '14px' }}
                ><b>Volume</b></NavItem>
                <NavItem
                  eventKey="9" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "9"});
                  let dataMetricParams="metric_flag=cogs";
                  this.props.onSaveMetricParam(dataMetricParams);
                  /*
                  let week_no = "time_period=52_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
            this.props.onWeekTabClick("Week: 52 weeks ")*/
                  }} style={{ fontSize: '14px' }}
                ><b>COGS</b></NavItem>
                <NavItem
                  eventKey="10" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "10"});
                  let dataMetricParams="metric_flag=cgm";
                  this.props.onSaveMetricParam(dataMetricParams);
                  /*
                  let week_no = "time_period=52_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
                  this.props.onWeekTabClick("Week: 52 weeks ")*/
                  }} style={{ fontSize: '14px' }}
                ><b>CGM</b></NavItem>
                <NavItem
                  eventKey="11" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "11"});
                  let dataMetricParams="metric_flag=Waste";
                  this.props.onSaveMetricParam(dataMetricParams);
                  /* this.setState({activeKey: "3"});
                  let week_no = "time_period=52_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
                  this.props.onWeekTabClick("Week: 52 weeks ")*/
                  }} style={{ fontSize: '14px' }}
                ><b>Waste</b></NavItem>
                <NavItem
                  eventKey="12" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey: "12"});
                  let dataMetricParams="metric_flag=Stock";
                  this.props.onSaveMetricParam(dataMetricParams);
                  /* this.setState({activeKey: "3"});
                  let week_no = "time_period=52_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
                  this.props.onWeekTabClick("Week: 52 weeks ")*/
                  }} style={{ fontSize: '14px' }}
                ><b>Stock</b></NavItem>
                <NavItem
                  eventKey="13" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey: "13"});
                  let dataMetricParams="metric_flag=Price";
                  this.props.onSaveMetricParam(dataMetricParams);
                  /*
                  let week_no = "time_period=52_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
                  this.props.onWeekTabClick("Week: 52 weeks ")*/
                  }} style={{ fontSize: '14px' }}
                ><b>Price</b></NavItem>
              </Nav>
            </div>
            <div >
              <div className="col-xs-12">
              <p style={{backgroundColor:'#00539F',color:'#FFFFFF',justifyContent: 'center',alignItems: 'center',textAlign: 'center' }}><b>How Am I positioned against the market?</b></p>
              </div>
              <div className="col-xs-12">
                <div className="col-xs-3" style={{marginTop: '8%'}}>

                        {(() => {
                          if (this.props.ProductPage.data && this.props.ProductPage.data.comp_data) {
                            return this.props.ProductPage.data.comp_data.map((obj) => {

                              return (
                                <table className="table table-hover table-striped table-bordered table_cust">
                                <thead style={{ verticalAlign: 'middle',color:'#FFFFFF'}}>
                                <tr>
                                  <th colSpan="12" style={{ verticalAlign: 'middle', fontSize: '14px',backgroundColor:'#00539F',textAlign: 'center' }}><b>{obj.metric_title}</b></th>
                                </tr>
                                <tr>
                                <th colSpan="6" style={{ verticalAlign: 'middle', fontSize: '14px',backgroundColor:'#1782CA',textAlign: 'center'}}>{'£ ' + (obj.metric_all / 1000).toFixed(0) + 'K'}</th>
                                <th colSpan="6" style={{ verticalAlign: 'middle', fontSize: '14px',backgroundColor:'#1782CA',textAlign: 'center' }}>{'LFL: £ ' + (obj.metric_lfl / 1000).toFixed(0) + 'K'}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr style={{ verticalAlign: 'middle',color:'#000000',backgroundColor:'#FFFFFF' }}>
                                  <td colSpan="4" ><span className={(() => {
                                    if (obj.wow_change > 0) {
                                      return "glyphicon glyphicon-arrow-up productTablePositive"
                                    } else {
                                      return "glyphicon glyphicon-arrow-down productTableNegative"
                                    }
                                  })()}>&nbsp;</span>{(obj.wow_change)+'%'}
                                    <br/><br/><p style={{color:'#1782CA'}}>WOW</p></td>
                                  <td colSpan="4" ><span className={(() => {
                                    if (obj.yoy_change > 0) {
                                      return "glyphicon glyphicon-arrow-up productTablePositive"
                                    } else {
                                      return "glyphicon glyphicon-arrow-down productTableNegative"
                                    }
                                  })()}>&nbsp;</span>{(obj.yoy_change)+'%'}
                                    <br/><br/><p style={{color:'#1782CA'}}>YOY</p></td>
                                  <td colSpan="4" ><span className={(() => {
                                    if (obj.lfl_change > 0) {
                                      return "glyphicon glyphicon-arrow-up productTablePositive"
                                    } else {
                                      return "glyphicon glyphicon-arrow-down productTableNegative"
                                    }
                                  })()}>&nbsp;</span>{(obj.lfl_change)+'%'}
                                    <br/><br/><p style={{color:'#1782CA'}}>LFL</p></td>
                              </tr>

                              </tbody>
                              </table>
                              )

                            })
                          }else {
                            return (

                              <div className="text-center" colSpan="11"><Spinner />Please Wait a Moment....!</div>

                            );
                          }
                          }
                        )()}

                </div>

                <div className="col-xs-8" style={{float:'right',border: '1px solid',backgroundColor:'#FFFFFF'}}>
                    <DualLineChart data={this.props.ProductPage.d3_output}/>
                </div>

              </div>

            </div>
              <div className="col-xs-12">
                <h1 className="ts-blk-proview-subhead ts-blk-proview col-xs-12" style={{ fontSize: '26px', verticalAlign: 'middle', textAlign: 'center',backgroundColor:'#00539F',color:'#FFFFFF' }}>
                  <b>TOP 25 SKUs </b>
                </h1>
                <div>
                {
                  (() => {
                  // if (this.props.ProductPage.data) {
                  if (this.props.ProductPage.data && this.props.ProductPage.data.top_output) {


                  return (
                  <div>
                  <BootstrapTable
                  data={this.props.ProductPage.data.top_output} options={options}
                  striped={true}
                  hover
                  condensed
                  pagination={ true }
                  search={true}
                  exportCSV={true}
                  >
                  <TableHeaderColumn row="0" rowSpan="2" dataField="product_id" isKey={true} dataAlign="center" dataSort>Product ID</TableHeaderColumn>
                  <TableHeaderColumn row="0" rowSpan="2" width="225" dataField="description" dataSort={true} dataAlign="center">Description</TableHeaderColumn>
                  <TableHeaderColumn row="0" rowSpan="2" width="125" dataField="product_area" dataSort={true} dataAlign="center">Product Area</TableHeaderColumn>
                  <TableHeaderColumn row="0" colSpan="5" dataAlign="center">Price</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="asp" dataSort={true} dataAlign="center">ASP</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="asp_diff_lw" dataSort={true} dataAlign="center" dataFormat={ triangleColumnFormatter }>v LW</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="promo" dataSort={true} dataAlign="center" dataFormat={ tickColumnFormatter }>Promo?</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="top20" dataSort={true} dataAlign="center" dataFormat={ tickColumnFormatter }>Top 20</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="rank_lw" dataSort={true} dataAlign="center">LW Rank</TableHeaderColumn>
                  <TableHeaderColumn row="0" colSpan="4"  dataSort={true} dataAlign="center">Sales</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_value" dataSort={true} dataAlign="center">Sales Value</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_value_diff_lw" dataSort={true} dataAlign="left" dataFormat={ triangleColumnFormatter }>v LW</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_volume" dataSort={true} dataAlign="center">Sales Volume</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_volume_diff_lw" dataSort={true} dataAlign="left" dataFormat={ triangleColumnFormatter }>vLW</TableHeaderColumn>
                  </BootstrapTable>

                  </div>
                  );

                }
                  else {
                  return (

                  <div className="text-center" colSpan="11"><Spinner />Please Wait a Moment....!</div>

                  );
                }
                })()
                }

                </div>
              </div>
              <br>
              </br>

              <div className="col-xs-12">
                <h1 className="ts-blk-proview-subhead ts-blk-proview col-xs-12" style={{ fontSize: '26px', verticalAlign: 'middle', textAlign: 'center',backgroundColor:'#00539F',color:'#FFFFFF' }}>
                <b>BOTTOM 25 SKUs </b>
                </h1>
                <div>
                {
                  (() => {
                  // if (this.props.ProductPage.data) {
                  if (this.props.ProductPage.data && this.props.ProductPage.data.bottom_output) {


                  return (
                  <div>
                  <BootstrapTable
                  data={this.props.ProductPage.data.bottom_output} options={options}
                  striped
                  hover
                  condensed
                  pagination={ true }
                  search={true}
                  exportCSV={true}
                  >
                  <TableHeaderColumn row="0" rowSpan="2" dataField="product_id" isKey={true} dataAlign="center" dataSort>Product ID</TableHeaderColumn>
                  <TableHeaderColumn row="0" rowSpan="2" width="225" dataField="description" dataSort={true} dataAlign="center">Description</TableHeaderColumn>
                  <TableHeaderColumn row="0" rowSpan="2" width="125" dataField="product_area" dataSort={true} dataAlign="center">Product Area</TableHeaderColumn>
                  <TableHeaderColumn row="0" colSpan="5" dataAlign="center">Price</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="asp" dataSort={true} dataAlign="center">ASP</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="asp_diff_lw" dataSort={true} dataAlign="center" dataFormat={ triangleColumnFormatter }>v LW</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="promo" dataSort={true} dataAlign="center" dataFormat={ tickColumnFormatter }>Promo?</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="top20" dataSort={true} dataAlign="center" dataFormat={ tickColumnFormatter }>Top 20</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="rank_lw" dataSort={true} dataAlign="center">LW Rank</TableHeaderColumn>
                  <TableHeaderColumn row="0" colSpan="4"  dataSort={true} dataAlign="center">Sales</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_value" dataSort={true} dataAlign="center">Sales Value</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_value_diff_lw" dataSort={true} dataAlign="left" dataFormat={ triangleColumnFormatter }>v LW</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_volume" dataSort={true} dataAlign="center">Sales Volume</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_volume_diff_lw" dataSort={true} dataAlign="left" dataFormat={ triangleColumnFormatter }>vLW</TableHeaderColumn>
                  </BootstrapTable>

                  </div>
                  );

                }
                  else {
                  return (

                  <div className="text-center" colSpan="11" style={{textAlign:'centre'}}><Spinner />Please Wait a Moment....!</div>

                  );
                }
                })()
                }

              </div>
            </div>
          </div>
      </div>

    );
  }
}

ProductPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ProductPage: makeSelectProductPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onProductPageValues: (e) => dispatch(productPageValues(e)),
    onSaveWeekParam: (e) => dispatch(saveWeekParam(e)),
    onSaveMetricParam: (e) => dispatch(saveMetricParam(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
//  onGenerateSideFilter: (e) => dispatch(generateSideFilter(e)),
//  onFetchSaveWeekParam: (e) => dispatch(fetchSaveWeekParam(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);

