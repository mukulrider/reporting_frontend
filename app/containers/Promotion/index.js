/*
 *
 * Promotion
 *
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Modal, Nav, NavItem, DropdownButton, MenuItem} from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';
import {saveImage, saveDataAsCSV} from './../../utils/exportFunctions';
import Panel from 'components/panel';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectPromotion from './selectors';
import messages from './messages';
import './style.scss';
import PieChart from 'components/PieChart';
import Spinner from 'components/spinner';
import PromoFilter from 'components/PromoFilter';
import Breadcrumb from 'components/Breadcrumb';
import Link from 'components/link';
import PromoTopFilter from 'components/PromoTopFilter';
import MultilinePromo from 'components/MultilinePromo';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import SelectInput from 'components/select_input';

import {
  generateUrlParamsString,
  SaveWeekParam,
  SaveKPIParam,
  PromoKpiData,
  PromoSalesData,
  PromoGiveawayData,
  PromoProdData,
  PromoPartData,
  getFilter,
  getWeekFilter,
  SaveSalesParam,
  SaveGiveawayParam,
  SavePromoProdParam,
  SavePromoPartParam,
  WeekFilterParam,
  pieChartSuccess,
  promoGiveAwaySuccess,
  productsCountSplitSuccess,
  promoParticipationBySplitSuccess,
  productsTableSplitSuccess,
  kpiDataSuccess,
  modalSaveTrendChartTabParam,
  saveTrendChartTabParam, productsOnPromoTableFetch, trendChartDataFetch, pieChartDataFetch,
  saveMetricSelectionTabParam,
  trendChartSpinner, modalProductName, modalProductInfo, modalProductInfoSuccess, StoreFilterParam, defaultGreyScreen,
  savePieChartType, saveLineChartType, saveModalLineChartType,
} from './actions';

function glyphiconFormatter(cell) {
  // console.log("Cell:", cell);
  if (cell > 0) {
    let classType = "glyphicon glyphicon-triangle-top glyphiconPositive";
    return classType;
  }
  else if (cell < 0) {
    let classType = "glyphicon glyphicon-triangle-bottom glyphiconNegative";
    return classType;
  } else {
    let classType = "glyphicon glyphicon-minus-sign glyphiconNeutral";
    return classType;
  }

}

function triangleColumnFormatter(cell, row) {
  if (cell > 0) {
    return '<i class="glyphicon glyphicon-triangle-top glyphiconPositive"></i>&nbsp;' + cell + '%';
  }
  else if (cell < 0) {
    return '<i class="glyphicon glyphicon-triangle-bottom glyphiconNegative"></i>&nbsp;' + cell + '%';
  } else {
    return '<i class="glyphicon glyphicon-minus-sign glyphiconNeutral"></i>&nbsp;' + cell + '%';
  }
}


export class Promotion extends React.PureComponent {
  componentDidMount = () => {
    let defaultFilterUrlParams = localStorage.getItem('urlParams');
    // console.log('defaultFilterUrlParams', defaultFilterUrlParams);

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
      if (buyer && buyingController) {
        this.props.onGenerateUrlParamsString(`buying_controller=${buyingController}&buyer=${buyer}`);

      } else if (buyingController) {
        this.props.onGenerateUrlParamsString(`buying_controller=${buyingController}`);

      } else {
        this.props.onGenerateUrlParamsString(``);

      }
    }

    let dataWeekParam = 'week_flag=Current Week';
    let kpiParam = 'kpi_type=value';
    this.props.onSaveKPIParam(kpiParam);
    this.props.onSaveWeekParam(dataWeekParam);
    this.props.loadKpi();
    // this.props.loadSales();
    // this.props.loadPromoGiveaway();
    // this.props.loadPromoProd();
    // this.props.loadPromoPart();
    this.props.onGetFilter();
    this.props.onGetWeekFilter();
    this.props.pieChartDataFetch();
    this.props.trendChartDataFetch();
    this.props.productsOnPromoTableFetch();


    // this.props.promotion.reducer1.sales;
  };

  constructor(props) {
    super(props);
    this.state = {
      lineChartTypeTab: 1,
      collapsed: false,
      activeKey1: "1",
      activeKey2: "1",
      activeKey3: "1",
      activeKey4: "1",
      showModal: false,
      navValue: "value",
      SelectProducts: "[]"
    };

  }// eslint-disable-line react/prefer-stateless-function

  prodList = [];

  render() {
    let formatMetric = (cell, flag = "value") => {
      if (cell >= 1000 || cell <= -1000) {
        let rounded = Math.floor(cell / 1000);
        if (this.state.navValue == "volume") {
          return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K')
        }
        else {
          return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');
        }
      }
      else {
        if (this.state.navValue == "volume") {
          return (Math.round(cell));
        }
        else {
          return ('£ ' + Math.round(cell));
        }
      }
    }

    let kpiParam = this.props.promotion.kpi_param;
    let dataWeekParam = this.props.promotion.week_param;
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
        value: this.props.promotion.productsOnPromotion && this.props.promotion.productsOnPromotion.table_data ? this.props.promotion.productsOnPromotion.table_data.length : 0
      }], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.

      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      expandRowBgColor: 'rgb(242, 255, 163)'
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };

    let onRowSelect = (row, isSelected, e) => {
      console.log("Row:", row);
      this.prodList.push(row.product_id);
      console.log("ProdList:", this.prodList);
      this.setState({SelectProducts: this.prodList});
    }

    let onSelectAll = (isSelected, rows) => {
      if (isSelected) {
        for (let i = 0; i < rows.length; i++) {
          this.prodList.push(rows[i].product_id);
          console.log("ProdList:", this.prodList);
          this.setState({SelectProducts: this.prodList});
        }
      }
    }

    const selectRowProp = {
      mode: 'checkbox',
      clickToSelect: true,
      onSelect: onRowSelect,
      onSelectAll: onSelectAll
    };

    let week_data = []

    this.props.promotion.week_filter_data ? this.props.promotion.week_filter_data[0].items.map(obj => {
      week_data.push({rowText: obj.name})
    }) : '';

    const styles = {
      block: {
        maxWidth: 250,
      },
      toggle: {
        marginBottom: 16,
      },
      thumbOff: {
        backgroundColor: '#008dc8',
      },
      trackOff: {
        backgroundColor: '#e5e5e5',
      },
      thumbSwitched: {
        backgroundColor: '#008dc8',
      },
      trackSwitched: {
        backgroundColor: '#e5e5e5',
      },
      labelStyle: {
        color: 'blue',
      },
    };
    return (
      <div>

        <Helmet
          title="Promotion"
          meta={[
            {name: 'description', content: 'Description of Promotion'},
          ]}
        />
        <div className="row">

          <Breadcrumb selected_week={this.props.promotion.kpi_data.selected_week}
                      urlParamsString={this.props.promotion.urlParamsString}/>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>

        <div className="row" style={{
          marginLeft: '0px',
          marginRight: '0px'
        }}>

          {/*Filters*/}
          <div className={this.state.collapsed ? 'collapse-filter' : 'expand-filter'}
               style={{
                 height: '100%',
                 position: 'fixed',
                 overflowX: 'hidden',
                 overflowY: 'scroll',
                 borderTop: '1px solid #ccc'
               }}>


            {(() => {
              if (this.props.promotion.filter_data) {
                return (
                  <PromoFilter sideFilter={this.props.promotion.filter_data}
                    // week_data={this.props.promotion.filter_data.week_data}
                               location={this.props.location}
                               generateSideFilter={this.props.onGetFilter}
                               onFilterReset={this.props.onFilterReset}
                               onDataUrlParams={this.props.DataUrlParams}
                               onUrlParamsData={this.props.onUrlParamsData}
                               onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                               onGenerateFilterParamsString={this.props.onGenerateFilterParamsString}
                               onGenerateUrlParamsData={this.props.onGenerateUrlParamsData}
                               week_data={this.props.promotion.week_filter_data}
                               ongenerateWeekFilter={this.props.onGetWeekFilter}
                               onSaveWeekFilterParam={this.props.onSaveWeekFilterParam}
                               previous_week_selection={this.props.weekurlParam}
                               loadKpi={this.props.loadKpi}
                               loadSales={this.props.loadSales}
                               loadPromoGiveaway={this.props.loadPromoGiveaway}
                               loadPromoProd={this.props.loadPromoProd}
                               loadPromoPart={this.props.loadPromoPart}

                               trendChartDataFetch={this.props.trendChartDataFetch}
                               pieChartDataFetch={this.props.pieChartDataFetch}
                               productsOnPromoTableFetch={this.props.productsOnPromoTableFetch}


                               pieChartSuccess={this.props.pieChartSuccess}
                               promoGiveAwaySuccess={this.props.promoGiveAwaySuccess}
                               productsCountSplitSuccess={this.props.productsCountSplitSuccess}
                               promoParticipationBySplitSuccess={this.props.promoParticipationBySplitSuccess}
                               productsTableSplitSuccess={this.props.productsTableSplitSuccess}
                               kpiDataSuccess={this.props.kpiDataSuccess}
                               trendChartSpinner={this.props.trendChartSpinner}

                               weekurlParam={this.props.promotion.weekurlParam}
                               urlParamsString={this.props.promotion.urlParamsString}
                               defaultGreyScreen={this.props.defaultGreyScreen}

                  />
                );
              }
              else {
                return (

                  <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                );
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
            if (this.props.promotion.defaultGreyScreen) {
              return (
                <div
                  className={this.state.collapsed ? 'expand-content selectAttrituteIndicator' : 'collapse-content selectAttrituteIndicator'}>
                  ----- Please select the filters to get started ------</div>
              )
            } else {
              return (
                <div className={this.state.collapsed ? 'expand-content' : 'collapse-content'}>


                  <div className="row" style={{paddingTop: "-5px"}}>
                    {/*<FormattedMessage {...messages.header} />*/}

                    {/*Page title*/}

                    {/*<div className="pageTitle">*/}
                    {/*{(() => {*/}
                    {/*if (this.props.promotion.kpi_data.selected_week) {*/}
                    {/*return (*/}
                    {/*<span>Promotions View - {this.props.promotion.kpi_data.selected_week} </span>*/}
                    {/*)*/}
                    {/*} else {*/}
                    {/*return (*/}
                    {/*<span>Promotions View - 201711  </span>*/}
                    {/*)*/}
                    {/*}*/}
                    {/*})()}*/}
                    {/*</div>*/}


                    {/*Content*/}
                    <div className="col-md-12 content-wrap" style={{background: "#fafafa"}}>
                      {/*Time period Tabs*/}
                      {/*<Nav bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect}
                       className="tabsCustom" style={{marginLeft: '1%', marginBottom: '0%'}}>
                       <NavItem className="tabsCustomListTime" eventKey="1" onClick={() => {

                       dataWeekParam = "week_flag=Current Week";
                       this.setState({activeKey1: "1"});
                       this.props.kpiDataSuccess(0);
                       this.props.pieChartSuccess(0);

                       this.props.productsTableSplitSuccess(0);
                       this.props.trendChartSpinner(0);

                       this.props.onSaveWeekParam(dataWeekParam);
                       this.props.loadKpi();
                       this.props.trendChartDataFetch();
                       this.props.pieChartDataFetch();
                       this.props.productsOnPromoTableFetch();
                       this.setState({activeKey4: "1"});

                       }}><span className="tab_label">Selected Week</span></NavItem>

                       <NavItem className="tabsCustomListTime" eventKey="2" onClick={() => {
                       this.setState({activeKey1: "2"});
                       this.setState({activeKey4: "1"});
                       this.props.saveTrendChartTabParam("");

                       this.props.kpiDataSuccess(0);
                       this.props.pieChartSuccess(0);
                       this.props.trendChartSpinner(0);

                       this.props.productsTableSplitSuccess(0);


                       dataWeekParam = "week_flag=Latest 4 Weeks";
                       this.props.onSaveWeekParam(dataWeekParam);
                       this.props.loadKpi();
                       this.props.trendChartDataFetch();
                       this.props.pieChartDataFetch();
                       this.props.productsOnPromoTableFetch();

                       }}><span className="tab_label">Last 4 weeks</span></NavItem>

                       <NavItem className="tabsCustomListTime" eventKey="3" onClick={() => {
                       this.setState({activeKey1: "3"});
                       this.setState({activeKey4: "1"});
                       this.props.saveTrendChartTabParam("");


                       this.props.kpiDataSuccess(0);
                       this.props.pieChartSuccess(0);
                       this.props.trendChartSpinner(0);

                       this.props.productsTableSplitSuccess(0);

                       dataWeekParam = "week_flag=Latest 13 Weeks";
                       this.props.onSaveWeekParam(dataWeekParam);
                       this.props.loadKpi();
                       this.props.trendChartDataFetch();
                       this.props.pieChartDataFetch();
                       this.props.productsOnPromoTableFetch();
                       this.setState({activeKey4: "1"});
                       }}><span className="tab_label">Last 13 weeks</span></NavItem>
                       <NavItem className="tabsCustomListTime" eventKey="4" onClick={() => {
                       this.setState({activeKey1: "4"});
                       this.setState({activeKey4: "1"});
                       this.props.saveTrendChartTabParam("");


                       this.props.kpiDataSuccess(0);
                       this.props.pieChartSuccess(0);
                       this.props.trendChartSpinner(0);

                       this.props.productsTableSplitSuccess(0);

                       dataWeekParam = "week_flag=Latest 26 Weeks";
                       this.props.onSaveWeekParam(dataWeekParam);
                       this.props.loadKpi();
                       this.props.trendChartDataFetch();
                       this.props.pieChartDataFetch();
                       this.props.productsOnPromoTableFetch();
                       this.setState({activeKey4: "1"});
                       }}><span className="tab_label">Last 26 weeks</span></NavItem>


                       <NavItem className="tabsCustomListTime" eventKey="5" onClick={() => {
                       this.setState({activeKey1: "5"});
                       this.setState({activeKey4: "1"});
                       this.props.saveTrendChartTabParam("");

                       this.props.kpiDataSuccess(0);
                       this.props.pieChartSuccess(0);
                       this.props.trendChartSpinner(0);

                       this.props.productsTableSplitSuccess(0);

                       dataWeekParam = "week_flag=YTD";
                       this.props.onSaveWeekParam(dataWeekParam);
                       this.props.loadKpi();
                       this.props.trendChartDataFetch();
                       this.props.pieChartDataFetch();
                       this.props.productsOnPromoTableFetch();
                       this.setState({activeKey4: "4"});
                       }}><span className="tab_label">YTD</span></NavItem>
                       </Nav>*/}
                      <div>
                        {/*Value/Volume Tabs*/}
                        {/*<div className="mainBox">*/}

                        {(() => {
                          if (this.props.promotion.week_filter_data) {
                            return (
                              <div style={{paddingLeft: '10px'}}>

                                <PromoTopFilter
                                  week_filter_data={this.props.promotion.week_filter_data}

                                  onSaveWeekFilterParam={this.props.onSaveWeekFilterParam}
                                  onSaveWeekParam={this.props.onSaveWeekParam}

                                  onSaveStoreFilterParam={this.props.onSaveStoreFilterParam}


                                  kpi_type={this.props.promotion.kpi_param}

                                  generateSideFilter={this.props.onGetFilter}
                                  onFilterReset={this.props.onFilterReset}
                                  onDataUrlParams={this.props.DataUrlParams}
                                  onUrlParamsData={this.props.onUrlParamsData}
                                  onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                                  onGenerateFilterParamsString={this.props.onGenerateFilterParamsString}
                                  onGenerateUrlParamsData={this.props.onGenerateUrlParamsData}
                                  week_data={this.props.promotion.week_filter_data}
                                  ongenerateWeekFilter={this.props.onGetWeekFilter}
                                  previous_week_selection={this.props.weekurlParam}
                                  loadKpi={this.props.loadKpi}
                                  loadSales={this.props.loadSales}
                                  loadPromoGiveaway={this.props.loadPromoGiveaway}
                                  loadPromoProd={this.props.loadPromoProd}
                                  loadPromoPart={this.props.loadPromoPart}

                                  trendChartDataFetch={this.props.trendChartDataFetch}
                                  pieChartDataFetch={this.props.pieChartDataFetch}
                                  productsOnPromoTableFetch={this.props.productsOnPromoTableFetch}


                                  pieChartSuccess={this.props.pieChartSuccess}
                                  promoGiveAwaySuccess={this.props.promoGiveAwaySuccess}
                                  productsCountSplitSuccess={this.props.productsCountSplitSuccess}
                                  promoParticipationBySplitSuccess={this.props.promoParticipationBySplitSuccess}
                                  productsTableSplitSuccess={this.props.productsTableSplitSuccess}
                                  kpiDataSuccess={this.props.kpiDataSuccess}
                                  trendChartSpinner={this.props.trendChartSpinner}

                                  weekurlParam={this.props.promotion.weekurlParam}
                                  urlParamsString={this.props.promotion.urlParamsString}

                                />
                              </div>
                            )
                          } else {
                            return (
                              <div className="text-center"><Spinner />Please Wait a Moment....!</div>
                            )
                          }
                        })()}
                        <Nav bsStyle="tabs" activeKey={this.state.activeKey2} onSelect={this.handleSelect}
                             className="tabsCustom mainTab" style={{margin: "0px", paddingLeft: '10px'}}>
                          <NavItem className="tabsNavPanelList1" eventKey="1" onClick={() => {
                            this.setState({activeKey2: "1"});
                            this.setState({activeKey4: "1"});
                            this.setState({navValue: "value"});
                            this.props.saveTrendChartTabParam("");


                            this.props.kpiDataSuccess(0);
                            this.props.pieChartSuccess(0);
                            this.props.trendChartSpinner(0);
                            {/*this.props.promoGiveAwaySuccess(0);*/
                            }
                            {/*this.props.promoParticipationBySplitSuccess(0);*/
                            }
                            {/*this.props.productsCountSplitSuccess(0);*/
                              this.props.productsTableSplitSuccess(0);
                            }
                            kpiParam = "kpi_type=value";
                            this.props.onSaveKPIParam(kpiParam);
                            this.props.loadKpi();
                            this.props.trendChartDataFetch();
                            this.props.pieChartDataFetch();
                            this.props.productsOnPromoTableFetch();

                          }}><span className="tab_label">Value</span></NavItem>

                          <NavItem className="tabsNavPanelList1" eventKey="2" onClick={() => {
                            this.setState({activeKey2: "2"});
                            this.setState({activeKey4: "1"});
                            this.setState({navValue: "volume"});
                            this.props.saveTrendChartTabParam("");

                            this.props.kpiDataSuccess(0);
                            this.props.pieChartSuccess(0);
                            this.props.trendChartSpinner(0);
                            this.props.productsTableSplitSuccess(0);
                            kpiParam = "kpi_type=volume";
                            this.props.onSaveKPIParam(kpiParam);
                            this.props.loadKpi();
                            this.props.trendChartDataFetch();
                            this.props.pieChartDataFetch();
                            this.props.productsOnPromoTableFetch();
                          }}><span className="tab_label">Volume</span></NavItem>

                          <NavItem className="tabsNavPanelList1" eventKey="3" onClick={() => {
                            this.setState({activeKey2: "3"});
                            this.setState({activeKey4: "1"});
                            this.setState({navValue: "profit"});
                            this.props.saveTrendChartTabParam("");

                            this.props.kpiDataSuccess(0);
                            this.props.pieChartSuccess(0);
                            this.props.trendChartSpinner(0);
                            this.props.productsTableSplitSuccess(0);
                            kpiParam = "kpi_type=profit";
                            this.props.onSaveKPIParam(kpiParam);
                            this.props.loadKpi();
                            this.props.trendChartDataFetch();
                            this.props.pieChartDataFetch();
                            this.props.productsOnPromoTableFetch();
                          }}><span className="tab_label">Profit</span></NavItem>

                          <NavItem className="tabsNavPanelList1" eventKey="4" onClick={() => {
                            this.setState({activeKey2: "4"});
                            this.setState({activeKey4: "1"});
                            this.setState({navValue: "giveaway"});
                            this.props.saveTrendChartTabParam("");
                            this.props.saveMetricSelectionTabParam('giveaway');
                            this.props.kpiDataSuccess(0);
                            this.props.pieChartSuccess(0);
                            this.props.trendChartSpinner(0);
                            this.props.productsTableSplitSuccess(0);
                            kpiParam = "kpi_type=giveaway";
                            this.props.onSaveKPIParam(kpiParam);
                            this.props.loadKpi();
                            this.props.trendChartDataFetch();
                            this.props.pieChartDataFetch();
                            this.props.productsOnPromoTableFetch();
                          }}><span className="tab_label">Giveaway</span></NavItem>

                          <NavItem className="tabsNavPanelList1" eventKey="5" onClick={() => {
                            this.setState({activeKey2: "5"});
                            this.setState({activeKey4: "1"});
                            this.setState({navValue: "product_count"});
                            this.props.saveTrendChartTabParam("");
                            this.props.saveMetricSelectionTabParam('products_count');
                            this.props.kpiDataSuccess(0);
                            this.props.pieChartSuccess(0);
                            this.props.trendChartSpinner(0);
                            this.props.productsTableSplitSuccess(0);
                            kpiParam = "kpi_type=products_count";
                            this.props.onSaveKPIParam(kpiParam);
                            this.props.loadKpi();
                            this.props.trendChartDataFetch();
                            this.props.pieChartDataFetch();
                            this.props.productsOnPromoTableFetch();
                          }}><span className="tab_label">Product Count</span></NavItem>

                          {/*Code for glyphicon*/}
                          <span className="glyphicon glyphicon-info-sign pull-right"
                                style={{
                                  right: '4px',
                                  fontSize: '15px',
                                  top: '8px',
                                  color: "#00539f",
                                  fontWeight: "bold"
                                }}
                                onClick={() => {
                                  this.setState({promoKPIInfo: true});
                                }}>
                      </span>
                        </Nav>

                      </div>
                      <div className="coverBox">
                        {/* Promo KPI Boxes */}
                        <br/>

                        <div style={{textAlign: 'center'}}>
                          {(() => {
                            if (this.props.promotion.kpi_param == 'kpi_type=value' || this.props.promotion.kpi_param == 'kpi_type=volume' || this.props.promotion.kpi_param == 'kpi_type=profit') {
                              if (this.props.promotion.kpi_data && this.props.promotion.kpiSpinnerSuccess) {
                                return ( <div className="row mainBox">

                                  <div className="col-md-4 col-sm-12 col-xs-12"
                                       style={{paddingLeft: '15px', paddingRight: '15px'}}>

                                    <Panel>
                                      <div className="firstCard" style={{height: '150px'}}>
                                        <h3 className="pageModuleSubTitle" style={{marginTop: "-1px"}}>
                                          Total {this.props.promotion.kpi_data.kpi_name} </h3>
                                        <div className="row">
                                          <div className="col-md-6 col-xs-6">
                                            <h3 style={{
                                              padding: "0px",
                                              margin: "0px"
                                            }}>{this.props.promotion.kpi_data.total.total}</h3>
                                          </div>
                                          <div className="col-md-6 col-xs-6">
                                            <h3 style={{padding: "0px", margin: "0px"}}>
                                              LFL TY&nbsp; {this.props.promotion.kpi_data.total.total_lfl} </h3>
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div className="panel-body cardPanel">
                                            {(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return (
                                                  <div className="col-md-4 col-xs-4 ">
                                                    <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.total.var_total_wow)}
                                      style={{marginTop: '20px'}}>
                                    </span>{(this.props.promotion.kpi_data.total.var_total_wow) + '%'}
                                                    </h4>
                                                    <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                  </div>
                                                )
                                              }

                                            })()}


                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                                )
                                              }
                                              else {
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                              <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.total.var_total_yoy)}
                                      style={{marginTop: '20px'}}>
                                    </span>{(this.props.promotion.kpi_data.total.var_total_yoy) + '%'}
                                              </h4>
                                              <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                            </div>
                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                                )
                                              }
                                              else {
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                              <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.total.var_total_lfl)}
                                      style={{marginTop: '20px'}}>
                                    </span>{(this.props.promotion.kpi_data.total.var_total_lfl) + '%'}
                                              </h4>
                                              <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Panel>

                                  </div>

                                  <div className="col-md-4 col-sm-12 col-xs-12"
                                       style={{
                                         paddingLeft: '15px',
                                         paddingRight: '15px',
                                         height: '30px'
                                       }}>
                                    <Panel>
                                      <div className="secondCard" style={{height: "150px"}}>
                                        <h3 className="pageModuleSubTitle" style={{marginTop: "-1px"}}>
                                          Promo {this.props.promotion.kpi_data.kpi_name} </h3>

                                        <div className="row">
                                          <div className="col-md-6 col-xs-6">

                                            <h3 style={{
                                              padding: "0px",
                                              margin: "0px"
                                            }}> {this.props.promotion.kpi_data.promo.promo} </h3>
                                          </div>
                                          <div className="col-md-6 col-xs-6">
                                            <h3 style={{padding: "0px", margin: "0px"}}>
                                              LFL TY&nbsp;{this.props.promotion.kpi_data.promo.promo_lfl} </h3>
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div className="panel-body cardPanel">

                                            {(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                {/*console.log("week param is current week");*/
                                                }
                                                return (
                                                  <div className="col-md-4 col-xs-4 ">
                                                    <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.promo.var_promo_wow)}
                                      style={{marginTop: '20px'}}></span>
                                                      {(this.props.promotion.kpi_data.promo.var_promo_wow) + '%'}
                                                    </h4>
                                                    <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                  </div>
                                                )
                                              }


                                            })()}


                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                {/*console.log("week param is current week");*/
                                                }
                                                return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                                )
                                              }
                                              else {
                                                {/*console.log("week param is not current week");*/
                                                }
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                              <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.promo.var_promo_yoy)}
                                      style={{marginTop: '20px'}}></span>
                                                {(this.props.promotion.kpi_data.promo.var_promo_yoy) + '%'}
                                              </h4>
                                              <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                            </div>
                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                                )
                                              }
                                              else {
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                              <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.promo.var_promo_lfl)}
                                      style={{marginTop: '20px'}}></span>
                                                {(this.props.promotion.kpi_data.promo.var_promo_lfl) + '%'}
                                              </h4>
                                              <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Panel>
                                  </div>

                                  <div className="col-md-4 col-sm-12 col-xs-12"
                                       style={{paddingLeft: '15px', paddingRight: '15px'}}>
                                    <Panel>
                                      <div className="thirdCard" style={{height: "150px"}}>
                                        <h3 className="pageModuleSubTitle" style={{marginTop: "-1px"}}> Non
                                          Promo {this.props.promotion.kpi_data.kpi_name} </h3>

                                        <div className="row">
                                          <div className="col-md-6 col-xs-6">

                                            <h3 style={{
                                              padding: "0px",
                                              margin: "0px"
                                            }}>  {this.props.promotion.kpi_data.nonpromo.nonpromo} </h3>
                                          </div>
                                          <div className="col-md-6 col-xs-6">
                                            <h3 style={{padding: "0px", margin: "0px"}}>
                                              LFL TY&nbsp; {this.props.promotion.kpi_data.nonpromo.nonpromo_lfl} </h3>
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div className="panel-body cardPanel">

                                            {(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return (
                                                  <div className="col-md-4 col-xs-4 ">
                                                    <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.nonpromo.var_nonpromo_wow)}
                                      style={{marginTop: '20px'}}></span>
                                                      {(this.props.promotion.kpi_data.nonpromo.var_nonpromo_wow) + '%'}
                                                    </h4>
                                                    <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                  </div>
                                                )
                                              }


                                            })()}


                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                                )
                                              }
                                              else {
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                              <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.nonpromo.var_nonpromo_yoy)}
                                      style={{marginTop: '20px'}}></span>
                                                {(this.props.promotion.kpi_data.nonpromo.var_nonpromo_yoy) + '%'}
                                              </h4>
                                              <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                            </div>
                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                                )
                                              }
                                              else {
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                              <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.nonpromo.var_nonpromo_lfl)}
                                      style={{marginTop: '20px'}}></span>
                                                {(this.props.promotion.kpi_data.nonpromo.var_nonpromo_lfl) + '%'}
                                              </h4>
                                              <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Panel>
                                  </div>

                                </div>)
                              } else {
                                <div className="text-center"><Spinner />Please Wait a Moment....!</div>
                              }
                            }

                            else if (this.props.promotion.kpi_param == 'kpi_type=products_count') {
                              return (
                                <div className="row mainBox">
                                  <div className="col-md-4 col-sm-12 col-xs-12"
                                       style={{paddingLeft: '15px', paddingRight: '15px'}}>
                                    <Panel>
                                      <div className="firstCard" style={{height: '150px'}}>
                                        <h3 className="pageModuleSubTitle" style={{marginTop: "-1px"}}>
                                          Total {this.props.promotion.kpi_data.kpi_name} </h3>
                                        <div className="row">
                                          <div className="col-md-12 col-xs-12">
                                            <h3 style={{
                                              padding: "0px",
                                              margin: "0px"
                                            }}>{this.props.promotion.kpi_data.total.total}</h3>
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div className="panel-body cardPanel">
                                            {(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return (
                                                  <div className="col-md-6 col-xs-6 ">
                                                    <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.total.var_total_wow)}
                                      style={{marginTop: '20px'}}>
                                    </span>{(this.props.promotion.kpi_data.total.var_total_wow) + '%'}
                                                    </h4>
                                                    <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                  </div>
                                                )
                                              }

                                            })()}


                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return ("col-md-6 col-xs-12 col-sm-6 col-lg-6"

                                                )
                                              }
                                              else {
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                              <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.total.var_total_yoy)}
                                      style={{marginTop: '20px'}}>
                                    </span>{(this.props.promotion.kpi_data.total.var_total_yoy) + '%'}
                                              </h4>
                                              <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                            </div>
                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return ("col-md-6 col-xs-12 col-sm-4 col-lg-4"

                                                )
                                              }
                                              else {
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Panel>

                                  </div>

                                  <div className="col-md-4 col-sm-12 col-xs-12"
                                       style={{
                                         backgroundColor: "#fafafa",
                                         paddingLeft: '15px',
                                         paddingRight: '15px',
                                         height: '30px'
                                       }}>

                                    <Panel>
                                      <div className="secondCard" style={{height: "150px"}}>
                                        <h3 className="pageModuleSubTitle" style={{marginTop: "-1px"}}>
                                          Promo {this.props.promotion.kpi_data.kpi_name} </h3>

                                        <div className="row">
                                          <div className="col-md-12 col-xs-12">

                                            <h3 style={{
                                              padding: "0px",
                                              margin: "0px"
                                            }}> {this.props.promotion.kpi_data.promo.promo} </h3>
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div className="panel-body cardPanel">

                                            {(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                {/*console.log("week param is current week");*/
                                                }
                                                return (
                                                  <div className="col-md-6 col-xs-6 ">
                                                    <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.promo.var_promo_wow)}
                                      style={{marginTop: '20px'}}></span>
                                                      {(this.props.promotion.kpi_data.promo.var_promo_wow) + '%'}
                                                    </h4>
                                                    <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                  </div>
                                                )
                                              }


                                            })()}


                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                {/*console.log("week param is current week");*/
                                                }
                                                return ("col-md-6 col-xs-12 col-sm-6 col-lg-6"

                                                )
                                              }
                                              else {
                                                {/*console.log("week param is not current week");*/
                                                }
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                              <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.promo.var_promo_yoy)}
                                      style={{marginTop: '20px'}}></span>
                                                {(this.props.promotion.kpi_data.promo.var_promo_yoy) + '%'}
                                              </h4>
                                              <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                            </div>
                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                                )
                                              }
                                              else {
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                              {/*<h4>*/}
                                              {/*<span*/}
                                              {/*className={glyphiconFormatter(this.props.promotion.kpi_data.promo.var_promo_lfl)}*/}
                                              {/*style={{marginTop: '20px'}}></span>*/}
                                              {/*{(this.props.promotion.kpi_data.promo.var_promo_lfl) + '%'}*/}
                                              {/*</h4>*/}
                                              {/*<h5 className="kpiSubTitle"><b>LFL</b></h5>*/}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Panel>
                                  </div>

                                  <div className="col-md-4 col-sm-12 col-xs-12"
                                       style={{backgroundColor: "#fafafa", paddingLeft: '15px', paddingRight: '15px'}}>
                                    <Panel>
                                      <div className="thirdCard" style={{height: "150px"}}>
                                        <h3 className="pageModuleSubTitle" style={{marginTop: "-1px"}}> Non
                                          Promo {this.props.promotion.kpi_data.kpi_name} </h3>

                                        <div className="row">
                                          <div className="col-md-12 col-xs-12">

                                            <h3 style={{
                                              padding: "0px",
                                              margin: "0px"
                                            }}>  {this.props.promotion.kpi_data.nonpromo.nonpromo} </h3>
                                          </div>
                                          {/*<div className="col-md-6 col-xs-6">*/}
                                          {/*<h3 style={{padding: "0px", margin: "0px"}}>*/}
                                          {/*LFL TY&#58;&nbsp; {this.props.promotion.kpi_data.nonpromo.nonpromo_lfl} </h3>*/}
                                          {/*</div>*/}
                                        </div>

                                        <div className="row">
                                          <div className="panel-body cardPanel">

                                            {(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return (
                                                  <div className="col-md-4 col-xs-4 ">
                                                    <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.nonpromo.var_nonpromo_wow)}
                                      style={{marginTop: '20px'}}></span>
                                                      {(this.props.promotion.kpi_data.nonpromo.var_nonpromo_wow) + '%'}
                                                    </h4>
                                                    <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                  </div>
                                                )
                                              }


                                            })()}


                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                                )
                                              }
                                              else {
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                              <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.nonpromo.var_nonpromo_yoy)}
                                      style={{marginTop: '20px'}}></span>
                                                {(this.props.promotion.kpi_data.nonpromo.var_nonpromo_yoy) + '%'}
                                              </h4>
                                              <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                            </div>
                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                                )
                                              }
                                              else {
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                              {/*<h4>*/}
                                              {/*<span*/}
                                              {/*className={glyphiconFormatter(this.props.promotion.kpi_data.nonpromo.var_nonpromo_lfl)}*/}
                                              {/*style={{marginTop: '20px'}}></span>*/}
                                              {/*{(this.props.promotion.kpi_data.nonpromo.var_nonpromo_lfl) + '%'}*/}
                                              {/*</h4>*/}
                                              {/*<h5 className="kpiSubTitle"><b>LFL</b></h5>*/}
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
                              return (
                                <div className="row mainBox">


                                  <div className="col-md-4 col-sm-12 col-xs-12"
                                       style={{
                                         backgroundColor: "#fafafa",
                                         paddingLeft: '15px',
                                         paddingRight: '15px'
                                       }}></div>
                                  <div className="col-md-4 col-sm-12 col-xs-12"
                                       style={{backgroundColor: "#fafafa", paddingLeft: '15px', paddingRight: '15px'}}>

                                    <Panel>
                                      <div className="firstCard" style={{height: '150px'}}>
                                        <h3 className="pageModuleSubTitle" style={{marginTop: "-1px"}}>
                                          Total {this.props.promotion.kpi_data.kpi_name} </h3>
                                        <div className="row">
                                          <div className="col-md-6 col-xs-6">
                                            <h3 style={{
                                              padding: "0px",
                                              margin: "0px"
                                            }}>{this.props.promotion.kpi_data.total.total}</h3>
                                          </div>
                                          <div className="col-md-6 col-xs-6">
                                            <h3 style={{padding: "0px", margin: "0px"}}>
                                              LFL TY&#58;&nbsp; {this.props.promotion.kpi_data.total.total_lfl} </h3>
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div className="panel-body cardPanel">
                                            {(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return (
                                                  <div className="col-md-4 col-xs-4 ">
                                                    <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.total.var_total_wow)}
                                      style={{marginTop: '20px'}}>
                                    </span>{(this.props.promotion.kpi_data.total.var_total_wow) + '%'}
                                                    </h4>
                                                    <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                                  </div>
                                                )
                                              }

                                            })()}


                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                                )
                                              }
                                              else {
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                              <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.total.var_total_yoy)}
                                      style={{marginTop: '20px'}}>
                                    </span>{(this.props.promotion.kpi_data.total.var_total_yoy) + '%'}
                                              </h4>
                                              <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                            </div>
                                            <div className={(() => {
                                              if (this.props.promotion.week_param == 'week_flag=Current Week') {
                                                return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                                )
                                              }
                                              else {
                                                return (
                                                  "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                                )
                                              }

                                            })()}>
                                              <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.total.var_total_lfl)}
                                      style={{marginTop: '20px'}}>
                                    </span>{(this.props.promotion.kpi_data.total.var_total_lfl) + '%'}
                                              </h4>
                                              <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Panel>
                                  </div>

                                  <div className="col-md-4 col-sm-12 col-xs-12"
                                       style={{
                                         backgroundColor: "#fafafa",
                                         paddingLeft: '15px',
                                         paddingRight: '15px'
                                       }}></div>
                                </div>
                              )
                            }
                          })()}
                        </div>

                        {/*<div className="col-md-12 col-sm-12">*/}
                        {/*<button className="btn btn-success" onClick={() => {*/}
                        {/*this.setState({promoPartTabInfo: true})*/}
                        {/*this.props.loadPromoPart();*/}
                        {/*}}>Promotion Participation*/}
                        {/*</button>*/}
                        {/*</div>*/}

                        {/*MODAL for showing Promotion Participation  */}
                        <Modal show={this.state.promoPartTabInfo} bsSize="lg"
                               aria-labelledby="contained-modal-title-lg"
                               dialogClassName={'xlModal'}>

                          <Modal.Header>
                            <Modal.Title id="contained-modal-title-sm"
                                         style={{textAlign: 'center', fontSize: '14px'}}><span
                              style={{textAlign: 'center', fontSize: '14px'}}><b>Promotion Participation</b><span
                              style={{textAlign: 'right', float: 'right'}}
                              onClick={() => this.setState({promoPartTabInfo: false})}><b>X</b></span></span>
                              <div style={{textAlign: 'center'}}>
                                <div style={{textAlign: 'right'}}>
                                </div>
                              </div>
                            </Modal.Title>

                          </Modal.Header>
                          <Modal.Body style={{fontSize: '14px'}}>

                            {/*Showing pie chart and trended chart*/}
                            <div className="row">


                              {/*<div className="mainBox">*/}
                              {/*Left---pie chart*/}
                              <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12"
                                   style={{
                                     minHeight: '540px',
                                     borderRadius: '1px',
                                     border: '1px solid rgb(204, 204, 204)',
                                     float: 'left',
                                     width: '31%',
                                     marginLeft: '1%',
                                     marginTop: '2%',
                                   }}>

                                {(() => {
                                  if (this.props.promotion.promo_part_data) {
                                    return (
                                      <div style={{background: "#f5f5f5"}}>
                                        <div className="col-md-9 col-sm-12 col-xs-12" style={{textAlign: "center"}}>
                                          <h3 className="pageModuleSubTitle"
                                              style={{marginTop: "12px", marginLeft: "40px"}}>
                                            Share by Promo Type</h3>
                                        </div>
                                        <div className="col-md-3 col-sm-12 col-xs-12" style={{marginTop: "8px"}}>
                                          <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight
                                                          style={{
                                                            backgroundColor: "transparent",
                                                            borderColor: "transparent",
                                                            color: "#00539f",
                                                            marginLeft: "50px"
                                                          }} id="dropButtonId">
                                            <MenuItem onClick={() => {
                                              saveImage(document.getElementById('piechart' + '_svg'), "promo_sales_piechart")
                                            }
                                            }>Save As JPEG</MenuItem>
                                            <MenuItem onClick={() => {
                                              saveDataAsCSV(this.props.promotion.promo_part_data.pie_chart, "promo_sales_piechart_data.csv")
                                            }
                                            }>Download CSV</MenuItem>
                                          </DropdownButton>
                                        </div>
                                        <PieChart data={this.props.promotion.promo_part_data.pie_chart}
                                                  id="piechart1"/>
                                      </div>
                                    );
                                  }
                                  else {
                                    return (

                                      <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                                    );
                                  }
                                })()}

                              </div>

                              {/*Right--- line chart and tabs*/}
                              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12" style={{
                                minHeight: '540px',
                                borderRadius: '1px',
                                border: '1px solid rgb(204, 204, 204)',
                                marginTop: '2%',
                                marginLeft: '1%',
                                paddingLeft: '0px'
                              }}>


                                <div className="col-xs-3" style={{paddingLeft: '0px'}}>
                                  {/*Tabs & export button*/}

                                  {/*Tabs*/}
                                  <span style={{float: "left", marginLeft: "3%"}}>

                                {(() => {
                                  if (this.props.promotion.promo_part_data) {
                                    return (


                                      <Nav bsStyle="tabs" activeKey={this.state.activeKey4} onSelect={
                                        this.handleSelect}
                                           className="tabsCustomList2 secondaryTabs" style={{margin: "0px"}}>


                                        {this.props.promotion.promo_part_data.labels.map((obj, index) => {
                                          let tab = (index + 1).toString();
                                          return (
                                            <NavItem className="tabsCustomList2"
                                                     eventKey={tab}
                                                     onClick={() => {
                                                       let promoTypeParam = "";
                                                       if (obj !== 'Total') {
                                                         promoTypeParam = "promo_type=" + obj;
                                                       }
                                                       console.log("-=-=-=-=" + (index + 1).toString())
                                                       this.setState({activeKey4: (index + 1).toString()});
                                                       {/*this.props.trendChartSpinner(0);*/
                                                       }
                                                       {/*this.props.saveTrendChartTabParam(promoTypeParam);*/
                                                       }
                                                       this.props.loadPromoPart();
                                                       {/*this.props.trendChartDataFetch();*/
                                                       }
                                                     }}>
                                              <span className="tab_label">{obj}</span></NavItem>)

                                        })}
                                      </Nav>
                                    )
                                  }
                                })()}
                                 </span>


                                </div>

                                <div className="col-xs-9">
                                  <div className="col-md-9 col-sm-12 col-xs-12" style={{textAlign: "center"}}>
                                    <h3 className="pageModuleSubTitle" style={{marginTop: "12px"}}>Trended
                                      Performance</h3>
                                  </div>
                                  {/*Line chart*/}
                                  <div className="row">

                                <span style={{float: "right"}}>
                          <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                            color: "#00539f"
                          }} id="dropButtonId">
                            <MenuItem onClick={() => {
                              saveImage(document.getElementById('sampleSvg'), "promo_sales_trend_multilineChart")
                            }
                            }>Save As JPEG</MenuItem>
                            <MenuItem onClick={() => {
                              saveDataAsCSV(this.props.promotion.promo_part_data.trend, "promo_sales_trend_multilineChart_data.csv")
                            }
                            }>Download CSV</MenuItem>
                          </DropdownButton>
                        </span>
                                  </div>

                                  {(() => {
                                    if (this.props.promotion.promo_part_data) {
                                      console.log("--------------------", this.props.promotion.promo_part_data)
                                      let label_ty = this.props.promotion.promo_part_data.metric + " TY";
                                      let label_ly = this.props.promotion.promo_part_data.metric + " LY";
                                      return (

                                        <MultilinePromo data={this.props.promotion.promo_part_data.trend}
                                                        id="linechart2" label_ty={label_ty}
                                                        label_ly={label_ly} xaxis_title="Tesco Week"
                                                        no_pref={this.props.promotion.promo_part_data.no_pref}
                                                        no_suffix=''
                                                        yaxis_title={this.props.promotion.promo_part_data.metric}/>
                                      );
                                    }
                                    else {
                                      return (

                                        <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                                      );
                                    }
                                  })()}
                                </div>

                              </div>
                              {/*</div>*/}

                            </div>

                          </Modal.Body>
                        </Modal>

                        {/*Row for pie chart and graph*/}
                        <div className="row ">


                          <div className="mainBox" style={{
                            marginLeft: '2%',
                            marginRight: '2%',
                            marginTop: '1%',
                          }}>
                            {/*Left---pie chart*/}
                            <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12"
                                 style={{
                                   minHeight: '525px',
                                   borderRadius: '1px',
                                   border: '1px solid rgb(204, 204, 204)',
                                   float: 'left',
                                   width: '35%',
                                   marginLeft: '2%',
                                   marginTop: '2%',
                                   background: 'white'
                                 }}>

                              {(() => {
                                if (this.props.promotion.pieChartData && this.props.promotion.pieChartSpinnerSuccess) {
                                  return (
                                    <div style={{background: "#f5f5f5"}}>
                                      <div className="col-md-9 col-sm-12 col-xs-12" style={{textAlign: "center"}}>
                                        <h3 className="pageModuleSubTitle"
                                            style={{marginTop: "12px", marginLeft: "40px"}}>Share
                                          by Promo Type</h3>
                                      </div>
                                      <div className="col-md-3 col-sm-12 col-xs-12" style={{marginTop: "8px"}}>
                                        <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight
                                                        style={{
                                                          backgroundColor: "transparent",
                                                          borderColor: "transparent",
                                                          color: "#00539f",
                                                          marginLeft: "50px"
                                                        }} id="dropButtonId">
                                          <MenuItem onClick={() => {
                                            saveImage(document.getElementById('piechart' + '_svg'), "promo_sales_piechart")
                                          }
                                          }>Save As JPEG</MenuItem>
                                          <MenuItem onClick={() => {
                                            saveDataAsCSV(this.props.promotion.sales_data.promo_sales.pie_chart, "promo_sales_piechart_data.csv")
                                          }
                                          }>Download CSV</MenuItem>
                                        </DropdownButton>
                                      </div>
                                      <PieChart data={this.props.promotion.pieChartData.piechart}
                                                id="piechart"/>
                                    </div>
                                  );
                                }
                                else {
                                  return (

                                    <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                                  );
                                }
                              })()}

                            </div>

                            {/*Right--- line chart and tabs*/}
                            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12" style={{
                              minHeight: '525px',
                              borderRadius: '1px',
                              border: '1px solid rgb(204, 204, 204)',
                              marginTop: '2%',
                              marginLeft: '1%',
                              paddingLeft: '0px',
                              width: '60%',
                              background: 'white'
                            }}>


                              <div className="col-xs-3" style={{paddingLeft: '0px'}}>
                                {/*Tabs & export button*/}


                                {/*Tabs*/}
                                <span style={{float: "left"}}>

                                {(() => {
                                  if (this.props.promotion.pieChartData) {
                                    return (


                                      <Nav bsStyle="tabs" activeKey={this.state.activeKey4} onSelect={
                                        this.handleSelect}
                                           className="tabsCustomList2 secondaryTabs" style={{margin: "0px"}}>


                                        {this.props.promotion.pieChartData.labels.map((obj, index) => {
                                          let tab = (index + 1).toString();
                                          return (
                                            <NavItem className="tabsCustomList2"
                                                     eventKey={tab}
                                                     onClick={() => {
                                                       let promoTypeParam = "";
                                                       if (obj !== 'Total') {
                                                         promoTypeParam = "promo_type=" + obj;
                                                       }
                                                       console.log("-=-=-=-=" + (index + 1).toString())
                                                       this.setState({activeKey4: (index + 1).toString()});
                                                       this.props.trendChartSpinner(0);
                                                       this.props.saveTrendChartTabParam(promoTypeParam);
                                                       this.props.trendChartDataFetch();
                                                     }}>
                                              <span className="tab_label">{obj}</span></NavItem>)

                                        })}
                                      </Nav>
                                    )
                                  }
                                })()}
                                 </span>
                              </div>

                              <div className="col-xs-9">
                                <div className="col-md-9 col-sm-12 col-xs-12" style={{textAlign: "center"}}>
                                  <h3 className="pageModuleSubTitle" style={{marginTop: "12px"}}>Trended
                                    Performance</h3>
                                </div>
                                {/*Line chart*/}
                                <div className="row">
                                <span style={{float: "right"}}>
                          <DropdownButton title="" className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                            color: "#00539f"
                          }} id="dropButtonId">
                            <MenuItem onClick={() => {
                              saveImage(document.getElementById('sampleSvg'), "promo_sales_trend_multilineChart")
                            }
                            }>Save As JPEG</MenuItem>
                            <MenuItem onClick={() => {
                              saveDataAsCSV(this.props.promotion.trendChartData.trend, "promo_sales_trend_multilineChart_data.csv")
                            }
                            }>Download CSV</MenuItem>
                          </DropdownButton>
                        </span>
                                </div>

                                {(() => {
                                  if (this.props.promotion.kpi_param === 'kpi_type=value' || this.props.promotion.kpi_param === 'kpi_type=volume') {
                                    return (
                                      <div className="row text-center" style={{fontSize: '16px'}}>
                                        <div className="col-xs-4">{(() => {
                                          if (this.props.promotion.lineChartType === 'absolute') {
                                            return (
                                              <b style={{color: '#3a7fc0'}}>Absolute</b>
                                            )
                                          }
                                          return (
                                            <div>Absolute</div>
                                          )
                                        })()}</div>
                                        <div className="col-xs-4">
                                          <Toggle
                                            label=""
                                            style={{margin: '0 auto', display: 'block'}}
                                            thumbStyle={styles.thumbOff}
                                            trackStyle={styles.trackOff}
                                            thumbSwitchedStyle={styles.thumbSwitched}
                                            trackSwitchedStyle={styles.trackSwitched}
                                            labelStyle={styles.labelStyle}
                                            onToggle={() => {
                                              this.props.trendChartSpinner(0);
                                              this.props.onSaveLineChartType(this.props.promotion.lineChartType === 'absolute' ? 'participation' : 'absolute')
                                              this.props.trendChartDataFetch()
                                            }}
                                          />
                                        </div>
                                        <div className="col-xs-4">{(() => {
                                          if (this.props.promotion.lineChartType === 'participation') {
                                            return (
                                              <b style={{color: '#3a7fc0'}}>Participation</b>
                                            )
                                          }
                                          return (
                                            <div>Participation</div>
                                          )
                                        })()}</div>
                                      </div>
                                    )
                                  }
                                })()}


                                {(() => {
                                  if (this.props.promotion.trendChartData && this.props.promotion.trendChartSpinnerSuccess == 1) {
                                    console.log("--------------------", this.props.promotion.trendChartData)
                                    let label_ty = this.props.promotion.trendChartData.metric + " TY";
                                    let label_ly = this.props.promotion.trendChartData.metric + " LY";
                                    return (

                                      <MultilinePromo data={this.props.promotion.trendChartData.trend}
                                                      id="linechart" label_ty={label_ty}
                                                      label_ly={label_ly} xaxis_title="Tesco Week"
                                                      no_pref={this.props.promotion.trendChartData.no_pref}
                                                      no_suffix={this.props.promotion.trendChartData.no_suffix}
                                                      yaxis_title={this.props.promotion.trendChartData.metric}/>
                                    );
                                  }
                                  else {
                                    return (

                                      <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                                    );
                                  }
                                })()}
                              </div>

                            </div>
                            {/*</div>*/}
                            {/*{(() => {*/}
                            {/*if (this.props.promotion.kpi_param === 'kpi_type=value' || this.props.promotion.kpi_param === 'kpi_type=volume') {*/}
                            {/*console.log("in promotion participation");*/}
                            {/*return (*/}
                            {/*<div className="text-right">*/}
                            {/*<button className="btn btn-primary" onClick={() => {*/}
                            {/*this.setState({promoPartTabInfo: true})*/}
                            {/*this.props.loadPromoPart();*/}
                            {/*}}>Promotion Participation*/}
                            {/*</button>*/}
                            {/*</div>*/}
                            {/*)*/}
                            {/*}*/}
                            {/*else {*/}
                            {/*return (<div></div>)*/}
                            {/*}*/}
                            {/*})()}*/}

                          </div>

                        </div>

                        {/*</Panel>*/}

                        {/*top 25 rows*/}
                        <div className="row">
                          <div className="col-md-12 col-sm-12">
                            <h2 className="pageModuleMainTitle">Products On Promotion
                              <span className="glyphicon glyphicon-info-sign pull-right"
                                    style={{right: '4px', fontSize: '15px', top: '8px'}}
                                    onClick={() => {
                                      this.setState({promoTabInfo: true});
                                    }}>

                    </span>
                            </h2></div>
                          <panel>

                            {(() => {
                              if (this.props.promotion.productsOnPromotion && this.props.promotion.productsTableSpinnerSuccess) {
                                return (
                                  <div className="promoTable">
                                    <BootstrapTable className="promoTable"
                                                    selectRow={selectRowProp}
                                                    data={this.props.promotion.productsOnPromotion.table_data}
                                                    options={options}
                                                    striped={true}
                                                    hover
                                                    condensed
                                                    exportCSV={true}
                                                    search={true}
                                                    pagination={true}
                                    >
                                      <TableHeaderColumn headerAlign={"center"} dataAlign={"left"} width="35%"
                                                         dataField='Product Description'
                                                         isKey>Product
                                        Description</TableHeaderColumn>
                                      <TableHeaderColumn headerAlign={"center"} dataAlign={"left"}
                                                         dataField='brand_name'
                                                         dataSort={true}>Brand</TableHeaderColumn>
                                      <TableHeaderColumn headerAlign={"center"} dataAlign={"center"}
                                                         dataField='Promo TY'
                                                         dataSort={true}
                                                         dataFormat={formatMetric}>Promo {this.props.promotion.productsOnPromotion.col_name}
                                        TY</TableHeaderColumn>
                                      <TableHeaderColumn headerAlign={"center"} dataAlign={"center"}
                                                         dataField='Promo LY'
                                                         dataSort={true}
                                                         dataFormat={formatMetric}>Promo {this.props.promotion.productsOnPromotion.col_name}
                                        LY</TableHeaderColumn>
                                      <TableHeaderColumn headerAlign={"center"} dataAlign={"center"} dataField='lfl_var'
                                                         dataSort={true}
                                                         dataFormat={ triangleColumnFormatter }>LFL TY
                                        Variation</TableHeaderColumn>
                                      <TableHeaderColumn headerAlign={"center"} dataAlign={"center"}
                                                         dataField='promoted_ly_ind'>Promoted Last
                                        Year?</TableHeaderColumn>
                                      <TableHeaderColumn headerAlign={"center"} dataAlign={"center"}
                                                         dataField='Product Description'
                                                         dataFormat={(f, g) => {
                                                           return <button className="btn btn-primary"
                                                                          onClick={(e, v, x, y) => {
                                                                            console.log('f:', f)
                                                                            console.log('g:', g)
                                                                            console.log('e:', e)
                                                                            console.log('v:', v)
                                                                            console.log('x:', x)
                                                                            console.log('y:', y)
                                                                            this.props.onModalProductName(f);
                                                                            this.props.onModalProductInfo();
                                                                            this.setState({showModal: true})
                                                                          }}>Promo Info.</button>
                                                         }}>&nbsp;</TableHeaderColumn>

                                    </BootstrapTable>
                                    <button
                                      type="button"
                                      style={{float: 'right', fontSize: "14px"}}
                                      className="btn btn-danger"
                                      onClick={() => {
                                        // let objString = '/ranging/delist?';
                                        let objString = '';
                                        let selected = this.state.SelectProducts;
                                        if (selected !== '[]') {
                                          for (let i = 0; i < selected.length; i++) {
                                            objString += 'base_product_number=' + selected[i] + '&'
                                          }
                                          objString = objString.slice(0, objString.length - 1);
                                          console.log(objString);


                                          let domain = "dvcmpweb00001uk.dev.global.tesco.org";
                                          document.cookie = `PreselectionFromNego=1;domain=${domain};path=/;`;
                                          document.cookie = `PreselectionFromNegoData=${objString};domain=${domain};path=/;`;
                                          window.location = 'http://dvcmpweb00001uk.dev.global.tesco.org/ranging/delist/'

                                        } else {
                                          alert("You have not selected any products to delist. Are you sure you want to see the delist impact?")
                                        }
                                      }}
                                    >SEND TO DE-LIST
                                    </button>
                                  </div>
                                )
                              } else {
                                return (

                                  <div className="text-center"><Spinner />Please Wait a Moment....!</div>
                                );
                              }
                            })()}
                          </panel>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )
            }
          })()}


          {/* INFO MODAL */}

          <Modal show={this.state.showModal} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg"
                 dialogClassName={'xlModal'}
                 onHide={() => {
                   this.setState({showModal: false})
                 }}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}>
                <b>Product Promotion Details</b>
                <div style={{textAlign: 'center'}}>
                  <div style={{textAlign: 'right'}}>
                  </div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{fontSize: '14px'}}>
              {(() => {
                if (this.props.promotion.modalProductData) {
                  return (
                    <div className="">

                      <div className="row mainBox">

                        <div className="col-md-4 col-sm-12 col-xs-12"
                             style={{backgroundColor: "#fafafa", paddingLeft: '15px', paddingRight: '15px'}}>

                          <Panel>
                            <div className="firstCard text-center" style={{height: '150px'}}>
                              <h3 className="pageModuleSubTitle" style={{marginTop: "-1px"}}>
                                Total {this.props.promotion.modalProductData.kpi_data.kpi_name} </h3>
                              <div className="row">
                                <div className="col-md-6 col-xs-6">
                                  <h3 style={{
                                    padding: "0px",
                                    margin: "0px"
                                  }}>{this.props.promotion.modalProductData.kpi_data.total.total}</h3>
                                </div>
                                <div className="col-md-6 col-xs-6">
                                  <h3 style={{padding: "0px", margin: "0px"}}>
                                    LFL TY&nbsp; {this.props.promotion.modalProductData.kpi_data.total.total_lfl} </h3>
                                </div>
                              </div>

                              <div className="row">
                                <div className="panel-body cardPanel">
                                  {(() => {
                                    if (this.props.promotion.modalProductData.week_param == 'week_flag=Current Week') {
                                      return (
                                        <div className="col-md-4 col-xs-4 ">
                                          <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.modalProductData.kpi_data.total.var_total_wow)}
                                      style={{marginTop: '20px'}}>
                                    </span>{(this.props.promotion.modalProductData.kpi_data.total.var_total_wow) + '%'}
                                          </h4>
                                          <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                        </div>
                                      )
                                    }

                                  })()}


                                  <div className={(() => {
                                    if (this.props.promotion.modalProductData.week_param == 'week_flag=Current Week') {
                                      return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                      )
                                    }
                                    else {
                                      return (
                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                      )
                                    }

                                  })()}>
                                    <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.modalProductData.kpi_data.total.var_total_yoy)}
                                      style={{marginTop: '20px'}}>
                                    </span>{(this.props.promotion.modalProductData.kpi_data.total.var_total_yoy) + '%'}
                                    </h4>
                                    <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                  </div>
                                  <div className={(() => {
                                    if (this.props.promotion.modalProductData.week_param == 'week_flag=Current Week') {
                                      return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                      )
                                    }
                                    else {
                                      return (
                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                      )
                                    }

                                  })()}>
                                    <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.modalProductData.kpi_data.total.var_total_lfl)}
                                      style={{marginTop: '20px'}}>
                                    </span>{(this.props.promotion.modalProductData.kpi_data.total.var_total_lfl) + '%'}
                                    </h4>
                                    <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Panel>

                        </div>

                        <div className="col-md-4 col-sm-12 col-xs-12"
                             style={{
                               backgroundColor: "#fafafa",
                               paddingLeft: '15px',
                               paddingRight: '15px',
                               height: '30px'
                             }}>
                          <Panel>
                            <div className="secondCard text-center" style={{height: "150px"}}>
                              <h3 className="pageModuleSubTitle" style={{marginTop: "-1px"}}>
                                Promo {this.props.promotion.modalProductData.kpi_data.kpi_name} </h3>

                              <div className="row">
                                <div className="col-md-6 col-xs-6">

                                  <h3 style={{
                                    padding: "0px",
                                    margin: "0px"
                                  }}> {this.props.promotion.modalProductData.kpi_data.promo.promo} </h3>
                                </div>
                                <div className="col-md-6 col-xs-6">
                                  <h3 style={{padding: "0px", margin: "0px"}}>
                                    LFL TY&nbsp; {this.props.promotion.modalProductData.kpi_data.promo.promo_lfl} </h3>
                                </div>
                              </div>

                              <div className="row">
                                <div className="panel-body cardPanel">

                                  {(() => {
                                    if (this.props.promotion.modalProductData.week_param == 'week_flag=Current Week') {
                                      {/*console.log("week param is current week");*/
                                      }
                                      return (
                                        <div className="col-md-4 col-xs-4 ">
                                          <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.modalProductData.kpi_data.promo.var_promo_wow)}
                                      style={{marginTop: '20px'}}></span>
                                            {(this.props.promotion.modalProductData.kpi_data.promo.var_promo_wow) + '%'}
                                          </h4>
                                          <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                        </div>
                                      )
                                    }


                                  })()}


                                  <div className={(() => {
                                    if (this.props.promotion.modalProductData.week_param == 'week_flag=Current Week') {
                                      {/*console.log("week param is current week");*/
                                      }
                                      return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                      )
                                    }
                                    else {
                                      {/*console.log("week param is not current week");*/
                                      }
                                      return (
                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                      )
                                    }

                                  })()}>
                                    <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.modalProductData.kpi_data.promo.var_promo_yoy)}
                                      style={{marginTop: '20px'}}></span>
                                      {(this.props.promotion.modalProductData.kpi_data.promo.var_promo_yoy) + '%'}
                                    </h4>
                                    <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                  </div>
                                  <div className={(() => {
                                    if (this.props.promotion.modalProductData.week_param == 'week_flag=Current Week') {
                                      return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                      )
                                    }
                                    else {
                                      return (
                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                      )
                                    }

                                  })()}>
                                    <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.modalProductData.kpi_data.promo.var_promo_lfl)}
                                      style={{marginTop: '20px'}}></span>
                                      {(this.props.promotion.modalProductData.kpi_data.promo.var_promo_lfl) + '%'}
                                    </h4>
                                    <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Panel>
                        </div>

                        <div className="col-md-4 col-sm-12 col-xs-12"
                             style={{backgroundColor: "#fafafa", paddingLeft: '15px', paddingRight: '15px'}}>
                          <Panel>
                            <div className="thirdCard text-center" style={{height: "150px"}}>
                              <h3 className="pageModuleSubTitle" style={{marginTop: "-1px"}}> Non
                                Promo {this.props.promotion.modalProductData.kpi_data.kpi_name} </h3>

                              <div className="row">
                                <div className="col-md-6 col-xs-6">

                                  <h3 style={{
                                    padding: "0px",
                                    margin: "0px"
                                  }}>  {this.props.promotion.modalProductData.kpi_data.nonpromo.nonpromo} </h3>
                                </div>
                                <div className="col-md-6 col-xs-6">
                                  <h3 style={{padding: "0px", margin: "0px"}}>
                                    LFL
                                    TY&nbsp; {this.props.promotion.modalProductData.kpi_data.nonpromo.nonpromo_lfl} </h3>
                                </div>
                              </div>

                              <div className="row">
                                <div className="panel-body cardPanel">

                                  {(() => {
                                    if (this.props.promotion.modalProductData.week_param == 'week_flag=Current Week') {
                                      return (
                                        <div className="col-md-4 col-xs-4 ">
                                          <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.modalProductData.kpi_data.nonpromo.var_nonpromo_wow)}
                                      style={{marginTop: '20px'}}></span>
                                            {(this.props.promotion.modalProductData.kpi_data.nonpromo.var_nonpromo_wow) + '%'}
                                          </h4>
                                          <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                        </div>
                                      )
                                    }
                                  })()}
                                  <div className={(() => {
                                    if (this.props.promotion.modalProductData.week_param == 'week_flag=Current Week') {
                                      return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                      )
                                    }
                                    else {
                                      return (
                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                      )
                                    }

                                  })()}>
                                    <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.modalProductData.kpi_data.nonpromo.var_nonpromo_yoy)}
                                      style={{marginTop: '20px'}}></span>
                                      {(this.props.promotion.modalProductData.kpi_data.nonpromo.var_nonpromo_yoy) + '%'}
                                    </h4>
                                    <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                  </div>
                                  <div className={(() => {
                                    if (this.props.promotion.modalProductData.week_param == 'week_flag=Current Week') {
                                      return ("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                      )
                                    }
                                    else {
                                      return (
                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                      )
                                    }

                                  })()}>
                                    <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.modalProductData.kpi_data.nonpromo.var_nonpromo_lfl)}
                                      style={{marginTop: '20px'}}></span>
                                      {(this.props.promotion.modalProductData.kpi_data.nonpromo.var_nonpromo_lfl) + '%'}
                                    </h4>
                                    <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Panel>
                        </div>

                      </div>
                      <div className="row">

                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"
                             style={{
                               minHeight: '450px',
                               borderRadius: '1px',
                               border: '1px solid rgb(204, 204, 204)',
                               marginTop: '2%',

                             }}>

                          {(() => {
                            if (this.props.promotion.modalProductData.pieChartData) {
                              return (
                                <div style={{background: "#f5f5f5"}}>
                                  <div className="col-md-9 col-sm-12 col-xs-12" style={{textAlign: "center"}}>
                                    <h3 className="pageModuleSubTitle" style={{marginTop: "12px"}}>Share by
                                      Promo Type</h3>
                                  </div>
                                  <div className="col-md-3 col-sm-12 col-xs-12" style={{marginTop: "8px"}}>
                                    <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight
                                                    style={{
                                                      backgroundColor: "transparent",
                                                      borderColor: "transparent",
                                                      color: "#00539f"
                                                    }} id="dropButtonId">
                                      <MenuItem onClick={() => {
                                        saveImage(document.getElementById('piechart' + '_svg'), "promo_sales_piechart")
                                      }
                                      }>Save As JPEG</MenuItem>
                                      <MenuItem onClick={() => {
                                        saveDataAsCSV(this.props.promotion.modalProductData.sales_data.promo_sales.pie_chart, "promo_sales_piechart_data.csv")
                                      }
                                      }>Download CSV</MenuItem>
                                    </DropdownButton>
                                  </div>
                                  <PieChart data={this.props.promotion.modalProductData.pieChartData.piechart}
                                            id="piechartModal"/>
                                </div>
                              );
                            }
                            else {
                              return (

                                <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                              );
                            }
                          })()}

                        </div>

                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12"
                             style={{
                               minHeight: '450px',
                               borderRadius: '1px',
                               border: '1px solid rgb(204, 204, 204)',
                               marginTop: '2%',
                               paddingLeft: '0px'
                             }}>


                          <div className="col-xs-3" style={{paddingLeft: '0px'}}>
                            {/*Tabs & export button*/}


                            {/*Tabs*/}
                            <span style={{float: "left"}}>

                                {(() => {
                                  if (this.props.promotion.modalProductData.pieChartData) {
                                    return (


                                      <Nav bsStyle="tabs" activeKey={this.state.activeKey4} onSelect={
                                        this.handleSelect}
                                           className="tabsCustomList2 secondaryTabs" style={{margin: "0px"}}>
                                        {this.props.promotion.modalProductData.pieChartData.labels.map((obj, index) => {
                                          let tab = (index + 1).toString();
                                          return (
                                            <NavItem className="tabsCustomList2"
                                                     eventKey={tab}
                                                     onClick={() => {
                                                       let promoTypeParam = "";
                                                       if (obj !== 'Total') {
                                                         promoTypeParam = "promo_type=" + obj;
                                                       }
                                                       console.log("-=-=-=-=" + (index + 1).toString())
                                                       this.setState({activeKey4: (index + 1).toString()});
                                                       this.props.trendChartSpinner(0);
                                                       this.props.modalSaveTrendChartTabParam(promoTypeParam);
                                                       this.props.onModalProductInfo();
                                                     }}>
                                              <span className="tab_label">{obj}</span></NavItem>)

                                        })}
                                      </Nav>
                                    )
                                  }
                                })()}
                                 </span>


                          </div>

                          <div className="col-xs-9">
                            <div className="col-md-9 col-sm-12 col-xs-12" style={{textAlign: "center"}}>
                              <h3 className="pageModuleSubTitle" style={{marginTop: "12px"}}>Trended Performance</h3>
                            </div>
                            {/*Line chart*/}
                            <div className="row">

                                <span style={{float: "right"}}>
                          <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                            color: "#00539f"
                          }} id="dropButtonId">
                            <MenuItem onClick={() => {
                              saveImage(document.getElementById('sampleSvg'), "promo_sales_trend_multilineChart")
                            }
                            }>Save As JPEG</MenuItem>
                            <MenuItem onClick={() => {
                              saveDataAsCSV(this.props.promotion.modalProductData.trendChartData.trend, "promo_sales_trend_multilineChart_data.csv")
                            }
                            }>Download CSV</MenuItem>
                          </DropdownButton>
                        </span>
                            </div>

                            {(() => {
                              if (this.props.promotion.kpi_param === 'kpi_type=value' || this.props.promotion.kpi_param === 'kpi_type=volume') {
                                return (
                                  <div className="row text-center" style={{fontSize: '16px'}}>
                                    <div className="col-xs-4">{(() => {
                                      if (this.props.promotion.modalLineChartType === 'absolute') {
                                        return (
                                          <b style={{color: '#3a7fc0'}}>Absolute</b>
                                        )
                                      }
                                      return (
                                        <div>Absolute</div>
                                      )
                                    })()}</div>
                                    <div className="col-xs-4">
                                      <Toggle
                                        label=""
                                        style={{margin: '0 auto', display: 'block'}}
                                        defaultToggled={this.props.promotion.modalLineChartType === 'participation'}
                                        thumbStyle={styles.thumbOff}
                                        trackStyle={styles.trackOff}
                                        thumbSwitchedStyle={styles.thumbSwitched}
                                        trackSwitchedStyle={styles.trackSwitched}
                                        labelStyle={styles.labelStyle}
                                        onToggle={() => {
                                          this.props.trendChartSpinner(0);
                                          this.props.onSaveModalLineChartType(this.props.promotion.modalLineChartType === 'absolute' ? 'participation' : 'absolute')
                                          this.props.onModalProductInfo()
                                        }}
                                      />
                                    </div>
                                    <div className="col-xs-4">{(() => {
                                      if (this.props.promotion.modalLineChartType === 'participation') {
                                        return (
                                          <b style={{color: '#3a7fc0'}}>Participation</b>
                                        )
                                      }
                                      return (
                                        <div>Participation</div>
                                      )
                                    })()}</div>
                                  </div>
                                )
                              }
                            })()}

                            {(() => {
                              if (this.props.promotion.modalProductData.trendChartData.data_available == 'yes') {
                                console.log("--------------------", this.props.promotion.modalProductData.trendChartData)
                                let label_ty = this.props.promotion.modalProductData.trendChartData.metric + " TY";
                                let label_ly = this.props.promotion.modalProductData.trendChartData.metric + " LY";
                                return (

                                  <MultilinePromo data={this.props.promotion.modalProductData.trendChartData.trend}
                                                  id="linechartModal" label_ty={label_ty}
                                                  label_ly={label_ly} xaxis_title="Tesco Week"
                                                  no_pref={this.props.promotion.modalProductData.trendChartData.no_pref}
                                                  no_suffix={this.props.promotion.modalProductData.trendChartData.no_suffix}
                                                  yaxis_title={this.props.promotion.modalProductData.trendChartData.metric}/>
                                );
                              }
                              else {
                                return (

                                  <div className="text-center"><h4>Selection does not apply to product</h4></div>

                                );
                              }
                            })()}
                          </div>

                        </div>

                      </div>
                    </div>
                  )
                }else{
                  return (
                    <div className="text-center">
                      <h3>Loading...</h3>
                      <Spinner/>
                    </div>
                  )
                }
              })()}
            </Modal.Body>
          </Modal>


          {/*MODAL FOR Promo KPI boxes */}
          <Modal show={this.state.promoKPIInfo} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg"
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
                style={{textAlign: 'right', float: 'right'}}
                onClick={() => this.setState({promoKPIInfo: false})}><b>X</b></span></span>
                <div style={{textAlign: 'center'}}>
                  <div style={{textAlign: 'right'}}>
                  </div>
                </div>
              </Modal.Title>

            </Modal.Header>
            <Modal.Body style={{fontSize: '14px'}}>
              <list>
                <ul> Promo Sales: The total sales value for all the products on promotion</ul>
                <ul> Non Promo Sales: The total sales value for all the products off promotion</ul>
                <ul> Promo Volume: The total volume for all the products on promotion</ul>
                <ul> Non Promo Volume: The total volume for all the products off promotion</ul>
                <ul> Promo sales variation YoY: The variation of a given measure of promo sales for a set time period
                  this year versus the equivalent time period last year (week).
                </ul>
                <ul> Non Promo sales variation YoY: The variation of a given measure of non promo sales for a set time
                  period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Promo volume variation YoY: The variation of a given measure of promo volume for a set time
                  period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Non Promo volume variation YoY: The variation of a given measure of non promo volume for a set
                  time period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Promo sales variation LFL TY: The variation of a given measure of promo LFL TY sales for a set time
                  period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Non Promo sales variation LFL TY: The variation of a given measure of non promo LFL TY sales for a
                  set
                  time period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Promo volume variation LFL TY: The variation of a given measure of promo LFL TY volume for a set
                  time
                  period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Non Promo volume variation LFL TY: The variation of a given measure of non promo LFL TY volume for
                  a
                  set time period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Number of products on promotion: Count of products flagged as promotion</ul>

              </list>

            </Modal.Body>
          </Modal>

          {/*MODAL FOR Sales Charts */}
          <Modal show={this.state.promoSalesInfo} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg"
          >
            <Modal.Header>

              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
                style={{textAlign: 'right', float: 'right'}}
                onClick={() => this.setState({promoSalesInfo: false})}><b>X</b></span></span>
                <div style={{textAlign: 'center'}}>
                  <div style={{textAlign: 'right'}}>
                  </div>
                </div>
              </Modal.Title>

            </Modal.Header>
            <Modal.Body style={{fontSize: '14px'}}>
              <list>
                <ul> Promo Sales: The total sales value for all the products on promotion</ul>
                <ul> Non Promo Sales: The total sales value for all the products off promotion</ul>
                <ul> Promo Volume: The total volume for all the products on promotion</ul>
                <ul> Non Promo Volume: The total volume for all the products off promotion</ul>

              </list>

            </Modal.Body>
          </Modal>

          {/*MODAL FOR Giveaway Charts */}
          <Modal show={this.state.promoGiveawayInfo} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg"
          >
            <Modal.Header>

              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
                style={{textAlign: 'right', float: 'right'}}
                onClick={() => this.setState({promoGiveawayInfo: false})}><b>X</b></span></span>
                <div style={{textAlign: 'center'}}>
                  <div style={{textAlign: 'right'}}>
                  </div>
                </div>
              </Modal.Title>

            </Modal.Header>
            <Modal.Body style={{fontSize: '14px'}}>
              <list>
                <ul> Promo giveaway: The total discount (giveaway) for all products sold on promotion</ul>
              </list>

            </Modal.Body>
          </Modal>

          {/*MODAL FOR Promo products Charts */}
          <Modal show={this.state.promoProdInfo} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg"
          >
            <Modal.Header>

              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
                style={{textAlign: 'right', float: 'right'}}
                onClick={() => this.setState({promoProdInfo: false})}><b>X</b></span></span>
                <div style={{textAlign: 'center'}}>
                  <div style={{textAlign: 'right'}}>
                  </div>
                </div>
              </Modal.Title>

            </Modal.Header>
            <Modal.Body style={{fontSize: '14px'}}>
              <list>
                <ul> Promo Sales: The total sales value for all the products on promotion</ul>
                <ul> Non Promo Sales: The total sales value for all the products off promotion</ul>
                <ul> Promo Volume: The total volume for all the products on promotion</ul>
                <ul> Non Promo Volume: The total volume for all the products off promotion</ul>
                <ul> Promo sales variation YoY: The variation of a given measure of promo sales for a set time period
                  this year versus the equivalent time period last year (week).
                </ul>
                <ul> Non Promo sales variation YoY: The variation of a given measure of non promo sales for a set time
                  period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Promo volume variation YoY: The variation of a given measure of promo volume for a set time
                  period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Non Promo volume variation YoY: The variation of a given measure of non promo volume for a set
                  time period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Promo sales variation LFL TY: The variation of a given measure of promo LFL TY sales for a set time
                  period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Non Promo sales variation LFL TY: The variation of a given measure of non promo LFL TY sales for a
                  set
                  time period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Promo volume variation LFL TY: The variation of a given measure of promo LFL TY volume for a set
                  time
                  period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Non Promo volume variation LFL TY: The variation of a given measure of non promo LFL TY volume for
                  a
                  set time period this year versus the equivalent time period last year (week).
                </ul>
                <ul> Number of products on promotion: Count of products flagged as promotion</ul>

              </list>

            </Modal.Body>
          </Modal>

          {/*MODAL FOR Participation Charts */}
          <Modal show={this.state.promoPartInfo} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg"
          >
            <Modal.Header>

              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
                style={{textAlign: 'right', float: 'right'}}
                onClick={() => this.setState({promoPartInfo: false})}><b>X</b></span></span>
                <div style={{textAlign: 'center'}}>
                  <div style={{textAlign: 'right'}}>
                  </div>
                </div>
              </Modal.Title>

            </Modal.Header>
            <Modal.Body style={{fontSize: '14px'}}>
              <list>
                <ul> Promo participation: The proportion of volume that was sold due to promotions</ul>
              </list>

            </Modal.Body>
          </Modal>

          {/*MODAL FOR Promo Table */}
          <Modal show={this.state.promoTabInfo} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg"
          >
            <Modal.Header>

              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
                style={{textAlign: 'right', float: 'right'}}
                onClick={() => this.setState({promoTabInfo: false})}><b>X</b></span></span>
                <div style={{textAlign: 'center'}}>
                  <div style={{textAlign: 'right'}}>
                  </div>
                </div>
              </Modal.Title>

            </Modal.Header>
            <Modal.Body style={{fontSize: '14px'}}>
              <list>
                <ul> This table helps you to identify the top selling products on promotion</ul>

              </list>

            </Modal.Body>
          </Modal>


        </div>
      </div>
      // </div>
    );
  }
}

Promotion.propTypes = {};

const mapStateToProps = createStructuredSelector({
  promotion: makeSelectPromotion(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSaveWeekParam: (e) => dispatch(SaveWeekParam(e)),

    onModalProductName: (e) => dispatch(modalProductName(e)),
    onModalProductInfo: (e) => dispatch(modalProductInfo(e)),
    onModalProductInfoSuccess: (e) => dispatch(modalProductInfoSuccess(e)),

    // onSaveStoreParam: (e) => dispatch(SaveStoreParam(e)),
    onSaveKPIParam: (e) => dispatch(SaveKPIParam(e)),
    loadKpi: (e) => dispatch(PromoKpiData(e)),
    loadSales: (e) => dispatch(PromoSalesData(e)),
    loadPromoGiveaway: (e) => dispatch(PromoGiveawayData(e)),
    loadPromoProd: (e) => dispatch(PromoProdData(e)),
    loadPromoPart: (e) => dispatch(PromoPartData(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
    onGenerateUrlParamsData: (e) => dispatch(generateSideFilter(e)),
    onGetFilter: (e) => dispatch(getFilter(e)),
    onSaveSalesParam: (e) => dispatch(SaveSalesParam(e)),
    onSaveGiveawayParam: (e) => dispatch(SaveGiveawayParam(e)),
    onSavePromoProdParam: (e) => dispatch(SavePromoProdParam(e)),
    onSavePromoPartParam: (e) => dispatch(SavePromoPartParam(e)),
    onGetWeekFilter: (e) => dispatch(getWeekFilter(e)),
    onSaveWeekFilterParam: (e) => dispatch(WeekFilterParam(e)),
    onSaveStoreFilterParam: (e) => dispatch(StoreFilterParam(e)),

    pieChartSuccess: (e) => dispatch(pieChartSuccess(e)),
    promoGiveAwaySuccess: (e) => dispatch(promoGiveAwaySuccess(e)),
    productsCountSplitSuccess: (e) => dispatch(productsCountSplitSuccess(e)),
    promoParticipationBySplitSuccess: (e) => dispatch(promoParticipationBySplitSuccess(e)),
    productsTableSplitSuccess: (e) => dispatch(productsTableSplitSuccess(e)),
    kpiDataSuccess: (e) => dispatch(kpiDataSuccess(e)),

    //------------After adding tabs-----------
    saveTrendChartTabParam: (e) => dispatch(saveTrendChartTabParam(e)),
    modalSaveTrendChartTabParam: (e) => dispatch(modalSaveTrendChartTabParam(e)),
    productsOnPromoTableFetch: (e) => dispatch(productsOnPromoTableFetch(e)),
    trendChartDataFetch: (e) => dispatch(trendChartDataFetch(e)),
    pieChartDataFetch: (e) => dispatch(pieChartDataFetch(e)),
    saveMetricSelectionTabParam: (e) => dispatch(saveMetricSelectionTabParam(e)),
    trendChartSpinner: (e) => dispatch(trendChartSpinner(e)),
    defaultGreyScreen: (e) => dispatch(defaultGreyScreen(e)),

    onSavePieChartType: (e) => dispatch(savePieChartType(e)),
    onSaveLineChartType: (e) => dispatch(saveLineChartType(e)),
    onSaveModalLineChartType: (e) => dispatch(saveModalLineChartType(e)),

    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Promotion);
