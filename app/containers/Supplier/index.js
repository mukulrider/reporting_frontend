/*
 *
 * Supplier
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import Panel from 'components/panel';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectSupplier from './selectors';
import messages from './messages';
import Button from 'components/button';
import SampleBarChart from 'components/SampleBarChart';
import BubbleChart2 from 'components/BubbleChart2';
import GaugeChart2 from 'components/GaugeChart2';
import {Nav} from 'react-bootstrap';
import {NavItem} from 'react-bootstrap';
import InputField from 'components/input_field';
import NewSelector2 from 'components/NewSelector2';
import {
  kpibox,
  supplierTable,
  topBottomChart,
  SaveWeekParam,
  SaveKPIParam,
  kpibox_asp,
  SaveTopBottomParam,
  checkboxWeekChange,
  SaveWeek,
  GenerateUrlParamsString,
  getWeekFilter,
} from './actions';
import styles from './style.scss';

export class Supplier extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    this.props.onGenerateUrlParamsString();
    this.props.onGetFilter();
    this.props.onKPIBox();
    this.props.onSupplierTable();
    this.props.ontopBottomChart();
    this.props.onKPIBoxASP();
    this.props.onSaveTopBottomKpi();

    // this.props.supplier.reducer1.sales;
  };


  constructor(props) {
    super(props);
    this.state = {

      activeKey1: "1",
      activeKey2: "1",
      activeKey3: "1"
    };
  }

  render() {

    let dataWeekUrlParams = this.props.supplier.week_param;
    let kpiParams = this.props.supplier.kpi_param;
    let TopBottomKpi = this.props.supplier.top_bottom_kpi;

    console.log('this.props',this.props);
    return (
      <div>

        {/*<div className="flexcontainer">*/}
        <div className="row">

          {/*<div className="flexleft" style={{flexBasis: '300px'}}>*/}
          <div className="col-xs-2">

            Filters will be here soon
            {(() => {
              if (this.props.supplier.sideFilter) {
                return (
                  <NewSelector2 sideFilter={this.props.supplier.sideFilter}
                                location={this.props.location}
                    // onDataUrlParams={this.props.DataUrlParams}
                    // onUrlParamsData={this.props.onUrlParamsData}
                                onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                                week_data = {this.props.supplier.week_filter_data}
                                onKPIBox={ this.props.onKPIBox}
                                onSupplierTable={  this.props.onSupplierTable}
                                ontopBottomChart={  this.props.ontopBottomChart}
                                onKPIBoxASP={  this.props.onKPIBoxASP}
                                onSaveWeek={this.props.onSaveWeek}
                                onCheckboxWeekChange = {this.props.onCheckboxWeekChange}


              // onGenerateFilterParamsString={this.props.onGenerateFilterParamsString}
                    // onGenerateUrlParamsData={this.props.onGenerateUrlParamsData}

                  />
                )
              } else {
                return (
                  <div style={{padding: '10px'}}>LOADING</div>
                )
              }
            })()}


          </div>

          {/*<div className="flexright" style={{flexBasis: '300px', width:'100%'}}>*/}

          <div className="col-xs-10" style={{left: '5.5%'}}>

            <Nav bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect}  className="tabsCustom">
              <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                this.setState({activeKey1: "1"});
                dataWeekUrlParams = "week_flag=1";
                this.props.onSaveWeekParam(dataWeekUrlParams);
                this.props.onKPIBox();
                this.props.onSupplierTable();
                this.props.ontopBottomChart();

              }} style={{fontSize: '20px', fontFamily: 'Tesco'}}>
                <b>Current Week</b></NavItem>

              <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                this.setState({activeKey1: "2"});
                dataWeekUrlParams = "week_flag=2";
                this.props.onSaveWeekParam(dataWeekUrlParams);
                this.props.onKPIBox();
                this.props.onSupplierTable();
                this.props.ontopBottomChart();

              }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Last 4 weeks</b></NavItem>

              <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                this.setState({activeKey1: "3"});
                dataWeekUrlParams = "week_flag=3";
                this.props.onSaveWeekParam(dataWeekUrlParams);
                this.props.onKPIBox();
                this.props.onSupplierTable();
                this.props.ontopBottomChart();

              }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Last 13 weeks</b></NavItem>
              <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                this.setState({activeKey1: "4"});
                dataWeekUrlParams = "week_flag=4";
                this.props.onSaveWeekParam(dataWeekUrlParams);
                this.props.onKPIBox();
                this.props.onSupplierTable();
                this.props.ontopBottomChart();

              }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Last 52 weeks</b></NavItem>

              <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                this.setState({activeKey1: "5"});
                dataWeekUrlParams = "week_flag=5";
                this.props.onSaveWeekParam(dataWeekUrlParams);
                this.props.onKPIBox();
                this.props.onSupplierTable();
                this.props.ontopBottomChart();

              }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>YTD</b></NavItem>
            </Nav>

            <div>
              <Nav bsStyle="tabs" activeKey={this.state.activeKey2} onSelect={this.handleSelect} className="tabsCustom">
                <NavItem eventKey="1" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "1"});
                  kpiParams = "kpi_type=Value";
                  this.props.onSaveKPIParam(kpiParams);
                  this.props.onKPIBox();
                  this.props.ontopBottomChart();
                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}>
                  <b>Value</b></NavItem>

                <NavItem eventKey="2" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "2"});
                  kpiParams = "kpi_type=Volume";
                  this.props.onSaveKPIParam(kpiParams);
                  this.props.onKPIBox();
                  this.props.ontopBottomChart();
                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Volume</b></NavItem>

                <NavItem eventKey="3" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "3"});
                  kpiParams = "kpi_type=COGS";
                  this.props.onSaveKPIParam(kpiParams);
                  this.props.onKPIBox();
                  this.props.ontopBottomChart();
                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>COGS</b></NavItem>
                <NavItem eventKey="4" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "4"});
                  kpiParams = "kpi_type=CGM";
                  this.props.onSaveKPIParam(kpiParams);
                  this.props.onKPIBox()
                  this.props.ontopBottomChart();
                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>CGM</b></NavItem>

                <NavItem eventKey="5" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "5"});
                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>ASP</b></NavItem>

                <NavItem eventKey="6" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "6"});
                  kpiParams = "kpi_type=Supp_Fund";
                  this.props.onSaveKPIParam(kpiParams);
                  this.props.onKPIBox();
                  this.props.ontopBottomChart();
                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Supplier Funding(exc VAT)</b></NavItem>

                <NavItem eventKey="7" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "7"});
                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>SKUs</b></NavItem>

              </Nav>

            </div>

            <div className="row" style={{textAlign: 'center'}}>
              <div className="col-xs-6" style={{backgroundColor: "white"}}>
                <Panel>
                  <h4 className="pageModuleMainTitle"> Total Sales </h4>
                  <div className="col-xs-6" style={{backgroundColor: "grey"}}>

                    <h4>  {this.props.supplier.reducer1.sales} </h4>
                  </div>
                  <div className="col-xs-6" style={{backgroundColor: "grey"}}>
                    <h4> LFL: {this.props.supplier.reducer1.sales_lfl} </h4>
                  </div>
                  <div className="row">
                    <div className="panel-body">
                      <div className="col-xs-4">
                        {/*<div className="panel-body">*/}
                        <h5> {this.props.supplier.reducer1.sales_var_week} </h5>
                        <h4> WoW </h4>

                        {/*</div>*/}
                      </div>
                      <div className="col-xs-4">
                        {/*<div className="panel-body">*/}
                        <h5> {this.props.supplier.reducer1.sales_var_year} </h5>
                        <h4> LFL </h4>

                        {/*</div>*/}
                      </div>
                      <div className="col-xs-4">
                        {/*<div className="panel-body">*/}
                        <h5>  {this.props.supplier.reducer1.sales_var_year_lfl} </h5>
                        <h4> YOY LFL </h4>
                        {/*</div>*/}
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>
              <div className="col-xs-6 panel-body" style={{backgroundColor: "white"}}>
                <Panel>
                  <h4 className="pageModuleMainTitle"> Contribution to Growth </h4>

                  <div className="row">
                    <div className="col-xs-6">
                    </div>
                    <div className="col-xs-6">
                    </div>
                  </div>
                  <div className="row">
                    {/*<div className="panel-body">*/}
                    <div className="col-xs-4">
                      {/*<div className="panel-body">*/}
                      <div>

                      </div>
                      <h5> {this.props.supplier.reducer1.sales_growth_wow_1}
                        of {this.props.supplier.reducer1.sales_growth_wow_2} </h5>
                      <h4>WoW</h4>
                      {/*</div>*/}
                    </div>
                    <div className="col-xs-4">
                      {/*<div className="panel-body">*/}

                      <h5> {this.props.supplier.reducer1.sales_growth_yoy_1}
                        of {this.props.supplier.reducer1.sales_growth_yoy_2} </h5>
                      <h4>YoY</h4>
                      {/*</div>*/}
                    </div>
                    <div className="col-xs-4">
                      {/*<div className="panel-body">*/}

                      <h5> {this.props.supplier.reducer1.sales_growth_yoy_lfl_1}
                        of {this.props.supplier.reducer1.sales_growth_yoy_lfl_2} </h5>
                      <h4>YoY LFL</h4>
                      {/*</div>*/}
                    </div>
                    {/*</div>*/}
                  </div>
                </Panel>
              </div>

            </div>

            <div className="row">
              <panel>
                <div className="col-xs-6 panel-body">
                  <h4 className="pageModuleMainTitle"> Supplier Importance to category</h4>
                  {(() => {
                    if (this.props.supplier.reducer1.supp_imp_cat_sales) {

                      return (
                        <GaugeChart2 data={[this.props.supplier.reducer1.supp_imp_cat_sales]} id="gauge1"/>
                      )
                    }
                  })()}

                </div>
                <div className="col-xs-6 panel-body">
                  <h4 className="pageModuleMainTitle"> Category Importance to Supplier </h4>
                  {(() => {
                    if (this.props.supplier.reducer1.cat_imp_supp_sales) {

                      return (
                        <GaugeChart2 data={[this.props.supplier.reducer1.cat_imp_supp_sales]} id="gauge2"/>
                      )
                    }
                  })()}
                  {/*<SampleBarChart/>*/}
                </div>
              </panel>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <Panel>
                  <div className="row">
                    <h3 className="text-center">Negotiation Opportunity</h3>
                    <Button onClick={() => {
                      let resetUrlParams = "reset_clicked";
                      {/*this.props.onResetClickParam(resetUrlParams);*/
                      }
                      {/*this.props.onFetchGraph();*/
                      }
                      {/*this.props.onGenerateTable();*/
                      }

                    }}>Reset Chart</Button>
                  </div>

                  <div className="row">
                    <div className="col-md-8">
                      {(() => {
                        if (this.props.supplier.tableData) {

                          return (
                            <BubbleChart2 data={[this.props.supplier.tableData.bubble_data]}/>
                          )
                        }
                      })()}

                      {/*path={this.props.location}*/}
                      {/*onSaveBubbleParam={this.props.onSaveBubbleParam}*/}
                      {/*onFetchGraph={this.props.onFetchGraph}*/}
                      {/*onGenerateTable={this.props.onGenerateTable}*/}

                    </div>

                    <div className="col-md-4">
                      <h4>
                        Please select a negotiation strategy below to filter
                        'Negotiation
                        Opportunity' chart and table
                      </h4>

                      <div className="panel panel-danger">
                        <div className="panel-heading">
                          <h5 className="panel-title" onClick={() => {
                            dataPerformanceUrlParams = "performance_quartile=Low CPS/Low Profit";
                            {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/
                            }
                            {/*this.props.onFetchGraph();*/
                            }
                            {/*this.props.onGenerateTable();*/
                            }

                          }}>Low CPS/Low Profit</h5>
                        </div>
                        <div className="panel-body">
                          Delist Products
                        </div>
                      </div>

                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h5 className="panel-title" onClick={() => {
                            dataPerformanceUrlParams = "performance_quartile=Low CPS/High Profit";
                            {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/
                            }
                            {/*this.props.onFetchGraph();*/
                            }
                          }}>Low CPS/High Profit</h5>
                        </div>
                        <div className="panel-body">
                          Hard
                          Bargaining’
                          for stronger
                          profits – Low importance to customers
                        </div>
                      </div>
                      <div className="panel panel-warning">
                        <div className="panel-heading">
                          <h5 className="panel-title" onClick={() => {
                            dataPerformanceUrlParams = "performance_quartile=Med CPS/Med Profit"
                            {/*this.props.onFetchGraph();*/
                            }

                            {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/
                            }
                            {/*this.props.onGenerateTable();*/
                            }
                          }}>Med CPS/Med Profit</h5>
                        </div>
                        <div className="panel-body">Area of
                          opportunity. Concession
                          trading – Subs/Ranging/Price. Reduce range to drive
                          volume
                        </div>
                      </div>

                      <div className="panel panel-success">
                        <div className="panel-heading">
                          <h5 className="panel-title" onClick={() => {
                            dataPerformanceUrlParams = "performance_quartile=High CPS/High Profit"
                            {/*this.props.onFetchGraph();*/
                            }
                            {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/
                            }
                            {/*this.props.onGenerateTable();*/
                            }
                          }}>High CPS/High Profit</h5>
                        </div>
                        <div className="panel-body">Build
                          Win-Win
                          relationship with
                          supplier to share further profit gains
                        </div>
                      </div>
                      <div className="panel panel-info">
                        <div className="panel-heading">
                          <h5 className="panel-title" onClick={() => {
                            dataPerformanceUrlParams = "performance_quartile=High CPS/Low Profit"
                            {/*this.props.onFetchGraph();*/
                            }
                            {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/
                            }
                            {/*this.props.onGenerateTable();*/
                            }
                          }}>High CPS/Low Profit</h5>
                        </div>
                        <div className="panel-body">Work
                          collaboratively to jointly
                          solve low profitability
                        </div>
                      </div>

                    </div>
                  </div>
                </Panel>
              </div>
            </div>


            <Panel>
              <div>
                <table className="table table-hover">
                  <div className="col-xs-12 col-xs-5">

                  </div>
                  <thead style={{fontWeight: '700', textAlign: 'center'}}>

                  <th>Product</th>
                  <th>Parent Supplier</th>
                  <th>CPS Score</th>
                  <th>PPS</th>
                  <th>Sales TY</th>
                  <th>Volume TY</th>
                  <th>CGM TY</th>
                  <th>Rate Of Sale</th>

                  </thead>
                  <tbody>
                  {
                    (() => {
                      if (this.props.supplier.tableData) {


                        let a = this.props.supplier.tableData.table_data;
                        return a.map(obj => {
                          return (
                            <tr>
                              <td>{obj.product_id}</td>
                              <td>{obj.parent_supplier}</td>
                              <td>{obj.cps_score}</td>
                              <td>{obj.pps}</td>
                              <td>{obj.sales_ty}</td>
                              <td>{obj.volume_ty}</td>
                              <td>{obj.cgm_ty}</td>
                              <td>{obj.rate_of_sale}</td>
                            </tr>
                          )
                        })
                      }
                    })()
                  }


                  </tbody>
                </table>

                {/*pagination*/}
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-lg">

                  </ul>
                </nav>
              </div>

            </Panel>

            <div className="row">
              <div>
                <Nav bsStyle="tabs" activeKey={this.state.activeKey3} onSelect={this.handleSelect}>
                  <NavItem eventKey="1" onClick={() => {
                    this.setState({activeKey3: "1"});
                    TopBottomKpi = "top_bottom_kpi=part_by_val";
                    this.props.onSaveTopBottomKpi(TopBottomKpi);
                    this.props.ontopBottomChart();
                  }} style={{fontSize: '20px', fontFamily: 'Tesco'}}>
                    <b>Participation by value</b></NavItem>

                  <NavItem eventKey="2" onClick={() => {
                    this.setState({activeKey3: "2"});
                    TopBottomKpi = "top_bottom_kpi=value_growth";
                    this.props.onSaveTopBottomKpi(TopBottomKpi);
                    this.props.ontopBottomChart();
                  }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Value Growth</b></NavItem>

                  <NavItem eventKey="3" onClick={() => {
                    this.setState({activeKey3: "3"});
                    TopBottomKpi = "top_bottom_kpi=value_contribution";
                    this.props.onSaveTopBottomKpi(TopBottomKpi);
                    this.props.ontopBottomChart();
                  }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Contribution to Growth</b></NavItem>
                </Nav>
              </div>
              <panel>
                <div className="col-xs-6 panel-body">
                  <h4 className="pageModuleMainTitle"> Top Suppliers</h4>
                  {(() => {
                    if (this.props.supplier.topBotData) {


                      return (
                        <SampleBarChart data={[this.props.supplier.topBotData.top_chart]} id="suppliertopchart"/>
                      )
                    }
                  })()}

                </div>
                <div className="col-xs-6 panel-body">
                  <h4 className="pageModuleMainTitle"> Bottom Suppliers </h4>
                  {(() => {
                    if (this.props.supplier.topBotData) {

                      return (
                        <SampleBarChart data={[this.props.supplier.topBotData.bottom_chart]} id="supplierbotchart"/>
                      )
                    }
                  })()}
                  {/*<SampleBarChart/>*/}
                </div>
              </panel>
            </div>

          </div>

        </div>
      </div>


    );
  }
}

Supplier.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  supplier: makeSelectSupplier(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onKPIBox: (e) => {
      return dispatch(kpibox(e));
    },
    onGetFilter: (e) => dispatch(getWeekFilter(e)),
    onSupplierTable: (e) => {
      return dispatch(supplierTable(e));
    },
    ontopBottomChart: (e) => {
      return dispatch(topBottomChart(e));
    },
    onSaveWeekParam: (e) => {
      return dispatch(SaveWeekParam(e));
    },
    onSaveKPIParam: (e) => {
      return dispatch(SaveKPIParam(e));
    },
    onKPIBoxASP: (e) => {
      return dispatch(kpibox_asp(e));
    },
    onSaveTopBottomKpi: (e) => {
      return dispatch(SaveTopBottomParam(e));
    },

    onCheckboxWeekChange: (e) => dispatch(checkboxWeekChange(e)),
    onSaveWeek: (e) => dispatch(SaveWeek(e)),

    //FOR GETTING FILTERS DATA
    onGenerateUrlParamsString: (e) => {
      return dispatch(GenerateUrlParamsString(e));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
