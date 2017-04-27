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
import {Nav} from 'react-bootstrap';
import {NavItem} from 'react-bootstrap';
import WaterFallChart2 from 'components/WaterFallChart2';
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
      activeKey3: "1"
    };
  }

  render() {
    // let dataBrandParams = '';
    let kpiParmas = this.props.competitor.kpi_param;
    //let dataWeekUrlParams = '';

    let dataWeekUrlParams = this.props.competitor.week_param;
    let dataFilterUrlParams = this.props.competitor.urlParamsString;

    let dataPriceIndexParam = this.props.competitor.dataPriceIndexParam;

    return (
      <div>
        <Helmet
          title="Competitor"
          meta={[
            {name: 'description', content: 'Description of Competitor'},
          ]}
        />
        <div className="row">


          {/*Filter*/}
          <div className="col-xs-2">


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


          <div className="col-xs-10" style={{left: '4%', top: '-25px'}}>
            <div>

              <Nav bsStyle="tabs" activeKey={this.state.activeKey1} onSelect={this.handleSelect} className="tabsCustom">
                <NavItem className="tabsCustomList" eventKey="1" onClick={() => {

                  dataWeekUrlParams = "week_flag=Current Week";
                  this.setState({activeKey1: "1"});
                  this.props.onSaveWeekParam(dataWeekUrlParams);
                  this.props.onCompWaterfall();
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorPriceRange();
                  this.props.onCompetitorOutperformance();

                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}>
                  <b>Current Week</b></NavItem>

                <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                  this.setState({activeKey1: "2"});
                  dataWeekUrlParams = "week_flag=Latest 4 Weeks";
                  this.props.onSaveWeekParam(dataWeekUrlParams);
                  this.props.onCompWaterfall();
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorPriceRange();
                  this.props.onCompetitorOutperformance();

                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Last 4 weeks</b></NavItem>

                <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                  this.setState({activeKey1: "3"});
                  dataWeekUrlParams = "week_flag=Latest 13 Weeks";
                  this.props.onSaveWeekParam(dataWeekUrlParams);
                  this.props.onCompWaterfall();
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorPriceRange();
                  this.props.onCompetitorOutperformance();

                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Last 13 weeks</b></NavItem>
                <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                  this.setState({activeKey1: "4"});
                  dataWeekUrlParams = "week_flag=Latest 52 Weeks";
                  this.props.onSaveWeekParam(dataWeekUrlParams);
                  this.props.onCompWaterfall();
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorPriceRange();
                  this.props.onCompetitorOutperformance();

                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Last 52 weeks</b></NavItem>

                <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                  this.setState({activeKey1: "5"});

                  dataWeekUrlParams = "week_flag=YTD";
                  this.props.onSaveWeekParam(dataWeekUrlParams);
                  this.props.onCompWaterfall();
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorPriceRange();
                  this.props.onCompetitorOutperformance();

                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>YTD</b></NavItem>
              </Nav>
              <Nav bsStyle="tabs" activeKey={this.state.activeKey2} onSelect={this.handleSelect}  className="tabsCustom">
                <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                  this.setState({activeKey2: "1"});
                  kpiParmas = "kpi_type=value";
                  this.props.onSaveKPIParam(kpiParmas);
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorOutperformance();
                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Value</b></NavItem>
                <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                  this.setState({activeKey2: "2"});
                  kpiParmas = "kpi_type=volume";
                  this.props.onSaveKPIParam(kpiParmas);
                  this.props.onCompetitorPieChart();
                  this.props.onCompetitorOutperformance();
                }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Volume</b></NavItem>
              </Nav>

            </div>
            <div className="row">

            </div>

            <h4 className="ts-blk-proview-head">Market Performance</h4>

            <div className="row">

              <div className="col-xs-4 panel-body">
                <h4 className="pageModuleMainTitle"><b>Market Share</b></h4>

                {(() => {

                  if (this.props.competitor.piechart_data.pie_chart_value) {
                    console.log("pie chart data", this.props.competitor.piechart_data);
                    return (
                      <Pichart data={this.props.competitor.piechart_data.pie_chart_value} id="piechart"/>
                    )
                  }
                })()}
                <div>

                    <div className="panel-body">
                      <h4>  WOW </h4>
                      {this.props.competitor.piechart_data.tesco_share_data}
                    </div>



                </div>
              </div>

              <div className="col-xs-8 panel-body">
                <h4 className="pageModuleMainTitle"><b>Outperformance</b></h4>
                {(() => {

                  if (this.props.competitor.outperformance_data) {
                    console.log("Outperformance data", this.props.competitor.outperformance_data);
                    return (
                      <BarLineChart data={this.props.competitor.outperformance_data} id="barline" series_col_name= 'id'/>
                    )
                  }
                })()}
              </div>
            </div>


            <h4 className="ts-blk-proview-head">Price Index</h4>

            <Nav bsStyle="tabs" activeKey={this.state.activeKey3} onSelect={this.handleSelect}>
              <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                console.log("Price/Promo button pressed");

                dataPriceIndexParam = "waterfall_index_param=promo_price";
                this.props.onSavePriceIndexParam(dataPriceIndexParam);
                this.props.onCompWaterfall();
              }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Price/Promo</b></NavItem>
              <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                this.setState({activeKey3: "2"});
                console.log("Own label/Brand button pressed");

                dataPriceIndexParam = "waterfall_index_param=brand";
                this.props.onSavePriceIndexParam(dataPriceIndexParam);
                this.props.onCompWaterfall();
              }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Own Label/Brand</b></NavItem>
              <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                this.setState({activeKey3: "3"});
                console.log("Basket button pressed");
                dataPriceIndexParam = "waterfall_index_param=basket";
                this.props.onSavePriceIndexParam(dataPriceIndexParam);
                this.props.onCompWaterfall();
              }} style={{fontSize: '20px', fontFamily: 'Tesco'}}><b>Basket</b></NavItem>
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

              <div className="col-xs-6 panel-body">
                <h4 className="pageModuleMainTitle"><b>ASDA</b></h4>

                {(() => {
                  if (this.props.competitor.waterfall_data) {
                    console.log("in asda chart div");
                    console.log("consoling basda data", this.props.competitor.waterfall_data);

                    return (
                      <WaterFallChart2

                        id="waterfallChart_1" yAxisName="Value" formatter="formatSales"
                        positive_text='positive' negative_text='negative' total_text='total'
                        data={ this.props.competitor.waterfall_data.asda }/>
                    )
                  }
                })()}
              </div>

              <div className="col-xs-6 panel-body">
                <h4 className="pageModuleMainTitle"><b>JS</b></h4>
                {(() => {

                  if (this.props.competitor.waterfall_data) {
                    console.log("------------------------------", this.props.competitor.waterfall_data);
                    return (
                      <WaterFallChart2

                        id="waterfallChart_2" yAxisName="Value" formatter="formatSales"
                        positive_text='positive' negative_text='negative' total_text='total'
                        data={ this.props.competitor.waterfall_data.js }

                      />
                    )
                  }
                })()}
              </div>
            </div>

            <div className="row">
              <div className="col-xs-6 panel-body">
                <h4 className="pageModuleMainTitle"><b>Morrisons</b></h4>
                {(() => {

                  if (this.props.competitor.waterfall_data) {
                    console.log("------------------------------", this.props.competitor.waterfall_data);
                    return (
                      <WaterFallChart2 id="waterfallChart_3" yAxisName="Value" formatter="formatSales"
                                       positive_text='positive' negative_text='negative' total_text='total'
                                       data={ this.props.competitor.waterfall_data.morr}/>
                    )
                  }
                })()}
              </div>

              <div className="col-xs-6 panel-body">
                <h4 className="pageModuleMainTitle"><b>Aldi</b></h4>
                {(() => {

                  if (this.props.competitor.waterfall_data) {
                    console.log("------------------------------", this.props.competitor.waterfall_data);
                    return (
                      <WaterFallChart2
                        id="waterfallChart_4" yAxisName="Value" formatter="formatSales"
                        positive_text='positive' negative_text='negative' total_text='total'
                        data={ this.props.competitor.waterfall_data.aldi}/>
                    )
                  }
                })()}
              </div>
            </div>

            <h4 className="ts-blk-proview-head">Price and Range Distribution</h4>
            <div className="col-xs-12 panel-body">
              {(() => {

                if (this.props.competitor.pricerange_data) {
                  console.log("---------------------check---------  ", this.props.competitor.pricerange_data);
                  return (
                    <MultilineOrdinalChart data={[{
                      chart_data: this.props.competitor.pricerange_data.data,
                      xaxis_col_name: 'price_gravity',
                      yaxis_col_name: 'sku_gravity',
                      series_col_name: 'id',
                      xaxis_bands: this.props.competitor.pricerange_data.axis_data,
                      color_order: this.props.competitor.pricerange_data.colors
                    }, "id2", '£ ']}/>
                  )
                }
              })()}
            </div>
          </div>
        </div>
      </div>

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

