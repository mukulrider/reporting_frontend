/*
 *
 * Executive
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Modal,Nav,NavItem,DropdownButton, MenuItem } from 'react-bootstrap';
import {saveImage,saveDataAsCSV} from './../../utils/exportFunctions';

import Panel from 'components/panel';
import './style.scss';
import { createStructuredSelector } from 'reselect';
import makeSelectExecutive from './selectors';
import Button from 'components/button';
import messages from './messages';
import WaterFallChartExec from 'components/WaterFallChartExec'
//For Filter
import ExecFilter from 'components/ExecFilter';

// For KPIs and Charts
import MultilinePromo from 'components/MultilinePromo';
import ExecTopbotMultiline from 'components/ExecTopbotMultiline';
import GaugeExec from 'components/GaugeExec';
import BarChartSimple from 'components/BarChartSimple';
import StackedChart from 'components/StackedChart';
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
  SaveDriverParam,
  //For top5/bot5 modal
  SaveFilteredFlag,
  SaveTopName,
  SaveBotName,
  SaveSupplierName,
  SaveTopBotFlag,
  SaveValueInternal,
  SaveValueExternal
}
  from './actions.js'

import imgSunshine from './../../assets/images/sun.png';
import imgRainfall from './../../assets/images/rain.png';
import imgTemperature from './../../assets/images/thermometer.png';


function triangleColumnFormatter(cell, row) {
  if (cell == 0) {
    return '<i class="glyphicon glyphicon-chevron-up glyphiconPositive"></i>&nbsp;'+ cell+'%';
  }
  else if (cell < 0) {
    return '<i class="glyphicon glyphicon-chevron-down glyphiconNegative"></i>&nbsp;'+ cell+'%';
  } else {
    return '<i class="glyphicon glyphicon-minus-sign glyphiconNeutral"></i>&nbsp;'+ cell+'%';
  }
}

function trClassFormat(cell, row) {
  if(cell=='Attack') {
    return 'tr-function-example';
  }
  else{
    return '';
  }
}

function columnClassNameFormat(fieldValue,row,rowIdx,colIdx){
  //fieldValue is column value
  //row is whole row object
  //rowIdx is index of row
  //colIdx is index of column
  if(fieldValue=='Attack') {
    return 'tr-function-red';
  }
  else{
    if(fieldValue=='Defend'){
      return 'tr-function-yellow';
    }
    else
    {
      return 'tr-function-green';
    }

  }
}



import MultilineThree from 'components/MultilineThree';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

export class Executive extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    {(() => {
      this.props.onGetFilter();
      this.props.onGetWeekFilter();


      if (this.props.Executive.kpi_param=='kpi_type=Overview') {
        console.log("______________________ Only Overview function Called")
        this.props.loadOverviewKpi();
        this.props.loadOverviewKpiTrend();
        this.props.loadOverviewDriversInternal();
        this.props.loadOverviewDriversExternal();
        this.props.loadRolesAndIntent();
        this.props.loadBudgetAndForecast();

      }
      else {
        if(this.props.Executive.kpi_param=='kpi_type=Price')
        {
          console.log("______________________ Only Price function Called")
          this.props.loadPriceKPIData();


        }

        else {
          console.log("______________________ Only KPI functions Called")

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
    })()}



    // this.props.promotion.reducer1.sales;
  };
  componentDidUpdate = () => {



    // this.props.promotion.reducer1.sales;
  };
  constructor(props) {
    super(props);
    this.state = {

      activeKey1: "1",
      activeKey2: "1",
      activeKey3: "1",
      activeKey4: "1",
      activeKey5: "0",
      activeKey6: "0",
      activeKey7: "0",
      activeKey8: "0",
      activeKey9: "1",
      activeKey10: "1"
    };

  }

  render() {

    const options = {
      page: 1,  // which page you want to show as default
      // sizePerPageList: [ {
      //   text: '5', value: 5
      // }, {
      //   text: '10', value: 10
      // }, {
      //   text: 'All', value: products.length
      // } ], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 0, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      // prePage: 'Prev', // Previous page button text
      // nextPage: 'Next', // Next page button text
      // firstPage: 'First', // First page button text
      // lastPage: 'Last', // Last page button text
      // paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      // paginationPosition: 'top'  // default is bottom, top and both is all available
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };


    let kpiparam = this.props.Executive.kpi_param;
    let dataWeekParam = this.props.Executive.week_param;
    let driverParam = this.props.Executive.driver_param;
    let topName = '';
    let botName = '';
    let suppName = '';
    let topbotflag ='';








    return (
      <div>


        <div className="row" style={{
          marginLeft: '0px',
          marginRight: '0px'
        }}>

          <div className="pageTitle">


            {/*Header to show the week selection and time period*/}
            {(() => {
              if (this.props.Executive.week_filter_param) {
                return (
                  <span>Executive View -
                    {(() => {
                    if (this.props.Executive.week_param!='week_flag=Current Week')
                      {
                        return (
                          <span> {(this.props.Executive.week_param).substring(10, this.props.Executive.week_param.length)} to</span>
                        )
                      }
                    else{
                      return(
                        <span></span>
                      )
                    }
                    }
                  )()}
                  {(this.props.Executive.week_filter_param).substring(11, this.props.Executive.week_filter_param.length)}</span>
                )
              } else {
                return (
                  <span>Executive View
                    {(() => {
                        if (this.props.Executive.week_param!='week_flag=Current Week')
                        {
                          return (
                            <span> {(this.props.Executive.week_param).substring(10, this.props.Executive.week_param.length)} to</span>
                          )
                        }
                        else{
                          return(
                            <span> </span>
                          )
                        }
                      }
                    )()}

                    - 201652 </span>
                )
              }
            })()}
          </div>


          <div style={{
            height: '80%',
            position: 'fixed',
            width: '20%',
            paddingRight: '1%',
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
                              week_data = {this.props.Executive.week_filter_data}
                              ongenerateWeekFilter = {this.props.onGetWeekFilter}
                              onSaveWeekFilterParam = {this.props.onSaveWeekFilterParam}
                              previous_week_selection = {this.props.Executive.week_filter_param}
                              kpi_param = {this.props.Executive.kpi_param}
                              loadOverviewKpi = { this.props.loadOverviewKpi}
                              loadRolesAndIntent = { this.props.loadRolesAndIntent}
                              loadBudgetAndForecast = { this.props.loadBudgetAndForecast}
                              loadOverviewKpiTrend = { this.props.loadOverviewKpiTrend}
                              loadOverviewDriversInternal = { this.props.loadOverviewDriversInternal}
                              loadOverviewDriversExternal = { this.props.loadOverviewDriversExternal}
                              loadKpiBoxes = { this.props.loadKpiBoxes}
                              loadBestWorst = { this.props.loadBestWorst}
                              loadDriversInternalData = { this.props.loadDriversInternalData}

                              loadDriversExternalData = { this.props.loadDriversExternalData}
                              loadPriceKPIData = { this.props.loadPriceKPIData}
                              kpi_type = {this.props.Executive.kpi_param}


                  />
                );
              } else {
                return (<div>Loading the data </div>)
              }
            })()}

          </div>

          <div style={{
            width: '78%',
            marginLeft: '22%'
          }}>
            <div className="col-md-12 content-wrap">
              {/*Nav for time period*/}
              <div style={{borderRight: '1%'}}>
              <Nav style={{marginLeft: '1%'}} bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect} className="tabsCustom  mainTab">
                <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                  dataWeekParam = "week_flag=Current Week";

                  this.setState({activeKey1: "1"});
                  this.props.onSaveWeekParam(dataWeekParam);

                  {(() => {
                    if (this.props.Executive.kpi_param=='kpi_type=Overview') {
                      console.log("______________________ Only Overview function Called")
                      this.props.loadOverviewKpi();
                      this.props.loadOverviewKpiTrend();
                      this.props.loadOverviewDriversInternal();
                      this.props.loadOverviewDriversExternal();
                      this.props.loadRolesAndIntent();
                      this.props.loadBudgetAndForecast();

                    }
                    else {
                      if(this.props.Executive.kpi_param=='kpi_type=Price')
                      {
                        console.log("______________________ Only Price function Called")
                        this.props.loadPriceKPIData();


                      }

                      else {
                        console.log("______________________ Only KPI functions Called")

                        this.props.loadKpiBoxes();
                        this.props.loadBestWorst();
                        {/*this.props.loadBestInfoData();*/}
                        {/*this.props.loadWorstInfoData();*/}
                        {/*this.props.loadSupplierInfoData();*/}
                        {/*this.props.loadTopSupplierInfoData();*/}
                        {/*this.props.loadBotSupplierInfoData();*/}
                        this.props.loadDriversInternalData();
                        this.props.loadDriversExternalData();
                      }

                    }
                  })()}




                }}>
                  <span className="tab_label">Current Week</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                  this.setState({activeKey1: "2"});
                  dataWeekParam = "week_flag=4 Weeks";
                  this.props.onSaveWeekParam(dataWeekParam);


                  {(() => {
                    if (this.props.Executive.kpi_param=='kpi_type=Overview') {
                      console.log("______________________ Only Overview function Called")
                      this.props.loadOverviewKpi();
                      this.props.loadOverviewKpiTrend();
                      this.props.loadOverviewDriversInternal();
                      this.props.loadOverviewDriversExternal();
                      this.props.loadRolesAndIntent();
                      this.props.loadBudgetAndForecast();

                    }
                    else {
                      if(this.props.Executive.kpi_param=='kpi_type=Price')
                      {
                        console.log("______________________ Only Price function Called")
                        this.props.loadPriceKPIData();


                      }

                      else {
                        console.log("______________________ Only KPI functions Called")

                        this.props.loadKpiBoxes();
                        this.props.loadBestWorst();
                        {/*this.props.loadBestInfoData();*/}

                        {/*this.props.loadWorstInfoData();*/}
                        {/*this.props.loadSupplierInfoData();*/}
                        {/*this.props.loadTopSupplierInfoData();*/}
                        {/*this.props.loadBotSupplierInfoData();*/}
                        this.props.loadDriversInternalData();
                        this.props.loadDriversExternalData();
                      }

                    }
                  })()}






                }}> <span className="tab_label">Last 4 weeks</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                  this.setState({activeKey1: "3"});
                  dataWeekParam = "week_flag=13 Weeks";
                  this.props.onSaveWeekParam(dataWeekParam);

                  {(() => {
                    if (this.props.Executive.kpi_param=='kpi_type=Overview') {
                      console.log("______________________ Only Overview function Called")
                      this.props.loadOverviewKpi();
                      this.props.loadOverviewKpiTrend();
                      this.props.loadOverviewDriversInternal();
                      this.props.loadOverviewDriversExternal();
                      this.props.loadRolesAndIntent();
                      this.props.loadBudgetAndForecast();

                    }
                    else {
                      if(this.props.Executive.kpi_param=='kpi_type=Price')
                      {
                        console.log("______________________ Only Price function Called")
                        this.props.loadPriceKPIData();


                      }

                      else {
                        console.log("______________________ Only KPI functions Called")

                        this.props.loadKpiBoxes();
                        this.props.loadBestWorst();
                        {/*this.props.loadBestInfoData();*/}

                        {/*this.props.loadWorstInfoData();*/}
                        {/*this.props.loadSupplierInfoData();*/}
                        {/*this.props.loadTopSupplierInfoData();*/}
                        {/*this.props.loadBotSupplierInfoData();*/}
                        this.props.loadDriversInternalData();
                        this.props.loadDriversExternalData();
                      }

                    }
                  })()}





                }}><span className="tab_label">Last 13 weeks</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                  this.setState({activeKey1: "4"});
                  dataWeekParam = "week_flag=26 Weeks";
                  this.props.onSaveWeekParam(dataWeekParam);

                  {(() => {
                    if (this.props.Executive.kpi_param=='kpi_type=Overview') {
                      console.log("______________________ Only Overview function Called")
                      this.props.loadOverviewKpi();
                      this.props.loadOverviewKpiTrend();
                      this.props.loadOverviewDriversInternal();
                      this.props.loadOverviewDriversExternal();
                      this.props.loadRolesAndIntent();
                      this.props.loadBudgetAndForecast();

                    }
                    else {
                      if(this.props.Executive.kpi_param=='kpi_type=Price')
                      {
                        console.log("______________________ Only Price function Called")
                        this.props.loadPriceKPIData();


                      }

                      else {
                        console.log("______________________ Only KPI functions Called")

                        this.props.loadKpiBoxes();
                        this.props.loadBestWorst();
                        {/*this.props.loadBestInfoData();*/}

                        {/*this.props.loadWorstInfoData();*/}
                        {/*this.props.loadSupplierInfoData();*/}
                        {/*this.props.loadTopSupplierInfoData();*/}
                        {/*this.props.loadBotSupplierInfoData();*/}
                        this.props.loadDriversInternalData();
                        this.props.loadDriversExternalData();
                      }

                    }
                  })()}



                }}><span className="tab_label">Last 26 weeks</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                  this.setState({activeKey1: "5"});

                  dataWeekParam = "week_flag=YTD";
                  this.props.onSaveWeekParam(dataWeekParam);


                  {(() => {
                    if (this.props.Executive.kpi_param=='kpi_type=Overview') {
                      console.log("______________________ Only Overview function Called")
                      this.props.loadOverviewKpi();
                      this.props.loadOverviewKpiTrend();
                      this.props.loadOverviewDriversInternal();
                      this.props.loadOverviewDriversExternal();
                      this.props.loadRolesAndIntent();
                      this.props.loadBudgetAndForecast();

                    }
                    else {
                      if(this.props.Executive.kpi_param=='kpi_type=Price')
                      {
                        console.log("______________________ Only Price function Called")
                        this.props.loadPriceKPIData();


                      }

                      else {
                        console.log("______________________ Only KPI functions Called")

                        this.props.loadKpiBoxes();
                        this.props.loadBestWorst();
                        {/*this.props.loadBestInfoData();*/}

                        {/*this.props.loadWorstInfoData();*/}
                        {/*this.props.loadSupplierInfoData();*/}
                        {/*this.props.loadTopSupplierInfoData();*/}
                        {/*this.props.loadBotSupplierInfoData();*/}
                        this.props.loadDriversInternalData();
                        this.props.loadDriversExternalData();
                      }

                    }
                  })()}




                }}><span className="tab_label">YTD</span></NavItem>
              </Nav>
              </div>
              <div style={{borderRight: '1%'}}>
              {/*Nav for kpi type*/}
              <Nav  style={{marginLeft: '1%'}} bsStyle="tabs" activeKey={this.state.activeKey2} onSelect={this.handleSelect} className="tabsCustom  mainTab">
                <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

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





                }}><span className="tab_label">Overview</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
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


                  this.props.loadKpiBoxes();
                  this.props.loadBestWorst();
                  {/*this.props.loadWorstInfoData();*/}
                  {/*this.props.loadBestInfoData();*/}
                  {/*this.props.loadSupplierInfoData();*/}
                  this.props.loadDriversInternalData();
                  this.props.loadDriversExternalData();


                }}><span className="tab_label">Value</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                  kpiparam = "kpi_type=Volume";
                  this.setState({activeKey2: "3"});
                  this.props.onSaveKPIParam(kpiparam);
                  topName = 'None';
                  suppName = 'None';
                  botName = 'None';
                  this.props.onSaveTopName(topName);
                  this.props.onSaveBotName(botName);
                  this.props.onSaveSupplierName(suppName);
                  this.props.loadKpiBoxes();
                  this.props.loadBestWorst();
                  {/*this.props.loadWorstInfoData();*/}
                  {/*this.props.loadBestInfoData();*/}
                  {/*this.props.loadSupplierInfoData();*/}
                  {/*this.props.loadTopSupplierInfoData();*/}
                  {/*this.props.loadBotSupplierInfoData();*/}

                }}><span className="tab_label">Volume</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                  kpiparam = "kpi_type=COGS";
                  this.setState({activeKey2: "4"});
                  this.props.onSaveKPIParam(kpiparam);
                  topName = 'None';
                  suppName = 'None';
                  botName = 'None';
                  this.props.onSaveTopName(topName);
                  this.props.onSaveBotName(botName);
                  this.props.onSaveSupplierName(suppName);
                  this.props.loadKpiBoxes();
                  this.props.loadBestWorst();
                  {/*this.props.loadWorstInfoData();*/}
                  {/*this.props.loadBestInfoData();*/}
                  {/*this.props.loadSupplierInfoData();*/}
                  {/*this.props.loadTopSupplierInfoData();*/}
                  {/*this.props.loadBotSupplierInfoData();*/}


                }}><span className="tab_label">COGS</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                  kpiparam = "kpi_type=Profit";
                  this.setState({activeKey2: "5"});
                  this.props.onSaveKPIParam(kpiparam);
                  topName = 'None';
                  suppName = 'None';
                  botName = 'None';
                  this.props.onSaveTopName(topName);
                  this.props.onSaveBotName(botName);
                  this.props.onSaveSupplierName(suppName);
                  this.props.loadKpiBoxes();
                  this.props.loadBestWorst();
                  {/*this.props.loadWorstInfoData();*/}
                  {/*this.props.loadBestInfoData();*/}
                  {/*this.props.loadSupplierInfoData();*/}
                  {/*this.props.loadTopSupplierInfoData();*/}
                  {/*this.props.loadBotSupplierInfoData();*/}


                }}><span className="tab_label">Profit</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="6" onClick={() => {
                  kpiparam = "kpi_type=Price";
                  this.setState({activeKey2: "6"});
                  this.props.onSaveKPIParam(kpiparam);
                  topName = 'None';
                  suppName = 'None';
                  botName = 'None';
                  this.props.onSaveTopName(topName);
                  this.props.onSaveBotName(botName);
                  this.props.onSaveSupplierName(suppName);
                  this.props.loadPriceKPIData();
                }}><span className="tab_label">Price</span></NavItem>


              </Nav>
              </div>
              {(() => {
                if (this.props.Executive.kpi_param=='kpi_type=Overview') {
                  return (
                    <div className="mainBox">

                      {/*Row for overview KPI Boxes */}
                      <div className="headerBox">
                      <h2 className="pageModuleMainTitle">Performance by KPI</h2>
                      </div>
                      <div className="row mainBox" style={{textAlign: 'center',backgroundColor: "white",margin: "0%",borderLeft: "1px solid #e5e8ea",borderRight: "1px solid #e5e8ea",borderBottom: "1px solid #e5e8ea"}}>
                        {/* Box for value */}
                        <div className="col-md-2" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                          <Panel>
                            <h3 className="pageModuleSubTitle"> Value </h3>
                            <h3>{
                              this.props.Executive.overview_kpi_data.kpi.value.total

                            }</h3>


                            <div className="row">
                              <div className="col-md-12 col-xs-12">

                                <h3></h3>
                              </div>

                            </div>

                            <div className="row">
                              <div className="panel-body">
                                <div className="col-md-6 col-xs-12 kpiSmall">


                                  <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.overview_kpi_data.kpi.value.var_wow > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.overview_kpi_data.kpi.value.var_wow < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>

                                    {this.props.Executive.overview_kpi_data.kpi.value.var_wow}%
                                  </h3>
                                  <h4 className="kpiSubTitle">WoW</h4>

                                </div>
                                <div className="col-md-6 col-xs-12 kpiSmall">

                                  <h3>
                        <span
                          className={(() => {
                            if (this.props.Executive.overview_kpi_data.kpi.value.var_yoy > 0)
                            {
                              return "glyphicon glyphicon-chevron-up glyphiconPositive"
                            }
                            else if (this.props.Executive.overview_kpi_data.kpi.value.var_yoy < 0)
                            {
                              return "glyphicon glyphicon-chevron-down glyphiconNegative"
                            } else {
                              return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                            } })()}>&nbsp;

                      </span>
                                    {this.props.Executive.overview_kpi_data.kpi.value.var_yoy}%
                                  </h3>
                                  <h4 className="kpiSubTitle">YoY</h4>

                                </div>

                              </div>
                            </div>
                          </Panel>
                        </div>
                        {/* Box for volume */}
                        <div className="col-md-2" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                          <Panel>
                            <h3 className="pageModuleSubTitle"> Volume       </h3>
                            <h3>
                              {
                                this.props.Executive.overview_kpi_data.kpi.volume.total

                              }

                            </h3>
                            <div className="row">
                              <div className="col-md-12 col-xs-12">

                                <h3></h3>

                              </div>

                            </div>
                            <div className="row">
                              <div className="panel-body">
                                <div className="col-md-6 col-xs-12 kpiSmall">


                                  <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.overview_kpi_data.kpi.volume.var_wow > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.overview_kpi_data.kpi.volume.var_wow < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>

                                    {this.props.Executive.overview_kpi_data.kpi.volume.var_wow}%
                                  </h3>
                                  <h4 className="kpiSubTitle">WoW</h4>

                                </div>
                                <div className="col-md-6 col-xs-12 kpiSmall">

                                  <h3>
                        <span
                          className={(() => {
                            if (this.props.Executive.overview_kpi_data.kpi.volume.var_yoy > 0)
                            {
                              return "glyphicon glyphicon-chevron-up glyphiconPositive"
                            }
                            else if (this.props.Executive.overview_kpi_data.kpi.volume.var_yoy < 0)
                            {
                              return "glyphicon glyphicon-chevron-down glyphiconNegative"
                            } else {
                              return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                            } })()}>&nbsp;

                      </span>
                                    {this.props.Executive.overview_kpi_data.kpi.volume.var_yoy}%
                                  </h3>
                                  <h4 className="kpiSubTitle">YoY</h4>

                                </div>

                              </div>
                            </div>
                          </Panel>
                        </div>
                        {/* Box for cogs */}
                        <div className="col-md-2" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                          <Panel>
                            <h3 className="pageModuleSubTitle"> COGS  </h3>
                            <h3>
                              {
                                this.props.Executive.overview_kpi_data.kpi.cogs.total

                              }

                            </h3>
                            <div className="row">
                              <div className="col-md-12 col-xs-12">

                                <h3></h3>
                              </div>

                            </div>
                            <div className="row">
                              <div className="panel-body">
                                <div className="col-md-6 col-xs-12 kpiSmall">


                                  <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.overview_kpi_data.kpi.cogs.var_wow > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.overview_kpi_data.kpi.cogs.var_wow < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>

                                    {this.props.Executive.overview_kpi_data.kpi.cogs.var_wow}%
                                  </h3>
                                  <h4 className="kpiSubTitle">WoW</h4>

                                </div>
                                <div className="col-md-6 col-xs-12 kpiSmall">

                                  <h3>
                        <span
                          className={(() => {
                            if (this.props.Executive.overview_kpi_data.kpi.cogs.var_yoy > 0)
                            {
                              return "glyphicon glyphicon-chevron-up glyphiconPositive"
                            }
                            else if (this.props.Executive.overview_kpi_data.kpi.cogs.var_yoy < 0)
                            {
                              return "glyphicon glyphicon-chevron-down glyphiconNegative"
                            } else {
                              return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                            } })()}>&nbsp;

                      </span>
                                    {this.props.Executive.overview_kpi_data.kpi.cogs.var_yoy}%
                                  </h3>
                                  <h4 className="kpiSubTitle">YoY</h4>

                                </div>

                              </div>
                            </div>
                          </Panel>
                        </div>
                        {/* Box for cgm */}
                        <div className="col-md-2" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                          <Panel>
                            <h3 className="pageModuleSubTitle"> Profit       </h3>
                            <h3>
                              {
                                this.props.Executive.overview_kpi_data.kpi.cgm.total

                              }

                            </h3>
                            <div className="row">
                              <div className="col-md-12 col-xs-12">

                                <h3></h3>
                              </div>

                            </div>
                            <div className="row">
                              <div className="panel-body">
                                <div className="col-md-6 col-xs-12 kpiSmall">


                                  <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.overview_kpi_data.kpi.cgm.var_wow > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.overview_kpi_data.kpi.cgm.var_wow < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>

                                    {this.props.Executive.overview_kpi_data.kpi.cgm.var_wow}%
                                  </h3>
                                  <h4 className="kpiSubTitle">WoW</h4>

                                </div>
                                <div className="col-md-6 col-xs-12 kpiSmall">

                                  <h3>
                        <span
                          className={(() => {
                            if (this.props.Executive.overview_kpi_data.kpi.cgm.var_yoy > 0)
                            {
                              return "glyphicon glyphicon-chevron-up glyphiconPositive"
                            }
                            else if (this.props.Executive.overview_kpi_data.kpi.cgm.var_yoy < 0)
                            {
                              return "glyphicon glyphicon-chevron-down glyphiconNegative"
                            } else {
                              return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                            } })()}>&nbsp;

                      </span>
                                    {this.props.Executive.overview_kpi_data.kpi.cgm.var_yoy}%
                                  </h3>
                                  <h4 className="kpiSubTitle">YoY</h4>

                                </div>

                              </div>
                            </div>
                          </Panel>
                        </div>
                        {/* Box for Price */}
                        <div className="col-md-2" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                          <Panel>
                            <h3 className="pageModuleSubTitle"> Price

                            </h3>
                            <div className="row" style={{ marginTop: "80px"}}>
                              <div className="col-md-12 col-xs-12">

                                <h3></h3>
                              </div>

                            </div>
                            <div className="row">
                              <div className="panel-body">
                                <div className="col-md-6 col-xs-12 kpiSmall">


                                  <h3>


                                    £ {this.props.Executive.overview_kpi_data.price.ACP}
                                  </h3>
                                  <h4 className="kpiSubTitle">ACP</h4>

                                </div>
                                <div className="col-md-6 col-xs-12 kpiSmall">

                                  <h3>

                                    £ {this.props.Executive.overview_kpi_data.price.ASP}
                                  </h3>
                                  <h4 className="kpiSubTitle">ASP</h4>

                                </div>

                              </div>
                            </div>
                          </Panel>
                        </div>
                        {/* Box for Market Share */}
                        <div className="col-md-2" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                          <Panel>
                            <h3 className="pageModuleSubTitle"> Market Share

                            </h3>
                            <div className="row" style={{ marginTop: "80px"}}>
                              <div className="col-md-12 col-xs-12">

                                <h3></h3>
                              </div>

                            </div>
                            <div className="row">
                              <div className="panel-body">
                                <div className="col-md-6 col-xs-12 kpiSmall">


                                  <h3>


                                    {this.props.Executive.overview_kpi_data.market.share}%
                                  </h3>
                                  <h4 className="kpiSubTitle">Value Share</h4>

                                </div>
                                <div className="col-md-6 col-xs-12 kpiSmall">

                                  <h3>

                                    {this.props.Executive.overview_kpi_data.market.opportunity}
                                  </h3>
                                  <h4 className="kpiSubTitle">Opportunity</h4>

                                </div>

                              </div>
                            </div>
                          </Panel>
                        </div>

                      </div>
                      {/*Row for sales forecasting and roles and intent*/}
                      <div className="headerBox">
                      <h2 className="pageModuleMainTitle">Target and Strategy</h2>
                      </div>
                      <div className="row mainBox">
                        {/*Block for bar charts*/}
                        <div className="col-md-8 ">
                          <div className="row">
                            {/*BarChart for Forecast*/}
                            <div className="col-md-6 col-xs-12">
                              <class className="col-md-9 col-sm-9">
                              <h2 className="pageModuleSubTitle">Value vs. Forecast</h2>
                              </class>
                              <div className="col-md-3 col-sm-3" style={{float:"right",marginTop: "15px"}}>
                                <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                                  <MenuItem onClick={() => {
                                    saveImage(document.getElementById('ForecastSales_svg'),"forecast_bar_chart")
                                  }
                                  }>Save As JPEG</MenuItem>
                                  <MenuItem onClick={() => {
                                    saveDataAsCSV(this.props.Executive.budget_forecast_data.forecast_data,"forecast_bar_chart.csv")
                                  }
                                  }>Download CSV</MenuItem>
                                </DropdownButton>
                              </div>
                              <BarChartSimple id="ForecastSales"
                                              data={this.props.Executive.budget_forecast_data.forecast_data}
                                              col_a='Forecast'>

                              </BarChartSimple>
                            </div>

                            <div className="col-md-6 col-xs-12">
                              <class className="col-md-9 col-sm-9">
                                <h2 className="pageModuleSubTitle">Value vs. Budget</h2>
                              </class>
                              <div className="col-md-3 col-sm-3" style={{float:"right",marginTop: "15px"}}>
                                <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                                  <MenuItem onClick={() => {
                                    saveImage(document.getElementById('BudgetSales_svg'),"budget_bar_chart")
                                  }
                                  }>Save As JPEG</MenuItem>
                                  <MenuItem onClick={() => {
                                    saveDataAsCSV(this.props.Executive.budget_forecast_data.budget_data,"budget_bar_chart.csv")
                                  }
                                  }>Download CSV</MenuItem>
                                </DropdownButton>
                              </div>
                              <BarChartSimple id="BudgetSales"
                                              data={this.props.Executive.budget_forecast_data.budget_data}  col_a='Budget'>

                              </BarChartSimple>
                            </div>
                          </div>
                        </div>
                        {/*Block for roles and intent*/}
                        <div className="col-md-4" style={{marginTop:"80px"}}>

                          {(() => {
                              if (this.props.Executive.roles_intent_data) {
                                return(
                                  <BootstrapTable className="promoTable"
                                                  data={this.props.Executive.roles_intent_data}
                                                  striped={true}
                                                  condensed
                                  >
                                    <TableHeaderColumn  dataAlign={"left"} dataField='buying_controller' isKey>Buying Controller</TableHeaderColumn>
                                    <TableHeaderColumn  dataAlign={"left"} dataField='intent' columnClassName={columnClassNameFormat}>Intent</TableHeaderColumn>
                                  </BootstrapTable>

                                )
                              }


                            }

                          )()}
                        </div>
                      </div>


                      {/*Row for Trended performance*/}
                      <div className="headerBox">
                      <h2 className="pageModuleMainTitle">Trended Performance</h2>
                      </div>
                      <div className="mainBox">
                      {/*Row for value and volume*/}
                      <div className="row ">
                        {/*Value Trend*/}
                        <div className="col-md-6 col-xs-12">
                          <h3 className="pageModuleSubTitle"> Value<div style={{float:"right"}}>
                            <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                              <MenuItem onClick={() => {
                                saveImage(document.getElementById('overview_value_line'),"kpiSalesValueTrend")
                              }
                              }>Save As JPEG</MenuItem>
                              <MenuItem onClick={() => {
                                saveDataAsCSV(this.props.Executive.overview_kpi_trend_data.sales_trend,"kpiSalesValueTrend.csv")
                              }
                              }>Download CSV</MenuItem>
                            </DropdownButton>
                          </div></h3>

                          {(() => {
                            if (this.props.Executive.overview_kpi_trend_data) {
                              console.log("overview_kpi_trend_data value line chart data", this.props.Executive.overview_kpi_trend_data.sales_trend);
                              return (
                                <div>
                                  <MultilinePromo data={this.props.Executive.overview_kpi_trend_data.sales_trend} id="overview_value_line" label_ty="Sales TY" label_ly="Sales LY" xaxis_title="Tesco Week" no_pref='£' no_suffix='' yaxis_title='Value' chart_width="600" legend_width="450" legend_text_width="445" />
                                </div>
                              );
                            }
                          })()}
                        </div>
                        {/*Volume Trend*/}
                        <div className="col-md-6 col-xs-12">
                          <h3 className="pageModuleSubTitle"> Volume<div style={{float:"right"}}>
                            <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                              <MenuItem onClick={() => {
                                saveImage(document.getElementById('overview_volume_line'),"kpiSalesVolumeTrend")
                              }
                              }>Save As JPEG</MenuItem>
                              <MenuItem onClick={() => {
                                saveDataAsCSV(this.props.Executive.overview_kpi_trend_data.volume_trend,"kpiSalesVolumeTrend.csv")
                              }
                              }>Download CSV</MenuItem>
                            </DropdownButton>
                          </div></h3>
                          {(() => {
                            if (this.props.Executive.overview_kpi_trend_data) {
                              console.log("overview_kpi_trend_data volume line chart data", this.props.Executive.overview_kpi_trend_data.volume_trend);
                              return (
                                <div>
                                  <MultilinePromo data={this.props.Executive.overview_kpi_trend_data.volume_trend} id="overview_volume_line" label_ty="Volume TY" label_ly="Volume LY" xaxis_title="Tesco Week" no_pref='' no_suffix='' yaxis_title='Volume' chart_width="600" legend_width="450" legend_text_width="445"/>
                                </div>
                              );
                            }
                          }
                          )()}

                        </div>
                      </div>
                      {/*Row for COGS and CGM*/}
                      <div className="row">
                        {/*COGS Trend*/}
                        <div className="col-md-6 col-xs-12">
                          <h3 className="pageModuleSubTitle"> COGS<div style={{float:"right"}}>
                            <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                              <MenuItem onClick={() => {
                                saveImage(document.getElementById('overview_cogs_line'),"kpiCOGSTrend")
                              }
                              }>Save As JPEG</MenuItem>
                              <MenuItem onClick={() => {
                                saveDataAsCSV(this.props.Executive.overview_kpi_trend_data.cogs_trend,"kpiCOGSTrend.csv")
                              }
                              }>Download CSV</MenuItem>
                            </DropdownButton>
                          </div></h3>
                          {(() => {
                            if (this.props.Executive.overview_kpi_trend_data) {
                              console.log("overview_kpi_trend_data COGS line chart data", this.props.Executive.overview_kpi_trend_data.cogs_trend);
                              return (
                                <div>
                                  <MultilinePromo data={this.props.Executive.overview_kpi_trend_data.cogs_trend} id="overview_cogs_line" label_ty="COGS TY" label_ly="COGS LY" xaxis_title="Tesco Week" no_pref='£' no_suffix='' yaxis_title='COGS' chart_width="600" legend_width="450" legend_text_width="445"/>
                                </div>
                              );
                            }
                          })()}
                        </div>
                        {/*CGM Trend*/}
                        <div className="col-md-6 col-xs-12">
                          <h3 className="pageModuleSubTitle"> Profit<div style={{float:"right"}}>
                            <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                              <MenuItem onClick={() => {
                                saveImage(document.getElementById('overview_cgm_line'),"kpiCGMTrend")
                              }
                              }>Save As JPEG</MenuItem>
                              <MenuItem onClick={() => {
                                saveDataAsCSV(this.props.Executive.overview_kpi_trend_data.cgm_trend,"kpiCGMTrend.csv")
                              }
                              }>Download CSV</MenuItem>
                            </DropdownButton>
                          </div></h3>
                          {(() => {
                            if (this.props.Executive.overview_kpi_trend_data) {
                              console.log("overview_kpi_trend_data profit line chart data", this.props.Executive.overview_kpi_trend_data.cgm_trend);
                              return (
                                <div>
                                  <MultilinePromo data={this.props.Executive.overview_kpi_trend_data.cgm_trend} id="overview_cgm_line" label_ty="Profit TY" label_ly="Profit LY" xaxis_title="Tesco Week" no_pref='£' no_suffix='' yaxis_title='Profit'  chart_width="600" legend_width="450" legend_text_width="445"/>
                                </div>
                              );
                            }
                          })()}

                        </div>
                      </div>
                      </div>
                      {/*Internal External Tab*/}
                      <div style={{borderRight: '1%'}}>
                      <Nav  style={{marginLeft: '1%'}} bsStyle="tabs" activeKey={this.state.activeKey3} onSelect={this.handleSelect} className="tabsCustom mainTab">
                        <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                          driverParam = "internal";
                          this.setState({activeKey3: "1"});
                          this.props.onSaveDriverParam(driverParam);

                        }}><span className="tab_label">Internal</span></NavItem>

                        <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                          this.setState({activeKey3: "2"});
                          driverParam = "external";
                          this.props.onSaveDriverParam(driverParam);

                        }}><span className="tab_label">External</span></NavItem>


                      </Nav>
                      </div>
                      {/*Row for internal/external drivers of sales*/}
                      {(() => {
                        if (this.props.Executive.driver_param=='internal') {

                          return(<div>
                            <div className="row mainBox">
                              <div className="col-md-4 col-sm-12 col-xs-12">
                                <Panel style={{marginLeft: "15px"}}>
                                  <div>
                                    {(() => {
                                        if (this.props.Executive.overview_drivers_internal_data) {
                                          if (this.props.Executive.overview_drivers_internal_data.kpi.data_available == 'yes') {
                                            return (
                                              <div>

                                                <h4 className="pageModuleSubTitle"> KPI Contribution to growth </h4>
                                                <h4 className="panel-heading tesco-heading h3" style={{textAlign: "center"}}>
                                                  LFL Sales:
                                                  <span
                                                    className={(() => {
                                                      if (this.props.Executive.overview_drivers_internal_data.kpi.sales_lfl_var)
                                                      {
                                                        return "glyphicon glyphicon-chevron-up glyphiconPositive"
                                                      }
                                                      else if (this.props.Executive.overview_drivers_internal_data.kpi.sales_lfl_var)
                                                      {
                                                        return "glyphicon glyphicon-chevron-down glyphiconNegative"
                                                      } else {
                                                        return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                                                      } })()}>&nbsp;

                        </span>
                                                  {this.props.Executive.overview_drivers_internal_data.kpi.sales_lfl_var} </h4>

                                                <div className="row" style={{width: "480px"}}>
                                                  <div className="col-xs-3 overview-blk" style={{marginRight: "5px"}}>
                                                    <Panel>
                                                      <div className="panel"
                                                           style={{border: '1px solid #E5E8EA', width: '120px', height: '120px', textAlign:'center'}}>
                                                        <h4 className="panel-heading tesco-heading"><b>Transactions</b></h4>
                                                        <div className="panel-body">
                                            <span className="overview-blk-value">
                                          <h4> <span
                                            className={(() => {
                                              if (this.props.Executive.overview_drivers_internal_data.kpi.transaction_var)
                                              {
                                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                                              }
                                              else if (this.props.Executive.overview_drivers_internal_data.kpi.transaction_var)
                                              {
                                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                                              } else {
                                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                                              } })()}>&nbsp;

                        </span> {this.props.Executive.overview_drivers_internal_data.kpi.transaction_var}  </h4>
                                            </span>
                                                        </div>
                                                      </div>
                                                    </Panel>
                                                  </div>
                                                  <div className="col-xs-3 overview-blk" style={{marginRight: "5px"}}>
                                                    <Panel>
                                                      <div className="panel"
                                                           style={{border: '1px solid #E5E8EA', width: '120px', height: '120px', textAlign:'center'}}>
                                                        <h4 className="panel-heading tesco-heading"><b>Items per Basket</b>
                                                        </h4>
                                                        <div className="panel-body">
                                            <span className="overview-blk-value">
                                          <h4>  <span
                                            className={(() => {
                                              if (this.props.Executive.overview_drivers_internal_data.kpi.item_per_basket_var)
                                              {
                                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                                              }
                                              else if (this.props.Executive.overview_drivers_internal_data.kpi.item_per_basket_var)
                                              {
                                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                                              } else {
                                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                                              } })()}>&nbsp;

                        </span> {this.props.Executive.overview_drivers_internal_data.kpi.item_per_basket_var} </h4>
                                            </span>
                                                        </div>
                                                      </div>
                                                    </Panel>
                                                  </div>
                                                  <div className="col-xs-3 overview-blk" style={{marginRight: "5px"}}>
                                                    <Panel>
                                                      <div className="panel"
                                                           style={{border: '1px solid #E5E8EA', width: '120px', height: '120px', textAlign:'center'}}>
                                                        <h4 className="panel-heading tesco-heading"><b>Item price</b></h4>
                                                        <div className="panel-body">
                                            <span className="overview-blk-value">
                                          <h4>  <span
                                            className={(() => {
                                              if (this.props.Executive.overview_drivers_internal_data.kpi.item_price_var)
                                              {
                                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                                              }
                                              else if (this.props.Executive.overview_drivers_internal_data.kpi.item_price_var)
                                              {
                                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                                              } else {
                                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                                              } })()}>&nbsp;

                        </span> {this.props.Executive.overview_drivers_internal_data.kpi.item_price_var} </h4>
                                            </span>
                                                        </div>
                                                      </div>
                                                    </Panel>
                                                  </div>
                                                </div>

                                              </div>

                                            )
                                          }
                                          else{
                                            return (
                                              <div><h3>Data is available only from week 201702</h3></div>
                                            )
                                          }
                                        }
                                        else{
                                          return(
                                            <div></div>
                                          )
                                        }
                                      }
                                    )()}


                                  </div>
                                </Panel>
                              </div>
                              <div className="col-md-8 col-sm-12 col-xs-12">
                                <Panel>
                                  <h4 className="pageModuleSubTitle"> Promotion Contribution to growth
                                    <div style={{float: "right"}}>
                                      <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
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
                                    }
                                  )()}
                                </Panel>
                              </div>
                            </div>
                          </div>)

                        }
                        else {
                          return(
                          <div>

                          {/*Row for Sunshine/Rainfall/Temp performance*/}
                          <div className="row mainBox">
                          {/*Block for sunshine*/}
                          <div className="col-md-4" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                          <Panel>
                          <h3 className="pageModuleSubTitle"> Sunshine
                          </h3>

                          {/* Image here*/}
                          <img style = {{height: 100, width: 100,marginLeft:'32%'}}  src={imgSunshine}/>

                          <div className="row">
                          <h3 style={{ textAlign : "center"}}>{
                            this.props.Executive.overview_drivers_external_data.sunshine.avg

                          }</h3>
                          </div>
                          <div className="row">
                          <div className="panel-body">
                          <div className="col-md-6 col-xs-12 kpiSmall">


                          <h3>
                          <span
                          className={(() => {
                            if (this.props.Executive.overview_drivers_external_data.sunshine.wow > 0)
                            {
                              return "glyphicon glyphicon-chevron-up glyphiconPositive"
                            }
                            else if (this.props.Executive.overview_drivers_external_data.sunshine.wow  < 0)
                            {
                              return "glyphicon glyphicon-chevron-down glyphiconNegative"
                            } else {
                              return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                            } })()}>&nbsp;

                          </span>

                          {this.props.Executive.overview_drivers_external_data.sunshine.wow }%
                          </h3>
                          <h4 className="kpiSubTitle">WoW</h4>

                          </div>
                          <div className="col-md-6 col-xs-12 kpiSmall">

                          <h3>
                          <span
                          className={(() => {
                            if (this.props.Executive.overview_drivers_external_data.sunshine.yoy > 0)
                            {
                              return "glyphicon glyphicon-chevron-up glyphiconPositive"
                            }
                            else if (this.props.Executive.overview_drivers_external_data.sunshine.yoy< 0)
                            {
                              return "glyphicon glyphicon-chevron-down glyphiconNegative"
                            } else {
                              return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                            } })()}>&nbsp;

                          </span>
                          {this.props.Executive.overview_drivers_external_data.sunshine.yoy}%
                          </h3>
                          <h4 className="kpiSubTitle">YoY</h4>

                          </div>

                          </div>
                          </div>
                          </Panel>
                          </div>
                          {/*Block for rainfall*/}
                          <div className="col-md-4" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                          <Panel>
                          <h3 className="pageModuleSubTitle"> Rainfall

                          </h3>
                          {/* Image here*/}
                          <img style = {{height: 100, width: 100,marginLeft:'32%'}}  src={imgRainfall}/>
                          <div className="row">
                          <h3 style={{ textAlign : "center"}}>{
                            this.props.Executive.overview_drivers_external_data.rainfall.avg

                          }</h3>
                          </div>
                          <div className="row">
                          <div className="panel-body">
                          <div className="col-md-6 col-xs-12 kpiSmall">


                          <h3>
                          <span
                          className={(() => {
                            if (this.props.Executive.overview_drivers_external_data.rainfall.wow > 0)
                            {
                              return "glyphicon glyphicon-chevron-up glyphiconPositive"
                            }
                            else if (this.props.Executive.overview_drivers_external_data.rainfall.wow  < 0)
                            {
                              return "glyphicon glyphicon-chevron-down glyphiconNegative"
                            } else {
                              return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                            } })()}>&nbsp;

                          </span>

                          {this.props.Executive.overview_drivers_external_data.rainfall.wow }%
                          </h3>
                          <h4 className="kpiSubTitle">WoW</h4>

                          </div>
                          <div className="col-md-6 col-xs-12 kpiSmall">

                          <h3>
                          <span
                          className={(() => {
                            if (this.props.Executive.overview_drivers_external_data.rainfall.yoy > 0)
                            {
                              return "glyphicon glyphicon-chevron-up glyphiconPositive"
                            }
                            else if (this.props.Executive.overview_drivers_external_data.rainfall.yoy< 0)
                            {
                              return "glyphicon glyphicon-chevron-down glyphiconNegative"
                            } else {
                              return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                            } })()}>&nbsp;

                          </span>
                          {this.props.Executive.overview_drivers_external_data.rainfall.yoy}%
                          </h3>
                          <h4 className="kpiSubTitle">YoY</h4>

                          </div>

                          </div>
                          </div>
                          </Panel>
                          </div>
                          {/*Block for temperature*/}
                          <div className="col-md-4" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                          <Panel>
                          <h3 className="pageModuleSubTitle"> Temperature

                          </h3>
                          {/* Image here*/}
                          <img style = {{height: 100, width: 100,marginLeft:'32%'}}  src={imgTemperature}/>
                          <div className="row">
                          <h3 style={{ textAlign : "center"}}>{
                            this.props.Executive.overview_drivers_external_data.temperature.avg

                          }</h3>
                          </div>
                          <div className="row">
                          <div className="panel-body">
                          <div className="col-md-6 col-xs-12 kpiSmall">


                          <h3>
                          <span
                          className={(() => {
                            if (this.props.Executive.overview_drivers_external_data.temperature.wow > 0)
                            {
                              return "glyphicon glyphicon-chevron-up glyphiconPositive"
                            }
                            else if (this.props.Executive.overview_drivers_external_data.temperature.wow  < 0)
                            {
                              return "glyphicon glyphicon-chevron-down glyphiconNegative"
                            } else {
                              return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                            } })()}>&nbsp;

                          </span>

                          {this.props.Executive.overview_drivers_external_data.temperature.wow }%
                          </h3>
                          <h4 className="kpiSubTitle">WoW</h4>

                          </div>
                          <div className="col-md-6 col-xs-12 kpiSmall">

                          <h3>
                          <span
                          className={(() => {
                            if (this.props.Executive.overview_drivers_external_data.temperature.yoy > 0)
                            {
                              return "glyphicon glyphicon-chevron-up glyphiconPositive"
                            }
                            else if (this.props.Executive.overview_drivers_external_data.temperature.yoy< 0)
                            {
                              return "glyphicon glyphicon-chevron-down glyphiconNegative"
                            } else {
                              return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                            } })()}>&nbsp;

                          </span>
                          {this.props.Executive.overview_drivers_external_data.temperature.yoy}%
                          </h3>
                          <h4 className="kpiSubTitle">YoY</h4>

                          </div>

                          </div>
                          </div>
                          </Panel>
                          </div>



                          </div>
                          {/*Row for holidays*/}
                          <div className="row mainBox">
                            <div className="headerBox">
                          <h3 className="pageModuleMainTitle"> Holidays this week
                          </h3>
                            </div>
                          {/*Block for holidays table*/}
                          <div className="col-md-6">
                          {(() => {
                            if (this.props.Executive.overview_drivers_external_data) {
                              return (
                                <div className="promoTable">

                                  <BootstrapTable className="promoTable"
                                                  data={this.props.Executive.overview_drivers_external_data.holidays}
                                                  pagination = {true} options={options}
                                                  striped={true}
                                                  condensed
                                  >

                                    <TableHeaderColumn  dataAlign={"left"} dataField='tesco_week' isKey>Tesco Week</TableHeaderColumn>
                                    <TableHeaderColumn  dataAlign={"left"} dataField='holiday_date'>Holiday Date</TableHeaderColumn>
                                    <TableHeaderColumn  tdStyle={{whiteSpace:'normal'}} dataAlign={"left"} dataField='holiday_description'>Holiday Description</TableHeaderColumn>
                                  </BootstrapTable>
                                </div>
                              )
                            }else {
                              return (<div>Loading</div>)
                            }

                          })()}
                          </div>
                          {/*Block for sales trend value*/}
                          <div className="col-md-6">
                          {(() => {
                            if (this.props.Executive.overview_kpi_trend_data) {
                              console.log("Promo Sales line chart data", this.props.Executive.overview_kpi_trend_data.sales_trend);
                              return (
                                <MultilinePromo data={this.props.Executive.overview_kpi_trend_data.sales_trend} id="overview_holiday_value_line" label_ty="Sales TY" label_ly="Sales LY" xaxis_title="Tesco Week" no_pref='£' no_suffix='' yaxis_title='Value'/>
                              );
                            }
                          })()}
                          </div>
                          </div>
                          </div>)

                        }

                        })()}



                    </div>

                  )

                }
                else {
                  if(this.props.Executive.kpi_param=='kpi_type=Price')
                  {

                    return (
                      <div className="mainBox" >

                        {/*Row for price KPIS*/}

                        <div className="row mainBox" style={{marginTop: '1%'}}>
                          {/*Block for ASP*/}

                          <div className='col-md-4' style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                            <Panel>
                              <h3 className="pageModuleSubTitle"> ASP </h3>
                              <div className="row">
                                <div className="col-md-6 col-xs-12">

                                  <h3>Inflation  &nbsp; {this.props.Executive.price_kpi_data.ASP_abs}</h3>
                                </div>
                                <div className="col-md-6 col-xs-12">
                                  <h3>Fisher Inflation &nbsp; {this.props.Executive.price_kpi_data.ASP_fisher_infl} </h3>
                                </div>
                              </div>
                              <div className="row">
                                <div className="panel-body">
                                  <div className="col-md-3 kpiSmall">


                                    <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.price_kpi_data.ASPInfl_var_yoy> 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.price_kpi_data.ASPInfl_var_yoy < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                      {this.props.Executive.price_kpi_data.ASPInfl_var_yoy}%
                                    </h3>
                                    <h4 className="kpiSubTitle">YoY</h4>

                                  </div>
                                  <div className="col-md-3 kpiSmall">

                                    <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.price_kpi_data.ASPInfl_var_lfl> 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.price_kpi_data.ASPInfl_var_lfl < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                      {this.props.Executive.price_kpi_data.ASPInfl_var_lfl}%
                                    </h3>
                                    <h4 className="kpiSubTitle">LFL</h4>

                                  </div>
                                  <div className="col-md-6 col-xs-12 kpiSmall">

                                    <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.price_kpi_data.ASPInfl_var_wow> 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.price_kpi_data.ASPInfl_var_wow < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                      {this.props.Executive.price_kpi_data.ASPInfl_var_wow}%
                                    </h3>
                                    <h4 className="kpiSubTitle">WoW</h4>

                                  </div>
                                </div>
                              </div>
                            </Panel>
                          </div>

                          {/*Block for ACP*/}

                          <div className='col-md-4' style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                            <Panel>
                              <h3 className="pageModuleSubTitle"> ACP </h3>
                              <div className="row">
                                <div className="col-md-6 col-xs-12">

                                  <h3>Inflation  &nbsp; {this.props.Executive.price_kpi_data.ACP_abs}</h3>
                                </div>
                                <div className="col-md-6 col-xs-12">
                                  <h3>Fisher Inflation &nbsp; {this.props.Executive.price_kpi_data.ACP_fisher_infl} </h3>
                                </div>
                              </div>
                              <div className="row">
                                <div className="panel-body">
                                  <div className="col-md-3 kpiSmall">


                                    <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.price_kpi_data.ACPInfl_var_yoy> 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.price_kpi_data.ACPInfl_var_yoy < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                      {this.props.Executive.price_kpi_data.ACPInfl_var_yoy}%
                                    </h3>
                                    <h4 className="kpiSubTitle">YoY</h4>

                                  </div>
                                  <div className="col-md-3 kpiSmall">

                                    <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.price_kpi_data.ACPInfl_var_lfl> 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.price_kpi_data.ACPInfl_var_lfl < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                      {this.props.Executive.price_kpi_data.ACPInfl_var_lfl}%
                                    </h3>
                                    <h4 className="kpiSubTitle">LFL</h4>

                                  </div>
                                  <div className="col-md-6 col-xs-12 kpiSmall">

                                    <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.price_kpi_data.ACPInfl_var_wow> 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.price_kpi_data.ACPInfl_var_wow < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                      {this.props.Executive.price_kpi_data.ACPInfl_var_wow}%
                                    </h3>
                                    <h4 className="kpiSubTitle">WoW</h4>

                                  </div>
                                </div>
                              </div>
                            </Panel>
                          </div>


                          {/*Block for Price Index*/}

                          <div className='col-md-4' style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                            <Panel>
                              <h3 className="pageModuleSubTitle"> Price Index </h3>
                              <div className="row">
                                <div className="col-md-6 col-xs-12">

                                  <h3>vs. ASDA  &nbsp; </h3>
                                </div>
                                <div className="col-md-6 col-xs-12">
                                  <h3>Index &nbsp; {this.props.Executive.price_kpi_data.price_index_cw} </h3>
                                </div>
                              </div>
                              <div className="row">
                                <div className="panel-body">
                                  <div className="col-md-12 col-xs-12 kpiSmall">
                                    <h3>
                                    <span
                                      className={(() => {
                                        if (this.props.Executive.price_kpi_data.price_index_var_wow > 0)
                                        {
                                          return "glyphicon glyphicon-chevron-up glyphiconPositive"
                                        }
                                        else if (this.props.Executive.price_kpi_data.price_index_var_wow < 0)
                                        {
                                          return "glyphicon glyphicon-chevron-down glyphiconNegative"
                                        } else {
                                          return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                                        } })()}>&nbsp;

                        </span>
                                      {this.props.Executive.price_kpi_data.price_index_var_wow}%
                                    </h3>
                                    <h4 className="kpiSubTitle">WoW</h4>

                                  </div>


                                </div>
                              </div>
                            </Panel>
                          </div>

                        </div>
                        <div style={{height: "200px"}}></div>
                      </div>
                    )

                  }

                  else {
                    return (
                      <div className="mainBox">

                        {/*Row for KPIS*/}
                        <div className="row mainBox" style={{marginTop: '1%'}}>
                          {/*Block for total*/}

                          <div className={(() => {
                            if (this.props.Executive.kpi_param=='kpi_type=Value'||this.props.Executive.kpi_param=='kpi_type=Volume')
                            {
                              return "col-md-4"
                            }
                            else
                            {
                              return "col-md-6"
                            }  })()} style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                            <Panel>
                              <h3 className="pageModuleSubTitle"> Total {this.props.Executive.kpi_boxes_data.kpi_name} </h3>
                              <div style={{paddingLeft: '5%'}}>
                                <div className="row" style={{paddingRight: '15%'}}>
                                  <div className="col-md-6 col-xs-12" style={{textAlign: 'center'}}>

                                    <h3>{this.props.Executive.kpi_boxes_data.total_value.total}</h3>
                                  </div>
                                  <div className="col-md-6 col-xs-12" style={{textAlign: 'center'}}>
                                    <h3>LFL &nbsp; {this.props.Executive.kpi_boxes_data.total_value.total_lfl} </h3>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="panel-body">
                                    <div className="col-md-4 kpiSmall">


                                      <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.kpi_boxes_data.total_value.wow > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.kpi_boxes_data.total_value.wow < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                        {this.props.Executive.kpi_boxes_data.total_value.wow}%
                                      </h3>
                                      <h4 className="kpiSubTitle">WoW</h4>

                                    </div>
                                    <div className="col-md-4 kpiSmall">

                                      <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.kpi_boxes_data.total_value.yoy > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.kpi_boxes_data.total_value.yoy < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                        {this.props.Executive.kpi_boxes_data.total_value.yoy}%
                                      </h3>
                                      <h4 className="kpiSubTitle">YoY</h4>

                                    </div>
                                    <div className="col-md-4 kpiSmall">

                                      <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.kpi_boxes_data.total_value.lfl > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.kpi_boxes_data.total_value.lfl < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                        {this.props.Executive.kpi_boxes_data.total_value.lfl}%
                                      </h3>
                                      <h4 className="kpiSubTitle">LFL</h4>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Panel>
                          </div>

                          {/*Block for contribution to growth*/}
                          <div className={(() => {
                            if (this.props.Executive.kpi_param=='kpi_type=Value'||this.props.Executive.kpi_param=='kpi_type=Volume')
                            {
                              return "col-md-4"
                            }
                            else
                            {
                              return "col-md-6 col-xs-12"
                            }  })()} style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                            <Panel>
                              <h3 className="pageModuleSubTitle"> Contribution to Growth </h3>
                              <div style={{paddingLeft: '5%'}}>
                                <div className="row"  style={{paddingRight: '15%'}}>
                                  <div className="col-md-6 col-xs-12" style={{textAlign: 'center'}}>

                                    <h3>{this.props.Executive.kpi_boxes_data.growth.total}</h3>
                                  </div>
                                  <div className="col-md-6 col-xs-12" style={{textAlign: 'center'}}>
                                    <h3>LFL &nbsp; {this.props.Executive.kpi_boxes_data.growth.total_lfl} </h3>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="panel-body">
                                    <div className="col-md-4 kpiSmall">


                                      <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.kpi_boxes_data.growth.wow > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.kpi_boxes_data.growth.wow < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                        {this.props.Executive.kpi_boxes_data.growth.wow}%
                                      </h3>
                                      <h4 className="kpiSubTitle">WoW</h4>

                                    </div>
                                    <div className="col-md-4 kpiSmall">

                                      <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.kpi_boxes_data.growth.yoy > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.kpi_boxes_data.growth.yoy < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                        {this.props.Executive.kpi_boxes_data.growth.yoy}%
                                      </h3>
                                      <h4 className="kpiSubTitle">YoY</h4>

                                    </div>
                                    <div className="col-md-4 kpiSmall">

                                      <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.kpi_boxes_data.growth.lfl > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.kpi_boxes_data.growth.lfl < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                        {this.props.Executive.kpi_boxes_data.growth.lfl}%
                                      </h3>
                                      <h4 className="kpiSubTitle">LFL</h4>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Panel>
                          </div>

                          {/*Block for market*/}
                          {(() => {
                            if (this.props.Executive.kpi_param=='kpi_type=Value'||this.props.Executive.kpi_param=='kpi_type=Volume')
                            {
                              return (
                                <div className='col-md-4' style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                                  <Panel>
                                    <h3 className="pageModuleSubTitle"> Market </h3>
                                    <div style={{paddingLeft: '5%'}}>
                                      <div className="row"  style={{paddingRight: '15%'}}>
                                        <div className="col-md-6 col-xs-12" style={{textAlign: 'center'}}>

                                          <h3>{this.props.Executive.kpi_boxes_data.market.total}</h3>
                                        </div>
                                        <div className="col-md-6 col-xs-12" style={{textAlign: 'center'}}>
                                          <h3>LFL &nbsp; {this.props.Executive.kpi_boxes_data.market.total_lfl} </h3>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="panel-body">
                                          <div className="col-md-4 kpiSmall">


                                            <h3>

                                              {this.props.Executive.kpi_boxes_data.market.share}%
                                            </h3>
                                            <h4 className="kpiSubTitle">Market Share</h4>

                                          </div>
                                          <div className="col-md-4 kpiSmall">

                                            <h3>

                                              {this.props.Executive.kpi_boxes_data.market.opportunity}
                                            </h3>
                                            <h4 className="kpiSubTitle">Opportunity</h4>

                                          </div>
                                          <div className="col-md-4 kpiSmall">

                                            <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.kpi_boxes_data.market.outperformance > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.kpi_boxes_data.market.outperformance < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                              {this.props.Executive.kpi_boxes_data.market.outperformance}%
                                            </h3>
                                            <h4 className="kpiSubTitle">Market Outperf.</h4>

                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Panel>
                                </div>

                              )
                            }
                          })()}

                        </div>


                        {/*Row for best and worst performances*/}
                        <div className="headerBox">
                        <h2 className="pageModuleMainTitle">Best and Worst Performances</h2>
                        </div>
                        <div className="row mainBox">
                          <div className="col-md-6 col-xs-12">



                            {(() => {
                              if (this.props.Executive.best_worst_data.Choose_filters == 'no')
                              {
                                console.log("Choose_filters is no");
                                return (
                                  <div>
                                    <h2 className="pageModuleSubTitle">Top 5 {this.props.Executive.best_worst_data.level} by {this.props.Executive.best_worst_data.kpi_type} Share</h2>
                                    {/*Navs here */}
                                    <div className="row">
                                      <div className="col-md-4">
                                        <Nav bsStyle="tabs" activeKey={this.state.activeKey5} onSelect={this.handleSelect} className="tabsCustom2">
                                          <NavItem className="tabsCustomList2" eventKey="1" onClick={() => {
                                            topName = this.props.Executive.best_worst_data.top_5[0].name;
                                            topName = "selected_level="+topName;
                                            this.props.onSaveTopName(topName);
                                            topbotflag = 'top';
                                            this.props.onSaveTopBotFlag(topbotflag);
                                            console.log("topName1",topName);
                                            this.setState({activeKey5: "1"});
                                            this.props.loadBestInfoData();

                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                                            <b style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.top_5[0].name}</b></NavItem>
                                          <NavItem className="tabsCustomList2" eventKey="2" onClick={() => {
                                            topName = this.props.Executive.best_worst_data.top_5[1].name;
                                            topName = "selected_level="+topName;
                                            console.log("topName2",topName);
                                            this.props.onSaveTopName(topName);
                                            topbotflag = 'top';
                                            this.props.onSaveTopBotFlag(topbotflag);
                                            this.setState({activeKey5: "2"});
                                            this.props.loadBestInfoData();

                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                            style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.top_5[1].name}</b></NavItem>

                                          <NavItem className="tabsCustomList2" eventKey="3" onClick={() => {
                                            topName = this.props.Executive.best_worst_data.top_5[2].name;
                                            topName = "selected_level="+topName;
                                            console.log("topName3",topName);
                                            this.props.onSaveTopName(topName);
                                            topbotflag = 'top';
                                            this.props.onSaveTopBotFlag(topbotflag);
                                            this.setState({activeKey5: "3"});
                                            this.props.loadBestInfoData();
                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                            style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.top_5[2].name}</b></NavItem>

                                          <NavItem className="tabsCustomList2" eventKey="4" onClick={() => {
                                            topName = this.props.Executive.best_worst_data.top_5[3].name;
                                            topName = "selected_level="+topName;
                                            console.log("topName4",topName);
                                            this.props.onSaveTopName(topName);
                                            topbotflag = 'top';
                                            this.props.onSaveTopBotFlag(topbotflag);
                                            this.setState({activeKey5: "4"});
                                            this.props.loadBestInfoData();


                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                            style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.top_5[3].name}</b></NavItem>

                                          <NavItem className="tabsCustomList2" eventKey="5" onClick={() => {
                                            topName = this.props.Executive.best_worst_data.top_5[4].name;
                                            topName = "selected_level="+topName;
                                            console.log("topName5",topName);
                                            this.props.onSaveTopName(topName);
                                            topbotflag = 'top';
                                            this.props.onSaveTopBotFlag(topbotflag);
                                            this.setState({activeKey5: "5"});
                                            this.props.loadBestInfoData();
                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                            style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.top_5[4].name}</b></NavItem>

                                        </Nav>
                                      </div>
                                      <div className="col-md-8">

                                        {(() => {
                                          if (this.props.Executive.best_info_data.fetch=="success")
                                          {
                                            console.log("Executive.top_name == 'None");
                                            if(this.props.Executive.top_name!='None'){
                                              return (
                                                <div className="row">
                                                  <div className="row topbotdiv">
                                                    <div className="pull-right">
                                                      <Button onClick={() => {
                                                        suppName='None';
                                                        this.props.onSaveSupplierName(suppName);
                                                        this.setState({topsuppInfo: true});
                                                        {/*Load functions here*/}

                                                      }}>Supplier Info</Button>
                                                    </div>
                                                  </div>
                                                  {(() => {
                                                    if (this.props.Executive.best_info_data.fetch=='success') {
                                                      return (
                                                        <div>

                                                          {/*Row for KPIs*/}
                                                          <div className="row">
                                                            <div className="panel-body">
                                                              <div className="col-md-4 kpiSmall">


                                                                <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.best_info_data.yoy_var > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.best_info_data.yoy_var < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>{this.props.Executive.best_info_data.yoy_var}%
                                                                </h3>
                                                                <h4 className="kpiSubTitle">YoY</h4>

                                                              </div>
                                                              <div className="col-md-4 kpiSmall">

                                                                <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.best_info_data.cont_to_grwth > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.best_info_data.cont_to_grwth < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                                                  {this.props.Executive.best_info_data.cont_to_grwth}%
                                                                </h3>
                                                                <h4 className="kpiSubTitle">Contri to growth</h4>

                                                              </div>
                                                              <div className="col-md-4 kpiSmall">

                                                                <h3>

                                                                  {this.props.Executive.best_info_data.sales_share}%
                                                                </h3>
                                                                <h4 className="kpiSubTitle">Sales Share</h4>

                                                              </div>
                                                            </div>
                                                          </div>
                                                          {/*Row for Multiline Chart*/}
                                                          <div className="row">
                                                            <div className="col-md-12">
                                                              <div style={{float:"right"}}>
                                                                <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                                                                  <MenuItem onClick={() => {
                                                                    saveImage(document.getElementById('top_trend'),"botSupplierTrendMultiline_chart")
                                                                  }
                                                                  }>Save As JPEG</MenuItem>
                                                                  <MenuItem onClick={() => {
                                                                    saveDataAsCSV(this.props.Executive.best_info_data.multiline_trend,"botSupplierTrendMultiline_chart.csv")
                                                                  }
                                                                  }>Download CSV</MenuItem>
                                                                </DropdownButton>
                                                              </div>
                                                              <ExecTopbotMultiline data={this.props.Executive.best_info_data.multiline_trend}
                                                                                   id="top_trend" label_ty={this.props.Executive.best_info_data.legend1} label_ly={this.props.Executive.best_info_data.legend2}
                                                                                   xaxis_title="Tesco Week" no_pref={this.props.Executive.best_info_data.no_pref} no_suffix=''
                                                                                   yaxis_title={this.props.Executive.best_info_data.kpi_type} />
                                                            </div>
                                                          </div>
                                                        </div>
                                                      )
                                                    }
                                                  })()}


                                                </div>
                                              )
                                            }
                                            else
                                            {
                                              return(
                                                <div><h3>Old data present</h3></div>
                                              )
                                            }

                                          }
                                          else
                                          {
                                            console.log("Executive.top_name == Not None");
                                            return(
                                              <div>
                                                <h3> Please select an option to view performance</h3>
                                              </div>
                                            )
                                          } })()}
                                      </div>
                                    </div>
                                  </div>
                                )
                              }
                              else
                              {
                                return (
                                  <div>
                                    <h3>Please select filter till Buying controller to view top performing subgroups</h3>
                                  </div>
                                )

                              }
                            })()}



                          </div>
                          <div className="col-md-6 col-xs-12">

                            {(() => {
                              if (this.props.Executive.best_worst_data.Choose_filters == 'no')
                              {

                                console.log("Choose_filters is no");
                                return (
                                  <div>
                                    <h2 className="pageModuleSubTitle">Bot 5 {this.props.Executive.best_worst_data.level} by {this.props.Executive.best_worst_data.kpi_type} Share</h2>
                                    {/*Navs here */}
                                    <div className="row">
                                      <div className="col-md-4">
                                        <Nav bsStyle="tabs" activeKey={this.state.activeKey7} onSelect={this.handleSelect} className="tabsCustom2">
                                          <NavItem className="tabsCustomList2" eventKey="1" onClick={() => {
                                            botName = this.props.Executive.best_worst_data.bot_5[0].name;
                                            botName = "selected_level="+botName;
                                            this.props.onSaveBotName(botName);
                                            topbotflag = 'bot';
                                            this.props.onSaveTopBotFlag(topbotflag);
                                            console.log("botName1",botName);
                                            this.setState({activeKey7: "1"});
                                            this.props.loadWorstInfoData();

                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                                            <b style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.bot_5[0].name}</b></NavItem>
                                          <NavItem className="tabsCustomList2" eventKey="2" onClick={() => {
                                            botName = this.props.Executive.best_worst_data.bot_5[1].name;
                                            botName = "selected_level="+botName;
                                            console.log("botName2",botName);
                                            this.props.onSaveBotName(botName);
                                            topbotflag = 'bot';
                                            this.props.onSaveTopBotFlag(topbotflag);
                                            this.setState({activeKey7: "2"});
                                            this.props.loadWorstInfoData();

                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                            style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.bot_5[1].name}</b></NavItem>

                                          <NavItem className="tabsCustomList2" eventKey="3" onClick={() => {
                                            botName = this.props.Executive.best_worst_data.bot_5[2].name;
                                            botName = "selected_level="+botName;
                                            console.log("botName3",botName);
                                            this.props.onSaveBotName(botName);
                                            topbotflag = 'bot';
                                            this.props.onSaveTopBotFlag(topbotflag);
                                            this.setState({activeKey7: "3"});
                                            this.props.loadWorstInfoData();
                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                            style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.bot_5[2].name}</b></NavItem>

                                          <NavItem className="tabsCustomList2" eventKey="4" onClick={() => {
                                            botName = this.props.Executive.best_worst_data.bot_5[3].name;
                                            botName = "selected_level="+botName;
                                            topbotflag = 'bot';
                                            this.props.onSaveTopBotFlag(topbotflag);
                                            console.log("botName4",botName);
                                            this.props.onSaveBotName(botName);
                                            this.setState({activeKey7: "4"});
                                            this.props.loadWorstInfoData();


                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                            style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.bot_5[3].name}</b></NavItem>

                                          <NavItem className="tabsCustomList2" eventKey="5" onClick={() => {
                                            botName = this.props.Executive.best_worst_data.bot_5[4].name;
                                            botName = "selected_level="+botName;
                                            console.log("botName5",botName);
                                            this.props.onSaveBotName(botName);
                                            topbotflag = 'bot';
                                            this.props.onSaveTopBotFlag(topbotflag);
                                            this.setState({activeKey7: "5"});
                                            this.props.loadWorstInfoData();
                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                            style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.bot_5[4].name}</b></NavItem>

                                        </Nav>
                                      </div>
                                      <div className="col-md-8">

                                        {(() => {
                                          if (this.props.Executive.worst_info_data.fetch=="success")
                                          {
                                            console.log("this.props.Executive.worst_info_data exists");
                                            if(this.props.Executive.bot_name!='None')

                                            {
                                              return(
                                                <div className="row">
                                                  <div className="row topbotdiv">
                                                    <div className="pull-right">
                                                      <Button onClick={() => {
                                                        suppName='None';
                                                        this.props.onSaveSupplierName(suppName);
                                                        this.setState({topsuppInfo: true});
                                                        {/*Load functions here*/}

                                                      }}>Supplier Info</Button>
                                                    </div>
                                                  </div>
                                                  {(() => {
                                                    if (this.props.Executive.worst_info_data.fetch=='success') {
                                                      return (
                                                        <div>

                                                          {/*Row for KPIs*/}
                                                          <div className="row">
                                                            <div className="panel-body">
                                                              <div className="col-md-4 kpiSmall">


                                                                <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.worst_info_data.yoy_var > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.worst_info_data.yoy_var < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>{this.props.Executive.worst_info_data.yoy_var}%
                                                                </h3>
                                                                <h4 className="kpiSubTitle">YoY</h4>

                                                              </div>
                                                              <div className="col-md-4 kpiSmall">

                                                                <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.worst_info_data.cont_to_grwth > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.worst_info_data.cont_to_grwth < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                                                  {this.props.Executive.worst_info_data.cont_to_grwth}%
                                                                </h3>
                                                                <h4 className="kpiSubTitle">Contri to growth</h4>

                                                              </div>
                                                              <div className="col-md-4 kpiSmall">

                                                                <h3>

                                                                  {this.props.Executive.worst_info_data.sales_share}%
                                                                </h3>
                                                                <h4 className="kpiSubTitle">Sales Share</h4>

                                                              </div>
                                                            </div>
                                                          </div>
                                                          {/*Row for Multiline Chart*/}
                                                          <div className="row">
                                                            <div className="col-md-12 col-xs-12">
                                                              <div style={{float:"right"}}>
                                                                <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                                                                  <MenuItem onClick={() => {
                                                                    saveImage(document.getElementById('bot_trend'),"botSupplierTrendMultiline_chart")
                                                                  }
                                                                  }>Save As JPEG</MenuItem>
                                                                  <MenuItem onClick={() => {
                                                                    saveDataAsCSV(this.props.Executive.worst_info_data.multiline_trend,"botSupplierTrendMultiline_chart.csv")
                                                                  }
                                                                  }>Download CSV</MenuItem>
                                                                </DropdownButton>
                                                              </div>
                                                              <ExecTopbotMultiline data={this.props.Executive.worst_info_data.multiline_trend}
                                                                                   id="bot_trend" label_ty={this.props.Executive.worst_info_data.legend1} label_ly={this.props.Executive.worst_info_data.legend2}
                                                                                   xaxis_title="Tesco Week" no_pref={this.props.Executive.worst_info_data.no_pref} no_suffix=''
                                                                                   yaxis_title={this.props.Executive.worst_info_data.kpi_type} />
                                                            </div>
                                                          </div>
                                                        </div>
                                                      )
                                                    }
                                                  })()}


                                                </div>
                                              )
                                            }

                                            else{
                                              console.log("this.props.Executive.worst_info_data exists");
                                              return (
                                                <div><h3>Old data present</h3></div>
                                              )
                                            }
                                          }
                                          else
                                          {

                                            return(
                                              <div>
                                                <h3> Please select an option to view performance</h3>
                                              </div>
                                            )
                                          } })()}
                                      </div>
                                    </div>
                                  </div>
                                )
                              }
                              else
                              {
                                return (
                                  <div>
                                    <h3>Please select filter till Buying controller to view bottom performing subgroups</h3>
                                  </div>
                                )

                              }
                            })()}
                          </div>
                        </div>

                        {/*Row for Drivers of sales*/}
                        {(() => {
                          if (this.props.Executive.kpi_param=='kpi_type=Value')
                          {
                            return (
                              <div className="mainBox">
                                <div className="headerBox">
                                <h2 className="pageModuleMainTitle">Drivers Of Sales</h2>
                                </div>
                                {/*Internal External Tab*/}

                                <Nav style={{marginLeft: '1%', marginBottom: '0%'}} bsStyle="tabs" activeKey={this.state.activeKey4} onSelect={this.handleSelect} className="tabsCustom  mainTab">
                                  <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                                    driverParam = "internal";
                                    this.setState({activeKey4: "1"});
                                    this.props.onSaveDriverParam(driverParam);

                                  }}><span className="tab_label">Internal</span></NavItem>

                                  <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                                    this.setState({activeKey4: "2"});
                                    driverParam = "external";
                                    this.props.onSaveDriverParam(driverParam);
                                  }}><span className="tab_label">External</span></NavItem>


                                </Nav>
                                {/*Row for internal/external drivers of sales*/}
                                {(() => {
                                  if (this.props.Executive.driver_param=='internal') {
                                    return(


                                      <div className="mainBox">

                                        <Nav style={{marginLeft: '1%', marginBottom: '0%'}} bsStyle="tabs" activeKey={this.state.activeKey9} onSelect={this.handleSelect} className="tabsCustom">
                                          <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                                            let value_internal_tab = "kpi";
                                            this.setState({activeKey9: "1"});
                                            this.props.onSaveValueInternal(value_internal_tab);

                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>

                                            <b style={{textDecoration: 'none'}}>KPI Contribution</b></NavItem>

                                          <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                                            let value_internal_tab = "promo";
                                            this.setState({activeKey9: "2"});
                                            this.props.onSaveValueInternal(value_internal_tab);
                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                            style={{textDecoration: 'none'}}>Promotion Contribution</b></NavItem>


                                        </Nav>
                                        <div className=" row mainBox">

                                          {(() =>{
                                              if(this.props.Executive.value_internal_tab=='kpi')
                                              {
                                                return (
                                                  <div className="row">
                                                    <h2 className="pageModuleSubTitle">KPI</h2>

                                                    {(() =>{
                                                        if(this.props.Executive.drivers_internal_data){
                                                          if(this.props.Executive.drivers_internal_data.kpi_data_available_flag=='yes')
                                                          {
                                                            return(
                                                              <StackedChart data= {this.props.drivers_internal_data.kpi}
                                                                            col_label = {this.props.Executive.drivers_internal_data.kpi_col_label}
                                                                            legend_label ={this.props.Executive.drivers_internal_data.kpi_legend_label}/>

                                                            )

                                                          }
                                                          else {
                                                            return(
                                                              <div>
                                                                <h3> Data available only for weeks from 201702</h3>
                                                              </div>
                                                            )
                                                          }

                                                        }
                                                      }

                                                    )()}


                                                  </div>
                                                )
                                              }
                                              else{
                                                return (
                                                  <div className="row">
                                                    <h2 className="pageModuleSubTitle">Promotion</h2>
                                                    {(() =>{
                                                        if(this.props.Executive.drivers_internal_data){
                                                          return(
                                                            <StackedChart id="stackedChartPromotion" data= {this.props.Executive.drivers_internal_data.promo}
                                                                          col_label = {this.props.Executive.drivers_internal_data.promo_col_label}
                                                                          legend_label ={this.props.Executive.drivers_internal_data.promo_legend_label}/>
                                                          )
                                                        }
                                                      }

                                                    )()}
                                                  </div>
                                                )
                                              }

                                            }
                                          )()}

                                        </div>

                                      </div>)

                                  }
                                  else{
                                    return(
                                      <div className="row mainBox">


                                        {/*Row for weather data*/}
                                        <div className="row">
                                          <Nav style={{marginLeft: '1%', marginBottom: '0%'}} bsStyle="tabs" activeKey={this.state.activeKey10} onSelect={this.handleSelect} className="tabsCustom">
                                            <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                                              let value_external_tab = "sunshine";
                                              this.setState({activeKey10: "1"});
                                              this.props.onSaveValueExternal(value_external_tab);

                                            }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                                              <b style={{textDecoration: 'none'}}>Sunshine</b></NavItem>

                                            <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                                              let value_external_tab = "rainfall";
                                              this.setState({activeKey10: "2"});
                                              this.props.onSaveValueExternal(value_external_tab);
                                            }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                              style={{textDecoration: 'none'}}>Rainfall</b></NavItem>

                                            <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                                              let value_external_tab = "temperature";
                                              this.setState({activeKey10: "3"});
                                              this.props.onSaveValueExternal(value_external_tab);
                                            }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                              style={{textDecoration: 'none'}}>Temperature</b></NavItem>


                                          </Nav>

                                          {(() =>{

                                              if(this.props.Executive.value_external_tab=='rainfall')
                                              {
                                                return(
                                                  <div>
                                                    <h3 className="pageModuleSubTitle">Rainfall</h3>
                                                    {(() => {
                                                      if (this.props.Executive.drivers_external_data) {
                                                        console.log("Promo Sales line chart data", this.props.Executive.drivers_external_data.rainfall);
                                                        return (
                                                          <div>
                                                            <div style={{float:"right"}}>
                                                              <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                                                                <MenuItem onClick={() => {
                                                                  saveImage(document.getElementById('rainfall_line'+'_svg'),"external_drivers_rainfall")
                                                                }
                                                                }>Save As JPEG</MenuItem>
                                                                <MenuItem onClick={() => {
                                                                  saveDataAsCSV(this.props.Executive.drivers_external_data.rainfall,"external_drivers_rainfall.csv")
                                                                }
                                                                }>Download CSV</MenuItem>
                                                              </DropdownButton>
                                                            </div>
                                                            <MultilineThree data={this.props.Executive.drivers_external_data.rainfall}
                                                                            id="rainfall_line" label_ty="Rainfall TY" label_ly="Rainfall LY"
                                                                            xaxis_title="Tesco Week" no_pref='£' no_suffix='' no_pref2='' no_suffix2=''
                                                                            yaxis_title='Value' yaxis_title2='Weather'/>
                                                          </div>
                                                        );
                                                      }
                                                    })()}
                                                  </div>
                                                )
                                              }
                                              else {
                                                if (this.props.Executive.value_external_tab == 'sunshine') {
                                                  return (
                                                    <div>
                                                      <h3 className="pageModuleSubTitle">Sunshine</h3>
                                                      {(() => {
                                                        if (this.props.Executive.drivers_external_data) {
                                                          console.log("Promo Sales line chart data", this.props.Executive.drivers_external_data.sunshine);
                                                          return (
                                                            <div>
                                                              <div style={{float:"right"}}>
                                                                <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                                                                  <MenuItem onClick={() => {
                                                                    saveImage(document.getElementById('sunshine_line'+'_svg'),"external_drivers_sunshine")
                                                                  }
                                                                  }>Save As JPEG</MenuItem>
                                                                  <MenuItem onClick={() => {
                                                                    saveDataAsCSV(this.props.Executive.drivers_external_data.sunshine,"external_drivers_sunshine.csv")
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
                                                  return (
                                                    <div>
                                                      <h3 className="pageModuleSubTitle">Temperature</h3>
                                                      {(() => {
                                                        if (this.props.Executive.drivers_external_data) {
                                                          console.log("Promo Sales line chart data", this.props.Executive.drivers_external_data.temperature);
                                                          return (
                                                            <div>
                                                              <div style={{float:"right"}}>
                                                                <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                                                                  <MenuItem onClick={() => {
                                                                    saveImage(document.getElementById('temperature_line'+'_svg'),"external_drivers_temperature")
                                                                  }
                                                                  }>Save As JPEG</MenuItem>
                                                                  <MenuItem onClick={() => {
                                                                    saveDataAsCSV(this.props.Executive.drivers_external_data.temperature,"external_drivers_temperature.csv")
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
                                              }
                                            }
                                          )()}






                                        </div>
                                        {/*Row for holidays*/}
                                        <div className="row">
                                          <div className="headerBox">
                                          <h3 className="pageModuleMainTitle">Holidays</h3>
                                          </div>
                                          {/*Holiday Table*/}
                                          <div className="col-md-6" style={{paddingTop : "80px"}}>

                                            {(() => {
                                              if (this.props.Executive.overview_drivers_external_data) {
                                                return (
                                                  <div className="promoTable">
                                                    <BootstrapTable className="promoTable"
                                                                    data={this.props.Executive.overview_drivers_external_data.holidays}
                                                                    pagination = {true} options={options}
                                                                    striped={true}
                                                                    condensed>

                                                      <TableHeaderColumn  dataAlign={"left"} dataField='tesco_week' isKey>Tesco Week</TableHeaderColumn>
                                                      <TableHeaderColumn  dataAlign={"left"} dataField='holiday_date'>Holiday Date</TableHeaderColumn>
                                                      <TableHeaderColumn  tdStyle={{whiteSpace:'normal'}} dataAlign={"left"} dataField='holiday_description'>Holiday Description</TableHeaderColumn>
                                                    </BootstrapTable>
                                                  </div>
                                                )
                                              }else {
                                                return (<div>Loading</div>)
                                              }

                                            })()}



                                          </div>
                                          {/*Value Trend*/}
                                          <div className="col-md-6">
                                            {(() => {
                                              if (this.props.Executive.overview_kpi_trend_data) {
                                                console.log("Promo Sales line chart data", this.props.Executive.overview_kpi_trend_data.sales_trend);
                                                return (
                                                  <div>
                                                    <div style={{float:"right"}}>
                                                      <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                                                        <MenuItem onClick={() => {
                                                          saveImage(document.getElementById('holiday_value_line'+'_svg'),"overview_kpi_sales_trend")
                                                        }
                                                        }>Save As JPEG</MenuItem>
                                                        <MenuItem onClick={() => {
                                                          saveDataAsCSV(this.props.Executive.overview_kpi_trend_data.sales_trend,"overview_kpi_sales_trend.csv")
                                                        }
                                                        }>Download CSV</MenuItem>
                                                      </DropdownButton>
                                                    </div>
                                                    <MultilinePromo data={this.props.Executive.overview_kpi_trend_data.sales_trend} id="holiday_value_line" label_ty="Sales TY" label_ly="Sales LY" xaxis_title="Tesco Week" no_pref='£' no_suffix='' yaxis_title='Value'/>
                                                  </div>
                                                );
                                              }
                                            })()}
                                          </div>
                                        </div>
                                      </div>)
                                  }
                                })()}
                              </div>

                            )
                          }
                          else {
                            return(
                              <div style={{height: "200px"}}></div>
                            )
                          }
                        })()}


                      </div>
                    )
                  }

                }
              })()}
            </div>

          </div>


          {/*MODAL FOR top - Supplier Info*/}

          <Modal show={this.state.topsuppInfo} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg"
          >
            <Modal.Header>

              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                style={{textAlign: 'center', fontSize: '14px'}}><b>Supplier Info</b><span
                style={{textAlign: 'right', float: 'right'}}
                onClick={() => this.setState({topsuppInfo: false})}><b>X</b></span></span>
                <div style={{textAlign: 'center'}}>
                  <div style={{textAlign: 'right'}}>
                  </div>
                </div>
              </Modal.Title>

            </Modal.Header>
            <Modal.Body style={{fontSize: '14px'}}>
              <div className="row">
                <div className="col-md-4">
                  {(() => {
                    if (this.props.Executive.top_name!='None') {
                      return (
                        <Nav bsStyle="tabs" activeKey={this.state.activeKey6} onSelect={this.handleSelect}
                             className="tabsCustom2">
                          <NavItem className="tabsCustomList2" eventKey="1" onClick={() => {
                            suppName = this.props.Executive.best_info_data.top_5_supp[0].parent_supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey6: "1"});
                            this.props.loadTopSupplierInfoData();


                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                            <b style={{textDecoration: 'none'}}>{this.props.Executive.best_info_data.top_5_supp[0].parent_supplier}</b></NavItem>

                          <NavItem className="tabsCustomList2" eventKey="2" onClick={() => {
                            suppName = this.props.Executive.best_info_data.top_5_supp[1].parent_supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey6: "2"});
                            this.props.loadTopSupplierInfoData();

                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                            style={{textDecoration: 'none'}}>{this.props.Executive.best_info_data.top_5_supp[1].parent_supplier}</b></NavItem>

                          <NavItem className="tabsCustomList2" eventKey="3" onClick={() => {
                            suppName = this.props.Executive.best_info_data.top_5_supp[2].parent_supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey6: "3"});
                            this.props.loadTopSupplierInfoData();
                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                            style={{textDecoration: 'none'}}>{this.props.Executive.best_info_data.top_5_supp[2].parent_supplier}</b></NavItem>

                          <NavItem className="tabsCustomList2" eventKey="4" onClick={() => {
                            suppName = this.props.Executive.best_info_data.top_5_supp[3].parent_supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey6: "4"});
                            this.props.loadTopSupplierInfoData();

                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                            style={{textDecoration: 'none'}}>{this.props.Executive.best_info_data.top_5_supp[3].parent_supplier}</b></NavItem>

                          <NavItem className="tabsCustomList2" eventKey="5" onClick={() => {
                            suppName = this.props.Executive.best_info_data.top_5_supp[4].parent_supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey6: "5"});
                            this.props.loadTopSupplierInfoData();
                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                            style={{textDecoration: 'none'}}>{this.props.Executive.best_info_data.top_5_supp[4].parent_supplier}</b></NavItem>

                        </Nav>
                      );
                    }
                  })()}


                </div>
                <div className="col-md-8">
                  {(() => {
                    if (this.props.Executive.top_supp_info_data) {
                      if (this.props.Executive.supplier_name!='None')


                        return (
                          <div>
                            <h3>Supplier Info</h3>
                            {/*Row for KPIs*/}
                            <div className="row">
                              <div className="panel-body">
                                <div className="col-md-4 kpiSmall">


                                  <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.top_supp_info_data.yoy_var > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.top_supp_info_data.yoy_var < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>{this.props.Executive.top_supp_info_data.yoy_var}%
                                  </h3>
                                  <h4 className="kpiSubTitle">YoY</h4>

                                </div>
                                <div className="col-md-4 kpiSmall">

                                  <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.top_supp_info_data.cont_to_grwth > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.top_supp_info_data.cont_to_grwth < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                    {this.props.Executive.top_supp_info_data.cont_to_grwth}%
                                  </h3>
                                  <h4 className="kpiSubTitle">Contri to growth</h4>

                                </div>
                                <div className="col-md-4 kpiSmall">

                                  <h3>

                                    {this.props.Executive.top_supp_info_data.sales_share}%
                                  </h3>
                                  <h4 className="kpiSubTitle">Sales Share</h4>

                                </div>
                              </div>
                            </div>
                            {/*Row for Gauge Charts*/}
                            <div className="row">
                              <div className="col-md-6 col-xs-12">
                                <h3>Importance to Supplier</h3>
                                <GaugeExec data={[this.props.Executive.top_supp_info_data.imp_to_supp]} id="top_gauge1" />
                              </div>
                              <div className="col-md-6 col-xs-12">
                                <h3>Importance to Category</h3>
                                <GaugeExec data={[this.props.Executive.top_supp_info_data.imp_to_categ]} id="top_gauge2" />
                              </div>
                            </div>
                          </div>
                        );
                      else{
                        return (
                          <div><h3>Old data is present</h3></div>
                        );
                      }

                    }
                    else{
                      return(





                        <div>
                          <h3>
                            Select a supplier to view information
                          </h3>
                        </div>
                      )
                    }
                  })()}
                </div>

              </div>

            </Modal.Body>
          </Modal>

          {/*MODAL FOR bot - Supplier Info*/}

          <Modal show={this.state.botsuppInfo} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg">
            <Modal.Header>

              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                style={{textAlign: 'center', fontSize: '14px'}}><b>Supplier Info</b><span
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
                <div className="col-md-4 col-xs-12">
                  {(() => {
                    if (this.props.Executive.bot_name!='None') {
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
                            <b style={{textDecoration: 'none'}}>{this.props.Executive.worst_info_data.bot_5_supp[0].parent_supplier}</b></NavItem>

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
                            style={{textDecoration: 'none'}}>{this.props.Executive.worst_info_data.bot_5_supp[3].parent_supplier}</b></NavItem>

                          <NavItem className="tabsCustomList2" eventKey="5" onClick={() => {
                            suppName = this.props.Executive.worst_info_data.bot_5_supp[4].parent_supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey8: "5"});
                            this.props.loadBotSupplierInfoData();
                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                            style={{textDecoration: 'none'}}>{this.props.Executive.worst_info_data.bot_5_supp[4].parent_supplier}</b></NavItem>

                        </Nav>
                      );
                    }
                  })()}


                </div>
                <div className="col-md-8 col-xs-12">
                  {(() => {
                    if (this.props.Executive.bot_supp_info_data) {
                      if(this.props.Executive.supplier_name!='None')
                      {
                        return (

                          <div>
                            <h3>Supplier Info</h3>
                            {/*Row for KPIs*/}
                            <div className="row">
                              <div className="panel-body">
                                <div className="col-md-4 kpiSmall">


                                  <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.bot_supp_info_data.yoy_var > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.bot_supp_info_data.yoy_var < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>{this.props.Executive.bot_supp_info_data.yoy_var}%
                                  </h3>
                                  <h4 className="kpiSubTitle">YoY</h4>

                                </div>
                                <div className="col-md-4 kpiSmall">

                                  <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.bot_supp_info_data.cont_to_grwth > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.bot_supp_info_data.cont_to_grwth < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                    {this.props.Executive.bot_supp_info_data.cont_to_grwth}%
                                  </h3>
                                  <h4 className="kpiSubTitle">Contri to growth</h4>

                                </div>
                                <div className="col-md-4 kpiSmall">

                                  <h3>sales_share

                                    {this.props.Executive.bot_supp_info_data.sales_share}%
                                  </h3>
                                  <h4 className="kpiSubTitle">Sales Share</h4>

                                </div>
                              </div>
                            </div>
                            {/*Row for Gauge Charts*/}
                            <div className="row">
                              <div className="col-md-6 col-xs-12">
                                <h3>Importance to Supplier</h3>
                                <GaugeChart2 data={[this.props.Executive.bot_supp_info_data.imp_to_supp]} id="bot_gauge1" />
                              </div>
                              <div className="col-md-6 col-xs-12">
                                <h3>Importance to Category</h3>
                                <GaugeChart2 data={[this.props.Executive.bot_supp_info_data.imp_to_categ]} id="bot_gauge2" />
                              </div>
                            </div>
                          </div>

                        );}
                      else{
                        return(<div><h3>Old data present</h3></div>);
                      }
                    }
                    else{
                      return(


                        <div>
                          <h3>
                            Select a supplier to view information
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
    onSaveFilteredFlag: (e) => dispatch(SaveFilteredFlag(e)),
    onSaveTopName: (e) => dispatch(SaveTopName(e)),
    onSaveBotName: (e) => dispatch(SaveBotName(e)),
    onSaveSupplierName: (e) => dispatch(SaveSupplierName(e)),
    onSaveTopBotFlag: (e) => dispatch(SaveTopBotFlag(e)),
    onSaveValueInternal: (e) => dispatch(SaveValueInternal(e)),
    onSaveValueExternal: (e) => dispatch(SaveValueExternal(e)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Executive);
