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
import {Nav, NavItem, DropdownButton, MenuItem, Modal} from 'react-bootstrap';
import {saveImage, saveDataAsCSV} from './../../utils/exportFunctions';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import InputField from 'components/input_field';
import FiltersSupplier from 'components/FiltersSupplier';
import RadioButton from 'components/radio_button';
import Checkbox from 'components/checkbox';
import Spinner from 'components/spinner';
import Breadcrumb from 'components/Breadcrumb';
import TopFilterSupplier from 'components/TopFilterSupplier';
// import Multiselect from 'components/MultiSelect';
import createClass from 'create-react-class';

var SelectBox = React.createFactory(require('react-select-box/lib/select-box'))


require('react-bootstrap-table/css/react-bootstrap-table.css')

var div = React.createElement.bind(null, 'div')
var option = React.createElement.bind(null, 'option')
var h1 = React.createElement.bind(null, 'h1')


var Example = React.createFactory(React.createClass({
  displayName: 'Example',
  getInitialState: function () {
    return {
      color: null,
      colors: []
    }
  },
  handleChange: function (color) {
    this.setState({color: color})
  },
  handleMultiChange: function (colors) {
    this.setState({colors: colors})
  },
  render: function () {
    let values = [];
    // let values = {'value': ""};
    // this.props.filterdata.checkbox_list[8].items.map((item, key) => {
    //   console.log('key', key);
    //   values.push({'value': item.title});
    //   console.log('values[key].value', values[key].value);
    //   // values[key][value] = item.title;
    // })
    // console.log('values', this.props.filterdata.checkbox_list[8].items);
    // console.log('values1', values);
    return (
      SelectBox(
        {
          label: this.props.placeholder,
          onChange: this.handleMultiChange,
          value: this.state.colors,
          // value: this.state.colors,
          multiple: true
        },
        // values.map((item,key) => {
        //   console.log('item[value]',item.value);
        //   option({item},item.value)
        // })


        option({value: '10397. - KARRO FOODS'}, '10397. - KARRO FOODS'),
        option({value: '1097. - MOY PARK (OSI)'}, '1097. - MOY PARK (OSI)'),
        option({value: '1827. - FRESHLINK FOODS'}, '1827. - FRESHLINK FOODS')
      )
    )
  }
}))


/*
 React.Bootstrap = require('react-bootstrap');
 React.Bootstrap.Select = require('react-bootstrap-select');
 */


import Select from 'react-select';
import 'react-select/dist/react-select.css';


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
  GenerateUrlParamsString2,
  GenerateUrlParamsString3,
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
  StoreFilterParam,

} from './actions';
import styles from './style.scss';


/*
 const FLAVOURS = [
 { label: 'Chocolate', value: 'chocolate' },
 { label: 'Vanilla', value: 'vanilla' },
 { label: 'Strawberry', value: 'strawberry' },
 { label: 'Caramel', value: 'caramel' },
 { label: 'Cookies and Cream', value: 'cookiescream' },
 { label: 'Peppermint', value: 'peppermint' },
 ];
 */

let flavours = [
  {label: 'Chocolate1', value: 'chocolate'},
  {label: 'Vanilla1', value: 'vanilla'},
  {label: 'Strawberry', value: 'strawberry'},
  {label: 'Caramel', value: 'caramel'},
  {label: 'Cookies and Cream', value: 'cookiescream'},
  {label: 'Peppermint', value: 'peppermint'},
];
let flavours2 = [
  {label1: 'Chocolate', value1: 'chocolate'},
  {label1: 'Vanilla', value1: 'vanilla'},
  {label1: 'Strawberry', value1: 'strawberry'},
  {label1: 'Caramel', value1: 'caramel'},
  {label1: 'Cookies and Cream', value1: 'cookiescream'},
  {label1: 'Peppermint', value1: 'peppermint'},
];


function glyphiconFormatter(cell) {
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
export class Supplier extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    let defaultFilterUrlParams = localStorage.getItem('urlParams');
    if (defaultFilterUrlParams) {
      console.log('defaultFilterUrlParams  ', defaultFilterUrlParams)

      this.props.onGenerateUrlParamsString3(1);
      this.props.onGenerateUrlParamsString2(defaultFilterUrlParams);
      this.props.onGenerateUrlParamsString(0);
      // this.props.onGenerateUrlParamsString(defaultFilterUrlParams);
    } else {
      this.props.onGenerateUrlParamsString('');
    }
    this.props.supplierViewKpiSpinnerCheckSuccess(0);
    // this.props.onGenerateUrlParamsString();
    this.props.onGetFilter();
    this.props.onKPIBox();
    this.props.ontopBottomChart();
    this.props.onKPIBoxASP();
    this.props.onSaveTopBottomKpi();

    // //For tableaa
    // this.props.onGenerateTable();
    // //For Bubble Graph
    // this.props.onFetchGraph();
    // this.props.supplier.reducer1.sales;
  };


  constructor(props) {
    super(props);
    this.state = {
      smShow: false,
      bubbleChartModal: false,
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
      paticipationByTab: "Participation by Value",
      GrowthTab: "Value Growth",
      ContributionToGrowthTab: "Contribution to Value Growth",
      suppKPIbar: false,
      suppNegotiationbar: false,
      suppTopBottombar: false,
      myData: [{value: 'One', selected: true}, {value: 'Two'}],
    };
  }

  inputUpdate = (checked, base_product_number) => {
    this.props.onGenerateCheckedList(checked, base_product_number)
  };

  tableProductUpdate = (checked, base_product_number) => {
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
      sizePerPageList: [{
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

    let formatSales = (cell) => {
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
    let dataWeekUrlParams = this.props.supplier.week_param;
    let kpiParams = this.props.supplier.kpi_param;
    let TopBottomKpi = this.props.supplier.top_bottom_kpi;
    let dataPerformanceUrlParams = this.props.supplier.dataPerformanceUrlParams;
    let dataStoreUrlParams = this.props.supplier.dataStoreUrlParams;
    let finalurlParamsString = '';


    return (
      <div>

        <Helmet
          title="Supplier View"
          meta={[
            {name: 'description', content: 'Description of Supplier View'},
          ]}
        />


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


                {/*Filters*/}
                <div style={{
                  height: '80%',
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

                                         previous_week_selection={this.props.supplier.filter_week_selection}

                                         barChartSpinnerCheck={this.props.barChartSpinnerCheckSuccess}
                                         bubbleChartSpinnerCheck={this.props.bubbleChartSpinnerCheckSuccess}
                                         tableChartSpinnerCheck={this.props.tableChartSpinnerCheckSuccess}
                                         supplierViewKpiSpinnerCheck={this.props.supplierViewKpiSpinnerCheckSuccess}
                                         urlParamsString={this.props.supplier.urlParamsString}
                                         filter_week_selection={this.props.supplier.filter_week_selection}


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
                  {/*Page title*/}

                  {/*<div className="pageTitle">*/}
                  {/*{(() => {*/}
                  {/*if (this.props.supplier.filter_week_selection) {*/}
                  {/*return (*/}
                  {/*<span>Supplier View - {(this.props.supplier.filter_week_selection).substring(11, 17)}</span>*/}
                  {/*)*/}
                  {/*} else {*/}
                  {/*return (*/}
                  {/*<span>Supplier View - 201711  </span>*/}
                  {/*)*/}
                  {/*}*/}
                  {/*})()}*/}
                  {/*</div>*/}

                  <div className="row">
                    <div className="col-xs-12">
                      {(() => {
                        if (this.props.supplier.urlParamsString) {

                          finalurlParamsString = this.props.supplier.urlParamsString;
                          console.log('elseelse', finalurlParamsString);


                        } else {
                          console.log('if if if if', this.props.supplier.urlParamsString2);
                          finalurlParamsString = this.props.supplier.urlParamsString2;
                          console.log('ififif', finalurlParamsString);

                        }
                      })()}

                      <Breadcrumb
                        selected_week={(this.props.supplier.filter_week_selection).substring(11, this.props.supplier.filter_week_selection.length)}
                        urlParamsString={finalurlParamsString}/>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/></div>


                  {(() => {
                    if (this.props.supplier.week_filter_data) {
                      return (
                        <TopFilterSupplier
                          week_filter_data={this.props.supplier.week_filter_data}
                          onSaveWeekFilterParam={this.props.onCheckboxWeekChange}

                          onSaveStoreFilterParam={this.props.onSaveStoreFilterParam}
                          onSaveWeekParam={this.props.onSaveWeekParam}

                          onKPIBox={this.props.onKPIBox}
                          ontopBottomChart={this.props.ontopBottomChart}

                          barChartSpinnerCheck={this.props.barChartSpinnerCheckSuccess}
                          supplierViewKpiSpinnerCheck={this.props.supplierViewKpiSpinnerCheckSuccess}
                        />

                      )
                    }
                  })()}

                </div>
                {/*<div className="row" style={{marginLeft: '335px'}}>*/}
                  {/*<div className="col-xs-3">*/}
                    {/*<Example placeholder="Parent Supplier"></Example>*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
                  {/*</div>*/}

                  {/*<div className="col-xs-3">*/}
                    {/*<Example placeholder="Supplier"></Example>*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
                  {/*</div>*/}
                {/*</div>*/}


                <div className="row" style={{
                  marginLeft: "0%",
                  marginRight: "0px",
                  paddingTop: "-5px",
                  width: '78%',
                  marginLeft: '22%'
                }}>

                  <div className="col-md-12 content-wrap" style={{backgroundColor: "#f5f5f5"}}>


                    <div style={{height: '0px', width: '100%'}}>&nbsp;</div>


                    <Modal show={this.state.suppKPIbar} bsSize="lg"
                           aria-labelledby="contained-modal-title-lg"
                    >
                      <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                          style={{textAlign: 'center', fontSize: '14px'}}><b>Supplier KPIs</b><span
                          style={{textAlign: 'right', float: 'right'}}
                          onClick={() => this.setState({suppKPIbar: false})}><b>X</b></span></span>
                          <div style={{textAlign: 'center'}}>
                            <div style={{textAlign: 'right'}}>
                            </div>
                          </div>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{fontSize: '14px'}}>
                        <list>
                          <ul><b>Value: </b>Sales of a supplier in £</ul>
                          <ul><b> COGS: </b>Cost of goods sold (COGS) are the direct costs attributable to the
                            production of the goods sold by a company. This amount includes the cost of the materials
                            used in producing the goods, transportation cost, store replenishments, waste and shrinkage
                            used to produce and getting product to store to sell.
                          </ul>
                          <ul><b>CGM (Commercial Gross Margin): </b>Scanned margin plus all other commercial
                            income(include supplier funding) and expenses that are managed by Product
                          </ul>
                          <ul><b>Supplier fund XVAT: </b>The funding is an amount to be paid by the supplier per unit
                            sold
                          </ul>
                          <ul><b>ASP (Average Selling Price): </b>The average price for a single product across a period
                            of time.
                          </ul>
                          <ul><b>SKU: </b>A stock keeping unit or SKU is a distinct type of item for sale which has
                            attributes associated with the item type that distinguish it from other item types. For a
                            product, these attributes include, but are not limited to, manufacturer, description,
                            material, size, colour, packaging, and warranty terms.
                          </ul>
                          <ul><b>YTD (Year to Date): </b>The cumulative total for a given measure (e.g. sales, profit)
                            from the beginning of the financial year to the current date.​
                          </ul>
                        </list>
                      </Modal.Body>
                    </Modal>

                    <div>
                      <div className="mainBox">
                        <span className="glyphicon glyphicon-info-sign pull-right"
                              style={{marginRight: '10px', fontSize: '15px', marginTop: '10px', color: '#00539f'}}
                              onClick={() => {
                                this.setState({suppKPIbar: true});
                              }}>
                        </span>
                        <div style={{borderRight: '1%'}}>
                          <Nav bsStyle="tabs" style={{marginLeft: '1%'}} activeKey={this.state.activeKey2}
                               onSelect={this.handleSelect} className="tabsCustom  mainTab">

                            <NavItem eventKey="1" className="tabsCustomListTime" onClick={() => {
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

                            <NavItem eventKey="2" className="tabsCustomListTime" onClick={() => {
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

                            <NavItem eventKey="3" className="tabsCustomListTime" onClick={() => {
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

                            <NavItem eventKey="4" className="tabsCustomListTime" onClick={() => {
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

                            <NavItem eventKey="5" className="tabsCustomListTime" onClick={() => {
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

                            <NavItem eventKey="6" className="tabsCustomListTime" onClick={() => {
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

                            <NavItem eventKey="7" className="tabsCustomListTime" onClick={() => {
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
                        </div>
                      </div>


                      <div className="coverBox">
                        <div className="headerBox">
                          <h2 className="pageModuleMainTitle">Performance by KPI</h2>
                        </div>
                        {(() => {
                          if (this.props.supplier.supplierViewKpiSpinner != 1) {
                            return (
                              <div className="row spinnerPosition spinnerPositionFix"><Spinner /><h2>Please Wait a
                                Moment....!</h2></div>
                            )
                          } else {
                            return this.props.supplier.reducer1.map((obj) => {
                              return (
                                <div>
                                  <div className="row mainBox" style={{textAlign: 'center'}}>
                                    <div className="col-md-4 col-sm-12" style={{backgroundColor: "#fafafa"}}>
                                      <Panel>
                                        <h3 className="pageModuleSubTitle"> {obj.title} </h3>
                                        <div className="row">
                                          <div className="col-xs-6">
                                            <h3 style={{padding: "0px", margin: "0px"}}>  {obj.sales} </h3>
                                          </div>
                                          <div className="col-xs-6">
                                            <h3 style={{padding: "0px", margin: "0px"}}>
                                              LFL: {obj.sales_lfl} </h3>
                                          </div>
                                        </div>

                                        <div className="row" style={{marginTop: '5%'}}>
                                          <div className="panel-body cardPanel">
                                            <div className="col-xs-4">
                                              <h4>
                                                  <span className={glyphiconFormatter(obj.sales_var_week)}>
                                                  </span>{(obj.sales_var_week) + '%'}
                                              </h4>
                                              &nbsp; &nbsp; <br></br>&nbsp; &nbsp;<span></span>&nbsp;

                                              <h5 className="kpiSubTitle"><b> {'WoW'} </b></h5>
                                            </div>
                                            <div className="col-xs-4">
                                              <h4>
                                                  <span className={glyphiconFormatter(obj.sales_var_year)}>
                                                  </span>{(obj.sales_var_year) + '%'}
                                              </h4><br></br>
                                              <div>&nbsp;</div>
                                              <h5 className="kpiSubTitle"><b> {'YoY'} </b></h5>
                                            </div>
                                            <div className="col-xs-4">
                                              <h4>
                                                  <span className={glyphiconFormatter(obj.sales_var_year_lfl)}>
                                                  </span>{(obj.sales_var_year_lfl) + '%'}
                                              </h4><br></br>
                                              <div>&nbsp;</div>
                                              <h5 className="kpiSubTitle"><b>{'LFL'}</b></h5>
                                            </div>
                                          </div>
                                        </div>

                                      </Panel>
                                    </div>
                                    <div className="col-md-4 col-sm-12" style={{backgroundColor: "#fafafa"}}>
                                      <Panel>
                                        <h3 className="pageModuleSubTitle"> Contribution to Growth </h3>
                                        <div className="row">
                                          <div className="col-xs-6" style={{textAlign: "center"}}>
                                            <h3
                                              style={{padding: "0px", margin: "0px"}}>  {obj.cw_sales_exclu_sup} </h3>
                                          </div>
                                          <div className="col-xs-6" style={{textAlign: "center"}}>

                                            <h3 style={{padding: "0px", margin: "0px"}}>
                                              LFL: {obj.cw_sales_exclu_sup_lfl } </h3>
                                          </div>
                                        </div>
                                        <br></br>
                                        <div className="row">
                                          <div className="panel-body cardPanel">
                                            <div className="col-xs-4">
                                              <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                                                className={glyphiconFormatter(obj.sales_growth_wow_1)}></span>&nbsp;{(obj.sales_growth_wow_1) + ' % '}
                                                <br></br> &nbsp; &nbsp;of <br></br>&nbsp; &nbsp;<span
                                                  className={glyphiconFormatter(obj.sales_growth_wow_2)}></span>&nbsp;{(obj.sales_growth_wow_2) + ' % '}
                                              </h4>
                                              <h5 className="kpiSubTitle" style={{marginTop: '20px'}}><b>{'WoW'}</b>
                                              </h5>
                                            </div>
                                            <div className="col-xs-4">
                                              <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                                                className={glyphiconFormatter(obj.sales_growth_yoy_1)}></span>&nbsp;{(obj.sales_growth_yoy_1) + ' % '}
                                                <br></br> &nbsp; &nbsp; of <br></br>&nbsp; &nbsp;<span
                                                  className={glyphiconFormatter(obj.sales_growth_yoy_2)}></span>&nbsp;{(obj.sales_growth_yoy_2) + ' % '}
                                              </h4>
                                              <h5 className="kpiSubTitle" style={{marginTop: '20px'}}><b>{'YoY'}</b>
                                              </h5>
                                            </div>
                                            <div className="col-xs-4">
                                              <h4>&nbsp;&nbsp;&nbsp;&nbsp;<span
                                                className={glyphiconFormatter(obj.sales_growth_yoy_lfl_1)}></span>&nbsp;{(obj.sales_growth_yoy_lfl_1) + ' % '}
                                                <br></br> &nbsp; &nbsp; of <br></br>&nbsp; &nbsp;<span
                                                  style={{left: '-5px'}}
                                                  className={glyphiconFormatter(obj.sales_growth_yoy_lfl_2)}></span>&nbsp;{(obj.sales_growth_yoy_lfl_2) + ' % '}
                                              </h4>
                                              <h5 className="kpiSubTitle" style={{marginTop: '20px'}}><b>{'LFL'}</b>
                                              </h5>
                                            </div>
                                          </div>
                                        </div>

                                      </Panel>
                                    </div>
                                    <div className="col-md-4 col-sm-12" style={{backgroundColor: "#fafafa"}}>
                                      <Panel>
                                        <h3 className="pageModuleSubTitle"> Parent Supplier's value share in
                                          Category </h3>
                                        {(() => {
                                          if (obj.supp_imp_cat_sales != "---") {

                                            return (
                                              <div style={{
                                                fontSize: '20px',
                                              }}>{obj.supp_imp_cat_sales}%</div>
                                            )
                                          }
                                        })()}

                                        <div style={{height: '1%', width: '100%'}}></div>
                                        <br></br>
                                        <h3 className="pageModuleSubTitle"> Category's value share to Parent
                                          Supplier </h3>
                                        {(() => {
                                          if (obj.cat_imp_supp_sales != "---") {

                                            return (
                                              <div style={{
                                                fontSize: '20px',
                                              }}>{obj.cat_imp_supp_sales}% <br></br></div>
                                            )
                                          }
                                        })()}

                                      </Panel>
                                    </div>
                                  </div>

                                  {/*<panel>*/}
                                  {/*<div className="row mainBox">*/}
                                  {/*<div className="col-md-6 col-sm-6" style={{backgroundColor: "#fafafa"}}>*/}


                                  {/*{(() => {*/}
                                  {/*if (obj.supp_imp_cat_sales != "---") {*/}

                                  {/*return (*/}
                                  {/*<div>*/}
                                  {/*<div className="col-md-12 col-sm-6" style={{*/}
                                  {/*textAlign: 'center',*/}
                                  {/*borderTop: "1px solid #e5e8ea",*/}
                                  {/*backgroundColor: "white",*/}
                                  {/*margin: "0%",*/}
                                  {/*borderLeft: "1px solid #e5e8ea",*/}
                                  {/*borderRight: "1px solid #e5e8ea",*/}
                                  {/*borderBottom: "1px solid #e5e8ea"*/}
                                  {/*}}>*/}
                                  {/*<h3 className="pageModuleSubTitle"> Parent Supplier's value share in*/}
                                  {/*Category</h3>*/}
                                  {/*<div style={{height: '15%', width: '100%'}}>&nbsp;</div>*/}
                                  {/*<GaugeChart2 data={[obj.supp_imp_cat_sales]}*/}
                                  {/*id="gauge1"/>*/}
                                  {/*<div className="row" style={{marginTop: '-11%'}}>*/}
                                  {/*<div className="col-xs-12"*/}
                                  {/*style={{fontWeight: 'bold', fontSize: '14px'}}>*/}
                                  {/*{obj.supp_imp_cat_sales}%*/}
                                  {/*</div>*/}
                                  {/*</div>*/}
                                  {/*</div>*/}
                                  {/*</div>*/}
                                  {/*)*/}
                                  {/*}*/}
                                  {/*})()}*/}

                                  {/*</div>*/}
                                  {/*<div className="col-md-6 col-sm-6" style={{backgroundColor: "#fafafa"}}>*/}


                                  {/*{(() => {*/}
                                  {/*if (obj.cat_imp_supp_sales != "---") {*/}

                                  {/*return (*/}
                                  {/*<div>*/}
                                  {/*<div className="col-md-12 col-sm-12 col-xs-12" style={{*/}
                                  {/*textAlign: 'center',*/}
                                  {/*borderTop: "1px solid #e5e8ea",*/}
                                  {/*float: 'right',*/}
                                  {/*backgroundColor: "white",*/}
                                  {/*margin: "0%",*/}
                                  {/*borderLeft: "1px solid #e5e8ea",*/}
                                  {/*borderRight: "1px solid #e5e8ea",*/}
                                  {/*borderBottom: "1px solid #e5e8ea"*/}
                                  {/*}}>*/}
                                  {/*<h3 className="pageModuleSubTitle"> Category's value share to Parent*/}
                                  {/*Supplier </h3>*/}
                                  {/*<div style={{height: '15%', width: '100%'}}>&nbsp;</div>*/}
                                  {/*<GaugeChart2 data={[obj.cat_imp_supp_sales]}*/}
                                  {/*id="gauge2"/>*/}
                                  {/*<div className="row" style={{marginTop: '-11%'}}>*/}
                                  {/*<div className="col-xs-12"*/}
                                  {/*style={{fontWeight: 'bold', fontSize: '14px'}}>*/}
                                  {/*{obj.cat_imp_supp_sales}%*/}
                                  {/*</div>*/}
                                  {/*</div>*/}
                                  {/*</div>*/}
                                  {/*</div>*/}
                                  {/*)*/}
                                  {/*}*/}
                                  {/*})()}*/}
                                  {/*/!*<SampleBarChart/>*!/*/}

                                  {/*</div>*/}
                                  {/*</div>*/}
                                  {/*</panel>*/}
                                </div>
                              )
                            })
                          }
                        })()}


                        <Modal show={this.state.suppTopBottombar} bsSize="lg"
                               aria-labelledby="contained-modal-title-lg"
                        >
                          <Modal.Header>

                            <Modal.Title id="contained-modal-title-sm"
                                         style={{textAlign: 'center', fontSize: '14px'}}><span
                              style={{
                                textAlign: 'center',
                                fontSize: '14px'
                              }}><b>Assess Performance by Parent Supplier</b><span
                              style={{textAlign: 'right', float: 'right'}}
                              onClick={() => this.setState({suppTopBottombar: false})}><b>X</b></span></span>
                              <div style={{textAlign: 'center'}}>
                                <div style={{textAlign: 'right'}}>
                                </div>
                              </div>
                            </Modal.Title>

                          </Modal.Header>

                          <Modal.Body style={{fontSize: '14px'}}>
                            A comparison of suppliers based on various metric is pivotal to improved buyer- supplier
                            negotiations. Empowered with data regarding how different suppliers offer similar products
                            at varying prices, a buyer can make more informed decisions to grow his portfolio. The
                            list
                            of top and bottom suppliers will help critically evaluate engagements with buyers.
                          </Modal.Body>
                        </Modal>

                        <div style={{height: '15%', width: '100%'}}>&nbsp;</div>


                        {/*<div className="pageTitle" style={{marginBottom: "20px"}}>*/}
                        <div className="headerBox">
                          <h2 className="pageModuleMainTitle">Assess performance by parent supplier</h2>
                        </div>

                        {/*</div>*/}


                        {/*<div className="row mainBox">*/}
                        {/**/}
                        {/*</div>*/}

                        <div>
                          <div className="row mainBox">
                            <panel>

                              <div className="col-md-12 col-sm-12 col-xs-12 panel-body"
                                   style={{backgroundColor: "#f5f5f5"}}>
                                {(() => {
                                  if (this.props.supplier.topBotData && this.props.supplier.barChartSpinnerCheck != 0) {

                                    return (

                                      <div>
                                        <BootstrapTable
                                          data={this.props.supplier.topBotData.dataframe} options={options}
                                          striped={true}
                                          hover
                                          condensed
                                          pagination={ true }
                                          search={true}
                                          exportCSV={true}
                                        >
                                          <TableHeaderColumn dataField="parent_supplier" isKey={true}
                                                             tdStyle={ {whiteSpace: 'normal'} } width="30%"
                                                             dataSort={true} dataAlign="left">Parent
                                            Supplier</TableHeaderColumn>
                                          <TableHeaderColumn dataField="supplier" tdStyle={ {whiteSpace: 'normal'} }
                                                             dataSort={true}
                                                             dataAlign="left">Supplier</TableHeaderColumn>
                                          <TableHeaderColumn dataField="product" tdStyle={ {whiteSpace: 'normal'} }
                                                             dataSort={true}
                                                             dataAlign="left">Product</TableHeaderColumn>
                                          <TableHeaderColumn dataField="part_by_val" dataFormat={formatSales}
                                                             dataSort={true}
                                                             dataAlign="right">{this.state.paticipationByTab}</TableHeaderColumn>
                                          <TableHeaderColumn dataField="value_growth" dataFormat={formatSales}
                                                             dataSort={true}
                                                             dataAlign="right">{this.state.GrowthTab}</TableHeaderColumn>
                                          <TableHeaderColumn dataField="value_contri" dataFormat={formatSales}
                                                             dataSort={true}
                                                             dataAlign="right">{this.state.ContributionToGrowthTab}</TableHeaderColumn>
                                        </BootstrapTable>

                                      </div>
                                    )
                                  }
                                  else {
                                    return (
                                      <div className="row spinnerPositionBarChart"><Spinner /><h2>Please Wait a
                                        Moment....!</h2></div>
                                    )
                                  }
                                })()}

                              </div>

                            </panel>
                          </div>
                        </div>

                        <Modal show={this.state.suppNegotiationbar} bsSize="lg"
                               aria-labelledby="contained-modal-title-lg"
                        >
                          <Modal.Header>

                            <Modal.Title id="contained-modal-title-sm"
                                         style={{textAlign: 'center', fontSize: '14px'}}><span
                              style={{textAlign: 'center', fontSize: '14px'}}><b>Negotiation Opportunity</b><span
                              style={{textAlign: 'right', float: 'right'}}
                              onClick={() => this.setState({suppNegotiationbar: false})}><b>X</b></span></span>
                              <div style={{textAlign: 'center'}}>
                                <div style={{textAlign: 'right'}}>
                                </div>
                              </div>
                            </Modal.Title>

                          </Modal.Header>
                          <Modal.Body style={{fontSize: '14px'}}>
                            * Both the axes are represented by percentiles.
                            The supplier negotiation clockface is helps you decide the negotiation strategy to be
                            employed when meeting suppliers. This strategy is decided based on the product’s importance
                            to the customer and the profit per store that it brings in. A product with low customer
                            priority score and low profits per store could be delisted. The size of the bubble
                            represents the rate of sale of the product (Volume/No. of stores that the product sold in).
                            A plausible use of this dimension is that a product could move from the ‘Opportunity’ area
                            to the ‘High CPS/High Profit’ sector if its rate of sale is increased.
                          </Modal.Body>
                        </Modal>

                        {/*<div className="pageTitle">*/}
                        {/*<div className="headerBox">*/}
                        {/*<h2 className="pageModuleMainTitle">Negotiation Opportunity</h2>*/}
                        {/*</div>*/}
                        <br/>
                        {/*</div>*/}

                        <Modal show={this.state.bubbleChartModal} bsSize="large"
                               aria-labelledby="contained-modal-title-sm"
                               dialogClassName={'xlModal'}
                               onHide={() => {
                                 this.setState({bubbleChartModal: false})
                               }}>
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-sm text-center" className="pageModuleTitle">Please
                              enter
                              necessary details</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="row" style={{marginLeft: "0px", marginRight: "0px"}}>
                              <div className="mainBox">
                          <span className="glyphicon glyphicon-info-sign pull-right"
                                style={{marginRight: '10px', fontSize: '15px', marginTop: '10px', color: '#00539f'}}
                                onClick={() => {
                                  this.setState({suppNegotiationbar: true});
                                }}></span>
                                <Nav bsStyle="tabs" className="tabsNavPanelList1" activeKey={this.state.activeKey4}
                                     onSelect={this.handleSelect}>
                                  <NavItem className="tabsNavPanelList1" eventKey="1" onClick={() => {
                                    this.setState({activeKey4: "1"});
                                    this.props.bubbleChartSpinnerCheckSuccess(0);
                                    this.props.tableChartSpinnerCheckSuccess(0);
                                    dataStoreUrlParams = "store_type_nego=Main Estate";
                                    this.props.onSaveStoreParam(dataStoreUrlParams);
                                    this.props.onFetchGraph();
                                    this.props.onGenerateTable();
                                  }}><span className="tab_label">Main Estate</span></NavItem>
                                  <NavItem className="tabsNavPanelList1" eventKey="2" onClick={() => {
                                    this.setState({activeKey4: "2"});
                                    this.props.bubbleChartSpinnerCheckSuccess(0);
                                    this.props.tableChartSpinnerCheckSuccess(0);
                                    dataStoreUrlParams = "store_type_nego=Express";
                                    this.props.onSaveStoreParam(dataStoreUrlParams);
                                    this.props.onFetchGraph();
                                    this.props.onGenerateTable();
                                    // browserHistory.push(this.props.location.pathname + "?store_type=Express")
                                  }}><span className="tab_label">Express</span></NavItem>


                                </Nav>
                              </div>

                              {/*------Performance quartile---- */}

                              {/*Header row*/}
                              <div className="col-md-12 col-sm-12 pageModuleSubTitle" style={{marginTop: '20px'}}>
                                <div style={{textAlign: "center"}}> Please select a negotiation strategy below to filter
                                  'Negotiation Opportunity' chart and table
                                </div>
                              </div>

                              {/*Check box row*/}
                              <div className="col-sm-12 col-md-12" style={{marginTop: '30px'}}>
                                <div className="col-md-9 col-sm-9">
                                  {/*Low CPS/Low Profit*/}
                                  <div className="col-xs-2 center-this input">
                                    <label
                                      style={{fontSize: "15px", fontFamily: 'tesco', color: '#c74a52', width: '100%'}}>
                                      <input type="checkbox"
                                             id="PQ1"
                                             style={{marginRight: '5%'}}
                                             onChange={() => {
                                               let pqCurrentSelection = "Low CPS/Low Profit";
                                               let deselect = 0;
                                               let pqApendUrl = '';
                                               let newSelections = '';

                                               if (dataPerformanceUrlParams !== '') {
                                                 dataPerformanceUrlParams = "start&" + dataPerformanceUrlParams;
                                                 let pqSelections = dataPerformanceUrlParams.split('&performance_quartile=');

                                                 for (let i = 1; i < pqSelections.length; i++) {

                                                   if (pqSelections[i] !== pqCurrentSelection) {
                                                     newSelections = newSelections + "&performance_quartile=" + pqSelections[i];
                                                   } else {
                                                     deselect = 1;
                                                   }
                                                 }

                                                 if (deselect == 0) {
                                                   newSelections = newSelections + "&performance_quartile=" + pqCurrentSelection;
                                                 }

                                                 let pq_ajax_param = newSelections.replace('&', '');
                                                 this.props.onSavePFilterParam(pq_ajax_param);
                                               }
                                               else {

                                                 let pq_ajax_param = "performance_quartile=" + pqCurrentSelection;
                                                 this.props.onSavePFilterParam(pq_ajax_param);
                                               }


                                               this.props.bubbleChartSpinnerCheckSuccess(0);
                                               this.props.tableChartSpinnerCheckSuccess(0);
                                               {/*dataPerformanceUrlParams = "performance_quartile=Low CPS/Low Profit";*/
                                               }
                                               {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/
                                               }

                                               this.props.onFetchGraph();
                                               this.props.onGenerateTable();


                                             }}
                                      />
                                      <span className="tooltip">Delist Products</span>
                                      Low CPS/Low Profit
                                    </label>
                                  </div>

                                  {/*Low CPS/High Profit*/}
                                  <div className="col-xs-2 center-this input">
                                    <label
                                      style={{fontSize: "15px", fontFamily: 'tesco', color: '#6e6767', width: '100%'}}>
                                      <input type="checkbox"
                                             id="PQ2"
                                             style={{marginRight: '5%'}}
                                             onChange={() => {
                                               let pqCurrentSelection = "Low CPS/High Profit";
                                               let deselect = 0;
                                               let pqApendUrl = '';
                                               let newSelections = '';

                                               if (dataPerformanceUrlParams !== '') {
                                                 dataPerformanceUrlParams = "start&" + dataPerformanceUrlParams;
                                                 let pqSelections = dataPerformanceUrlParams.split('&performance_quartile=');

                                                 for (let i = 1; i < pqSelections.length; i++) {

                                                   if (pqSelections[i] !== pqCurrentSelection) {
                                                     newSelections = newSelections + "&performance_quartile=" + pqSelections[i];
                                                   } else {
                                                     deselect = 1;
                                                   }
                                                 }

                                                 if (deselect == 0) {
                                                   newSelections = newSelections + "&performance_quartile=" + pqCurrentSelection;
                                                 }

                                                 let pq_ajax_param = newSelections.replace('&', '');
                                                 this.props.onSavePFilterParam(pq_ajax_param);
                                               }
                                               else {

                                                 let pq_ajax_param = "performance_quartile=" + pqCurrentSelection;
                                                 this.props.onSavePFilterParam(pq_ajax_param);
                                               }


                                               this.props.bubbleChartSpinnerCheckSuccess(0);
                                               this.props.tableChartSpinnerCheckSuccess(0);
                                               {/*dataPerformanceUrlParams = "performance_quartile=Low CPS/Low Profit";*/
                                               }
                                               {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/
                                               }

                                               this.props.onFetchGraph();
                                               this.props.onGenerateTable();


                                             }}
                                      />
                                      <span className="tooltip">Hard Bargaining’ for stronger profits – Low importance to customers</span>
                                      Low CPS/High Profit
                                    </label>

                                  </div>

                                  {/*Med CPS/Med Profit*/}
                                  <div className="col-xs-2 center-this input">
                                    <label
                                      style={{fontSize: "15px", fontFamily: 'tesco', color: '#ffa626', width: '100%'}}>
                                      <input type="checkbox"
                                             id="PQ3"
                                             style={{marginRight: '5%'}}
                                             onChange={() => {
                                               let pqCurrentSelection = "Med CPS/Med Profit";
                                               let deselect = 0;
                                               let pqApendUrl = '';
                                               let newSelections = '';

                                               if (dataPerformanceUrlParams !== '') {
                                                 dataPerformanceUrlParams = "start&" + dataPerformanceUrlParams;
                                                 let pqSelections = dataPerformanceUrlParams.split('&performance_quartile=');

                                                 for (let i = 1; i < pqSelections.length; i++) {

                                                   if (pqSelections[i] !== pqCurrentSelection) {
                                                     newSelections = newSelections + "&performance_quartile=" + pqSelections[i];
                                                   } else {
                                                     deselect = 1;
                                                   }
                                                 }

                                                 if (deselect == 0) {
                                                   newSelections = newSelections + "&performance_quartile=" + pqCurrentSelection;
                                                 }

                                                 let pq_ajax_param = newSelections.replace('&', '');
                                                 this.props.onSavePFilterParam(pq_ajax_param);
                                               }
                                               else {

                                                 let pq_ajax_param = "performance_quartile=" + pqCurrentSelection;
                                                 this.props.onSavePFilterParam(pq_ajax_param);
                                               }


                                               this.props.bubbleChartSpinnerCheckSuccess(0);
                                               this.props.tableChartSpinnerCheckSuccess(0);
                                               {/*dataPerformanceUrlParams = "performance_quartile=Low CPS/Low Profit";*/
                                               }
                                               {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/
                                               }

                                               this.props.onFetchGraph();
                                               this.props.onGenerateTable();


                                             }}
                                      />
                                      <span className="tooltip">Area of opportunity. Concession trading – Subs/Ranging/Price. Reduce range to drive</span>
                                      Med CPS/Med Profit
                                    </label>

                                  </div>

                                  {/*High CPS/Low Profit*/}
                                  <div className="col-xs-2 center-this input">
                                    <label
                                      style={{fontSize: "15px", fontFamily: 'tesco', color: '#69b24a', width: '100%'}}>
                                      <input type="checkbox"
                                             id="PQ4"
                                             style={{marginRight: '5%'}}
                                             onChange={() => {
                                               let pqCurrentSelection = "High CPS/Low Profit";
                                               let deselect = 0;
                                               let pqApendUrl = '';
                                               let newSelections = '';

                                               if (dataPerformanceUrlParams !== '') {
                                                 dataPerformanceUrlParams = "start&" + dataPerformanceUrlParams;
                                                 let pqSelections = dataPerformanceUrlParams.split('&performance_quartile=');

                                                 for (let i = 1; i < pqSelections.length; i++) {

                                                   if (pqSelections[i] !== pqCurrentSelection) {
                                                     newSelections = newSelections + "&performance_quartile=" + pqSelections[i];
                                                   } else {
                                                     deselect = 1;
                                                   }
                                                 }

                                                 if (deselect == 0) {
                                                   newSelections = newSelections + "&performance_quartile=" + pqCurrentSelection;
                                                 }

                                                 let pq_ajax_param = newSelections.replace('&', '');
                                                 this.props.onSavePFilterParam(pq_ajax_param);
                                               }
                                               else {

                                                 let pq_ajax_param = "performance_quartile=" + pqCurrentSelection;
                                                 this.props.onSavePFilterParam(pq_ajax_param);
                                               }


                                               this.props.bubbleChartSpinnerCheckSuccess(0);
                                               this.props.tableChartSpinnerCheckSuccess(0);
                                               {/*dataPerformanceUrlParams = "performance_quartile=Low CPS/Low Profit";*/
                                               }
                                               {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/
                                               }

                                               this.props.onFetchGraph();
                                               this.props.onGenerateTable();


                                             }}
                                      />
                                      <span
                                        className="tooltip">Win-Win relationship with supplier to share further profit gains</span>
                                      High CPS/Low Profit
                                    </label>


                                  </div>

                                  {/*High CPS/High Profit*/}
                                  <div className="col-xs-2 center-this input">
                                    <label
                                      style={{fontSize: "15px", fontFamily: 'tesco', color: '#2B7294', width: '100%'}}>
                                      <input type="checkbox"
                                             id="PQ5"
                                             style={{marginRight: '5%'}}
                                             onChange={() => {
                                               let pqCurrentSelection = "High CPS/High Profit";
                                               let deselect = 0;
                                               let pqApendUrl = '';
                                               let newSelections = '';

                                               if (dataPerformanceUrlParams !== '') {
                                                 dataPerformanceUrlParams = "start&" + dataPerformanceUrlParams;
                                                 let pqSelections = dataPerformanceUrlParams.split('&performance_quartile=');

                                                 for (let i = 1; i < pqSelections.length; i++) {

                                                   if (pqSelections[i] !== pqCurrentSelection) {
                                                     newSelections = newSelections + "&performance_quartile=" + pqSelections[i];
                                                   } else {
                                                     deselect = 1;
                                                   }
                                                 }

                                                 if (deselect == 0) {
                                                   newSelections = newSelections + "&performance_quartile=" + pqCurrentSelection;
                                                 }

                                                 let pq_ajax_param = newSelections.replace('&', '');
                                                 this.props.onSavePFilterParam(pq_ajax_param);
                                               }
                                               else {

                                                 let pq_ajax_param = "performance_quartile=" + pqCurrentSelection;
                                                 this.props.onSavePFilterParam(pq_ajax_param);
                                               }


                                               this.props.bubbleChartSpinnerCheckSuccess(0);
                                               this.props.tableChartSpinnerCheckSuccess(0);
                                               {/*dataPerformanceUrlParams = "performance_quartile=Low CPS/Low Profit";*/
                                               }
                                               {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/
                                               }

                                               this.props.onFetchGraph();
                                               this.props.onGenerateTable();


                                             }}
                                      />
                                      <span
                                        className="tooltip">Work collaboratively to jointly solve low profitability</span>
                                      High CPS/High Profit
                                    </label>

                                  </div>
                                </div>
                                <div className="col-md-3 col-sm-3 center-this">
                                  <Button buttonType={'secondary'}
                                          onClick={() => {
                                            this.props.onSavePFilterParam('');
                                            this.props.onFetchGraph();
                                            this.props.onGenerateTable();

                                            document.getElementById("PQ1").checked = false;
                                            document.getElementById("PQ2").checked = false;
                                            document.getElementById("PQ3").checked = false;
                                            document.getElementById("PQ4").checked = false;
                                            document.getElementById("PQ5").checked = false;

                                          }}
                                          style={{marginTop: '-4%', marginLeft: '-7%'}}>Reset Selections</Button>
                                </div>


                              </div>


                              {/*-----Bubble chart-----*/}

                              <div>
                                <div className="mainBox">
                                  {(() => {
                                    if (this.props.supplier.bubbleChartSpinnerCheck != 1) {
                                      return (
                                        <div className="col-md-12 col-sm-12 col-xs-12 spinnerPositionWaterfall">
                                          <Spinner /><h2>Please Wait
                                          a
                                          Moment....!</h2></div>
                                      )
                                    } else {
                                      return (

                                        <div className="col-md-12 col-sm-12 col-xs-12 " style={{marginTop: '2%'}}>
                                          <div style={{float: "right"}}>
                                            <DropdownButton title="" className="glyphicon glyphicon-menu-hamburger"
                                                            pullRight
                                                            style={{
                                                              backgroundColor: "transparent",
                                                              borderColor: "transparent",
                                                              color: "#00539f"
                                                            }} id="dropButtonId">
                                              <MenuItem onClick={() => {
                                                saveImage(document.getElementById("bubbleChart2" + "_svg"), "bubble_chart")
                                              }
                                              }>Save As JPEG</MenuItem>
                                              <MenuItem onClick={() => {
                                                saveDataAsCSV(this.props.supplier.chartData, "bubble_chart.csv")
                                              }
                                              }>Download CSV</MenuItem>
                                            </DropdownButton>
                                          </div>
                                          <BubbleChart2 ref="bubbleChartComp" data={this.props.supplier.chartData}

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
                                          <i style={{fontSize: '12px'}}>*Size of the bubble corresponds to Rate of
                                            Sales</i>

                                          {/*<div className="resetButton" onClick={() => {*/}
                                          {/*dataPerformanceUrlParams = '';*/}
                                          {/*this.props.onSavePageParam("page=1");*/}
                                          {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/}
                                          {/*this.props.onFetchGraph();*/}
                                          {/*this.props.onGenerateTable();*/}
                                          {/*this.props.onRadioChecked('6');*/}
                                          {/*}}><p>View Selections</p></div>*/}

                                        </div>
                                      )
                                    }
                                  })()}


                                  {/*-----Bubble table-----*/}

                                  <Panel>
                                    <div>
                                      {
                                        (() => {

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
                                                  <TableHeaderColumn dataField="base_product_number" isKey={true}
                                                                     dataAlign="center" dataSort={true} width="20%">Product
                                                    ID</TableHeaderColumn>
                                                  <TableHeaderColumn dataField="parent_supplier"
                                                                     tdStyle={ {whiteSpace: 'normal'} } width="20%"
                                                                     dataSort={true} dataAlign="center">Parent
                                                    Supplier</TableHeaderColumn>
                                                  <TableHeaderColumn dataField="sales_ty" dataFormat={formatSales}
                                                                     dataSort={true}
                                                                     dataAlign="center">Sales TY</TableHeaderColumn>
                                                  <TableHeaderColumn dataField="volume_ty" dataFormat={formatVolume}
                                                                     dataSort={true} dataAlign="center">Volume
                                                    TY</TableHeaderColumn>
                                                  <TableHeaderColumn dataField="cgm_ty" dataFormat={formatSales}
                                                                     dataSort={true}
                                                                     dataAlign="center">CGM TY</TableHeaderColumn>
                                                  <TableHeaderColumn dataField="pps" dataSort={true}
                                                                     dataAlign="center">PPS</TableHeaderColumn>
                                                  <TableHeaderColumn dataField="cps" dataSort={true}
                                                                     dataAlign="center">CPS</TableHeaderColumn>
                                                  <TableHeaderColumn dataField="rate_of_sale" dataSort={true}
                                                                     dataAlign="center">Rate
                                                    of Sale</TableHeaderColumn>
                                                </BootstrapTable>

                                              </div>
                                            );

                                          }
                                          else {
                                            return (

                                              <div className="text-center" colSpan="11"><Spinner /><h3>Please Wait a
                                                Moment....!</h3></div>

                                            );
                                          }
                                        })()
                                      }
                                    </div>
                                  </Panel>


                                </div>
                              </div>

                            </div>
                          </Modal.Body>
                        </Modal>

                        <div style={{textAlign: 'center', marginBottom: '10px'}}>
                          <Button buttonType={'primary'} onClick={() => {
                            //For table
                            this.props.onGenerateTable();
                            //For Bubble Graph
                            this.props.onFetchGraph();
                            this.setState({bubbleChartModal: true})
                          }}>Negotiation Opportunity</Button>
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

    onSaveStoreFilterParam: (e) => dispatch(StoreFilterParam(e)),

    //FOR GETTING FILTERS DATA
    onGenerateUrlParamsString: (e) => {
      return dispatch(GenerateUrlParamsString(e));
    },
    //FOR GETTING FILTERS DATA ON INITIAL LOAD
    onGenerateUrlParamsString2: (e) => {
      return dispatch(GenerateUrlParamsString2(e));
    },

    //FLAG FOR KNOWING DEFAULT PAGE LOAD
    onGenerateUrlParamsString3: (e) => {
      return dispatch(GenerateUrlParamsString3(e));
    },

    onGenerateCheckedList: (a, b) => dispatch(generateCheckedList(a, b)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);

