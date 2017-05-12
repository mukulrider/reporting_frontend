/*
 *
 * DailySales
 *
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Modal,Nav,NavItem,DropdownButton, MenuItem } from 'react-bootstrap';
import {saveImage,saveDataAsCSV} from './../../utils/exportFunctions';
import Panel from 'components/panel';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectDailySales from './selectors';
import messages from './messages';
import './style.scss';
import PieChart from 'components/PieChart';
import CascadedFilterDSS from 'components/CascadedFilterDSS';
import MultilinePromo from 'components/MultilinePromo';
import LineChart from 'components/LineChart';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {PromoGiveawayData,
  lineChartCallAction,SaveKPIParam,generateUrlParamsString,
  SaveWeekParam, PromoKpiData,
  getFilter,
  getWeekFilter,
  WeekFilterParam,
  generateUrlParams,
  sendUrlParams,
  SaveWeek,
  checkboxChange,
  checkboxWeekChange
} from './actions';
export class DailySales extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    this.props.DefaultLineChartCall();
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
      activeKey1: "1"
    };
  }
  render() {
    let kpiParmas = this.props.DailySales.kpi_param;
    return (
      <Panel>
      <div>
        <Helmet
          title="DailySales"
          meta={[
            { name: 'description', content: 'Description of DailySales' },
          ]}
        />

        {/*Page title*/}
        <div className="pageTitle">
          {/*{(() => {*/}
            {/*if (this.props.competitor.filter_week_selection) {*/}
              {/*return (*/}
                <span> Daily Sales View </span>
              {/*)*/}
            {/*} else {*/}
              {/*return (*/}
                {/*<span>Daily Sales View - 201652  </span>*/}
              {/*)*/}
            {/*}*/}
          {/*})()}*/}
        </div>

          <div style={{
            height: '100%',
            position: 'fixed',
            width: '20%',
            marginTop:'-1%',
            paddingRight: '1%',
            overflowX: 'hidden',
            overflowY: 'scroll',
            borderTop: '1px solid #ccc'
          }}>
            {(() => {
              if (this.props.DailySales.week_filter_data) {
                console.log("Calling Filter index.js", this.props.DailySales.filter_data);
                return (
                  <CascadedFilterDSS filter_data={this.props.DailySales.filter_data}
                                       DefaultLineChartCall={this.props.DefaultLineChartCall}
                                       week_data={this.props.DailySales.week_filter_data}
                                       location={this.props.location}
                                       save_week={this.props.save_week}
                                       onGenerateSideFilter={this.props.onGetFilter}
                                       onFilterReset={this.props.onFilterReset}
                                       onGenerateUrlParams={this.props.onGenerateUrlParams}
                                       onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                                       onGenerateFilterParamsString={this.props.onGenerateFilterParamsString}
                                       onGenerateUrlParamsData={this.props.onGenerateUrlParamsData}
                                       ongenerateWeekFilter={this.props.onGetWeekFilter}
                                       onSaveWeekFilterParam={this.props.onSaveWeekFilterParam}
                                       loadKpi={this.props.loadKpi}
                                       onSaveWeek={this.props.onSaveWeek}
                                       previous_selection={this.props.DailySales.filter_selection}
                                       previous_week_selection={this.props.DailySales.filter_week_selection}
                                       onCheckboxChange={this.props.onCheckboxChange}
                                       onCheckboxWeekChange = {this.props.onCheckboxWeekChange}
                  />
                );
              }
              else {
                return (<div style={{padding: '10px'}}>Loading the data </div>)
              }
            })()}
          </div>

          <div style={{
            width: '78%',
            marginLeft: '22%'
          }}>

          <div className="row fixingPosition" style={{marginLeft: "0.5%", paddingTop: "-5px", marginRight: "0px"}}>

              <div className="row" style={{textAlign: "center", alignItems:"center"}}>
                <h4 className="pageModuleMainTitle">Overview</h4>
                <div className="row" style={{textAlign: "center",marginLeft: "0.5%", align: "center",alignItems:"center", backgroundColor:"1px solid #FAFAFA"}}>
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="col-xs-4 overview-blk" >
                      <Panel>
                        <div className="panel" style={{border: '1px solid #E5E8EA', width: '250px'}}>
                        <h4 className="panel-heading tesco-heading"><b>Value</b></h4>
                        <div className="panel-body">
                          <span className="overview-blk-value">
                                   {(() => {
                                     if (this.props.DailySales.linechart_data) {
                                       let a = this.props.DailySales.linechart_data.static_data;
                                       return a.map(obj => {
                                         return (
                                           <div><h4>{obj.tot_sales}</h4></div>
                                         )})}
                                   })()}
                                   </span>
                        </div>
                        </div>
                      </Panel>
                    </div>
                  <div className="col-xs-4 overview-blk">
                    <Panel>
                      <div className="panel" style={{border: '1px solid #E5E8EA', width: '250px'}}>
                        <h4 className="panel-heading tesco-heading"><b>Volume</b></h4>
                        <div className="panel-body">
                          <span className="overview-blk-value">
                            {(() => {
                              if (this.props.DailySales.linechart_data) {
                                let a = this.props.DailySales.linechart_data.static_data;
                                return a.map(obj => {
                                  return (
                                    <div><h4>{obj.tot_vol}</h4></div>
                                  )})}
                            })()}
                            </span>
                        </div>
                      </div>
                    </Panel>
                  </div>
                  <div className="col-xs-4 overview-blk" >
                    <Panel>
                      <div className="panel" style={{border: '1px solid #E5E8EA', width: '250px'}}>
                        <h4 className="panel-heading tesco-heading"><b>COGS</b></h4>
                        <div className="panel-body">
                          <span className="overview-blk-value">
                                                {(() => {
                                                  if (this.props.DailySales.linechart_data) {
                                                    let a = this.props.DailySales.linechart_data.static_data;
                                                    return a.map(obj => {
                                                      return (
                                                        <div><h4>{obj.tot_cogs}</h4></div>
                                                      )})}
                                                })()}
                                                </span>
                        </div>
                      </div>
                    </Panel>
                  </div>
                </div>
                </div>
              </div>
            <div className="row" style={{
              marginLeft: '0px',
              marginRight: '0px'
            }}>
              <div className ="row">
                <h4 className="pageModuleMainTitle">Daily Sales Trend
                  {/*<span className="glyphicon glyphicon-info-sign pull-right"*/}
                  {/*style={{right: '4px', fontSize: '15px', top: '8px'}}*/}
                  {/*onClick={() => {*/}
                  {/*this.setState({compMarketPerfInfo: true});*/}
                  {/*}}>*/}
                  {/*</span>*/}
                </h4>
                <div className="col-md-12 content-wrap" style={{background:'1px solid #FAFAFA'}}>
                  <Nav bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect}  className="tabsCustom">
                    <NavItem style={{fontSize: '16px', width:'16%',textAlign:'center'}} className="tabsCustomList" eventKey="1" onClick={() => {
                    this.setState({activeKey1: "1"});
                    kpiParmas = "val_type=1";
                    this.props.onSaveKPIParam(kpiParmas);
                    this.props.DefaultLineChartCall();
                    }} ><span className="tab_label">Value</span></NavItem>
                    <NavItem style={{fontSize: '16px', width:'16%',textAlign:'center'}} className="tabsCustomList" eventKey="2" onClick={() => {
                    this.setState({activeKey1: "2"});
                    kpiParmas = "val_type=2";
                    this.props.onSaveKPIParam(kpiParmas);
                    this.props.DefaultLineChartCall();
                    }} ><span className="tab_label">Volume</span></NavItem>
                    <NavItem style={{fontSize: '16px', width:'16%',textAlign:'center'}} className="tabsCustomList" eventKey="3" onClick={() => {
                    this.setState({activeKey1: "3"});
                    kpiParmas = "val_type=3";
                    this.props.onSaveKPIParam(kpiParmas);
                    this.props.DefaultLineChartCall();
                    }} ><span className="tab_label">COGS</span></NavItem>
                </Nav>
                </div>

                <div className="row" style={{marginLeft: "0px", marginRightt: "0px"}}>
                </div>


                <div className ="row">
                  <Panel className="col-md-12 col-sm-12 col-xs-12 panel-body ts-blk-proview" style={{alignItems:"center"}}>
                      <div className="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">{(() => {
                        if (this.props.DailySales.linechart_data)
                        {
                          console.log("The line chart data in Index", this.props.DailySales.linechart_data.graph_data);
                          return(
                          <LineChart data={this.props.DailySales.linechart_data.graph_data}
                                     y_axis="Value"
                                     x_axis="Date"
                          />
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
    onCheckboxWeekChange: (e) => dispatch(checkboxWeekChange(e)),
    dispatch,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DailySales);
