/*
 *
 * Promotion
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Nav, NavItem} from 'react-bootstrap';
import Panel from 'components/panel';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectPromotion from './selectors';
import messages from './messages';
import './style.scss';
import PieChart from 'components/PieChart';
import PromoFilter from 'components/PromoFilter';
import MultilinePromo from 'components/MultilinePromo';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
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

} from './actions';

function triangleColumnFormatter(cell, row) {
  if (cell > 0) {
    return '<i class="glyphicon glyphicon-chevron-up glyphiconPositive"></i>&nbsp;'+ cell;
  }
  else if (cell < 0) {
    return '<i class="glyphicon glyphicon-chevron-down glyphiconNegative"></i>&nbsp;'+ cell;
  } else {
    return '<i class="glyphicon glyphicon-minus-sign glyphiconNeutral"></i>&nbsp;'+ cell;
  }
}

export class Promotion extends React.PureComponent {
  componentDidMount = () => {

    let dataWeekParam = 'week_flag=None';
    let kpiParam = 'kpi_type=value';
    this.props.onSaveKPIParam(kpiParam);
    this.props.onSaveWeekParam(dataWeekParam);
    this.props.loadKpi();
    this.props.loadSales();
    this.props.loadPromoGiveaway();
    this.props.loadPromoProd();
    this.props.loadPromoPart();
    this.props.onGetFilter();
    this.props.onGetWeekFilter();


    // this.props.promotion.reducer1.sales;
  };

  constructor(props) {
    super(props);
    this.state = {

      activeKey1: "1",
      activeKey2: "1",
      activeKey3: "1",
      activeKey4: "1",
      activeKey5: "1",
      activeKey6: "1",
      activeKey7: "1"
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
            {name: 'description', content: 'Description of Promotion'},
          ]}
        />
        {/*<FormattedMessage {...messages.header} />*/}

        <div className="row">
          <div className="col-xs-2">

            {(() => {
              if (this.props.promotion.filter_data) {
                console.log("Calling Filter index.js", this.props.promotion.filter_data.filter_data);
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
                                week_data = {this.props.promotion.week_filter_data}
                                ongenerateWeekFilter = {this.props.onGetWeekFilter}
                                onSaveWeekFilterParam = {this.props.onSaveWeekFilterParam}
                                previous_week_selection = {this.props.weekurlParam}
                                loadKpi={this.props.loadKpi}
                                loadSales={this.props.loadSales}
                                loadPromoGiveaway={this.props.loadPromoGiveaway}
                                loadPromoProd={this.props.loadPromoProd}
                                loadPromoPart={this.props.loadPromoPart}


                  />
                );
              } else {
                return (<div>Loading the data </div>)
              }
            })()}
          </div>
          <div className="col-xs-10" style={{left: '7%'}}>
            <Nav bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect} className="tabsCustom">
              <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                dataWeekParam = "week_flag=Current Week";
                this.setState({activeKey1: "1"});
                this.props.onSaveWeekParam(dataWeekParam);
                this.props.loadKpi();
                this.props.loadSales();
                this.props.loadPromoGiveaway();
                this.props.loadPromoProd();
                this.props.loadPromoPart();
              }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                <b style={{textDecoration: 'none'}}>Current Week</b></NavItem>

              <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                this.setState({activeKey1: "2"});
                dataWeekParam = "week_flag=Latest 4 Weeks";
                this.props.onSaveWeekParam(dataWeekParam);
                this.props.loadKpi();
                this.props.loadSales();
                this.props.loadPromoGiveaway();
                this.props.loadPromoProd();
                this.props.loadPromoPart();
              }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                style={{textDecoration: 'none'}}>Last 4 weeks</b></NavItem>

              <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                this.setState({activeKey1: "3"});
                dataWeekParam = "week_flag=Latest 13 Weeks";
                this.props.onSaveWeekParam(dataWeekParam);
                this.props.loadKpi();
                this.props.loadSales();
                this.props.loadPromoGiveaway();
                this.props.loadPromoProd();
                this.props.loadPromoPart();
              }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                style={{textDecoration: 'none'}}>Last 13 weeks</b></NavItem>
              <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                this.setState({activeKey1: "4"});
                dataWeekParam = "week_flag=Latest 52 Weeks";
                this.props.onSaveWeekParam(dataWeekParam);
                this.props.loadKpi();
                this.props.loadSales();
                this.props.loadPromoGiveaway();
                this.props.loadPromoProd();
                this.props.loadPromoPart();
              }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                style={{textDecoration: 'none'}}>Last 52 weeks</b></NavItem>

              <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                this.setState({activeKey1: "5"});

                dataWeekParam = "week_flag=YTD";
                this.props.onSaveWeekParam(dataWeekParam);
                this.props.loadKpi();
                this.props.loadSales();
                this.props.loadPromoGiveaway();
                this.props.loadPromoProd();
                this.props.loadPromoPart();
              }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                style={{textDecoration: 'none'}}>YTD</b></NavItem>
            </Nav>
            <Nav bsStyle="tabs" activeKey={this.state.activeKey2} onSelect={this.handleSelect} className="tabsCustom">
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
                  <h4 className="pageModuleSubTitle"> Total Sales </h4>
                  <div className="row">
                    <div className="col-xs-6">

                      <h4>{this.props.promotion.kpi_data.total.total}</h4>
                    </div>
                    <div className="col-xs-6">
                      <h4>LFL &nbsp; {this.props.promotion.kpi_data.total.total_lfl} </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="panel-body">
                      <div className="col-xs-4">
                        <div className="panel-body">
                          <h4> WoW </h4>
                          <span
                            className={(() => {
                              if (this.props.promotion.kpi_data.total.var_total_wow > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.promotion.kpi_data.total.var_total_wow < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                          {this.props.promotion.kpi_data.total.var_total_wow}%
                        </div>
                      </div>
                      <div className="col-xs-4">
                        <div className="panel-body">
                          <h4> YoY </h4>
                          <span
                            className={(() => {
                              if (this.props.promotion.kpi_data.total.var_total_yoy > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.promotion.kpi_data.total.var_total_yoy < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                          {this.props.promotion.kpi_data.total.var_total_yoy}%
                        </div>
                      </div>
                      <div className="col-xs-4">
                        <div className="panel-body">
                          <h4> LFL </h4>
                          <span
                            className={(() => {
                              if (this.props.promotion.kpi_data.total.var_total_lfl > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.promotion.kpi_data.total.var_total_lfl < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                          {this.props.promotion.kpi_data.total.var_total_lfl}%
                        </div>
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>

              <div className="col-xs-4" style={{backgroundColor: "white"}}>
                <Panel>
                  <h4 className="pageModuleSubTitle"> Promo Sales </h4>
                  <div className="row">
                    <div className="col-xs-6">

                      <h4>  {this.props.promotion.kpi_data.promo.promo} </h4>
                    </div>
                    <div className="col-xs-6">
                      <h4> LFL &nbsp;     {this.props.promotion.kpi_data.promo.promo_lfl} </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="panel-body">
                      <div className="col-xs-4">
                        <div className="panel-body">
                          <h4> Wow </h4>
                          <span
                            className={(() => {
                              if (this.props.promotion.kpi_data.promo.var_promo_wow > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.promotion.kpi_data.promo.var_promo_wow < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                          {this.props.promotion.kpi_data.promo.var_promo_wow}%
                        </div>
                      </div>
                      <div className="col-xs-4">
                        <div className="panel-body">
                          <h4> YoY </h4>
                          <span
                            className={(() => {
                              if (this.props.promotion.kpi_data.promo.var_promo_yoy > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.promotion.kpi_data.promo.var_promo_yoy < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;
                        </span>
                          {this.props.promotion.kpi_data.promo.var_promo_yoy}%
                        </div>
                      </div>
                      <div className="col-xs-4">
                        <div className="panel-body">
                          <h4> LFL </h4>
                          <span
                            className={(() => {
                              if (this.props.promotion.kpi_data.promo.var_promo_lfl > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.promotion.kpi_data.promo.var_promo_lfl < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                          {this.props.promotion.kpi_data.promo.var_promo_lfl}%
                        </div>
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>

              <div className="col-xs-4" style={{backgroundColor: "white"}}>
                <Panel>
                  <h4 className="pageModuleSubTitle"> Non Promo Sales </h4>
                  <div className="row">
                    <div className="col-xs-6">

                      <h4>  {this.props.promotion.kpi_data.nonpromo.nonpromo} </h4>
                    </div>
                    <div className="col-xs-6">
                      <h4>  LFL &nbsp;    {this.props.promotion.kpi_data.nonpromo.nonpromo_lfl} </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="panel-body">
                      <div className="col-xs-4">
                        <div className="panel-body">
                          <h4> WoW </h4>
                          <span
                            className={(() => {
                              if (this.props.promotion.kpi_data.nonpromo.var_nonpromo_wow > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.promotion.kpi_data.nonpromo.var_nonpromo_wow < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                          {this.props.promotion.kpi_data.nonpromo.var_nonpromo_wow}%
                        </div>
                      </div>
                      <div className="col-xs-4">
                        <div className="panel-body">
                          <h4> YoY </h4>
                          <span
                            className={(() => {
                              if (this.props.promotion.kpi_data.nonpromo.var_nonpromo_yoy > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.promotion.kpi_data.nonpromo.var_nonpromo_yoy < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                          {this.props.promotion.kpi_data.nonpromo.var_nonpromo_yoy}%
                        </div>
                      </div>
                      <div className="col-xs-4">
                        <div className="panel-body">
                          <h4> LFL </h4>
                          <span
                            className={(() => {
                              if (this.props.promotion.kpi_data.nonpromo.var_nonpromo_lfl > 0)
                              {
                                return "glyphicon glyphicon-chevron-up glyphiconPositive"
                              }
                              else if (this.props.promotion.kpi_data.nonpromo.var_nonpromo_lfl < 0)
                              {
                                return "glyphicon glyphicon-chevron-down glyphiconNegative"
                              } else {
                                return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                              } })()}>&nbsp;

                        </span>
                          {this.props.promotion.kpi_data.nonpromo.var_nonpromo_lfl}%
                        </div>
                      </div>
                    </div>
                  </div>
                </Panel>
              </div>

            </div>

            <div>
              <panel>
                {/*Row for sales */}
                <div className="row">
                  <h2 className="pageModuleMainTitle">Promotion Sales</h2>
                  <panel>
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
                    <div className="col-xs-8">
                      <div className="row">
                        {/*Nav for Sales data*/}
                      <Nav bsStyle="tabs" activeKey={this.state.activeKey4} onSelect={this.handleSelect}
                           className="tabsCustom">
                        <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                         let promoTypeParam = "";
                          this.setState({activeKey4: "1"});
                          this.props.onSaveSalesParam(promoTypeParam);
                          this.props.loadSales();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                          <b style={{textDecoration: 'none'}}>Default</b></NavItem>

                        <NavItem className="tabsCustomList" eventKey="2" onClick={() => {

                          let promoTypeParam = "promo_type=Price Cut";
                          this.setState({activeKey4: "2"});
                          this.props.onSaveSalesParam(promoTypeParam);
                          this.props.loadSales();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                          <b style={{textDecoration: 'none'}}>Price Cut</b></NavItem>

                        <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                          this.setState({activeKey4: "3"});
                         let promoTypeParam = "promo_type=Multibuy";
                          this.props.onSaveSalesParam(promoTypeParam);
                          this.props.loadSales();

                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                          style={{textDecoration: 'none'}}>Multibuy</b></NavItem>

                        <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                          this.setState({activeKey4: "4"});
                         let promoTypeParam = "promo_type=Non Promo";
                          this.props.onSaveSalesParam(promoTypeParam);
                          this.props.loadSales();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                          style={{textDecoration: 'none'}}>Non Promo</b></NavItem>
                      </Nav>
                      </div>
                      <div className="row">
                      {(() => {
                        if (this.props.promotion.sales_data) {
                          console.log("Promo Sales line chart data", this.props.promotion.sales_data.promo_sales.trend);
                          return (
                            <MultilinePromo data={this.props.promotion.sales_data.promo_sales.trend} id="linechart" label_ty="Sales TY" label_ly="Sales LY" xaxis_title="Tesco Week" yaxis_title={this.props.promotion.sales_data.yaxis_title}/>
                          );
                        }
                      })()}
                      </div>
                    </div>
                  </panel>
                </div>
                {/*Row for giveaway*/}
                <div className="row">
                  <h2 className="pageModuleMainTitle">Promotion Giveaway</h2>
                  <panel>
                    <div className="col-xs-4">

                      {(() => {

                        if (this.props.promotion.promo_giveaway_data) {
                          console.log("pie chart promo_giveaway data", this.props.promotion.promo_giveaway_data.pie_chart);
                          return (
                            <PieChart data={this.props.promotion.promo_giveaway_data.pie_chart}
                                      id="piechart2"/>
                          );
                        }
                      })()}

                    </div>
                    <div className="col-xs-8">
                      {/*Nav for Giveaway*/}
                      <div className="row">
                      <Nav bsStyle="tabs" activeKey={this.state.activeKey5} onSelect={this.handleSelect}
                           className="tabsCustom">
                        <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                          let promoTypeParam = "";
                          this.setState({activeKey5: "1"});
                          this.props.onSaveGiveawayParam(promoTypeParam);
                          this.props.loadPromoGiveaway();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                          <b style={{textDecoration: 'none'}}>Default</b></NavItem>

                        <NavItem className="tabsCustomList" eventKey="2" onClick={() => {

                          let promoTypeParam = "promo_type=Price Cut";
                          this.setState({activeKey5: "2"});
                          this.props.onSaveGiveawayParam(promoTypeParam);
                          this.props.loadPromoGiveaway();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                          <b style={{textDecoration: 'none'}}>Price Cut</b></NavItem>

                        <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                          this.setState({activeKey5: "3"});
                          let promoTypeParam = "promo_type=Multibuy";
                          this.props.onSaveGiveawayParam(promoTypeParam);
                          this.props.loadPromoGiveaway();

                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                          style={{textDecoration: 'none'}}>Multibuy</b></NavItem>


                      </Nav>
                      </div>
                      <div className="row">
                      {(() => {
                        if (this.props.promotion.promo_giveaway_data) {
                          console.log("Promo Giveaway line chart data", this.props.promotion.promo_giveaway_data.trend);
                          return (
                            <MultilinePromo data={this.props.promotion.promo_giveaway_data.trend}
                                            id="linechart2" label_ty="Promo Giveaway TY" label_ly="Promo Giveaway LY" xaxis_title="Tesco Week" yaxis_title="Promo Giveaway" />
                          );
                        }
                      })()}
                      </div>
                    </div>
                  </panel>
                </div>

                {/*Row for Promo Products*/}
                <div className="row">
                  <h2 className="pageModuleMainTitle">Products On Promotion</h2>
                  <panel>
                    <div className="col-xs-4">

                      {(() => {

                        if (this.props.promotion.promo_prod_data) {
                          console.log("pie chart promo_products data", this.props.promotion.promo_prod_data.pie_chart);
                          return (
                            <PieChart data={this.props.promotion.promo_prod_data.pie_chart}
                                      id="piechart3"/>
                          );
                        }
                      })()}

                    </div>
                    <div className="col-xs-8">
                      {/*Nav for Promo products*/}
                      <div className="row">
                      <Nav bsStyle="tabs" activeKey={this.state.activeKey6} onSelect={this.handleSelect}
                           className="tabsCustom">
                        <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                          let promoTypeParam = "";
                          this.setState({activeKey6: "1"});
                          this.props.onSavePromoProdParam(promoTypeParam);
                          this.props.loadPromoProd();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                          <b style={{textDecoration: 'none'}}>Default</b></NavItem>


                        <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                          let promoTypeParam = "promo_type=Price Cut";
                          this.setState({activeKey6: "2"});
                          this.props.onSavePromoProdParam(promoTypeParam);
                          this.props.loadPromoProd();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                          <b style={{textDecoration: 'none'}}>Price Cut</b></NavItem>

                        <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                          this.setState({activeKey6: "3"});
                          let promoTypeParam = "promo_type=Multibuy";
                          this.props.onSavePromoProdParam(promoTypeParam);
                          this.props.loadPromoProd();

                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                          style={{textDecoration: 'none'}}>Multibuy</b></NavItem>

                        <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                          this.setState({activeKey6: "4"});
                          let promoTypeParam = "promo_type=Non Promo";
                          this.props.onSavePromoProdParam(promoTypeParam);
                          this.props.loadPromoProd();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                          style={{textDecoration: 'none'}}>Non Promo</b></NavItem>
                      </Nav>
                      </div>
                      <div className="row">
                      {(() => {
                        if (this.props.promotion.promo_prod_data) {
                          console.log("Promo Giveaway line chart data", this.props.promotion.promo_prod_data.trend);
                          return (
                            <MultilinePromo data={this.props.promotion.promo_prod_data.trend}
                                            id="linechart3" label_ty="Products on Promo TY" label_ly="Products on Promo LY"  xaxis_title="Tesco Week" yaxis_title="Products on Promo"/>
                          );
                        }
                      })()}
                      </div>
                    </div>
                  </panel>
                </div>

                {/*Row for products on participation*/}
                <div className="row">
                  <h2 className="pageModuleMainTitle">Promotion Participation</h2>
                  <panel>
                    <div className="col-xs-4">

                      {(() => {

                        if (this.props.promotion.promo_part_data) {
                          console.log("pie chart promo_products data", this.props.promotion.promo_part_data.pie_chart);
                          return (
                            <PieChart data={this.props.promotion.promo_part_data.pie_chart}
                                      id="piechart4"/>
                          );
                        }
                      })()}

                    </div>
                    <div className="col-xs-8">
                      {/*Nav for Promo Participation*/}
                      <div className="row">
                      <Nav bsStyle="tabs" activeKey={this.state.activeKey7} onSelect={this.handleSelect}
                           className="tabsCustom">

                        <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                          let promoTypeParam = "";
                          this.setState({activeKey7: "1"});
                          this.props.onSavePromoPartParam(promoTypeParam);
                          this.props.loadPromoPart();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                          <b style={{textDecoration: 'none'}}>Default</b></NavItem>

                        <NavItem className="tabsCustomList" eventKey="2" onClick={() => {

                          let promoTypeParam = "promo_type=Price Cut";
                          this.setState({activeKey7: "2"});
                          this.props.onSavePromoPartParam(promoTypeParam);
                          this.props.loadPromoPart();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                          <b style={{textDecoration: 'none'}}>Price Cut</b></NavItem>

                        <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                          this.setState({activeKey7: "3"});
                          let promoTypeParam = "promo_type=Multibuy";
                          this.props.onSavePromoPartParam(promoTypeParam);
                          this.props.loadPromoPart();

                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                          style={{textDecoration: 'none'}}>Multibuy</b></NavItem>
                      </Nav>
                      </div>
                      <div className="row">
                      {(() => {
                        if (this.props.promotion.promo_part_data) {
                          console.log("Promo Participation line chart data", this.props.promotion.promo_part_data.trend);
                          return (
                            <MultilinePromo data={this.props.promotion.promo_part_data.trend}
                                            id="linechart4" label_ty="Promo Participation TY" label_ly="Promo Participation LY" xaxis_title="Tesco Week" yaxis_title="Promo Participation"/>
                          );
                        }
                      })()}
                      </div>
                    </div>
                  </panel>
                </div>


              </panel>
            </div>
            <div className="row">
            <h2 className="pageModuleMainTitle">Top 25 Products On Promotion</h2>
              <panel>
            {/*Promo top 25 table            */}
            {(() => {
              if (this.props.promotion.sales_data) {
                return (
                  <BootstrapTable
                    data={this.props.promotion.sales_data.table_data.df}
                    exportCSV={true}
                    search={true}
                    pagination>
                    <TableHeaderColumn dataField='Product Description' isKey>Product Description</TableHeaderColumn>
                    <TableHeaderColumn dataField='Promo TY' dataSort={true} >Promo {this.props.promotion.sales_data.table_data.col_name} TY</TableHeaderColumn>
                    <TableHeaderColumn dataField='Promo LY' >Promo {this.props.promotion.sales_data.table_data.col_name} LY</TableHeaderColumn>
                    <TableHeaderColumn dataField='lfl_var'  dataFormat={ triangleColumnFormatter }>LFL Variation</TableHeaderColumn>
                    <TableHeaderColumn dataField='promoted_ly_ind'>Promoted Last Year?</TableHeaderColumn>
                  </BootstrapTable>

                )
              }else {
                return (<div>Loading</div>)
              }

            })()}
              </panel>
            </div>
          </div>

        </div>
      </div>
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

    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Promotion);
