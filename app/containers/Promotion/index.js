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
  pieChartSuccess,
  promoGiveAwaySuccess,
  productsCountSplitSuccess,
  promoParticipationBySplitSuccess,
  productsTableSplitSuccess,
  kpiDataSuccess,

} from './actions';

function glyphiconFormatter(cell){
  console.log("Cell:",cell);
  if (cell > 0) {
    let classType = "glyphicon glyphicon-triangle-top glyphiconPositive";
    return classType;
  }
  else if (cell < 0) {
    let classType ="glyphicon glyphicon-triangle-bottom glyphiconNegative";
    return classType;
  } else {
    let classType = "glyphicon glyphicon-minus-sign glyphiconNeutral";
    return classType;
  }

}

function triangleColumnFormatter(cell, row) {
  if (cell > 0) {
    return '<i class="glyphicon glyphicon-triangle-top glyphiconPositive"></i>&nbsp;'+ cell+'%';
  }
  else if (cell < 0) {
    return '<i class="glyphicon glyphicon-triangle-bottom glyphiconNegative"></i>&nbsp;'+ cell+'%';
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

    console.log('this.props', this.props);
    return (
      <div>
        <Helmet
          title="Promotion"
          meta={[
            {name: 'description', content: 'Description of Promotion'},
          ]}
        />


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
                               week_data={this.props.promotion.week_filter_data}
                               ongenerateWeekFilter={this.props.onGetWeekFilter}
                               onSaveWeekFilterParam={this.props.onSaveWeekFilterParam}
                               previous_week_selection={this.props.weekurlParam}
                               loadKpi={this.props.loadKpi}
                               loadSales={this.props.loadSales}
                               loadPromoGiveaway={this.props.loadPromoGiveaway}
                               loadPromoProd={this.props.loadPromoProd}
                               loadPromoPart={this.props.loadPromoPart}
                               pieChartSuccess={this.props.pieChartSuccess}
                               promoGiveAwaySuccess={this.props.promoGiveAwaySuccess}
                               productsCountSplitSuccess={this.props.productsCountSplitSuccess}
                               promoParticipationBySplitSuccess={this.props.promoParticipationBySplitSuccess}
                               productsTableSplitSuccess={this.props.productsTableSplitSuccess}
                               kpiDataSuccess={this.props.kpiDataSuccess}
                               weekurlParam={this.props.promotion.weekurlParam}
                               urlParamsString={this.props.promotion.urlParamsString}

                  />
                );
              }
              else {
                return (

                  <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                );
              }
            })()}
          </div>
          <div style={{
            width: '78%',
            marginLeft: '22%'
          }}>

          <div className="row" style={{marginLeft: "0.5%", paddingTop: "-5px"}}>
            {/*<FormattedMessage {...messages.header} />*/}
            <div className="pageTitle">
              {(() => {
                if (this.props.promotion.kpi_data.selected_week) {
                  return (
                    <span>Promotions View - {this.props.promotion.kpi_data.selected_week} </span>
                  )
                } else {
                  return (
                    <span>Promotions View - 201711  </span>
                  )
                }
              })()}
            </div>
          <div className="col-md-12 content-wrap" style={{background:"#fafafa"}}>
              <Nav bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect} className="tabsCustom" style={{marginLeft: '1%', marginBottom: '0%'}}>
              <NavItem className="tabsCustomListTime" eventKey="1" onClick={() => {

                    dataWeekParam = "week_flag=Current Week";
                    this.setState({activeKey1: "1"});
                    this.props.pieChartSuccess(0);
                    this.props.promoGiveAwaySuccess(0);
                    this.props.productsCountSplitSuccess(0);
                    this.props.promoParticipationBySplitSuccess(0);
                    this.props.productsTableSplitSuccess(0);

                    this.props.onSaveWeekParam(dataWeekParam);
                    this.props.loadKpi();
                    this.props.loadSales();
                    this.props.loadPromoGiveaway();
                    this.props.loadPromoProd();
                    this.props.loadPromoPart();
                  }}><span className="tab_label">Selected Week</span></NavItem>

                  <NavItem className="tabsCustomListTime" eventKey="2" onClick={() => {
                    this.setState({activeKey1: "2"});

                    this.props.pieChartSuccess(0);
                    this.props.promoGiveAwaySuccess(0);
                    this.props.productsCountSplitSuccess(0);
                    this.props.promoParticipationBySplitSuccess(0);
                    this.props.productsTableSplitSuccess(0);


                    dataWeekParam = "week_flag=Latest 4 Weeks";
                    this.props.onSaveWeekParam(dataWeekParam);
                    this.props.loadKpi();
                    this.props.loadSales();
                    this.props.loadPromoGiveaway();
                    this.props.loadPromoProd();
                    this.props.loadPromoPart();
                  }}><span className="tab_label">Last 4 weeks</span></NavItem>

                  <NavItem className="tabsCustomListTime" eventKey="3" onClick={() => {
                    this.setState({activeKey1: "3"});

                    this.props.pieChartSuccess(0);
                    this.props.promoGiveAwaySuccess(0);
                    this.props.productsCountSplitSuccess(0);
                    this.props.promoParticipationBySplitSuccess(0);
                    this.props.productsTableSplitSuccess(0);

                    dataWeekParam = "week_flag=Latest 13 Weeks";
                    this.props.onSaveWeekParam(dataWeekParam);
                    this.props.loadKpi();
                    this.props.loadSales();
                    this.props.loadPromoGiveaway();
                    this.props.loadPromoProd();
                    this.props.loadPromoPart();
                  }}><span className="tab_label">Last 13 weeks</span></NavItem>
                  <NavItem className="tabsCustomListTime" eventKey="4" onClick={() => {
                    this.setState({activeKey1: "4"});

                    this.props.pieChartSuccess(0);
                    this.props.promoGiveAwaySuccess(0);
                    this.props.productsCountSplitSuccess(0);
                    this.props.promoParticipationBySplitSuccess(0);
                    this.props.productsTableSplitSuccess(0);

                    dataWeekParam = "week_flag=Latest 26 Weeks";
                    this.props.onSaveWeekParam(dataWeekParam);
                    this.props.loadKpi();
                    this.props.loadSales();
                    this.props.loadPromoGiveaway();
                    this.props.loadPromoProd();
                    this.props.loadPromoPart();
                  }}><span className="tab_label">Last 26 weeks</span></NavItem>


              <NavItem className="tabsCustomListTime" eventKey="5" onClick={() => {
                this.setState({activeKey1: "5"});

                    this.props.pieChartSuccess(0);
                    this.props.promoGiveAwaySuccess(0);
                    this.props.productsCountSplitSuccess(0);
                    this.props.promoParticipationBySplitSuccess(0);
                    this.props.productsTableSplitSuccess(0);

                    dataWeekParam = "week_flag=YTD";
                    this.props.onSaveWeekParam(dataWeekParam);
                    this.props.loadKpi();
                    this.props.loadSales();
                    this.props.loadPromoGiveaway();
                    this.props.loadPromoProd();
                    this.props.loadPromoPart();
                  }}><span className="tab_label">YTD</span></NavItem>
                </Nav>
            <div>
              <div className="mainBox">
                <Nav bsStyle="tabs" activeKey={this.state.activeKey2} onSelect={this.handleSelect}
                     className="tabsCustom mainTab" style={{margin: "0px"}}>
                  <NavItem className="tabsNavPanelList1" eventKey="1" onClick={() => {
                    this.setState({activeKey2: "1"});
                    this.props.kpiDataSuccess(0);
                    kpiParam = "kpi_type=value";
                    this.props.onSaveKPIParam(kpiParam);
                    this.props.loadKpi();
                    this.props.loadSales();
                    this.props.loadPromoPart();


                  }}><span className="tab_label">Value</span></NavItem>
                  <NavItem className="tabsNavPanelList1" eventKey="2" onClick={() => {
                    this.setState({activeKey2: "2"});
                    this.props.kpiDataSuccess(0);
                    kpiParam = "kpi_type=volume";
                    this.props.onSaveKPIParam(kpiParam);
                    this.props.loadKpi();
                    this.props.loadSales();
                    this.props.loadPromoPart();
                  }}><span className="tab_label">Volume</span></NavItem>
                  <span className="glyphicon glyphicon-info-sign pull-right"
                        style={{right: '4px', fontSize: '15px', top: '8px', color: "#00539f", fontWeight: "bold"}}
                        onClick={() => {
                          this.setState({promoKPIInfo: true});
                        }}>

            </span>
            </Nav>

        </div>


            {/* Promo KPI Boxes */}
          <div className="coverBox">
            <div className="headerBox">
              <h2 className="pageModuleMainTitle">Promotion Performance</h2>
            </div>
            <div style={{textAlign: 'center'}}>

                  {(() => {
                    if (this.props.promotion.kpi_data && this.props.promotion.kpiSpinnerSuccess) {
                      return (
                      <div className="row mainBox">

                        <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa",paddingLeft:'15px',paddingRight:'15px'}}>
                          <Panel>
                            <h3 className="pageModuleSubTitle"> Total {this.props.promotion.kpi_data.kpi_name} </h3>

                            <div className="row">
                              <div className="col-md-6 col-xs-6">
                                <h3 style={{padding:"0px", margin:"0px"}}>{this.props.promotion.kpi_data.total.total}</h3>
                              </div>
                              <div className="col-md-6 col-xs-6">
                                <h3 style={{padding:"0px", margin:"0px"}}>LFL&nbsp; {this.props.promotion.kpi_data.total.total_lfl} </h3>
                              </div>
                            </div>

                            <div className="row">
                              <div className="panel-body cardPanel">
                                {(() =>{
                                  if(this.props.promotion.week_param=='week_flag=Current Week')
                                  {
                                    return(
                                      <div className="col-md-4 col-xs-4 ">
                                        <h4>
                                    <span className={glyphiconFormatter(this.props.promotion.kpi_data.total.var_total_wow)}>
                                    </span>{(this.props.promotion.kpi_data.total.var_total_wow)+'%'}
                                        </h4>
                                        <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                      </div>
                                    )
                                  }

                                  }
                                )()}



                                <div className={(() =>{
                                    if(this.props.promotion.week_param=='week_flag=Current Week')
                                    {
                                      return("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                      )
                                    }
                                    else{
                                      return(
                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                      )
                                    }

                                  }
                                )()}>
                                  <h4>
                                    <span className={glyphiconFormatter(this.props.promotion.kpi_data.total.var_total_yoy)}>
                                    </span>{(this.props.promotion.kpi_data.total.var_total_yoy)+'%'}
                                  </h4>
                                  <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                </div>
                                <div className={(() =>{
                                    if(this.props.promotion.week_param=='week_flag=Current Week')
                                    {
                                      return("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                      )
                                    }
                                    else{
                                      return(
                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                      )
                                    }

                                  }
                                )()}>
                                  <h4>
                                    <span className={glyphiconFormatter(this.props.promotion.kpi_data.total.var_total_lfl)}>
                                    </span>{(this.props.promotion.kpi_data.total.var_total_lfl)+'%'}
                                  </h4>
                                  <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                </div>
                              </div>
                            </div>
                          </Panel>
                        </div>

                        <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa",paddingLeft:'15px',paddingRight:'15px'}}>
                          <Panel>
                            <h3 className="pageModuleSubTitle"> Promo {this.props.promotion.kpi_data.kpi_name} </h3>

                            <div className="row">
                              <div className="col-md-6 col-xs-6">

                                <h3 style={{padding:"0px", margin:"0px"}}> {this.props.promotion.kpi_data.promo.promo} </h3>
                              </div>
                              <div className="col-md-6 col-xs-6">
                                <h3 style={{padding:"0px", margin:"0px"}}>LFL&nbsp;{this.props.promotion.kpi_data.promo.promo_lfl} </h3>
                              </div>
                            </div>

                            <div className="row">
                              <div className="panel-body cardPanel">

                                {(() =>{
                                    if(this.props.promotion.week_param=='week_flag=Current Week')
                                    {
                                      console.log("week param is current week");
                                      return(
                                        <div className="col-md-4 col-xs-4 ">
                                          <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.promo.var_promo_wow)}></span>
                                            {(this.props.promotion.kpi_data.promo.var_promo_wow)+'%'}
                                          </h4>
                                          <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                        </div>
                                      )
                                    }


                                  }
                                )()}


                                <div className={(() =>{
                                    if(this.props.promotion.week_param=='week_flag=Current Week')
                                    {
                                      console.log("week param is current week");
                                      return("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                      )
                                    }
                                    else{
                                      console.log("week param is not current week");
                                      return(
                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                      )
                                    }

                                  }
                                )()}>
                                  <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.promo.var_promo_yoy)}></span>
                                    {(this.props.promotion.kpi_data.promo.var_promo_yoy)+'%'}
                                  </h4>
                                  <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                </div>
                                <div className={(() =>{
                                    if(this.props.promotion.week_param=='week_flag=Current Week')
                                    {
                                      return("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                      )
                                    }
                                    else{
                                      return(
                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                      )
                                    }

                                  }
                                )()}>
                                  <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.promo.var_promo_lfl)}></span>
                                    {(this.props.promotion.kpi_data.promo.var_promo_lfl)+'%'}
                                  </h4>
                                  <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                </div>
                              </div>
                            </div>
                          </Panel>
                        </div>

                        <div className="col-md-4 col-xs-4" style={{backgroundColor: "#fafafa",paddingLeft:'15px',paddingRight:'15px'}}>
                          <Panel>
                            <h3 className="pageModuleSubTitle"> Non Promo {this.props.promotion.kpi_data.kpi_name} </h3>

                            <div className="row">
                              <div className="col-md-6 col-xs-6">

                                <h3 style={{padding:"0px", margin:"0px"}}>  {this.props.promotion.kpi_data.nonpromo.nonpromo} </h3>
                              </div>
                              <div className="col-md-6 col-xs-6">
                                <h3 style={{padding:"0px", margin:"0px"}}>LFL&nbsp;    {this.props.promotion.kpi_data.nonpromo.nonpromo_lfl} </h3>
                              </div>
                            </div>

                            <div className="row">
                              <div className="panel-body cardPanel">

                                {(() =>{
                                  if(this.props.promotion.week_param=='week_flag=Current Week')
                                  {
                                    return(
                                      <div className="col-md-4 col-xs-4 ">
                                        <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.nonpromo.var_nonpromo_wow)}></span>
                                          {(this.props.promotion.kpi_data.nonpromo.var_nonpromo_wow)+'%'}
                                        </h4>
                                        <h5 className="kpiSubTitle"><b>WoW</b></h5>
                                      </div>
                                    )
                                  }


                                }
                              )()}


                                <div className={(() =>{
                                    if(this.props.promotion.week_param=='week_flag=Current Week')
                                    {
                                      return("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                      )
                                    }
                                    else{
                                      return(
                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                      )
                                    }

                                  }
                                )()}>
                                  <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.nonpromo.var_nonpromo_yoy)}></span>
                                    {(this.props.promotion.kpi_data.nonpromo.var_nonpromo_yoy)+'%'}
                                  </h4>
                                  <h5 className="kpiSubTitle"><b>YOY</b></h5>
                                </div>
                                <div className={(() =>{
                                    if(this.props.promotion.week_param=='week_flag=Current Week')
                                    {
                                      return("col-md-4 col-xs-12 col-sm-4 col-lg-4"

                                      )
                                    }
                                    else{
                                      return(
                                        "col-md-6 col-xs-12 col-sm-6 col-lg-6"
                                      )
                                    }

                                  }
                                )()}>
                                  <h4>
                                    <span
                                      className={glyphiconFormatter(this.props.promotion.kpi_data.nonpromo.var_nonpromo_lfl)}></span>
                                    {(this.props.promotion.kpi_data.nonpromo.var_nonpromo_lfl)+'%'}
                                  </h4>
                                  <h5 className="kpiSubTitle"><b>LFL</b></h5>
                                </div>
                              </div>
                            </div>
                          </Panel>
                        </div>

            </div>
                      )
                    } else {
                      return (

                        <div className="text-center"><Spinner />Please Wait a Moment....!</div>

                      );
                    }
                  })()}
            </div>

            <div>
              <panel>
                {/*Row for sales */}
                <div className="row">
                  <div className="headerBox">
                    <h2 className="pageModuleMainTitle">Total &nbsp; {this.props.promotion.kpi_data.kpi_name} &nbsp; Split by Promo Type       <span className="glyphicon glyphicon-info-sign pull-right"
                                                                                                  style={{right: '4px', fontSize: '15px', top: '8px'}}
                                                                                                  onClick={() => {
                                                                                                    this.setState({promoSalesInfo: true});
                                                                                                  }}>

                  </span>
                    </h2>
                  </div>
              <div>
                <div className="mainBox">
                  <panel>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">

                          {(() => {
                            if (this.props.promotion.sales_data && this.props.promotion.pieChartSpinnerSuccess) {
                              console.log("pie chart data", this.props.promotion.sales_data.promo_sales.pie_chart);
                              return (
                                <div style={{background:"#f5f5f5",borderRadius:"4px"}}>
                                  <div className="col-md-9 col-sm-9 col-xs-9" style={{textAlign:"center"}}>
                                    <h3 className="pageModuleSubTitle" style={{marginTop:"12px"}}>Share by Promo Type</h3>
                                  </div>
                                  <div className="col-md-3 col-sm-3 col-xs-3" style={{ marginTop: "8px"}}>
                                    <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                                      backgroundColor: "transparent",
                                      borderColor: "transparent",
                                      color: "#00539f"
                                    }} id="dropButtonId">
                                      <MenuItem onClick={() => {
                                        saveImage(document.getElementById('piechart' + '_svg'), "promo_sales_piechart")
                                      }
                                      }>Save As JPEG</MenuItem>
                                      <MenuItem onClick={() => {
                                        saveDataAsCSV(this.props.promotion.sales_data.promo_sales.pie_chart, "promo_sales_piechart_data.csv")
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
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                      <div className="col-md-12 col-sm-12">
                        {/*Nav for Sales data*/}
                        <span style={{float:"left"}}>
                      <Nav bsStyle="tabs" activeKey={this.state.activeKey4} onSelect={this.handleSelect}
                           className="tabsCustom secondaryTabs" style={{margin:"0px"}}>
                        <NavItem className="tabsNavPanelList1" eventKey="1" onClick={() => {

                         let promoTypeParam = "";
                          this.setState({activeKey4: "1"});
                          this.props.pieChartSuccess(0);
                          this.props.onSaveSalesParam(promoTypeParam);
                          this.props.loadSales();
                        }}><span className="tab_label">Total</span></NavItem>

                        <NavItem className="tabsNavPanelList1" eventKey="2" onClick={() => {

                                let promoTypeParam = "promo_type=Price Cut";
                                this.setState({activeKey4: "2"});
                                this.props.pieChartSuccess(0);
                                this.props.onSaveSalesParam(promoTypeParam);
                                this.props.loadSales();
                              }}><span className="tab_label">Price Cut</span></NavItem>

                              <NavItem className="tabsNavPanelList1" eventKey="3" onClick={() => {
                                this.setState({activeKey4: "3"});
                                this.props.pieChartSuccess(0);
                                let promoTypeParam = "promo_type=Multibuy";
                                this.props.onSaveSalesParam(promoTypeParam);
                                this.props.loadSales();

                              }}><span className="tab_label">Multibuy</span></NavItem>

                              <NavItem className="tabsNavPanelList1" eventKey="4" onClick={() => {
                                this.setState({activeKey4: "4"});
                                this.props.pieChartSuccess(0);
                                let promoTypeParam = "promo_type=Linksave";
                                this.props.onSaveSalesParam(promoTypeParam);
                                this.props.loadSales();

                              }}><span className="tab_label">Linksave</span></NavItem>

                              <NavItem className="tabsNavPanelList1" eventKey="5" onClick={() => {
                                this.setState({activeKey4: "5"});
                                this.props.pieChartSuccess(0);
                                let promoTypeParam = "promo_type=Non Promo";
                                this.props.onSaveSalesParam(promoTypeParam);
                                this.props.loadSales();
                              }}><span className="tab_label">Non Promo</span></NavItem>
                            </Nav>
                        </span>
                        <span style={{float:"right"}}>
                          <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                            color: "#00539f"
                          }} id="dropButtonId">
                            <MenuItem onClick={() => {
                              saveImage(document.getElementById('sampleSvg'), "promo_sales_trend_multilineChart")
                            }
                            }>Save As JPEG</MenuItem>
                            <MenuItem onClick={() => {
                              saveDataAsCSV(this.props.promotion.sales_data.promo_sales.trend, "promo_sales_trend_multilineChart_data.csv")
                            }
                            }>Download CSV</MenuItem>
                          </DropdownButton>
                        </span>
                          </div>

                          <div>
                            {(() => {
                              if (this.props.promotion.sales_data && this.props.promotion.pieChartSpinnerSuccess) {
                                console.log("Promo Sales line chart data", this.props.promotion.sales_data.promo_sales.trend);
                                return (
                                  <div>
                                    <MultilinePromo data={this.props.promotion.sales_data.promo_sales.trend}
                                                    id="linechart" label_ty="Sales TY" label_ly="Sales LY"
                                                    xaxis_title="Tesco Week"
                                                    no_pref={this.props.promotion.sales_data.no_pref} no_suffix=''
                                                    yaxis_title={this.props.promotion.sales_data.yaxis_title}/>
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
                </div>
                </div>
                    {/*Row for giveaway*/}
                    <div className="col-md-12 col-sm-12">
                      <h2 className="pageModuleMainTitle">Promotion Giveaway Split By Promo Type
                        <span
                        className="glyphicon glyphicon-info-sign pull-right"
                        style={{right: '4px', fontSize: '15px', top: '8px'}}
                        onClick={() => {
                          this.setState({promoGiveawayInfo: true});
                        }}></span>
                      </h2>
                      <panel>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">

                          {(() => {

                            if (this.props.promotion.promo_giveaway_data && this.props.promotion.promoGiveAwaySpinnerSuccess) {
                              console.log("pie chart promo_giveaway data", this.props.promotion.promo_giveaway_data.pie_chart);
                              return (
                                <div style={{background:"#f5f5f5",borderRadius:"4px"}}>
                                  <div className="col-md-9 col-sm-9 col-xs-9" style={{textAlign:"center"}}>
                                    <h3 className="pageModuleSubTitle" style={{marginTop:"12px"}}>Share by Promo Type</h3>
                                  </div>
                                  <div className="col-md-3 col-sm-3 col-xs-3" style={{ marginTop: "8px"}}>
                                    <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                                      backgroundColor: "transparent",
                                      borderColor: "transparent",
                                      color: "#00539f"
                                    }} id="dropButtonId">
                                      <MenuItem onClick={() => {
                                        saveImage(document.getElementById('piechart2' + '_svg'), "promo_giveaway_piechart")
                                      }
                                      }>Save As JPEG</MenuItem>
                                      <MenuItem onClick={() => {
                                        saveDataAsCSV(this.props.promotion.promo_giveaway_data.pie_chart, "promo_giveaway_data.csv")
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
                    <div className="col-lg-8 col-md-8 col-md-12 col-xs-8">
                      {/*Nav for Giveaway*/}
                      <div className="col-md-12 col-sm-12">
                        <span style={{float:"left"}}>
                      <Nav bsStyle="tabs" activeKey={this.state.activeKey5} onSelect={this.handleSelect}
                           className="tabsCustom secondaryTabs" style={{margin:"0px"}}>
                        <NavItem className="tabsNavPanelList1" eventKey="1" onClick={() => {

                                let promoTypeParam = "";
                                this.setState({activeKey5: "1"});
                                this.props.promoGiveAwaySuccess(0);
                                this.props.onSaveGiveawayParam(promoTypeParam);
                                this.props.loadPromoGiveaway();
                              }}><span className="tab_label">Total</span></NavItem>

                              <NavItem className="tabsNavPanelList1" eventKey="2" onClick={() => {

                                let promoTypeParam = "promo_type=Price Cut";
                                this.setState({activeKey5: "2"});
                                this.props.promoGiveAwaySuccess(0);
                                this.props.onSaveGiveawayParam(promoTypeParam);
                                this.props.loadPromoGiveaway();
                              }}><span className="tab_label">Price Cut</span></NavItem>

                              <NavItem className="tabsNavPanelList1" eventKey="3" onClick={() => {
                                this.setState({activeKey5: "3"});
                                this.props.promoGiveAwaySuccess(0);
                                let promoTypeParam = "promo_type=Multibuy";
                                this.props.onSaveGiveawayParam(promoTypeParam);
                                this.props.loadPromoGiveaway();

                              }}><span className="tab_label">Multibuy</span></NavItem>

                              <NavItem className="tabsNavPanelList1" eventKey="4" onClick={() => {
                                this.setState({activeKey5: "4"});
                                this.props.promoGiveAwaySuccess(0);
                                let promoTypeParam = "promo_type=Linksave";
                                this.props.onSaveSalesParam(promoTypeParam);
                                this.props.loadSales();

                              }}><span className="tab_label">Linksave</span></NavItem>


                            </Nav>
                            </span>
                            <span style={{float: "right"}}>
                              <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                                color: "#00539f"
                              }} id="dropButtonId">
                                <MenuItem onClick={() => {
                                  saveImage(document.getElementById('linechart2' + '_svg'), "promo_giveaway_linechart")
                                }
                                }>Save As JPEG</MenuItem>
                                <MenuItem onClick={() => {
                                  saveDataAsCSV(this.props.promotion.promo_giveaway_data.trend, "promo_giveaway_linechart_data.csv")
                                }
                                }>Download CSV</MenuItem>
                              </DropdownButton>
                            </span>
                          </div>
                          <div className="row">
                            {(() => {
                              if (this.props.promotion.promo_giveaway_data && this.props.promotion.promoGiveAwaySpinnerSuccess) {
                                console.log("Promo Giveaway line chart data", this.props.promotion.promo_giveaway_data.trend);
                                return (
                                  <div>

                                    <MultilinePromo data={this.props.promotion.promo_giveaway_data.trend}
                                                    id="linechart2" label_ty="Promo Giveaway TY"
                                                    label_ly="Promo Giveaway LY" xaxis_title="Tesco Week"
                                                    yaxis_title="Promo Giveaway" no_pref='£' no_suffix=''/>
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
                <div className="col-md-12 col-sm-12">
                  <h2 className="pageModuleMainTitle">Products Count Split By Promo Type
                    <span className="glyphicon glyphicon-info-sign pull-right"
                          style={{right: '4px', fontSize: '15px', top: '8px'}}
                          onClick={() => {
                            this.setState({promoProdInfo: true});
                          }}>

                    </span>
                  </h2>
                  <panel>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">

                          {(() => {

                            if (this.props.promotion.promo_prod_data && this.props.promotion.productsCountSplitSpinnerSuccess) {
                              console.log("pie chart promo_products data", this.props.promotion.promo_prod_data.pie_chart);
                              return (
                                <div style={{background:"#f5f5f5",borderRadius:"4px"}}>
                                  <div className="col-md-9 col-sm-9 col-xs-9" style={{textAlign:"center"}}>
                                    <h3 className="pageModuleSubTitle" style={{marginTop:"12px"}}>Dist by Promo Type</h3>
                                  </div>
                                  <div className="col-md-3 col-sm-3 col-xs-3" style={{ marginTop: "8px"}}>
                                    <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                                      backgroundColor: "transparent",
                                      borderColor: "transparent",
                                      color: "#00539f"
                                    }} id="dropButtonId">
                                      <MenuItem onClick={() => {
                                        saveImage(document.getElementById('piechart3' + '_svg'), "promo_products_piechart")
                                      }
                                      }>Save As JPEG</MenuItem>
                                      <MenuItem onClick={() => {
                                        saveDataAsCSV(this.props.promotion.promo_prod_data.pie_chart, "promo_products_piechart_data.csv")
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
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                          {/*Nav for Promo products*/}
                          <div className="col-md-12 col-sm-12">
                            <span style={{float:"left"}}>
                            <Nav bsStyle="tabs" activeKey={this.state.activeKey6} onSelect={this.handleSelect}
                                 className="tabsCustom secondaryTabs" style={{margin: "0px"}}>
                              <NavItem className="tabsNavPanelList1" eventKey="1" onClick={() => {
                                let promoTypeParam = "";
                                this.setState({activeKey6: "1"});
                                this.props.productsCountSplitSuccess(0);
                                this.props.onSavePromoProdParam(promoTypeParam);
                                this.props.loadPromoProd();
                              }}><span className="tab_label">Total</span></NavItem>


                              <NavItem className="tabsNavPanelList1" eventKey="2" onClick={() => {
                                let promoTypeParam = "promo_type=Price Cut";
                                this.setState({activeKey6: "2"});
                                this.props.productsCountSplitSuccess(0);
                                this.props.onSavePromoProdParam(promoTypeParam);
                                this.props.loadPromoProd();
                              }}><span className="tab_label">Price Cut</span></NavItem>

                              <NavItem className="tabsNavPanelList1" eventKey="3" onClick={() => {
                                this.setState({activeKey6: "3"});
                                this.props.productsCountSplitSuccess(0);
                                let promoTypeParam = "promo_type=Multibuy";
                                this.props.onSavePromoProdParam(promoTypeParam);
                                this.props.loadPromoProd();

                              }}><span className="tab_label">Multibuy</span></NavItem>

                              <NavItem className="tabsNavPanelList1" eventKey="4" onClick={() => {
                                this.setState({activeKey6: "4"});
                                this.props.productsCountSplitSuccess(0);
                                let promoTypeParam = "promo_type=Linksave";
                                this.props.onSaveSalesParam(promoTypeParam);
                                this.props.loadSales();

                              }}><span className="tab_label">Linksave</span></NavItem>


                              <NavItem className="tabsNavPanelList1" eventKey="5" onClick={() => {
                                this.setState({activeKey6: "5"});
                                this.props.productsCountSplitSuccess(0);
                                let promoTypeParam = "promo_type=Non Promo";
                                this.props.onSavePromoProdParam(promoTypeParam);
                                this.props.loadPromoProd();
                              }}><span className="tab_label">Non Promo</span></NavItem>
                            </Nav>
                            </span>
                            <span style={{float:"right"}}>
                              <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                                color: "#00539f"
                              }} id="dropButtonId">
                                  <MenuItem onClick={() => {
                                    saveImage(document.getElementById('linechart3' + '_svg'), "promo_products_trend_multilineChart")
                                  }
                                  }>Save As JPEG</MenuItem>
                                  <MenuItem onClick={() => {
                                    saveDataAsCSV(this.props.promotion.promo_prod_data.trend, "promo_products_trend_multilineChart_data.csv")
                                  }
                                  }>Download CSV</MenuItem>
                                </DropdownButton>
                            </span>
                          </div>
                          <div className="row">
                            {(() => {
                              if (this.props.promotion.promo_prod_data && this.props.promotion.productsCountSplitSpinnerSuccess) {
                                console.log("Promo Giveaway line chart data", this.props.promotion.promo_prod_data.trend);
                                return (
                                  <div>
                                    <MultilinePromo data={this.props.promotion.promo_prod_data.trend}
                                                    id="linechart3" label_ty="Products on Promo TY"
                                                    label_ly="Products on Promo LY" xaxis_title="Tesco Week"
                                                    yaxis_title="Products on Promo" no_pref='' no_suffix=''/>
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
                <div className="col-md-12 col-sm-12">
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
                            if (this.props.promotion.promo_part_data && this.props.promotion.promoparticipationSplitSpinnerSuccess) {
                              console.log("pie chart promo_products data", this.props.promotion.promo_part_data.pie_chart);
                              return (
                                <div style={{background:"#f5f5f5",borderRadius:"4px"}}>
                                  <div className="col-md-9 col-sm-9 col-xs-9" style={{textAlign:"center"}}>
                                    <h3 className="pageModuleSubTitle" style={{marginTop:"12px"}}>Promo value participation</h3>
                                  </div>
                                  <div className="col-md-3 col-sm-3 col-xs-3" style={{ marginTop: "8px"}}>
                                    <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                                      backgroundColor: "transparent",
                                      borderColor: "transparent",
                                      color: "#00539f"
                                    }} id="dropButtonId">
                                      <MenuItem onClick={() => {
                                        saveImage(document.getElementById('piechart4' + '_svg'), "promo_participation_split_pieChart")
                                      }
                                      }>Save As JPEG</MenuItem>
                                      <MenuItem onClick={() => {
                                        saveDataAsCSV(this.props.promotion.promo_part_data.pie_chart, "promo_participation_split_pieChart_data.csv")
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
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                      {/*Nav for Promo Participation*/}
                      <div className="col-md-12 col-sm-12">
                        <span style={{float:"left"}}>
                      <Nav bsStyle="tabs" activeKey={this.state.activeKey7} onSelect={this.handleSelect}
                           className="tabsCustom secondaryTabs" style={{margin:"0px"}}>

                        <NavItem className="tabsNavPanelList1" eventKey="1" onClick={() => {

                                let promoTypeParam = "";
                                this.setState({activeKey7: "1"});
                                this.props.promoParticipationBySplitSuccess(0);
                                this.props.onSavePromoPartParam(promoTypeParam);
                                this.props.loadPromoPart();
                              }}><span className="tab_label">Total</span></NavItem>

                              <NavItem className="tabsNavPanelList1" eventKey="2" onClick={() => {

                                let promoTypeParam = "promo_type=Price Cut";
                                this.setState({activeKey7: "2"});
                                this.props.promoParticipationBySplitSuccess(0);
                                this.props.onSavePromoPartParam(promoTypeParam);
                                this.props.loadPromoPart();
                              }}><span className="tab_label">Price Cut</span></NavItem>

                              <NavItem className="tabsNavPanelList1" eventKey="3" onClick={() => {
                                this.setState({activeKey7: "3"});
                                this.props.promoParticipationBySplitSuccess(0);
                                let promoTypeParam = "promo_type=Multibuy";
                                this.props.onSavePromoPartParam(promoTypeParam);
                                this.props.loadPromoPart();

                              }}><span className="tab_label">Multibuy</span></NavItem>
                              <NavItem className="tabsNavPanelList1" eventKey="4" onClick={() => {
                                this.setState({activeKey7: "4"});
                                this.props.promoParticipationBySplitSuccess(0);
                                let promoTypeParam = "promo_type=Linksave";
                                this.props.onSaveSalesParam(promoTypeParam);
                                this.props.loadSales();

                              }}><span className="tab_label">Linksave</span></NavItem>

                            </Nav>
                        </span>
                        <span style={{float:"right"}}>
                          <DropdownButton className="glyphicon glyphicon-menu-hamburger" pullRight style={{
                            backgroundColor: "transparent",
                            borderColor: "transparent",
                            color: "#00539f"
                          }} id="dropButtonId">
                            <MenuItem onClick={() => {
                              saveImage(document.getElementById('linechart4' + '_svg'), "promo_participation_split_multilineChart")
                            }
                            }>Save As JPEG</MenuItem>
                            <MenuItem onClick={() => {
                              saveDataAsCSV(this.props.promotion.promo_part_data.pie_chart, "promo_participation_split_multilineChart_data.csv")
                            }
                            }>Download CSV</MenuItem>
                          </DropdownButton>
                        </span>
                          </div>
                          <div className="col-md-12 col-sm-12">
                            {(() => {
                              if (this.props.promotion.promo_part_data && this.props.promotion.promoparticipationSplitSpinnerSuccess) {
                                console.log("Promo Participation line chart data", this.props.promotion.promo_part_data.trend);
                                return (
                                  <div>
                                    <MultilinePromo data={this.props.promotion.promo_part_data.trend}
                                                    id="linechart4" label_ty="Promo Participation TY"
                                                    label_ly="Promo Participation LY" xaxis_title="Tesco Week"
                                                    yaxis_title="Promo Participation" no_pref='' no_suffix='%'/>
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
              <div className="col-md-12 col-sm-12">
            <h2 className="pageModuleMainTitle">Top 25 Products On Promotion
              <span className="glyphicon glyphicon-info-sign pull-right"
                    style={{right: '4px', fontSize: '15px', top: '8px'}}
                    onClick={() => {
                      this.setState({promoTabInfo: true});
                    }}>

                    </span>
            </h2></div>
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

    pieChartSuccess: (e) => dispatch(pieChartSuccess(e)),
    promoGiveAwaySuccess: (e) => dispatch(promoGiveAwaySuccess(e)),
    productsCountSplitSuccess: (e) => dispatch(productsCountSplitSuccess(e)),
    promoParticipationBySplitSuccess: (e) => dispatch(promoParticipationBySplitSuccess(e)),
    productsTableSplitSuccess: (e) => dispatch(productsTableSplitSuccess(e)),
    kpiDataSuccess: (e) => dispatch(kpiDataSuccess(e)),

    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Promotion);
