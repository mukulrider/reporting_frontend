/*
 *
 * Promotion
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Nav , NavItem } from 'react-bootstrap';
import Panel from 'components/panel';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectPromotion from './selectors';
import messages from './messages';
import './style.scss';
import PieChart from 'components/PieChart';
import {

  SaveWeekParam,
  SaveKPIParam,
  PromoKpiData,
  PromoSalesData,
  PromoInfoData
} from './actions';


export class Promotion extends React.PureComponent {
  componentDidMount = () => {

    let dataWeekParam = 'week_flag=None';
    let kpiParam = 'kpi_type=value';
    this.props.onSaveKPIParam(kpiParam);
    this.props.onSaveWeekParam(dataWeekParam);
    this.props.loadKpi();
    this.props.loadSales();
    this.props.loadPromoInfo()


    // this.props.promotion.reducer1.sales;
  };
  constructor(props) {
    super(props);
    this.state = {

      activeKey1: "1",
      activeKey2: "1",
      activeKey3: "1"
    };

  }// eslint-disable-line react/prefer-stateless-function
  render() {
    let kpiParam = this.props.promotion.kpi_param;
    let dataWeekParam = this.props.promotion.week_param;
    return (
      <div>
        <Helmet
          title="Promotion"
          meta={[
            { name: 'description', content: 'Description of Promotion' },
          ]}
        />
        {/*<FormattedMessage {...messages.header} />*/}

<div className="row">

  <div className="col-xs-2">
  </div>
  <div className="col-xs-10">
        <Nav bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect} className="tabsCustom">
          <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

            dataWeekParam = "week_flag=Current Week";
            this.setState({activeKey1: "1"});
            this.props.onSaveWeekParam(dataWeekParam);
            this.props.loadKpi();
            this.props.loadSales();
            this.props.loadPromoInfo();
          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
            <b style={{textDecoration: 'none'}}>Current Week</b></NavItem>

          <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
            this.setState({activeKey1: "2"});
            dataWeekParam = "week_flag=Latest 4 Weeks";
            this.props.onSaveWeekParam(dataWeekParam);
            this.props.loadKpi();
            this.props.loadSales();
            this.props.loadPromoInfo();
          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
            style={{textDecoration: 'none'}}>Last 4 weeks</b></NavItem>

          <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
            this.setState({activeKey1: "3"});
            dataWeekParam = "week_flag=Latest 13 Weeks";
            this.props.onSaveWeekParam(dataWeekParam);
            this.props.loadKpi();
            this.props.loadSales();
            this.props.loadPromoInfo();
          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
            style={{textDecoration: 'none'}}>Last 13 weeks</b></NavItem>
          <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
            this.setState({activeKey1: "4"});
            dataWeekParam = "week_flag=Latest 52 Weeks";
            this.props.onSaveWeekParam(dataWeekParam);
            this.props.loadKpi();
            this.props.loadSales();
            this.props.loadPromoInfo();
          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
            style={{textDecoration: 'none'}}>Last 52 weeks</b></NavItem>

          <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
            this.setState({activeKey1: "5"});

            dataWeekParam = "week_flag=YTD";
            this.props.onSaveWeekParam(dataWeekParam);
            this.props.loadKpi();
            this.props.loadSales();
            this.props.loadPromoInfo();
          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
            style={{textDecoration: 'none'}}>YTD</b></NavItem>
        </Nav>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey2} onSelect={this.handleSelect}  className="tabsCustom">
          <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
            this.setState({activeKey2: "1"});
            kpiParam = "kpi_type=value";
            this.props.onSaveKPIParam(kpiParam);
            this.props.loadKpi();
            this.props.loadSales();

          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
            style={{textDecoration: 'none'}}>Value</b></NavItem>
          <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
            this.setState({activeKey2: "2"});
            kpiParam = "kpi_type=volume";
            this.props.onSaveKPIParam(kpiParam);
            this.props.loadKpi();
            this.props.loadSales();

          }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
            style={{textDecoration: 'none'}}>Volume</b></NavItem>
        </Nav>
    {/* Promo KPI Boxes */}

    <div className="row" style={{textAlign: 'center'}}>

      <div className="col-xs-4" style={{backgroundColor: "white"}}>
        <Panel>
          <h4 className="ts-blk-proview-subhead"> Total Sales </h4>
          <div className="row">
            <div className="col-xs-6">

              <h4>{this.props.promotion.kpi_data.total.total}</h4>
            </div>
            <div className="col-xs-6">
              <h4>     {this.props.promotion.kpi_data.total.total_lfl} </h4>
            </div>
          </div>
          <div className="row">
            <div className="panel-body">
              <div className="col-xs-4">
                <div className="panel-body">
                  <h4> WoW </h4>
                  {this.props.promotion.kpi_data.total.var_total_wow}
                </div>
              </div>
              <div className="col-xs-4">
                <div className="panel-body">
                  <h4>  YoY </h4>
                  {this.props.promotion.kpi_data.total.var_total_yoy}
                </div>
              </div>
              <div className="col-xs-4">
                <div className="panel-body">
                  <h4> LFL </h4>
                  {this.props.promotion.kpi_data.total.var_total_lfl}
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="col-xs-4" style={{backgroundColor: "white"}}>
        <Panel>
          <h4 className="ts-blk-proview-subhead"> Promo Sales </h4>
          <div className="row">
            <div className="col-xs-6">

              <h4>  {this.props.promotion.kpi_data.promo.promo} </h4>
            </div>
            <div className="col-xs-6">
              <h4>     {this.props.promotion.kpi_data.promo.promo_lfl} </h4>
            </div>
          </div>
          <div className="row">
            <div className="panel-body">
              <div className="col-xs-4">
                <div className="panel-body">
                  <h4> Wow </h4>
                  {this.props.promotion.kpi_data.promo.var_promo_wow}
                </div>
              </div>
              <div className="col-xs-4">
                <div className="panel-body">
                  <h4>  YoY </h4>
                  {this.props.promotion.kpi_data.promo.var_promo_yoy}
                </div>
              </div>
              <div className="col-xs-4">
                <div className="panel-body">
                  <h4>  LFL </h4>
                  {this.props.promotion.kpi_data.promo.var_promo_lfl}
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="col-xs-4" style={{backgroundColor: "white"}}>
        <Panel>
          <h4 className="ts-blk-proview-subhead"> Non Promo Sales </h4>
          <div className="row">
            <div className="col-xs-6">

              <h4>  {this.props.promotion.kpi_data.nonpromo.nonpromo} </h4>
            </div>
            <div className="col-xs-6">
              <h4>     {this.props.promotion.kpi_data.nonpromo.nonpromo_lfl} </h4>
            </div>
          </div>
          <div className="row">
            <div className="panel-body">
              <div className="col-xs-4">
                <div className="panel-body">
                  <h4> WoW </h4>
                  {this.props.promotion.kpi_data.nonpromo.var_nonpromo_wow}
                </div>
              </div>
              <div className="col-xs-4">
                <div className="panel-body">
                  <h4>  YoY </h4>
                  {this.props.promotion.kpi_data.nonpromo.var_nonpromo_yoy}
                </div>
              </div>
              <div className="col-xs-4">
                <div className="panel-body">
                  <h4>  LFL </h4>
                  {this.props.promotion.kpi_data.nonpromo.var_nonpromo_lfl}
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>

    </div>

    <div>
      <panel>
        <div className="row">
          <div className="col-xs-4">

            {(() => {

              if (this.props.promotion.sales_data) {
                console.log("pie chart data", this.props.promotion.sales_data.promo_sales.pie_chart);
                return (
                  <PieChart data={this.props.promotion.sales_data.promo_sales.pie_chart} id="piechart"/>
                );
              }
            })()}

          </div>
          <div classname="col-xs-8">

          </div>
        </div>
      </panel>
    </div>
  </div>

</div>
      </div>
    );
  }
}

Promotion.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  promotion: makeSelectPromotion(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSaveWeekParam: (e) => dispatch(SaveWeekParam(e)),
    onSaveKPIParam: (e) => dispatch(SaveKPIParam(e)),
    loadKpi: (e) => dispatch(PromoKpiData(e)),
    loadSales: (e) => dispatch(PromoSalesData(e)),
    loadPromoInfo: (e) => dispatch(PromoInfoData(e)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Promotion);
