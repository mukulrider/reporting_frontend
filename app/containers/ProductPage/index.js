/*
 *
 * ProductPage
 *
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// or in ECMAScript 5

import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as d3 from 'd3';
import $ from 'jquery';
import DualLineChart from 'components/DualLineChart';
import FiltersProduct from 'components/FiltersProduct';
import Panel from 'components/panel';
import Button from 'components/button';
import Spinner from 'components/spinner';
import { Nav,NavItem,DropdownButton, MenuItem } from 'react-bootstrap';
import {saveImage,saveDataAsCSV} from './../../utils/exportFunctions';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectProductPage from './selectors';
import messages from './messages';
require('react-bootstrap-table/css/react-bootstrap-table.css')

import {
  makeUrlParamsString,
} from './selectors';
import {
  saveWeekParam,productPageValues,saveMetricParam,fetchSaveWeekParam,generateUrlParamsString,checkboxWeekChange,
  SaveWeek,getWeekFilter,
} from './actions';

import styles from './style.scss';

export class ProductPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    let dataWeekParams = this.props.ProductPage.dataWeekParams;
    let dataMetricParams = this.props.ProductPage.dataMetricParams;
    console.log('dataWeekParams',dataWeekParams);
    console.log('dataMetricParams',dataMetricParams);
    this.props.onGetFilter();
    this.props.onSaveMetricParam(dataMetricParams);
    this.props.onGenerateUrlParamsString();

    console.log('Function called from index');

  };

  constructor(props) {
    super(props);
    this.state = {
      smShow: false,
      lgShow: false,
      activePage: 1,
      activeKey: "1",
      activeKey2: "7",
      ty_text:"Sales TY in £",
      ly_text:"Sales LY in £",
      y_axis_text:"Sales Value",
      page_title:"Value Performance"
    };
  }

  formatSales = (cell) =>{
  if (cell >= 1000 || cell <= -1000) {
    let rounded = Math.round(cell / 1000);
    return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');
  }
  else {
    return ('£ ' + Math.round(cell));
  }
}

  formatVolume = (cell) => {
  if (cell >= 1000 || cell <= -1000) {
    let rounded = Math.round(cell / 1000);
    return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

  } else {
    return (Math.round(cell));
  }
}

  diffColumnFormatter=(cell)=> {
  if (cell > 0) {
    return '<i class="glyphicon glyphicon-chevron-up productTablePositive"></i>&nbsp'+ cell+'%';
  }
  else if (cell < 0) {
    return '<i class="glyphicon glyphicon-chevron-down productTableNegative"></i>&nbsp'+ cell+'%';
  } else {
    return '<i class="glyphicon glyphicon-minus-sign productTableNeutral"></i>&nbsp'+ cell+'%';
  }

}

  tickColumnFormatter=(cell)=> {

  if (cell == 1) {
    return '<i class="glyphicon glyphicon-ok-sign productTablePositive"></i>&nbsp'+ cell;
  }
  else {
    return '<i class="glyphicon glyphicon-remove-sign productTableNegative"></i>&nbsp'+ cell;
  }
}
  render() {
    //For url parameters
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: '15', value: 15
      }, {
        text: 'All', value: 25
      } ], // you can change the dropdown list for size per page
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


    return (
      <Panel>
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
              week_data={this.props.ProductPage.week_filter_data}
              previous_week_selection={this.props.ProductPage.filter_week_selection}
              onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
              onProductPage={this.props.onProductPageValues}
              onSaveWeek={this.props.onSaveWeek}
              onCheckboxWeekChange={this.props.onCheckboxWeekChange}
              onGetFilter={this.props.onGetFilter}
              />
              )
              } else {
              return (
              <div style={{padding: '10px'}}>LOADING FILTERS</div>
              )
              }
              })()}





            </div>
          <div className="col-xs-10" style={{ float: 'right' }}>
            <div className="col-xs-12">
              <div className="pageTitle">
                {(() => {
                  if (this.props.ProductPage.filter_week_selection) {
                    return (
                      <span>Product View - {(this.props.ProductPage.filter_week_selection).substring(11,17)}</span>
                    )
                  } else {
                    return (
                      <span>Product View - Latest Week  </span>
                    )
                  }
                })()}
              </div>
              <Nav bsStyle="tabs" className="tabsCustom" activeKey={this.state.activeKey} >
                <NavItem style={{ fontSize: '16px' ,width:'16%',textAlign:'center'}}
                  className=" tabsCustomList" eventKey="1" onClick={() => {
                  this.setState({activeKey: "1"});
                  let dataWeekParams="week_flag=Latest Week";
                  this.props.onSaveWeekParam(dataWeekParams);
                  /*
                  let week_no = "time_period=13_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
            this.props.onWeekTabClick("Week: 13 weeks ")*/
                  }}
                ><span className="tab_label">Selected Week</span></NavItem>
                <NavItem style={{ fontSize: '16px' ,width:'16%',textAlign:'center'}}
                  className="tabsCustomList" eventKey="2" onClick={() => {
                  this.setState({activeKey: "2"});
                  let dataWeekParams="week_flag=4";
                  this.props.onSaveWeekParam(dataWeekParams);
                  /*
                  let week_no = "time_period=26_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
            this.props.onWeekTabClick("Week: 26 weeks ")*/
                  }}
                ><span className="tab_label">Last 4 Weeks</span></NavItem>
                <NavItem style={{ fontSize: '16px' ,width:'16%',textAlign:'center'}}
                  className="tabsCustomList" eventKey="3" onClick={() => {
                  this.setState({activeKey: "3"});
                  let dataWeekParams="week_flag=13";
                  this.props.onSaveWeekParam(dataWeekParams);
                  }}
                ><span className="tab_label">Last 13 Weeks</span></NavItem>
                <NavItem style={{ fontSize: '16px' ,width:'16%',textAlign:'center'}}
                  className="tabsCustomList" eventKey="4" onClick={() => {
                  this.setState({activeKey: "4"});
                  let dataWeekParams="week_flag=26";
                  this.props.onSaveWeekParam(dataWeekParams);
                  }}
                ><span className="tab_label">Last 26 Weeks</span></NavItem>
                <NavItem style={{ fontSize: '16px' ,width:'16%',textAlign:'center'}}
                  className="tabsCustomList" eventKey="5" onClick={() => {
                  this.setState({activeKey: "5"});
                  let dataWeekParams="week_flag=YTD";
                  this.props.onSaveWeekParam(dataWeekParams);
                  }}
                ><span className="tab_label">YTD</span></NavItem>
                {/*<NavItem style={{ fontSize: '16px' ,width:'16%',textAlign:'center'}}
                  className="tabsCustomList" eventKey="6" onClick={() => {
                  this.setState({activeKey: "6"});
                  let dataWeekParams="week_flag=PTD";
                  }}
                ><span className="tab_label">PTD</b></NavItem>*/}
              </Nav>
            </div>

            <div className="col-xs-12">
              <Nav bsStyle="tabs" className="tabsCustom tabsCustomInner" activeKey={this.state.activeKey2} onSelect={this.handleSelect}>
                <NavItem style={{ fontSize: '16px' }}
                  eventKey="7" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "7",ty_text:"Sales TY in £",ly_text:"Sales LY in £",y_axis_text:"Sales Value",page_title:"Value Performance"});
                  let dataMetricParams="metric_flag=Value";
                  this.props.onSaveMetricParam(dataMetricParams);
                  }}
                ><span className="tab_label">Value</span></NavItem>
                <NavItem style={{ fontSize: '16px' }}
                  eventKey="8" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "8",ty_text:"Volume TY in units",ly_text:"Volume LY in units",y_axis_text:"Sales Volume",page_title:"Volume Performance"});
                  let dataMetricParams="metric_flag=Volume";

                  this.props.onSaveMetricParam(dataMetricParams);
                  }}
                ><span className="tab_label">Volume</span></NavItem>
                <NavItem style={{ fontSize: '16px' }}
                  eventKey="9" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "9",ty_text:"COGS TY in £",ly_text:"COGS LY in £",y_axis_text:"COGS",page_title:"COGS Performance"});
                  let dataMetricParams="metric_flag=cogs";
                  this.props.onSaveMetricParam(dataMetricParams);
                  }}
                ><span className="tab_label">COGS</span></NavItem>
                <NavItem style={{ fontSize: '16px' }}
                  eventKey="10" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "10",ty_text:"Profit TY in £",ly_text:"Profit LY in £",y_axis_text:"Profit",page_title:"Profit Performance"});
                  let dataMetricParams="metric_flag=cgm";
                  this.props.onSaveMetricParam(dataMetricParams);
                  }}
                ><span className="tab_label">CGM</span></NavItem>
                <NavItem style={{ fontSize: '16px' }}
                  eventKey="11" className="tabsCustomList" onClick={() => {
                  this.setState({activeKey2: "11",ty_text:"Waste Value TY",ly_text:"Waste Value LY",y_axis_text:"Waste Value",page_title:"Waste Performance"});
                  let dataMetricParams="metric_flag=Waste";
                  this.props.onSaveMetricParam(dataMetricParams);
                  }}
                ><span className="tab_label">Waste</span></NavItem>
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
            <div >
              <div className="col-xs-12">
              <h2 className="pageModuleMainTitle">{this.state.page_title}</h2>
              </div>
              <div className="col-xs-12">
                <div className="col-xs-3" style={{marginTop: '8%'}}>

                        {(() => {
                          if (this.props.ProductPage.data && this.props.ProductPage.data.comp_data) {
                            return this.props.ProductPage.data.comp_data.map((obj) => {

/*                              console.log("ProductPage:");
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
                              });*/
                              return (
                                <table key={obj.metric_title } className="table table-hover table-striped table-bordered table_cust">
                                <thead style={{ verticalAlign: 'middle',color:'#FFFFFF'}}>
                                <tr>
                                  <th colSpan="12" className="pageModuleSubTitle"><b>{obj.metric_title}</b></th>
                                </tr>
                                <tr>
                                  <th colSpan="6" style={{ verticalAlign: 'middle', fontSize: '18px',backgroundColor:'#1782CA',textAlign: 'center'}}>
                                    {(() => {
                                        if (this.state.y_axis_text == 'Sales Volume') {


                                          return (obj.metric_all / 1000).toFixed(0) + 'K'


                                        }else {
                                          return '£ ' + (obj.metric_all / 1000).toFixed(0) + 'K'
                                        }
                                      }
                                    )()}
                                  </th>
                                  <th colSpan="6" style={{ verticalAlign: 'middle', fontSize: '18px',backgroundColor:'#1782CA',textAlign: 'center' }}>
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
                                      return "glyphicon glyphicon-chevron-up productTablePositive"
                                    } else {
                                      return "glyphicon glyphicon-chevron-down productTableNegative"
                                    }
                                  })()}>&nbsp;</span> <span style={{fontSize:'16px'}}>{(obj.wow_change)+'%'} </span>
                                    <br/><br/><h4 style={{color:'#00539f'}}>WOW</h4></td>
                                  <td colSpan="4"><span className={(() => {
                                    if (obj.yoy_change > 0) {
                                      return "glyphicon glyphicon-chevron-up productTablePositive"
                                    } else {
                                      return "glyphicon glyphicon-chevron-down productTableNegative"
                                    }
                                  })()}>&nbsp;</span> <span style={{fontSize:'16px'}}>{(obj.yoy_change)+'%'} </span>
                                    <br/><br/><h4 style={{color:'#00539f'}}>YOY</h4></td>
                                  <td colSpan="4"><span className={(() => {
                                    if (obj.lfl_change > 0) {
                                      return "glyphicon glyphicon-chevron-up productTablePositive"
                                    } else {
                                      return "glyphicon glyphicon-chevron-down productTableNegative"
                                    }
                                  })()}>&nbsp;</span> <span style={{fontSize:'16px'}}>{(obj.lfl_change)+'%'} </span>
                                    <br/><br/><h4 style={{color:'#00539f'}}>LFL</h4></td>
                              </tr>

                              </tbody>
                              </table>
                              )

                            })
                          }else {
                            return (

                              <div className="text-center" colSpan="11"><Spinner />Please Wait a Moment....!</div>

                            );
                          }
                          }
                        )()}

                </div>

                <div className="col-xs-8" style={{float:'right'}}>
                  {(() => {
                    if (this.props.ProductPage.data && this.props.ProductPage.data.d3_output) {


                        return (
                          <div>
                          <DualLineChart ref = "chartImage" ty_text={this.state.ty_text} ly_text={this.state.ly_text} y_axis_text={this.state.y_axis_text} data={this.props.ProductPage.data.d3_output}/>
                            <div style={{float:"right"}}>
                              <DropdownButton title="Save Image/CSV" style={{backgroundColor:"#449d44", borderColor:"#398439",color:"#fff"}} id="dropButtonId">
                                <MenuItem onClick={() => {
                                  saveImage(this.refs.chartImage.refs.image,"line_chart")
                                  }
                                }>Save As JPEG</MenuItem>
                                <MenuItem onClick={() => {
                                  saveDataAsCSV(this.props.ProductPage.data.d3_output,"line_chart.csv")
                                  }
                                }>Download CSV</MenuItem>
                              </DropdownButton>
                            </div>
                          </div>
                        )


                    }else {
                      return (

                        <div className="text-center" colSpan="11"><Spinner />Please Wait a Moment....!</div>

                      );
                    }
                    }
                  )()}
                </div>

              </div>

            </div>
              <div className="col-xs-12">
                <h2 className="pageModuleMainTitle col-xs-12" >
                  <b>TOP 25 SKUs </b>
                </h2>
                <div>
                {
                  (() => {
                  // if (this.props.ProductPage.data) {
                  if (this.props.ProductPage.data && this.props.ProductPage.data.top_output) {


                  return (
                  <div>
                  <BootstrapTable
                  data={this.props.ProductPage.data.top_output} options={options}
                  striped={true}
                  hover
                  condensed
                  pagination={ true }
                  search={true}
                  exportCSV={true}
                  >
                  <TableHeaderColumn row="0" rowSpan="2" dataField="product_id" isKey={true} dataAlign="center" dataSort>Product ID</TableHeaderColumn>
                  <TableHeaderColumn row="0" rowSpan="2" width="275" tdStyle={ { whiteSpace: 'normal' } } dataField="product" dataSort={true} dataAlign="center">Description</TableHeaderColumn>
                  <TableHeaderColumn row="0" rowSpan="2" width="125" dataField="product_area" dataSort={true} dataAlign="center">Product Area</TableHeaderColumn>
                  <TableHeaderColumn row="0" colSpan="3" dataAlign="center">Price</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="asp" dataFormat={this.formatSales} dataSort={true} dataAlign="center">ASP</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="asp_diff_lw" dataSort={true} dataAlign="center" dataFormat={ this.diffColumnFormatter }>v LW</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="promo" dataSort={true} dataAlign="center" dataFormat={ this.tickColumnFormatter }>Promo?</TableHeaderColumn>
                  <TableHeaderColumn row="0" colSpan="6"  dataSort={true} dataAlign="center">Sales</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="top20" dataSort={true} dataAlign="center" dataFormat={ this.tickColumnFormatter }>Top 20 TW?</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="rank_lw" dataSort={true} dataAlign="center">LW Rank</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_value" dataFormat={this.formatSales} dataSort={true} dataAlign="center">Sales Value</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_value_diff_lw" dataSort={true} dataAlign="left" dataFormat={ this.diffColumnFormatter }>v LW</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_volume" dataFormat={this.formatVolume} dataSort={true} dataAlign="center">Sales Volume</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_volume_diff_lw" dataSort={true} dataAlign="left" dataFormat={ this.diffColumnFormatter }>vLW</TableHeaderColumn>
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
              </div>
              <br>
              </br>

              <div className="col-xs-12">
                <h1 className="pageModuleMainTitle">
                <b>BOTTOM 25 SKUs </b>
                </h1>
                <div>
                {
                  (() => {
                  // if (this.props.ProductPage.data) {
                  if (this.props.ProductPage.data && this.props.ProductPage.data.bottom_output) {


                  return (
                  <div>
                  <BootstrapTable
                  data={this.props.ProductPage.data.bottom_output} options={options}
                  striped
                  hover
                  condensed
                  pagination={ true }
                  search={true}
                  exportCSV={true}
                  >
                  <TableHeaderColumn row="0" rowSpan="2" dataField="product_id" isKey={true} dataAlign="center" dataSort>Product ID</TableHeaderColumn>
                  <TableHeaderColumn row="0" rowSpan="2" width="275" tdStyle={ { whiteSpace: 'normal' } } dataField="product" dataSort={true} dataAlign="center">Description</TableHeaderColumn>
                  <TableHeaderColumn row="0" rowSpan="2" width="125" dataField="product_area" dataSort={true} dataAlign="center">Product Area</TableHeaderColumn>
                  <TableHeaderColumn row="0" colSpan="3" dataAlign="center">Price</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="asp" dataFormat={this.formatSales} dataSort={true} dataAlign="center">ASP</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="asp_diff_lw" dataSort={true} dataAlign="center" dataFormat={ this.diffColumnFormatter }>v LW</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="promo" dataSort={true} dataAlign="center" dataFormat={ this.tickColumnFormatter }>Promo?</TableHeaderColumn>
                  <TableHeaderColumn row="0" colSpan="6"  dataSort={true} dataAlign="center">Sales</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="top20" dataSort={true} dataAlign="center" dataFormat={ this.tickColumnFormatter }>Top 20 TW?</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="rank_lw" dataSort={true} dataAlign="center">LW Rank</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_value" dataFormat={this.formatSales} dataSort={true} dataAlign="center">Sales Value</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_value_diff_lw" dataSort={true} dataAlign="left" dataFormat={ this.diffColumnFormatter }>v LW</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_volume" dataFormat={this.formatVolume} dataSort={true} dataAlign="center">Sales Volume</TableHeaderColumn>
                  <TableHeaderColumn row="1" dataField="sales_volume_diff_lw" dataSort={true} dataAlign="left" dataFormat={ this.diffColumnFormatter }>vLW</TableHeaderColumn>
                  </BootstrapTable>

                  </div>
                  );

                }
                  else {
                  return (

                  <div className="text-center" colSpan="11" style={{textAlign:'centre'}}><Spinner />Please Wait a Moment....!</div>

                  );
                }
                })()
                }

              </div>
            </div>
          </div>
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
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
    onSaveWeek: (e) => dispatch(SaveWeek(e)),
    onCheckboxWeekChange: (e) => dispatch(checkboxWeekChange(e)),
    onGetFilter: (e) => dispatch(getWeekFilter(e)),
//  onGenerateSideFilter: (e) => dispatch(generateSideFilter(e)),
//  onFetchSaveWeekParam: (e) => dispatch(fetchSaveWeekParam(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);

