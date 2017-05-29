/*
 *
 * DailySales
 *
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Modal, Nav, NavItem, DropdownButton, MenuItem} from 'react-bootstrap';
import {saveImage, saveDataAsCSV} from './../../utils/exportFunctions';
import Panel from 'components/panel';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectDailySales from './selectors';
import DualLineChart2 from 'components/DualLineChart2';
import MultiSeriesBarChart from 'components/MultiSeriesBarChart';
import Spinner from 'components/spinner';
import messages from './messages';
import './style.scss';
import PieChart from 'components/PieChart';
import CascadedFilterDSS from 'components/CascadedFilterDSS';
import MultilinePromo from 'components/MultilinePromo';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import TopFilter from 'components/TopFilter';
var dateFormat = require('dateformat');
require('react-bootstrap-table/css/react-bootstrap-table.css')

import {
  PromoGiveawayData,cardsCallAction,
  chartCallAction, SaveKPIParam, generateUrlParamsString,
  SaveWeekParam, PromoKpiData,
  getFilter,
  getWeekFilter,
  WeekFilterParam,
  generateUrlParams,
  sendUrlParams,
  SaveWeek,
  DSViewKpiSpinnerCheckSuccess,
  LineChartSpinnerCheckSuccess,
  checkboxChange,
  checkboxWeekChange,
  StoreFilterParam,
  defaultPageLoadCheck,
} from './actions';


export class DailySales extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    this.props.defaultPageLoadCheck(1);

    let defaultFilterUrlParams = localStorage.getItem('urlParams');

    let defaultfilterWeekParams = localStorage.getItem('weekParams');

    console.log('defaultFilterUrlParams', defaultFilterUrlParams);

    if (defaultFilterUrlParams) {
      console.log('defaultFilterUrlParams--', defaultFilterUrlParams);
      this.props.onCheckboxWeekChange(defaultFilterUrlParams);
      // this.props.onGenerateUrlParamsString(defaultFilterUrlParams);
    } else {
      this.props.onCheckboxWeekChange('');
      // this.props.onGenerateUrlParamsString('');
    }


    if (defaultfilterWeekParams) {
      console.log('defaultfilterWeekParams', defaultfilterWeekParams);
      this.props.onSaveWeek(defaultfilterWeekParams);
    } else {
      this.props.onSaveWeek('');
    }
    let dataWeekParam = 'week_flag=None';
    let kpiparam = 'val_type=1';
    this.props.onSaveKPIParam(kpiparam);
    this.props.onSaveWeekParam(dataWeekParam);
    this.props.CardsDataCall();
    this.props.ChartDataCall();
    this.props.DSViewKpiSpinnerCheckSuccess(0);
    this.props.loadKpi();
    this.props.onGetFilter();
    this.props.onGetWeekFilter();
  };
  componentDidUpdate = () => {
    this.props.onSendUrlParams(this.props.location.query);
  };

  cellButton=(cell, row,enumObject, rowIndex)=>{
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() =>{
          console.log("Inside REact Button click!",this)
        }}
      >View
      </button>
    )
  }

  cellButton2=(cell, row, rowIndex)=>{
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() =>{
          console.log("Inside REact Button click!",this)
        }}
      >View
      </button>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      activeKey1: "1",
      y_axis: "Sales Value"
    };

  }

  formatGlyphicon = (cell) => {
    if (cell > 0) {
      return "glyphicon glyphicon-triangle-top glyphiconPositive";
    }
    else if (cell < 0) {
      return "glyphicon glyphicon-triangle-bottom glyphiconNegative";
    }
    else {
      return "glyphicon glyphicon-minus-sign glyphiconNeutral";
    }
  }

  render() {
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: '15', value: 15
      }, {
        text: 'All', value: this.props.DailySales.charts_data && this.props.DailySales.charts_data.dss_table ? this.props.DailySales.charts_data.dss_table.length :0
      }], // you can change the dropdown list for size per page
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

    let formatMetric = (cell,flag="value") => {
      if (cell >= 1000 || cell <= -1000) {
        let rounded = Math.round(cell / 1000);
        if (flag == "volume") {
          return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K')
        }
        else {
          return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');
        }
      }
      else {
        if (flag == "volume") {
          return (Math.round(cell));
        }
        else {
          return ('£ '+ Math.round(cell));
        }
      }
    }

    let kpiParmas = this.props.DailySales.kpi_param;
    return (
      <Panel style={{background: "#fafafa"}}>
        <div>
          <Helmet
            title="DailySales"
            meta={[
              {name: 'description', content: 'Description of DailySales'},
            ]}
          />

          {(() => {
            if (this.props.DailySales.DSViewKpiSpinner != 1 && this.props.DailySales.DSViewKpiSpinner == 11) {
              return (
                <div className="row spinnerPosition"><Spinner /><h4>Please Wait a Moment....!</h4></div>
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
                    paddingRight: '1%',
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                    borderTop: '1px solid #ccc'
                  }}>
                    {(() => {
                      if (this.props.DailySales.week_filter_data && this.props.DailySales.filter_data) {
                        return (
                          <CascadedFilterDSS filter_data={this.props.DailySales.filter_data}
                            // week_data={this.props.promotion.filter_data.week_data}
                                             ChartDataCall={this.props.ChartDataCall}
                                             week_data={this.props.DailySales.week_filter_data}
                                             location={this.props.location}
                                             save_week={this.props.save_week}
                                             onGenerateSideFilter={this.props.onGetFilter}
                                             onFilterReset={this.props.onFilterReset}
                                             onDataUrlParams={this.props.DataUrlParams}
                                             onUrlParamsData={this.props.onUrlParamsData}
                                             onGenerateUrlParams={this.props.onGenerateUrlParams}
                                             onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                                             onGenerateFilterParamsString={this.props.onGenerateFilterParamsString}
                                             onGenerateUrlParamsData={this.props.onGenerateUrlParamsData}
                                             ongenerateWeekFilter={this.props.onGetWeekFilter}
                                             onSaveWeekFilterParam={this.props.onSaveWeekFilterParam}
                                             loadKpi={this.props.loadKpi}
                                             loadSales={this.props.loadSales}
                                             loadPromoProd={this.props.loadPromoProd}
                                             loadPromoPart={this.props.loadPromoPart}
                                             onSendUrlParams={this.props.onSendUrlParams}
                                             onSaveWeek={this.props.onSaveWeek}
                                             previous_selection={this.props.DailySales.filter_selection}
                                             previous_week_selection={this.props.DailySales.filter_week_selection}
                                             onCheckboxChange={this.props.onCheckboxChange}
                                             onCheckboxWeekChange={this.props.onCheckboxWeekChange}
                                             DSViewKpiSpinnerCheck={this.props.DSViewKpiSpinnerCheckSuccess}
                                             LineChartSpinnerCheck={this.props.LineChartSpinnerCheckSuccess}

                                             week={this.props.DailySales.week}
                                             urlParamsString={this.props.DailySales.filter_week_selection}

                          />
                        );
                      }
                      else {
                        return (<div className="text-center"><Spinner /><h4>Please Wait a Moment....!</h4></div>);
                      }
                    })()}
                  </div>

                  <div style={{
                    width: '78%',
                    marginLeft: '22%'
                  }}>
                    {/*Page title*/}
                    <div className="pageTitle">
                      {(() => {
                        if (this.props.DailySales.cards_data && this.props.DailySales.cards_data.tesco_week) {
                          return (
                            <span className="pageModuleMainTitle"> Daily Sales View: {this.props.DailySales.cards_data.tesco_week}</span>
                          )
                        } else {
                          return (
                            <span className="pageModuleMainTitle">Daily Sales View </span>
                          )
                        }
                      })()}
                    </div>

                    <div>
                      <div className="row fixingPosition"
                           style={{marginLeft: "0%", paddingTop: "-5px", marginRight: "0px"}}>
                        {(() => {
                          if (this.props.DailySales.cards_data && this.props.DailySales.LineChartSpinnerCheck != 0){
                            let a = this.props.DailySales.cards_data.sales,b=this.props.DailySales.cards_data.volume,
                              c=this.props.DailySales.cards_data.cogs,d=this.props.DailySales.cards_data.profit,e=this.props.DailySales.cards_data.margin;
                            return (
                              <div>
                                <div className="row mainBox" style={{textAlign: 'center'}}>
                                  {/* Box for value */}
                                  <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa"}}>
                                    <Panel>
                                      <h3 className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>Value</h3>
                                      <div className="row">
                                        <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                          <h3>{formatMetric(a.tot_sales)}</h3>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-6">
                                          <h3>LFL:{formatMetric(a.tot_sales_lfl)}</h3>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(a.sales_var_wow)}></span>&nbsp;{a.sales_var_wow}%
                                          <h4 className="kpiSubTitle"><b>WoW</b></h4>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(a.sales_var_yoy)}></span>&nbsp;{a.sales_var_yoy}%
                                          <h4 className="kpiSubTitle"><b>YoY</b></h4>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(a.sales_var_lfl)}></span>&nbsp;{a.sales_var_lfl}%
                                          <h4 className="kpiSubTitle"><b>LFL</b></h4>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <h3 style={{padding: "0px", margin: "0px",backgroundColor:"#e5e8ea"}}>{formatMetric(a.tot_sales_wtd)}</h3>
                                        </div>
                                      </div>
                                    </Panel>
                                  </div>

                                  <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa"}}>
                                    <Panel>
                                      <h3 className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>Volume</h3>
                                      <div className="row">
                                        <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                          <h3 >{formatMetric(b.tot_vol,"volume")}</h3>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-6">
                                          <h3>LFL:{formatMetric(b.tot_vol_lfl,"volume")}</h3>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(b.vol_var_wow)}></span>&nbsp;{b.vol_var_wow}%
                                          <h4 className="kpiSubTitle"><b>WoW</b></h4>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(b.vol_var_yoy)}></span>&nbsp;{b.vol_var_yoy}%
                                          <h4 className="kpiSubTitle"><b>YoY</b></h4>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(b.vol_var_lfl)}></span>&nbsp;{b.vol_var_lfl}%
                                          <h4 className="kpiSubTitle"><b>LFL</b></h4>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <h3 style={{padding: "0px", margin: "0px",backgroundColor:"#e5e8ea"}}>{formatMetric(b.tot_vol_wtd)}</h3>
                                        </div>
                                      </div>
                                    </Panel>
                                  </div>

                                  <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa"}}>
                                    <Panel>
                                      <h3 className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>COGS</h3>
                                      <div className="row">
                                        <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                          <h3>{formatMetric(c.tot_cogs)}</h3>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-6">
                                          <h3>LFL:{formatMetric(c.tot_cogs_lfl)}</h3>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(c.cogs_var_wow)}></span>&nbsp;{c.cogs_var_wow}%
                                          <h4 className="kpiSubTitle"><b>WoW</b></h4>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(c.cogs_var_yoy)}></span>&nbsp;{c.cogs_var_yoy}%
                                          <h4 className="kpiSubTitle"><b>YoY</b></h4>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(c.cogs_var_lfl)}></span>&nbsp;{c.cogs_var_lfl}%
                                          <h4 className="kpiSubTitle"><b>LFL</b></h4>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <h3 style={{padding: "0px", margin: "0px",backgroundColor:"#e5e8ea"}}>{formatMetric(c.tot_cogs_wtd)}</h3>
                                        </div>
                                      </div>
                                    </Panel>
                                  </div>



                                </div>


                                <div className="row mainBox" style={{textAlign: 'center'}}>
                                  <div className="col-md-6 col-xs-6" style={{backgroundColor: "#fafafa"}}>
                                    <Panel>
                                      <h3 className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>Profit</h3>
                                      <div className="row">
                                        <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                          <h3>{formatMetric(d.tot_profit)}</h3>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-6">
                                          <h3>LFL:{formatMetric(d.tot_profit_lfl)}</h3>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(d.profit_var_wow)}></span>&nbsp;{d.profit_var_wow}%
                                          <h4 className="kpiSubTitle"><b>WoW</b></h4>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(d.profit_var_yoy)}></span>&nbsp;{d.profit_var_yoy}%
                                          <h4 className="kpiSubTitle"><b>YoY</b></h4>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(d.profit_var_lfl)}></span>&nbsp;{d.profit_var_lfl}%
                                          <h4 className="kpiSubTitle"><b>LFL</b></h4>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <h3 style={{padding: "0px", margin: "0px",backgroundColor:"#e5e8ea"}}>{formatMetric(d.tot_profit_wtd)}</h3>
                                        </div>
                                      </div>
                                    </Panel>
                                  </div>

                                  <div className="col-md-6 col-xs-6" style={{backgroundColor: "#fafafa"}}>
                                    <Panel>
                                      <h3 className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>Margin</h3>
                                      <div className="row">
                                        <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                          <h3>{formatMetric(e.current_day)}</h3>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-6">
                                          <h3>LFL:{formatMetric(e.current_day_lfl)}</h3>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(b.vol_var_wow)}></span>&nbsp;{e.wow}%
                                          <h4 className="kpiSubTitle"><b>WoW</b></h4>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(b.vol_var_yoy)}></span>&nbsp;{e.yoy}%
                                          <h4 className="kpiSubTitle"><b>YoY</b></h4>
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-4">
                                          <span className={this.formatGlyphicon(b.vol_var_lfl)}></span>&nbsp;{e.yoy_lfl}%
                                          <h4 className="kpiSubTitle"><b>LFL</b></h4>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-12" style={{backgroundColor:"#e5e8ea"}}>
                                          <h3 style={{padding: "0px", margin: "0px",visibility:"hidden"}}><br></br></h3>
                                        </div>
                                      </div>
                                    </Panel>
                                  </div>

                                </div>
                              </div>

                            )
                          }
                          else {
                            return (<div className="text-center"><Spinner />Please Wait a Moment....!</div>)
                          }
                        })()}
                        <div className="col-md-12 col-sm-12">
                          <div className="col-md-12">
                            <h4 className="pageModuleMainTitle">Daily {this.state.y_axis} Trend
                            </h4>
                          </div>
                          <div className="col-md-8 col-sm-8 col-xs-8" style={{background: '1px solid #FAFAFA'}}>
                            <Nav bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect}
                                 className="tabsCustom">
                              <NavItem style={{fontSize: '16px', textAlign: 'center', margin: "0px"}}
                                       className="tabsCustomList" eventKey="1" onClick={() => {
                                this.setState({activeKey1: "1", y_axis: "Sales Value"});
                                kpiParmas = "val_type=1";
                                this.props.onSaveKPIParam(kpiParmas);
                                this.props.ChartDataCall();
                                this.props.DSViewKpiSpinnerCheckSuccess(0);
                                this.props.LineChartSpinnerCheckSuccess(0);
                              }}><span className="tab_label">Sales</span></NavItem>
                              <NavItem style={{fontSize: '16px', textAlign: 'center', margin: "0px"}}
                                       className="tabsCustomList" eventKey="2" onClick={() => {
                                this.setState({activeKey1: "2", y_axis: "Volume"});
                                kpiParmas = "val_type=2";
                                this.props.onSaveKPIParam(kpiParmas);
                                this.props.ChartDataCall();
                                this.props.DSViewKpiSpinnerCheckSuccess(0);
                                this.props.LineChartSpinnerCheckSuccess(0);
                              }}><span className="tab_label">Volume</span></NavItem>
                              <NavItem style={{fontSize: '16px', textAlign: 'center', margin: "0px"}}
                                       className="tabsCustomList" eventKey="3" onClick={() => {
                                this.setState({activeKey1: "3", y_axis: "COGS"});
                                kpiParmas = "val_type=3";
                                this.props.onSaveKPIParam(kpiParmas);
                                this.props.ChartDataCall();
                                this.props.DSViewKpiSpinnerCheckSuccess(0);
                                this.props.LineChartSpinnerCheckSuccess(0);
                              }}><span className="tab_label">COGS</span></NavItem>
                              <NavItem style={{fontSize: '16px', textAlign: 'center', margin: "0px"}}
                                       className="tabsCustomList" eventKey="4" onClick={() => {
                                this.setState({activeKey1: "4", y_axis: "Profit"});
                                kpiParmas = "val_type=4";
                                this.props.onSaveKPIParam(kpiParmas);
                                this.props.ChartDataCall();
                                this.props.DSViewKpiSpinnerCheckSuccess(0);
                                this.props.LineChartSpinnerCheckSuccess(0);
                              }}><span className="tab_label">Profit</span></NavItem>
                            </Nav>
                          </div>
                          <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                            <div className="col-md-6 col-sm-6">
                              {(() => {
                                if (this.props.DailySales.charts_data && this.props.DailySales.charts_data.graph_data) {
                                  return (
                                    <Panel style={{alignItems: "center"}}>
                                      <MultiSeriesBarChart y_axis={this.state.y_axis}
                                                      data={this.props.DailySales.charts_data.graph_data}/>
                                    </Panel>
                                  )
                                }
                                else {
                                  return (<div className="text-center"><Spinner />Please Wait a Moment....!</div>)
                                }
                              })()}
                            </div>
                            <div className="col-md-6 col-sm-6">
                              {(() => {
                                if (this.props.DailySales.charts_data && this.props.DailySales.charts_data.graph_data) {
                                  return (
                                    <Panel style={{alignItems: "center"}}>
                                      <DualLineChart2 y_axis={this.state.y_axis}
                                                      data={this.props.DailySales.charts_data.graph_data.cum_graph_data}/>
                                    </Panel>
                                  )
                                }
                                else {
                                  return (<div className="text-center"><Spinner />Please Wait a Moment....!</div>)
                                }
                              })()}

                            </div>
                          </div>
                        </div>

                        <div className="col-md-12 col-xs-12">
                          <h2 className="pageModuleMainTitle col-xs-12">
                            <b>Products Daily Sales Info </b>
                          </h2>
                          <div>
                            {
                              (() => {
                                if (this.props.DailySales.charts_data && this.props.DailySales.charts_data.dss_table) {
//console.log("This is table data length:",this.props.ProductPage.data.table_data.length);
                                  return (
                                    <div>
                                      <BootstrapTable
                                        data={this.props.DailySales.charts_data.dss_table} options={options}
                                        striped={true}
                                        hover
                                        condensed
                                        pagination={ true }
                                        search={true}
                                        exportCSV={true}
                                      >
                                        <TableHeaderColumn width="225" tdStyle={ {whiteSpace: 'normal'} } dataField="product" isKey={true}
                                                           dataAlign="center" dataSort>Product Description</TableHeaderColumn>
                                        <TableHeaderColumn dataField="brand_indicator" dataFormat={this.formatMetric} dataSort={true}
                                                           dataAlign="center">Brand</TableHeaderColumn>
                                        <TableHeaderColumn dataField="kpi_ty" dataFormat={this.formatMetric} dataSort={true}
                                                           dataAlign="center">TY</TableHeaderColumn>
                                        <TableHeaderColumn dataField="kpi_ly" dataFormat={this.formatMetric} dataSort={true}
                                                           dataAlign="center">LY</TableHeaderColumn>
                                        <TableHeaderColumn dataField="kpi_ty_lfl" dataFormat={this.formatMetric} dataSort={true}
                                                           dataAlign="center">TY LFL</TableHeaderColumn>
                                        <TableHeaderColumn dataField="kpi_ly_lfl" dataFormat={this.formatMetric} dataSort={true}
                                                           dataAlign="center">LY LFL</TableHeaderColumn>
                                        <TableHeaderColumn dataFormat={this.cellButton} tdStyle={ {whiteSpace: 'normal'} } dataAlign="center"></TableHeaderColumn>
                                        <TableHeaderColumn dataFormat={this.cellButton2} dataAlign="center"></TableHeaderColumn>
                                      </BootstrapTable>
                                    </div>
                                  );

                                }
                                else {
                                  return (

                                    <div className="text-center" colSpan="11" style={{textAlign: 'center'}}><Spinner />Please Wait a Moment....!</div>

                                  );
                                }
                              })()
                            }

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              )
            }
          })()}
        </div>
      </Panel>
    );
  }
}
DailySales.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  DailySales: makeSelectDailySales(),
});
function mapDispatchToProps(dispatch) {
  return {
    onSaveKPIParam: (e) => dispatch(SaveKPIParam(e)),
    DSViewKpiSpinnerCheckSuccess: (e) => dispatch(DSViewKpiSpinnerCheckSuccess(e)),
    DSViewKpiSpinnerCheck: (e) => dispatch(DSViewKpiSpinnerCheckSuccess(e)),
    CardsDataCall: (e) => dispatch(cardsCallAction(e)),
    ChartDataCall: (e) => dispatch(chartCallAction(e)),
    onSaveWeekParam: (e) => dispatch(SaveWeekParam(e)),
    loadKpi: (e) => dispatch(PromoKpiData(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
    defaultPageLoadCheck: (e) => dispatch(defaultPageLoadCheck(e)),
    onGenerateUrlParamsData: (e) => dispatch(generateSideFilter(e)),
    onGetFilter: (e) => dispatch(getFilter(e)),
    onGenerateSideFilter: (e) => dispatch(getFilter(e)),
    onSaveSalesParam: (e) => dispatch(SaveSalesParam(e)),
    onGetWeekFilter: (e) => dispatch(getWeekFilter(e)),
    ongenerateWeekFilter: (e) => dispatch(getWeekFilter(e)),
    onSaveWeekFilterParam: (e) => dispatch(WeekFilterParam(e)),
    onGenerateUrlParams: (e) => dispatch(generateUrlParams(e)),
    onSendUrlParams: (e) => dispatch(sendUrlParams(e)),
    onSaveWeek: (e) => dispatch(SaveWeek(e)),
    onCheckboxChange: (e) => dispatch(checkboxChange(e)),
    LineChartSpinnerCheckSuccess: (e) => dispatch(LineChartSpinnerCheckSuccess(e)),
    LineChartSpinnerCheck: (e) => dispatch(LineChartSpinnerCheckSuccess(e)),
    onCheckboxWeekChange: (e) => dispatch(checkboxWeekChange(e)),
    dispatch,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DailySales);
