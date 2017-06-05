/*
 *
 * KantarReport
 *
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {createStructuredSelector} from 'reselect';
import makeSelectKantarReport from './selectors';

import * as d3 from 'd3';
import Panel from 'components/panel';
import Button from 'components/button';
import Spinner from 'components/spinner';
import HorizontalBarChart from 'components/HorizontalBarChart';
import {Nav, NavItem, DropdownButton, MenuItem} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {saveImage, saveDataAsCSV} from './../../utils/exportFunctions';
import {FormattedMessage} from 'react-intl';
require('react-bootstrap-table/css/react-bootstrap-table.css');
// import TopFilterKantar from 'components/TopFilterKantar';

import { saveWeek,saveCategory, saveRetailer, saveSupplier, generateWeekData,generateHierarchyData,kantarDataCall}
from './actions';

export class KantarReport extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {

    this.props.onGenerateWeekData();
    this.props.onGenerateHierarchyData();
    console.log('Function called from index');
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
        text: 'All', value: 25
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

    return (
      <div>
        <div className="row" style={{marginLeft:'5%'}}>
          {(() => {
            if (this.props.KantarReport.week_data && this.props.KantarReport.hierarchy_data) {
              return (
                <TopFilterKantar
                  week_data = {this.props.KantarReport.week_data}
                  hierarchy_data={this.props.KantarReport.hierarchy_data}
                  onSaveWeek={this.props.onSaveWeek}
                  onSaveCategory={this.props.onSaveCategory}
                  onSaveRetailer={this.props.onSaveRetailer}
                  onSaveSupplier={this.props.onSaveSupplier}
                  KantarDataCall={this.props.onKantarDataCall}

                />

              )
            }
          })()}
        </div>
        <div className="row" style={{float: 'right'}}>
          <div className="coverBox">
                    <div className="row mainBox" style={{textAlign: 'center'}}>

                      <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa"}}>
                        <Panel>
                          <h3 className="pageModuleSubTitle"> Tesco Growth % </h3>

                          <div className="row">
                            {(() =>{
                                if(this.props.KantarReport.data && this.props.KantarReport.data.tesco_growth_per)
                                {
                                  return(
                                      <h4>
                                        {(this.props.KantarReport.data.tesco_growth_per)+'%'}
                                      </h4>
                                  )
                                }
                                else {
                                  return (

                                    <div className="row">
                                      <div className="col-md-9 col-sm-9 col-xs-9 text-center" style={{marginTop: '-17%'}}><Spinner />Please Wait a Moment....!</div>
                                    </div>

                                  );
                                }
                              }
                            )()}
                          </div>
                        </Panel>
                      </div>


                      <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa"}}>
                        <Panel>
                          <h3 className="pageModuleSubTitle">Market Growth % </h3>

                          <div className="row">
                            {(() =>{
                                if(this.props.KantarReport.data && this.props.KantarReport.data.market_growth_per)
                                {
                                  return(
                                    <h4>
                                      {(this.props.KantarReport.data.market_growth_per)+'%'}
                                    </h4>
                                  )
                                }
                                else {
                                  return (

                                    <div className="row">
                                      <div className="col-md-9 col-sm-9 col-xs-9 text-center" style={{marginTop: '-17%'}}><Spinner />Please Wait a Moment....!</div>
                                    </div>

                                  );
                                }
                              }
                            )()}
                          </div>
                        </Panel>
                      </div>

                      <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa"}}>
                        <Panel>
                          <h3 className="pageModuleSubTitle"> Opportunity £  </h3>
                          <div className="row">
                            {(() =>{
                                if(this.props.KantarReport.data && this.props.KantarReport.data.opportunity_val)
                                {
                                  return(
                                    <h4>
                                      {(this.props.KantarReport.data.opportunity_val)+'%'}
                                    </h4>
                                  )
                                }
                                else {
                                  return (

                                    <div className="row">
                                      <div className="col-md-9 col-sm-9 col-xs-9 text-center" style={{marginTop: '-17%'}}><Spinner />Please Wait a Moment....!</div>
                                    </div>

                                  );
                                }
                              }
                            )()}
                          </div>
                        </Panel>
                      </div>
                    </div>
          </div>
        <div className="row">
          <h1 className="pageModuleMainTitle">
            <b>Supplier Performance Across Retailer </b>
          </h1>
          <div>
            {
              (() => {
                if (this.props.KantarReport.data && this.props.KantarReport.data.kantar_table_data) {

                  return (
                    <div>
                      <BootstrapTable
                        data={this.props.KantarReport.data.kantar_table_data} options={options}
                        striped={true}
                        hover
                        condensed
                        pagination={ true }
                        search={true}
                        exportCSV={true}
                      >
                        <TableHeaderColumn  tdStyle={{whiteSpace:'normal'}} dataAlign={"center"} dataField='manufacturer' isKey>Manufacturer</TableHeaderColumn>
                        <TableHeaderColumn  dataAlign={"center"} dataField='retailer'>Retailer</TableHeaderColumn>
                        <TableHeaderColumn  dataAlign={"center"} dataField='spend'>Spend</TableHeaderColumn>
                        <TableHeaderColumn  dataAlign={"center"} dataField='growthpercent'>Growthpercent</TableHeaderColumn>
                        <TableHeaderColumn  dataAlign={"center"} dataField='contritogrowthpercent'>Contri to Growth Percent</TableHeaderColumn>
                        <TableHeaderColumn  dataAlign={"center"} dataField='sharepercentret'>Share Percent Ret</TableHeaderColumn>
                        <TableHeaderColumn  dataAlign={"center"} dataField='yoysharechange'>YOY Share change</TableHeaderColumn>
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
          <div className="row">
            <div className="col-md-4 panel-body">
              <Panel>
                <div>
                  <h3 className="pageModuleSubTitle"> Growth % By Retailer</h3>
                  {(() => {
                    if (this.props.KantarReport.data && this.props.KantarReport.data.chart_growth_array) {

                      return (
                        <div style={{border: '1px solid #e5e8ea'}}>
                          <div style={{float:"right"}}>
                            <DropdownButton title="" className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                              <MenuItem onClick={() => {
                                saveImage(document.getElementById('growthPercRetailer'+'_svg'),"growthPercRetailer_barChart")
                              }
                              }>Save As JPEG</MenuItem>
                              <MenuItem onClick={() => {
                                saveDataAsCSV(this.props.KantarReport.data.chart_growth_array,"growthPercRetailer_barChart.csv")
                              }
                              }>Download CSV</MenuItem>
                            </DropdownButton>
                          </div>
                          <HorizontalBarChart data={this.props.KantarReport.data.chart_growth_array}
                                          id="growthPercRetailer"/>
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
              </Panel>
            </div>
            <div className="col-md-4 panel-body">
              <Panel>
                <div>
                  <h3 className="pageModuleSubTitle"> Share % By Retailer</h3>
                  {(() => {
                    if (this.props.KantarReport.data && this.props.KantarReport.data.chart_shareperc_array) {

                      return (
                        <div style={{border: '1px solid #e5e8ea'}}>
                          <div style={{float:"right"}}>
                            <DropdownButton title="" className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                              <MenuItem onClick={() => {
                                saveImage(document.getElementById('sharePercRetailer'+'_svg'),"sharePercRetailer_barChart")
                              }
                              }>Save As JPEG</MenuItem>
                              <MenuItem onClick={() => {
                                saveDataAsCSV(this.props.KantarReport.data.chart_shareperc_array,"sharePercRetailer_barChart.csv")
                              }
                              }>Download CSV</MenuItem>
                            </DropdownButton>
                          </div>
                          <HorizontalBarChart data={this.props.KantarReport.data.chart_shareperc_array}
                                     id="sharePercRetailer"/>
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
              </Panel>
            </div>

            <div className="col-md-4 panel-body">
              <Panel>
              <div>
                <h3 className="pageModuleSubTitle"> YOY % By Retailer</h3>
                {(() => {
                  if (this.props.KantarReport.data && this.props.KantarReport.data.chart_yoyperc_array) {

                    return (
                      <div style={{border: '1px solid #e5e8ea'}}>
                        <div style={{float:"right"}}>
                          <DropdownButton title="" className="glyphicon glyphicon-menu-hamburger" pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}} id="dropButtonId">
                            <MenuItem onClick={() => {
                              saveImage(document.getElementById('yoyPercRetailer'+'_svg'),"yoyPercRetailer_barChart")
                            }
                            }>Save As JPEG</MenuItem>
                            <MenuItem onClick={() => {
                              saveDataAsCSV(this.props.KantarReport.data.chart_yoyperc_array,"yoyPercRetailer_barChart.csv")
                            }
                            }>Download CSV</MenuItem>
                          </DropdownButton>
                        </div>
                        <HorizontalBarChart data={this.props.KantarReport.data.chart_yoyperc_array}
                                   id="yoyPercRetailer"/>
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
              </Panel>
            </div>
          </div>
        </div>
    </div>
    );
  }
}

KantarReport.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  KantarReport: makeSelectKantarReport(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGenerateWeekData: (e) => dispatch(generateWeekData(e)),
    onGenerateHierarchyData: (e) => dispatch(generateHierarchyData(e)),
    onSaveWeek: (e) => dispatch(saveWeek(e)),
    onSaveCategory: (e) => dispatch(saveCategory(e)),
    onSaveRetailer: (e) => dispatch(saveRetailer(e)),
    onSaveSupplier: (e) => dispatch(saveSupplier(e)),
    onKantarDataCall: (e) => dispatch(kantarDataCall(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(KantarReport);
