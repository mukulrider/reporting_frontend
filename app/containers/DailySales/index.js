/*
 *
 * DailySales
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import {Nav, NavItem} from 'react-bootstrap';
import Panel from 'components/panel';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectDailySales from './selectors';
import messages from './messages';
import './style.scss';
import PieChart from 'components/PieChart';
import CascadedFilterPromo from 'components/CascadedFilterPromo';
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
      <div>
        <Helmet
          title="DailySales"
          meta={[
            { name: 'description', content: 'Description of DailySales' },
          ]}
        />
        <div className="row col-xs-10" style={{ marginleft: '0px', marginright: '0px'}}>

          <div style={{height: '100%',position: 'fixed', width: '20%',
               overflowX: 'hidden', overflowY: 'scroll', borderTop: '1px solid #ccc' }}>

            {(() => {

              if (this.props.DailySales.week_filter_data) {
                console.log("Calling Filter index.js", this.props.DailySales.filter_data);
                return (
                  <CascadedFilterPromo filter_data={this.props.DailySales.filter_data}

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

                  />
                );
              } else {
                return (<div>Loading the data </div>)
              }
            })()}
          </div>

        <div className="toptab" style={{width: '78%'}}>
          {/*<div className="col-xs-10">*/}
            <div className="col-xs-10 toptab" style={{left: '14%', top: '-25px'}}>
            <h2 className="pageModuleMainTitle">Daily Sales View</h2>
            <div className="row">
              <div className="col-xs-3 overview-blk ">

                <div className="panel">
                  <div className="panel-heading tesco-heading">
                    Sales
                  </div>
                  <div className="panel-body">
                    <span className="overview-blk-value">
                                   {(() => {
                                     if (this.props.DailySales.linechart_data) {
                                       let a = this.props.DailySales.linechart_data.static_data;
                                       return a.map(obj => {
                                         return (
                                           <div>{obj.tot_sales}</div>
                                         )})}
                                   })()}
                                </span>
                  </div>
                </div>

            </div>
            <div className="col-xs-3 overview-blk ">
                <div className="panel">
                  <div className="panel-heading tesco-heading">
                    Volume
                  </div>
                  <div className="panel-body">
                    {/*                  {(() => {
                     if ((aggregatedFullSummed.cashSales - aggregatedFullSummed.baselineCashSales) < 0) {
                     return <span className="glyphicon glyphicon-triangle-bottom"> </span>
                     } else {
                     return <span className="glyphicon glyphicon-triangle-top"> </span>
                     }
                     })()}*/}

                    <span className="overview-blk-value">
                        {(() => {
                          if (this.props.DailySales.linechart_data) {
                            let a = this.props.DailySales.linechart_data.static_data;
                            return a.map(obj => {
                              return (
                                <div>{obj.tot_vol}</div>
                              )})}
                        })()}
                    </span>
                  </div>
                </div>

            </div>

            <div className="col-xs-3 overview-blk">

                <div className="panel">
                  <div className="panel-heading tesco-heading">
                    COGS
                  </div>
                  <div className="panel-body">
                    {/*                  {(() => {
                     if ((aggregatedFullSummed.cashSales - aggregatedFullSummed.baselineCashSales) < 0) {
                     return <span className="glyphicon glyphicon-triangle-bottom"> </span>
                     } else {
                     return <span className="glyphicon glyphicon-triangle-top"> </span>
                     }
                     })()}*/}

                    <span className="overview-blk-value">
                                                {(() => {
                                                  if (this.props.DailySales.linechart_data) {
                                                    let a = this.props.DailySales.linechart_data.static_data;
                                                    return a.map(obj => {
                                                      return (
                                                        <div>{obj.tot_cogs}</div>
                                                      )})}
                                                })()}
                                </span>
                  </div>

                </div>

            </div>

            <div className ="row"></div>
            <Nav bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect}  className="tabsCustom">
              <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                 this.setState({activeKey1: "1"});
                 kpiParmas = "val_type=1";
                 this.props.onSaveKPIParam(kpiParmas);
                 this.props.DefaultLineChartCall();
              }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Sales</b></NavItem>
              <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                 this.setState({activeKey1: "2"});
                 kpiParmas = "val_type=2";
                 this.props.onSaveKPIParam(kpiParmas);
                 this.props.DefaultLineChartCall();
              }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Volume</b></NavItem>
              <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                this.setState({activeKey1: "3"});
                 kpiParmas = "val_type=3";
                 this.props.onSaveKPIParam(kpiParmas);
                 this.props.DefaultLineChartCall();
              }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>COGS</b></NavItem>
            </Nav>
            <div className ="row"></div>
            <div className ="row">
              {(() => {

                if (this.props.DailySales.linechart_data) {
                  console.log("The line chart data in Index", this.props.DailySales.linechart_data.graph_data);
                  return (
                    <LineChart data={this.props.DailySales.linechart_data.graph_data}
                               y_axis="Axis Title"
                    />
                  )
                }
              })()}
            </div>
          </div>
          </div>
        </div>
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
    DefaultLineChartCall: (e) => dispatch(lineChartCallAction(e)),
    onSaveWeekParam: (e) => dispatch(SaveWeekParam(e)),
    loadKpi: (e) => dispatch(PromoKpiData(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
    onGenerateUrlParamsData: (e) => dispatch(generateSideFilter(e)),
    onGetFilter: (e) => dispatch(getFilter(e)),
    onGenerateSideFilter: (e) => dispatch(getFilter(e)),
    onSaveSalesParam: (e) => dispatch(SaveSalesParam(e)),
    onGetWeekFilter: (e) => dispatch(getWeekFilter(e)),
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
