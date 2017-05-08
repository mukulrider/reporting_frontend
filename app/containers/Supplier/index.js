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
import {NavItem, Pagination} from 'react-bootstrap';
import InputField from 'components/input_field';
import FiltersSupplier from 'components/FiltersSupplier';
import RadioButton from 'components/radio_button';
import Checkbox from 'components/checkbox';
import Spinner from 'components/spinner';
import {
  kpibox,
  topBottomChart,
  SaveWeekParam,
  SaveKPIParam,
  kpibox_asp,
  SaveTopBottomParam,
  checkboxWeekChange,
  SaveWeek,
  GenerateUrlParamsString,
  getWeekFilter,
  SaveStoreParam,
  generateTable,
  fetchGraph,
  SavePFilterParam,
  SaveBubbleParam,
  SaveBubbleParam2,
  SavePageParam,
  RadioChecked,
  generateTextBoxQueryString,
  generateCheckedList,
  supplierViewKpiSpinnerCheckSuccess,
  bubbleChartSpinnerCheckSuccess,
  barChartSpinnerCheckSuccess,
  tableChartSpinnerCheckSuccess,

} from './actions';
import styles from './style.scss';

export class Supplier extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    this.props.supplierViewKpiSpinnerCheckSuccess(0);
    this.props.onGenerateUrlParamsString();
    this.props.onGetFilter();
    this.props.onKPIBox();
    this.props.ontopBottomChart();
    this.props.onKPIBoxASP();
    this.props.onSaveTopBottomKpi();

    //For table
    this.props.onGenerateTable();
    //For Bubble Graph
    this.props.onFetchGraph();
    // this.props.supplier.reducer1.sales;
  };


  constructor(props) {
    super(props);
    this.state = {
      smShow: false,
      lgShow: false,
      supplierImpactInfo: false,
      salesImpactVolumeInfo: false,
      profitImpactInfo: false,
      profitImpactCtsInfo: false,
      spplierImpactTableInfo: false,
      delistImpactTableInfo: false,
      activeKey1: "1",
      activeKey2: "1",
      activeKey3: "1",
      activeKey4: "1",
    };
  }

  inputUpdate = (checked, base_product_number) => {
    console.log('inputupdate', base_product_number);
    this.props.onGenerateCheckedList(checked, base_product_number)
  };

  tableProductUpdate = (checked, base_product_number) => {
    console.log("printing the product selected", base_product_number);
    let deselectBub = [];
    let deselectBubFlag = 0;

    //This will be used to change the opacity in bubble chart
    let tableArrray = this.props.supplier.prodArrayOpacity;
    tableArrray = JSON.parse(tableArrray);

    for (let i = 0; i < tableArrray.length; i++) {
      if (tableArrray[i] !== base_product_number) {
        deselectBub.push(tableArrray[i]);
      }
      else {
        deselectBubFlag = 1;
      }
    }

    if (deselectBubFlag === 0) {
      deselectBub.push(base_product_number);
    }

    let tableJSON = JSON.stringify(deselectBub);
    this.props.onSaveBubbleParam2(tableJSON);
    this.props.onGenerateCheckedList(checked, base_product_number)
  };

  render() {

    {
      console.log('this.propss', this.props)
    }
    let dataWeekUrlParams = this.props.supplier.week_param;
    let kpiParams = this.props.supplier.kpi_param;
    let TopBottomKpi = this.props.supplier.top_bottom_kpi;
    let dataPerformanceUrlParams = this.props.supplier.dataPerformanceUrlParams;
    let dataStoreUrlParams = this.props.supplier.dataStoreUrlParams;


    return (
      <div>

        <Helmet
          title="Supplier View"
          meta={[
            {name: 'description', content: 'Description of Supplier View'},
          ]}
        />

        {/*Page title*/}
        <div className="pageTitle" style={{width: '78%', float: 'right'}}>SUPPLIER VIEW</div>

        {(() => {
          if (this.props.supplier.supplierViewKpiSpinner != 1 && this.props.supplier.supplierViewKpiSpinner == 11) {
            return (
              <div className="row spinnerPosition"><Spinner /><h2>Please Wait a Moment....!</h2></div>
            )
          } else {
            return (

              <div className="row" style={{
                marginLeft: '0px',
                marginRight: '0px'
              }}>

                <div style={{
                  height: '100%',
                  position: 'fixed',
                  width: '20%',
                  /* padding-right: 5px; */
                  overflowX: 'hidden',
                  overflowY: 'scroll',
                  borderTop: '1px solid #ccc'
                }}>

                  {(() => {
                    if (this.props.supplier.sideFilter) {
                      return (
                        <FiltersSupplier sideFilter={this.props.supplier.sideFilter}
                                         location={this.props.location}
                          // onDataUrlParams={this.props.DataUrlParams}
                          // onUrlParamsData={this.props.onUrlParamsData}
                                         onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                                         week_data={this.props.supplier.week_filter_data}
                                         onKPIBox={ this.props.onKPIBox}
                                         ontopBottomChart={  this.props.ontopBottomChart}
                                         onKPIBoxASP={  this.props.onKPIBoxASP}
                                         onSaveWeek={this.props.onSaveWeek}
                                         onCheckboxWeekChange={this.props.onCheckboxWeekChange}
                                         onGetFilter={this.props.onGetFilter}
                                         onGenerateTable={this.props.onGenerateTable}
                                         onFetchGraph={this.props.onFetchGraph}

                                         barChartSpinnerCheck={this.props.barChartSpinnerCheckSuccess}
                                         bubbleChartSpinnerCheck={this.props.bubbleChartSpinnerCheckSuccess}
                                         tableChartSpinnerCheck={this.props.tableChartSpinnerCheckSuccess}
                                         supplierViewKpiSpinnerCheck={this.props.supplierViewKpiSpinnerCheckSuccess}


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

                <div style={{
                  width: '78%',
                  marginLeft: '22%'
                }}>
                  <div className="row" style={{marginLeft: "0.5%", paddingTop: "-5px"}}>

                    <div className="col-md-12 content-wrap">

                      <Nav bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect}
                           className="tabsCustom">
                        <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                          this.setState({activeKey1: "1"});
                          this.props.supplierViewKpiSpinnerCheckSuccess(0);
                          this.props.barChartSpinnerCheckSuccess(0);
                          this.props.bubbleChartSpinnerCheckSuccess(0);
                          this.props.tableChartSpinnerCheckSuccess(0);
                          dataWeekUrlParams = "week_flag=1";
                          this.props.onSaveWeekParam(dataWeekUrlParams);
                          this.props.onKPIBox();
                          {/*this.props.onSupplierTable();*/
                          }
                          this.props.onFetchGraph();
                          this.props.onGenerateTable();
                          this.props.ontopBottomChart();

                        }}>
                          <span className="tab_label">Current Week</span></NavItem>

                        <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                          this.setState({activeKey1: "2"});
                          this.props.supplierViewKpiSpinnerCheckSuccess(0);
                          this.props.barChartSpinnerCheckSuccess(0);
                          this.props.bubbleChartSpinnerCheckSuccess(0);
                          this.props.tableChartSpinnerCheckSuccess(0);
                          dataWeekUrlParams = "week_flag=2";
                          this.props.onSaveWeekParam(dataWeekUrlParams);
                          this.props.onKPIBox();
                          {/*this.props.onSupplierTable();*/
                          }
                          this.props.onFetchGraph();
                          this.props.onGenerateTable();
                          this.props.ontopBottomChart();

                        }}><span className="tab_label">Last 4 Week</span></NavItem>

                        <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                          this.setState({activeKey1: "3"});
                          this.props.supplierViewKpiSpinnerCheckSuccess(0);
                          this.props.barChartSpinnerCheckSuccess(0);
                          this.props.bubbleChartSpinnerCheckSuccess(0);
                          this.props.tableChartSpinnerCheckSuccess(0);
                          dataWeekUrlParams = "week_flag=3";
                          this.props.onSaveWeekParam(dataWeekUrlParams);
                          this.props.onKPIBox();
                          {/*this.props.onSupplierTable();*/
                          }
                          this.props.onFetchGraph();
                          this.props.onGenerateTable();
                          this.props.ontopBottomChart();

                        }}><span className="tab_label">Last 13 weeks</span></NavItem>
                        <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                          this.setState({activeKey1: "4"});
                          this.props.supplierViewKpiSpinnerCheckSuccess(0);
                          this.props.barChartSpinnerCheckSuccess(0);
                          this.props.bubbleChartSpinnerCheckSuccess(0);
                          this.props.tableChartSpinnerCheckSuccess(0);
                          dataWeekUrlParams = "week_flag=4";
                          this.props.onSaveWeekParam(dataWeekUrlParams);
                          this.props.onKPIBox();
                          {/*this.props.onSupplierTable();*/
                          }
                          this.props.onFetchGraph();
                          this.props.onGenerateTable();
                          this.props.ontopBottomChart();

                        }}><span className="tab_label">Lasst 52 weeks</span></NavItem>

                        <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                          this.setState({activeKey1: "5"});
                          this.props.supplierViewKpiSpinnerCheckSuccess(0);
                          this.props.barChartSpinnerCheckSuccess(0);
                          this.props.bubbleChartSpinnerCheckSuccess(0);
                          this.props.tableChartSpinnerCheckSuccess(0);
                          dataWeekUrlParams = "week_flag=5";
                          this.props.onSaveWeekParam(dataWeekUrlParams);
                          this.props.onKPIBox();
                          {/*this.props.onSupplierTable();*/
                          }
                          this.props.onFetchGraph();
                          this.props.onGenerateTable();
                          this.props.ontopBottomChart();

                        }}><span className="tab_label">YTD</span></NavItem>
                      </Nav>

                      <div style={{height: '0px', width: '100%'}}>&nbsp;
                        <Nav bsStyle="tabs" activeKey={this.state.activeKey2} onSelect={this.handleSelect}
                             className="tabsCustom">
                          <NavItem eventKey="1" className="tabsCustomList" onClick={() => {
                            this.setState({activeKey2: "1"});
                            this.props.supplierViewKpiSpinnerCheckSuccess(0);
                            this.props.barChartSpinnerCheckSuccess(0);
                            kpiParams = "kpi_type=Value";
                            this.props.onSaveKPIParam(kpiParams);
                            this.props.onKPIBox();
                            this.props.ontopBottomChart();
                          }}><span className="tab_label">Value</span>
                          </NavItem>

                          <NavItem eventKey="2" className="tabsCustomList" onClick={() => {
                            this.setState({activeKey2: "2"});
                            this.props.supplierViewKpiSpinnerCheckSuccess(0);
                            this.props.barChartSpinnerCheckSuccess(0);
                            kpiParams = "kpi_type=Volume";
                            this.props.onSaveKPIParam(kpiParams);
                            this.props.onKPIBox();
                            this.props.ontopBottomChart();
                          }}><span className="tab_label">Volume</span></NavItem>

                          <NavItem eventKey="3" className="tabsCustomList" onClick={() => {
                            this.setState({activeKey2: "3"});
                            this.props.supplierViewKpiSpinnerCheckSuccess(0);
                            this.props.barChartSpinnerCheckSuccess(0);
                            kpiParams = "kpi_type=COGS";
                            this.props.onSaveKPIParam(kpiParams);
                            this.props.onKPIBox();
                            this.props.ontopBottomChart();
                          }}><span className="tab_label">COGS</span></NavItem>

                          <NavItem eventKey="4" className="tabsCustomList" onClick={() => {
                            this.setState({activeKey2: "4"});
                            this.props.supplierViewKpiSpinnerCheckSuccess(0);
                            this.props.barChartSpinnerCheckSuccess(0);
                            kpiParams = "kpi_type=CGM";
                            this.props.onSaveKPIParam(kpiParams);
                            this.props.onKPIBox();
                            this.props.ontopBottomChart();
                          }}><span className="tab_label">CGM</span></NavItem>

                          <NavItem eventKey="5" className="tabsCustomList" onClick={() => {
                            this.setState({activeKey2: "5"});
                            this.props.supplierViewKpiSpinnerCheckSuccess(0);
                            this.props.barChartSpinnerCheckSuccess(0);
                            kpiParams = "kpi_type=ASP";
                            this.props.onSaveKPIParam(kpiParams);
                            this.props.onKPIBox();
                            this.props.ontopBottomChart();
                          }}><span className="tab_label">ASP</span></NavItem>

                          <NavItem eventKey="6" className="tabsCustomList" onClick={() => {
                            this.setState({activeKey2: "6"});
                            this.props.supplierViewKpiSpinnerCheckSuccess(0);
                            this.props.barChartSpinnerCheckSuccess(0);
                            kpiParams = "kpi_type=Supp_Fund";
                            this.props.onSaveKPIParam(kpiParams);
                            this.props.onKPIBox();
                            this.props.ontopBottomChart();
                          }}><span className="tab_label">Supplier Funding(exc VAT)</span></NavItem>

                          <NavItem eventKey="7" className="tabsCustomList" onClick={() => {
                            this.setState({activeKey2: "7"});
                            this.props.supplierViewKpiSpinnerCheckSuccess(0);
                            this.props.barChartSpinnerCheckSuccess(0);
                            kpiParams = "kpi_type=SKU";
                            this.props.onSaveKPIParam(kpiParams);
                            this.props.onKPIBox();
                            this.props.ontopBottomChart();
                          }}><span className="tab_label">SKUs</span></NavItem>

                        </Nav>
                      </div>

                      <div className="row">
                        {(() => {
                          if (this.props.supplier.supplierViewKpiSpinner != 1) {
                            return (
                              <div className="row spinnerPosition spinnerPositionFix"><Spinner /><h2>Please Wait a Moment....!</h2></div>
                            )
                          } else {
                            return (
                              <div>
                                <div className="row" style={{textAlign: 'center'}}>
                                  <div className="col-xs-6" style={{
                                    textAlign: 'center',
                                    backgroundColor: "white",
                                    margin: "0%",
                                    width: '41.7%',
                                    marginBottom: '4%',
                                    marginTop: '3%',
                                    borderLeft: "1px solid #e5e8ea",
                                    borderTop: "1px solid #e5e8ea",
                                    borderRight: "1px solid #e5e8ea",
                                    borderBottom: "1px solid #e5e8ea"
                                  }}>
                                    <Panel>
                                      <h4 className="pageModuleMainTitle"> Total Sales </h4>

                                      <div className="col-xs-6">

                                        <h4
                                          className="panel-heading tesco-heading">  {this.props.supplier.reducer1.sales} </h4>
                                      </div>
                                      <div className="col-xs-6">
                                        <h4 className="panel-heading tesco-heading">
                                          LFL: {this.props.supplier.reducer1.sales_lfl} </h4>
                                      </div>
                                      <div className="row">
                                        <div className="panel-body">
                                          <div className="col-xs-4">
                                            {/*<div className="panel-body">*/}
                                            <h4> {this.props.supplier.reducer1.sales_var_week}  </h4>

                                            <h4><b> {'WoW'} </b></h4>

                                            {/*</div>*/}
                                          </div>
                                          <div className="col-xs-4">
                                            {/*<div className="panel-body">*/}
                                            <h4> {this.props.supplier.reducer1.sales_var_year} % </h4>
                                            <h4><b> {'LFL'} </b></h4>

                                            {/*</div>*/}
                                          </div>
                                          <div className="col-xs-4">
                                            {/*<div className="panel-body">*/}
                                            <h4>  {this.props.supplier.reducer1.sales_var_year_lfl} % </h4>
                                            <h4><b>{'YOY LFL'}</b></h4>
                                            {/*</div>*/}
                                          </div>
                                        </div>
                                      </div>

                                    </Panel>

                                  </div>

                                  <div className="col-xs-6 marginClass" style={{
                                    textAlign: 'center',
                                    borderTop: "1px solid #e5e8ea",
                                    marginTop: '3%',
                                    float: 'right',
                                    backgroundColor: "white",
                                    margin: "0%",
                                    borderLeft: "1px solid #e5e8ea",
                                    borderRight: "1px solid #e5e8ea",
                                    borderBottom: "1px solid #e5e8ea"
                                  }}>
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
                                          <h4> {this.props.supplier.reducer1.sales_growth_wow_1}
                                            of {this.props.supplier.reducer1.sales_growth_wow_2}  </h4>
                                          <h4><b>{'WoW'}</b></h4>
                                          {/*</div>*/}
                                        </div>
                                        <div className="col-xs-4">
                                          {/*<div className="panel-body">*/}

                                          <h4> {this.props.supplier.reducer1.sales_growth_yoy_1} %
                                            of {this.props.supplier.reducer1.sales_growth_yoy_2} % </h4>
                                          <h4><b>{'YoY'}</b></h4>
                                          {/*</div>*/}
                                        </div>
                                        <div className="col-xs-4">
                                          {/*<div className="panel-body">*/}

                                          <h4> {this.props.supplier.reducer1.sales_growth_yoy_lfl_1} %
                                            of {this.props.supplier.reducer1.sales_growth_yoy_lfl_2} % </h4>
                                          <h4><b>{'YoY LFL'}</b></h4>
                                          {/*</div>*/}
                                        </div>
                                        {/*</div>*/}
                                      </div>
                                    </Panel>
                                  </div>


                                </div>
                                <panel>
                                  <div className="col-xs-5 panel-body" style={{
                                    textAlign: 'center',
                                    borderTop: "1px solid #e5e8ea",
                                    backgroundColor: "white",
                                    margin: "0%",
                                    borderLeft: "1px solid #e5e8ea",
                                    borderRight: "1px solid #e5e8ea",
                                    borderBottom: "1px solid #e5e8ea"
                                  }}>
                                    <h4 className="pageModuleMainTitle"> Supplier Importance to category</h4>
                                    {(() => {
                                      if (this.props.supplier.reducer1.supp_imp_cat_sales) {

                                        return (
                                          <div style={{float: "right"}}>
                                            <GaugeChart2 data={[this.props.supplier.reducer1.supp_imp_cat_sales]}
                                                         id="gauge1"/>
                                          </div>
                                        )
                                      }
                                    })()}

                                  </div>
                                  <div className="col-xs-5 panel-body leftPosition" style={{
                                    textAlign: 'center',
                                    left: '-3%',
                                    width: '51%',
                                    borderTop: "1px solid #e5e8ea",
                                    left: '-8%',
                                    float: 'right',
                                    backgroundColor: "white",
                                    margin: "0%",
                                    borderLeft: "1px solid #e5e8ea",
                                    borderRight: "1px solid #e5e8ea",
                                    borderBottom: "1px solid #e5e8ea"
                                  }}>
                                    <h4 className="pageModuleMainTitle"> Category Importance to Supplier </h4>
                                    {(() => {
                                      if (this.props.supplier.reducer1.cat_imp_supp_sales) {

                                        return (
                                          <GaugeChart2 data={[this.props.supplier.reducer1.cat_imp_supp_sales]}
                                                       id="gauge2"/>
                                        )
                                      }
                                    })()}
                                    {/*<SampleBarChart/>*/}
                                  </div>
                                </panel>
                              </div>
                            )
                          }
                        })()}

                      </div>

                      <div style={{height: '15%', width: '100%'}}>&nbsp;</div>

                      <div className="row">
                        <div>
                          <Nav bsStyle="tabs" activeKey={this.state.activeKey3} onSelect={this.handleSelect}>
                            <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                              this.setState({activeKey3: "1"});
                              this.props.barChartSpinnerCheckSuccess(0);
                              TopBottomKpi = "top_bottom_kpi=part_by_val";
                              this.props.onSaveTopBottomKpi(TopBottomKpi);
                              this.props.ontopBottomChart();
                            }}><span className="tab_label">Participation by value</span>
                            </NavItem>

                            <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                              this.setState({activeKey3: "2"});
                              this.props.barChartSpinnerCheckSuccess(0);
                              TopBottomKpi = "top_bottom_kpi=value_growth";
                              this.props.onSaveTopBottomKpi(TopBottomKpi);
                              this.props.ontopBottomChart();
                            }}><span className="tab_label">Value Growth</span></NavItem>

                            <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                              this.setState({activeKey3: "3"});
                              this.props.barChartSpinnerCheckSuccess(0);
                              TopBottomKpi = "top_bottom_kpi=value_contribution";
                              this.props.onSaveTopBottomKpi(TopBottomKpi);
                              this.props.ontopBottomChart();
                            }}><span className="tab_label">Contribution to Growth</span></NavItem>
                          </Nav>
                        </div>


                        <panel>
                          <div className="col-xs-5 panel-body">
                            <h4 className="pageModuleMainTitle"> Top Suppliers</h4>
                            {(() => {
                              if (this.props.supplier.topBotData && this.props.supplier.barChartSpinnerCheck != 0) {

                                return (
                                  <div style={{border: '1px solid #e5e8ea'}}>
                                  <SampleBarChart data={[this.props.supplier.topBotData.top_chart]}
                                                  id="suppliertopchart"/>
                                  </div>
                                )
                              } else {
                                return (
                                  <div className="row spinnerPositionBarChart"><Spinner /><h2>Please Wait a
                                    Moment....!</h2></div>
                                )
                              }
                            })()}

                          </div>
                          <div className="col-xs-6 panel-body bottomSupplierFix">
                            <h4 className="pageModuleMainTitle"> Bottom Suppliers </h4>
                            {(() => {
                              if (this.props.supplier.topBotData && this.props.supplier.barChartSpinnerCheck != 0) {

                                return (
                                  <div style={{border: '1px solid #e5e8ea'}}>
                                  <SampleBarChart data={[this.props.supplier.topBotData.bottom_chart]}
                                                  id="supplierbotchart"/>
                                  </div>
                                )
                              } else {
                                return (
                                  <div className="row spinnerPositionBarChart"><Spinner /><h2>Please Wait a
                                    Moment....!</h2></div>
                                )
                              }
                            })()}
                            {/*<SampleBarChart/>*/}
                          </div>
                        </panel>

                      </div>

                      <div className="row" style={{marginLeft: "0px", marginRight: "0px"}}>
                        <div className="col-md-12 content-wrap">
                          <Nav bsStyle="tabs" className="tabsCustom" activeKey={this.state.activeKey4}
                               onSelect={this.handleSelect}>
                            <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                              this.setState({activeKey4: "1"});
                              this.props.bubbleChartSpinnerCheckSuccess(0);
                              this.props.tableChartSpinnerCheckSuccess(0);
                              dataStoreUrlParams = "store_type=Main Estate";
                              this.props.onSaveStoreParam(dataStoreUrlParams);
                              this.props.onFetchGraph();
                              this.props.onGenerateTable();
                            }}><span className="tab_label">Main Estate</span></NavItem>
                            <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                              this.setState({activeKey4: "2"});
                              this.props.bubbleChartSpinnerCheckSuccess(0);
                              this.props.tableChartSpinnerCheckSuccess(0);
                              dataStoreUrlParams = "store_type=Express";
                              this.props.onSaveStoreParam(dataStoreUrlParams);
                              this.props.onFetchGraph();
                              this.props.onGenerateTable();
                              // browserHistory.push(this.props.location.pathname + "?store_type=Express")
                            }}><span className="tab_label">Express</span></NavItem>


                          </Nav>
                        </div>


                        <div className="row">
                          {(() => {
                            if (this.props.supplier.bubbleChartSpinnerCheck != 1) {
                              return (
                                <div className="col-xs-12 col-md-8 spinnerPositionWaterfall"><Spinner /><h2>Please Wait
                                  a
                                  Moment....!</h2></div>
                              )
                            } else {
                              return (

                                <div className="col-xs-12 col-md-8" style={{marginTop: '2%'}}>

                                  <BubbleChart2 data={this.props.supplier.chartData}

                                    //Passing array which updates table
                                                selectedBubbleTable={this.props.supplier.prodArrayTable}
                                    //Passing array which updates opacity
                                                selectedBubbleOpacity={this.props.supplier.prodArrayOpacity}

                                    //Ajax calls to save prodArrayTable in state
                                                onSaveBubbleParam={this.props.onSaveBubbleParam}

                                    //Ajax calls to save prodArrayOpacity in state
                                                onSaveBubbleParam2={this.props.onSaveBubbleParam2}

                                    //To update graph and table
                                                onFetchGraph={this.props.onFetchGraph}
                                                onGenerateTable={this.props.onGenerateTable}
                                  />

                                  <i style={{fontSize: '12px'}}>*Size of the bubble corresponds to Rate of Sales</i>

                                  <div className="resetButton" onClick={() => {
                                    dataPerformanceUrlParams = '';
                                    this.props.onSavePageParam("page=1");
                                    this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                    this.props.onFetchGraph();
                                    this.props.onGenerateTable();
                                    this.props.onRadioChecked('6');
                                  }}><p>View Selections</p></div>

                                </div>
                              )
                            }
                          })()}

                          <div className="col-xs-12 col-md-4" style={{marginTop: '2%', fontSize: '14px'}}>

                            <h4>
                              Please select a negotiation strategy below to filter
                              'Negotiation
                              Opportunity' chart and table
                            </h4>

                            <div className="panel">
                              <div className="lowProfit"
                                   style={{height: '35px', backgroundColor: '#c74a52', opacity: '0.8'}}>
                                <RadioButton id={'1'}
                                             checked={(() => {
                                               if (this.props.supplier.radioChecked === '1') {
                                                 return true
                                               }
                                               else {
                                                 return false
                                               }
                                             })()}
                                             label={'Low CPS/Low Profit'}
                                             valid={true}
                                             onChange={() => {
                                               this.props.bubbleChartSpinnerCheckSuccess(0);
                                               this.props.tableChartSpinnerCheckSuccess(0);
                                               dataPerformanceUrlParams = "performance_quartile=Low CPS/Low Profit";
                                               this.props.onSavePFilterParam(dataPerformanceUrlParams);

                                               this.props.onFetchGraph();
                                               this.props.onGenerateTable();
                                               this.props.onRadioChecked('1');
                                             }}
                                             name="x"
                                />
                              </div>
                              <div className="panel-body" style={{marginTop: '2%'}}>
                                Delist Products
                              </div>
                            </div>
                            <div className="panel panel-default">
                              <div className="default"
                                   style={{
                                     height: '35px',
                                     backgroundColor: '#6e6767',
                                     opacity: '0.8',
                                     fontColor: 'white'
                                   }}>
                                <RadioButton id={'2'}
                                             checked={(() => {
                                               if (this.props.supplier.radioChecked == '2') {
                                                 return true
                                               }
                                               else {
                                                 return false
                                               }
                                             })()}

                                             label={'Low CPS/High Profit'}
                                             valid={true}
                                             onChange={() => {
                                               this.props.bubbleChartSpinnerCheckSuccess(0);
                                               this.props.tableChartSpinnerCheckSuccess(0);
                                               dataPerformanceUrlParams = "performance_quartile=Low CPS/High Profit";
                                               this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                               this.props.onFetchGraph();
                                               this.props.onGenerateTable();
                                               this.props.onRadioChecked('2');

                                             }}
                                             name="x"
                                />
                              </div>
                              <div className="panel-body" style={{height: '65px', marginTop: '3%'}}>
                                Hard
                                Bargaining’
                                for stronger
                                profits – Low importance to customers
                              </div>
                            </div>


                            <div className="panel panel-warning">
                              <div className="medProfit"
                                   style={{
                                     height: '35px',
                                     backgroundColor: '#ffa626',
                                     opacity: '0.8',
                                     fontColor: 'white'
                                   }}>
                                <RadioButton id={'3'}
                                             label={'Med CPS/Med Profit'}
                                             valid={true}
                                             checked={(() => {
                                               if (this.props.supplier.radioChecked == '3') {
                                                 return true
                                               }
                                               else {
                                                 return false
                                               }
                                             })()}
                                             onChange={() => {
                                               this.props.bubbleChartSpinnerCheckSuccess(0);
                                               this.props.tableChartSpinnerCheckSuccess(0);
                                               dataPerformanceUrlParams = "performance_quartile=Med CPS/Med Profit";
                                               this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                               this.props.onFetchGraph();
                                               this.props.onGenerateTable();
                                               this.props.onRadioChecked('3');

                                             }}
                                             name="x"
                                />
                              </div>
                              <div className="panel-body" style={{height: '60px', marginTop: '3%'}}>Area of
                                opportunity. Concession
                                trading – Subs/Ranging/Price. Reduce range to drive
                                volume
                              </div>
                            </div>

                            <div className="panel panel-success">
                              <div className="highProfit"
                                   style={{
                                     height: '35px',
                                     backgroundColor: '#69b24a',
                                     opacity: '0.8',
                                     fontColor: 'white'
                                   }}>
                                <RadioButton id={'4'}
                                             label={'High CPS/High Profit'}
                                             valid={true}
                                             checked={(() => {
                                               if (this.props.supplier.radioChecked == '4') {
                                                 return true
                                               }
                                               else {
                                                 return false
                                               }
                                             })()}
                                             onChange={() => {
                                               this.props.bubbleChartSpinnerCheckSuccess(0);
                                               this.props.tableChartSpinnerCheckSuccess(0);
                                               dataPerformanceUrlParams = "performance_quartile=High CPS/High Profit"
                                               this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                               this.props.onFetchGraph();
                                               this.props.onGenerateTable();
                                               this.props.onRadioChecked('4');

                                             }}
                                             name="x"
                                />
                              </div>
                              <div className="panel-body" style={{height: '50px', marginTop: '3%'}}>Build
                                Win-Win
                                relationship with
                                supplier to share further profit gains
                              </div>
                            </div>
                            <div className="panel">
                              <div className="highCps" style={{height: '35px', backgroundColor: '#99d9e5'}}>
                                <RadioButton id={'5'}
                                             label={'High CPS/Low Profit'}
                                             valid={true}
                                             checked={(() => {
                                               if (this.props.supplier.radioChecked == '5') {
                                                 return true
                                               }
                                               else {
                                                 return false
                                               }
                                             })()}
                                             onChange={() => {
                                               this.props.bubbleChartSpinnerCheckSuccess(0);
                                               this.props.tableChartSpinnerCheckSuccess(0);
                                               dataPerformanceUrlParams = "performance_quartile=High CPS/Low Profit"
                                               this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                               this.props.onFetchGraph();
                                               this.props.onGenerateTable();
                                               this.props.onRadioChecked('5');

                                             }}
                                             name="x"
                                />
                              </div>
                              <div className="panel-body" style={{marginTop: '5%'}}>Work
                                collaboratively to jointly
                                solve low profitability
                              </div>
                            </div>

                          </div>
                        </div>


                        <Panel>
                          <div>
                            {/*<div className="col-xs-12 col-xs-5" style={{marginBottom: "10px", marginLeft: "-14px"}}>*/}

                            {/*<InputField type={'string'}*/}
                            {/*placeholder="Search for Product Description ..."*/}
                            {/*dataPageUrlParams="page=1"*/}
                            {/*value={this.props.textBoxQueryString}*/}
                            {/*onChange={(e) => {*/}
                            {/*this.props.onGenerateTextBoxQueryString(e);*/}
                            {/*this.props.onGenerateTable();*/}
                            {/*this.props.onSavePageParam(dataPageUrlParams);*/}
                            {/*}}*/}
                            {/*/>*/}
                            {/*</div>*/}

                            <table className="table table-hover table-bordered" width="100%">

                              <thead style={{fontWeight: '700', fontSize: '12px', textAlign: 'center'}}>
                              <tr className="table-header-format">
                                {/*<th style={{textAlign: 'center'}}>Select</th>*/}
                                <th style={{textAlign: 'center'}}>Product ID</th>
                                <th style={{textAlign: 'center'}}>Parent Supplier</th>
                                <th style={{textAlign: 'center'}}>Sales TY</th>
                                <th style={{textAlign: 'center'}}>Volume TY</th>
                                <th style={{textAlign: 'center'}}>CGM TY</th>
                                <th style={{textAlign: 'center'}}>PPS</th>
                                <th style={{textAlign: 'center'}}>CPS</th>
                                <th style={{textAlign: 'center'}}>Rate of Sale</th>
                              </tr>
                              </thead>
                              <tbody className="table-body-format">

                              {(() => {

                                if (this.props.supplier.data && (this.props.supplier.tableChartSpinnerCheck == 1)) {
                                  console.log('this.props.supplier.data.table_data', this.props.supplier.data.table_data);
                                  return this.props.supplier.data.table_data.map(obj => {
                                    return (
                                      <tr key={Math.random() + Date.now()}>
                                        {/**/}
                                        {/*<td style={{textAlign: "center"}}>*/}
                                        {/*<Checkbox isDisabled={false} id={Math.random() + Date.now()}*/}
                                        {/*onChange={(e) => {*/}
                                        {/*this.inputUpdate(e.target.checked, obj.base_product_number)*/}
                                        {/*this.tableProductUpdate(e.target.checked, obj.base_product_number);*/}

                                        {/*}}*/}
                                        {/*checked={(() => {*/}
                                        {/*let checked = false;*/}
                                        {/*console.log('obj.base_product_number.toString()', obj.base_product_number.toString());*/}
                                        {/*let base_product_number = obj.base_product_number.toString();*/}
                                        {/*console.log('base_product_number', base_product_number);*/}
                                        {/*console.log('this.props.supplier.checkedList', this.props.supplier.checkedList);*/}
                                        {/*this.props.supplier.checkedList.map(obj2 => {*/}
                                        {/*if (obj2.checked) {*/}
                                        {/*if (obj2.productId == base_product_number) {*/}
                                        {/*checked = true*/}
                                        {/*}*/}
                                        {/*}*/}
                                        {/*});*/}
                                        {/*return checked*/}
                                        {/*})()}*/}
                                        {/*valid={true}/>*/}
                                        {/*</td>*/}
                                        <td style={{
                                          textAlign: 'center',
                                          verticalAlign: 'center'
                                        }}>{obj.base_product_number}</td>
                                        <td
                                          style={{
                                            textAlign: 'center',
                                            verticalAlign: 'center'
                                          }}>{obj.parent_supplier}</td>
                                        <td style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.sales_ty}</td>
                                        <td style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.volume_ty}</td>
                                        <td style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.cgm_ty}</td>
                                        <td style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.pps}</td>
                                        <td style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.cps}</td>
                                        <td
                                          style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.rate_of_sale}</td>
                                      </tr>
                                    )
                                  })
                                } else {
                                  return (
                                    <tr>
                                      <td className="text-center" colSpan="8"><Spinner />Please Wait a Moment....!</td>
                                    </tr>
                                  )
                                }

                              })()}

                              </tbody>
                            </table>

                            {/*pagination*/}

                            {(() => {
                              if (this.props.supplier.data && this.props.supplier.data.count) {

                                return <Pagination
                                  prev
                                  next
                                  first
                                  last
                                  ellipsis
                                  boundaryLinks
                                  items={this.props.supplier.data.num_pages}
                                  maxButtons={5}
                                  activePage={this.state.activePage}
                                  onSelect={(e) => {

                                    this.setState({activePage: e})

                                    let dataPageUrlParams = "page=" + e;
                                    {/*console.log("dataPageUrlParams",dataPageUrlParams)*/
                                    }
                                    this.props.onSavePageParam(dataPageUrlParams);
                                    this.props.onGenerateTable();

                                  }}
                                />

                              }
                            })()}

                          </div>

                        </Panel>


                      </div>

                    </div>
                  </div>
                </div>

              </div>

            )
          }
        })()}

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

        onGenerateTable: (e) => dispatch(generateTable(e)),
        supplierViewKpiSpinnerCheckSuccess: (e) => dispatch(supplierViewKpiSpinnerCheckSuccess(e)),

        supplierViewKpiSpinnerCheck: (e) => dispatch(supplierViewKpiSpinnerCheckSuccess(e)),
        bubbleChartSpinnerCheckSuccess: (e) => dispatch(bubbleChartSpinnerCheckSuccess(e)),

        bubbleChartSpinnerCheck: (e) => dispatch(bubbleChartSpinnerCheckSuccess(e)),
        tableChartSpinnerCheckSuccess: (e) => dispatch(tableChartSpinnerCheckSuccess(e)),

        tableChartSpinnerCheck: (e) => dispatch(tableChartSpinnerCheckSuccess(e)),
        barChartSpinnerCheckSuccess: (e) => dispatch(barChartSpinnerCheckSuccess(e)),

        barChartSpinnerCheck: (e) => dispatch(barChartSpinnerCheckSuccess(e)),

        onFetchGraph: (e) => dispatch(fetchGraph(e)),
        onSavePFilterParam: (e) => dispatch(SavePFilterParam(e)),
        onSaveBubbleParam: (e) => dispatch(SaveBubbleParam(e)),
        onSaveBubbleParam2: (e) => dispatch(SaveBubbleParam2(e)),
        onSavePageParam: (e) => dispatch(SavePageParam(e)),
        onRadioChecked: (e) => dispatch(RadioChecked(e)),
        onSaveStoreParam: (e) => dispatch(SaveStoreParam(e)),
        onGenerateTextBoxQueryString: (e) => dispatch(generateTextBoxQueryString(e.target.value)),

        onKPIBox: (e) => {
        return dispatch(kpibox(e));
      },
        onGetFilter: (e) => dispatch(getWeekFilter(e)),
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
      },
        onGenerateCheckedList: (a, b) => dispatch(generateCheckedList(a, b)),
      }
      }

        export default connect(mapStateToProps, mapDispatchToProps)(Supplier);

