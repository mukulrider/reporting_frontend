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
import TopFilterDSS from 'components/TopFilterDSS';

import BreadcrumbDSS from 'components/BreadcrumbDSS';
import Breadcrumb from 'components/Breadcrumb';
var dateFormat = require('dateformat');
require('react-bootstrap-table/css/react-bootstrap-table.css')

import Select from 'react-select';
import 'react-select/dist/react-select.css';


import {
  PromoGiveawayData, cardsCallAction,
  chartCallAction, SaveKPIParam, generateUrlParamsString,
  SaveWeekParam, PromoKpiData,
  getFilter,
  getWeekFilter,
  DateFilterParam,
  generateUrlParams,
  sendUrlParams,
  SaveWeek,
  saveProduct,
  productCardsData,
  productChartsData,
  cardDataFetchSuccess,
  prodCardsDataFetchSuccess,
  prodChartsDataFetchSuccess,
  DSViewKpiSpinnerCheckSuccess,
  LineChartSpinnerCheckSuccess,
  checkboxChange,
  checkboxWeekChange,
  StoreFilterParam,
  defaultPageLoadCheck,
  defaultGreyScreen
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
        this.props.onCheckboxWeekChange(`buying_controller=${buyingController}&buyer=${buyer}`);

      } else if (buyingController) {
        this.props.onCheckboxWeekChange(`buying_controller=${buyingController}`);

      } else {
        this.props.onCheckboxWeekChange(``);

      }
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
    this.props.loadKpi();

    this.props.DSViewKpiSpinnerCheckSuccess(0);
    this.props.onGetFilter();
    this.props.onGetWeekFilter();
  };
  componentDidUpdate = () => {
    this.props.onSendUrlParams(this.props.location.query);
  };

  logChange=(selectedItem)=> {
    console.log(selectedItem);
    this.setState({
      selectedValues: selectedItem
    });
  }

  cellButton = (cell, row, enumObject, rowIndex) => {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          this.setState({showProductSalesInfoModalFlag: true,product:row.product});
          let product = "product="+row.product;
          this.props.onSaveProduct(product);
          this.props.onProductCardsData();
          this.props.onProductChartsData();
        }}
      >View
      </button>
    )
  }

  cellButton2 = (cell, row, rowIndex) => {
    return (
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => {
          this.setState({showCumSalesInfoModalFlag: true,product:row.product});
          let product = "product="+row.product;
          this.props.onSaveProduct(product);
        }}
      >Send To Delist
      </button>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      activeKey1: "1",
      y_axis: "WTD Sales Value",
      legendTY:"Sales TY",legendLY:"Sales LY",
      showProductSalesInfoModalFlag:false,
      showCumSalesInfoModalFlag:false,
      SelectProducts:"[]",
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

  prodList = [];

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
        text: 'All',
        value: this.props.DailySales.charts_data && this.props.DailySales.charts_data.dss_table ? this.props.DailySales.charts_data.dss_table.length : 0
      }], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
/*      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text*/
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      expandRowBgColor: 'rgb(242, 255, 163)'
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };

    let onRowSelect=(row, isSelected, e)=> {
      console.log("Row:",row);
      this.prodList.push(row.product_id);
      console.log("ProdList:",this.prodList);
      this.setState({SelectProducts:this.prodList});
    }

    let onSelectAll=(isSelected, rows)=> {
      if (isSelected) {
        for (let i = 0; i < rows.length; i++) {
          this.prodList.push(rows[i].product_id);
          console.log("ProdList:",this.prodList);
          this.setState({SelectProducts:this.prodList});
        }
      }
    }

    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      onSelect: onRowSelect,
      onSelectAll: onSelectAll
    };


    let formatMetric = (cell, flag = "value") => {
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
    let round = (value, decimals) => { 
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    let kpiParams = this.props.DailySales.kpi_param;
    return (
      <div style={{background: "#fafafa",marginLeft: '-14px'}}>
        <div>
          <Helmet
            title="DailySales"
            meta={[
              {name: 'description', content: 'Description of DailySales'},
            ]}
          />

        <Breadcrumb
          urlParamsString={this.props.DailySales.filter_week_selection}/>
          <br/>
          <br/>
          <br/>
          <br/>

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

                  <div className={this.state.collapsed ? 'collapse-filter' : 'expand-filter'}
                    style={{
                    height: '100%',
                    position: 'fixed',
                    overflowX: 'hidden',
                    overflowY: 'scroll',
                    borderTop: '1px solid #ccc'
                  }}>

                    {(() => {
                      if (this.props.DailySales.week_filter_data && this.props.DailySales.filter_data) {
                        return (
                          <CascadedFilterDSS filter_data={this.props.DailySales.filter_data}
                                             CardsDataCall={this.props.CardsDataCall}
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
                                             loadKpi={this.props.loadKpi}
                                             loadSales={this.props.loadSales}
                                             loadPromoProd={this.props.loadPromoProd}
                                             loadPromoPart={this.props.loadPromoPart}
                                             onSendUrlParams={this.props.onSendUrlParams}
                                             onSaveWeek={this.props.onSaveWeek}
                                             storeSelectionParams={this.props.onSaveStoreFilterParam}
                                             onSaveDateFilterParam={this.props.onSaveDateFilterParam}
                                             previous_selection={this.props.DailySales.filter_selection}
                                             previous_week_selection={this.props.DailySales.filter_week_selection}
                                             onCheckboxChange={this.props.onCheckboxChange}
                                             onCheckboxWeekChange={this.props.onCheckboxWeekChange}
                                             DSViewKpiSpinnerCheck={this.props.DSViewKpiSpinnerCheckSuccess}
                                             LineChartSpinnerCheck={this.props.LineChartSpinnerCheckSuccess}
                                             week={this.props.DailySales.week}
                                             urlParamsString={this.props.DailySales.filter_week_selection}
                                             defaultGreyScreen={this.props.defaultGreyScreen}

                          />
                        );
                      }
                      else {
                        return (<div className="text-center"><Spinner /><h4>Please Wait a Moment....!</h4></div>);
                      }
                    })()}
                  </div>

                  {/* Collapse (or) Expand filters Button*/}
                  <div style={{width:'1%',height:'20px',  marginLeft: this.state.collapsed ? '0%' : '20%',position:'fixed'}}>
                    <div className="filterCollapseBar" onClick={() => {
                      this.setState({collapsed: !this.state.collapsed})
                    }}>{this.state.collapsed ? <span className="glyphicon glyphicon-forward"></span> : <span className="glyphicon glyphicon-backward"></span>}
                    </div>
                  </div>

                  {(() => {
                    if (this.props.DailySales.defaultGreyScreen) {
                      return (
                        <div
                          className={this.state.collapsed ? 'expand-content selectAttrituteIndicator' : 'collapse-content selectAttrituteIndicator'}>
                          ----- Please select the filters to get started ------</div>
                      )
                    }

                    else {
                      return (

                        <div className={this.state.collapsed ? 'expand-content' : 'collapse-content'}>
                          {/*                    <Select menuContainerStyle={{'zIndex': 999}}
                           value={this.state.selectedValues} multi={true} placeholder="Select something"
                           options={options1}
                           onChange={this.logChange}
                           />
                           <br/>
                           <br/>
                           <br/>
                           <br/>*/}
                          {(() => {
                            if (this.props.DailySales.week_filter_data && this.props.DailySales.filter_data) {
                              return (
                                <TopFilterDSS
                                  filter_data={this.props.DailySales.filter_data}
                                  CardsDataCall={this.props.CardsDataCall}
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
                                  onSaveDateFilterParam={this.props.onSaveDateFilterParam}
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
                                  storeSelectionParams={this.props.onSaveStoreFilterParam}
                                  cardDataFetchSuccess={this.props.cardDataFetchSuccess}
                                  prodCardsDataFetchSuccess={this.props.prodCardsDataFetchSuccess}

                                />

                              )
                            }
                          })()}

                          <div>
                            <div className="row fixingPosition"
                                 style={{marginLeft: "0%", paddingTop: "-5px", marginRight: "0px"}}>
                              {(() => {
                                if (this.props.DailySales.cards_data) {
                                  let a = this.props.DailySales.cards_data.sales,
                                    b = this.props.DailySales.cards_data.volume,
                                    c = this.props.DailySales.cards_data.cogs,
                                    d = this.props.DailySales.cards_data.profit,
                                    e = this.props.DailySales.cards_data.margin;
                                  return (
                                    <div>
                                      <div className="row mainBox" style={{textAlign: 'center'}}>
                                        <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa"}}>
                                          <Panel>
                                            <div className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>
                                              Value<br/>
                                              {(()=>{
                                                  if (this.props.DailySales.dateurlParam){
                                                    return (
                                                      <h5>({(this.props.DailySales.dateurlParam).substring(7, this.props.DailySales.dateurlParam.length)})</h5>
                                                    )
                                                  }
                                                  else if (this.props.DailySales.week_filter_data){
                                                    return(
                                                      <h5>({(this.props.DailySales.week_filter_data.calender_date[0].date_ty)})</h5>
                                                    )
                                                  }
                                                }
                                              )()}
                                            </div>

                                            <div className="row">
                                              <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                                <h3>{formatMetric(a.tot_sales)}</h3>
                                              </div>
                                              <div className="col-md-6 col-sm-6 col-xs-6">
                                                <h3>LFL TY{formatMetric(a.tot_sales_lfl)}</h3>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(a.sales_var_wow)}></span>&nbsp;{round(a.sales_var_wow,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(a.sales_var_yoy)}></span>&nbsp;{round(a.sales_var_yoy,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(a.sales_var_lfl)}></span>&nbsp;{round(a.sales_var_lfl,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-12">
                                                <h3 style={{
                                                  padding: "0px",
                                                  margin: "0px",
                                                  backgroundColor: "#e5e8ea"
                                                }}>WTD {formatMetric(a.tot_sales_wtd)}</h3>
                                              </div>
                                            </div>
                                          </Panel>
                                        </div>

                                        <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa"}}>
                                          <Panel>
                                            <div className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>
                                              Volume<br/>
                                              {(()=>{
                                                  if (this.props.DailySales.dateurlParam){
                                                    return (
                                                      <h5>({(this.props.DailySales.dateurlParam).substring(7, this.props.DailySales.dateurlParam.length)})</h5>
                                                    )
                                                  }
                                                  else if (this.props.DailySales.week_filter_data){
                                                    return(
                                                      <h5>({(this.props.DailySales.week_filter_data.calender_date[0].date_ty)})</h5>
                                                    )
                                                  }
                                                }
                                              )()}
                                            </div>

                                            <div className="row">
                                              <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                                <h3 >{formatMetric(b.tot_vol, "volume")}</h3>
                                              </div>
                                              <div className="col-md-6 col-sm-6 col-xs-6">
                                                <h3>LFL TY {formatMetric(b.tot_vol_lfl, "volume")}</h3>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(b.vol_var_wow)}></span>&nbsp;{round(b.vol_var_wow,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(b.vol_var_yoy)}></span>&nbsp;{round(b.vol_var_yoy,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(b.vol_var_lfl)}></span>&nbsp;{round(b.vol_var_lfl,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-12">
                                                <h3 style={{padding: "0px", margin: "0px", backgroundColor: "#e5e8ea"
                                                }}>WTD {formatMetric(b.tot_vol_wtd, "volume")}</h3>
                                              </div>
                                            </div>
                                          </Panel>
                                        </div>

                                        <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa"}}>
                                          <Panel>
                                            <div className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>
                                              COGS<br/>
                                              {(()=>{
                                                  if (this.props.DailySales.dateurlParam){
                                                    return (
                                                      <h5>({(this.props.DailySales.dateurlParam).substring(7, this.props.DailySales.dateurlParam.length)})</h5>
                                                    )
                                                  }
                                                  else if (this.props.DailySales.week_filter_data){
                                                    return(
                                                      <h5>({(this.props.DailySales.week_filter_data.calender_date[0].date_ty)})</h5>
                                                    )
                                                  }
                                                }
                                              )()}
                                            </div>
                                            <div className="row">
                                              <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                                <h3>{formatMetric(c.tot_cogs)}</h3>
                                              </div>
                                              <div className="col-md-6 col-sm-6 col-xs-6">
                                                <h3>LFL TY {formatMetric(c.tot_cogs_lfl)}</h3>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(c.cogs_var_wow)}></span>&nbsp;{round(c.cogs_var_wow,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(c.cogs_var_yoy)}></span>&nbsp;{round(c.cogs_var_yoy,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(c.cogs_var_lfl)}></span>&nbsp;{round(c.cogs_var_lfl,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-12">
                                                <h3 style={{padding: "0px", margin: "0px", backgroundColor: "#e5e8ea"
                                                }}>WTD {formatMetric(c.tot_cogs_wtd)}</h3>
                                              </div>
                                            </div>
                                          </Panel>
                                        </div>

                                      </div>


                                      <div className="row mainBox" style={{textAlign: 'center'}}>
                                        <div className="col-md-6 col-xs-6" style={{backgroundColor: "#fafafa"}}>
                                          <Panel>
                                            <div className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>
                                              Profit<br/>
                                              {(()=>{
                                                  if (this.props.DailySales.dateurlParam){
                                                    return (
                                                      <h5>({(this.props.DailySales.dateurlParam).substring(7, this.props.DailySales.dateurlParam.length)})</h5>
                                                    )
                                                  }
                                                  else if (this.props.DailySales.week_filter_data){
                                                    return(
                                                      <h5>({(this.props.DailySales.week_filter_data.calender_date[0].date_ty)})</h5>
                                                    )
                                                  }
                                                }
                                              )()}
                                            </div>
                                            <div className="row">
                                              <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                                <h3>{formatMetric(d.tot_profit)}</h3>
                                              </div>
                                              <div className="col-md-6 col-sm-6 col-xs-6">
                                                <h3>LFL TY {formatMetric(d.tot_profit_lfl)}</h3>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(d.profit_var_wow)}></span>&nbsp;{round(d.profit_var_wow,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(d.profit_var_yoy)}></span>&nbsp;{round(d.profit_var_yoy,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(d.profit_var_lfl)}></span>&nbsp;{round(d.profit_var_lfl,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-12">
                                                <h3 style={{padding: "0px", margin: "0px", backgroundColor: "#e5e8ea"
                                                }}>WTD {formatMetric(d.tot_profit_wtd)}</h3>
                                              </div>
                                            </div>
                                          </Panel>
                                        </div>

                                        <div className="col-md-6 col-xs-6" style={{backgroundColor: "#fafafa"}}>
                                          <Panel>
                                            <div className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>
                                              Margin %<br/>
                                              {(()=>{
                                                  if (this.props.DailySales.dateurlParam){
                                                    return (
                                                      <h5>({(this.props.DailySales.dateurlParam).substring(7, this.props.DailySales.dateurlParam.length)})</h5>
                                                    )
                                                  }
                                                  else if (this.props.DailySales.week_filter_data){
                                                    return(
                                                      <h5>({(this.props.DailySales.week_filter_data.calender_date[0].date_ty)})</h5>
                                                    )
                                                  }
                                                }
                                              )()}
                                            </div>
                                            <div className="row">
                                              <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                                <h3>{round(e.current_day,1)}%</h3>
                                              </div>
                                              <div className="col-md-6 col-sm-6 col-xs-6">
                                                <h3>LFL TY {round(e.current_day_lfl,1)}%</h3>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(e.wow)}></span>&nbsp;{round(e.wow,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(e.yoy)}></span>&nbsp;{round(e.yoy,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                <h4><span
                                                  className={this.formatGlyphicon(e.yoy_lfl)}></span>&nbsp;{round(e.yoy_lfl,1)}%
                                                </h4>
                                                <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-12">
                                                <h3 style={{padding: "0px", margin: "0px", backgroundColor: "#e5e8ea"}}>
                                                  <br></br></h3>
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
                                      this.setState({
                                        activeKey1: "1",
                                        y_axis: "WTD Sales Value",
                                        legendTY:"Sales TY",
                                        legendLY:"Sales LY"
                                      });
                                      kpiParams = "val_type=1";
                                      this.props.onSaveKPIParam(kpiParams);
                                      this.props.ChartDataCall();
                                      this.props.DSViewKpiSpinnerCheckSuccess(0);
                                      this.props.LineChartSpinnerCheckSuccess(0);
                                    }}><span className="tab_label">Sales</span></NavItem>
                                    <NavItem style={{fontSize: '16px', textAlign: 'center', margin: "0px"}}
                                             className="tabsCustomList" eventKey="2" onClick={() => {
                                      this.setState({
                                        activeKey1: "2",
                                        y_axis: "WTD Volume",
                                        legendTY:"Volume TY",
                                        legendLY:"Volume LY"
                                      });
                                      kpiParams = "val_type=2";
                                      this.props.onSaveKPIParam(kpiParams);
                                      this.props.ChartDataCall();
                                      this.props.DSViewKpiSpinnerCheckSuccess(0);
                                      this.props.LineChartSpinnerCheckSuccess(0);
                                    }}><span className="tab_label">Volume</span></NavItem>
                                    <NavItem style={{fontSize: '16px', textAlign: 'center', margin: "0px"}}
                                             className="tabsCustomList" eventKey="3" onClick={() => {
                                      this.setState({
                                        activeKey1: "3",
                                        y_axis: "WTD COGS",
                                        legendTY:"COGS TY",
                                        legendLY:"COGS LY"
                                      });
                                      kpiParams = "val_type=3";
                                      this.props.onSaveKPIParam(kpiParams);
                                      this.props.ChartDataCall();
                                      this.props.DSViewKpiSpinnerCheckSuccess(0);
                                      this.props.LineChartSpinnerCheckSuccess(0);
                                    }}><span className="tab_label">COGS</span></NavItem>
                                    <NavItem style={{fontSize: '16px', textAlign: 'center', margin: "0px"}}
                                             className="tabsCustomList" eventKey="4" onClick={() => {
                                      this.setState({
                                        activeKey1: "4",
                                        y_axis: "WTD Profit",
                                        legendTY:"Profit TY",
                                        legendLY:"Profit LY"
                                      });
                                      kpiParams = "val_type=4";
                                      this.props.onSaveKPIParam(kpiParams);
                                      this.props.ChartDataCall();
                                      this.props.DSViewKpiSpinnerCheckSuccess(0);
                                      this.props.LineChartSpinnerCheckSuccess(0);
                                    }}><span className="tab_label">Profit</span></NavItem>
                                  </Nav>
                                </div>
                                <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                                  <div className="col-md-6 col-sm-6">
                                    {(() => {
                                      if (this.props.DailySales.charts_data && this.props.DailySales.charts_data.graph_data && this.props.DailySales.LineChartSpinnerCheck != 0) {
                                        if (this.props.DailySales.charts_data.graph_data.graph_data.length != 0) {
                                          return (
                                            <Panel style={{alignItems: "center"}}>
                                              <div className="col-xs-12">
                                              <div className="col-md-9 col-sm-12 col-xs-12" style={{textAlign: "center"}}>
                                                <h3 className="pageModuleSubTitle" style={{marginTop: "12px"}}>Daily Trend</h3>
                                              </div>
                                              {/*Daily Sales Line chart*/}
                                              <div>
                                                    <span style={{float: "right"}}>
                                                      <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                                                        backgroundColor: "transparent",
                                                        borderColor: "transparent",
                                                        color: "#00539f"
                                                      }} id="dropButtonId">
                                                        <MenuItem onClick={() => {
                                                          saveImage(document.getElementById('daily_sales_svg'), "daily_trend")
                                                        }
                                                        }>Save As JPEG</MenuItem>
                                                        <MenuItem onClick={() => {
                                                          saveDataAsCSV(this.props.DailySales.charts_data.graph_data.graph_data, "daily_trend_data.csv")
                                                        }
                                                        }>Download CSV</MenuItem>
                                                      </DropdownButton>
                                                    </span>
                                              </div>
                                              <DualLineChart2 x_axis="Week Day" y_axis="Daily Trend"
                                                              legendTY={this.state.legendTY}
                                                              legendLY={this.state.legendLY}
                                                              id="daily_sales"
                                                              data={this.props.DailySales.charts_data.graph_data.graph_data}/>
                                              </div>
                                            </Panel>
                                          )
                                        }
                                        else {
                                          return (
                                            <div> No Sales for This Product in the Selected Week! </div>
                                          )
                                        }
                                      }
                                      else {
                                        return (<div className="text-center"><Spinner />Please Wait a Moment....!</div>)
                                      }
                                    })()}
                                  </div>
                                  <div className="col-md-6 col-sm-6">
                                    {(() => {
                                      if (this.props.DailySales.charts_data && this.props.DailySales.charts_data.graph_data && this.props.DailySales.LineChartSpinnerCheck != 0) {
                                        return (
                                          <Panel style={{alignItems: "center"}}>
                                            <div className="col-xs-12">
                                              <div className="col-md-9 col-sm-12 col-xs-12" style={{textAlign: "center"}}>
                                                <h3 className="pageModuleSubTitle" style={{marginTop: "12px"}}>Cumulative Trend</h3>
                                              </div>
                                              {/*Cumulative Sales Line chart*/}
                                              <div>
                                                <span style={{float: "right"}}>
                                                  <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                                                    backgroundColor: "transparent",
                                                    borderColor: "transparent",
                                                    color: "#00539f"
                                                  }} id="dropButtonId">
                                                    <MenuItem onClick={() => {
                                                      saveImage(document.getElementById('cumulative_sales_svg'), "cumulative_trend_barChart")
                                                    }
                                                    }>Save As JPEG</MenuItem>
                                                    <MenuItem onClick={() => {
                                                      saveDataAsCSV(this.props.DailySales.charts_data.graph_data.cum_graph_data, "cumulative_trend_barChart_data.csv")
                                                    }
                                                    }>Download CSV</MenuItem>
                                                  </DropdownButton>
                                                </span>
                                              </div>
                                              <MultiSeriesBarChart x_axis="Week Day" y_axis="Cumulative Values"
                                                                   legendTY="WTD TY"
                                                                   legendLY="WTD LY"
                                                                   id="cumulative_sales"
                                                                   data={this.props.DailySales.charts_data.graph_data}/>
                                            </div>
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
                                  <b>Products Daily {this.state.y_axis} Info </b>
                                </h2>
                                <div>
                                  {
                                    (() => {
                                      if (this.props.DailySales.charts_data && this.props.DailySales.charts_data.dss_table && this.props.DailySales.LineChartSpinnerCheck != 0) {
                                        //console.log("This is table data length:",this.props.ProductPage.data.table_data.length);
                                        return (
                                          <div>
                                            <BootstrapTable
                                              data={this.props.DailySales.charts_data.dss_table}
                                              selectRow={selectRowProp} options={options}
                                              striped={true}
                                              hover
                                              condensed
                                              pagination={ true }
                                              search={true}
                                              exportCSV={true}
                                            >
                                              <TableHeaderColumn width="250" tdStyle={ {whiteSpace: 'normal'} }
                                                                 dataField="product" isKey={true}
                                                                 dataAlign="center" dataSort>Product
                                                Description</TableHeaderColumn>
                                              <TableHeaderColumn dataField="brand_indicator" dataSort={true}
                                                                 dataAlign="center">Brand</TableHeaderColumn>
                                              <TableHeaderColumn dataField="brand_name" dataSort={true}
                                                                 dataAlign="center">Brand Name</TableHeaderColumn>
                                              <TableHeaderColumn dataField="kpi_ty" dataSort={true}
                                                                 dataFormat={formatMetric}
                                                                 dataAlign="center">TY</TableHeaderColumn>
                                              <TableHeaderColumn dataField="kpi_ly" dataFormat={formatMetric}
                                                                 dataSort={true}
                                                                 dataAlign="center">LY</TableHeaderColumn>
                                              <TableHeaderColumn dataField="kpi_ty_lfl" dataFormat={formatMetric}
                                                                 dataSort={true}
                                                                 dataAlign="center">TY LFL</TableHeaderColumn>
                                              <TableHeaderColumn dataField="kpi_ly_lfl" dataFormat={formatMetric}
                                                                 dataSort={true}
                                                                 dataAlign="center">LY LFL</TableHeaderColumn>
                                              <TableHeaderColumn dataFormat={this.cellButton}
                                                                 tdStyle={ {whiteSpace: 'normal'} } dataAlign="center">Sales
                                                Info</TableHeaderColumn>
                                            </BootstrapTable>
                                            <button
                                              type="button"
                                              style={{float: 'right', fontSize: "14px"}}
                                              className="btn btn-danger"
                                              onClick={() => {
                                                let objString = '/ranging/delist?';
                                                let selected = this.state.SelectProducts;
                                                if (selected !== '[]') {
                                                  for (let i = 0; i < selected.length; i++) {
                                                    objString += 'base_product_number=' + selected[i] + '&'
                                                  }
                                                  objString = objString.slice(0, objString.length - 1);
                                                  console.log(objString);
                                                  window.location = objString;
                                                } else {
                                                  alert("You have not selected any products to delist. Are you sure you want to see the delist impact?")
                                                }
                                              }}
                                            >SEND TO DE-LIST
                                            </button>
                                          </div>
                                        );

                                      }
                                      else {
                                        return (

                                          <div className="text-center" colSpan="11" style={{textAlign: 'center'}}>
                                            <Spinner />Please Wait a Moment....!</div>

                                        );
                                      }
                                    })()
                                  }

                                </div>
                              </div>

                              <Modal show={this.state.showProductSalesInfoModalFlag}
                                     onHide={() => {
                                       this.setState({showProductSalesInfoModalFlag: false})
                                       this.props.prodCardsDataFetchSuccess(false);
                                       this.props.prodChartsDataFetchSuccess(false);
                                     }}
                                     bsSize="large" aria-labelledby="contained-modal-title-sm"
                              >
                                <Modal.Header>

                                  <Modal.Title id="contained-modal-title-sm" className="pageModuleTitle">
                            <span className="pageModuleTitle"><b>{this.state.y_axis} Trend : {this.state.product}</b>
                             <span style={{textAlign: 'right', float: 'right'}}
                                   onClick={() => {
                                     this.setState({showProductSalesInfoModalFlag: false})
                                     this.props.prodCardsDataFetchSuccess(false);
                                     this.props.prodChartsDataFetchSuccess(false);
                                   }}>
                              <b>X</b></span></span>
                                  </Modal.Title>

                                </Modal.Header>
                                <Modal.Body className="infoModalText">
                                  <div>
                                    {(() => {
                                      if (this.props.DailySales.prod_cards_data && this.props.DailySales.ProdCardsSpinnerCheck != 0) {
                                        let a = this.props.DailySales.prod_cards_data.sales,
                                          b = this.props.DailySales.prod_cards_data.volume,
                                          c = this.props.DailySales.prod_cards_data.cogs,
                                          d = this.props.DailySales.prod_cards_data.profit,
                                          e = this.props.DailySales.prod_cards_data.margin;
                                        return (
                                          <div>
                                            <div className="row mainBox" style={{textAlign: 'center'}}>
                                              {/* Box for value */}
                                              <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa"}}>
                                                <Panel>
                                                  <div className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>
                                                    Value<br/>
                                                    {(()=>{
                                                        if (this.props.DailySales.dateurlParam){
                                                          return (
                                                            <h5>({(this.props.DailySales.dateurlParam).substring(7, this.props.DailySales.dateurlParam.length)})</h5>
                                                          )
                                                        }
                                                        else if (this.props.DailySales.week_filter_data){
                                                          return(
                                                            <h5>({(this.props.DailySales.week_filter_data.calender_date[0].date_ty)})</h5>
                                                          )
                                                        }
                                                      }
                                                    )()}
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                                      <h3>{formatMetric(a.tot_sales)}</h3>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                                      <h3>LFL TY{formatMetric(a.tot_sales_lfl)}</h3>
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(a.sales_var_wow)}></span>&nbsp;{round(a.sales_var_wow,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(a.sales_var_yoy)}></span>&nbsp;{round(a.sales_var_yoy,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(a.sales_var_lfl)}></span>&nbsp;{round(a.sales_var_lfl,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-12">
                                                      <h3 style={{padding: "0px", margin: "0px", backgroundColor: "#e5e8ea"
                                                      }}>{formatMetric(a.tot_sales_wtd)}</h3>
                                                    </div>
                                                  </div>
                                                </Panel>
                                              </div>

                                              <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa"}}>
                                                <Panel>
                                                  <div className="pageModuleSubTitle"
                                                      style={{padding: "0px", margin: "0px"}}>
                                                    Volume<br/>
                                                    {(()=>{
                                                        if (this.props.DailySales.dateurlParam){
                                                          return (
                                                            <h5>({(this.props.DailySales.dateurlParam).substring(7, this.props.DailySales.dateurlParam.length)})</h5>
                                                          )
                                                        }
                                                        else if (this.props.DailySales.week_filter_data){
                                                          return(
                                                            <h5>({(this.props.DailySales.week_filter_data.calender_date[0].date_ty)})</h5>
                                                          )
                                                        }
                                                      }
                                                    )()}
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                                      <h3 >{formatMetric(b.tot_vol, "volume")}</h3>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                                      <h3>LFL TY {formatMetric(b.tot_vol_lfl, "volume")}</h3>
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(b.vol_var_wow)}></span>&nbsp;{round(b.vol_var_wow,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(b.vol_var_yoy)}></span>&nbsp;{round(b.vol_var_yoy,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(b.vol_var_lfl)}></span>&nbsp;{round(b.vol_var_lfl,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-12">
                                                      <h3 style={{padding: "0px", margin: "0px", backgroundColor: "#e5e8ea"
                                                      }}>WTD {formatMetric(b.tot_vol_wtd, "volume")}</h3>
                                                    </div>
                                                  </div>
                                                </Panel>
                                              </div>

                                              <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa"}}>
                                                <Panel>
                                                  <div className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>
                                                    COGS<br/>
                                                    {(()=>{
                                                        if (this.props.DailySales.dateurlParam){
                                                          return (
                                                            <h5>({(this.props.DailySales.dateurlParam).substring(7, this.props.DailySales.dateurlParam.length)})</h5>
                                                          )
                                                        }
                                                        else if (this.props.DailySales.week_filter_data){
                                                          return(
                                                            <h5>({(this.props.DailySales.week_filter_data.calender_date[0].date_ty)})</h5>
                                                          )
                                                        }
                                                      }
                                                    )()}
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                                      <h3>{formatMetric(c.tot_cogs)}</h3>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                                      <h3>LFL TY {formatMetric(c.tot_cogs_lfl)}</h3>
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(c.cogs_var_wow)}></span>&nbsp;{round(c.cogs_var_wow,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(c.cogs_var_yoy)}></span>&nbsp;{round(c.cogs_var_yoy,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(c.cogs_var_lfl)}></span>&nbsp;{round(c.cogs_var_lfl,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-12">
                                                      <h3 style={{padding: "0px", margin: "0px", backgroundColor: "#e5e8ea"
                                                      }}>WTD {formatMetric(c.tot_cogs_wtd)}</h3>
                                                    </div>
                                                  </div>
                                                </Panel>
                                              </div>

                                            </div>

                                            <div className="row mainBox" style={{textAlign: 'center'}}>
                                              <div className="col-md-6 col-xs-6" style={{backgroundColor: "#fafafa"}}>
                                                <Panel>
                                                  <div className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>
                                                    Profit<br/>
                                                    {(()=>{
                                                        if (this.props.DailySales.dateurlParam){
                                                          return (
                                                            <h5>({(this.props.DailySales.dateurlParam).substring(7, this.props.DailySales.dateurlParam.length)})</h5>
                                                          )
                                                        }
                                                        else if (this.props.DailySales.week_filter_data){
                                                          return(
                                                            <h5>({(this.props.DailySales.week_filter_data.calender_date[0].date_ty)})</h5>
                                                          )
                                                        }
                                                      }
                                                    )()}
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                                      <h3>{formatMetric(d.tot_profit)}</h3>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                                      <h3>LFL TY {formatMetric(d.tot_profit_lfl)}</h3>
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(d.profit_var_wow)}></span>&nbsp;{round(d.profit_var_wow,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(d.profit_var_yoy)}></span>&nbsp;{round(d.profit_var_yoy,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(d.profit_var_lfl)}></span>&nbsp;{round(d.profit_var_lfl,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-12">
                                                      <h3 style={{padding: "0px", margin: "0px", backgroundColor: "#e5e8ea"
                                                      }}>WTD {formatMetric(d.tot_profit_wtd)}</h3>
                                                    </div>
                                                  </div>
                                                </Panel>
                                              </div>

                                              <div className="col-md-6 col-xs-6" style={{backgroundColor: "#fafafa"}}>
                                                <Panel>
                                                  <div className="pageModuleSubTitle" style={{padding: "0px", margin: "0px"}}>
                                                    Margin %<br/>
                                                    {(()=>{
                                                        if (this.props.DailySales.dateurlParam){
                                                          return (
                                                            <h5>({(this.props.DailySales.dateurlParam).substring(7, this.props.DailySales.dateurlParam.length)})</h5>
                                                          )
                                                        }
                                                        else if (this.props.DailySales.week_filter_data){
                                                          return(
                                                            <h5>({(this.props.DailySales.week_filter_data.calender_date[0].date_ty)})</h5>
                                                          )
                                                        }
                                                      }
                                                    )()}
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-6 col-sm-6 col-xs-6 kpiSmall">
                                                      <h3>{round(e.current_day,1)}%</h3>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                                      <h3>LFL TY {round(e.current_day_lfl,1)}%</h3>
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(b.vol_var_wow)}></span>&nbsp;{round(e.wow,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(b.vol_var_yoy)}></span>&nbsp;{round(e.yoy,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>YoY</b></h5>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4 col-xs-4">
                                                      <h4><span
                                                        className={this.formatGlyphicon(b.vol_var_lfl)}></span>&nbsp;{round(e.yoy_lfl,1)}%
                                                      </h4>
                                                      <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-12">
                                                      <h3 style={{padding: "0px", margin: "0px", backgroundColor: "#e5e8ea"
                                                      }}><br></br></h3>
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
                                  </div>
                                  <div className="col-md-12">
                                    <h4 className="pageModuleMainTitle">Daily {this.state.y_axis} Trend
                                    </h4>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                      {(() => {
                                        if (this.props.DailySales.prod_charts_data && this.props.DailySales.prod_charts_data.graph_data && this.props.DailySales.ProdChartsSpinnerCheck != 0) {
                                          if (this.props.DailySales.prod_charts_data.graph_data.graph_data.length != 0) {
                                            return (
                                              <Panel style={{alignItems: "center"}}>
                                                <div className="col-xs-12">
                                                  <div className="col-md-9 col-sm-12 col-xs-12" style={{textAlign: "center"}}>
                                                    <h3 className="pageModuleSubTitle" style={{marginTop: "12px"}}>Daily Trend</h3>
                                                  </div>
                                                  {/*Daily Product Sales Line chart*/}
                                                  <div>
                                                    <span style={{float: "right"}}>
                                                      <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                                                        backgroundColor: "transparent",
                                                        borderColor: "transparent",
                                                        color: "#00539f"
                                                      }} id="dropButtonId">
                                                        <MenuItem onClick={() => {
                                                          saveImage(document.getElementById('prod_daily_sales_svg'), "product_daily_lineChart_trend")
                                                        }
                                                        }>Save As JPEG</MenuItem>
                                                        <MenuItem onClick={() => {
                                                          saveDataAsCSV(this.props.DailySales.prod_charts_data.graph_data.graph_data, "product_daily_trend_lineChart_data.csv")
                                                        }
                                                        }>Download CSV</MenuItem>
                                                      </DropdownButton>
                                                    </span>
                                                  </div>
                                                  <DualLineChart2 x_axis="Week Day" y_axis="Daily Trend"
                                                                  legendTY={this.state.legendTY}
                                                                  legendLY={this.state.legendLY}
                                                                  id="prod_daily_sales"
                                                                  data={this.props.DailySales.prod_charts_data.graph_data.graph_data}/>
                                                </div>
                                              </Panel>
                                            )
                                          }
                                          else {
                                            return (
                                              <div> No Sales for This Product in the Selected Week! </div>
                                            )
                                          }
                                        }
                                        else {
                                          return (
                                            <div className="text-center"><Spinner />Please Wait a Moment....!</div>)
                                        }
                                      })()}
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                      {(() => {
                                        if (this.props.DailySales.prod_charts_data && this.props.DailySales.prod_charts_data.graph_data && this.props.DailySales.ProdChartsSpinnerCheck != 0) {
                                          if (this.props.DailySales.prod_charts_data.graph_data.cum_graph_data.length != 0) {
                                            return (
                                              <Panel style={{alignItems: "center"}}>
                                                <div className="col-xs-12">
                                                  <div className="col-md-9 col-sm-12 col-xs-12"
                                                       style={{textAlign: "center"}}>
                                                    <h3 className="pageModuleSubTitle" style={{marginTop: "12px"}}>
                                                      Cumulative Trend</h3>
                                                  </div>
                                                  {/*Cumulative Product Sales Bar chart*/}
                                                  <div>
                                                    <span style={{float: "right"}}>
                                                      <DropdownButton className="glyphicon glyphicon-menu-hamburger"
                                                                      pullRight style={{
                                                        backgroundColor: "transparent",
                                                        borderColor: "transparent",
                                                        color: "#00539f"
                                                      }} id="dropButtonId">
                                                        <MenuItem onClick={() => {
                                                          saveImage(document.getElementById('prod_cumulative_sales_svg'), "product_cumulative_barChart_trend")
                                                        }
                                                        }>Save As JPEG</MenuItem>
                                                        <MenuItem onClick={() => {
                                                          saveDataAsCSV(this.props.DailySales.prod_charts_data.graph_data.cum_graph_data, "product_daily_trend_lineChart_data.csv")
                                                        }
                                                        }>Download CSV</MenuItem>
                                                      </DropdownButton>
                                                    </span>
                                                  </div>
                                                  <MultiSeriesBarChart x_axis="Week Day" y_axis="Cumulative Value"
                                                                       legendTY="WTD TY"
                                                                       legendLY="WTD LY"
                                                                       id="prod_cumulative_sales"
                                                                       data={this.props.DailySales.prod_charts_data.graph_data}/>
                                                </div>
                                              </Panel>
                                            )
                                          }
                                          else {
                                            return (
                                              <div> No Sales for This Product in the Selected Week! </div>
                                            )
                                          }
                                        }
                                        else {
                                          return (
                                            <div className="text-center"><Spinner />Please Wait a Moment....!</div>)
                                        }
                                      })()}
                                    </div>
                                  </div>

                                </Modal.Body>
                              </Modal>

                            </div>
                          </div>
                        </div>
                      )
                    }
                  })()}
                </div>

              )
            }
          })()}
        </div>
      </div>
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

    cardDataFetchSuccess: (e) => dispatch(cardDataFetchSuccess(e)),
    CardsDataCall: (e) => dispatch(cardsCallAction(e)),
    ChartDataCall: (e) => dispatch(chartCallAction(e)),
    onSaveWeekParam: (e) => dispatch(SaveWeekParam(e)),
    loadKpi: (e) => dispatch(PromoKpiData(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
    defaultPageLoadCheck: (e) => dispatch(defaultPageLoadCheck(e)),
    onGenerateUrlParamsData: (e) => dispatch(generateSideFilter(e)),
    onSaveStoreFilterParam: (e) => dispatch(StoreFilterParam(e)),
    onGetFilter: (e) => dispatch(getFilter(e)),
    onGenerateSideFilter: (e) => dispatch(getFilter(e)),
    onSaveSalesParam: (e) => dispatch(SaveSalesParam(e)),
    onGetWeekFilter: (e) => dispatch(getWeekFilter(e)),
    ongenerateWeekFilter: (e) => dispatch(getWeekFilter(e)),
    onSaveDateFilterParam: (e) => dispatch(DateFilterParam(e)),
    onGenerateUrlParams: (e) => dispatch(generateUrlParams(e)),
    onSendUrlParams: (e) => dispatch(sendUrlParams(e)),
    onSaveWeek: (e) => dispatch(SaveWeek(e)),
    onCheckboxChange: (e) => dispatch(checkboxChange(e)),
    onSaveProduct: (e) => dispatch(saveProduct(e)),
    onProductCardsData: (e) => dispatch(productCardsData(e)),
    onProductChartsData: (e) => dispatch(productChartsData(e)),
    prodCardsDataFetchSuccess: (e) => dispatch(prodCardsDataFetchSuccess(e)),
    prodChartsDataFetchSuccess: (e) => dispatch(prodChartsDataFetchSuccess(e)),
    LineChartSpinnerCheckSuccess: (e) => dispatch(LineChartSpinnerCheckSuccess(e)),
    LineChartSpinnerCheck: (e) => dispatch(LineChartSpinnerCheckSuccess(e)),
    onCheckboxWeekChange: (e) => dispatch(checkboxWeekChange(e)),
    defaultGreyScreen: (e) => dispatch(defaultGreyScreen(e)),
    dispatch,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DailySales);
