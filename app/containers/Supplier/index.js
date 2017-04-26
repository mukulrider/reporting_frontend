/*
 *
 * Supplier
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import Panel from 'components/panel';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectSupplier from './selectors';
import messages from './messages';
import Button from 'components/button';
import SampleBarChart from 'components/SampleBarChart';
import BubbleChart from 'components/BubbleChart';
import GaugeChart2 from 'components/GaugeChart2';
import './style.scss'
import InputField from 'components/input_field';
import {
  kpibox, supplierTable, topBottomChart, saveWeekParam
} from './actions';


export class Supplier extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () =>{
   this.props.onKPIBox();
   this.props.onSupplierTable();
   this.props.ontopBottomChart();

    // this.props.supplier.reducer1.sales;
};
  render() {

    console.log("this.props",this.props.supplier.reducer1);


    return (

      <div>
        <Panel>
        <Helmet
          title="Supplier"
          meta={[
            {name: 'description', content: 'Description of Supplier'},
          ]}
        />

        <div className="row">
          <Button onClick={() => {
            dataWeekUrlParams = "time_period=Current Week"
            //this.props.onSaveWeekParam(dataWeekUrlParams);
            //this.props.onKPIBox();
            {/*this.props.onGenerateTable();*/}
            //browserHistory.push(this.props.location.pathname + "?time_period=Last 13 weeks")
          }}>Current Week</Button>

          <Button onClick={() => {
            dataWeekUrlParams = "time_period=Last 13 weeks"
            {/*this.props.onSaveWeekParam(dataWeekUrlParams);*/}
            {/*this.props.onFetchGraph();*/}
            {/*this.props.onGenerateTable();*/}
            //browserHistory.push(this.props.location.pathname + "?time_period=Last 13 weeks")
          }}>Last 13 Weeks</Button>

          <Button onClick={() => {
            dataWeekUrlParams = "time_period=Last 26 weeks"
            {/*this.props.onSaveWeekParam(dataWeekUrlParams);*/}
            {/*this.props.onFetchGraph();*/}
            {/*this.props.onGenerateTable();*/}
            //browserHistory.push(this.props.location.pathname + "?time_period=Last 26 weeks")
          }}>Last 26 Weeks</Button>

          <Button onClick={() => {
            dataWeekUrlParams = "time_period=Last 52 weeks"
            {/*this.props.onSaveWeekParam(dataWeekUrlParams);*/}
            {/*this.props.onFetchGraph();*/}
            {/*this.props.onGenerateTable();*/}
            //browserHistory.push(this.props.location.pathname + "?time_period=Last 52 weeks")
          }}>Last 52 Weeks</Button>
            <Button onClick={() => {
              dataWeekUrlParams = "time_period=YTD"
              {/*this.props.onSaveWeekParam(dataWeekUrlParams);*/}
              {/*this.props.onFetchGraph();*/}
              {/*this.props.onGenerateTable();*/}
              //browserHistory.push(this.props.location.pathname + "?time_period=YTD")
            }}>YTD</Button>

        </div>

        <div className="row" style={{textAlign: 'center'}}>

          <div className="col-xs-6" style={{backgroundColor: "white"}}>
           <Panel>
            <h4 className="ts-blk-proview-subhead"> Total Sales </h4>
            <div className="row">
              <div className="col-xs-6">

                <h4>  {this.props.supplier.reducer1.sales} </h4>
              </div>
              <div className="col-xs-6">
                <h4>     {this.props.supplier.reducer1.sales_lfl} </h4>
              </div>
            </div>
            <div className="row">
              <div className="panel-body">
                <div className="col-xs-4">
                  <div className="panel-body">
                    <h4> Wow </h4>
                    {this.props.supplier.reducer1.sales_var_week}
                  </div>
                </div>
                <div className="col-xs-4">
                  <div className="panel-body">
                    <h4>  LFL </h4>
                    {this.props.supplier.reducer1.sales_var_year}
                  </div>
                </div>
                <div className="col-xs-4">
                  <div className="panel-body">
                    <h4>  YOY LFL </h4>
                    {this.props.supplier.reducer1.sales_var_year_lfl}
                  </div>
                </div>
              </div>
            </div>
           </Panel>
          </div>

          <div className="col-xs-6 panel-body" style={{backgroundColor: "white"}}>
            <Panel>
            <h4 className="ts-blk-proview-subhead">  Contribution to Growth </h4>

            <div className="row">
              <div className="col-xs-6">
              </div>
              <div className="col-xs-6">
              </div>
            </div>
            <div className="row">
              <div className="panel-body">
                <div className="col-xs-4">
                  <div className="panel-body">
                    <h4>WoW</h4>
                    {this.props.supplier.reducer1.sales_growth_wow_1} of {this.props.supplier.reducer1.sales_growth_wow_2}
                  </div>
                </div>
                <div className="col-xs-4">
                  <div className="panel-body">
                    <h4>YoY</h4>
                    {this.props.supplier.reducer1.sales_growth_yoy_1} of {this.props.supplier.reducer1.sales_growth_yoy_2}
                  </div>
                </div>
                <div className="col-xs-4">
                  <div className="panel-body">
                    <h4>YoY LFL</h4>
                    {this.props.supplier.reducer1.sales_growth_yoy_lfl_1} of {this.props.supplier.reducer1.sales_growth_yoy_lfl_2}
                  </div>
                </div>
              </div>
            </div>
            </Panel>
          </div>

        </div>


        <div className="row">
          <div className="col-xs-12">
            <Panel>
              <div className="row">
                <h3 className="text-center">Negotiation Opportunity</h3>
                <Button onClick={() => {
                  let resetUrlParams = "reset_clicked";
                  {/*this.props.onResetClickParam(resetUrlParams);*/}
                  {/*this.props.onFetchGraph();*/}
                  {/*this.props.onGenerateTable();*/}

                }}>Reset Chart</Button>
              </div>

              <div className="row">
                <div className="col-md-8">
                  {(()=>{
                    if (this.props.supplier.tableData) {
                      console.log("--------------mjhvkjhvhj----------------");

                      return(
                        <BubbleChart data={[this.props.supplier.tableData.bubble_data]}/>
                      )
                    }
                  })()}

                                {/*path={this.props.location}*/}
                                {/*onSaveBubbleParam={this.props.onSaveBubbleParam}*/}
                                {/*onFetchGraph={this.props.onFetchGraph}*/}
                                {/*onGenerateTable={this.props.onGenerateTable}*/}

                </div>

                <div className="col-md-4">
                  <h4>
                    Please select a negotiation strategy below to filter
                    'Negotiation
                    Opportunity' chart and table
                  </h4>

                  <div className="panel panel-danger">
                    <div className="panel-heading">
                      <h5 className="panel-title" onClick={() => {
                        dataPerformanceUrlParams = "performance_quartile=Low CPS/Low Profit";
                        {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/}
                        {/*this.props.onFetchGraph();*/}
                        {/*this.props.onGenerateTable();*/}

                      }}>Low CPS/Low Profit</h5>
                    </div>
                    <div className="panel-body">
                      Delist Products
                    </div>
                  </div>

                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h5 className="panel-title" onClick={() => {
                        dataPerformanceUrlParams = "performance_quartile=Low CPS/High Profit";
                        {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/}
                        {/*this.props.onFetchGraph();*/}
                      }}>Low CPS/High Profit</h5>
                    </div>
                    <div className="panel-body">
                      Hard
                      Bargaining’
                      for stronger
                      profits – Low importance to customers
                    </div>
                  </div>
                  <div className="panel panel-warning">
                    <div className="panel-heading">
                      <h5 className="panel-title" onClick={() => {
                        dataPerformanceUrlParams = "performance_quartile=Med CPS/Med Profit"
                        {/*this.props.onFetchGraph();*/}

                        {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/}
                        {/*this.props.onGenerateTable();*/}
                      }}>Med CPS/Med Profit</h5>
                    </div>
                    <div className="panel-body">Area of
                      opportunity. Concession
                      trading – Subs/Ranging/Price. Reduce range to drive
                      volume
                    </div>
                  </div>

                  <div className="panel panel-success">
                    <div className="panel-heading">
                      <h5 className="panel-title" onClick={() => {
                        dataPerformanceUrlParams = "performance_quartile=High CPS/High Profit"
                        {/*this.props.onFetchGraph();*/}
                        {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/}
                        {/*this.props.onGenerateTable();*/}
                      }}>High CPS/High Profit</h5>
                    </div>
                    <div className="panel-body">Build
                      Win-Win
                      relationship with
                      supplier to share further profit gains
                    </div>
                  </div>
                  <div className="panel panel-info">
                    <div className="panel-heading">
                      <h5 className="panel-title" onClick={() => {
                        dataPerformanceUrlParams = "performance_quartile=High CPS/Low Profit"
                        {/*this.props.onFetchGraph();*/}
                        {/*this.props.onSavePFilterParam(dataPerformanceUrlParams);*/}
                        {/*this.props.onGenerateTable();*/}
                      }}>High CPS/Low Profit</h5>
                    </div>
                    <div className="panel-body">Work
                      collaboratively to jointly
                      solve low profitability
                    </div>
                  </div>

                </div>
              </div>
            </Panel>
          </div>
        </div>


          <div className="row">
            <panel>
              <div className="col-xs-6 panel-body">
                <h4 className="ts-blk-proview-subhead">  Supplier Importance to category</h4>
                {(()=>{
                  if (this.props.supplier.reducer1.supp_imp_cat_sales) {
                    console.log("------------------------------",this.props.supplier.reducer1.supp_imp_cat_sales);

                    return(
                      <GaugeChart2 data={[this.props.supplier.reducer1.supp_imp_cat_sales]} id="gauge1"/>
                    )
                  }
                })()}

              </div>
              <div className="col-xs-6 panel-body">
                <h4 className="ts-blk-proview-subhead">  Category Importance to Supplier </h4>
                {(()=>{
                  if (this.props.supplier.reducer1.cat_imp_supp_sales) {
                    console.log("--------------------------",this.props.supplier.reducer1.cat_imp_supp_sales);

                    return(
                      <GaugeChart2 data={[this.props.supplier.reducer1.cat_imp_supp_sales]} id="gauge2"/>
                    )
                  }
                })()}
                {/*<SampleBarChart/>*/}
              </div>
            </panel>
          </div>



        <Panel>
          <div>
            <table className="table table-hover">
              <div className="col-xs-12 col-xs-5">

              </div>
              <thead style={{fontWeight: '700', textAlign: 'center'}}>

              <th>Product</th>
              <th>Parent Supplier</th>
              <th>CPS Score</th>
              <th>PPS</th>
              <th>Sales TY</th>
              <th>Volume TY</th>
              <th>CGM TY</th>
              <th>Rate Of Sale</th>

              </thead>
              <tbody>
              {
                (() => {
                  if (this.props.supplier.tableData) {



                    let a = this.props.supplier.tableData.table_data;
                    console.log("supplier table new a", a);
                    return a.map(obj => {
                      return (
                        <tr>
                          <td>{obj.product_id}</td>
                          <td>{obj.parent_supplier}</td>
                          <td>{obj.cps_score}</td>
                          <td>{obj.pps}</td>
                          <td>{obj.sales_ty}</td>
                          <td>{obj.volume_ty}</td>
                          <td>{obj.cgm_ty}</td>
                          <td>{obj.rate_of_sale}</td>
                        </tr>
                      )
                    })
                  }
                })()
              }


              </tbody>
            </table>

            {/*pagination*/}
            <nav aria-label="Page navigation example">
              <ul className="pagination pagination-lg">

              </ul>
            </nav>
          </div>

        </Panel>

        <div className="row">
          <panel>
          <div className="col-xs-6 panel-body">
            <h4 className="ts-blk-proview-subhead">  Top Suppliers</h4>
            {(()=>{
              if (this.props.supplier.topBotData) {
                console.log("------------------------------",this.props.supplier.topBotData);

                return(
                <SampleBarChart data={[this.props.supplier.topBotData.bar_chart_top]} id="suppliertopchart"/>
            )
              }
            })()}

          </div>
          <div className="col-xs-6 panel-body">
            <h4 className="ts-blk-proview-subhead">  Bottom Suppliers </h4>
            {(()=>{
              if (this.props.supplier.topBotData) {
                console.log("--------------------------",this.props.supplier.topBotData);

                return(
                  <SampleBarChart data={[this.props.supplier.topBotData.bar_chart_bottom]} id="supplierbotchart"/>
                )
              }
            })()}
            {/*<SampleBarChart/>*/}
          </div>
          </panel>
        </div>

          <div>

          </div>

        </Panel>
        </div>

    );
  }
}

Supplier.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  supplier: makeSelectSupplier(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onKPIBox: (e) => {return dispatch(kpibox(e));},
    onSupplierTable: (e) => {return dispatch(supplierTable(e));},
    ontopBottomChart:  (e) => {return dispatch(topBottomChart(e));},
      onSaveWeekParam: (e) => {return dispatch(saveWeekParam(e));}

}}

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
