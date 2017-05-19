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
import Spinner from 'components/spinner';
import messages from './messages';
import './style.scss';
import PieChart from 'components/PieChart';
import CascadedFilterDSS from 'components/CascadedFilterDSS';
import MultilinePromo from 'components/MultilinePromo';
import LineChart from 'components/LineChart';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {
  PromoGiveawayData,
  lineChartCallAction, SaveKPIParam, generateUrlParamsString,
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


} from './actions';
export class DailySales extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    this.props.DefaultLineChartCall();
    this.props.DSViewKpiSpinnerCheckSuccess(0);
    let dataWeekParam = 'week_flag=None';
    let kpiparam = 'val_type=1';
    this.props.onSaveKPIParam(kpiparam);
    this.props.onSaveWeekParam(dataWeekParam);
    this.props.loadKpi();
    this.props.onGetFilter();
    this.props.onGetWeekFilter();
  };
  componentDidUpdate = () => {
    this.props.onSendUrlParams(this.props.location.query);
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey1: "1",
      y_axis: "Sales Value"
    };

  }
  render() {
    let kpiParmas = this.props.DailySales.kpi_param;
    return (
      <Panel  style={{background:"#fafafa"}}>
        <div>
          <Helmet
            title="DailySales"
            meta={[
              { name: 'description', content: 'Description of DailySales' },
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
                                             DefaultLineChartCall={this.props.DefaultLineChartCall}
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
                                             onCheckboxWeekChange = {this.props.onCheckboxWeekChange}
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
                        if (this.props.DailySales.calendar_date) {
                          return (
                            <span> Daily Sales View- {this.props.DailySales.calendar_date}  </span>
                          )
                        } else {
                          return (
                            <span>Daily Sales View </span>
                          )
                        }
                      })()}
                    </div>
                    <div>
                      <div className="row fixingPosition" style={{marginLeft: "0%", paddingTop: "-5px", marginRight: "0px"}}>
                        <div className="row" style={{textAlign: "center", alignItems:"center"}}>
                          <div className="col-md-12">
                            <h4 className="pageModuleMainTitle">Overview</h4>
                          </div>
                          <div className="col-md-12" style={{textAlign: "center",marginLeft: "0.5%", align: "center",alignItems:"center", backgroundColor:"1px solid #FAFAFA"}}>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="col-md-4 col-sm-6 col-xs-12 overview-blk" >
                                <Panel>
                                  <div className="panel" style={{border: '1px solid #ccc',textAlign:"center"}}>
                                    <h4 className="tesco-heading"><b>Sales</b></h4>
                                    {(() => {
                                      if ((this.props.DailySales.linechart_data && this.props.DailySales.LineChartSpinnerCheck != 0) || kpiParmas =="val_type=2" || kpiParmas =="val_type=3" ) {
                                        let a = this.props.DailySales.linechart_data.static_data;
                                        return a.map(obj => {
                                          return (
                                            <div className="row">
                                              <h4>{obj.tot_sales}</h4>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                10%
                                                <h5 className="tesco-heading"><b>WoW</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                10%
                                                <h5 className="tesco-heading"><b>YoY</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                10%
                                                <h5 className="tesco-heading"><b>LFL</b></h5>
                                              </div>
                                            </div>

                                          )})}
                                      else {
                                        return (
                                          <div className="row spinnerPositionLineChart"><Spinner /><h4>Please Wait a
                                            Moment....!</h4></div>
                                        )
                                      }
                                    })()}

                                    {/*<div className="panel-body" style={{marginBottom:"5px",paddingTop:"0px"}}>*/}
                                    {/*<span className="overview-blk-value">*/}

                                    {/*</span>*/}
                                    {/*</div>*/}
                                  </div>
                                </Panel>
                              </div>
                              <div className="col-md-4 col-sm-6 col-xs-12 overview-blk">
                                <Panel>
                                  <div className="panel" style={{border: '1px solid #ccc'}}>
                                    <h4 className="tesco-heading"><b>Volume</b></h4>
                                    {/*<div className="panel-body" style={{marginBottom:"2px",paddingTop:"0px"}}>*/}
                                    {/*<span className="overview-blk-value">*/}
                                    {(() => {
                                      if ((this.props.DailySales.linechart_data && this.props.DailySales.LineChartSpinnerCheck != 0) || kpiParmas =="val_type=2" || kpiParmas =="val_type=3") {
                                        let a = this.props.DailySales.linechart_data.static_data;
                                        return a.map(obj => {
                                          return (
                                            <div className="row">
                                              <h4>{obj.tot_vol}</h4>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                10%
                                                <h5 className="tesco-heading"><b>WoW</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                10%
                                                <h5 className="tesco-heading"><b>YoY</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                10%
                                                <h5 className="tesco-heading"><b>LFL</b></h5>
                                              </div>
                                            </div>
                                          )})}
                                      else {
                                        return (
                                          <div className="row spinnerPositionLineChart"><Spinner /><h4>Please Wait a
                                            Moment....!</h4></div>
                                        )
                                      }
                                    })()}


                                    {/*</span>*/}
                                    {/*</div>*/}
                                  </div>
                                </Panel>
                              </div>
                              <div className="col-md-4 col-sm-6 col-xs-12 overview-blk" >
                                <Panel>
                                  <div className="panel" style={{border: '1px solid #ccc'}}>
                                    <h4 className="panel-heading tesco-heading" style={{marginBottom:"5px",paddingTop:"0px"}}>
                                      <b>COGS</b>
                                    </h4>
                                    {/*<div className="panel-body">*/}
                                    {/*<span className="overview-blk-value">*/}
                                    {(() => {
                                      if ((this.props.DailySales.linechart_data && this.props.DailySales.LineChartSpinnerCheck != 0) || kpiParmas =="val_type=2" || kpiParmas =="val_type=3") {
                                        let a = this.props.DailySales.linechart_data.static_data;
                                        return a.map(obj => {
                                          return (
                                            <div className="row">
                                              <h4>{obj.tot_cogs}</h4>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                10%
                                                <h5 className="tesco-heading"><b>WoW</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                10%
                                                <h5 className="tesco-heading"><b>YoY</b></h5>
                                              </div>
                                              <div className="col-md-4 col-sm-4 col-xs-4">
                                                10%
                                                <h5 className="tesco-heading"><b>LFL</b></h5>
                                              </div>
                                            </div>
                                          )})}
                                      else {
                                        return (
                                          <div className="row spinnerPositionLineChart"><Spinner /><h4>Please Wait a
                                            Moment....!</h4></div>
                                        )
                                      }
                                    })()}


                                    {/*</span>*/}
                                    {/*</div>*/}
                                  </div>
                                </Panel>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className ="col-md-12 col-sm-12">
                          <div className="col-md-12">
                            <h4 className="pageModuleMainTitle">Daily Sales Trend
                            </h4>
                          </div>
                          <div className="col-md-8 col-sm-8 col-xs-8" style={{background:'1px solid #FAFAFA'}}>
                            <Nav bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect}  className="tabsCustom">
                              <NavItem style={{fontSize: '16px',textAlign:'center',margin:"0px"}} className="tabsCustomList" eventKey="1" onClick={() => {
                                this.setState({activeKey1: "1",
                                  y_axis: "Sales Value"});
                                kpiParmas = "val_type=1";
                                this.props.onSaveKPIParam(kpiParmas);
                                this.props.DefaultLineChartCall();
                                this.props.DSViewKpiSpinnerCheckSuccess(0);
                                this.props.LineChartSpinnerCheckSuccess(0);
                              }} ><span className="tab_label">Sales</span></NavItem>
                              <NavItem style={{fontSize: '16px',textAlign:'center',margin:"0px"}} className="tabsCustomList" eventKey="2" onClick={() => {
                                this.setState({activeKey1: "2",
                                  y_axis: "Volume"});
                                kpiParmas = "val_type=2";
                                this.props.onSaveKPIParam(kpiParmas);
                                this.props.DefaultLineChartCall();
                                this.props.DSViewKpiSpinnerCheckSuccess(0);
                                this.props.LineChartSpinnerCheckSuccess(0);
                              }} ><span className="tab_label">Volume</span></NavItem>
                              <NavItem style={{fontSize: '16px',textAlign:'center',margin:"0px"}} className="tabsCustomList" eventKey="3" onClick={() => {
                                this.setState({activeKey1: "3",
                                  y_axis: "COGS"});
                                kpiParmas = "val_type=3";
                                this.props.onSaveKPIParam(kpiParmas);
                                this.props.DefaultLineChartCall();
                                this.props.DSViewKpiSpinnerCheckSuccess(0);
                                this.props.LineChartSpinnerCheckSuccess(0);
                              }} ><span className="tab_label">COGS</span></NavItem>
                            </Nav>
                          </div>
                          <div className="col-md-4 col-sm-4 col-xs-4">
                            <span style={{float:"right",margin:"0px"}}>
                              <DropdownButton className="glyphicon glyphicon-menu-hamburger"
                                              pullRight style={{backgroundColor:"transparent", borderColor:"transparent",color:"#00539f"}}
                                              id="dropButtonId">
                                <MenuItem onClick={() => {
                                  saveImage(document.getElementById('sampleSvg'),"dailySales_lineChart")
                                }
                                }>Save As JPEG</MenuItem>
                                <MenuItem onClick={() => {
                                  saveDataAsCSV(this.props.DailySales.linechart_data.graph_data,"dailySales_lineChart_data.csv")
                                }
                                }>Download CSV</MenuItem>
                              </DropdownButton>
                            </span>
                          </div>
                          <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12" >
                            <div className ="col-md-12 col-sm-12">
                            <Panel className="col-md-6 col-xs-12 col-sm-12 col-lg-6 panel-body ts-blk-proview" style={{alignItems:"center"}}>
                              <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12" style={{border: "1px solid #ccc", marginLeft:"5px"}}>
                                {(() => {
                                  if (this.props.DailySales.linechart_data && this.props.DailySales.LineChartSpinnerCheck != 0)
                                  {
                                    return(
                                      <div>
                                        <LineChart data={this.props.DailySales.linechart_data.graph_data}
                                                   y_axis={this.state.y_axis}
                                          //          y_axis="Value"
                                                   x_axis="Date"
                                        />
                                      </div>
                                    )
                                  }else {
                                    return (
                                      <div className="row">
                                        <div className="col-md-9 col-sm-9 col-xs-9 text-center"><Spinner /><h4>Please Wait a Moment....!</h4></div>
                                      </div>
                                    )
                                  }
                                })()}
                              </div>
                            </Panel>
                          </div>
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
    DefaultLineChartCall: (e) => dispatch(lineChartCallAction(e)),
    onSaveWeekParam: (e) => dispatch(SaveWeekParam(e)),
    loadKpi: (e) => dispatch(PromoKpiData(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
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
