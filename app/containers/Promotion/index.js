/*
 *
 * Promotion
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { Modal,Nav,NavItem,DropdownButton, MenuItem } from 'react-bootstrap';
import {saveImage,saveDataAsCSV} from './../../utils/exportFunctions';
import Panel from 'components/panel';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectPromotion from './selectors';
import messages from './messages';
import './style.scss';
import PieChart from 'components/PieChart';
import Spinner from 'components/spinner';
import PromoFilter from 'components/PromoFilter';
import MultilinePromo from 'components/MultilinePromo';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

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
    return '<i class="glyphicon glyphicon-chevron-up glyphiconPositive"></i>&nbsp;'+ cell+'%';
  }
  else if (cell < 0) {
    return '<i class="glyphicon glyphicon-chevron-down glyphiconNegative"></i>&nbsp;'+ cell+'%';
  } else {
    return '<i class="glyphicon glyphicon-minus-sign glyphiconNeutral"></i>&nbsp;'+ cell+'%';
  }
}

export class Promotion extends React.PureComponent {
  componentDidMount = () => {

    let dataWeekParam = '';
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

        <div className="row" style={{
          marginLeft: '0px',
          marginRight: '0px'
        }}>
          <div style={{
            height: '100%',
            position: 'fixed',
            width: '20%',
            /* padding-right: 5px; */
            overflowX: 'hidden',
            overflowY: 'scroll',
            borderTop: '1px solid #ccc'
          }}>

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
          <div style={{
            width: '78%',
            marginLeft: '22%'
          }}>
            <div className="row" style={{marginLeft: "0.5%", paddingTop: "-5px"}}>
          <div className="col-md-12 content-wrap">
            <h3> Promotions View - Week &nbsp; {this.props.promotion.kpi_data.selected_week} </h3>
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
                dataWeekParam = "week_flag=Latest 26 Weeks";
                this.props.onSaveWeekParam(dataWeekParam);
                this.props.loadKpi();
                this.props.loadSales();
                this.props.loadPromoGiveaway();
                this.props.loadPromoProd();
                this.props.loadPromoPart();
              }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                style={{textDecoration: 'none'}}>Last 26 weeks</b></NavItem>

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
              <span className="glyphicon glyphicon-info-sign pull-right"
                    style={{right: '4px', fontSize: '15px', top: '8px',  color: "#00539f", fontWeight: "bold"}}
                    onClick={() => {
                      this.setState({promoKPIInfo: true});
                    }}>

            </span>
            </Nav>



            {/* Promo KPI Boxes */}

            <div className="row" style={{textAlign: 'center',backgroundColor: "white",margin: "0%",borderLeft: "1px solid #e5e8ea",borderRight: "1px solid #e5e8ea",borderBottom: "1px solid #e5e8ea"}}>


              <div className="col-xs-4" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                <Panel>
                  <h3 className="pageModuleSubTitle"> Total {this.props.promotion.kpi_data.kpi_name} </h3>
                  <div className="row">
                    <div className="col-xs-6">

                      <h3>{this.props.promotion.kpi_data.total.total}</h3>
                    </div>
                    <div className="col-xs-6">
                      <h3>LFL &nbsp; {this.props.promotion.kpi_data.total.total_lfl} </h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="panel-body">
                      <div className="col-xs-4 kpiSmall">


                        <h3>
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
                        </h3>
                          <h4 className="kpiSubTitle">WoW</h4>

                      </div>
                      <div className="col-xs-4 kpiSmall">

                        <h3>
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
                        </h3>
                        <h4 className="kpiSubTitle">YoY</h4>

                      </div>
                      <div className="col-xs-4 kpiSmall">

                        <h3>
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
                        </h3>
                        <h4 className="kpiSubTitle">LFL</h4>

                      </div>
                    </div>
                  </div>
                </Panel>
              </div>

              <div className="col-xs-4" style={{backgroundColor: "#eee #eee #ddd",borderRight: "1px solid #e5e8ea"}}>
                <Panel>
                  <h4 className="pageModuleSubTitle"> Promo {this.props.promotion.kpi_data.kpi_name} </h4>
                  <div className="row">
                    <div className="col-xs-6">

                      <h3>  {this.props.promotion.kpi_data.promo.promo} </h3>
                    </div>
                    <div className="col-xs-6">
                      <h3>LFL &nbsp;{this.props.promotion.kpi_data.promo.promo_lfl} </h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="panel-body">
                      <div className="col-xs-4 kpiSmall">


                        <h3>
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
                        </h3>
                        <h4 className="kpiSubTitle">WoW</h4>

                      </div>
                      <div className="col-xs-4 kpiSmall">
                        <h3>
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
                        </h3>
                        <h4 className="kpiSubTitle">YoY</h4>

                      </div>
                      <div className="col-xs-4 kpiSmall">
                        <h3>
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
                        </h3>
                        <h4 className="kpiSubTitle">LFL</h4>

                      </div>
                    </div>
                  </div>
                </Panel>
              </div>

              <div className="col-xs-4" style={{backgroundColor: "#eee #eee #ddd"}}>
                <Panel>
                  <h4 className="pageModuleSubTitle"> Non Promo {this.props.promotion.kpi_data.kpi_name} </h4>
                  <div className="row">
                    <div className="col-xs-6">

                      <h3>  {this.props.promotion.kpi_data.nonpromo.nonpromo} </h3>
                    </div>
                    <div className="col-xs-6">
                      <h3>LFL &nbsp;    {this.props.promotion.kpi_data.nonpromo.nonpromo_lfl} </h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="panel-body">
                      <div className="col-xs-4 kpiSmall">
                        <h3>
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
                        </h3>
                        <h4 className="kpiSubTitle">WoW</h4>

                      </div>
                      <div className="col-xs-4 kpiSmall">
                        <h3>
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
                        </h3>
                        <h4 className="kpiSubTitle">YoY</h4>

                      </div>
                      <div className="col-xs-4 kpiSmall">
                          <h3>
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
                        </h3>
                        <h4 className="kpiSubTitle">LFL</h4>

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
                  <h2 className="pageModuleMainTitle">Total &nbsp; {this.props.promotion.kpi_data.kpi_name} &nbsp; Split by Promo Type       <span className="glyphicon glyphicon-info-sign pull-right"
                                                                                                  style={{right: '4px', fontSize: '15px', top: '8px'}}
                                                                                                  onClick={() => {
                                                                                                    this.setState({promoSalesInfo: true});
                                                                                                  }}>

            </span></h2>
                  <panel>
                    <div className="col-xs-4">

                      {(() => {
                        if (this.props.promotion.sales_data) {
                          console.log("pie chart data", this.props.promotion.sales_data.promo_sales.pie_chart);
                          return (
                            <div>
                              <div style={{float:"right"}}>
                                <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                                  <MenuItem onClick={() => {
                                    saveImage(document.getElementById('piechart'+'_svg'),"promo_sales_piechart")
                                  }
                                  }>Save As JPEG</MenuItem>
                                  <MenuItem onClick={() => {
                                    saveDataAsCSV(this.props.promotion.sales_data.promo_sales.pie_chart,"promo_sales_piechart_data.csv")
                                  }
                                  }>Download CSV</MenuItem>
                                </DropdownButton>
                              </div>
                              <PieChart data={this.props.promotion.sales_data.promo_sales.pie_chart} id="piechart"/>
                            </div>
                          );
                        }
                        else {
                          return (

                            <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                          );
                        }
                      })()}

                    </div>
                    <div className="col-xs-8">
                      <div className="row">
                        {/*Nav for Sales data*/}
                      <Nav bsStyle="tabs" activeKey={this.state.activeKey4} onSelect={this.handleSelect}
                           className="tabsCustom secondaryTabs">
                        <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                         let promoTypeParam = "";
                          this.setState({activeKey4: "1"});
                          this.props.onSaveSalesParam(promoTypeParam);
                          this.props.loadSales();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                          <b style={{textDecoration: 'none'}}>Total Sales</b></NavItem>

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
                          let promoTypeParam = "promo_type=Linksave";
                          this.props.onSaveSalesParam(promoTypeParam);
                          this.props.loadSales();

                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                          style={{textDecoration: 'none'}}>Linksave</b></NavItem>

                        <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                          this.setState({activeKey4: "5"});
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
                            <div>
                              <div style={{float:"right"}}>
                                <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                                  <MenuItem onClick={() => {
                                    saveImage(document.getElementById('sampleSvg'),"promo_sales_trend_multilineChart")
                                  }
                                  }>Save As JPEG</MenuItem>
                                  <MenuItem onClick={() => {
                                    saveDataAsCSV(this.props.promotion.sales_data.promo_sales.trend,"promo_sales_trend_multilineChart_data.csv")
                                  }
                                  }>Download CSV</MenuItem>
                                </DropdownButton>
                              </div>
                              <MultilinePromo data={this.props.promotion.sales_data.promo_sales.trend} id="linechart" label_ty="Sales TY" label_ly="Sales LY" xaxis_title="Tesco Week" no_pref={this.props.promotion.sales_data.no_pref} no_suffix='' yaxis_title={this.props.promotion.sales_data.yaxis_title}/>
                            </div>
                          );
                        }
                        else {
                          return (

                            <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                          );
                        }
                      })()}
                      </div>
                    </div>
                  </panel>
                </div>
                {/*Row for giveaway*/}
                <div className="row">
                  <h2 className="pageModuleMainTitle">Promotion Giveaway Split By Promo Type <span className="glyphicon glyphicon-info-sign pull-right"
                                                                                                   style={{right: '4px', fontSize: '15px', top: '8px'}}
                                                                                                   onClick={() => {
                                                                                                     this.setState({promoGiveawayInfo: true});
                                                                                                   }}></span></h2>
                  <panel>
                    <div className="col-xs-4">

                      {(() => {

                        if (this.props.promotion.promo_giveaway_data) {
                          console.log("pie chart promo_giveaway data", this.props.promotion.promo_giveaway_data.pie_chart);
                          return (
                            <div>
                              <div style={{float:"right"}}>
                                <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                                  <MenuItem onClick={() => {
                                    saveImage(document.getElementById('piechart2'+'_svg'),"promo_giveaway_piechart")
                                  }
                                  }>Save As JPEG</MenuItem>
                                  <MenuItem onClick={() => {
                                    saveDataAsCSV(this.props.promotion.promo_giveaway_data.pie_chart,"promo_giveaway_data.csv")
                                  }
                                  }>Download CSV</MenuItem>
                                </DropdownButton>
                              </div>
                              <PieChart data={this.props.promotion.promo_giveaway_data.pie_chart}
                                      id="piechart2"/>
                            </div>
                          );
                        }
                        else {
                          return (

                            <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                          );
                        }
                      })()}

                    </div>
                    <div className="col-xs-8">
                      {/*Nav for Giveaway*/}
                      <div className="row">
                      <Nav bsStyle="tabs" activeKey={this.state.activeKey5} onSelect={this.handleSelect}
                           className="tabsCustom secondaryTabs">
                        <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                          let promoTypeParam = "";
                          this.setState({activeKey5: "1"});
                          this.props.onSaveGiveawayParam(promoTypeParam);
                          this.props.loadPromoGiveaway();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                          <b style={{textDecoration: 'none'}}>Total Giveaway</b></NavItem>

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

                        <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                          this.setState({activeKey5: "4"});
                          let promoTypeParam = "promo_type=Linksave";
                          this.props.onSaveSalesParam(promoTypeParam);
                          this.props.loadSales();

                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                          style={{textDecoration: 'none'}}>Linksave</b></NavItem>



                      </Nav>
                      </div>
                      <div className="row">
                      {(() => {
                        if (this.props.promotion.promo_giveaway_data) {
                          console.log("Promo Giveaway line chart data", this.props.promotion.promo_giveaway_data.trend);
                          return (
                            <div>
                              <div style={{float:"right"}}>
                                <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                                  <MenuItem onClick={() => {
                                    saveImage(document.getElementById('linechart2'+'_svg'),"promo_giveaway_linechart")
                                  }
                                  }>Save As JPEG</MenuItem>
                                  <MenuItem onClick={() => {
                                    saveDataAsCSV(this.props.promotion.promo_giveaway_data.trend,"promo_giveaway_linechart_data.csv")
                                  }
                                  }>Download CSV</MenuItem>
                                </DropdownButton>
                              </div>
                              <MultilinePromo data={this.props.promotion.promo_giveaway_data.trend}
                                              id="linechart2" label_ty="Promo Giveaway TY" label_ly="Promo Giveaway LY" xaxis_title="Tesco Week" yaxis_title="Promo Giveaway" no_pref='£' no_suffix=''/>
                            </div>
                          );
                        }
                        else {
                          return (

                            <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                          );
                        }
                      })()}
                      </div>
                    </div>
                  </panel>
                </div>

                {/*Row for Promo Products*/}
                <div className="row">
                  <h2 className="pageModuleMainTitle">Products Count Split By Promo Type
                    <span className="glyphicon glyphicon-info-sign pull-right"
                          style={{right: '4px', fontSize: '15px', top: '8px'}}
                          onClick={() => {
                            this.setState({promoProdInfo: true});
                          }}>

                    </span>
                  </h2>
                  <panel>
                    <div className="col-xs-4">

                      {(() => {

                        if (this.props.promotion.promo_prod_data) {
                          console.log("pie chart promo_products data", this.props.promotion.promo_prod_data.pie_chart);
                          return (
                            <div>
                              <div style={{float:"right"}}>
                                <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                                  <MenuItem onClick={() => {
                                    saveImage(document.getElementById('piechart3'+'_svg'),"promo_products_piechart")
                                  }
                                  }>Save As JPEG</MenuItem>
                                  <MenuItem onClick={() => {
                                    saveDataAsCSV(this.props.promotion.promo_prod_data.pie_chart,"promo_products_piechart_data.csv")
                                  }
                                  }>Download CSV</MenuItem>
                                </DropdownButton>
                              </div>
                              <PieChart data={this.props.promotion.promo_prod_data.pie_chart}
                                        id="piechart3"/>
                            </div>
                          );
                        }
                        else {
                          return (

                            <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                          );
                        }
                      })()}

                    </div>
                    <div className="col-xs-8">
                      {/*Nav for Promo products*/}
                      <div className="row">
                      <Nav bsStyle="tabs" activeKey={this.state.activeKey6} onSelect={this.handleSelect}
                           className="tabsCustom secondaryTabs">
                        <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                          let promoTypeParam = "";
                          this.setState({activeKey6: "1"});
                          this.props.onSavePromoProdParam(promoTypeParam);
                          this.props.loadPromoProd();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                          <b style={{textDecoration: 'none'}}>Total Product Count</b></NavItem>


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
                          let promoTypeParam = "promo_type=Linksave";
                          this.props.onSaveSalesParam(promoTypeParam);
                          this.props.loadSales();

                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                          style={{textDecoration: 'none'}}>Linksave</b></NavItem>




                        <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                          this.setState({activeKey6: "5"});
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
                            <div>
                              <div style={{float:"right"}}>
                                <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                                  <MenuItem onClick={() => {
                                    saveImage(document.getElementById('linechart3'+'_svg'),"promo_products_trend_multilineChart")
                                  }
                                  }>Save As JPEG</MenuItem>
                                  <MenuItem onClick={() => {
                                    saveDataAsCSV(this.props.promotion.promo_prod_data.trend,"promo_products_trend_multilineChart_data.csv")
                                  }
                                  }>Download CSV</MenuItem>
                                </DropdownButton>
                              </div>
                              <MultilinePromo data={this.props.promotion.promo_prod_data.trend}
                                              id="linechart3" label_ty="Products on Promo TY" label_ly="Products on Promo LY"  xaxis_title="Tesco Week" yaxis_title="Products on Promo" no_pref='' no_suffix=''/>
                            </div>
                          );
                        }
                        else {
                          return (

                            <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                          );
                        }
                      })()}
                      </div>
                    </div>
                  </panel>
                </div>

                {/*Row for products on participation*/}
                <div className="row">
                  <h2 className="pageModuleMainTitle">Promotion Participation Split By Promo Type
                    <span className="glyphicon glyphicon-info-sign pull-right"
                          style={{right: '4px', fontSize: '15px', top: '8px'}}
                          onClick={() => {
                            this.setState({promoPartInfo: true});
                          }}>

                    </span>
                  </h2>
                  <panel>
                    <div className="col-xs-4">

                      {(() => {

                        if (this.props.promotion.promo_part_data) {
                          console.log("pie chart promo_products data", this.props.promotion.promo_part_data.pie_chart);
                          return (
                            <div>
                              <div style={{float:"right"}}>
                                <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                                  <MenuItem onClick={() => {
                                    saveImage(document.getElementById('piechart4'+'_svg'),"promo_participation_split_pieChart")
                                  }
                                  }>Save As JPEG</MenuItem>
                                  <MenuItem onClick={() => {
                                    saveDataAsCSV(this.props.promotion.promo_part_data.pie_chart,"promo_participation_split_pieChart_data.csv")
                                  }
                                  }>Download CSV</MenuItem>
                                </DropdownButton>
                              </div>
                              <PieChart data={this.props.promotion.promo_part_data.pie_chart}
                                        id="piechart4"/>
                            </div>
                          );
                        }
                        else {
                          return (

                            <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                          );
                        }
                      })()}

                    </div>
                    <div className="col-xs-8">
                      {/*Nav for Promo Participation*/}
                      <div className="row">
                      <Nav bsStyle="tabs" activeKey={this.state.activeKey7} onSelect={this.handleSelect}
                           className="tabsCustom secondaryTabs">

                        <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                          let promoTypeParam = "";
                          this.setState({activeKey7: "1"});
                          this.props.onSavePromoPartParam(promoTypeParam);
                          this.props.loadPromoPart();
                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}>
                          <b style={{textDecoration: 'none'}}>Total Promo Participation</b></NavItem>

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
                        <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                          this.setState({activeKey7: "4"});
                          let promoTypeParam = "promo_type=Linksave";
                          this.props.onSaveSalesParam(promoTypeParam);
                          this.props.loadSales();

                        }} style={{fontSize: '20px', fontFamily: 'Tesco', textDecoration: 'none'}}><b
                          style={{textDecoration: 'none'}}>Linksave</b></NavItem>

                      </Nav>
                      </div>
                      <div className="row">
                      {(() => {
                        if (this.props.promotion.promo_part_data) {
                          console.log("Promo Participation line chart data", this.props.promotion.promo_part_data.trend);
                          return (
                            <div>
                              <div style={{float:"right"}}>
                                <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                                  <MenuItem onClick={() => {
                                    saveImage(document.getElementById('linechart4'+'_svg'),"promo_participation_split_multilineChart")
                                  }
                                  }>Save As JPEG</MenuItem>
                                  <MenuItem onClick={() => {
                                    saveDataAsCSV(this.props.promotion.promo_part_data.pie_chart,"promo_participation_split_multilineChart_data.csv")
                                  }
                                  }>Download CSV</MenuItem>
                                </DropdownButton>
                              </div>
                              <MultilinePromo data={this.props.promotion.promo_part_data.trend}
                                              id="linechart4" label_ty="Promo Participation TY" label_ly="Promo Participation LY" xaxis_title="Tesco Week" yaxis_title="Promo Participation" no_pref='' no_suffix='%'/>
                            </div>
                          );
                        }
                        else {
                          return (

                            <div className="text-center"><Spinner />Please Wait a Moment....!</div>

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
            <h2 className="pageModuleMainTitle">Top 25 Products On Promotion
              <span className="glyphicon glyphicon-info-sign pull-right"
                    style={{right: '4px', fontSize: '15px', top: '8px'}}
                    onClick={() => {
                      this.setState({promoTabInfo: true});
                    }}>

                    </span>
            </h2>
              <panel>
            {/*Promo top 25 table            */}
            {(() => {
              if (this.props.promotion.sales_data) {
                return (
                  <div className="promoTable">
                  <BootstrapTable className="promoTable"
                    data={this.props.promotion.sales_data.table_data.df}
                    exportCSV={true}
                    search={true}
                    pagination>
                    <TableHeaderColumn  dataAlign={"left"} dataField='Product Description' isKey>Product Description</TableHeaderColumn>
                    <TableHeaderColumn  dataAlign={"right"} dataField='Promo TY' dataSort={true} >Promo {this.props.promotion.sales_data.table_data.col_name} TY</TableHeaderColumn>
                    <TableHeaderColumn  dataAlign={"right"} dataField='Promo LY' >Promo {this.props.promotion.sales_data.table_data.col_name} LY</TableHeaderColumn>
                    <TableHeaderColumn  dataAlign={"right"} dataField='lfl_var'  dataFormat={ triangleColumnFormatter }><h6>LFL</h6> Variation</TableHeaderColumn>
                    <TableHeaderColumn  dataAlign={"left"} dataField='promoted_ly_ind'>Promoted Last Year?</TableHeaderColumn>
                  </BootstrapTable>
                  </div>
                )
              }else {
                return (

                  <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                );
              }

            })()}
              </panel>
            </div>
          </div>
            </div>
          </div>
        </div>


        {/*MODAL FOR Promo KPI boxes */}

        <Modal show={this.state.promoKPIInfo} bsSize="lg"
               aria-labelledby="contained-modal-title-lg"
        >
          <Modal.Header>

            <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
              style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
              style={{textAlign: 'right', float: 'right'}}
              onClick={() => this.setState({promoKPIInfo: false})}><b>X</b></span></span>
              <div style={{textAlign: 'center'}}>
                <div style={{textAlign: 'right'}}>
                </div>
              </div>
            </Modal.Title>

          </Modal.Header>
          <Modal.Body style={{fontSize: '14px'}}>
            <list>
              <ul>   Promo Sales: The total sales value for all the products on promotion</ul>
              <ul>  Non Promo Sales: The total sales value for all the products off promotion</ul>
              <ul>              Promo Volume: The total volume for all the products on promotion </ul>
              <ul>    Non Promo Volume: The total volume for all the products off promotion </ul>
              <ul>              Promo sales variation YoY: The variation of a given measure of promo sales for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Non Promo sales variation YoY: The variation of a given measure of non promo sales for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Promo volume variation YoY: The variation of a given measure of promo volume for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Non Promo volume variation YoY: The variation of a given measure of non promo volume for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Promo sales variation LFL: The variation of a given measure of promo LFL sales for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Non Promo sales variation LFL: The variation of a given measure of non promo LFL sales for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>             Promo volume variation LFL: The variation of a given measure of promo LFL volume for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Non Promo volume variation LFL: The variation of a given measure of non promo LFL volume for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Number of products on promotion: Count of products flagged as promotion</ul>

            </list>

          </Modal.Body>
        </Modal>

        {/*MODAL FOR Sales Charts */}

        <Modal show={this.state.promoSalesInfo} bsSize="lg"
               aria-labelledby="contained-modal-title-lg"
        >
          <Modal.Header>

            <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
              style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
              style={{textAlign: 'right', float: 'right'}}
              onClick={() => this.setState({promoSalesInfo: false})}><b>X</b></span></span>
              <div style={{textAlign: 'center'}}>
                <div style={{textAlign: 'right'}}>
                </div>
              </div>
            </Modal.Title>

          </Modal.Header>
          <Modal.Body style={{fontSize: '14px'}}>
            <list>
              <ul>   Promo Sales: The total sales value for all the products on promotion</ul>
              <ul>  Non Promo Sales: The total sales value for all the products off promotion</ul>
              <ul>              Promo Volume: The total volume for all the products on promotion </ul>
              <ul>    Non Promo Volume: The total volume for all the products off promotion </ul>

            </list>

          </Modal.Body>
        </Modal>

        {/*MODAL FOR Giveaway Charts */}

        <Modal show={this.state.promoGiveawayInfo} bsSize="lg"
               aria-labelledby="contained-modal-title-lg"
        >
          <Modal.Header>

            <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
              style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
              style={{textAlign: 'right', float: 'right'}}
              onClick={() => this.setState({promoGiveawayInfo: false})}><b>X</b></span></span>
              <div style={{textAlign: 'center'}}>
                <div style={{textAlign: 'right'}}>
                </div>
              </div>
            </Modal.Title>

          </Modal.Header>
          <Modal.Body style={{fontSize: '14px'}}>
            <list>
              <ul>   Promo giveaway: The total discount (giveaway) for all products sold on promotion</ul>
            </list>

          </Modal.Body>
        </Modal>

        {/*MODAL FOR Promo products Charts */}

        <Modal show={this.state.promoProdInfo} bsSize="lg"
               aria-labelledby="contained-modal-title-lg"
        >
          <Modal.Header>

            <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
              style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
              style={{textAlign: 'right', float: 'right'}}
              onClick={() => this.setState({promoProdInfo: false})}><b>X</b></span></span>
              <div style={{textAlign: 'center'}}>
                <div style={{textAlign: 'right'}}>
                </div>
              </div>
            </Modal.Title>

          </Modal.Header>
          <Modal.Body style={{fontSize: '14px'}}>
            <list>
              <ul>   Promo Sales: The total sales value for all the products on promotion</ul>
              <ul>  Non Promo Sales: The total sales value for all the products off promotion</ul>
              <ul>              Promo Volume: The total volume for all the products on promotion </ul>
              <ul>    Non Promo Volume: The total volume for all the products off promotion </ul>
              <ul>              Promo sales variation YoY: The variation of a given measure of promo sales for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Non Promo sales variation YoY: The variation of a given measure of non promo sales for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Promo volume variation YoY: The variation of a given measure of promo volume for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Non Promo volume variation YoY: The variation of a given measure of non promo volume for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Promo sales variation LFL: The variation of a given measure of promo LFL sales for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Non Promo sales variation LFL: The variation of a given measure of non promo LFL sales for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>             Promo volume variation LFL: The variation of a given measure of promo LFL volume for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Non Promo volume variation LFL: The variation of a given measure of non promo LFL volume for a set time period this year versus the equivalent time period last year (week).</ul>
              <ul>              Number of products on promotion: Count of products flagged as promotion</ul>

            </list>

          </Modal.Body>
        </Modal>

        {/*MODAL FOR Participation Charts */}

        <Modal show={this.state.promoPartInfo} bsSize="lg"
               aria-labelledby="contained-modal-title-lg"
        >
          <Modal.Header>

            <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
              style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
              style={{textAlign: 'right', float: 'right'}}
              onClick={() => this.setState({promoPartInfo: false})}><b>X</b></span></span>
              <div style={{textAlign: 'center'}}>
                <div style={{textAlign: 'right'}}>
                </div>
              </div>
            </Modal.Title>

          </Modal.Header>
          <Modal.Body style={{fontSize: '14px'}}>
            <list>
              <ul>   Promo participation: The proportion of volume that was sold due to promotions</ul>
            </list>

          </Modal.Body>
        </Modal>

        {/*MODAL FOR Promo Table */}

        <Modal show={this.state.promoTabInfo} bsSize="lg"
               aria-labelledby="contained-modal-title-lg"
        >
          <Modal.Header>

            <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
              style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
              style={{textAlign: 'right', float: 'right'}}
              onClick={() => this.setState({promoTabInfo: false})}><b>X</b></span></span>
              <div style={{textAlign: 'center'}}>
                <div style={{textAlign: 'right'}}>
                </div>
              </div>
            </Modal.Title>

          </Modal.Header>
          <Modal.Body style={{fontSize: '14px'}}>
            <list>
              <ul>  This table helps you to identify the top selling products on promotion </ul>

            </list>

          </Modal.Body>
        </Modal>



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
