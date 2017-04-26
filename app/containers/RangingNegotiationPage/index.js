/*
 *
 * RangingNegotiationPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectRangingNegotiationPage from './selectors';
import Button from 'components/button';
import BubbleChart2 from 'components/BubbleChart2';
import Panel from 'components/panel';
import Checkbox from 'components/checkbox';
import styles from './style.scss';
import SelectorNegotiation2 from 'components/SelectorNegotiation2';
import {browserHistory} from 'react-router';
import InputField from 'components/input_field';

import {

    generateSideFilter,SavePFilterParam,SaveStoreParam,SaveWeekParam, SaveBubbleParam
  ,SaveSideFilterParam,SavePageParam,generateTextBoxQueryString,ResetClickParam,generateUrlParams, generateUrlParamsString, fetchGraph,generateTable
} from './actions';
import {
     urlDataSuccess, WeekClick
} from './actions';

export class RangingNegotiationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount = () => {
        //For sending and saving url params

        //FOR TABLE
        this.props.onURLRequest(this.props.location.query);

        this.props.onGenerateTable();

        // FOR GRAPH
        this.props.onFetchGraph();

        // FOR FILTER
        this.props.onGenerateSideFilter();
    };

    componentDidUpdate = () => {
          //this.props.onURLRequest(this.props.location.query);
    };


    render() {
      // console.log("------- table data ------- ",this.props.RangingNegotiationPage.data);
        //For url parameters
        //let dataPageUrlParams=this.props.RangingNpdPage.dataPageUrlParams;
        //This will save the parameters for performance filters
        let dataFilterUrlParams = this.props.RangingNegotiationPage.urlParamsString;
        let dataPerformanceUrlParams = this.props.RangingNegotiationPage.dataPerformanceUrlParams;
        let dataStoreUrlParams = this.props.RangingNegotiationPage.dataStoreUrlParams;
        let dataWeekUrlParams = this.props.RangingNegotiationPage.dataWeekUrlParams;

      return (

            <div className={{'fontSize': '14px'}}>
                <Helmet
                    title="Compass - Negotiation View"
                    meta={[
                        {name: 'description', content: 'Description of RangingNegotiationPage'},
                    ]}
                />
              <div className="row">
              <Button onClick={() => {
                dataWeekUrlParams = "time_period=Last 13 weeks"
                this.props.onSaveWeekParam(dataWeekUrlParams);
                this.props.onFetchGraph();
                this.props.onGenerateTable();
                //browserHistory.push(this.props.location.pathname + "?time_period=Last 13 weeks")
              }}>Last 13 Weeks</Button>

              <Button onClick={() => {
                dataWeekUrlParams = "time_period=Last 26 weeks"
                this.props.onSaveWeekParam(dataWeekUrlParams);
                this.props.onFetchGraph();
                this.props.onGenerateTable();
              //browserHistory.push(this.props.location.pathname + "?time_period=Last 26 weeks")
            }}>Last 26 Weeks</Button>

              <Button onClick={() => {
                dataWeekUrlParams = "time_period=Last 52 weeks"
                this.props.onSaveWeekParam(dataWeekUrlParams);
                this.props.onFetchGraph();
                this.props.onGenerateTable();
              //browserHistory.push(this.props.location.pathname + "?time_period=Last 52 weeks")
            }}>Last 52 Weeks</Button>
              </div>

              <div className="row">
                <Button onClick={() => {

                    {/*console.log("Main estate has been clicked");*/}
                    {/*dataStoreUrlParams = "store_type=Main estate";*/}

                    {/*this.props.onSaveStoreParam(dataStoreUrlParams);*/}

                    {/*if (dataFilterUrlParams!==''&& dataPerformanceUrlParams!=='') {*/}
                        {/*console.log("Main estate first if condition");*/}
                        {/*browserHistory.push(this.props.location.pathname+"?"+dataStoreUrlParams + "&" + dataFilterUrlParams+ "&" + dataPerformanceUrlParams);*/}
                    {/*} else if (dataFilterUrlParams!==''|| dataPerformanceUrlParams!=='') {*/}
                        {/*console.log("Main estate second  if condition");*/}
                        {/*browserHistory.push(this.props.location.pathname+"?"+dataStoreUrlParams+"&"+dataFilterUrlParams+dataPerformanceUrlParams);*/}
                    {/*}*/}
                    {/*else {*/}
                        {/*console.log("in_else");*/}
                        {/*browserHistory.push(this.props.location.pathname+"?"+dataStoreUrlParams);*/}
                    {/*}*/}

                    {/*this.props.onURLRequest(this.props.location.query);*/}
                  dataStoreUrlParams = "store_type=Main Estate"

                  this.props.onSaveStoreParam(dataStoreUrlParams);
                  this.props.onFetchGraph();
                  this.props.onGenerateTable();
                 // browserHistory.push(this.props.location.pathname + "?store_type=Main Estate")

                }}>Main Estate</Button>

                <Button onClick={() => {
                    dataStoreUrlParams = "store_type=Express"

                  this.props.onSaveStoreParam(dataStoreUrlParams);
                  this.props.onFetchGraph();
                  this.props.onGenerateTable();
                   // browserHistory.push(this.props.location.pathname + "?store_type=Express")
                }}>Express</Button>
              </div>

                <div className="row">
                    <div className="col-xs-12 col-md-2">
                        {/*<SelectorNegotiation sideFilter={this.props.RangingNegotiationPage.sideFilter}*/}
                                             {/*location={this.props.location}*/}
                                             {/*onGenerateTable={this.props.onGenerateTable}*/}
                                             {/*onFetchGraph={this.props.onFetchGraph}*/}
                                             {/*onGenerateUrlParams={this.props.onGenerateUrlParams}*/}
                                             {/*onURLRequest={this.props.onURLRequest}*/}
                                             {/*onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}*/}
                                             {/*dataPerformanceUrlParams={dataPerformanceUrlParams}*/}
                                             {/*dataStoreUrlParams={dataStoreUrlParams}*/}
                                             {/*dataFilterUrlParams={dataFilterUrlParams}/>*/}

                    {/*</div>*/}

                  <SelectorNegotiation2 sideFilter={this.props.RangingNegotiationPage.sideFilter}
                                       location={this.props.location}
                                       onGenerateTable={this.props.onGenerateTable}
                                       onFetchGraph={this.props.onFetchGraph}
                                       onGenerateUrlParams={this.props.onGenerateUrlParams}
                                       onURLRequest={this.props.onURLRequest}
                                       onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                                    //   onSaveSideFilterParam={this.props.onSaveSideFilterParam}
                                        dataPerformanceUrlParams={dataPerformanceUrlParams}
                                       dataStoreUrlParams={dataStoreUrlParams}
                                       dataFilterUrlParams={dataFilterUrlParams}

                  />

                </div>
                    {/*Defining the area for the content on right to the filters */}

                    <div className="col-xs-12 col-md-10">
                        <div className="row">
                            <div className="col-xs-12">
                                <Panel>
                                    <div className="row">
                                        <h3 className="text-center">Negotiation Opportunity</h3>
                                        <Button onClick={() => {
                                          let resetUrlParams = "reset_clicked";
                                          this.props.onResetClickParam(resetUrlParams);
                                          this.props.onFetchGraph();
                                          this.props.onGenerateTable();

                                        }}>Reset Chart</Button>
                                    </div>

                                    <div className="row">
                                        <div className="col-xs-12 col-md-8">
                                            <BubbleChart2 data={this.props.RangingNegotiationPage.chartData}
                                                          path={this.props.location}
                                                          onSaveBubbleParam={this.props.onSaveBubbleParam}
                                                          onFetchGraph={this.props.onFetchGraph}
                                                          onGenerateTable={this.props.onGenerateTable}
                                                          />
                                        </div>

                                        <div className="col-xs-12 col-md-4">
                                            <h4>
                                                Please select a negotiation strategy below to filter
                                                'Negotiation
                                                Opportunity' chart and table
                                            </h4>

                                            <div className="panel panel-danger">
                                                <div className="panel-heading">
                                                    <h5 className="panel-title" onClick={() => {
                                                        dataPerformanceUrlParams = "performance_quartile=Low CPS/Low Profit";
                                                        this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                                      this.props.onFetchGraph();
                                                      this.props.onGenerateTable();

                                                        {/*if (dataFilterUrlParams !== '' && dataStoreUrlParams!=='' ) {*/}
                                                            {/*browserHistory.push(this.props.location.pathname + "?" + dataPerformanceUrlParams + "&" + dataFilterUrlParams+ "&" + dataStoreUrlParams);*/}
                                                        {/*}*/}
                                                        {/*else if (dataFilterUrlParams!==''|| dataStoreUrlParams!=='') {*/}
                                                            {/*browserHistory.push(this.props.location.pathname + "?" + dataPerformanceUrlParams +"&"+ dataFilterUrlParams + dataStoreUrlParams);*/}
                                                        {/*}*/}
                                                        {/*else {*/}
                                                            {/*browserHistory.push(this.props.location.pathname + "?" + dataPerformanceUrlParams);*/}
                                                        {/*}*/}
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
                                                      //  browserHistory.push(this.props.location.pathname + "?performance_quartile=Low CPS/High Profit");
                                                      this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                                      this.props.onFetchGraph();
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
                                                      this.props.onFetchGraph();
                                                       // browserHistory.push(this.props.location.pathname + "?performance_quartile=Med CPS/Med Profit");
                                                      this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                                      this.props.onGenerateTable();
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
                                                      this.props.onFetchGraph();
                                                      //  browserHistory.push(this.props.location.pathname + "?performance_quartile=High CPS/High Profit");
                                                      this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                                      this.props.onGenerateTable();
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
                                                      this.props.onFetchGraph();
                                                       // browserHistory.push(this.props.location.pathname + "?performance_quartile=High CPS/Low Profit");
                                                      this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                                      this.props.onGenerateTable();
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


                        <Panel>
                            <div>
                                <table className="table table-hover">
                                  <div className="col-xs-12 col-xs-5">
                                    <InputField type={'string'}
                                                placeholder="Search..."
                                                value={this.props.textBoxQueryString}
                                                 onChange={(e)=>{
                                                   this.props.onGenerateTextBoxQueryString(e);
                                                   this.props.onGenerateTable();
                                                 }}
                                    />
                                  </div>
                                    <thead style={{fontWeight: '700', textAlign: 'center'}}>

                                    <th>Select</th>
                                    <th>Store Type</th>
                                    <th>Base Product Number</th>
                                    <th>Product Description</th>
                                    <th>CPS</th>
                                    <th>PPS</th>
                                    <th>subs_count</th>
                                    <th>Sales Value</th>
                                    <th>Sales Volume</th>
                                    <th>Rate of Sale</th>

                                    </thead>
                                    <tbody>

                                    {(() => {

                                      if (this.props.RangingNegotiationPage.data) {


                                        {/*console.log("----------------------------------------------------------");*/}
                                        {/*console.log("----table data----",this.props.RangingNegotiationPage.data.table);*/}
                                            {/*console.log('done');*/}
                                            return this.props.RangingNegotiationPage.data.table.map(obj => {
                                                return (
                                                    <tr key={Math.random() + Date.now()}>
                                                        {/**/}
                                                        <td><Checkbox isDisabled={false} id={Math.random() + Date.now()}
                                                                      valid={true}/></td>
                                                        <td>{obj.store_type}</td>
                                                        <td>{obj.base_product_number}</td>
                                                        <td>{obj.long_description}</td>
                                                        <td>{obj.cps}</td>
                                                        <td>{obj.pps}</td>
                                                        <td>{obj.subs_count}</td>
                                                        <td>{obj.sales_value}</td>
                                                        <td>{obj.sales_volume}</td>
                                                        <td>{obj.rate_of_sale}</td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    })()}

                                    </tbody>
                                </table>

                              {/*pagination*/}
                              <nav aria-label="Page navigation example">
                                <ul className="pagination pagination-lg">
                                  {(() => {

                                    if (this.props.RangingNegotiationPage.data && this.props.RangingNegotiationPage.data.count) {
                                      let x = [];
                                      let start_index = this.props.RangingNegotiationPage.data.start_index;
                                      let page = this.props.RangingNegotiationPage.data.page;
                                      let end_index = this.props.RangingNegotiationPage.data.end_index;
                                      let pagination_count = this.props.RangingNegotiationPage.data.pagination_count;

                                      if (page > 5) {
                                        page = page - 5
                                      } else {
                                        page = 1
                                      }

                                      if (pagination_count > 10) {
                                        pagination_count = page + 10
                                      }

                                      for (let i = page;
                                           i <= pagination_count;
                                           i++) {

                                        x.push(i)
                                      }

                                      return x.map(obj => {
                                        return (
                                          <li className="page-item"
                                              onClick={() => {
                                                let dataPageUrlParams = "page=" + obj;
                                                this.props.onSavePageParam(dataPageUrlParams);
                                                this.props.onGenerateTable();

                                              }}><a className="page-link" href="#">{obj}
                                          </a></li>
                                        )
                                      })
                                    }
                                  })()}
                                </ul>
                              </nav>
                            </div>

                        </Panel>
                    </div>
                </div>

            </div>

        );
    }
}

RangingNegotiationPage.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = createStructuredSelector({
    RangingNegotiationPage: makeSelectRangingNegotiationPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        onURLRequest: (e) => dispatch(urlDataSuccess(e)),
        onWeekClick: (e) => dispatch(WeekClick(e)),
        onGenerateTable: (e) => dispatch(generateTable(e)),
        onGenerateSideFilter: (e) => dispatch(generateSideFilter(e)),
        onFetchGraph: (e) => dispatch(fetchGraph(e)),
        onGenerateUrlParams: (e) => dispatch(generateUrlParams(e)),
        onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
        onSavePFilterParam: (e) => dispatch(SavePFilterParam(e)),
        onSaveStoreParam: (e) => dispatch(SaveStoreParam(e)),
        onSaveWeekParam: (e) => dispatch(SaveWeekParam(e)),
        onSaveBubbleParam: (e) => dispatch(SaveBubbleParam(e)),
        onSavePageParam: (e) => dispatch(SavePageParam(e)),
        onSaveSideFilterParam: (e) => dispatch(SaveSideFilterParam(e)),
      onGenerateTextBoxQueryString: (e) => dispatch(generateTextBoxQueryString(e.target.value)),
      onResetClickParam: (e) => dispatch(ResetClickParam(e)),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingNegotiationPage);
