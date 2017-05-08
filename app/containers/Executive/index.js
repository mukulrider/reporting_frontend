/*
 *
 * Executive
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import {Modal,Nav, NavItem} from 'react-bootstrap';
import Panel from 'components/panel';
import './style.scss';
import { createStructuredSelector } from 'reselect';
import makeSelectExecutive from './selectors';
import Button from 'components/button';
import messages from './messages';


//For Filter
import ExecFilter from 'components/ExecFilter';

// For KPIs and Charts
import MultilinePromo from 'components/MultilinePromo';
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
  SaveSupplierName
}
from './actions.js'
import MultilineThree from 'components/MultilineThree';



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

      }
      else {
        if(this.props.Executive.kpi_param=='kpi_type=Price')
        {
          console.log("______________________ Only Price function Called")
          this.props.loadPriceKPIData();


        }

        else {
          console.log("______________________ Only KPI functions Called")
          this.props.loadRolesAndIntent();
          this.props.loadBudgetAndForecast();

          this.props.loadKpiBoxes();
          this.props.loadBestWorst();
          this.props.loadBestInfoData();

          this.props.loadWorstInfoData();
          this.props.loadSupplierInfoData();
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
      activeKey6: "1",
      activeKey7: "1"
    };

  }

  render() {
    let kpiparam = this.props.Executive.kpi_param;
    let dataWeekParam = this.props.Executive.week_param;
    let driverParam = this.props.Executive.driver_param;
    let topName = '';
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
                               previous_week_selection = {this.props.weekurlParam}
                               kpi_param = {this.props.Executive.kpi_param}
                              loadOverviewKpi = { this.props.loadOverviewKpi}
                              loadRolesAndIntent = { this.props.loadRolesAndIntent}
                              loadBudgetAndForecast = { this.props.loadBudgetAndForecast}
                              loadOverviewKpiTrend = { this.props.loadOverviewKpiTrend}
                              loadOverviewDriversInternal = { this.props.loadOverviewDriversInternal}
                              loadOverviewDriversExternal = { this.props.loadOverviewDriversExternal}
                              loadKpiBoxes = { this.props.loadKpiBoxes}
                              loadBestWorst = { this.props.loadBestWorst}

                              loadBestInfoData = { this.props.loadBestInfoData}
                              loadWorstInfoData = { this.props.loadWorstInfoData}
                              loadSupplierInfoData = { this.props.loadSupplierInfoData}
                              loadDriversInternalData = { this.props.loadDriversInternalData}

                              loadDriversExternalData = { this.props.loadWorstInfoData}
                              loadPriceKPIData = { this.props.loadSupplierInfoData}
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

        <div className="row" style={{marginLeft: "0.5%", paddingTop: "-5px"}}>
            <div className="col-md-12 content-wrap">
              <h3> Executive View - Week &nbsp; </h3>
              {/*Nav for time period*/}
              <Nav bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect} className="tabsCustom">
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

                    }
                    else {
                      if(this.props.Executive.kpi_param=='kpi_type=Price')
                      {
                        console.log("______________________ Only Price function Called")
                        this.props.loadPriceKPIData();


                      }

                      else {
                        console.log("______________________ Only KPI functions Called")
                        this.props.loadRolesAndIntent();
                        this.props.loadBudgetAndForecast();

                        this.props.loadKpiBoxes();
                        this.props.loadBestWorst();
                        this.props.loadBestInfoData();

                        this.props.loadWorstInfoData();
                        this.props.loadSupplierInfoData();
                        this.props.loadDriversInternalData();
                        this.props.loadDriversExternalData();
                      }

                    }
                  })()}




                }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                  <b style={{textDecoration: 'none'}}>Current Week</b></NavItem>

                <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                  this.setState({activeKey1: "2"});
                  dataWeekParam = "week_flag=Latest 4 Weeks";
                  this.props.onSaveWeekParam(dataWeekParam);


                  {(() => {
                    if (this.props.Executive.kpi_param=='kpi_type=Overview') {
                      console.log("______________________ Only Overview function Called")
                      this.props.loadOverviewKpi();
                      this.props.loadOverviewKpiTrend();
                      this.props.loadOverviewDriversInternal();
                      this.props.loadOverviewDriversExternal();

                    }
                    else {
                      if(this.props.Executive.kpi_param=='kpi_type=Price')
                      {
                        console.log("______________________ Only Price function Called")
                        this.props.loadPriceKPIData();


                      }

                      else {
                        console.log("______________________ Only KPI functions Called")
                        this.props.loadRolesAndIntent();
                        this.props.loadBudgetAndForecast();

                        this.props.loadKpiBoxes();
                        this.props.loadBestWorst();
                        this.props.loadBestInfoData();

                        this.props.loadWorstInfoData();
                        this.props.loadSupplierInfoData();
                        this.props.loadDriversInternalData();
                        this.props.loadDriversExternalData();
                      }

                    }
                  })()}






                }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                  style={{textDecoration: 'none'}}>Last 4 weeks</b></NavItem>

                <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                  this.setState({activeKey1: "3"});
                  dataWeekParam = "week_flag=Latest 13 Weeks";
                  this.props.onSaveWeekParam(dataWeekParam);

                  {(() => {
                    if (this.props.Executive.kpi_param=='kpi_type=Overview') {
                      console.log("______________________ Only Overview function Called")
                      this.props.loadOverviewKpi();
                      this.props.loadOverviewKpiTrend();
                      this.props.loadOverviewDriversInternal();
                      this.props.loadOverviewDriversExternal();

                    }
                    else {
                      if(this.props.Executive.kpi_param=='kpi_type=Price')
                      {
                        console.log("______________________ Only Price function Called")
                        this.props.loadPriceKPIData();


                      }

                      else {
                        console.log("______________________ Only KPI functions Called")
                        this.props.loadRolesAndIntent();
                        this.props.loadBudgetAndForecast();

                        this.props.loadKpiBoxes();
                        this.props.loadBestWorst();
                        this.props.loadBestInfoData();

                        this.props.loadWorstInfoData();
                        this.props.loadSupplierInfoData();
                        this.props.loadDriversInternalData();
                        this.props.loadDriversExternalData();
                      }

                    }
                  })()}





                }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                  style={{textDecoration: 'none'}}>Last 13 weeks</b></NavItem>

                <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                  this.setState({activeKey1: "4"});
                  dataWeekParam = "week_flag=Latest 26 Weeks";
                  this.props.onSaveWeekParam(dataWeekParam);

                  {(() => {
                    if (this.props.Executive.kpi_param=='kpi_type=Overview') {
                      console.log("______________________ Only Overview function Called")
                      this.props.loadOverviewKpi();
                      this.props.loadOverviewKpiTrend();
                      this.props.loadOverviewDriversInternal();
                      this.props.loadOverviewDriversExternal();

                    }
                    else {
                      if(this.props.Executive.kpi_param=='kpi_type=Price')
                      {
                        console.log("______________________ Only Price function Called")
                        this.props.loadPriceKPIData();


                      }

                      else {
                        console.log("______________________ Only KPI functions Called")
                        this.props.loadRolesAndIntent();
                        this.props.loadBudgetAndForecast();

                        this.props.loadKpiBoxes();
                        this.props.loadBestWorst();
                        this.props.loadBestInfoData();

                        this.props.loadWorstInfoData();
                        this.props.loadSupplierInfoData();
                        this.props.loadDriversInternalData();
                        this.props.loadDriversExternalData();
                      }

                    }
                  })()}



                }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                  style={{textDecoration: 'none'}}>Last 26 weeks</b></NavItem>

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

                    }
                    else {
                      if(this.props.Executive.kpi_param=='kpi_type=Price')
                      {
                        console.log("______________________ Only Price function Called")
                        this.props.loadPriceKPIData();


                      }

                      else {
                        console.log("______________________ Only KPI functions Called")
                        this.props.loadRolesAndIntent();
                        this.props.loadBudgetAndForecast();

                        this.props.loadKpiBoxes();
                        this.props.loadBestWorst();
                        this.props.loadBestInfoData();

                        this.props.loadWorstInfoData();
                        this.props.loadSupplierInfoData();
                        this.props.loadDriversInternalData();
                        this.props.loadDriversExternalData();
                      }

                    }
                  })()}




                }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                  style={{textDecoration: 'none'}}>YTD</b></NavItem>
              </Nav>
              {/*Nav for kpi type*/}
              <Nav bsStyle="tabs" activeKey={this.state.activeKey2} onSelect={this.handleSelect} className="tabsCustom">
                <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                  kpiparam = "kpi_type=Overview";
                  this.setState({activeKey2: "1"});
                  this.props.onSaveKPIParam(kpiparam);
                  this.props.onSaveDriverParam("internal");

                  this.props.loadOverviewKpi();
                  this.props.loadOverviewKpiTrend();
                  this.props.loadOverviewDriversInternal();
                  this.props.loadOverviewDriversExternal();
                  this.props.loadRolesAndIntent();
                  this.props.loadBudgetAndForecast();





                }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                  <b style={{textDecoration: 'none'}}>Overview</b></NavItem>

                <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                  kpiparam = "kpi_type=Value";
                  this.setState({activeKey2: "2"});
                  this.props.onSaveKPIParam(kpiparam);
                  this.props.onSaveDriverParam("internal");



                        this.props.loadKpiBoxes();
                        this.props.loadBestWorst();
                        this.props.loadDriversInternalData();
                        this.props.loadDriversExternalData();


                }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                  style={{textDecoration: 'none'}}>Value</b></NavItem>

                <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                  kpiparam = "kpi_type=Volume";
                  this.setState({activeKey2: "3"});
                  this.props.onSaveKPIParam(kpiparam);


                  this.props.loadKpiBoxes();
                  this.props.loadBestWorst();

                }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                  style={{textDecoration: 'none'}}>Volume</b></NavItem>

                <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                  kpiparam = "kpi_type=COGS";
                  this.setState({activeKey2: "4"});
                  this.props.onSaveKPIParam(kpiparam);

                  this.props.loadKpiBoxes();
                  this.props.loadBestWorst();



                }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                  style={{textDecoration: 'none'}}>COGS</b></NavItem>

                <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                  kpiparam = "kpi_type=Profit";
                  this.setState({activeKey2: "5"});
                  this.props.onSaveKPIParam(kpiparam);

                  this.props.loadKpiBoxes();
                  this.props.loadBestWorst();



                }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                  style={{textDecoration: 'none'}}>Profit</b></NavItem>

                <NavItem className="tabsCustomList" eventKey="6" onClick={() => {
                  kpiparam = "kpi_type=Price";
                  this.setState({activeKey2: "6"});
                  this.props.onSaveKPIParam(kpiparam);
                  this.props.loadPriceKPIData();
                }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                  style={{textDecoration: 'none'}}>Price</b></NavItem>


              </Nav>

              {(() => {
                if (this.props.Executive.kpi_param=='kpi_type=Overview') {
                  return (
                    <div>
                    <h3>Success ----- Overview</h3>
                      {/*Row for KPI Boxes */}
                      <h2 className="pageModuleMainTitle">Performance by KPI </h2>
                    <div className="row" style={{textAlign: 'center',backgroundColor: "white",margin: "0%",borderLeft: "1px solid #e5e8ea",borderRight: "1px solid #e5e8ea",borderBottom: "1px solid #e5e8ea"}}>
                      {/* Box for value */}
                      <div className="col-xs-2" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                <Panel>
                  <h3 className="pageModuleSubTitle"> Value               {
                        this.props.Executive.overview_kpi_data.kpi.value.total

                    }

                  </h3>
                  <div className="row">
                    <div className="col-xs-12">

                      <h3></h3>
                    </div>

                   </div>
                  <div className="row">
                    <div className="panel-body">
                      <div className="col-xs-6 kpiSmall">


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
                        <div className="col-xs-6 kpiSmall">

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
                      <div className="col-xs-2" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                        <Panel>
                          <h3 className="pageModuleSubTitle"> Volume               {
                            this.props.Executive.overview_kpi_data.kpi.volume.total

                          }

                          </h3>
                          <div className="row">
                            <div className="col-xs-12">

                              <h3></h3>

                            </div>

                          </div>
                          <div className="row">
                            <div className="panel-body">
                              <div className="col-xs-6 kpiSmall">


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
                              <div className="col-xs-6 kpiSmall">

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
                      <div className="col-xs-2" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                        <Panel>
                          <h3 className="pageModuleSubTitle"> COGS               {
                            this.props.Executive.overview_kpi_data.kpi.cogs.total

                          }

                          </h3>
                          <div className="row">
                            <div className="col-xs-12">

                              <h3></h3>
                            </div>

                          </div>
                          <div className="row">
                            <div className="panel-body">
                              <div className="col-xs-6 kpiSmall">


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
                              <div className="col-xs-6 kpiSmall">

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
                      <div className="col-xs-2" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                        <Panel>
                          <h3 className="pageModuleSubTitle"> Profit               {
                            this.props.Executive.overview_kpi_data.kpi.cgm.total

                          }

                          </h3>
                          <div className="row">
                            <div className="col-xs-12">

                              <h3></h3>
                            </div>

                          </div>
                          <div className="row">
                            <div className="panel-body">
                              <div className="col-xs-6 kpiSmall">


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
                              <div className="col-xs-6 kpiSmall">

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
                      <div className="col-xs-2" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                        <Panel>
                          <h3 className="pageModuleSubTitle"> Price

                          </h3>
                          <div className="row">
                            <div className="col-xs-12">

                              <h3></h3>
                            </div>

                          </div>
                          <div className="row">
                            <div className="panel-body">
                              <div className="col-xs-6 kpiSmall">


                                <h3>


                                  {this.props.Executive.overview_kpi_data.price.ACP}%
                                </h3>
                                <h4 className="kpiSubTitle">ACP</h4>

                              </div>
                              <div className="col-xs-6 kpiSmall">

                                <h3>

                                  {this.props.Executive.overview_kpi_data.price.ASP}%
                                </h3>
                                <h4 className="kpiSubTitle">ASP</h4>

                              </div>

                            </div>
                          </div>
                        </Panel>
                      </div>
                      {/* Box for Market Share */}
                      <div className="col-xs-2" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                        <Panel>
                          <h3 className="pageModuleSubTitle"> Market Share

                          </h3>
                          <div className="row">
                            <div className="col-xs-12">

                              <h3></h3>
                            </div>

                          </div>
                          <div className="row">
                            <div className="panel-body">
                              <div className="col-xs-6 kpiSmall">


                                <h3>


                                  {this.props.Executive.overview_kpi_data.market.share}%
                                </h3>
                                <h4 className="kpiSubTitle">Value Share</h4>

                              </div>
                              <div className="col-xs-6 kpiSmall">

                                <h3>

                                  {this.props.Executive.overview_kpi_data.market.outperformance}%
                                </h3>
                                <h4 className="kpiSubTitle">Value Outperf.</h4>

                              </div>

                            </div>
                          </div>
                        </Panel>
                      </div>

                </div>
                      {/*Row for Trended performance*/}
                      <h2 className="pageModuleMainTitle">Trended Performance</h2>
                      {/*Row for value and volume*/}
                      <div className="row">
                        {/*Value Trend*/}
                        <div className="col-xs-6">
                          <h3 className="pageModuleSubTitle"> Value</h3>
                            {(() => {
                            if (this.props.Executive.overview_kpi_trend_data) {
                              console.log("overview_kpi_trend_data value line chart data", this.props.Executive.overview_kpi_trend_data.sales_trend);
                              return (
                                <MultilinePromo data={this.props.Executive.overview_kpi_trend_data.sales_trend} id="overview_value_line" label_ty="Sales TY" label_ly="Sales LY" xaxis_title="Tesco Week" no_pref='£' no_suffix='' yaxis_title='Value'/>
                              );
                            }
                          })()}
                        </div>
                        {/*Volume Trend*/}
                        <div className="col-xs-6">
                          <h3 className="pageModuleSubTitle"> Volume</h3>
                          {(() => {
                            if (this.props.Executive.overview_kpi_trend_data) {
                              console.log("overview_kpi_trend_data volume line chart data", this.props.Executive.overview_kpi_trend_data.volume_trend);
                              return (
                                <MultilinePromo data={this.props.Executive.overview_kpi_trend_data.volume_trend} id="overview_volume_line" label_ty="Volume TY" label_ly="Volume LY" xaxis_title="Tesco Week" no_pref='' no_suffix='' yaxis_title='Volume'/>
                              );
                            }
                          })()}

                        </div>
                      </div>
                      {/*Row for COGS and CGM*/}
                      <div className="row">
                        {/*COGS Trend*/}
                        <div className="col-xs-6">
                          <h3 className="pageModuleSubTitle"> COGS</h3>
                          {(() => {
                            if (this.props.Executive.overview_kpi_trend_data) {
                              console.log("overview_kpi_trend_data COGS line chart data", this.props.Executive.overview_kpi_trend_data.cogs_trend);
                              return (
                                <MultilinePromo data={this.props.Executive.overview_kpi_trend_data.cogs_trend} id="overview_cogs_line" label_ty="COGS TY" label_ly="COGS LY" xaxis_title="Tesco Week" no_pref='£' no_suffix='' yaxis_title='COGS'/>
                              );
                            }
                          })()}
                        </div>
                        {/*CGM Trend*/}
                        <div className="col-xs-6">
                          <h3 className="pageModuleSubTitle"> Profit</h3>
                          {(() => {
                            if (this.props.Executive.overview_kpi_trend_data) {
                              console.log("overview_kpi_trend_data profit line chart data", this.props.Executive.overview_kpi_trend_data.cgm_trend);
                              return (
                                <MultilinePromo data={this.props.Executive.overview_kpi_trend_data.cgm_trend} id="overview_cgm_line" label_ty="Profit TY" label_ly="Profit LY" xaxis_title="Tesco Week" no_pref='£' no_suffix='' yaxis_title='Profit'/>
                              );
                            }
                          })()}

                        </div>
                      </div>

                      {/*Internal External Tab*/}
                      <Nav bsStyle="tabs" activeKey={this.state.activeKey3} onSelect={this.handleSelect} className="tabsCustom">
                        <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                          driverParam = "internal";
                          this.setState({activeKey3: "1"});
                          this.props.onSaveDriverParam(driverParam);

                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                          <b style={{textDecoration: 'none'}}>Internal</b></NavItem>

                        <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                          this.setState({activeKey3: "2"});
                          driverParam = "external";
                          this.props.onSaveDriverParam(driverParam);

                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                          style={{textDecoration: 'none'}}>External</b></NavItem>


                      </Nav>
                      {/*Row for internal/external drivers of sales*/}
                      {(() => {
                        if (this.props.Executive.driver_param=='internal') {
                          return(
                         <div>
                           <h3>Internal</h3>
                         </div>)

                        }
                        else {
                          return(
                          <div>
                            <h3>External</h3>
                            {/*Row for Sunshine/Rainfall/Temp performance*/}
                            <div className="row">
                              {/*Block for sunshine*/}
                              <div className="col-xs-4" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                                <Panel>
                                  <h3 className="pageModuleSubTitle"> Sunshine

                                  </h3>
                                  <div className="row">
                                    <h3>{
                                      this.props.Executive.overview_drivers_external_data.sunshine.avg

                                    }</h3>
                                  </div>
                                  <div className="row">
                                    <div className="panel-body">
                                      <div className="col-xs-6 kpiSmall">


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
                                      <div className="col-xs-6 kpiSmall">

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
                              <div className="col-xs-4" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                                <Panel>
                                  <h3 className="pageModuleSubTitle"> Rainfall

                                  </h3>
                                  <div className="row">
                                    <h3>{
                                      this.props.Executive.overview_drivers_external_data.rainfall.avg

                                    }</h3>
                                  </div>
                                  <div className="row">
                                    <div className="panel-body">
                                      <div className="col-xs-6 kpiSmall">


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
                                      <div className="col-xs-6 kpiSmall">

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
                              <div className="col-xs-4" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                                <Panel>
                                  <h3 className="pageModuleSubTitle"> Temperature

                                  </h3>
                                  <div className="row">
                                    <h3>{
                                      this.props.Executive.overview_drivers_external_data.temperature.avg

                                    }</h3>
                                  </div>
                                  <div className="row">
                                    <div className="panel-body">
                                      <div className="col-xs-6 kpiSmall">


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
                                      <div className="col-xs-6 kpiSmall">

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
                            <div className="Row">
                            <h3 className="pageModuleMainTitle"> Holidays this week
                            </h3>
                              {/*Block for holidays table*/}
                              <div className="col-xs-4">
                              </div>
                              {/*Block for sales trend value*/}
                              <div className="col-xs-8">
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
                      <div>
                      <h3>Success ----- Price</h3>
                        {/*Row for price KPIS*/}
                        <div className="row">
                          {/*Block for ASP*/}

                          <div className='col-xs-4' style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                            <Panel>
                              <h3 className="pageModuleSubTitle"> ASP </h3>
                              <div className="row">
                                <div className="col-xs-6">

                                  <h3>Inflation  &nbsp; {this.props.Executive.price_kpi_data.asp.inflation}</h3>
                                </div>
                                <div className="col-xs-6">
                                  <h3>Fisher Inflation &nbsp; {this.props.Executive.price_kpi_data.asp.fisher_inflation} </h3>
                                </div>
                              </div>
                              <div className="row">
                                <div className="panel-body">
                                  <div className="col-xs-3 kpiSmall">


                                    <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.price_kpi_data.asp.yoy > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.price_kpi_data.asp.yoy < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                      {this.props.Executive.price_kpi_data.asp.yoy}%
                                    </h3>
                                    <h4 className="kpiSubTitle">YoY</h4>

                                  </div>
                                  <div className="col-xs-3 kpiSmall">

                                    <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.price_kpi_data.asp.lfl > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.price_kpi_data.asp.lfl < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                      {this.props.Executive.price_kpi_data.asp.lfl}%
                                    </h3>
                                    <h4 className="kpiSubTitle">LFL</h4>

                                  </div>
                                  <div className="col-xs-6 kpiSmall">

                                    <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.price_kpi_data.asp.wow > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.price_kpi_data.asp.wow < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                      {this.props.Executive.price_kpi_data.asp.fisher_inflation.wow}%
                                    </h3>
                                    <h4 className="kpiSubTitle">WoW</h4>

                                  </div>
                                </div>
                              </div>
                            </Panel>
                          </div>

                          {/*Block for ACP*/}

                          <div className='col-xs-4' style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                            <Panel>
                              <h3 className="pageModuleSubTitle"> ACP </h3>
                              <div className="row">
                                <div className="col-xs-6">

                                  <h3>Inflation  &nbsp; {this.props.Executive.price_kpi_data.acp.inflation}</h3>
                                </div>
                                <div className="col-xs-6">
                                  <h3>Fisher Inflation &nbsp; {this.props.Executive.price_kpi_data.acp.fisher_inflation} </h3>
                                </div>
                              </div>
                              <div className="row">
                                <div className="panel-body">
                                  <div className="col-xs-3 kpiSmall">


                                    <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.price_kpi_data.acp.yoy > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.price_kpi_data.acp.yoy < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                      {this.props.Executive.price_kpi_data.acp.yoy}%
                                    </h3>
                                    <h4 className="kpiSubTitle">YoY</h4>

                                  </div>
                                  <div className="col-xs-3 kpiSmall">

                                    <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.price_kpi_data.acp.lfl > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.price_kpi_data.acp.lfl < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                      {this.props.Executive.price_kpi_data.acp.lfl}%
                                    </h3>
                                    <h4 className="kpiSubTitle">LFL</h4>

                                  </div>
                                  <div className="col-xs-6 kpiSmall">

                                    <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.price_kpi_data.acp.wow > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.price_kpi_data.acp.wow < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                      {this.props.Executive.price_kpi_data.acp.wow}%
                                    </h3>
                                    <h4 className="kpiSubTitle">WoW</h4>

                                  </div>
                                </div>
                              </div>
                            </Panel>
                          </div>

                          {/*Block for Price Index*/}

                          <div className='col-xs-4' style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                            <Panel>
                              <h3 className="pageModuleSubTitle"> Price Index </h3>
                              <div className="row">
                                <div className="col-xs-6">

                                  <h3>vs. ASDA  &nbsp; </h3>
                                </div>
                                <div className="col-xs-6">
                                  <h3>Index &nbsp; {this.props.Executive.price_kpi_data.price_index.index} </h3>
                                </div>
                              </div>
                              <div className="row">
                                <div className="panel-body">
                                  <div className="col-xs-12 kpiSmall">
                                    <h3>
                                    <span
                                                                className={(() => {
                                                                  if (this.props.Executive.price_kpi_data.price_index.wow > 0)
                                                                  {
                                                                    return "glyphicon glyphicon-chevron-up glyphiconPositive"
                                                                  }
                                                                  else if (this.props.Executive.price_kpi_data.price_index.wow < 0)
                                                                  {
                                                                    return "glyphicon glyphicon-chevron-down glyphiconNegative"
                                                                  } else {
                                                                    return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                                                                  } })()}>&nbsp;

                        </span>
                                    {this.props.Executive.price_kpi_data.price_index.wow}%
                                  </h3>
                                  <h4 className="kpiSubTitle">WoW</h4>

                                  </div>


                                </div>
                              </div>
                            </Panel>
                          </div>

                        </div>
                      </div>
                    )

                  }

                  else {
                    return (
                      <div>
                      <h3>Non Overview Non Price</h3>
                        {/*Row for KPIS*/}
                        <div className="row">
                          {/*Block for total*/}

                            <div className={(() => {
                              if (this.props.Executive.kpi_param=='kpi_type=Value'||this.props.Executive.kpi_param=='kpi_type=Volume')
                              {
                                return "col-xs-4"
                              }
                              else
                              {
                                return "col-xs-6"
                              }  })()} style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                              <Panel>
                                <h3 className="pageModuleSubTitle"> Total {this.props.Executive.kpi_boxes_data.kpi_name} </h3>
                                <div className="row">
                                  <div className="col-xs-6">

                                    <h3>{this.props.Executive.kpi_boxes_data.total_value.total}</h3>
                                  </div>
                                  <div className="col-xs-6">
                                    <h3>LFL &nbsp; {this.props.Executive.kpi_boxes_data.total_value.total_lfl} </h3>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="panel-body">
                                    <div className="col-xs-4 kpiSmall">


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
                                    <div className="col-xs-4 kpiSmall">

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
                                    <div className="col-xs-4 kpiSmall">

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
                              </Panel>
                            </div>

                          {/*Block for contribution to growth*/}
                          <div className={(() => {
                            if (this.props.Executive.kpi_param=='kpi_type=Value'||this.props.Executive.kpi_param=='kpi_type=Volume')
                            {
                              return "col-xs-4"
                            }
                            else
                            {
                              return "col-xs-6"
                            }  })()} style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                            <Panel>
                              <h3 className="pageModuleSubTitle"> Contribution to Growth </h3>
                              <div className="row">
                                <div className="col-xs-6">

                                  <h3>{this.props.Executive.kpi_boxes_data.growth.total}</h3>
                                </div>
                                <div className="col-xs-6">
                                  <h3>LFL &nbsp; {this.props.Executive.kpi_boxes_data.growth.total_lfl} </h3>
                                </div>
                              </div>
                              <div className="row">
                                <div className="panel-body">
                                  <div className="col-xs-4 kpiSmall">


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
                                  <div className="col-xs-4 kpiSmall">

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
                                  <div className="col-xs-4 kpiSmall">

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
                            </Panel>
                          </div>

                     {/*Block for market*/}
                          {(() => {
                            if (this.props.Executive.kpi_param=='kpi_type=Value'||this.props.Executive.kpi_param=='kpi_type=Volume')
                            {
                              return (
                                <div className='col-xs-4' style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                                  <Panel>
                                    <h3 className="pageModuleSubTitle"> Market </h3>
                                    <div className="row">
                                      <div className="col-xs-6">

                                        <h3>{this.props.Executive.kpi_boxes_data.market.total}</h3>
                                      </div>
                                      <div className="col-xs-6">
                                        <h3>LFL &nbsp; {this.props.Executive.kpi_boxes_data.market.total_lfl} </h3>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="panel-body">
                                        <div className="col-xs-4 kpiSmall">


                                          <h3>

                                            {this.props.Executive.kpi_boxes_data.market.share}%
                                          </h3>
                                          <h4 className="kpiSubTitle">Market Share</h4>

                                        </div>
                                        <div className="col-xs-4 kpiSmall">

                                          <h3>
                          <span
                            className={(() => {
                              if (this.props.Executive.kpi_boxes_data.market.opportunity > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.Executive.kpi_boxes_data.market.opportunity < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                                            {this.props.Executive.kpi_boxes_data.market.opportunity}%
                                          </h3>
                                          <h4 className="kpiSubTitle">Opportunity</h4>

                                        </div>
                                        <div className="col-xs-4 kpiSmall">

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
                                  </Panel>
                                </div>

                              )
                            }
                             })()}

                        </div>


                        {/*Row for best and worst performances*/}
                        <h2 className="pageModuleMainTitle">Best and Worst Performances</h2>
                        <div className="row">
                          <div className="col-xs-6">
                            <h2 className="pageModuleSubTitle">Top 5 ------ by ------ Share</h2>


                            {(() => {
                              if (this.props.Executive.best_worst_data.Choose_filters == 'no')
                              {
                                return (
                                  <div>
                           {/*Navs here */}
                                    <div className="row">
                                      <div className="col-xs-4">
                                        <Nav bsStyle="tabs" activeKey={this.state.activeKey5} onSelect={this.handleSelect} className="tabsCustom2">
                                          <NavItem className="tabsCustomList2" eventKey="1" onClick={() => {
                                            topName = this.props.Executive.best_worst_data.top_5[0].name;
                                            topName = "selected_level="+topName;
                                            this.props.onSaveTopName(topName);
                                            this.setState({activeKey5: "1"});
                                            this.props.loadBestInfoData();

                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                                            <b style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.top_5[0].name}</b></NavItem>

                                          <NavItem className="tabsCustomList2" eventKey="2" onClick={() => {
                                            topName = this.props.Executive.best_worst_data.top_5[1].name;
                                            topName = "selected_level="+topName;
                                            this.props.onSaveTopName(topName);
                                            this.setState({activeKey5: "2"});
                                            this.props.loadBestInfoData();

                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                            style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.top_5[1].name}</b></NavItem>

                                          <NavItem className="tabsCustomList2" eventKey="3" onClick={() => {
                                            topName = this.props.Executive.best_worst_data.top_5[2].name;
                                            topName = "selected_level="+topName;
                                            this.props.onSaveTopName(topName);
                                            this.setState({activeKey5: "3"});
                                            this.props.loadBestInfoData();
                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                            style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.top_5[2].name}</b></NavItem>

                                          <NavItem className="tabsCustomList2" eventKey="4" onClick={() => {
                                            topName = this.props.Executive.best_worst_data.top_5[3].name;
                                            topName = "selected_level="+topName;
                                            this.props.onSaveTopName(topName);
                                            this.setState({activeKey5: "4"});
                                            this.props.loadBestInfoData();


                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                            style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.top_5[3].name}</b></NavItem>

                                          <NavItem className="tabsCustomList2" eventKey="5" onClick={() => {
                                            topName = this.props.Executive.best_worst_data.top_5[4].name;
                                            topName = "selected_level="+topName;
                                            this.props.onSaveTopName(topName);
                                            this.setState({activeKey5: "5"});
                                            this.props.loadBestInfoData();
                                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                            style={{textDecoration: 'none'}}>{this.props.Executive.best_worst_data.top_5[4].name}</b></NavItem>

                                        </Nav>
                                      </div>
                                      <div className="col-xs-8">

                                        {(() => {
                                          if (this.props.Executive.top_name == 'None')
                                          {
                                            return (
                                              <div>
                                                <h3> Please select an option to view performance</h3>
                                              </div>
                                            )
                                          }
                                          else
                                          {
                                            return(
                                              <div>
                                                <div className="pull-right">
                                                  <Button onClick={() => {
                                                    this.setState({topsuppInfo: true})
                                                    {/*Load functions here*/}

                                                  }}>Supplier Info</Button>
                                                </div>
                                                <h3>Info Selected</h3>
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
                          <div className="col-xs-6">
                            <h2 className="pageModuleSubTitle">Top 5 ------ by ------ Share</h2>
                          </div>

                        </div>

                        {/*Row for Drivers of sales*/}
                        {(() => {
                          if (this.props.Executive.kpi_param=='kpi_type=Value')
                          {
                            return (
                              <div>
                                <h2 className="pageModuleMainTitle">Drivers Of Sales</h2>
                                {/*Internal External Tab*/}
                                <Nav bsStyle="tabs" activeKey={this.state.activeKey4} onSelect={this.handleSelect} className="tabsCustom">
                                  <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                                    driverParam = "internal";
                                    this.setState({activeKey4: "1"});
                                    this.props.onSaveDriverParam(driverParam);

                                  }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                                    <b style={{textDecoration: 'none'}}>Internal</b></NavItem>

                                  <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                                    this.setState({activeKey4: "2"});
                                    driverParam = "external";
                                    this.props.onSaveDriverParam(driverParam);
                                  }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                                    style={{textDecoration: 'none'}}>External</b></NavItem>


                                </Nav>
                                {/*Row for internal/external drivers of sales*/}
                                {(() => {
                                  if (this.props.Executive.driver_param=='internal') {
                                    return(
                                      <div>
                                        <h3>Internal</h3>
                                      </div>)

                                  }
                                  else{
                                    return(
                                      <div>
                                        <h3>External</h3>
                                        {/*Row for weather data*/}
                                        <div className="row">
                                          <div className="col-xs-4">
                                            <h3 className="pageModuleSubTitle">Rainfall</h3>
                                            {(() => {
                                              if (this.props.Executive.drivers_external_data) {
                                                console.log("Promo Sales line chart data", this.props.Executive.drivers_external_data.rainfall);
                                                return (
                                                  <MultilineThree data={this.props.Executive.drivers_external_data.rainfall}
                                                                  id="rainfall_line" label_ty="Rainfall TY" label_ly="Rainfall LY"
                                                                  xaxis_title="Tesco Week" no_pref='£' no_suffix='' no_pref2='' no_suffix2=''
                                                                  yaxis_title='Value' yaxis_title2='Weather'/>
                                                );
                                              }
                                            })()}
                                          </div>
                                          <div className="col-xs-4">
                                            <h3 className="pageModuleSubTitle">Sunshine</h3>
                                            {(() => {
                                              if (this.props.Executive.drivers_external_data) {
                                                console.log("Promo Sales line chart data", this.props.Executive.drivers_external_data.sunshine);
                                                return (
                                                  <MultilineThree data={this.props.Executive.drivers_external_data.sunshine}
                                                                  id="sunshine_line" label_ty="Sunshine TY" label_ly="Sunshine LY"
                                                                  xaxis_title="Tesco Week" no_pref='£' no_suffix='' no_pref2='' no_suffix2=''
                                                                  yaxis_title='Value' yaxis_title2='Sunshine'/>
                                                );
                                              }
                                            })()}




                                          </div>
                                          <div className="col-xs-4">
                                            <h3 className="pageModuleSubTitle">Temperature</h3>
                                            {(() => {
                                              if (this.props.Executive.drivers_external_data) {
                                              console.log("Promo Sales line chart data", this.props.Executive.drivers_external_data.temperature);
                                              return (
                                              <MultilineThree data={this.props.Executive.drivers_external_data.temperature}
                                              id="temperature_line" label_ty="Temperature TY" label_ly="Temperature LY"
                                              xaxis_title="Tesco Week" no_pref='£' no_suffix='' no_pref2='' no_suffix2=''
                                              yaxis_title='Value' yaxis_title2='Temperature'/>
                                              );
                                            }
                                            })()}




                                              </div>
                                        </div>
                                        {/*Row for holidays*/}
                                        <div className="row">
                                          <h3 classname="pageModuleMainTitle">Holidays</h3>
                                          {/*Holiday Table*/}
                                          <div className="col-xs-4">

                                          </div>
                                          {/*Value Trend*/}
                                          <div className="col-xs-8">
                                            {(() => {
                                              if (this.props.Executive.overview_kpi_trend_data) {
                                                console.log("Promo Sales line chart data", this.props.Executive.overview_kpi_trend_data.sales_trend);
                                                return (
                                                  <MultilinePromo data={this.props.Executive.overview_kpi_trend_data.sales_trend} id="holiday_value_line" label_ty="Sales TY" label_ly="Sales LY" xaxis_title="Tesco Week" no_pref='£' no_suffix='' yaxis_title='Value'/>
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
                        })()}


                      </div>
                    )
                  }

                }
              })()}
            </div>

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
                <div className="col-xs-4">
                  {(() => {
                    if (this.props.Executive.best_info_data) {
                      return (
                        <Nav bsStyle="tabs" activeKey={this.state.activeKey6} onSelect={this.handleSelect}
                             className="tabsCustom2">
                          <NavItem className="tabsCustomList2" eventKey="1" onClick={() => {
                            suppName = this.props.Executive.best_info_data.top_5_supp[0].supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(topName);
                            this.setState({activeKey6: "1"});


                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                            <b style={{textDecoration: 'none'}}>{this.props.Executive.best_info_data.top_5_supp[0].supplier}</b></NavItem>

                          <NavItem className="tabsCustomList2" eventKey="2" onClick={() => {
                            suppName = this.props.Executive.best_info_data.top_5_supp[1].supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey6: "2"});


                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                            style={{textDecoration: 'none'}}>{this.props.Executive.best_info_data.top_5_supp[1].supplier}</b></NavItem>

                          <NavItem className="tabsCustomList2" eventKey="3" onClick={() => {
                            suppName = this.props.Executive.best_info_data.top_5_supp[2].supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey6: "3"});

                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                            style={{textDecoration: 'none'}}>{this.props.Executive.best_info_data.top_5_supp[2].supplier}</b></NavItem>

                          <NavItem className="tabsCustomList2" eventKey="4" onClick={() => {
                            suppName = this.props.Executive.best_info_data.top_5_supp[3].supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey6: "4"});


                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                            style={{textDecoration: 'none'}}>{this.props.Executive.best_info_data.top_5_supp[3].supplier}</b></NavItem>

                          <NavItem className="tabsCustomList2" eventKey="5" onClick={() => {
                            suppName = this.props.Executive.best_info_data.top_5_supp[4].supplier;
                            suppName = "selected_supplier=" + suppName;
                            this.props.onSaveSupplierName(suppName);
                            this.setState({activeKey6: "5"});

                          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                            style={{textDecoration: 'none'}}>{this.props.Executive.best_info_data.top_5_supp[4].supplier}</b></NavItem>

                        </Nav>
                      );
                    }
                  })()}


                </div>
                <div className="col-xs-8">
                  {(() => {
                    if (this.props.Executive.supplier_name=='None') {
                      return (
                        <div>
                          <h3>
                            Select a supplier to view information
                          </h3>
                        </div>
                      );
                    }
                    else{
                      return(
                        <div>
                          <h3>Supplier Info</h3>
                          {/*Row for KPIs*/}
                          <div className="row">
                            <div classname="col-xs-4">
                              <h3>----</h3>
                            </div>
                            <div classname="col-xs-4">
                              <h3>----</h3>
                            </div>
                            <div classname="col-xs-4">
                              <h3>----</h3>
                            </div>
                          </div>
                          Row for Gauge Charts
                          <div classname="row">
                            <div classname="col-xs-6">
                              <h3>Gauge Chart1</h3>
                            </div>
                            <div className="col-xs-6">
                              <h3>Gauge Chart1</h3>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })()}
                </div>

              </div>

            </Modal.Body>
          </Modal>




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
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Executive);
