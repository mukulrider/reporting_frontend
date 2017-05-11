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
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import InputField from 'components/input_field';
import FiltersSupplier from 'components/FiltersSupplier';
import RadioButton from 'components/radio_button';
import Checkbox from 'components/checkbox';
import Spinner from 'components/spinner';
require('react-bootstrap-table/css/react-bootstrap-table.css')

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
      paticipationByTab: "Paticipation by Value",
      GrowthTab: "Value Growth",
      ContributionToGrowthTab: "Contribution to Value Growth",
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

    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: '15', value: 15
      }, {
        text: '25', value: 25
      },
        {
          text: '50', value: 50
        }], // you can change the dropdown list for size per page
      sizePerPage: 15,  // which size per page you want to locate as default
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

    let formatSales = (cell) =>{
      if (cell >= 1000 || cell <= -1000) {
        let rounded = Math.round(cell / 1000);
        return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');
      }
      else {
        return ('£ ' + Math.round(cell));
      }
    }

    let formatVolume = (cell) => {
      if (cell >= 1000 || cell <= -1000) {
        let rounded = Math.round(cell / 1000);
        return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      } else {
        return (Math.round(cell));
      }
    }

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
        <div className="pageTitle">
          {(() => {
            if (this.props.supplier.filter_week_selection) {
              return (
                <span>Supplier View - {(this.props.supplier.filter_week_selection).substring(11, 17)}</span>
              )
            } else {
              return (
                <span>Supplier View - 201652  </span>
              )
            }
          })()}
        </div>

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
                  height: '80%',
                  position: 'fixed',
                  width: '20%',
                  marginTop: '-2%',
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

                                         previous_week_selection={this.props.supplier.filter_week_selection}

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
                  <div className="row" style={{marginLeft: "0.5%", marginRight: "0px", paddingTop: "-5px"}}>

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

                        }}><span className="tab_label">Last 52 weeks</span></NavItem>

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

                      <div style={{height: '0px', width: '100%'}}>&nbsp;</div>
                      <Nav bsStyle="tabs" activeKey={this.state.activeKey2} onSelect={this.handleSelect}
                           className="tabsCustom">
                        <NavItem eventKey="1" className="tabsCustomList" onClick={() => {
                          this.setState({activeKey2: "1"});
                          this.props.supplierViewKpiSpinnerCheckSuccess(0);
                          this.props.barChartSpinnerCheckSuccess(0);
                          this.setState({paticipationByTab: "Participation by Value"});
                          this.setState({GrowthTab: "Value Growth"});
                          this.setState({ContributionToGrowthTab: "Contribution to Value Growth"});
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
                          this.setState({paticipationByTab: "Participation by Volume"});
                          this.setState({GrowthTab: "Volume Growth"});
                          this.setState({ContributionToGrowthTab: "Contribution to Volume Growth"});
                          kpiParams = "kpi_type=Volume";
                          this.props.onSaveKPIParam(kpiParams);
                          this.props.onKPIBox();
                          this.props.ontopBottomChart();
                        }}><span className="tab_label">Volume</span></NavItem>

                        <NavItem eventKey="3" className="tabsCustomList" onClick={() => {
                          this.setState({activeKey2: "3"});
                          this.props.supplierViewKpiSpinnerCheckSuccess(0);
                          this.props.barChartSpinnerCheckSuccess(0);
                          this.setState({paticipationByTab: "Participation by COGS"});
                          this.setState({GrowthTab: "COGS Growth"});
                          this.setState({ContributionToGrowthTab: "Contribution to COGS Growth"});
                          kpiParams = "kpi_type=COGS";
                          this.props.onSaveKPIParam(kpiParams);
                          this.props.onKPIBox();
                          this.props.ontopBottomChart();
                        }}><span className="tab_label">COGS</span></NavItem>

                        <NavItem eventKey="4" className="tabsCustomList" onClick={() => {
                          this.setState({activeKey2: "4"});
                          this.props.supplierViewKpiSpinnerCheckSuccess(0);
                          this.props.barChartSpinnerCheckSuccess(0);
                          this.setState({paticipationByTab: "Participation by CGM"});
                          this.setState({GrowthTab: "CGM Growth"});
                          this.setState({ContributionToGrowthTab: "Contribution to CGM Growth"});

                          kpiParams = "kpi_type=CGM";
                          this.props.onSaveKPIParam(kpiParams);
                          this.props.onKPIBox();
                          this.props.ontopBottomChart();
                        }}><span className="tab_label">CGM</span></NavItem>

                        <NavItem eventKey="5" className="tabsCustomList" onClick={() => {
                          this.setState({activeKey2: "5"});
                          this.props.supplierViewKpiSpinnerCheckSuccess(0);
                          this.props.barChartSpinnerCheckSuccess(0);
                          this.setState({paticipationByTab: "Participation by ASP"});
                          this.setState({GrowthTab: "ASP Growth"});
                          this.setState({ContributionToGrowthTab: "Contribution to ASP Growth"});
                          kpiParams = "kpi_type=ASP";
                          this.props.onSaveKPIParam(kpiParams);
                          this.props.onKPIBox();
                          this.props.ontopBottomChart();
                        }}><span className="tab_label">ASP</span></NavItem>

                        <NavItem eventKey="6" className="tabsCustomList" onClick={() => {
                          this.setState({activeKey2: "6"});
                          this.props.supplierViewKpiSpinnerCheckSuccess(0);
                          this.props.barChartSpinnerCheckSuccess(0);
                          this.setState({paticipationByTab: "Participation by Supplier Funding(exc VAT)"});
                          this.setState({GrowthTab: "Supplier Funding(exc VAT) Growth"});
                          this.setState({ContributionToGrowthTab: "Contribution to Supplier Funding(exc VAT) Growth"});
                          kpiParams = "kpi_type=Supp_Fund";
                          this.props.onSaveKPIParam(kpiParams);
                          this.props.onKPIBox();
                          this.props.ontopBottomChart();
                        }}><span className="tab_label">Supplier Funding(exc VAT)</span></NavItem>

                        <NavItem eventKey="7" className="tabsCustomList" onClick={() => {
                          this.setState({activeKey2: "7"});
                          this.props.supplierViewKpiSpinnerCheckSuccess(0);
                          this.props.barChartSpinnerCheckSuccess(0);
                          this.setState({paticipationByTab: "Participation by SKU"});
                          this.setState({GrowthTab: "SKU Growth"});
                          this.setState({ContributionToGrowthTab: "Contribution to SKU Growth"});
                          kpiParams = "kpi_type=SKU";
                          this.props.onSaveKPIParam(kpiParams);
                          this.props.onKPIBox();
                          this.props.ontopBottomChart();
                        }}><span className="tab_label">SKUs</span></NavItem>

                      </Nav>

                      <div className="row">
                        {(() => {
                          if (this.props.supplier.supplierViewKpiSpinner != 1) {
                            return (
                              <div className="row spinnerPosition spinnerPositionFix"><Spinner /><h2>Please Wait a
                                Moment....!</h2></div>
                            )
                          } else {
                            return (
                              <div>
                                <div className="row"
                                     style={{textAlign: 'center', marginLeft: '0px', marginRight: '0px'}}>
                                  <div className="col-md-6 col-sm-12">
                                  <div className="col-md-12 col-sm-12" style={{
                                    textAlign: 'center',
                                    backgroundColor: "white",
                                    margin: "0%",
                                    marginBottom: '4%',
                                    marginTop: '3%',
                                    borderLeft: "1px solid #e5e8ea",
                                    borderTop: "1px solid #e5e8ea",
                                    borderRight: "1px solid #e5e8ea",
                                    borderBottom: "1px solid #e5e8ea"
                                  }}>
                                    <Panel>
                                      <h4 className="pageModuleMainTitle"> Total Sales </h4>
                                      <div className="row">
                                        <div className="col-xs-6">

                                          <h4
                                            className="panel-heading tesco-heading">  {this.props.supplier.reducer1.sales} </h4>
                                        </div>
                                        <div className="col-xs-6">

                                          <h4 className="panel-heading tesco-heading">
                                            LFL: {this.props.supplier.reducer1.sales_lfl} </h4>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="panel-body">
                                          <div className="col-xs-4">
                                            <h4> {this.props.supplier.reducer1.sales_var_week}  </h4>
                                            <h4><b> {'WoW'} </b></h4>
                                          </div>
                                          <div className="col-xs-4">
                                            <h4> {this.props.supplier.reducer1.sales_var_year} % </h4>
                                            <h4><b> {'YOY'} </b></h4>
                                          </div>
                                          <div className="col-xs-4">
                                            <h4>  {this.props.supplier.reducer1.sales_var_year_lfl} % </h4>
                                            <h4><b>{'LFL'}</b></h4>
                                          </div>
                                        </div>
                                      </div>

                                    </Panel>
                                  </div>
                                  </div>
                                  <div className="col-md-6 col-sm-12">
                                  <div className="col-md-12 col-sm-12" style={{
                                    textAlign: 'center',
                                    borderTop: "1px solid #e5e8ea",
                                    marginBottom: '4%',
                                    marginTop: '3%',
                                    float: 'right',
                                    backgroundColor: "white",
                                    borderLeft: "1px solid #e5e8ea",
                                    borderRight: "1px solid #e5e8ea",
                                    borderBottom: "1px solid #e5e8ea"
                                  }}>

                                    <Panel>
                                      <h4 className="pageModuleMainTitle"> Contribution to Growth </h4>
                                      <div className="row">
                                        <div className="col-xs-6" style={{textAlign:"center"}}>
                                          <h4
                                            className="panel-heading tesco-heading">  {this.props.supplier.reducer1.sales} </h4>
                                        </div>
                                        <div className="col-xs-6" style={{textAlign:"center"}}>

                                          <h4 className="panel-heading tesco-heading">
                                            LFL: {this.props.supplier.reducer1.sales_lfl} </h4>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="panel-body">
                                          <div className="col-xs-4">
                                            <h4> {this.props.supplier.reducer1.sales_growth_wow_1}
                                              of {this.props.supplier.reducer1.sales_growth_wow_2}  </h4>
                                            <h4><b>{'WoW'}</b></h4>
                                          </div>
                                          <div className="col-xs-4">
                                            <h4> {this.props.supplier.reducer1.sales_growth_yoy_1} %
                                              of {this.props.supplier.reducer1.sales_growth_yoy_2} % </h4>
                                            <h4><b>{'YoY'}</b></h4>
                                          </div>
                                          <div className="col-xs-4">
                                            <h4> {this.props.supplier.reducer1.sales_growth_yoy_lfl_1} %
                                              of {this.props.supplier.reducer1.sales_growth_yoy_lfl_2} % </h4>
                                            <h4><b>{'LFL'}</b></h4>
                                          </div>
                                        </div>
                                      </div>
                                    </Panel>
                                  </div>
                                  </div>


                                </div>
                                <panel>
                                  <div className="row" style={{marginLeft: '0px', marginRight: '0px'}}>
                                    <div className="col-md-6 col-sm-12">
                                    <div className="col-md-12 col-sm-12 panel-body" style={{
                                      textAlign: 'center',
                                      borderTop: "1px solid #e5e8ea",
                                      backgroundColor: "white",
                                      margin: "0%",
                                      borderLeft: "1px solid #e5e8ea",
                                      borderRight: "1px solid #e5e8ea",
                                      borderBottom: "1px solid #e5e8ea"
                                    }}>
                                      <h4 className="pageModuleMainTitle"> Parent Supplier's value share in
                                        Category</h4>
                                      <div style={{height: '15%', width: '100%'}}>&nbsp;</div>
                                      {(() => {
                                        if (this.props.supplier.reducer1.supp_imp_cat_sales) {

                                          return (
                                            <div>
                                              <GaugeChart2 data={[this.props.supplier.reducer1.supp_imp_cat_sales]}
                                                           id="gauge1"/>
                                              <div className="row" style={{marginTop: '-11%'}}>
                                                <div className="col-xs-12"
                                                     style={{fontWeight: 'bold', fontSize: '14px'}}>
                                                  {this.props.supplier.reducer1.supp_imp_cat_sales}%
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        }
                                      })()}
                                    </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                    <div className="col-md-12 col-sm-12 col-xs-12 panel-body" style={{
                                      textAlign: 'center',
                                      borderTop: "1px solid #e5e8ea",
                                      float: 'right',
                                      backgroundColor: "white",
                                      margin: "0%",
                                      borderLeft: "1px solid #e5e8ea",
                                      borderRight: "1px solid #e5e8ea",
                                      borderBottom: "1px solid #e5e8ea"
                                    }}>
                                      <h4 className="pageModuleMainTitle"> Category's value share to Parent
                                        Supplier </h4>
                                      <div style={{height: '15%', width: '100%'}}>&nbsp;</div>
                                      {(() => {
                                        if (this.props.supplier.reducer1.cat_imp_supp_sales) {

                                          return (
                                            <div>
                                              <GaugeChart2 data={[this.props.supplier.reducer1.cat_imp_supp_sales]}
                                                           id="gauge2"/>
                                              <div className="row" style={{marginTop: '-11%'}}>
                                                <div className="col-xs-12"
                                                     style={{fontWeight: 'bold', fontSize: '14px'}}>
                                                  {this.props.supplier.reducer1.cat_imp_supp_sales}%
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        }
                                      })()}
                                      {/*<SampleBarChart/>*/}
                                    </div>
                                    </div>
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
                            }}><span className="tab_label">{this.state.paticipationByTab}</span>
                            </NavItem>

                            <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                              this.setState({activeKey3: "2"});
                              this.props.barChartSpinnerCheckSuccess(0);
                              TopBottomKpi = "top_bottom_kpi=value_growth";
                              this.props.onSaveTopBottomKpi(TopBottomKpi);
                              this.props.ontopBottomChart();
                            }}><span className="tab_label">{this.state.GrowthTab}</span></NavItem>

                            <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                              this.setState({activeKey3: "3"});
                              this.props.barChartSpinnerCheckSuccess(0);
                              TopBottomKpi = "top_bottom_kpi=value_contribution";
                              this.props.onSaveTopBottomKpi(TopBottomKpi);
                              this.props.ontopBottomChart();
                            }}><span className="tab_label">{this.state.ContributionToGrowthTab}</span></NavItem>
                          </Nav>
                        </div>


                        <panel>
                          <div className="col-md-6 col-sm-12 col-xs-12 panel-body">
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
                          <div className="col-md-6 col-sm-12 col-xs-12 panel-body">
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
                            {
                              (() => {
                                // if (this.props.ProductPage.data) {
                                if (this.props.supplier.data && (this.props.supplier.tableChartSpinnerCheck == 1)) {


                                  return (
                                    <div>
                                      <BootstrapTable
                                        data={this.props.supplier.data.table_data} options={options}
                                        striped={true}
                                        hover
                                        condensed
                                        pagination={ true }
                                        search={true}
                                        exportCSV={true}
                                      >
                                        <TableHeaderColumn dataField="base_product_number" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
                                        <TableHeaderColumn dataField="parent_supplier" tdStyle={ { whiteSpace: 'normal' } } width="20%" dataSort={true} dataAlign="center">Parent Supplier</TableHeaderColumn>
                                        <TableHeaderColumn dataField="sales_ty" dataFormat={formatSales} dataSort={true} dataAlign="center">Sales TY</TableHeaderColumn>
                                        <TableHeaderColumn dataField="volume_ty" dataFormat={formatVolume} dataSort={true} dataAlign="center">Volume TY</TableHeaderColumn>
                                        <TableHeaderColumn dataField="cgm_ty" dataFormat={formatSales} dataSort={true} dataAlign="center">CGM TY</TableHeaderColumn>
                                        <TableHeaderColumn dataField="pps" dataSort={true} dataAlign="center">PPS</TableHeaderColumn>
                                        <TableHeaderColumn dataField="cps" dataSort={true} dataAlign="center">CPS</TableHeaderColumn>
                                        <TableHeaderColumn dataField="rate_of_sale" dataSort={true} dataAlign="center">Rate of Sale</TableHeaderColumn>
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

