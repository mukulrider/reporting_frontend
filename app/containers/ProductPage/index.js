/*
 *
 * ProductPage
 *
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// or in ECMAScript 5

import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import $ from 'jquery';
import DualLineChart from 'components/DualLineChart';
import FiltersProduct from 'components/FiltersProduct';
import Panel from 'components/panel';
import Spinner from 'components/spinner';
import {Modal, Nav, NavItem, DropdownButton, MenuItem} from 'react-bootstrap';
import {saveImage, saveDataAsCSV} from './../../utils/exportFunctions';
import {createStructuredSelector} from 'reselect';
import makeSelectProductPage from './selectors';
import messages from './messages';
import TopFilterProduct from "components/TopFilterProduct";
require('react-bootstrap-table/css/react-bootstrap-table.css')
var dateFormat = require('dateformat');

import {
  makeUrlParamsString,
} from './selectors';

import {
  saveWeekParam,
  productPageValues,
  saveMetricParam,
  saveProduct,
  saveProductForTrend,
  productTrend,
  fetchSaveWeekParam,
  generateUrlParamsString,
  checkboxWeekChange,
  SaveWeek,
  getWeekFilter,
  tabsAndApplySpinner,
  defaultGreyScreen,
  StoreFilterParam,
} from './actions';

import styles from './style.scss';


export class ProductPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {

    let defaultFilterUrlParams = localStorage.getItem('urlParams');
    console.log('defaultFilterUrlParams', defaultFilterUrlParams);

    if (defaultFilterUrlParams) {
      console.log('defaultFilterUrlParams', defaultFilterUrlParams);
      this.props.onGenerateUrlParamsString(defaultFilterUrlParams);
    } else {
      this.props.onGenerateUrlParamsString('');
    }


    let dataWeekParams = this.props.ProductPage.dataWeekParams;
    let dataMetricParams = this.props.ProductPage.dataMetricParams;
    this.props.onGetFilter('default');
    this.props.onSaveMetricParam(dataMetricParams);

  };

  cellButton = (cell, row, enumObject, rowIndex) => {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          console.log("Inside REact Button click!", this)
          this.setState({lgShow: true});
          this.setState({showSupplierInfoModalFlag: true});
          let dataProduct = "product=" + row.product;
          this.props.onSaveProduct(dataProduct);
          this.setState({product: row.product, infoModalHeader: "Parent Supplier Info : " + row.product});
        }}
      >View
      </button>
    )
  }

  cellButton2 = (cell, row, rowIndex) => {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          console.log("Inside REact Button click!", this)
          let dataProduct = "product=" + row.product;
          this.props.onSaveProductForTrend(dataProduct);
          this.props.onProductTrend();
          this.setState({product: row.product, showSalesTrendModalFlag: true});
        }}
      >View
      </button>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      smShow: false,
      lgShow: false,
      activePage: 1,
      activeKey: "1",
      activeKey2: "7",
      dataWeekParams: "Latest Week",
      showSupplierInfoModalFlag: false,
      showSalesTrendModalFlag: false,
      infoModalHeader: '',
      product: '',
      ty_text: "Sales TY in £",
      ly_text: "Sales LY in £",
      y_axis_text: "Sales Value",
      page_title: "Value Performance",
      SelectProducts: "[]"
    };
  }

  formatMetric = (cell, row) => {
    // console.log("Cell:",row.product,cell);
    // console.log(row);
    if (cell >= 1000 || cell <= -1000) {
      let rounded = Math.round(cell / 1000);
      if (this.state.y_axis_text == "Sales Volume") {
        return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K')
      }
      else {
        return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');
      }
    }
    else {
      if (this.state.y_axis_text == "Sales Volume") {
        return (Math.round(cell));
      }
      else {
        return ('£ ' + Math.round(cell));
      }
    }
  }

  formatGlyphicon = (cell) => {
    if (cell > 0) {
      return '<i class="glyphicon glyphicon-triangle-top productTablePositive"></i>&nbsp' + cell + '%';
    }
    else if (cell < 0) {
      return '<i class="glyphicon glyphicon-triangle-bottom productTableNegative"></i>&nbsp' + cell + '%';
    } else if (cell = "NA") {
      return 'NA*';
    } else {
      return '<i class="glyphicon glyphicon-minus-sign productTableNeutral"></i>&nbsp' + cell + '%';
    }
  }

  prodList = [];

  render() {
    //For url parameters
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
        value: this.props.ProductPage.data && this.props.ProductPage.data.table_data ? this.props.ProductPage.data.table_data.length : 0
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
    return (
      <Panel>
        <Helmet
          title="Products"
          meta={[
            {name: 'description', content: 'Description of Products'},
          ]}
        />
        <div id="productPage" ref="productPage">
          <div style={{
            height: '100%',
            position: 'fixed',
            width: '18%',
            paddingRight: '1%',
            overflowX: 'hidden',
            overflowY: 'scroll',
            borderTop: '1px solid #ccc'
          }}>


            {(() => {
              if (this.props.ProductPage.sideFilter) {
                return (
                  <FiltersProduct sideFilter={this.props.ProductPage.sideFilter}
                                  location={this.props.location}
                                  userParams={this.props.ProductPage.userParams}
                                  week_data={this.props.ProductPage.week_filter_data}
                                  previous_week_selection={this.props.ProductPage.filter_week_selection}
                                  onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                                  onProductPage={this.props.onProductPageValues}
                                  onSaveWeek={this.props.onSaveWeek}
                                  onCheckboxWeekChange={this.props.onCheckboxWeekChange}
                                  onGetFilter={this.props.onGetFilter}
                                  filter_week_selection={this.props.ProductPage.filter_week_selection}
                                  urlParamsString={this.props.ProductPage.urlParamsString}
                                  tabsAndApplySpinner={this.props.tabsAndApplySpinner}
                                  defaultGreyScreen={this.props.defaultGreyScreen}
                  />
                )
              } else {
                return (
                  <div style={{padding: '10px'}}>LOADING FILTERS</div>
                )
              }
            })()}


          </div>
          <div className="col-xs-10" style={{float: 'right'}}>
            <div className="col-xs-12">
              <div className="pageTitle">
                {(() => {
                  if (this.props.ProductPage.filter_week_selection) {
                    return (
                      <span>Product View - {(this.props.ProductPage.filter_week_selection).substring(11, 17)}</span>
                    )
                  } else {
                    return (
                      <span>Product View - {this.props.ProductPage.data && this.props.ProductPage.data.latest_week ? this.props.ProductPage.data.latest_week:"Latest Week"}  </span>
                    )
                  }
                })()}
              </div>
              <div>
                {(() => {
                  if (this.props.ProductPage.week_filter_data) {
                    return (
                      <TopFilterProduct
                        sideFilter={this.props.ProductPage.sideFilter}
                        location={this.props.location}
                        userParams={this.props.ProductPage.userParams}
                        week_filter_data={this.props.ProductPage.week_filter_data}
                        previous_week_selection={this.props.ProductPage.filter_week_selection}
                        onSaveWeekParam = {this.props.onSaveWeekParam}
                        onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                        onProductPage={this.props.onProductPageValues}
                        onSaveWeek={this.props.onSaveWeek}
                        onCheckboxWeekChange={this.props.onCheckboxWeekChange}
                        onGetFilter={this.props.onGetFilter}
                        filter_week_selection={this.props.ProductPage.filter_week_selection}
                        urlParamsString={this.props.ProductPage.urlParamsString}
                        tabsAndApplySpinner={this.props.tabsAndApplySpinner}
                        onSaveStoreFilterParam={this.props.onSaveStoreFilterParam}
                      />
                    )
                  }
                })()}
              </div>

            </div>

                  <div className="col-xs-12">
                    <Nav bsStyle="tabs" className="tabsCustom tabsCustomInner" activeKey={this.state.activeKey2}
                         onSelect={this.handleSelect}>
                      <NavItem style={{fontSize: '16px'}}
                               eventKey="7" className="tabsNavPanelList1" onClick={() => {
                        this.setState({
                          activeKey2: "7",
                          ty_text: "Sales TY in £",
                          ly_text: "Sales LY in £",
                          y_axis_text: "Sales Value",
                          page_title: "Value Performance"
                        });
                        this.props.tabsAndApplySpinner(0);
                        let dataMetricParams = "metric_flag=Value";
                        this.props.onSaveMetricParam(dataMetricParams);
                      }}
                      ><span className="tab_label">Value</span></NavItem>
                      <NavItem style={{fontSize: '16px'}}
                               eventKey="8" className="tabsNavPanelList1" onClick={() => {
                        this.setState({
                          activeKey2: "8",
                          ty_text: "Volume TY in units",
                          ly_text: "Volume LY in units",
                          y_axis_text: "Sales Volume",
                          page_title: "Volume Performance"
                        });
                        this.props.tabsAndApplySpinner(0);
                        let dataMetricParams = "metric_flag=Volume";

                        this.props.onSaveMetricParam(dataMetricParams);
                      }}
                      ><span className="tab_label">Volume</span></NavItem>
                      <NavItem style={{fontSize: '16px'}}
                               eventKey="9" className="tabsNavPanelList1" onClick={() => {
                        this.setState({
                          activeKey2: "9",
                          ty_text: "COGS TY in £",
                          ly_text: "COGS LY in £",
                          y_axis_text: "COGS",
                          page_title: "COGS Performance"
                        });
                        this.props.tabsAndApplySpinner(0);
                        let dataMetricParams = "metric_flag=cogs";
                        this.props.onSaveMetricParam(dataMetricParams);
                      }}
                      ><span className="tab_label">COGS</span></NavItem>
                      <NavItem style={{fontSize: '16px'}}
                               eventKey="10" className="tabsNavPanelList1" onClick={() => {
                        this.setState({
                          activeKey2: "10",
                          ty_text: "Profit TY in £",
                          ly_text: "Profit LY in £",
                          y_axis_text: "Profit",
                          page_title: "Profit Performance"
                        });
                        this.props.tabsAndApplySpinner(0);
                        let dataMetricParams = "metric_flag=cgm";
                        this.props.onSaveMetricParam(dataMetricParams);
                      }}
                      ><span className="tab_label">CGM</span></NavItem>
                      {/*<NavItem style={{fontSize: '16px'}}
                       eventKey="11" className="tabsNavPanelList1" onClick={() => {
                       this.setState({
                       activeKey2: "11",
                       ty_text: "Waste Value TY",
                       ly_text: "Waste Value LY",
                       y_axis_text: "Waste Value",
                       page_title: "Waste Performance"
                       });
                       this.props.tabsAndApplySpinner(0);
                       let dataMetricParams = "metric_flag=Waste";
                       this.props.onSaveMetricParam(dataMetricParams);
                       }}
                       ><span className="tab_label">Waste</span></NavItem>*/}
                      {/*                <NavItem style={{ fontSize: '16px' }}
                       eventKey="12" className="tabsCustomList" onClick={() => {
                       this.setState({activeKey: "12"});
                       let dataMetricParams="metric_flag=Stock";
                       this.props.onSaveMetricParam(dataMetricParams);
                       }}
                       ><b className="tab_label">Stock</b></NavItem>
                       <NavItem style={{ fontSize: '16px' }}
                       eventKey="13" className="tabsCustomList" onClick={() => {
                       this.setState({activeKey: "13"});
                       let dataMetricParams="metric_flag=Price";
                       this.props.onSaveMetricParam(dataMetricParams);
                       }}
                       ><b className="tab_label">Price</b></NavItem>*/}
                    </Nav>
                  </div>
                  <div className="col-xs-12">
                    <h2 className="pageModuleMainTitle col-xs-12">
                      <b>Products {this.state.y_axis_text} Info </b>
                    </h2>
                    <div>
                      {
                        (() => {
                          if (this.props.ProductPage.data && this.props.ProductPage.data.table_data && this.props.ProductPage.tabsApplySpinner) {
//console.log("This is table data length:",this.props.ProductPage.data.table_data.length);
                      return (
                        <div>
                          <BootstrapTable
                            data={this.props.ProductPage.data.table_data} selectRow={selectRowProp} options={options}
                            striped={true}
                            hover
                            condensed
                            pagination={ true }
                            search={true}
                            exportCSV={true}
                          >
                            <TableHeaderColumn width="225" tdStyle={ {whiteSpace: 'normal'} } dataField="product" isKey={true}
                                               dataAlign="center" dataSort>Product Description</TableHeaderColumn>
                            <TableHeaderColumn dataField="product_id" hidden dataAlign="center">Product</TableHeaderColumn>
                            <TableHeaderColumn dataField="x_ty" dataFormat={this.formatMetric} dataSort={true}
                                               dataAlign="center">TY</TableHeaderColumn>
                            <TableHeaderColumn dataField="x_ly" dataFormat={this.formatMetric} dataSort={true}
                                               dataAlign="center">LY</TableHeaderColumn>
                            <TableHeaderColumn dataField="x_lw" dataFormat={this.formatMetric} dataSort={true}
                                               dataAlign="center">LW</TableHeaderColumn>
                            <TableHeaderColumn dataField="x_lfl_ty" dataFormat={this.formatMetric} dataSort={true}
                                               dataAlign="center">LFL TY</TableHeaderColumn>
                            <TableHeaderColumn dataField="x_lfl_ly" dataFormat={this.formatMetric} dataSort={true}
                                               dataAlign="center">LFL LY</TableHeaderColumn>
                            <TableHeaderColumn dataField="wow" width="11%" hidden={(()=>{
                              if (this.state.dataWeekParams=="Latest Week"){
                                return false;
                              }
                              else {
                                return true;
                              }
                            })()}  dataFormat={this.formatGlyphicon} dataSort={true}
                                               dataAlign="center">WOW % Change</TableHeaderColumn>
                            <TableHeaderColumn dataField="yoy" width="11%" dataFormat={this.formatGlyphicon} dataSort={true}
                                               dataAlign="center">YOY % Change</TableHeaderColumn>
                            <TableHeaderColumn dataField="lfl_percent" width="11%" dataFormat={this.formatGlyphicon} dataSort={true}
                                               dataAlign="center">LFL % Change</TableHeaderColumn>
                            <TableHeaderColumn dataFormat={this.cellButton} tdStyle={ {whiteSpace: 'normal'} } dataAlign="center">Supplier Info</TableHeaderColumn>
                            <TableHeaderColumn dataFormat={this.cellButton2} dataAlign="center">Trend</TableHeaderColumn>
                          </BootstrapTable>
                          <i style={{textAlign:"center",fontSize: "14px"}}>* Indicates this product was not present for the previous week/year</i>
                          <button
                            type="button"
                            style={{float:'right',fontSize: "14px"}}
                            className="btn btn-danger"
                            onClick={() => {
                              let objString = '';
                              let selected=this.state.SelectProducts;
                              if(selected!=='[]'){
                                for(let i=0;i<selected.length;i++){
                                  objString += 'base_product_number=' + selected[i] + '&'
                                }
                                objString = objString.slice(0, objString.length - 1);
                                console.log(objString);
let domain="172.20.181.12";
                                document.cookie = `PreselectionFromNego=1;domain=${domain};path=/;`;
                                document.cookie = `PreselectionFromNegoData=${objString};domain=${domain};path=/;`;
                                console.log("Document",document);
                                console.log("Document Cookie",document.cookie);                                window.location = '/ranging/delist/';
                              }else{
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

                              <div className="text-center" colSpan="11" style={{textAlign: 'center'}}><Spinner />Please
                                Wait a Moment....!</div>

                            );
                          }
                        })()
                      }

                    </div>
                  </div>

                  {/*Supplier Info Modal*/}
                  <Modal show={this.state.showSupplierInfoModalFlag} bsSize="lg" style={{marginTop: '10%'}}
                         aria-labelledby="contained-modal-title-lg"
                  >
                    <Modal.Header>

                      <Modal.Title id="contained-modal-title-sm" className="pageModuleTitle">
                        <span className="pageModuleTitle"><b>{this.state.infoModalHeader}</b>
                         <span style={{textAlign: 'right', float: 'right'}}
                               onClick={() => {
                                 this.setState({showSupplierInfoModalFlag: false})
                               }}>
                          <b>X</b></span></span>
                      </Modal.Title>

                    </Modal.Header>
                    <Modal.Body className="infoModalText">
                      <div>
                        {
                          (() => {
                            if (this.props.ProductPage.supplier_info && this.props.ProductPage.supplier_info.data && this.props.ProductPage.tabsApplySpinner) {

                              return (
                                <div>
                                  <BootstrapTable
                                    data={this.props.ProductPage.supplier_info.data} options={options}
                                    striped={true}
                                    hover
                                    condensed
                                    pagination={ true }
                                    search={true}
                                    exportCSV={true}
                                  >
                                    <TableHeaderColumn isKey={true} width="225" tdStyle={ {whiteSpace: 'normal'} }
                                                       dataField="parent_supplier" dataSort={true}
                                                       dataAlign="center">Parent Supplier</TableHeaderColumn>
                                    <TableHeaderColumn dataField="metric_ty" dataSort={true} dataAlign="center"
                                                       dataFormat={this.formatMetric}>{this.state.y_axis_text}
                                      TY</TableHeaderColumn>
                                    <TableHeaderColumn dataField="metric_ly" dataSort={true} dataAlign="center"
                                                       dataFormat={this.formatMetric}>{this.state.y_axis_text}
                                      LY</TableHeaderColumn>
                                    <TableHeaderColumn dataField="metric_ty_lfl" dataSort={true} dataAlign="center"
                                                       dataFormat={this.formatMetric}>{this.state.y_axis_text} TY
                                      LFL</TableHeaderColumn>
                                    <TableHeaderColumn dataField="metric_ly_lfl" dataSort={true} dataAlign="center"
                                                       dataFormat={this.formatMetric}>{this.state.y_axis_text} LY
                                      LFL</TableHeaderColumn>
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
                    </Modal.Body>
                  </Modal>

                  {/*Trend LineChart Modal*/}
                  <Modal show={this.state.showSalesTrendModalFlag} bsSize="lg" style={{marginTop: '10%'}}
                         aria-labelledby="contained-modal-title-lg"
                  >
                    <Modal.Header>

                      <Modal.Title id="contained-modal-title-sm" className="pageModuleTitle">
                        <span className="pageModuleTitle"><b>{this.state.y_axis_text} Trend : {this.state.product}</b>
                         <span style={{textAlign: 'right', float: 'right'}}
                               onClick={() => {
                                 this.setState({showSalesTrendModalFlag: false})
                               }}>
                          <b>X</b></span></span>
                      </Modal.Title>

                    </Modal.Header>
                    <Modal.Body className="infoModalText">
                      <div>
                        {(() => {
                          if (this.props.ProductPage.product_trend && this.props.ProductPage.product_trend.data && this.props.ProductPage.tabsApplySpinner) {


                            return (
                              <div>
                                <div style={{float: "right"}}>
                                  <DropdownButton title="" className="glyphicon glyphicon-menu-hamburger" pullRight
                                                  style={{
                                                    backgroundColor: "transparent",
                                                    borderColor: "transparent",
                                                    color: "#00539f"
                                                  }} id="dropButtonId">
                                    <MenuItem onClick={() => {
                                      saveImage(this.refs.chartImage.refs.image, "Products " + this.state.y_axis_text + " Trend " + dateFormat(this.state.now, "dS mmmm yyyy, h:MM:ss"))
                                    }
                                    }>Save As JPEG</MenuItem>
                                    <MenuItem onClick={() => {
                                      saveDataAsCSV(this.props.ProductPage.product_trend.data, "Products " + this.state.y_axis_text + " Trend_" + dateFormat(this.state.now, "dS mmmm yyyy, h:MM:ss") + ".csv")
                                    }
                                    }>Download CSV</MenuItem>
                                  </DropdownButton>
                                </div>
                                <DualLineChart ref="chartImage" ty_text={this.state.ty_text}
                                               ly_text={this.state.ly_text}
                                               y_axis_text={this.state.y_axis_text}
                                               data={this.props.ProductPage.product_trend.data}/>
                              </div>
                            )


                          } else {
                            return (
                              <div className="text-center" colSpan="11"><Spinner />Please Wait a Moment....!</div>
                            );
                          }
                        })()}
                      </div>
                    </Modal.Body>
                  </Modal>

                  {/*<div >
                   <div className="col-xs-12">
                   <h2 className="pageModuleMainTitle">{this.state.page_title}</h2>
                   </div>
                   <div className="col-xs-12">
                   <div className="col-xs-3" style={{marginTop: '8%'}}>

                   {(() => {
                   if (this.props.ProductPage.data && this.props.ProductPage.data.comp_data  && this.props.ProductPage.tabsApplySpinner) {
                   return this.props.ProductPage.data.comp_data.map((obj) => {

                   console.log("ProductPage:");
                   console.log(this.refs.productPage);
                   let divToprint=this.refs.productPage;
                   let width=parseFloat(divToprint.getAttribute("width"));
                   let height=parseFloat(divToprint.getAttribute("height"));
                   let newWin=window.open('','printMap');
                   console.log("NewWin:",newWin);
                   $(newWin.document).ready(function() {
                   let printDocHead = $('<head></head>').append($('style[type="text/css"]').clone());
                   console.log("DivToPrintHtml",printDocHead);
                   let printDocBodyHtml = $(divToprint).html().replace(/sizePerPage: 5/g, "sizePerPage: 25");
                   //console.log("DocBodyHtml:",printDocBodyHtml);
                   let printDocBody = $('<body></body>').html(printDocBodyHtml);
                   let printDoc = $('<html></html>').append(printDocHead).append(printDocBody);
                   //console.log("PrintDoc:",printDoc);
                   newWin.document.write(printDoc[0].outerHTML);
                   //newWin.document.close();
                   newWin.focus();
                   setTimeout(function(){
                   newWin.print();
                   console.log("print Fired:");
                   //newWin.close();
                   }, 5);
                   });
                   return (
                   <table key={obj.metric_title }
                   className="table table-hover table-striped table-bordered table_cust">
                   <thead style={{verticalAlign: 'middle', color: '#FFFFFF'}}>
                   <tr>
                   <th colSpan="12" className="pageModuleSubTitle"><b>{obj.metric_title}</b></th>
                   </tr>
                   <tr>
                   <th colSpan="6" style={{
                   verticalAlign: 'middle',
                   fontSize: '18px',
                   backgroundColor: '#1782CA',
                   textAlign: 'center'
                   }}>
                   {(() => {
                   if (this.state.y_axis_text == 'Sales Volume') {


                   return (obj.metric_all / 1000).toFixed(0) + 'K'


                   } else {
                   return '£ ' + (obj.metric_all / 1000).toFixed(0) + 'K'
                   }
                   })()}
                   </th>
                   <th colSpan="6" style={{
                   verticalAlign: 'middle',
                   fontSize: '18px',
                   backgroundColor: '#1782CA',
                   textAlign: 'center'
                   }}>
                   {(() => {
                   if (this.state.y_axis_text == 'Sales Volume') {


                                    return 'LFL: ' + (obj.metric_lfl / 1000).toFixed(0) + 'K'


                   }else {
                   return 'LFL: £ ' + (obj.metric_lfl / 1000).toFixed(0) + 'K'
                   }
                   }
                   )()}
                   </th>
                   </tr>
                   </thead>
                   <tbody>
                   <tr style={{ verticalAlign: 'middle',color:'#000000',backgroundColor:'#FFFFFF' }}>
                   <td colSpan="4"><span className={(() => {
                   if (obj.wow_change > 0) {
                   return "glyphicon glyphicon-triangle-top productTablePositive"
                   } else {
                   return "glyphicon glyphicon-triangle-bottom productTableNegative"
                   }
                   })()}>&nbsp;</span> <span style={{fontSize:'16px'}}>{(obj.wow_change)+'%'} </span>
                   <br/><br/><h4 style={{color:'#00539f'}}>WOW</h4></td>
                   <td colSpan="4"><span className={(() => {
                   if (obj.yoy_change > 0) {
                   return "glyphicon glyphicon-triangle-top productTablePositive"
                   } else {
                   return "glyphicon glyphicon-triangle-bottom productTableNegative"
                   }
                   })()}>&nbsp;</span> <span style={{fontSize:'16px'}}>{(obj.yoy_change)+'%'} </span>
                   <br/><br/><h4 style={{color:'#00539f'}}>YOY</h4></td>
                   <td colSpan="4"><span className={(() => {
                   if (obj.lfl_change > 0) {
                   return "glyphicon glyphicon-triangle-top productTablePositive"
                   } else {
                   return "glyphicon glyphicon-triangle-bottom productTableNegative"
                   }
                   })()}>&nbsp;</span> <span style={{fontSize:'16px'}}>{(obj.lfl_change)+'%'} </span>
                   <br/><br/><h4 style={{color:'#00539f'}}>LFL</h4></td>
                   </tr>

                   </tbody>
                   </table>
                   )

                   });
                   } else {
                   return (

                   <div className="row">
                   <div className="col-md-9 col-sm-9 col-xs-9 text-center" style={{marginTop: '-17%'}}><Spinner />Please Wait a Moment....!</div>
                   </div>

                   );
                   }
                   })()}

                   </div>

                   </div>

                   </div>
                   */}
                </div>
              )
            }
          })()}


        </div>
      </Panel>
    );
  }
}

ProductPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ProductPage: makeSelectProductPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onProductPageValues: (e) => dispatch(productPageValues(e)),
    onSaveWeekParam: (e) => dispatch(saveWeekParam(e)),
    onSaveMetricParam: (e) => dispatch(saveMetricParam(e)),
    onSaveProduct: (e) => dispatch(saveProduct(e)),
    onSaveProductForTrend: (e) => dispatch(saveProductForTrend(e)),
    onProductTrend: (e) => dispatch(productTrend(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
    onSaveWeek: (e) => dispatch(SaveWeek(e)),
    onCheckboxWeekChange: (e) => dispatch(checkboxWeekChange(e)),
    onGetFilter: (e) => dispatch(getWeekFilter(e)),
//  onGenerateSideFilter: (e) => dispatch(generateSideFilter(e)),
//  onFetchSaveWeekParam: (e) => dispatch(fetchSaveWeekParam(e)),
    onSaveStoreFilterParam: (e) => dispatch(StoreFilterParam(e)),
    tabsAndApplySpinner: (e) => dispatch(tabsAndApplySpinner(e)),
    defaultGreyScreen: (e) => dispatch(defaultGreyScreen(e)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);

