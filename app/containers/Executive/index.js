/*
 *
 * Executive
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {Modal, Nav, NavItem, DropdownButton, MenuItem} from 'react-bootstrap';
import {saveImage, saveDataAsCSV} from './../../utils/exportFunctions';

import Panel from 'components/panel';
import './style.scss';
import {createStructuredSelector} from 'reselect';
import makeSelectExecutive from './selectors';
import Button from 'components/button';
//import ButtonSmall from 'components/ButtonSmall';
import messages from './messages';
import WaterFallChartExec from 'components/WaterFallChartExec'
//For Filter
import ExecFilter from 'components/ExecFilter';
import Breadcrumb from 'components/Breadcrumb';

// For KPIs and Charts
import MultilinePromo from 'components/MultilinePromo';
import TopFilter from 'components/TopFilter';
import ExecTopbotMultiline from 'components/ExecTopbotMultiline';
import GaugeExec from 'components/GaugeExec';
import BarChartSimple from 'components/BarChartSimple';
import StackedChart from 'components/StackedChart';
import Spinner from 'components/spinner';
import {
  OverviewKpiData,
  RolesAndIntentData,
  BudgetAndForecastData,
  OverviewKpiTrendData,
  OverviewDriversInternalData,
  OverviewDriversExternalData,
  KpiBoxesData,
  BestWorstData,
  BestInfoData,
  WorstInfoData,
  SupplierInfoData,
  TopSupplierInfoData,
  BotSupplierInfoData,
  DriversInternalData,
  DriversExternalData,
  PriceKPIData,
  SaveWeekParam,
  SaveKPIParam,
  getFilter,
  generateUrlParamsString,
  getWeekFilter,
  WeekFilterParam,
  StoreFilterParam,
  SaveDriverParam,
  //For top5/bot5 modal
  SaveFilteredFlag,
  SaveTopName,
  SaveBotName,
  SaveSupplierName,
  SaveTopBotFlag,
  SaveValueInternal,
  SaveValueExternal,
  spinnerRolesAndIntent,
  spinnerOverviewKPITrend,
  spinnerOverviewInternalDrivers,
  spinnerOverviewExternalDrivers,
  spinnerInternalDrivers,
  spinnerExternalDrivers,
  spinnerOverviewKPI,
  spinnerPriceKPI,
  spinnerKPI,
  generateBestWorstPerformance,
  defaultGreyScreen,
}
  from './actions.js'

import imgSunshine from './../../assets/images/sun.png';
import imgRainfall from './../../assets/images/rain.png';
import imgTemperature from './../../assets/images/thermometer.png';

function glyphiconFormatter(cell) {
  console.log("Cell:", cell);
  if (cell > 0) {
    return "glyphicon glyphicon-triangle-top glyphiconPositive";
  }
  else if (cell < 0) {
    return "glyphicon glyphicon-triangle-bottom glyphiconNegative";
  } else {
    return "";
  }
}

function triangleColumnFormatter(cell, row) {
  if (cell == 0) {
    return '<i class="glyphicon glyphicon-triangle-top glyphiconPositive"></i>' + cell + '%';
  }
  else if (cell < 0) {
    return '<i class="glyphicon glyphicon-triangle-bottom glyphiconNegative"></i>' + cell + '%';
  } else {
    return '<i class=""></i>' + cell + '%';
  }
}

function trClassFormat(cell, row) {
  if (cell == 'Attack') {
    return 'tr-function-example';
  }
  else {
    return '';
  }
}

function columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
  //fieldValue is column value
  //row is whole row object
  //rowIdx is index of row
  //colIdx is index of column
  if (fieldValue == 'Attack') {
    return 'tr-function-red';
  }
  else {
    if (fieldValue == 'Defend') {
      return 'tr-function-yellow';
    }
    else {
      return 'tr-function-green';
    }

  }
}


import MultilineThree from 'components/MultilineThree';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {generateBestWorstPerformanceTable} from "./actions";

export class Executive extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    console.log('localStorage->', localStorage);
    let defaultFilterUrlParams = localStorage.getItem('urlParams');

    if (defaultFilterUrlParams) {
      // console.log('defaultFilterUrlParams', defaultFilterUrlParams);
      this.props.onGenerateUrlParamsString(defaultFilterUrlParams);
    } else {
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          return parts.pop().split(';').shift();
        }
      };
      //fetching values from cookie
      const userId = getCookie('token');
      const userName = getCookie('user');
      const designation = getCookie('designation');
      const buyingController = getCookie('buying_controller');
      const buyer = getCookie('buyer');
      if(buyer && buyingController) {
        this.props.onGenerateUrlParamsString(`buying_controller=${buyingController}&buyer=${buyer}`);

      } else if (buyingController) {
        this.props.onGenerateUrlParamsString(`buying_controller=${buyingController}`);

      } else {
        this.props.onGenerateUrlParamsString(``);

      }
    }




    this.props.onGetFilter();
    this.props.onGetWeekFilter();



    // saurav
    // this.props.onGenerateBestWorstPerformance();

    if (this.props.Executive.kpi_param == 'kpi_type=Overview') {
      console.log("______________________ Only Overview function Called")
      this.props.spinnerRolesAndIntent(0);
      this.props.spinnerOverviewKPI(0);
      this.props.spinnerOverviewKPITrend(0);
      this.props.spinnerOverviewInternalDrivers(0);
      this.props.spinnerOverviewExternalDrivers(0);

      this.props.loadOverviewKpi();
      this.props.loadOverviewKpiTrend();
      this.props.loadOverviewDriversInternal();
      this.props.loadOverviewDriversExternal();
      this.props.loadRolesAndIntent();
      this.props.loadBudgetAndForecast();
      this.props.loadDriversInternalData();
      this.props.loadDriversExternalData();

    }
    else {
      if (this.props.Executive.kpi_param == 'kpi_type=Price') {
        console.log("______________________ Only Price function Called")
        this.props.spinnerPriceKPI();
        this.props.loadPriceKPIData();


      }

      else {
        console.log("______________________ Only KPI functions Called")
        this.props.spinnerInternalDrivers(0);
        this.props.spinnerExternalDrivers(0);
        this.props.spinnerKPI(0);
        this.props.loadKpiBoxes();
        this.props.loadBestWorst();
        // this.props.loadBestInfoData();
        //
        // this.props.loadWorstInfoData();
        // this.props.loadSupplierInfoData();
        // this.props.loadTopSupplierInfoData();
        // this.props.loadBotSupplierInfoData();
        this.props.loadDriversInternalData();
        this.props.loadDriversExternalData();

      }

    }
    // this.props.promotion.reducer1.sales;
  };
  componentDidUpdate = () => {
    // this.props.promotion.reducer1.sales;
  };

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      modalGraphTopBot: false,
      modalTableTopBot: false,
      lgValidation: false,
      activeKey1: "1",
      activeKey2: "1",
      activeKey3: "1",
      activeKey4: "1",
      activeKey5: "0",
      activeKey6: "0",
      activeKey7: "0",
      activeKey8: "0",
      activeKey9: "1",
      activeKey10: "1",
      allImpGraphs: false,
      detailedTable: false,

      showExternalDriverModal: false,
      showExternalDriverModalValue: false
    };

  }

  cellButton = (row, cell) => {
    return (
      <div>
        <button className="btn btn-success">Show info</button>
      </div>
    )
  }

  cellButton2 = (row, cell) => {
    return (
      <div>
        <button className="btn btn-success">Show info</button>
      </div>
    )
  }



  render() {

    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [{
        text: '7', value: 7
        // }, {
        //   text: '10', value: 10
        // }, {
        //   text: 'All', value: products.length
      }], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      noDataText:"Loading..."
    };


    let kpiparam = this.props.Executive.kpi_param;
    let dataWeekParam = this.props.Executive.week_param;
    let driverParam = this.props.Executive.driver_param;
    let topName = '';
    let botName = '';
    let suppName = '';
    let topbotflag = '';
    let formatVolume = (i) => {
      if (i >= 1000 || i <= -1000) {
        let rounded = Math.round(i / 1000)
        return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      } else {
        return (Math.round(i));
      }

    };

   let addPerc = (i) => {
      return (i.toString() +'%');
    };

    let cellButton = (row, cell) => {
      console.log('<<<<<<row', row, cell.level)
      return (
        <div>
          <button className="btn btn-success" onClick={() => {
            suppName = 'None';
            this.props.onGenerateBestWorstPerformanceTable(cell.level);
            this.setState({topsuppInfo: true});
          }}>Supplier Info
          </button>
        </div>
      )
    }

    //modal for trended performance in value
    let cellButton2 = (row, cell, x) => {
      console.log('trended perfomance hhh', row, cell, x);
      return (
        <div>
          <button className="btn btn-success" onClick={() => {
            topName = cell.level;
            topName = "selected_level=" + topName;
            this.props.onSaveTopName(topName);
            let topbotflag = 'top';
            this.props.onSaveTopBotFlag(topbotflag);
            console.log("topName1", topName);
            this.setState({activeKey5: "1"});
            this.props.loadBestInfoData();
            this.setState({modalGraphTopBot: true})
          }}>Trend
          </button>
        </div>
      )
    }
    return (
      <div>
        <Helmet
          title="Executive"
          meta={[
            {name: 'description', content: 'Description of Executives'},
          ]}
        />

        <div className="row">

            <Breadcrumb
              selected_week={(this.props.Executive.week_param).substring(10, this.props.Executive.week_param.length)}
              urlParamsString={this.props.Executive.urlParamsString}/>

          <br/>
          <br/>
          <br/>
          <br/></div>

        {/*Overview-external driver --modal*/}
        <Modal show={this.state.allImpGraphs} bsSize="large"
               dialogClassName={'xlModal'}
               aria-labelledby="contained-modal-title-sm"
               onHide={() => {
                 this.setState({allImpGraphs: false})
               }}>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
              style={{textAlign: 'center', fontSize: '20px'}}><b>KPI Trends</b><span
              style={{textAlign: 'right', float: 'right'}}
              onClick={() => this.setState({allImpGraphs: false})}><b>X</b></span></span>
              <div style={{textAlign: 'center'}}>
                <div style={{textAlign: 'right'}}>
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {(() => {
              if (this.props.Executive.overview_kpi_trend_data && this.props.Executive.overviewKPITrendSpinner) {
                return (
                  <div className="">
                    {/*Row for value and volume*/}
                    <div className="row ">
                      {/*Value Trend*/}
                      <div className="col-md-5 col-xs-12 col-sm-6 col-lg-5"
                           style={{border: "1px solid #ccc", marginLeft: "4%"}}>
                        <h3 className="pageModuleSubTitle"> Value
                          <div style={{float: "right", paddingRight: "5px"}}>
                            <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight
                                            style={{
                                              backgroundColor: "transparent",
                                              borderColor: "transparent",
                                              color: "#00539f"
                                            }} id="dropButtonId">
                              <MenuItem onClick={() => {
                                saveImage(document.getElementById('overview_value_line'), "kpiSalesValueTrend")
                              }
                              }>Save As JPEG</MenuItem>
                              <MenuItem onClick={() => {
                                saveDataAsCSV(this.props.Executive.overview_kpi_trend_data.value_trend, "kpiSalesValueTrend.csv")
                              }
                              }>Download CSV</MenuItem>
                            </DropdownButton>
                          </div>
                        </h3>

                        {(() => {
                          if (this.props.Executive.overview_kpi_trend_data) {
                            console.log("overview_kpi_trend_data value line chart data", this.props.Executive.overview_kpi_trend_data.value_trend);
                            return (
                              <div className="col-md-6 col-sm-12 col-xs-12">
                                <MultilinePromo
                                  data={this.props.Executive.overview_kpi_trend_data.value_trend}
                                  id="overview_value_line" label_ty="Value TY" label_ly="Value LY"
                                  xaxis_title="Tesco Week" no_pref='£' no_suffix=''
                                  yaxis_title='Value'
                                  chart_width="600" legend_width="450" legend_text_width="445"/>
                              </div>
                            );
                          }
                        })()}
                      </div>
                      {/*Defining empty grid to create space*/}
                      <div className="col-md-2 col-xs-12 col-sm-2 col-lg-2"></div>
                      {/*Volume Trend*/}
                      <div className="col-md-5 col-xs-12 col-sm-6 col-lg-5"
                           style={{border: "1px solid #ccc", marginLeft: "7%"}}>
                        <h3 className="pageModuleSubTitle"> Volume
                          <div style={{float: "right", paddingRight: "5px"}}>
                            <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight
                                            style={{
                                              backgroundColor: "transparent",
                                              borderColor: "transparent",
                                              color: "#00539f"
                                            }} id="dropButtonId">
                              <MenuItem onClick={() => {
                                saveImage(document.getElementById('overview_volume_line'), "kpiSalesVolumeTrend")
                              }
                              }>Save As JPEG</MenuItem>
                              <MenuItem onClick={() => {
                                saveDataAsCSV(this.props.Executive.overview_kpi_trend_data.volume_trend, "kpiSalesVolumeTrend.csv")
                              }
                              }>Download CSV</MenuItem>
                            </DropdownButton>
                          </div>
                        </h3>
                        {(() => {
                          if (this.props.Executive.overview_kpi_trend_data) {
                            console.log("overview_kpi_trend_data volume line chart data", this.props.Executive.overview_kpi_trend_data.volume_trend);
                            return (
                              <div className="col-md-6 col-sm-12 col-xs-12">
                                <MultilinePromo
                                  data={this.props.Executive.overview_kpi_trend_data.volume_trend}
                                  id="overview_volume_line" label_ty="Volume TY" label_ly="Volume LY"
                                  xaxis_title="Tesco Week" no_pref='' no_suffix=''
                                  yaxis_title='Volume'
                                  chart_width="600" legend_width="450" legend_text_width="445"/>
                              </div>
                            );
                          }
                        })()}

                      </div>
                    </div>
                    {/*Row for COGS and CGM*/}
                    <div className="row">
                      {/*COGS Trend*/}
                      <div className="col-md-5 col-xs-12 col-sm-6 col-lg-5"
                           style={{border: "1px solid #ccc", marginLeft: "4%", marginTop: "1%"}}>
                        <h3 className="pageModuleSubTitle"> COGS
                          <div style={{float: "right", paddingRight: "5px"}}>
                            <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight
                                            style={{
                                              backgroundColor: "transparent",
                                              borderColor: "transparent",
                                              color: "#00539f"
                                            }} id="dropButtonId">
                              <MenuItem onClick={() => {
                                saveImage(document.getElementById('overview_cogs_line'), "kpiCOGSTrend")
                              }
                              }>Save As JPEG</MenuItem>
                              <MenuItem onClick={() => {
                                saveDataAsCSV(this.props.Executive.overview_kpi_trend_data.cogs_trend, "kpiCOGSTrend.csv")
                              }
                              }>Download CSV</MenuItem>
                            </DropdownButton>
                          </div>
                        </h3>
                        {(() => {
                          if (this.props.Executive.overview_kpi_trend_data) {
                            console.log("overview_kpi_trend_data COGS line chart data", this.props.Executive.overview_kpi_trend_data.cogs_trend);
                            return (
                              <div className="col-md-6 col-sm-12 col-xs-12">
                                <MultilinePromo
                                  data={this.props.Executive.overview_kpi_trend_data.cogs_trend}
                                  id="overview_cogs_line" label_ty="COGS TY" label_ly="COGS LY"
                                  xaxis_title="Tesco Week" no_pref='£' no_suffix=''
                                  yaxis_title='COGS' chart_width="600" legend_width="450"
                                  legend_text_width="445"/>
                              </div>
                            );
                          }
                        })()}
                      </div>
                      <div className="col-md-2 col-xs-12 col-sm-2 col-lg-2"></div>
                      {/*CGM Trend*/}
                      <div className="col-md-5 col-xs-12 col-sm-6 col-lg-5"
                           style={{border: "1px solid #ccc", marginLeft: "7%", marginTop: "1%"}}>
                        <h3 className="pageModuleSubTitle"> Profit
                          <div style={{float: "right", paddingRight: "5px"}}>
                            <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight
                                            style={{
                                              backgroundColor: "transparent",
                                              borderColor: "transparent",
                                              color: "#00539f"
                                            }} id="dropButtonId">
                              <MenuItem onClick={() => {
                                saveImage(document.getElementById('overview_cgm_line'), "kpiCGMTrend")
                              }
                              }>Save As JPEG</MenuItem>
                              <MenuItem onClick={() => {
                                saveDataAsCSV(this.props.Executive.overview_kpi_trend_data.cgm_trend, "kpiCGMTrend.csv")
                              }
                              }>Download CSV</MenuItem>
                            </DropdownButton>
                          </div>
                        </h3>
                        {(() => {
                          if (this.props.Executive.overview_kpi_trend_data) {
                            console.log("overview_kpi_trend_data profit line chart data", this.props.Executive.overview_kpi_trend_data.cgm_trend);
                            return (
                              <div className="col-md-6 col-sm-12 col-xs-12">
                                <MultilinePromo
                                  data={this.props.Executive.overview_kpi_trend_data.cgm_trend}
                                  id="overview_cgm_line" label_ty="Profit TY"
                                  label_ly="Profit LY" xaxis_title="Tesco Week" no_pref='£'
                                  no_suffix='' yaxis_title='Profit' chart_width="600"
                                  legend_width="450" legend_text_width="445"/>
                              </div>
                            );
                          }
                        })()}

                      </div>
                    </div>
                  </div>
                )
              } else {
                return (

                  <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                );
              }
            })()}

          </Modal.Body>

        </Modal>
        {/*Modal for detailed table*/}
        <Modal show={this.state.detailedTable} bsSize="large"
               dialogClassName={'xlModal'}
               aria-labelledby="contained-modal-title-sm"
               onHide={() => {
                 this.setState({detailedTable: false})
               }}>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
              style={{textAlign: 'center', fontSize: '20px'}}><b>Detailed Information</b><span
              style={{textAlign: 'right', float: 'right'}}
              onClick={() => this.setState({detailedTable: false})}><b>X</b></span></span>
              <div style={{textAlign: 'center'}}>
                <div style={{textAlign: 'right'}}>
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>


            {(() => {
              if (this.props.Executive.roles_intent_data && this.props.Executive.roles_intent_data.roles_and_intent_detail) {
                return (
                  <BootstrapTable className="promoTable"
                                  data={this.props.Executive.roles_intent_data.roles_and_intent_detail}
                                  striped={true}
                                  condensed
                                  hover
                                  tableStyle={{background: 'white', fontSize: "15px"}}
                  >
                    <TableHeaderColumn dataAlign={"left"} dataField='buying_controller' isKey>Buying
                      Controller</TableHeaderColumn>
                    <TableHeaderColumn dataAlign={"left"} dataField='express'
                                       columnClassName={''}>Express</TableHeaderColumn>
                    <TableHeaderColumn dataAlign={"left"} dataField='large_stores'
                                       columnClassName={''}>Large
                      Stores</TableHeaderColumn>
                    <TableHeaderColumn dataAlign={"left"} dataField='type'
                                       columnClassName={''}>Type</TableHeaderColumn>
                    <TableHeaderColumn dataAlign={"left"} dataField='benchmark'
                                       columnClassName={''}>Customer Proposition metrics - Benchmark
                    </TableHeaderColumn>
                    <TableHeaderColumn dataAlign={"left"} dataField='tesco_as_is'
                                       columnClassName={''}>Customer Proposition metrics - Tesco As-Is
                    </TableHeaderColumn>
                    <TableHeaderColumn dataAlign={"left"} dataField='tesco_end_game'
                                       columnClassName={''}>Customer Proposition metrics - Tesco End-game
                    </TableHeaderColumn>
                  </BootstrapTable>

                )
              }


            })()}

          </Modal.Body>

        </Modal>


        <div className="row" style={{
          marginLeft: '0px',
          marginRight: '0px'
        }}>


          <div className={this.state.collapsed ? 'collapse-filter' : 'expand-filter'}
               style={{
                 height: '100%',
                 position: 'fixed',
                 overflowX: 'hidden',
                 overflowY: 'scroll',
                 borderTop: '1px solid #ccc'
               }}>
            {(() => {
              if (this.props.Executive.filter_data) {
                console.log("Calling Filter index.js", this.props.Executive.filter_data.filter_data);
                return (
                  <ExecFilter sideFilter={this.props.Executive.filter_data}
                              location={this.props.location}
                              generateSideFilter={this.props.onGetFilter}
                              onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                              onGenerateUrlParamsData={this.props.onGenerateUrlParamsData}
                              week_data={this.props.Executive.week_filter_data}
                              ongenerateWeekFilter={this.props.onGetWeekFilter}
                              onSaveWeekFilterParam={this.props.onSaveWeekFilterParam}
                              previous_week_selection={this.props.Executive.week_filter_param}
                              kpi_param={this.props.Executive.kpi_param}
                              loadOverviewKpi={ this.props.loadOverviewKpi}
                              loadRolesAndIntent={ this.props.loadRolesAndIntent}
                              loadBudgetAndForecast={ this.props.loadBudgetAndForecast}
                              loadOverviewKpiTrend={ this.props.loadOverviewKpiTrend}
                              loadOverviewDriversInternal={ this.props.loadOverviewDriversInternal}
                              loadOverviewDriversExternal={ this.props.loadOverviewDriversExternal}
                              loadKpiBoxes={ this.props.loadKpiBoxes}
                              loadBestWorst={ this.props.loadBestWorst}
                              loadBestInfoData = {this.props.loadBestInfoData}
                              loadDriversInternalData={ this.props.loadDriversInternalData}
                              onGenerateBestWorstPerformance={ this.props.onGenerateBestWorstPerformance}

                              loadDriversExternalData={ this.props.loadDriversExternalData}
                              loadPriceKPIData={ this.props.loadPriceKPIData}
                              kpi_type={this.props.Executive.kpi_param}
                              spinnerRolesAndIntent={this.props.spinnerRolesAndIntent}
                              spinnerOverviewKPITrend={this.props.spinnerOverviewKPITrend}
                              spinnerOverviewInternalDrivers={this.props.spinnerOverviewInternalDrivers}
                              spinnerOverviewExternalDrivers={this.props.spinnerOverviewExternalDrivers}
                              spinnerInternalDrivers={this.props.spinnerInternalDrivers}
                              spinnerExternalDrivers={this.props.spinnerExternalDrivers}
                              spinnerOverviewKPI={this.props.spinnerOverviewKPI}
                              spinnerPriceKPi={this.props.spinnerPriceKPI}
                              spinnerKPI={this.props.spinnerKPI}

                              week_filter_param={this.props.Executive.week_filter_param}
                              urlParamsString={this.props.Executive.urlParamsString}
                              defaultGreyScreen={this.props.defaultGreyScreen}


                  />
                );
              } else {
                return (<div>Loading the data </div>)
              }
            })()}

          </div>

          {/* Collapse (or) Expand filters Button*/}
          <div
            style={{width: '1%', height: '20px', marginLeft: this.state.collapsed ? '0%' : '20%', position: 'fixed'}}>
            <div className="filterCollapseBar" onClick={() => {
              this.setState({collapsed: !this.state.collapsed})
            }}>{this.state.collapsed ? <span className="glyphicon glyphicon-forward"></span> :
              <span className="glyphicon glyphicon-backward"></span>}
            </div>
          </div>


          {(() => {
            if (this.props.Executive.defaultGreyScreen) {
              return (
                <div
                  className={this.state.collapsed ? 'expand-content selectAttrituteIndicator' : 'collapse-content selectAttrituteIndicator'}>
                  ----- Please select the filters to get started ------</div>
              )
            } else {
              return (
                <div className={this.state.collapsed ? 'expand-content' : 'collapse-content'}>
                  <div className="topFilter" style={{marginLeft: "2%"}}>
                    {(() => {
                      if (this.props.Executive.week_filter_data) {
                        return (
                          <TopFilter
                            week_filter_data={this.props.Executive.week_filter_data}
                            onSaveWeekFilterParam={this.props.onSaveWeekFilterParam}

                            onSaveStoreFilterParam={this.props.onSaveStoreFilterParam}
                            onSaveWeekParam={this.props.onSaveWeekParam}

                            loadOverviewKpi={ this.props.loadOverviewKpi}
                            loadRolesAndIntent={ this.props.loadRolesAndIntent}
                            loadBudgetAndForecast={ this.props.loadBudgetAndForecast}
                            loadOverviewKpiTrend={ this.props.loadOverviewKpiTrend}
                            loadOverviewDriversInternal={ this.props.loadOverviewDriversInternal}
                            loadOverviewDriversExternal={ this.props.loadOverviewDriversExternal}
                            loadKpiBoxes={ this.props.loadKpiBoxes}
                            loadBestWorst={ this.props.loadBestWorst}
                            loadBestInfoData = {this.props.loadBestInfoData}
                            loadDriversInternalData={ this.props.loadDriversInternalData}
                            onGenerateBestWorstPerformance={ this.props.onGenerateBestWorstPerformance}
                            loadDriversExternalData={ this.props.loadDriversExternalData}
                            loadPriceKPIData={ this.props.loadPriceKPIData}
                            kpi_param={this.props.Executive.kpi_param}
                            kpi_type={this.props.Executive.kpi_param}
                            spinnerRolesAndIntent={this.props.spinnerRolesAndIntent}
                            spinnerOverviewKPITrend={this.props.spinnerOverviewKPITrend}
                            spinnerOverviewInternalDrivers={this.props.spinnerOverviewInternalDrivers}
                            spinnerOverviewExternalDrivers={this.props.spinnerOverviewExternalDrivers}
                            spinnerInternalDrivers={this.props.spinnerInternalDrivers}
                            spinnerExternalDrivers={this.props.spinnerExternalDrivers}
                            spinnerOverviewKPI={this.props.spinnerOverviewKPI}
                            spinnerPriceKPi={this.props.spinnerPriceKPI}
                            spinnerKPI={this.props.spinnerKPI}
                          />
                        )
                      }
                    })()}
                  </div>
                  <div className="row " style={{marginLeft: "0%", paddingTop: "-5px", marginRight: "0px"}}>
                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12 ">
                      <div className="mainBox">
                        <div style={{borderRight: '0%'}}>
                          {/*Nav for kpi type*/}
                          <Nav style={{marginLeft: '0%'}} bsStyle="tabs" activeKey={this.state.activeKey2}
                               onSelect={this.handleSelect} className="tabsCustom  mainTab">
                            <NavItem className="tabsNavPanelList1" eventKey="1" onClick={() => {
                              kpiparam = "kpi_type=Overview";
                              this.setState({activeKey2: "1"});
                              this.props.onSaveKPIParam(kpiparam);
                              this.props.onSaveDriverParam("internal");
                              topName = 'None';
                              suppName = 'None';
                              botName = 'None';
                              this.props.onSaveTopName(topName);
                              this.props.onSaveBotName(botName);
                              this.props.onSaveSupplierName(suppName);
                              this.props.loadOverviewKpi();
                              this.props.loadOverviewKpiTrend();
                              this.props.loadOverviewDriversInternal();
                              this.props.loadOverviewDriversExternal();
                              this.props.loadRolesAndIntent();
                              this.props.loadBudgetAndForecast();
                              this.props.spinnerRolesAndIntent(0);
                              this.props.spinnerOverviewKPITrend(0);
                              this.props.spinnerOverviewInternalDrivers(0);
                              this.props.spinnerOverviewExternalDrivers(0);
                              this.props.loadDriversInternalData();
                              this.props.loadDriversExternalData();
                            }}><span className="tab_label">Overview</span></NavItem>

                            <NavItem className="tabsNavPanelList1" eventKey="2" onClick={() => {
                              kpiparam = "kpi_type=Value";
                              this.setState({activeKey2: "2"});
                              this.props.onSaveKPIParam(kpiparam);
                              this.props.onSaveDriverParam("internal");
                              topName = 'None';
                              suppName = 'None';
                              botName = 'None';
                              this.props.onSaveTopName(topName);
                              this.props.onSaveBotName(botName);
                              this.props.onSaveSupplierName(suppName);
                              this.props.spinnerKPI(0);
                              this.props.spinnerInternalDrivers(0);
                              this.props.spinnerExternalDrivers(0);
                              this.props.loadKpiBoxes();
                              this.props.loadBestWorst();
                              this.props.onGenerateBestWorstPerformance();
                              this.props.loadDriversInternalData();
                              this.props.loadDriversExternalData();
                            }}><span className="tab_label">Value</span></NavItem>

                            <NavItem className="tabsNavPanelList1" eventKey="3" onClick={() => {
                              kpiparam = "kpi_type=Volume";
                              this.setState({activeKey2: "3"});
                              this.props.onSaveKPIParam(kpiparam);
                              topName = 'None';
                              suppName = 'None';
                              botName = 'None';

                              this.props.onSaveTopName(topName);
                              this.props.onSaveBotName(botName);
                              this.props.onSaveSupplierName(suppName);

                              this.props.spinnerKPI(0);
                              this.props.spinnerInternalDrivers(0);
                              this.props.spinnerExternalDrivers(0);

                              this.props.loadKpiBoxes();
                              this.props.loadBestWorst();
                              this.props.onGenerateBestWorstPerformance();

                              {/*this.props.loadWorstInfoData();*/
                              }
                              {/*this.props.loadBestInfoData();*/
                              }
                              {/*this.props.loadSupplierInfoData();*/
                              }
                              {/*this.props.loadTopSupplierInfoData();*/
                              }
                              {/*this.props.loadBotSupplierInfoData();*/
                              }
                              this.props.spinnerInternalDrivers(0);
                              this.props.spinnerExternalDrivers(0);
                            }}><span className="tab_label">Volume</span></NavItem>

                            <NavItem className="tabsNavPanelList1" eventKey="4" onClick={() => {
                              kpiparam = "kpi_type=COGS";
                              this.setState({activeKey2: "4"});
                              this.props.onSaveKPIParam(kpiparam);
                              topName = 'None';
                              suppName = 'None';
                              botName = 'None';
                              this.props.onSaveTopName(topName);
                              this.props.onSaveBotName(botName);
                              this.props.onSaveSupplierName(suppName);
                              this.props.spinnerKPI(0);
                              this.props.spinnerInternalDrivers(0);
                              this.props.spinnerExternalDrivers(0);

                              this.props.loadKpiBoxes();
                              this.props.loadBestWorst();
                              this.props.onGenerateBestWorstPerformance();
                              this.props.spinnerInternalDrivers(0);
                              this.props.spinnerExternalDrivers(0);

                            }}><span className="tab_label">COGS</span></NavItem>

                            <NavItem className="tabsNavPanelList1" eventKey="5" onClick={() => {
                              kpiparam = "kpi_type=Profit";
                              this.setState({activeKey2: "5"});
                              this.props.onSaveKPIParam(kpiparam);
                              topName = 'None';
                              suppName = 'None';
                              botName = 'None';
                              this.props.onSaveTopName(topName);
                              this.props.onSaveBotName(botName);
                              this.props.onSaveSupplierName(suppName);
                              this.props.spinnerKPI(0);
                              this.props.spinnerInternalDrivers(0);
                              this.props.spinnerExternalDrivers(0);
                              this.props.loadKpiBoxes();
                              this.props.loadBestWorst();
                              this.props.onGenerateBestWorstPerformance();
                            }}><span className="tab_label">CGM</span></NavItem>

                            <NavItem className="tabsNavPanelList1" eventKey="6" onClick={() => {
                              kpiparam = "kpi_type=Price";
                              this.setState({activeKey2: "6"});
                              this.props.onSaveKPIParam(kpiparam);
                              topName = 'None';
                              suppName = 'None';
                              botName = 'None';
                              this.props.onSaveTopName(topName);
                              this.props.onSaveBotName(botName);
                              this.props.onSaveSupplierName(suppName);
                              this.props.spinnerPriceKPI(0);
                              this.props.loadPriceKPIData();
                            }}><span className="tab_label">Price</span></NavItem>


                          </Nav>
                        </div>
                        {/*Overview starting*/}
                        {(() => {
                          if (this.props.Executive.kpi_param == 'kpi_type=Overview') {
                            return (
                              <div className="coverBox">
                                {/*Row for overview KPI Boxes */}
                                <div className="headerBox">
                                  <h2 className="pageModuleMainTitle">Performance KPI</h2>
                                </div>
                                {(() => {
                                  if (this.props.Executive.overviewKPISpinner && this.props.Executive.overview_kpi_data) {
                                    return (
                                      <div>
                                        <div className="row mainBox"
                                             style={{textAlign: 'center', height: "650px", backgroundColor: "#fafafa"}}>
                                          {/* Box for value */}
                                          <div className="col-md-6 col-xs-6" style={{backgroundColor: "#fafafa"}}>
                                            <Panel>
                                              <h3 className="pageModuleSubTitle"> Value </h3>
                                              <div className="row">
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                     style={{textAlign: 'center'}}>
                                                  <h3 style={{
                                                    padding: "0px",
                                                    margin: "0px"
                                                  }}>{this.props.Executive.overview_kpi_data.kpi.value.total}</h3>
                                                </div>
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                     style={{textAlign: 'center'}}>
                                                  <h3 style={{padding: "0px", margin: "0px"}}>
                                                    LFL TY &nbsp; {this.props.Executive.overview_kpi_data.kpi.value.total_lfl} </h3>
                                                </div>
                                              </div>
                                              <div className="row">
                                                {(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      <div className="col-md-4 col-xs-12 kpiSmall">
                                                        <h4>
                                                      <span
                                                        className={glyphiconFormatter(this.props.Executive.overview_kpi_data.kpi.value.var_wow)}></span>
                                                          {(this.props.Executive.overview_kpi_data.kpi.value.var_wow) + '%'}
                                                        </h4>
                                                        <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                      </div>
                                                    )
                                                  }


                                                })()}


                                                <div className={(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      "col-md-4 col-xs-12 col-sm-6 col-lg-4 kpismall"
                                                    )
                                                  }
                                                  else {
                                                    return (
                                                      "col-md-6 col-xs-12 col-sm-12 col-lg-6 kpismall"
                                                    )
                                                  }
                                                })()}>
                                                  <h4>
                                              <span
                                                className={glyphiconFormatter(this.props.Executive.overview_kpi_data.kpi.value.var_yoy)}></span>
                                                    {(this.props.Executive.overview_kpi_data.kpi.value.var_yoy) + '%'}
                                                  </h4>
                                                  <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                                </div>

                                                {/*Code for lfl in overview-value*/}
                                                <div className={(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                    )
                                                  }
                                                  else {
                                                    return (
                                                      "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                    )
                                                  }
                                                })()}>
                                                  <h4>

                                               <span
                                                 className={glyphiconFormatter(this.props.Executive.overview_kpi_data.kpi.value.var_lfl)}></span>
                                                    {(this.props.Executive.overview_kpi_data.kpi.value.var_lfl) + '%'}

                                                  </h4>
                                                  <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                                </div>

                                              </div>
                                            </Panel>
                                          </div>

                                          {/* Box for volume */}
                                          <div className="col-md-6 col-xs-6" style={{backgroundColor: "#fafafa"}}>
                                            <Panel>
                                              <h3 className="pageModuleSubTitle">Volume</h3>
                                              <div className="row">
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                     style={{textAlign: 'center'}}>
                                                  <h3 style={{
                                                    padding: "0px",
                                                    margin: "0px"
                                                  }}>{this.props.Executive.overview_kpi_data.kpi.volume.total}</h3>
                                                </div>
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                     style={{textAlign: 'center'}}>
                                                  <h3 style={{padding: "0px", margin: "0px"}}>
                                                    LFL TY &nbsp; {this.props.Executive.overview_kpi_data.kpi.volume.total_lfl} </h3>
                                                </div>
                                              </div>
                                              <div className="row">

                                                {(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      <div className="col-md-4 col-xs-12 kpiSmall">
                                                        <h4>
                                                      <span
                                                        className={glyphiconFormatter(this.props.Executive.overview_kpi_data.kpi.volume.var_wow)}></span>
                                                          {(this.props.Executive.overview_kpi_data.kpi.volume.var_wow) + '%'}
                                                        </h4>
                                                        <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                      </div>
                                                    )
                                                  }
                                                })()}

                                                <div className={(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                    )
                                                  }
                                                  else {
                                                    return (
                                                      "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                    )
                                                  }
                                                })()}>
                                                  <h4>
                                              <span
                                                className={glyphiconFormatter(this.props.Executive.overview_kpi_data.kpi.volume.var_yoy)}></span>
                                                    {(this.props.Executive.overview_kpi_data.kpi.volume.var_yoy) + '%'}
                                                  </h4>
                                                  <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                                </div>

                                                {/*Code for lfl in overview-value*/}
                                                <div className={(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                    )
                                                  }
                                                  else {
                                                    return (
                                                      "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                    )
                                                  }
                                                })()}>
                                                  <h4>

                                               <span
                                                 className={glyphiconFormatter(this.props.Executive.overview_kpi_data.kpi.volume.var_lfl)}></span>
                                                    {(this.props.Executive.overview_kpi_data.kpi.volume.var_lfl) + '%'}
                                                  </h4>
                                                  <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                                </div>
                                              </div>
                                            </Panel>
                                          </div>

                                          {/* Box for cogs */}
                                          <div className="col-md-6 col-xs-6" style={{backgroundColor: "#fafafa"}}>
                                            <Panel>
                                              <h3 className="pageModuleSubTitle"> COGS </h3>
                                              <div className="row">
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                     style={{textAlign: 'center'}}>
                                                  <h3 style={{
                                                    padding: "0px",
                                                    margin: "0px"
                                                  }}>{this.props.Executive.overview_kpi_data.kpi.cogs.total}</h3>
                                                </div>
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                     style={{textAlign: 'center'}}>
                                                  <h3 style={{padding: "0px", margin: "0px"}}>
                                                    LFL TY &nbsp; {this.props.Executive.overview_kpi_data.kpi.cogs.total_lfl} </h3>
                                                </div>
                                              </div>
                                              <div className="row">
                                                {(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      <div className="col-md-4 col-xs-12 kpiSmall">
                                                        <h4>
                                                      <span
                                                        className={glyphiconFormatter(this.props.Executive.overview_kpi_data.kpi.cogs.var_wow)}></span>
                                                          {(this.props.Executive.overview_kpi_data.kpi.cogs.var_wow) + '%'}
                                                        </h4>
                                                        <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                      </div>
                                                    )
                                                  }


                                                })()}


                                                <div className={(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                    )
                                                  }
                                                  else {
                                                    return (
                                                      "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                    )
                                                  }
                                                })()}>
                                                  <h4>
                                              <span
                                                className={glyphiconFormatter(this.props.Executive.overview_kpi_data.kpi.cogs.var_yoy)}></span>
                                                    {(this.props.Executive.overview_kpi_data.kpi.cogs.var_yoy) + '%'}
                                                  </h4>
                                                  <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                                </div>

                                                {/*Code for lfl in overview-value*/}
                                                <div className={(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                    )
                                                  }
                                                  else {
                                                    return (
                                                      "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                    )
                                                  }
                                                })()}>
                                                  <h4>

                                               <span
                                                 className={glyphiconFormatter(this.props.Executive.overview_kpi_data.kpi.cogs.var_lfl)}></span>
                                                    {(this.props.Executive.overview_kpi_data.kpi.cogs.var_lfl) + '%'}
                                                  </h4>
                                                  <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                                </div>
                                              </div>
                                            </Panel>
                                          </div>
                                          {/* Box for profit */}
                                          <div className="col-md-6" style={{backgroundColor: "#fafafa"}}>
                                            <Panel>
                                              <h3 className="pageModuleSubTitle"> Profit</h3>
                                              <div className="row">
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                     style={{textAlign: 'center'}}>
                                                  <h3 style={{
                                                    padding: "0px",
                                                    margin: "0px"
                                                  }}>{this.props.Executive.overview_kpi_data.kpi.cgm.total}</h3>
                                                </div>
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                     style={{textAlign: 'center'}}>
                                                  <h3 style={{padding: "0px", margin: "0px"}}>
                                                    LFL TY &nbsp; {this.props.Executive.overview_kpi_data.kpi.cgm.total_lfl} </h3>
                                                </div>
                                              </div>
                                              <div className="row">
                                                {(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      <div className="col-md-4 col-xs-12 kpiSmall">
                                                        <h4>
                                                      <span
                                                        className={glyphiconFormatter(this.props.Executive.overview_kpi_data.kpi.cgm.var_wow)}></span>
                                                          {(this.props.Executive.overview_kpi_data.kpi.cgm.var_wow) + '%'}
                                                        </h4>
                                                        <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                      </div>
                                                    )
                                                  }


                                                })()}


                                                <div className={(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                    )
                                                  }
                                                  else {
                                                    return (
                                                      "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                    )
                                                  }
                                                })()}>
                                                  <h4>
                                              <span
                                                className={glyphiconFormatter(this.props.Executive.overview_kpi_data.kpi.cgm.var_yoy)}></span>
                                                    {(this.props.Executive.overview_kpi_data.kpi.cgm.var_yoy) + '%'}
                                                  </h4>
                                                  <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                                </div>
                                                {/*Code for lfl in overview-value*/}
                                                <div className={(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                    )
                                                  }
                                                  else {
                                                    return (
                                                      "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                    )
                                                  }
                                                })()}>
                                                  <h4>

                                               <span
                                                 className={glyphiconFormatter(this.props.Executive.overview_kpi_data.kpi.cgm.var_lfl)}></span>
                                                    {(this.props.Executive.overview_kpi_data.kpi.cgm.var_lfl) + '%'}
                                                  </h4>
                                                  <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                                </div>
                                              </div>
                                            </Panel>
                                          </div>
                                          <br/>
                                          {/* Box for price */}
                                          <div className="col-md-6 col-xs-6" style={{backgroundColor: "#fafafa"}}>
                                            <Panel>
                                              <h3 className="col-md-6 col-xs-6 pageModuleSubTitle"
                                                  style={{marginBottom: "0px", marginTop: "-0.5%"}}> Price </h3>
                                              <div className="pricecard" style={{marginLeft: "10%"}}>
                                                <div className="row">
                                                  <div className="col-xs-12 kpiSubTitle price_metrics_heading"
                                                       style={{float: "right"}}>
                                                    <div className="col-xs-1"></div>
                                                    {/*Commenting heading based on clients feedback*/}
                                                    <div className="col-xs-3 kpiSubTitle"></div>
                                                    <h4 className="col-xs-3 kpiSubTitle"><b>WoW</b></h4>
                                                    <h4 className="col-xs-3 kpiSubTitle"><b>YoY</b></h4>
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <h4 className="col-xs-1 kpiSubTitle"><b>ACP</b></h4>
                                                  <h4 className="col-xs-3">
                                                    £{this.props.Executive.overview_kpi_data.price.ACP.abs}
                                                  </h4>
                                                  <h4 className="col-xs-3">
                                                    {(this.props.Executive.overview_kpi_data.price.ACP.wow) + '%'}
                                                  </h4>
                                                  <h4 className="col-xs-3">
                                                    {(this.props.Executive.overview_kpi_data.price.ACP.yoy) + '%'}
                                                  </h4>
                                                </div>
                                                <div className="row">
                                                  <h4 className="col-xs-1 kpiSubTitle"><b>ASP</b></h4>
                                                  <h4 className="col-xs-3">
                                                    £{this.props.Executive.overview_kpi_data.price.ASP.abs}
                                                  </h4>
                                                  <h4 className="col-xs-3">
                                                    {(this.props.Executive.overview_kpi_data.price.ASP.wow) + '%'}
                                                  </h4>
                                                  <h4 className="col-xs-3">
                                                    {(this.props.Executive.overview_kpi_data.price.ASP.yoy) + '%'}
                                                  </h4>

                                                </div>
                                              </div>
                                            </Panel>
                                          </div>
                                          {/*Box for Market Share*/}
                                          <div className="col-md-6 col-xs-6" style={{backgroundColor: "#fafafa"}}>
                                            <Panel>
                                              <h3 className="col-md-6 col-xs-6 pageModuleSubTitle"
                                                  style={{marginBottom: "0px",marginTop: "-0.5%"}}> Market </h3>
                                              <div className="pricecard" style={{marginLeft:"10%"}}>
                                                <div className="row">
                                                  <div className="col-xs-12 kpiSubTitle price_metrics_heading" style={{float:"right"}}>
                                                    <div className="col-xs-1"> </div>
                                                    <div className="col-xs-4 kpiSubTitle"></div>
                                                    {/*<h4 className="col-xs-3 kpiSubTitle"><b>WoW</b></h4>*/}
                                                    <h4 className="col-xs-4 kpiSubTitle"><b>YoY</b></h4>

                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <h4 className="col-xs-1 kpiSubTitle"><b>Share</b></h4>
                                                  <h4 className="col-xs-4 ">
                                                    {(this.props.Executive.overview_kpi_data.market.share.abs) + '%'}
                                                  </h4>
                                                  {/*<h4 className="col-xs-3">*/}
                                                    {/*{(this.props.Executive.overview_kpi_data.market.share.wow) + '%'}*/}
                                                  {/*</h4>*/}
                                                  <h4 className="col-xs-4">
                                                    {(this.props.Executive.overview_kpi_data.market.share.yoy) + '%'}
                                                  </h4>

                                                </div>
                                                <div className="row">
                                                  <h4 className="col-xs-1 kpiSubTitle"><b style={{marginLeft:"-150%"}}>Opportunity</b></h4>
                                                  <h4 className="col-xs-4">
                                                    {this.props.Executive.overview_kpi_data.market.opportunity.abs}
                                                  </h4>
                                                  {/*<h4 className="col-xs-3">*/}
                                                    {/*{(this.props.Executive.overview_kpi_data.market.opportunity.wow) + '%'}*/}
                                                  {/*</h4>*/}
                                                  <h4 className="col-xs-4">
                                                    {(this.props.Executive.overview_kpi_data.market.opportunity.yoy) + '%'}
                                                  </h4>

                                                </div>
                                              </div>
                                            </Panel>
                                          </div>


                                          <div className="trendButton" style={{float: "right", backgroundColor: "#fafafa"}}>
                                            <Button buttonType={'primary'} onClick={() => {
                                              this.setState({allImpGraphs: true})
                                            }}>Show KPI Trends</Button>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  }
                                  else {
                                    return (<div className="text-center"><Spinner />Please Wait a Moment....!</div>)
                                  }
                                })()}


                                {/*Row for sales forecasting and roles and intent*/}
                                <div className="headerBox">
                                  <h2 className="pageModuleMainTitle">Target and Strategy</h2>
                                </div>
                                {/**/}
                                {(() => {
                                  if (this.props.Executive.budget_forecast_data && this.props.Executive.roles_intent_data && this.props.Executive.rolesIntentSpinner) {
                                    return (
                                      <div className="row mainBox">
                                        {/*Block for bar charts*/}
                                        {/*BarChart for Forecast*/}
                                        <div className="col-xs-5"
                                             style={{background: "#fff", border: "1px solid #ccc"}}>
                                          <class className="col-md-9 col-xs-12 col-sm-9 col-lg-9">
                                            <h2 className="pageModuleSubTitle">Value vs. Forecast</h2>
                                          </class>

                                          <div className="col-md-3 col-sm-3 col-lg-3"
                                               style={{float: "right", marginTop: "15px"}}>
                                            <DropdownButton title="" className="glyphicon glyphicon-menu-hamburger" pullRight
                                                            style={{
                                                              backgroundColor: "transparent",
                                                              borderColor: "transparent",
                                                              color: "#00539f"
                                                            }} id="dropButtonId">
                                              <MenuItem onClick={() => {
                                                saveImage(document.getElementById('ForecastSales_svg'), "forecast_bar_chart")
                                              }
                                              }>Save As JPEG</MenuItem>
                                              <MenuItem onClick={() => {
                                                saveDataAsCSV(this.props.Executive.budget_forecast_data.forecast_data, "forecast_bar_chart.csv")
                                              }
                                              }>Download CSV</MenuItem>
                                            </DropdownButton>
                                          </div>

                                          <BarChartSimple id="ForecastSales"
                                                          data={this.props.Executive.budget_forecast_data.chart_data}
                                                          col_a='Forecast'>

                                          </BarChartSimple>

                                          <div className="row">

                                            <div className="col-xs-6">
                                              <Panel>
                                                <div className="pageModuleTitle">Value vs. Forecast</div>
                                                <div
                                                  className="cardNumbers">{this.props.Executive.budget_forecast_data.budget_value}%
                                                </div>
                                              </Panel>
                                            </div>

                                            <div className="col-xs-6">
                                              <Panel>
                                                <div className="pageModuleTitle">Value vs. Budget</div>
                                                <div
                                                  className="cardNumbers">{this.props.Executive.budget_forecast_data.forecast_value}%
                                                </div>
                                              </Panel>
                                            </div>
                                          </div>
                                        </div>

                                        {/*Block for roles and intent*/}
                                        <div className="col-xs-7"
                                             style={{paddingTop: "20px", paddingBottom: "20px", background: "#fff"}}>

                                          {(() => {
                                            if (this.props.Executive.roles_intent_data.roles_and_intent) {
                                              return (
                                                <BootstrapTable className="promoTable"
                                                                data={this.props.Executive.roles_intent_data.roles_and_intent}
                                                                striped={true}
                                                                condensed
                                                                hover
                                                                tableStyle={{background: 'white', fontSize: "15px"}}
                                                >
                                                  <TableHeaderColumn dataAlign={"left"} dataField='buying_controller' isKey>Buying
                                                    Controller</TableHeaderColumn>
                                                  <TableHeaderColumn dataAlign={"left"} dataField='express'
                                                                     columnClassName={columnClassNameFormat}>Express</TableHeaderColumn>
                                                  <TableHeaderColumn dataAlign={"left"} dataField='large_stores'
                                                                     columnClassName={columnClassNameFormat}>Large
                                                    Stores</TableHeaderColumn>
                                                </BootstrapTable>

                                              )
                                            }


                                          })()}
                                        </div>
                                        <div >
                                          <Button buttonType={'primary'}
                                                  style={{marginTop: "2%", marginLeft: "20%", float: "right"}}
                                                  onClick={() => {
                                                    this.setState({detailedTable: true})
                                                  }}>Detailed Info.</Button>
                                        </div>
                                      </div>
                                    )
                                  }
                                  else {
                                    return (

                                      <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                                    );
                                  }
                                })()}

                                {/*Row for internal/external drivers of sales*/}

                                {/*Row for drivers of sales*/}
                                <div className="headerBox">
                                  <h2 className="pageModuleMainTitle">Internal drivers of sales</h2>
                                </div>
                                {/*External and internal factors tab*/}
                                <Nav style={{marginLeft: '0%'}} bsStyle="tabs" activeKey={this.state.activeKey2}
                                     onSelect={this.handleSelect} className="tabsCustom  mainTab">
                                  <NavItem className="tabsNavPanelList1" eventKey="7" onClick={() => {
                                    this.setState({activeKey2: "7"});
                                    {/*Saving variable in state*/
                                    }
                                    let driverParam = "internal";
                                    this.props.onSaveDriverParam(driverParam);
                                    this.props.loadOverviewDriversInternal();
                                    this.props.spinnerOverviewInternalDrivers(0);
                                  }}><span className="tab_label">Internal Drivers</span></NavItem>

                                  <NavItem className="tabsNavPanelList1" eventKey="8" onClick={() => {
                                    this.setState({activeKey2: "8"});
                                    let driverParam = "external";
                                    this.props.onSaveDriverParam(driverParam);
                                  }}><span className="tab_label">External Drivers</span></NavItem>
                                </Nav>
                                {/*Ending external and internal tab row*/}

                                {/*Code to display external and internal drivers data in overview tab*/}
                                {(() => {
                                  if (this.props.Executive.driver_param === 'internal') {
                                    return (<div>
                                      <div className="row mainBox">

                                        {(() => {
                                          if (this.props.Executive.overviewInternalDriverSpinner) {
                                            return (
                                              <div>

                                                {/*Areas for waterfall chart for promo*/}
                                                <div className="col-md-8 col-sm-8 col-xs-12  col-lg-8">
                                                  <Panel>
                                                    <h4 className="pageModuleSubTitle"> Promotion Contribution to growth
                                                      <div style={{float: "right"}}>
                                                        <DropdownButton title=""
                                                                        className="glyphicon glyphicon-menu-hamburger"
                                                                        pullRight
                                                                        style={{
                                                                          backgroundColor: "transparent",
                                                                          borderColor: "transparent",
                                                                          color: "#00539f"
                                                                        }} id="dropButtonId">
                                                          <MenuItem onClick={() => {
                                                            saveImage(document.getElementById('waterfallChart_2_svg'), "overviewDriversInternalWaterfallChart")
                                                          }
                                                          }>Save As JPEG</MenuItem>
                                                          <MenuItem onClick={() => {
                                                            saveDataAsCSV(this.props.Executive.overview_drivers_internal_data.promo, "overviewDriversInternalWaterfallChart_data.csv")
                                                          }
                                                          }>Download CSV</MenuItem>
                                                        </DropdownButton>
                                                      </div>
                                                    </h4>
                                                    {(() => {
                                                      if (this.props.Executive.overview_drivers_internal_data)
                                                        return (
                                                          <div>
                                                            <WaterFallChartExec id="waterfallChart_2"
                                                                                yAxisName="Price Index"
                                                                                formatter="formatSales"
                                                                                positive_text='negative'
                                                                                negative_text='positive'
                                                                                total_text='total1'
                                                                                data={this.props.Executive.overview_drivers_internal_data.promo}
                                                            />
                                                          </div>
                                                        )
                                                    })()}
                                                  </Panel>
                                                  <div style={{
                                                         marginLeft: "35%"
                                                       }}>
                                                  <Button
                                                    buttonType={'primary'}
                                                    onClick={() => {
                                                            let value_internal_tab = "promo";
                                                            this.props.onSaveValueInternal(value_internal_tab);
                                                            this.setState({showInternalPromoModal: true});
                                                          }}>Promotion Contribution Trend
                                                  </Button>
                                                  </div>
                                                </div>

                                                <div className="col-md-4 col-sm-4 col-xs-12 col-lg-4">
                                                  <Panel style={{marginLeft: "15px"}}>
                                                    <div>
                                                      {(() => {
                                                        if (this.props.Executive.overview_drivers_internal_data) {
                                                          if (this.props.Executive.overview_drivers_internal_data.kpi.data_available == 'yes') {
                                                            return (
                                                              <div>

                                                                <h4 className="pageModuleSubTitle"> KPI Contribution to
                                                                  growth </h4>
                                                                <div className="row"
                                                                     style={{marginTop: '2%', marginBottom: '6%'}}>
                                                                  <div className="col-xs-12 overview-blk"
                                                                       style={{marginRight: "5px"}}>
                                                                    <div className="panel"
                                                                         style={{
                                                                           border: '1px solid #E5E8EA',
                                                                           height: '100px',
                                                                           textAlign: 'center'
                                                                         }}>
                                                                      <h4 className="panel-heading tesco-heading h3"
                                                                          style={{textAlign: "center", marginTop: '2%'}}
                                                                      >
                                                                        <b>LFL Sales</b>
                                                                      </h4>
                                                                      <div className="panel-body">
                                                          <span className="overview-blk-value">
                                                          <span
                                                            className={glyphiconFormatter(this.props.Executive.overview_drivers_internal_data.kpi.sales_lfl_var)}>
                                                          </span>{this.props.Executive.overview_drivers_internal_data.kpi.sales_lfl_var}%
                                                          </span>
                                                                      </div>
                                                                    </div>
                                                                  </div>

                                                                  <div className="col-xs-12 overview-blk"
                                                                       style={{marginRight: "5px"}}>
                                                                    <div className="panel"
                                                                         style={{
                                                                           border: '1px solid #E5E8EA',
                                                                           height: '100px',
                                                                           textAlign: 'center'
                                                                         }}>
                                                                      <h4 className="panel-heading tesco-heading">
                                                                        <b>Transactions</b>
                                                                      </h4>
                                                                      <div className="panel-body">
                                                                  <span className="overview-blk-value">
                                                                      <span
                                                                        className={glyphiconFormatter(this.props.Executive.overview_drivers_internal_data.kpi.transaction_var)}>
                                                                      </span> {this.props.Executive.overview_drivers_internal_data.kpi.transaction_var}%
                                                                  </span>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                  <div className="col-xs-12 overview-blk"
                                                                       style={{marginRight: "5px"}}>
                                                                    <div className="panel"
                                                                         style={{
                                                                           border: '1px solid #E5E8EA',
                                                                           height: '100px',
                                                                           textAlign: 'center'
                                                                         }}>
                                                                      <h4 className="panel-heading tesco-heading">
                                                                        <b>Items
                                                                          per Basket</b>
                                                                      </h4>
                                                                      <div className="panel-body">
                                                                  <span className="overview-blk-value">
                                                                      <span
                                                                        className={glyphiconFormatter(this.props.Executive.overview_drivers_internal_data.kpi.item_per_basket_var)}>
                                                                      </span> {this.props.Executive.overview_drivers_internal_data.kpi.item_per_basket_var}%
                                                                  </span>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                  <div className="col-xs-12 overview-blk"
                                                                       style={{marginRight: "5px"}}>
                                                                    <div className="panel"
                                                                         style={{
                                                                           border: '1px solid #E5E8EA',
                                                                           height: '100px',
                                                                           textAlign: 'center'
                                                                         }}>
                                                                      <h4 className="panel-heading tesco-heading"><b>Item
                                                                        price</b></h4>
                                                                      <div className="panel-body">
                                                                  <span className="overview-blk-value">
                                                                      <span
                                                                        className={glyphiconFormatter(this.props.Executive.overview_drivers_internal_data.kpi.item_price_var)}>
                                                                      </span>{this.props.Executive.overview_drivers_internal_data.kpi.item_price_var}%
                                                                  </span>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>

                                                              </div>

                                                            )
                                                          }
                                                          else {
                                                            return (
                                                              <div>
                                                                <h4 className="pageModuleSubTitle"> KPI Contribution to
                                                                  growth</h4>
                                                                <h4>Data is available only from week 201702</h4></div>
                                                            )
                                                          }
                                                        }

                                                      })()}

                                                    </div>
                                                  </Panel>
                                                  <div style={{
                                                    marginLeft: "32%"
                                                  }}>
                                                  <Button buttonType={'primary'}
                                                          onClick={() => {
                                                            let value_internal_tab = "kpi";
                                                            this.setState({activeKey9: "1"});
                                                            this.props.onSaveValueInternal(value_internal_tab);
                                                            this.setState({showExternalDriverModal: true});
                                                          }}>KPI Contribution Trend
                                                  </Button>
                                                  </div>
                                                  </div>

                                              </div>
                                            )
                                          }
                                          else {
                                            return (
                                              <div className="text-center"><Spinner />Please Wait a Moment....!</div>
                                            )
                                          }

                                        })()}

                                      </div>
                                    </div>)
                                  }
                                  else {
                                    return (<div>
                                      {/*Row for Sunshine/Rainfall/Temp performance*/}
                                      <div className="row mainBox">
                                        {/*Block for sunshine*/}
                                        <div className="col-md-4 col-xs-12 col-sm-12 col-lg-4"
                                             style={{backgroundColor: "#eee #eee #ddd", borderRight: "1px solid #e5e8ea"}}>
                                          <Panel>
                                            <h3 className="pageModuleSubTitle"> Sunshine
                                            </h3>

                                            {/* Image here*/}
                                            <img style={{height: 100, width: 100, marginLeft: '32%'}} src={imgSunshine}/>

                                            <div className="row">
                                              <h3 style={{textAlign: "center"}}>{
                                                this.props.Executive.overview_drivers_external_data.sunshine.avg
                                              } hrs</h3>
                                            </div>

                                            <div className="row">
                                              <div className="panel-body cardPanel">

                                                {(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6 kpiSmall"
                                                           style={{textAlign: "center"}}>
                                                        <h4>
                                                      <span
                                                        className={glyphiconFormatter(this.props.Executive.overview_drivers_external_data.sunshine.wow)}>
                                                      </span>{this.props.Executive.overview_drivers_external_data.sunshine.wow }%
                                                        </h4>
                                                        <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                      </div>
                                                    )
                                                  }


                                                })()}


                                                <div className={(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                    )
                                                  }
                                                  else {
                                                    return (
                                                      "col-md-12 col-xs-12 col-sm-12 col-lg-12"
                                                    )
                                                  }
                                                })()} style={{textAlign: "center"}}>
                                                  <h4>
                                                          <span
                                                            className={glyphiconFormatter(this.props.Executive.overview_drivers_external_data.sunshine.yoy)}>
                                                          </span>{this.props.Executive.overview_drivers_external_data.sunshine.yoy}%
                                                  </h4>
                                                  <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                </div>
                                              </div>
                                            </div>
                                          </Panel>
                                        </div>

                                        {/*Block for rainfall*/}
                                        <div className="col-md-4 col-xs-12 col-sm-3 col-lg-4"
                                             style={{backgroundColor: "#eee #eee #ddd", borderRight: "1px solid #e5e8ea"}}>
                                          <Panel>
                                            <h3 className="pageModuleSubTitle"> Rainfall
                                            </h3>
                                            {/* Image here*/}
                                            <img style={{height: 100, width: 100, marginLeft: '32%'}} src={imgRainfall}/>
                                            <div className="row">
                                              <h3 style={{textAlign: "center"}}>{
                                                this.props.Executive.overview_drivers_external_data.rainfall.avg
                                              }</h3>
                                            </div>
                                            <div className="row">
                                              <div className="panel-body cardPanel">
                                                {(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6 kpiSmall"
                                                           style={{textAlign: "center"}}>
                                                        <h4>
                                                          <span
                                                            className={glyphiconFormatter(this.props.Executive.overview_drivers_external_data.rainfall.wow)}>
                                                          </span>{this.props.Executive.overview_drivers_external_data.rainfall.wow }%
                                                        </h4>
                                                        <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                      </div>
                                                    )
                                                  }


                                                })()}


                                                <div className={(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                    )
                                                  }
                                                  else {
                                                    return (
                                                      "col-md-12 col-xs-12 col-sm-12 col-lg-12"
                                                    )
                                                  }
                                                })()} style={{textAlign: "center"}}>
                                                  <h4>
                                                          <span
                                                            className={glyphiconFormatter(this.props.Executive.overview_drivers_external_data.rainfall.yoy)}>
                                                          </span>{this.props.Executive.overview_drivers_external_data.rainfall.yoy}%
                                                  </h4>
                                                  <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                </div>
                                              </div>
                                            </div>
                                          </Panel>
                                        </div>
                                        {/*Block for temperature*/}
                                        <div className="col-md-4 col-xs-12 col-sm-12 col-lg-4"
                                             style={{backgroundColor: "#eee #eee #ddd", borderRight: "1px solid #e5e8ea"}}>
                                          <Panel>
                                            <h3 className="pageModuleSubTitle"> Temperature
                                            </h3>
                                            {/* Image here*/}
                                            <img style={{height: 100, width: 100, marginLeft: '32%'}} src={imgTemperature}/>
                                            <div className="row">
                                              <h3
                                                style={{textAlign: "center"}}>{this.props.Executive.overview_drivers_external_data.temperature.avg}°C</h3>
                                            </div>
                                            <div className="row">
                                              <div className="panel-body cardPanel">

                                                {(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6 kpiSmall"
                                                           style={{textAlign: "center"}}>
                                                        <h4>
                                                            <span
                                                              className={glyphiconFormatter(this.props.Executive.overview_drivers_external_data.temperature.wow)}>
                                                            </span>{this.props.Executive.overview_drivers_external_data.temperature.wow }%
                                                        </h4>
                                                        <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                      </div>
                                                    )
                                                  }


                                                })()}


                                                <div className={(() => {
                                                  if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                    return (
                                                      "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                    )
                                                  }
                                                  else {
                                                    return (
                                                      "col-md-12 col-xs-12 col-sm-12 col-lg-12"
                                                    )
                                                  }
                                                })()} style={{textAlign: "center"}}>
                                                  <h4>
                                                            <span
                                                              className={glyphiconFormatter(this.props.Executive.overview_drivers_external_data.temperature.yoy)}>
                                                            </span>{this.props.Executive.overview_drivers_external_data.temperature.yoy}%
                                                  </h4>
                                                  <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                </div>

                                              </div>
                                            </div>
                                          </Panel>
                                        </div>

                                        {/*Block for holidays table shown under external drivers tab and not in modal*/}
                                        <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                                          {(() => {
                                            if (this.props.Executive.overview_drivers_external_data && this.props.Executive.overviewExternalDriverSpinner) {
                                              return (
                                                <div className="promoTable" style={{marginTop: '2%'}}>

                                                  <BootstrapTable className="promoTable"
                                                                  data={this.props.Executive.overview_drivers_external_data.holidays}
                                                                  pagination={false} options={options}
                                                                  striped={true}
                                                                  condensed
                                                                  hover
                                                                  tableStyle={{background: 'white', fontSize: "15px"}}
                                                  >

                                                    <TableHeaderColumn dataAlign={"left"} dataField='tesco_week' isKey>Tesco
                                                      Week</TableHeaderColumn>
                                                    <TableHeaderColumn dataAlign={"left"} dataField='holiday_date'>Holiday
                                                      Date</TableHeaderColumn>
                                                    <TableHeaderColumn tdStyle={{whiteSpace: 'normal'}} dataAlign={"left"}
                                                                       dataField='holiday_description'>Holiday
                                                      Description</TableHeaderColumn>
                                                  </BootstrapTable>
                                                </div>
                                              )
                                            } else {
                                              return (
                                                <div className="text-center"><Spinner />Please Wait a Moment....!</div>)
                                            }

                                          })()}
                                        </div>
                                        {/*Button showing external driver trendto be put here*/}
                                        <div>
                                          <Button style={{marginTop: '2%', marginLeft: '38%', marginBottom: '2%'}}
                                                  onClick={() => {
                                                    let driverParam = "external";
                                                    this.props.onSaveDriverParam(driverParam);
                                                    this.setState({showExternalDriverModalValue: true})
                                                  }}>
                                            External Drivers Trend
                                          </Button>
                                        </div>
                                      </div>
                                    </div>)
                                  }
                                })()}
                                {/*Modal area under the overview*/}
                                {/*Overview-internal driver -- kpi contribution trend modal */}
                                <Modal show={this.state.showExternalDriverModal} bsSize="large"
                                       aria-labelledby="contained-modal-title-sm"
                                       onHide={() => {
                                         this.setState({showExternalDriverModal: false})
                                       }}>
                                  <Modal.Header>
                                    <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                                      style={{textAlign: 'center', fontSize: '20px'}}><b>KPI Contribution Trend</b><span
                                      style={{textAlign: 'right', float: 'right'}}
                                      onClick={() => this.setState({showExternalDriverModal: false})}><b>X</b></span></span>
                                      <div style={{textAlign: 'center'}}>
                                        <div style={{textAlign: 'right'}}>
                                        </div>
                                      </div>
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    {/*Overview-internal driver -- kpi contribution trend modal  */}
                                    <div className=" row mainBox">

                                      {(() => {
                                        if (this.props.Executive.value_internal_tab == 'kpi') {
                                          console.log("KPI div")
                                          return (
                                            <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">

                                              <h2 className="pageModuleSubTitle">KPI</h2>

                                              {(() => {
                                                if (this.props.Executive.drivers_internal_data && this.props.Executive.internalDriverSpinner) {
                                                  if (this.props.Executive.drivers_internal_data.kpi_data_available_flag == 'yes') {
                                                    return (
                                                      <StackedChart id="stackedChartKPI"
                                                                    data={this.props.Executive.drivers_internal_data.kpi}
                                                                    col_label={this.props.Executive.drivers_internal_data.kpi_col_label}
                                                                    legend_label={this.props.Executive.drivers_internal_data.kpi_legend_label}
                                                                    key_list={this.props.Executive.kpi_stack_key_list}/>
                                                    )
                                                  }
                                                  else {
                                                    return (
                                                      <div>
                                                        <h4> Data is available only for weeks from 201702</h4>
                                                      </div>
                                                    )
                                                  }

                                                }
                                                else {
                                                  return (
                                                    <div className="text-center"><Spinner />Please Wait a
                                                      Moment....!</div>)
                                                }
                                              })()}


                                            </div>
                                          )
                                        }
                                        else {
                                          return (
                                            <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                                              <h2 className="pageModuleSubTitle">Promotion</h2>
                                              {(() => {
                                                if (this.props.Executive.drivers_internal_data && this.props.Executive.internalDriverSpinner) {
                                                  return (
                                                    <StackedChart id="stackedChartPromotion"
                                                                  data={this.props.Executive.drivers_internal_data.promo}
                                                                  col_label={this.props.Executive.drivers_internal_data.promo_col_label}
                                                                  legend_label={this.props.Executive.drivers_internal_data.promo_legend_label}
                                                                  key_list={this.props.Executive.promo_stack_key_list}/>
                                                  )
                                                }
                                                else {
                                                  return (
                                                    <div className="text-center"><Spinner />Please Wait a
                                                      Moment....!</div>)
                                                }
                                              })()}
                                            </div>
                                          )
                                        }

                                      })()}

                                    </div>

                                  </Modal.Body>

                                </Modal>
                                {/*Overview-internal driver -- promotion trend modal*/}
                                <Modal show={this.state.showInternalPromoModal} bsSize="large"
                                       aria-labelledby="contained-modal-title-lg"
                                  // dialogClassName={'xlModal'}
                                       onHide={() => {
                                         this.setState({showInternalPromoModal: false})
                                       }}>
                                  <Modal.Header>
                                    <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                                      style={{textAlign: 'center', fontSize: '20px'}}><b>Promotion Contribution </b><span
                                      style={{textAlign: 'right', float: 'right'}}
                                      onClick={() => this.setState({showInternalPromoModal: false})}><b>X</b></span></span>
                                      <div style={{textAlign: 'center'}}>
                                        <div style={{textAlign: 'right'}}>
                                        </div>
                                      </div>
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <div className=" row mainBox">
                                    {/*Code for external drivers */}
                                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                                      <h2 className="pageModuleSubTitle">Promotion</h2>
                                      {(() => {
                                        if (this.props.Executive.drivers_internal_data && this.props.Executive.internalDriverSpinner) {
                                          return (
                                            <StackedChart id="stackedChartPromotion"
                                                          data={this.props.Executive.drivers_internal_data.promo}
                                                          col_label={this.props.Executive.drivers_internal_data.promo_col_label}
                                                          legend_label={this.props.Executive.drivers_internal_data.promo_legend_label}
                                                          key_list={this.props.Executive.promo_stack_key_list}/>
                                          )
                                        }
                                        else {
                                          return (
                                            <div className="text-center"><Spinner />Please Wait a
                                              Moment....!</div>)
                                        }
                                      })()}
                                    </div>

                                    </div>
                                  </Modal.Body>

                                </Modal>
                                <br/>
                                {/*Modal for external driver trend shwowing different weather*/
                                }
                                {/*Nita made this modal*/}
                                {/*Overview-external driver --modal*/}
                                <Modal show={this.state.showExternalDriverModalValue} bsSize="large"
                                       aria-labelledby="contained-modal-title-sm"
                                       dialogClassName={'xlModal'}
                                       onHide={() => {
                                         this.setState({showExternalDriverModalValue: false})
                                       }}>
                                  <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-sm text-center"
                                                 className="pageModuleSubTitle">External Drivers</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>


                                    <div className="mainBox">

                                      {/*Row for graph*/}
                                      <div className="row">
                                        <Nav style={{marginLeft: '1%', marginBottom: '0%'}} bsStyle="tabs"
                                             activeKey={this.state.activeKey10} onSelect={this.handleSelect}
                                             className="tabsCustom">
                                          <NavItem className="tabsNavPanelList1" eventKey="1" onClick={() => {

                                            let value_external_tab = "sunshine";
                                            this.setState({activeKey10: "1"});
                                            this.props.onSaveValueExternal(value_external_tab);

                                          }} style={{
                                            fontSize: '20px',
                                            fontFamily: 'Tesco',
                                            textDecoration: 'none'
                                          }}>
                                            <b style={{textDecoration: 'none'}}>Sunshine</b></NavItem>

                                          <NavItem className="tabsNavPanelList1" eventKey="2" onClick={() => {
                                            let value_external_tab = "rainfall";
                                            this.setState({activeKey10: "2"});
                                            this.props.onSaveValueExternal(value_external_tab);
                                          }} style={{
                                            fontSize: '20px',
                                            fontFamily: 'Tesco',
                                            textDecoration: 'none'
                                          }}><b
                                            style={{textDecoration: 'none'}}>Rainfall</b></NavItem>

                                          <NavItem className="tabsNavPanelList1" eventKey="3" onClick={() => {
                                            let value_external_tab = "temperature";
                                            this.setState({activeKey10: "3"});
                                            this.props.onSaveValueExternal(value_external_tab);
                                          }} style={{
                                            fontSize: '20px',
                                            fontFamily: 'Tesco',
                                            textDecoration: 'none'
                                          }}><b
                                            style={{textDecoration: 'none'}}>Temperature</b></NavItem>


                                        </Nav>

                                        {(() => {
                                          if (this.props.Executive.value_external_tab == 'rainfall' && this.props.Executive.externalDriverSpinner) {
                                            return (
                                              <div className="row mainBox">
                                                {/*<h3 className="pageModuleSubTitle">Rainfall</h3>*/}
                                                {(() => {
                                                  if (this.props.Executive.drivers_external_data) {
                                                    console.log("Promo Sales line chart data", this.props.Executive.drivers_external_data.rainfall);
                                                    return (
                                                      <div style={{marginLeft: "19%"}}>
                                                        <div style={{float: "right"}}>
                                                          <DropdownButton title=""
                                                                          className="glyphicon glyphicon-menu-hamburger"
                                                                          pullRight style={{
                                                            backgroundColor: "transparent",
                                                            borderColor: "transparent",
                                                            color: "#00539f"
                                                          }} id="dropButtonId">
                                                            <MenuItem onClick={() => {
                                                              saveImage(document.getElementById('rainfall_line' + '_svg'), "external_drivers_rainfall")
                                                            }
                                                            }>Save As JPEG</MenuItem>
                                                            <MenuItem onClick={() => {
                                                              saveDataAsCSV(this.props.Executive.drivers_external_data.rainfall, "external_drivers_rainfall.csv")
                                                            }
                                                            }>Download CSV</MenuItem>
                                                          </DropdownButton>
                                                        </div>
                                                        <MultilineThree
                                                          data={this.props.Executive.drivers_external_data.rainfall}
                                                          id="rainfall_line" label_ty="Rainfall TY"
                                                          label_ly="Rainfall LY"
                                                          xaxis_title="Tesco Week" no_pref='£' no_suffix=''
                                                          no_pref2='' no_suffix2=''
                                                          yaxis_title='Value' yaxis_title2='Weather'/>
                                                      </div>
                                                    );
                                                  }
                                                })()}
                                              </div>
                                            )
                                          }
                                          else {
                                            if (this.props.Executive.value_external_tab == 'sunshine' && this.props.Executive.externalDriverSpinner) {
                                              return (
                                                <div className="row mainBox">
                                                  {/*<h3 className="pageModuleSubTitle">Sunshine</h3>*/}
                                                  {(() => {
                                                    if (this.props.Executive.drivers_external_data) {
                                                      console.log("Promo Sales line chart data", this.props.Executive.drivers_external_data.sunshine);
                                                      return (
                                                        <div style={{
                                                          marginLeft: "19%"
                                                        }}>
                                                          <div style={{float: "right"}}>
                                                            <DropdownButton title=""
                                                                            className="glyphicon glyphicon-menu-hamburger"
                                                                            pullRight style={{
                                                              backgroundColor: "transparent",
                                                              borderColor: "transparent",
                                                              color: "#00539f"
                                                            }} id="dropButtonId">
                                                              <MenuItem onClick={() => {
                                                                saveImage(document.getElementById('sunshine_line' + '_svg'), "external_drivers_sunshine")
                                                              }
                                                              }>Save As JPEG</MenuItem>
                                                              <MenuItem onClick={() => {
                                                                saveDataAsCSV(this.props.Executive.drivers_external_data.sunshine, "external_drivers_sunshine.csv")
                                                              }
                                                              }>Download CSV</MenuItem>
                                                            </DropdownButton>
                                                          </div>
                                                          <MultilineThree
                                                            data={this.props.Executive.drivers_external_data.sunshine}
                                                            id="sunshine_line" label_ty="Sunshine TY"
                                                            label_ly="Sunshine LY"
                                                            xaxis_title="Tesco Week" no_pref='£' no_suffix=''
                                                            no_pref2='' no_suffix2=''
                                                            yaxis_title='Value' yaxis_title2='Sunshine'/>
                                                        </div>
                                                      );
                                                    }
                                                  })()}


                                                </div>
                                              )
                                            }
                                            else {
                                              if (this.props.Executive.externalDriverSpinner) {
                                                return (
                                                  <div className="row mainBox">
                                                    {/*<h3 className="pageModuleSubTitle">Temperature</h3>*/}
                                                    {(() => {
                                                      if (this.props.Executive.drivers_external_data) {
                                                        console.log("Promo Sales line chart data", this.props.Executive.drivers_external_data.temperature);
                                                        return (
                                                          <div style={{marginLeft: "19%"}}>
                                                            <div style={{float: "right"}}
                                                            >
                                                              <DropdownButton title=""
                                                                              className="glyphicon glyphicon-menu-hamburger"
                                                                              pullRight style={{
                                                                backgroundColor: "transparent",
                                                                borderColor: "transparent",
                                                                color: "#00539f"
                                                              }} id="dropButtonId">
                                                                <MenuItem onClick={() => {
                                                                  saveImage(document.getElementById('temperature_line' + '_svg'), "external_drivers_temperature")
                                                                }
                                                                }>Save As JPEG</MenuItem>
                                                                <MenuItem onClick={() => {
                                                                  saveDataAsCSV(this.props.Executive.drivers_external_data.temperature, "external_drivers_temperature.csv")
                                                                }
                                                                }>Download CSV</MenuItem>
                                                              </DropdownButton>
                                                            </div>
                                                            <MultilineThree
                                                              data={this.props.Executive.drivers_external_data.temperature}
                                                              id="temperature_line" label_ty="Temperature TY"
                                                              label_ly="Temperature LY"
                                                              xaxis_title="Tesco Week" no_pref='£' no_suffix=''
                                                              no_pref2='' no_suffix2=''
                                                              yaxis_title='Value' yaxis_title2='Temperature'/>
                                                          </div>
                                                        );
                                                      }
                                                    })()}
                                                  </div>
                                                )
                                              }
                                              else {
                                                return (<div className="text-center"><Spinner />Please Wait a
                                                  Moment....!</div>)
                                              }
                                            }
                                          }
                                        })()}
                                      </div>
                                    </div>
                                  </Modal.Body>
                                </Modal>
                              </div>
                            )
                          }
                          else {
                            if (this.props.Executive.kpi_param == 'kpi_type=Price') {

                              return (
                                <div>

                                  {/*Row for price KPIS*/}

                                  {(() => {
                                    if (this.props.Executive.priceKPISpinner) {
                                      return (
                                        <div className="row mainBox" style={{textAlign: 'center'}}>
                                          {/* Box for ASP */}
                                          <div className="col-md-4 col-xs-12 col-sm-4 col-lg-4"
                                               style={{backgroundColor: "#fafafa"}}>
                                            <Panel>
                                              <h3 className="pageModuleSubTitle"> ASP </h3>

                                              <div className="row">
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6">
                                                  <h3 style={{margin: "0"}}>
                                                    {this.props.Executive.price_kpi_data.ASP_abs}</h3>
                                                </div>
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6">
                                                  <h3 style={{margin: "0"}}>Fisher
                                                    Infl. &nbsp; {this.props.Executive.price_kpi_data.ASP_fisher_infl} </h3>
                                                </div>
                                              </div>

                                              <div className="row">
                                                <div className="panel-body cardPanel">
                                                  {(() => {
                                                    if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                      return (
                                                        <div className="col-md-4 col-xs-12 col-sm-4 col-lg-4 kpiSmall">
                                                          <h4>
                                              <span
                                                className={glyphiconFormatter(this.props.Executive.price_kpi_data.ASPInfl_var_wow)}>
                                              </span>{this.props.Executive.price_kpi_data.ASPInfl_var_wow}%
                                                          </h4>
                                                          <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                        </div>
                                                      )
                                                    }

                                                  })()}
                                                  <div className={(() => {
                                                    if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                      return (
                                                        "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                      )
                                                    }
                                                    else {
                                                      return (
                                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                      )
                                                    }
                                                  })()}>
                                                    <h4>
                                              <span
                                                className={glyphiconFormatter(this.props.Executive.price_kpi_data.ASPInfl_var_yoy)}>
                                              </span>{this.props.Executive.price_kpi_data.ASPInfl_var_yoy}%
                                                    </h4>
                                                    <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                  </div>

                                                  <div className={(() => {
                                                    if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                      return (
                                                        "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                      )
                                                    }
                                                    else {
                                                      return (
                                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                      )
                                                    }
                                                  })()}>
                                                    <h4>
                                              <span
                                                className={glyphiconFormatter(this.props.Executive.price_kpi_data.ASPInfl_var_lfl)}>
                                              </span>{this.props.Executive.price_kpi_data.ASPInfl_var_lfl}%
                                                    </h4>
                                                    <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                                  </div>
                                                </div>
                                              </div>

                                            </Panel>
                                          </div>
                                          {/* Box for ACP */}
                                          <div className='col-md-4 col-xs-12 col-sm-4 col-lg-4'
                                               style={{backgroundColor: "#fafafa"}}>
                                            <Panel>
                                              <h3 className="pageModuleSubTitle"> ACP </h3>
                                              <div className="row">
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6">
                                                  <h3 style={{margin: "0"}}>
                                                    {this.props.Executive.price_kpi_data.ACP_abs}</h3>
                                                </div>
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6">
                                                  <h3 style={{margin: "0"}}>Fisher
                                                    Infl. &nbsp; {this.props.Executive.price_kpi_data.ACP_fisher_infl} </h3>
                                                </div>
                                              </div>

                                              <div className="row">
                                                <div className="panel-body cardPanel">
                                                  <div className={(() => {
                                                    if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                      return (
                                                        "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                      )
                                                    }
                                                    else {
                                                      return (
                                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                      )
                                                    }
                                                  })()}>
                                                    <h4>
                                              <span
                                                className={glyphiconFormatter(this.props.Executive.price_kpi_data.ACPInfl_var_yoy)}>
                                              </span>{this.props.Executive.price_kpi_data.ACPInfl_var_yoy}%
                                                    </h4>
                                                    <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                  </div>

                                                  <div className={(() => {
                                                    if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                      return (
                                                        "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                      )
                                                    }
                                                    else {
                                                      return (
                                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                      )
                                                    }
                                                  })()}>
                                                    <h4>
                                              <span
                                                className={glyphiconFormatter(this.props.Executive.price_kpi_data.ACPInfl_var_lfl)}>
                                              </span>{this.props.Executive.price_kpi_data.ACPInfl_var_lfl}%
                                                    </h4>
                                                    <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                                  </div>

                                                  {(() => {
                                                    if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                      return (
                                                        <div className="col-md-4 col-xs-12 col-sm-4 col-lg-4 kpiSmall">
                                                          <h4>
                                              <span
                                                className={glyphiconFormatter(this.props.Executive.price_kpi_data.ACPInfl_var_wow)}>
                                              </span>{this.props.Executive.price_kpi_data.ACPInfl_var_wow}%
                                                          </h4>
                                                          <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                        </div>
                                                      )
                                                    }


                                                  })()}


                                                </div>
                                              </div>
                                            </Panel>
                                          </div>
                                          {/* Box for Price Index */}
                                          <div className='col-md-4 col-xs-12 col-sm-4 col-lg-4'
                                               style={{backgroundColor: "#fafafa"}}>
                                            <Panel>
                                              <h3 className="pageModuleSubTitle"> Price Index </h3>
                                              <div className="row">
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6">
                                                  <h3 style={{margin: "0"}}>vs ASDA  &nbsp; </h3>
                                                </div>
                                                <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6">
                                                  <h3 style={{margin: "0"}}>
                                                    Index &nbsp; {this.props.Executive.price_kpi_data.price_index_cw} </h3>
                                                </div>
                                              </div>

                                              <div className="row">
                                                <div className="panel-body cardPanel">

                                                  {(() => {
                                                    if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                      return (
                                                        <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12 kpiSmall">
                                                          <h4>
                                                      <span
                                                        className={glyphiconFormatter(this.props.Executive.price_kpi_data.price_index_var_wow)}>
                                                      </span>{this.props.Executive.price_kpi_data.price_index_var_wow}%
                                                          </h4>
                                                          <h5 className="kpiSubTitle"><b>WoW</b></h5>

                                                        </div>
                                                      )
                                                    }


                                                  })()}


                                                </div>
                                              </div>
                                            </Panel>
                                          </div>

                                        </div>
                                      )
                                    }
                                    else {
                                      return (
                                        <div className="text-center"><Spinner />Please Wait a Moment....!</div>
                                      )
                                    }
                                  })()}
                                </div>
                              )
                            }

                            else {
                              return (
                                <div className="coverBox">
                                  {/*Row for KPIS*/}
                                  {(() => {
                                    if (this.props.Executive.KPISpinner) {
                                      return (
                                        <div className="row mainBox" style={{marginTop: '1%'}}>
                                          {/*Block for total*/}

                                          <div className={(() => {
                                            if (this.props.Executive.kpi_param == 'kpi_type=Value' || this.props.Executive.kpi_param == 'kpi_type=Volume') {
                                              return "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                            }
                                            else {
                                              return "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                            }
                                          })()} style={{
                                            backgroundColor: "#eee #eee #ddd",
                                            borderRight: "1px solid #e5e8ea",
                                            paddingLeft: '15px',
                                            paddingRight: '15px'
                                          }}>
                                            <Panel>
                                              <h3 className="pageModuleSubTitle">
                                                Total {this.props.Executive.kpi_boxes_data.kpi_name} </h3>
                                              <div>
                                                <div className="row">
                                                  <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                       style={{textAlign: 'center'}}>

                                                    <h3 style={{
                                                      padding: "0px",
                                                      margin: "0px"
                                                    }}>{this.props.Executive.kpi_boxes_data.total_value.total}</h3>
                                                  </div>
                                                  <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                       style={{textAlign: 'center'}}>
                                                    <h3 style={{padding: "0px", margin: "0px"}}>
                                                      LFL TY &nbsp; {this.props.Executive.kpi_boxes_data.total_value.total_lfl} </h3>
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="panel-body cardPanel">

                                                    {(() => {
                                                      if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                        return (
                                                          <div className="col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall">
                                                            <h4>
                                                <span
                                                  className={glyphiconFormatter(this.props.Executive.kpi_boxes_data.total_value.wow)}>
                                                </span>{this.props.Executive.kpi_boxes_data.total_value.wow}%
                                                            </h4>
                                                            <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                          </div>
                                                        )
                                                      }

                                                    })()}


                                                    <div className={(() => {
                                                      if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                        return (
                                                          "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                        )
                                                      }
                                                      else {
                                                        return (
                                                          "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                        )
                                                      }
                                                    })()}>
                                                      <h4>
                                                <span
                                                  className={glyphiconFormatter(this.props.Executive.kpi_boxes_data.total_value.yoy)}>
                                                </span>{this.props.Executive.kpi_boxes_data.total_value.yoy}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                    </div>
                                                    <div className={(() => {
                                                      if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                        return (
                                                          "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                        )
                                                      }
                                                      else {
                                                        return (
                                                          "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                        )
                                                      }
                                                    })()}>
                                                      <h4>
                                                <span
                                                  className={glyphiconFormatter(this.props.Executive.kpi_boxes_data.total_value.lfl)}>
                                                </span>{this.props.Executive.kpi_boxes_data.total_value.lfl}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </Panel>
                                          </div>

                                          {/*Block for contribution to growth*/}
                                          <div className={(() => {
                                            if (this.props.Executive.kpi_param == 'kpi_type=Value' || this.props.Executive.kpi_param == 'kpi_type=Volume') {
                                              return "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                            }
                                            else {
                                              return "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                            }
                                          })()} style={{
                                            backgroundColor: "#eee #eee #ddd",
                                            borderRight: "1px solid #e5e8ea",
                                            paddingLeft: '15px',
                                            paddingRight: '15px'
                                          }}>
                                            <Panel>
                                              <h3 className="pageModuleSubTitle"> Contribution to Growth </h3>
                                              <div>
                                                <div className="row">
                                                  <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                       style={{textAlign: 'center'}}>
                                                    <h3 style={{
                                                      padding: "0px",
                                                      margin: "0px"
                                                    }}>{this.props.Executive.kpi_boxes_data.growth.total}</h3>
                                                  </div>
                                                  <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                       style={{textAlign: 'center'}}>
                                                    <h3 style={{padding: "0px", margin: "0px"}}>
                                                      LFL TY &nbsp; {this.props.Executive.kpi_boxes_data.growth.total_lfl} </h3>
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="panel-body cardPanel">

                                                    {(() => {
                                                      if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                        return (
                                                          <div className="col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall">
                                                            <h4>
                                                <span
                                                  className={glyphiconFormatter(this.props.Executive.kpi_boxes_data.growth.wow)}>
                                                </span>{this.props.Executive.kpi_boxes_data.growth.wow}% &nbsp;of &nbsp;
                                                              <span
                                                                className={glyphiconFormatter(this.props.Executive.kpi_boxes_data.growth.of_wow)}>
                                                </span>{this.props.Executive.kpi_boxes_data.growth.of_wow}%
                                                            </h4>
                                                            <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                          </div>
                                                        )
                                                      }

                                                    })()}


                                                    <div className={(() => {
                                                      if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                        return (
                                                          "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                        )
                                                      }
                                                      else {
                                                        return (
                                                          "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                        )
                                                      }
                                                    })()}>
                                                      <h4>
                                                <span
                                                  className={glyphiconFormatter(this.props.Executive.kpi_boxes_data.growth.yoy)}>
                                                </span>{this.props.Executive.kpi_boxes_data.growth.yoy}% &nbsp;of &nbsp;
                                                        <span
                                                          className={glyphiconFormatter(this.props.Executive.kpi_boxes_data.growth.of_yoy)}>
                                                </span>{this.props.Executive.kpi_boxes_data.growth.of_yoy}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                    </div>

                                                    <div className={(() => {
                                                      if (this.props.Executive.week_param == 'week_flag=Selected Week') {
                                                        return (
                                                          "col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall"
                                                        )
                                                      }
                                                      else {
                                                        return (
                                                          "col-md-6 col-xs-12 col-sm-6 col-lg-6 kpismall"
                                                        )
                                                      }
                                                    })()}>
                                                      <h4>
                                                <span
                                                  className={glyphiconFormatter(this.props.Executive.kpi_boxes_data.growth.lfl)}>
                                                </span>{this.props.Executive.kpi_boxes_data.growth.lfl}% &nbsp;of &nbsp;
                                                        <span
                                                          className={glyphiconFormatter(this.props.Executive.kpi_boxes_data.growth.of_lfl)}>
                                                </span>{this.props.Executive.kpi_boxes_data.growth.of_lfl}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                                    </div>

                                                  </div>
                                                </div>
                                              </div>
                                            </Panel>
                                          </div>

                                        </div>
                                      )
                                    }
                                    else {
                                      return (<div className="text-center"><Spinner />Please Wait a Moment....!</div>)
                                    }
                                  })()}


                                  {/*Row for best and worst performances*/}
                                  <div className="headerBox">
                                    <h2 className="pageModuleMainTitle">Best and Worst Performances</h2>
                                  </div>
                                  <div className="row mainBox">
                                    <div className={(() => {
                                      if (this.props.Executive.best_worst_data.Choose_filters == 'no') {

                                        if (this.props.Executive.best_worst_data.length_less_than_five == 'yes') {

                                          return ("col-md-12 col-xs-12 col-sm-12 col-lg-12")
                                        }
                                        else {
                                          return ("col-md-6 col-xs-12 col-sm-6 col-lg-6")
                                        }
                                      }
                                      else {
                                        return ("col-md-6 col-xs-12 col-sm-6 col-lg-6")
                                      }
                                    })()}>

                                      <Modal show={this.state.lgValidation} bsSize="large"
                                             aria-labelledby="contained-modal-title-sm"
                                             onHide={() => {
                                               this.setState({lgValidation: false})
                                             }}>
                                        <Modal.Header closeButton>
                                          <Modal.Title id="contained-modal-title-sm text-center" className="bodySubTitle">Trended
                                            Performance</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          {(() => {
                                            if (this.props.Executive.best_info_data && this.props.Executive.best_info_data.top_5_supp) {
                                              return (
                                                <BootstrapTable data={this.props.Executive.best_info_data.top_5_supp}
                                                                exportCSV={ true }
                                                                search={ true }
                                                                pagination striped hover condensed>

                                                  <TableHeaderColumn dataField='parent_supplier'
                                                                     dataAlign='center' isKey
                                                                     tdStyle={{fontSize: '14px'}}
                                                                     thStyle={{whiteSpace: 'normal', fontSize: '15px'}}>Parent
                                                    Supplier</TableHeaderColumn>
                                                  <TableHeaderColumn dataField='grouped_ty'
                                                                     dataAlign='center'
                                                                     tdStyle={{fontSize: '14px'}}
                                                                     thStyle={{whiteSpace: 'normal', fontSize: '15px'}}>Grouped
                                                    TY</TableHeaderColumn>
                                                  <TableHeaderColumn dataField='cont_to_grwth'
                                                                     dataAlign='center'
                                                                     tdStyle={{fontSize: '14px'}}
                                                                     thStyle={{whiteSpace: 'normal', fontSize: '15px'}}>Contribution
                                                    to Growth</TableHeaderColumn>
                                                  <TableHeaderColumn dataField='grouped_ly'
                                                                     dataAlign='center'
                                                                     tdStyle={{fontSize: '14px'}}

                                                                     thStyle={{whiteSpace: 'normal', fontSize: '15px'}}>Grouped
                                                    LY</TableHeaderColumn>
                                                  <TableHeaderColumn dataFormat={cellButton}
                                                                     dataAlign='center'
                                                                     tdStyle={{fontSize: '14px'}}

                                                                     thStyle={{whiteSpace: 'normal', fontSize: '15px'}}>Grouped
                                                    TY</TableHeaderColumn>
                                                  <TableHeaderColumn dataFormat={(row, cell) => {
                                                    return (
                                                      <div>
                                                        <button className="btn btn-success" onClick={() => {
                                                          topName = this.props.Executive.best_worst_data.top_5[0].name;
                                                          topName = "selected_level=" + topName;
                                                          this.props.onSaveTopName(topName);
                                                          let topbotflag = 'top';
                                                          this.props.onSaveTopBotFlag(topbotflag);
                                                          console.log("topName1", topName);
                                                          this.setState({activeKey5: "1"});
                                                          this.props.loadBestInfoData();
                                                          this.setState({lgValidation: true})
                                                        }}>Show info
                                                        </button>
                                                      </div>
                                                    );

                                                  }}
                                                                     dataAlign='center'
                                                                     thStyle={{whiteSpace: 'normal'}}>grouped_ly
                                                    2</TableHeaderColumn>
                                                </BootstrapTable>
                                              )
                                            }
                                          })()}

                                        </Modal.Body>
                                      </Modal>

                                      <Modal show={this.state.modalGraphTopBot} bsSize="large"
                                             aria-labelledby="contained-modal-title-sm"
                                             dialogClassName={'mdModal'}
                                             onHide={() => {
                                               this.setState({modalGraphTopBot: false})
                                             }}>
                                        <Modal.Header>
                                          <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                                            style={{textAlign: 'center', fontSize: '20px'}}><b>Trended Performance</b><span
                                            style={{textAlign: 'right', float: 'right'}}
                                            onClick={() => this.setState({modalGraphTopBot: false})}><b>X</b></span></span>
                                            <div style={{textAlign: 'center'}}>
                                              <div style={{textAlign: 'right'}}>
                                              </div>
                                            </div>
                                          </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>

                                          {(() => {
                                            if (this.props.Executive.best_info_data.fetch == "success") {
                                              console.log("Executive.top_name == 'None");
                                              if (this.props.Executive.top_name != 'None') {
                                                return (
                                                  <div className="row" style={{paddingTop: "15px"}}>

                                                    {(() => {
                                                      if (this.props.Executive.best_info_data.fetch == 'success') {
                                                        return (
                                                          <div>


                                                            {/*Row for Multiline Chart*/}
                                                            <div className="row" style={{marginLeft:"2%"}}>
                                                              <div
                                                                className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                                                                <MultilinePromo
                                                                  data={this.props.Executive.best_info_data.multiline_trend}
                                                                  id="top_trend_modal"
                                                                  label_ty={this.props.Executive.best_info_data.legend1}
                                                                  label_ly={this.props.Executive.best_info_data.legend2}
                                                                  xaxis_title="Tesco Week"
                                                                  no_pref={this.props.Executive.best_info_data.no_pref}
                                                                  no_suffix=''
                                                                  yaxis_title={this.props.Executive.best_info_data.kpi_type}/>
                                                              </div>
                                                            </div>
                                                            {/*Row for KPIs*/}
                                                            <div className="row">
                                                              <div className="panel-body cardPanel">
                                                                <div className="col-sm-12 col-md-12 col-xs-12-lg-12">
                                                                  <div
                                                                    className="col-md-4 col-xs-12 col-sm-3 col-lg-4 kpismall"
                                                                    style={{
                                                                      borderRight: "1px solid rgb(229, 232, 234)",
                                                                      padding: "0",
                                                                      textAlign: "center"
                                                                    }}>
                                                                    <h4 style={{fontWeight: "700"}}>
                                                                  <span
                                                                    className={glyphiconFormatter(this.props.Executive.best_info_data.yoy_var)}>
                                                                  </span>{this.props.Executive.best_info_data.yoy_var}%
                                                                    </h4>
                                                                    <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                                  </div>

                                                                  <div
                                                                    className="col-md-4 col-xs-12 col-sm-3 col-lg-4 kpismall"
                                                                    style={{
                                                                      borderRight: "1px solid rgb(229, 232, 234)",
                                                                      padding: "0",
                                                                      textAlign: "center"
                                                                    }}>
                                                                    <h4 style={{fontWeight: "700"}}>
                                                                  <span
                                                                    className={glyphiconFormatter(this.props.Executive.best_info_data.cont_to_grwth)}>
                                                                  </span>{this.props.Executive.best_info_data.cont_to_grwth}%
                                                                    </h4>
                                                                    <h4 className="kpiSubTitle">Contribution to
                                                                      growth</h4>
                                                                  </div>

                                                                    <div
                                                                    className="col-md-4 col-xs-12 col-sm-3 col-lg-4 kpismall"
                                                                    style={{
                                                                      borderRight: "1px solid rgb(229, 232, 234)",
                                                                      padding: "0",
                                                                      textAlign: "center"
                                                                    }}>
                                                                    <h4 style={{fontWeight: "700"}}>
                                                                      {this.props.Executive.best_info_data.sales_share}%
                                                                    </h4>
                                                                    <h4 className="kpiSubTitle">Sales Share</h4>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>


                                                          </div>
                                                        )
                                                      }
                                                    })()}

                                                  </div>
                                                )
                                              }
                                              else {
                                                return (
                                                  <div><h3>Loading...</h3></div>
                                                )
                                              }
                                            }
                                            else {
                                              console.log("Executive.top_name == Not None");
                                              return (
                                                <div>
                                                  <h3>Loading...</h3>
                                                </div>
                                              )
                                            }
                                          })()}
                                        </Modal.Body>
                                      </Modal>

                                      <Modal show={this.state.modalTableTopBot} bsSize="large"
                                             aria-labelledby="contained-modal-title-sm"
                                             onHide={() => {
                                               this.setState({modalTableTopBot: false})
                                             }}>
                                        <Modal.Header>
                                          <Modal.Title id="contained-modal-title-sm text-center" className="bodySubTitle">Trended
                                            Performance</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>

                                          {(() => {
                                            if (this.props.Executive.best_info_data.fetch == "success") {
                                              console.log("Executive.top_name == 'None");
                                              if (this.props.Executive.top_name != 'None') {
                                                return (
                                                  <div className="row" style={{paddingTop: "15px"}}>

                                                    {(() => {
                                                      if (this.props.Executive.best_info_data.fetch == 'success') {
                                                        return (
                                                          <div>


                                                            {/*Row for Multiline Chart*/}
                                                            <div className="row">
                                                              <div
                                                                className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                                                                <MultilinePromo
                                                                  data={this.props.Executive.best_info_data.multiline_trend}
                                                                  id="top_trend_modal"
                                                                  label_ty={this.props.Executive.best_info_data.legend1}
                                                                  label_ly={this.props.Executive.best_info_data.legend2}
                                                                  xaxis_title="Tesco Week"
                                                                  no_pref={this.props.Executive.best_info_data.no_pref}
                                                                  no_suffix=''
                                                                  yaxis_title={this.props.Executive.best_info_data.kpi_type}/>
                                                              </div>
                                                            </div>
                                                            {/*Row for KPIs*/}
                                                            <div className="row">
                                                              <div className="panel-body cardPanel">
                                                                <div
                                                                  className="col-sm-12 col-md-12 col-xs-12-lg-12">
                                                                  <div
                                                                    className="col-md-3 col-xs-12 col-sm-3 col-lg-3 kpismall"
                                                                    style={{
                                                                      borderRight: "1px solid rgb(229, 232, 234)",
                                                                      padding: "0",
                                                                      textAlign: "center"
                                                                    }}>
                                                                    <h4 style={{fontWeight: "700"}}>
                                                                  <span
                                                                    className={glyphiconFormatter(this.props.Executive.best_info_data.yoy_var)}>
                                                                  </span>{this.props.Executive.best_info_data.yoy_var}%
                                                                    </h4>
                                                                    <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                                  </div>

                                                                  <div
                                                                    className="col-md-3 col-xs-12 col-sm-3 col-lg-3 kpismall"
                                                                    style={{
                                                                      borderRight: "1px solid rgb(229, 232, 234)",
                                                                      padding: "0",
                                                                      textAlign: "center"
                                                                    }}>
                                                                    <h4 style={{fontWeight: "700"}}>
                                                                  <span
                                                                    className={glyphiconFormatter(this.props.Executive.best_info_data.cont_to_grwth)}>
                                                                  </span>{this.props.Executive.best_info_data.cont_to_grwth}%
                                                                    </h4>
                                                                    <h4 className="kpiSubTitle">Contribution to
                                                                      growth</h4>
                                                                  </div>

                                                                  <div
                                                                    className="col-md-3 col-xs-12 col-sm-3 col-lg-3 kpismall"
                                                                    style={{
                                                                      borderRight: "1px solid rgb(229, 232, 234)",
                                                                      padding: "0",
                                                                      textAlign: "center"
                                                                    }}>
                                                                    <h4 style={{fontWeight: "700"}}>
                                                                      {this.props.Executive.best_info_data.sales_share}%
                                                                    </h4>
                                                                    <h4 className="kpiSubTitle">Sales Share</h4>
                                                                  </div>

                                                                  <div
                                                                    className="col-md-3 col-xs-12 col-sm-3 col-lg-3 kpismall"
                                                                    style={{padding: '3%'}}>
                                                                    <button
                                                                      type="button"
                                                                      className="btn btn-primary"
                                                                      onClick={() => {
                                                                        suppName = 'None';
                                                                        this.props.onSaveSupplierName(suppName);
                                                                        this.setState({topsuppInfo: true});
                                                                      }}
                                                                    >
                                                                      Supplier Info
                                                                    </button>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )
                                                      }
                                                    })()}

                                                  </div>
                                                )
                                              }
                                              else {
                                                return (
                                                  <div><h3>Old data present</h3></div>
                                                )
                                              }

                                            }
                                            else {
                                              console.log("Executive.top_name == Not None");
                                              return (
                                                <div>
                                                  <h3> Please select an option to view performance</h3>
                                                </div>
                                              )
                                            }
                                          })()}
                                        </Modal.Body>
                                      </Modal>
                                    </div>

                                    {/*Showing the supplier info. table in value */}
                                    {(() => {
                                      if (this.props.Executive.bestWorstPerformance) {
                                        return (
                                          <BootstrapTable data={this.props.Executive.bestWorstPerformance.table_data}
                                                          exportCSV={ true }
                                                          search={ true }
                                                          pagination striped hover condensed>
                                            <TableHeaderColumn dataField='level'
                                                               dataAlign='center' isKey
                                                               tdStyle={{fontSize: '14px'}}

                                                               thStyle={{
                                                                 whiteSpace: 'normal',
                                                                 fontSize: '14px'
                                                               }}>{this.props.Executive.bestWorstPerformance.level}</TableHeaderColumn>
                                            <TableHeaderColumn dataField='rolled_up_level'
                                                               dataAlign='center'
                                                               tdStyle={{fontSize: '14px'}}
                                                               thStyle={{
                                                                 whiteSpace: 'normal',
                                                                 fontSize: '14px'
                                                               }}>{this.props.Executive.bestWorstPerformance.rolled_up_level}</TableHeaderColumn>
                                            <TableHeaderColumn dataField='sales_share'
                                                               dataAlign='center'
                                                               dataFormat={addPerc}
                                                               dataSort={true}
                                                               tdStyle={{fontSize: '14px'}}

                                                               thStyle={{whiteSpace: 'normal', fontSize: '14px'}}>Sales
                                              Share</TableHeaderColumn>
                                            <TableHeaderColumn dataField='cont_to_grwth'
                                                               dataAlign='center'
                                                               dataSort={true}
                                                               dataFormat={addPerc}
                                                               tdStyle={{fontSize: '14px',}}

                                                               thStyle={{whiteSpace: 'normal', fontSize: '14px'}}>Contribution
                                              to Growth</TableHeaderColumn>
                                            <TableHeaderColumn dataField='yoy_var'
                                                               dataAlign='center'
                                                               dataFormat={addPerc}
                                                               dataSort={true}
                                                               tdStyle={{fontSize: '14px'}}

                                                               thStyle={{whiteSpace: 'normal', fontSize: '14px'}}>YoY
                                              variation</TableHeaderColumn>
                                            <TableHeaderColumn dataField='value_ty'
                                                               dataAlign='center'
                                                               dataFormat={formatVolume}
                                                               dataSort={true}
                                                               tdStyle={{fontSize: '14px',}}

                                                               thStyle={{
                                                                 whiteSpace: 'normal',
                                                                 fontSize: '14px'
                                                               }}>{this.props.Executive.bestWorstPerformance.kpi_type} &nbsp;
                                              TY</TableHeaderColumn>
                                            <TableHeaderColumn dataField='value_ly'
                                                               dataAlign='center'
                                                               dataFormat={formatVolume}
                                                               dataSort={true}
                                                               tdStyle={{fontSize: '14px',}}

                                                               thStyle={{
                                                                 whiteSpace: 'normal',
                                                                 fontSize: '14px'
                                                               }}>{this.props.Executive.bestWorstPerformance.kpi_type} &nbsp;
                                              LY</TableHeaderColumn>
                                            <TableHeaderColumn dataField='junior_buyer' dataFormat={cellButton}
                                                               dataAlign='center'
                                                               thStyle={{whiteSpace: 'normal', fontSize: '14px'}}>Supplier
                                              Info.</TableHeaderColumn>
                                            <TableHeaderColumn dataField='index' dataFormat={cellButton2}
                                                               dataAlign='center'
                                                               tdStyle={{fontSize: '14px'}}

                                                               thStyle={{
                                                                 whiteSpace: 'normal',
                                                                 fontSize: '14px'
                                                               }}>Trend</TableHeaderColumn>
                                          </BootstrapTable>
                                        )
                                      } else {

                                        return (
                                          <div className="row">
                                            <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                                              <div className="text-center"><Spinner />Please Wait a
                                                Moment....!
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      }
                                    })()}

                                  </div>
                                </div>
                              )
                            }

                          }
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          })()}



          {/*MODAL FOR top - Supplier Info*/}
          <Modal show={this.state.topsuppInfo} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg"
                 onHide={() => {
                   this.setState({topsuppInfo: false})
                 }}
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                style={{textAlign: 'center', fontSize: '20px'}}><b>Supplier Info</b><span
                style={{textAlign: 'right', float: 'right'}}
                onClick={() => this.setState({topsuppInfo: false})}><b>X</b></span></span>
                <div style={{textAlign: 'center'}}>
                  <div style={{textAlign: 'right'}}>
                  </div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{fontSize: '14px'}}>
              <BootstrapTable className="promoTable"
                              data={this.props.Executive.bestWorstPerformanceTable}
                              pagination={true} options={options}
                              striped={true}
                              condensed>

                <TableHeaderColumn dataAlign={"left"}
                                   dataField='parent_supplier' isKey>Parent Supplier</TableHeaderColumn>

                <TableHeaderColumn tdStyle={{whiteSpace: 'normal'}}
                                   dataFormat={addPerc}
                                   dataSort={true}
                                   dataAlign={"left"}
                                   dataField='imp_to_ps'>Importance to Parent Supplier</TableHeaderColumn>
                <TableHeaderColumn tdStyle={{whiteSpace: 'normal'}}
                                   dataFormat={addPerc}
                                   dataSort={true}
                                   dataAlign={"left"}
                                   dataField='imp_to_categ'>Importance to Category</TableHeaderColumn>
                <TableHeaderColumn tdStyle={{whiteSpace: 'normal'}}
                                   dataFormat={addPerc}
                                   dataSort={true}
                                   dataAlign={"left"}
                                   dataField='sales_share'>Sales Share</TableHeaderColumn>

                <TableHeaderColumn tdStyle={{whiteSpace: 'normal'}}
                                   dataFormat={addPerc}
                                   dataSort={true}
                                   dataAlign={"left"}
                                   dataField='cont_to_grwth'>Contribution to growth</TableHeaderColumn>

                <TableHeaderColumn tdStyle={{whiteSpace: 'normal'}}
                                   dataFormat={addPerc}
                                   dataSort={true}
                                   dataAlign={"left"}
                                   dataField='yoy_var'>YoY Variation</TableHeaderColumn>
              </BootstrapTable>
            </Modal.Body>
          </Modal>


          {/*MODAL FOR bot - Supplier Info*/}

          <Modal show={this.state.botsuppInfo} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg"
                 onHide={() => {
                   this.setState({botsuppInfo: false})
                 }}>
            <Modal.Header>

              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                style={{textAlign: 'center', fontSize: '20px'}}><b>Supplier Info</b><span
                style={{textAlign: 'right', float: 'right'}}
                onClick={() => this.setState({botsuppInfo: false})}><b>X</b></span></span>
                <div style={{textAlign: 'center'}}>
                  <div style={{textAlign: 'right'}}>
                  </div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{fontSize: '14px'}}>
              <div className="row">
                <div className="col-md-4 col-xs-12 col-sm-4 col-lg-4">
                  {(() => {
                    if (this.props.Executive.bot_name != 'None') {
                      return (
                        <Nav bsStyle="tabs" activeKey={this.state.activeKey8} onSelect={this.handleSelect}
                             className="tabsCustom2">
                          <NavItem className="tabsCustomList2" eventKey="1" onClick={() => {
                            suppName = this.props.Executive.worst_info_data.bot_5_supp[0].parent_supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey8: "1"});
                            this.props.loadBotSupplierInfoData();

                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                            <b
                              style={{textDecoration: 'none'}}>{this.props.Executive.worst_info_data.bot_5_supp[0].parent_supplier}</b></NavItem>

                          <NavItem className="tabsCustomList2" eventKey="2" onClick={() => {
                            suppName = this.props.Executive.worst_info_data.bot_5_supp[1].parent_supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey8: "2"});
                            this.props.loadBotSupplierInfoData();
                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                            style={{textDecoration: 'none'}}>{this.props.Executive.worst_info_data.bot_5_supp[1].parent_supplier}</b></NavItem>

                          <NavItem className="tabsCustomList2" eventKey="3" onClick={() => {
                            suppName = this.props.Executive.worst_info_data.bot_5_supp[2].parent_supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey8: "3"});
                            this.props.loadBotSupplierInfoData();
                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                            style={{textDecoration: 'none'}}>{this.props.Executive.worst_info_data.bot_5_supp[2].parent_supplier}</b></NavItem>

                          <NavItem className="tabsCustomList2" eventKey="4" onClick={() => {
                            suppName = this.props.Executive.worst_info_data.bot_5_supp[3].parent_supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey8: "4"});
                            this.props.loadBotSupplierInfoData();

                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                            style={{textDecoration: 'none'}}>{this.props.Executive.worst_info_data.bot_5_supp[3].parent_supplier} %</b></NavItem>

                          <NavItem className="tabsCustomList2" eventKey="5" onClick={() => {
                            suppName = this.props.Executive.worst_info_data.bot_5_supp[4].parent_supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey8: "5"});
                            this.props.loadBotSupplierInfoData();
                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                            style={{textDecoration: 'none'}}>{this.props.Executive.worst_info_data.bot_5_supp[4].parent_supplier}%</b></NavItem>
                        </Nav>
                      );
                    }
                  })()}


                </div>
                <div className="col-md-8 col-xs-12">
                  {(() => {
                    if (this.props.Executive.bot_supp_info_data) {
                      if (this.props.Executive.supplier_name != 'None') {
                        return (
                          <div>
                            {/*Row for KPIs*/}
                            <div className="row">
                              <div className="panel-body cardPanel">
                                <div className="col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall">
                                  <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.Executive.bot_supp_info_data.yoy_var)}>
                                    </span>{this.props.Executive.bot_supp_info_data.yoy_var}%
                                  </h4>
                                  <h4 className="kpiSubTitle"><b>YoY</b></h4>
                                </div>

                                <div className="col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall">
                                  <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.Executive.bot_supp_info_data.cont_to_grwth)}>
                                    </span>{this.props.Executive.bot_supp_info_data.cont_to_grwth}%
                                  </h4>
                                  <h4 className="kpiSubTitle">Contri to growth</h4>
                                </div>

                                <div className="col-md-4 col-xs-12 col-sm-4 col-lg-4 kpismall">
                                  <h4>sales_share
                                    {this.props.Executive.bot_supp_info_data.sales_share}%
                                  </h4>
                                  <h4 className="kpiSubTitle">Sales Share</h4>
                                </div>

                              </div>
                            </div>
                            <div style={{height: '10%', width: '100%'}}>&nbsp;</div>
                            {/*Row for Gauge Charts*/}
                            <div className="row">
                              <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                   style={{fontSize: "10px", textAlign: "center"}}>
                                <b style={{fontSize: "15px"}}>Importance to Supplier</b>
                                <GaugeChart2 data={[this.props.Executive.bot_supp_info_data.imp_to_supp]}
                                             id="bot_gauge1"/>
                              </div>
                              <div className="col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                   style={{fontSize: "10px", textAlign: "center"}}>
                                <b style={{fontSize: "15px"}}>Importance to Category</b>
                                <GaugeChart2 data={[this.props.Executive.bot_supp_info_data.imp_to_categ]}
                                             id="bot_gauge2"/>
                              </div>
                            </div>
                          </div>

                        );
                      }
                      else {
                        return (<div><h3>Old data present</h3></div>);
                      }
                    }
                    else {
                      return (
                        <div>
                          <h3>
                            Select a supplier to view information 2
                          </h3>
                        </div>
                      )
                    }
                  })()}
                </div>

              </div>

            </Modal.Body>
          </Modal>


        </div>
      </div>
    );
  }
}

Executive.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Executive: makeSelectExecutive(),
});

function mapDispatchToProps(dispatch) {
  return {
    //Overview
    onSaveDriverParam: (e) => dispatch(SaveDriverParam(e)),
    loadOverviewKpi: (e) => dispatch(OverviewKpiData(e)),
    loadRolesAndIntent: (e) => dispatch(RolesAndIntentData(e)),
    loadBudgetAndForecast: (e) => dispatch(BudgetAndForecastData(e)),
    loadOverviewKpiTrend: (e) => dispatch(OverviewKpiTrendData(e)),
    loadOverviewDriversInternal: (e) => dispatch(OverviewDriversInternalData(e)),
    loadOverviewDriversExternal: (e) => dispatch(OverviewDriversExternalData(e)),

    loadKpiBoxes: (e) => dispatch(KpiBoxesData(e)),
    loadBestWorst: (e) => dispatch(BestWorstData(e)),
    loadBestInfoData: (e) => dispatch(BestInfoData(e)),
    loadWorstInfoData: (e) => dispatch(WorstInfoData(e)),
    loadSupplierInfoData: (e) => dispatch(SupplierInfoData(e)),
    loadTopSupplierInfoData: (e) => dispatch(TopSupplierInfoData(e)),
    loadBotSupplierInfoData: (e) => dispatch(BotSupplierInfoData(e)),
    loadDriversInternalData: (e) => dispatch(DriversInternalData(e)),
    loadDriversExternalData: (e) => dispatch(DriversExternalData(e)),
    loadPriceKPIData: (e) => dispatch(PriceKPIData(e)),
    //Top Nav bars
    onSaveWeekParam: (e) => dispatch(SaveWeekParam(e)),
    onSaveKPIParam: (e) => dispatch(SaveKPIParam(e)),

    //Filters

    onGetFilter: (e) => dispatch(getFilter(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
    onGetWeekFilter: (e) => dispatch(getWeekFilter(e)),
    onSaveWeekFilterParam: (e) => dispatch(WeekFilterParam(e)),
    onSaveStoreFilterParam: (e) => dispatch(StoreFilterParam(e)),
    onSaveFilteredFlag: (e) => dispatch(SaveFilteredFlag(e)),
    onSaveTopName: (e) => dispatch(SaveTopName(e)),
    onSaveBotName: (e) => dispatch(SaveBotName(e)),
    onSaveSupplierName: (e) => dispatch(SaveSupplierName(e)),
    onSaveTopBotFlag: (e) => dispatch(SaveTopBotFlag(e)),
    onSaveValueInternal: (e) => dispatch(SaveValueInternal(e)),
    onSaveValueExternal: (e) => dispatch(SaveValueExternal(e)),
    spinnerRolesAndIntent: (e) => dispatch(spinnerRolesAndIntent(e)),
    spinnerOverviewKPITrend: (e) => dispatch(spinnerOverviewKPITrend(e)),
    spinnerOverviewKPI: (e) => dispatch(spinnerOverviewKPI(e)),
    spinnerOverviewInternalDrivers: (e) => dispatch(spinnerOverviewInternalDrivers(e)),
    spinnerOverviewExternalDrivers: (e) => dispatch(spinnerOverviewExternalDrivers(e)),
    spinnerKPI: (e) => dispatch(spinnerKPI(e)),
    spinnerInternalDrivers: (e) => dispatch(spinnerInternalDrivers(e)),
    spinnerExternalDrivers: (e) => dispatch(spinnerExternalDrivers(e)),
    spinnerPriceKPI: (e) => dispatch(spinnerPriceKPI(e)),
    onGenerateBestWorstPerformance: (e) => dispatch(generateBestWorstPerformance(e)),
    onGenerateBestWorstPerformanceTable: (e) => dispatch(generateBestWorstPerformanceTable(e)),
    defaultGreyScreen: (e) => dispatch(defaultGreyScreen(e)),
    dispatch,

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Executive);
