/*
 *
 * Competitor
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectCompetitor from './selectors';
import MultilineOrdinalChart from 'components/MultilineOrdinalChart';
import './style.scss';
import Pichart from 'components/Pichart';
import BarLineChart from 'components/BarLineChart';
import CascadedFilterNpd from 'components/CascadedFilterNpd';
import { Modal,Nav,NavItem,DropdownButton, MenuItem } from 'react-bootstrap';
import {saveImage,saveDataAsCSV} from './../../utils/exportFunctions';
import WaterFallChart2 from 'components/WaterFallChart2';
import Panel from 'components/panel';
import {
  CompetitorWaterfall,
  CompetitorPieChart,
  CompetitorPriceRange,
  SavePriceParam,
  SaveWeekParam,
  SaveKPIParam,
  getFilter,
  checkboxChange,
  checkboxWeekChange,
  generateUrlParams,
  generateUrlParamsString,
  sendUrlParams,
  CompetitorOutperformance,
  SavePriceIndexParam,
  SaveWeek,

} from './actions';


export class Competitor extends React.PureComponent {
  componentDidMount = () => {
    let dataWeekParam = 'week_flag=None';
    let kpiparam = 'kpi_type=value';
    this.props.onSaveKPIParam(kpiparam);
    this.props.onSaveWeekParam(dataWeekParam);
    this.props.onCompWaterfall();
    this.props.onCompetitorPieChart();
    this.props.onCompetitorPriceRange();
    this.props.onGetFilter();
    this.props.onCompetitorOutperformance();
    console.log('-=-=-=-==-=-==================-=-=-=', this.props.filter_week_selection);
    // this.props.supplier.reducer1.sales;
  };

  componentDidUpdate = () => {
    this.props.onSendUrlParams(this.props.location.query);

  };

  constructor(props) {
    super(props);
    this.state = {

      activeKey1: "1",
      activeKey2: "1",
      activeKey3: "1",
      compMarketPerfInfo : false,
      compPriceIndexInfo: false,
      compPriceRaneInfo : false
    };
  }

  render() {
    // let dataBrandParams = '';
    let kpiParmas = this.props.competitor.kpi_param;
    //let dataWeekUrlParams = '';

    let dataWeekUrlParams = this.props.competitor.week_param;
    let dataFilterUrlParams = this.props.competitor.urlParamsString;

    let dataPriceIndexParam = this.props.competitor.dataPriceIndexParam;
    console.log('this.props',this.props);

    return (
      <Panel>
      <div>
        <Helmet
          title="Competitor"
          meta={[
            {name: 'description', content: 'Description of Competitor'},
          ]}
        />

        {/*Page title*/}
        <div className="pageTitle">
          {(() => {
            if (this.props.competitor.filter_week_selection) {
               return (
                <span>Competitor View - {(this.props.competitor.filter_week_selection).substring(11,17)}</span>
              )
            } else {
              return (
                <span>Competitor View - 201652  </span>
              )
            }
          })()}
        </div>

        <div className="row" style={{
          marginLeft: '0px',
          marginRight: '0px'
        }}>


          {/*Filter*/}
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
              if (this.props.competitor.filter_data) {
                console.log("Filter Data", this.props.competitor.filter_data);

                return (

                  <CascadedFilterNpd
                    filter_data={this.props.competitor.filter_data.filter_data}
                    week_data = {this.props.competitor.filter_data.week_data}
                    location={this.props.location}
                    onCompWaterfall={this.props.onCompWaterfall}
                    onCompetitorPieChart={this.props.onCompetitorPieChart}
                    onCompetitorPriceRange={this.props.onCompetitorPriceRange}
                    onCompetitorOutperformance={this.props.onCompetitorOutperformance}
                    onGenerateUrlParams={this.props.onGenerateUrlParams}
                    onSendUrlParams={this.props.onSendUrlParams}
                    onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                    previous_selection={this.props.competitor.filter_selection}
                    previous_week_selection={this.props.competitor.filter_week_selection}
                    onCheckboxChange={this.props.onCheckboxChange}
                    onGenerateSideFilter={this.props.onGetFilter}
                    dataWeekUrlParams={dataWeekUrlParams}
                    dataFilterUrlParams={dataFilterUrlParams}
                    onSaveWeek={this.props.onSaveWeek}
                    onCheckboxWeekChange = {this.props.onCheckboxWeekChange}

                  />
                )
              }
            })()}

          </div>

          <div style={{
            width: '78%',
            marginLeft: '22%'
          }}>

            <div className="row fixingPosition" style={{marginLeft: "0.5%", paddingTop: "-5px", marginRightt: "0px"}}>
              <div className="col-md-12 content-wrap">

              <Nav bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect} className="tabsCustom">
                <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                  dataWeekUrlParams = "week_flag=Current Week";
                  this.setState({activeKey1: "1"});
                  this.props.onSaveWeekParam(dataWeekUrlParams);
                  this.props.onCompWaterfall();
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorPriceRange();
                  this.props.onCompetitorOutperformance();

                }}><span className="tab_label" >Selected Week</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                  this.setState({activeKey1: "2"});
                  dataWeekUrlParams = "week_flag=Latest 4 Weeks";
                  this.props.onSaveWeekParam(dataWeekUrlParams);
                  this.props.onCompWaterfall();
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorPriceRange();
                  this.props.onCompetitorOutperformance();

                }}><span className="tab_label" >Last 4 weeks</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                  this.setState({activeKey1: "3"});
                  dataWeekUrlParams = "week_flag=Latest 13 Weeks";
                  this.props.onSaveWeekParam(dataWeekUrlParams);
                  this.props.onCompWaterfall();
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorPriceRange();
                  this.props.onCompetitorOutperformance();

                }}><span className="tab_label" >Last 13 weeks</span></NavItem>
                <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                  this.setState({activeKey1: "4"});
                  dataWeekUrlParams = "week_flag=Latest 52 Weeks";
                  this.props.onSaveWeekParam(dataWeekUrlParams);
                  this.props.onCompWaterfall();
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorPriceRange();
                  this.props.onCompetitorOutperformance();

                }}><span className="tab_label" >Last 52 weeks</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                  this.setState({activeKey1: "5"});

                  dataWeekUrlParams = "week_flag=YTD";
                  this.props.onSaveWeekParam(dataWeekUrlParams);
                  this.props.onCompWaterfall();
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorPriceRange();
                  this.props.onCompetitorOutperformance();

                }}><span className="tab_label" >YTD</span></NavItem>
              </Nav>
              <Nav bsStyle="tabs" activeKey={this.state.activeKey2} onSelect={this.handleSelect}  className="tabsCustom">
                <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                  this.setState({activeKey2: "1"});
                  kpiParmas = "kpi_type=value";
                  this.props.onSaveKPIParam(kpiParmas);
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorOutperformance();
                }}><span className="tab_label" >Value</span></NavItem>
                <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                  this.setState({activeKey2: "2"});
                  kpiParmas = "kpi_type=volume";
                  this.props.onSaveKPIParam(kpiParmas);
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorOutperformance();
                }}><span className="tab_label" >Volume</span></NavItem>
              </Nav>

            </div>
            <div className="row" style={{marginLeft: "0px", marginRightt: "0px"}}>

            </div>
            <Modal show={this.state.compMarketPerfInfo} bsSize="lg"
                   aria-labelledby="contained-modal-title-lg"
            >
              <Modal.Header>
                <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                  style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
                  style={{textAlign: 'right', float: 'right'}}
                  onClick={() => this.setState({compMarketPerfInfo: false})}><b>X</b></span></span>
                  <div style={{textAlign: 'center'}}>
                    <div style={{textAlign: 'right'}}>
                    </div>
                  </div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{fontSize: '14px'}}>
                <list>
                  <ul>        Tesco vs competitor market share </ul>
                  <ul>        Tesco vs competitor outperformance and growth </ul>
                </list>
              </Modal.Body>
            </Modal>

            <h4 className="pageModuleMainTitle">Market Performance<span className="glyphicon glyphicon-info-sign pull-right"
                                                                        style={{right: '4px', fontSize: '15px', top: '8px'}}
                                                                        onClick={() => {
                                                                          this.setState({compMarketPerfInfo: true});
                                                                        }}>

            </span> </h4>

            <div className="row">
              <div className="col-xs-4 panel-body ts-blk-proview">
                <h4 className="pageModuleSubTitle"><b>Market Share</b></h4>

                {(() => {

                  if (this.props.competitor.piechart_data.pie_chart_value) {
                    console.log("pie chart data", this.props.competitor.piechart_data);
                    return (
                      <div>
                        <div style={{float:"right"}}>
                          <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                            <MenuItem onClick={() => {
                              saveImage(document.getElementById('piechart'+'_svg'),"pie_chart")
                            }
                            }>Save As JPEG</MenuItem>
                            <MenuItem onClick={() => {
                              saveDataAsCSV(this.props.competitor.piechart_data.pie_chart_value,"pie_chart.csv")
                            }
                            }>Download CSV</MenuItem>
                          </DropdownButton>
                        </div>
                        <Pichart ref = "competitorPieChartComp" data={this.props.competitor.piechart_data.pie_chart_value} id="piechart"/>
                      </div>
                    )
                  }
                })()}
                <div>

                    <div className="panel-body wowformatting">
                      <h4>  WoW </h4>
                      <span
                        className={(() => {
                          if (this.props.competitor.piechart_data.tesco_share_data > 0)
                          {
                            return "glyphicon glyphicon-chevron-up glyphiconPositive"
                          }
                          else if (this.props.competitor.piechart_data.tesco_share_data < 0)
                          {
                            return "glyphicon glyphicon-chevron-down glyphiconNegative"
                          } else {
                            return "glyphicon glyphicon-minus-sign glyphiconNeutral"
                          } })()}>&nbsp;

                        </span>
                      {this.props.competitor.piechart_data.tesco_share_data}
                    </div>



                </div>
              </div>

              <div className="col-xs-8 panel-body ts-blk-proview">
                <h4 className="pageModuleSubTitle"><b>Outperformance</b></h4>
                {(() => {

                  if (this.props.competitor.outperformance_data) {
                    console.log("Outperformance data", this.props.competitor.outperformance_data);
                    return (
                      <div>
                        <div style={{float:"right"}}>
                          <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                            <MenuItem onClick={() => {
                              saveImage(document.getElementById('barline'+'_svg'),"barline_chart")
                            }
                            }>Save As JPEG</MenuItem>
                            <MenuItem onClick={() => {
                              saveDataAsCSV(this.props.competitor.outperformance_data,"barline_chart.csv")
                            }
                            }>Download CSV</MenuItem>
                          </DropdownButton>
                        </div>
                        <BarLineChart data={this.props.competitor.outperformance_data} id="barline" ref="competitorOutperformComp" series_col_name= 'id'/>
                      </div>
                    )
                  }
                })()}
              </div>
            </div>

            <Modal show={this.state.compPriceIndexInfo} bsSize="lg"
                   aria-labelledby="contained-modal-title-lg"
            >
              <Modal.Header>

                <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                  style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
                  style={{textAlign: 'right', float: 'right'}}
                  onClick={() => this.setState({compPriceIndexInfo: false})}><b>X</b></span></span>
                  <div style={{textAlign: 'center'}}>
                    <div style={{textAlign: 'right'}}>
                    </div>
                  </div>
                </Modal.Title>

              </Modal.Header>
              <Modal.Body style={{fontSize: '14px'}}>
                <list>
                  <ul>	Price index split by price and promotions run </ul>
                  <ul>	Price index split by own label and brand </ul>
                  <ul>	Price index split by basket, ie. LMM (Lines that matter most) and Rest of Range </ul>
                </list>


              </Modal.Body>
            </Modal>

            <h4 className="pageModuleMainTitle">Price Index <span className="glyphicon glyphicon-info-sign pull-right"
                                                                  style={{right: '4px', fontSize: '15px', top: '8px'}}
                                                                  onClick={() => {
                                                                    this.setState({compPriceIndexInfo: true});
                                                                  }}>

            </span> </h4>

            <Nav bsStyle="tabs" activeKey={this.state.activeKey3} onSelect={this.handleSelect} className="tabsCustom">
              <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                console.log("Price/Promo button pressed");

                dataPriceIndexParam = "waterfall_index_param=promo_price";
                this.props.onSavePriceIndexParam(dataPriceIndexParam);
                this.props.onCompWaterfall();
              }}><span className="tab_label" >Price/Promo</span></NavItem>
              <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                this.setState({activeKey3: "2"});
                console.log("Own label/Brand button pressed");

                dataPriceIndexParam = "waterfall_index_param=brand";
                this.props.onSavePriceIndexParam(dataPriceIndexParam);
                this.props.onCompWaterfall();
              }}><span className="tab_label" >Own Label/Brand</span></NavItem>
              <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                this.setState({activeKey3: "3"});
                console.log("Basket button pressed");
                dataPriceIndexParam = "waterfall_index_param=basket";
                this.props.onSavePriceIndexParam(dataPriceIndexParam);
                this.props.onCompWaterfall();
              }}><span className="tab_label" >Basket</span></NavItem>
            </Nav>


            {/*<Button onClick={() => {*/}
                {/*this.setState({activeKey: "1"});*/}
                {/*console.log("Price/Promo button pressed");*/}

                {/*dataPriceIndexParam = "waterfall_index_param=promo_price";*/}
                {/*this.props.onSavePriceIndexParam(dataPriceIndexParam);*/}
                {/*this.props.onCompWaterfall();*/}
            {/*}}> Price/Promo  </Button>*/}
            {/*<Button onClick={() => {*/}
                {/*this.setState({activeKey3: "1"});*/}
                {/*console.log("Own label/Brand button pressed");*/}

                {/*dataPriceIndexParam = "waterfall_index_param=brand";*/}
                {/*this.props.onSavePriceIndexParam(dataPriceIndexParam);*/}
                {/*this.props.onCompWaterfall();*/}
              {/*}} >Own Label/Brand</Button>*/}

            {/*<Button onClick={() => {*/}
                {/*this.setState({activeKey3: "9"});*/}
                {/*console.log("Basket button pressed");*/}

                {/*dataPriceIndexParam = "waterfall_index_param=basket";*/}
                {/*this.props.onSavePriceIndexParam(dataPriceIndexParam);*/}
                {/*this.props.onCompWaterfall();*/}
              {/*}} >Basket</Button>*/}


            <div className="row">
              <div className="col-xs-6 panel-body ts-blk-proview">
                <h4 className="pageModuleSubTitle"><b>Asda</b></h4>

                {(() => {
                  if (this.props.competitor.waterfall_data) {
                    console.log("in asda chart div");
                    console.log("consoling basda data", this.props.competitor.waterfall_data);

                    return (
                      <div>
                        <div style={{float:"right"}}>
                          <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                            <MenuItem onClick={() => {
                              saveImage(document.getElementById('waterfallChart_1'+'_svg'),"Asda_priceIndex_waterfall_chart")
                            }
                            }>Save As JPEG</MenuItem>
                            <MenuItem onClick={() => {
                              saveDataAsCSV(this.props.competitor.waterfall_data.asda,"Asda_priceIndex_waterfall_chart.csv")
                            }
                            }>Download CSV</MenuItem>
                          </DropdownButton>
                        </div>
                        <WaterFallChart2
                          id="waterfallChart_1" yAxisName="Price Index" formatter="formatSales"
                          positive_text='negative' negative_text='positive' total_text='total1'
                          data={ this.props.competitor.waterfall_data.asda }/>
                      </div>
                    )
                  }
                })()}
              </div>

              <div className="col-xs-6 panel-body ts-blk-proview">
                <h4 className="pageModuleSubTitle"><b>JS</b></h4>
                {(() => {

                  if (this.props.competitor.waterfall_data) {
                    console.log("------------------------------", this.props.competitor.waterfall_data);
                    return (
                      <div>
                        <div style={{float:"right"}}>
                          <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                            <MenuItem onClick={() => {
                              saveImage(document.getElementById('waterfallChart_2'+'_svg'),"JS_priceIndex_waterfall_chart")
                            }
                            }>Save As JPEG</MenuItem>
                            <MenuItem onClick={() => {
                              saveDataAsCSV(this.props.competitor.waterfall_data.js,"JS_priceIndex_waterfall_chart.csv")
                            }
                            }>Download CSV</MenuItem>
                          </DropdownButton>
                        </div>
                        <WaterFallChart2
                          id="waterfallChart_2" yAxisName="Price Index" formatter="formatSales"
                          positive_text='negative' negative_text='positive' total_text='total1'
                          data={ this.props.competitor.waterfall_data.js }

                        />
                      </div>
                    )
                  }
                })()}
              </div>
            </div>

            <div className="row">
              <div className="col-xs-6 panel-body">
                <h4 className="pageModuleSubTitle"><b>Morrisons</b></h4>
                {(() => {

                  if (this.props.competitor.waterfall_data) {
                    console.log("------------------------------", this.props.competitor.waterfall_data);
                    return (
                      <div>
                        <div style={{float:"right"}}>
                          <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                            <MenuItem onClick={() => {
                              saveImage(document.getElementById('waterfallChart_3'+'_svg'),"Morrisons_priceIndex_waterfall_chart")
                            }
                            }>Save As JPEG</MenuItem>
                            <MenuItem onClick={() => {
                              saveDataAsCSV(this.props.competitor.waterfall_data.morr,"Morrisons_priceIndex_waterfall_chart.csv")
                            }
                            }>Download CSV</MenuItem>
                          </DropdownButton>
                        </div>
                        <WaterFallChart2 id="waterfallChart_3" yAxisName="Price Index" formatter="formatSales"
                                         positive_text='negative' negative_text='positive' total_text='total1'
                                         data={ this.props.competitor.waterfall_data.morr}/>
                      </div>
                    )
                  }
                })()}
              </div>

              <div className="col-xs-6 panel-body">
                <h4 className="pageModuleSubTitle"><b>Aldi</b></h4>
                {(() => {

                  if (this.props.competitor.waterfall_data) {
                    console.log("------------------------------", this.props.competitor.waterfall_data);
                    return (
                      <div>
                        <div style={{float:"right"}}>
                          <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                            <MenuItem onClick={() => {
                              saveImage(document.getElementById('waterfallChart_4'+'_svg'),"Aldi_priceIndex_waterfall_chart")
                            }
                            }>Save As JPEG</MenuItem>
                            <MenuItem onClick={() => {
                              saveDataAsCSV(this.props.competitor.waterfall_data.aldi,"Aldi_priceIndex_waterfall_chart.csv")
                            }
                            }>Download CSV</MenuItem>
                          </DropdownButton>
                        </div>
                        <WaterFallChart2
                          id="waterfallChart_4" yAxisName="Price Index" formatter="formatSales"
                          positive_text='negative' negative_text='positive' total_text='total1'
                          data={ this.props.competitor.waterfall_data.aldi}/>
                      </div>
                    )
                  }
                })()}
              </div>
            </div>

            <Modal show={this.state.compPriceRaneInfo} bsSize="lg"
                   aria-labelledby="contained-modal-title-lg"
            >
              <Modal.Header>

                <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
                  style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
                  style={{textAlign: 'right', float: 'right'}}
                  onClick={() => this.setState({compPriceRaneInfo: false})}><b>X</b></span></span>
                  <div style={{textAlign: 'center'}}>
                    <div style={{textAlign: 'right'}}>
                    </div>
                  </div>
                </Modal.Title>

              </Modal.Header>
              <Modal.Body style={{fontSize: '14px'}}>
                This graph compares direct sales lost from the delisted products vs the final loss/gain in sales due to
                demand transfer to substitute products.
                Value: Sales of a supplier in £
              </Modal.Body>
            </Modal>

            <h4 className="pageModuleMainTitle">Price and Range Distribution <span className="glyphicon glyphicon-info-sign pull-right"
                                                                                   style={{right: '4px', fontSize: '15px', top: '8px'}}
                                                                                   onClick={() => {
                                                                                     this.setState({compPriceRaneInfo: true});
                                                                                   }}>

            </span> </h4>
            <div className="col-xs-12 panel-body">
              {(() => {

                if (this.props.competitor.pricerange_data) {
                  console.log("---------------------check---------  ", this.props.competitor.pricerange_data);
                  return (
                    <div>
                      <div style={{float:"right"}}>
                        <DropdownButton className="glyphicon glyphicon-download-alt" style={{backgroundColor:"#FFF", borderColor:"#398439",color:"#000"}} id="dropButtonId">
                          <MenuItem onClick={() => {
                            saveImage(document.getElementById('multiOrdinalChart2'),"Competitor_Price_Range_ordinal_chart")
                          }
                          }>Save As JPEG</MenuItem>
                          <MenuItem onClick={() => {
                            saveDataAsCSV(this.props.competitor.pricerange_data.data,"Competitor_Price_Range_data.csv")
                          }
                          }>Download CSV</MenuItem>
                        </DropdownButton>
                      </div>
                      <MultilineOrdinalChart data={[{
                        chart_data: this.props.competitor.pricerange_data.data,
                        xaxis_col_name: 'price_gravity',
                        yaxis_col_name: 'sku_gravity',
                        series_col_name: 'id',
                        xaxis_bands: this.props.competitor.pricerange_data.axis_data,
                        color_order: this.props.competitor.pricerange_data.colors
                      }, "multiOrdinalChart2", '£ ']}/>
                    </div>
                  )
                }
              })()}
            </div>
          </div>

          </div>

        </div>
      </div>
      </Panel>
    );
  }
}

Competitor.propTypes = {};

const mapStateToProps = createStructuredSelector({
  competitor: makeSelectCompetitor(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onCompWaterfall: (e) => dispatch(CompetitorWaterfall(e)),
    onCompetitorPieChart: (e) => dispatch(CompetitorPieChart(e)),
    onCompetitorPriceRange: (e) => dispatch(CompetitorPriceRange(e)),
    onCompetitorOutperformance: (e) => dispatch(CompetitorOutperformance(e)),
    onSavePriceParam: (e) => dispatch(SavePriceParam(e)),
    onSaveWeekParam: (e) => dispatch(SaveWeekParam(e)),
    onGetFilter: (e) => dispatch(getFilter(e)),
    onCheckboxChange: (e) => dispatch(checkboxChange(e)),
    onSendUrlParams: (e) => dispatch(sendUrlParams(e)),
    onGenerateUrlParams: (e) => dispatch(generateUrlParams(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
    onSaveKPIParam: (e) => dispatch(SaveKPIParam(e)),
    onSavePriceIndexParam: (e) => dispatch(SavePriceIndexParam(e)),
    onSaveWeek: (e) => dispatch(SaveWeek(e)),
    onCheckboxWeekChange: (e) => dispatch(checkboxWeekChange(e)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Competitor);

