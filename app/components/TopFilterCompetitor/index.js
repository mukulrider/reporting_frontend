/**
 *
 * TopFilterCompetitor
 *
 */

import React from 'react';
import SelectInput from 'components/select_input';

// import styled from 'styled-components';


class TopFilterCompetitor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    let week_data = []

    this.props.week_filter_data[0].items.map(obj => {
      week_data.push({rowText: obj.name})
    });

    return (
      <div>
        <div className="row">
          <div className="col-xs-0"></div>
          <div className="col-xs-3">
            <SelectInput label={'week'} name={'week'} id={'week_select'}
                         data={[{rowText: 'All Stores'}, {rowText: 'Main Estate'}, {rowText: 'Express'}]}
                         valid
                         fieldBlurred={() => {
                           {/*console.log('field blurred');*/
                           }
                         }}
                         valueUpdated={(e, v) => {
                           {/*console.log('value updated');*/
                           }
                           // console.log(e.target.value);
                           if (v == 'All Stores') {

                             this.props.onSaveStoreFilterParam('store_type=Express&store_type=Main Estate');
                             this.props.onPieChartSpinnerSuccess(0);
                             this.props.outPerformanceChartSuccess(0);
                             this.props.waterChartAsdaSuccess(0);
                             this.props.priceRangeChartSuccess(0);

                             this.props.onCompWaterfall();
                             this.props.onCompetitorPieChart();
                             this.props.onCompetitorPriceRange();
                             this.props.onCompetitorOutperformance();
                           } else {
                             this.props.onSaveStoreFilterParam('store_type=' + v);
                             this.props.onPieChartSpinnerSuccess(0);
                             this.props.outPerformanceChartSuccess(0);
                             this.props.waterChartAsdaSuccess(0);
                             this.props.priceRangeChartSuccess(0);

                             this.props.onCompWaterfall();
                             this.props.onCompetitorPieChart();
                             this.props.onCompetitorPriceRange();
                             this.props.onCompetitorOutperformance();

                           }

                         }}/>
          </div>
          <div className="col-xs-3">
            <SelectInput label={'week'} name={'week'} id={'week_select'} data={week_data}
                         valid
                         fieldBlurred={() => {
                         }}
                         valueUpdated={(e, v) => {
                           {/*console.log('value updated', e,v);*/
                           }
                           // console.log(e.target.value)
                           {/*this.props.supplierViewKpiSpinnerCheck(0);*/
                           }
                           {/*this.props.barChartSpinnerCheck(0);*/
                           }

                           let selection = "tesco_week=" + v;
                           this.props.onSaveWeekFilterParam(selection);

                           this.props.onPieChartSpinnerSuccess(0);
                           this.props.outPerformanceChartSuccess(0);
                           this.props.waterChartAsdaSuccess(0);
                           this.props.priceRangeChartSuccess(0);

                           this.props.onCompWaterfall();
                           this.props.onCompetitorPieChart();
                           this.props.onCompetitorPriceRange();
                           this.props.onCompetitorOutperformance();


                         }}/>
          </div>
          <div className="col-xs-3">
            <SelectInput label={'week'} name={'week'} id={'week_select'}
                         data={[{rowText: 'Current Week', rowValue: 'Current Week'}, {
                           rowText: 'Latest 4 Weeks',
                           rowValue: 'Latest 4 Weeks'
                         }, {rowText: 'Latest 13 Weeks', rowValue: 'Latest 13 Weeks'}, {
                           rowText: 'Latest 52 Weeks',
                           rowValue: 'Latest 52 Weeks'
                         }, {rowText: 'YTD', rowValue: 'YTD'}]}
                         valid
                         fieldBlurred={() => {
                         }}
                         valueUpdated={(e, v) => {
                           {/*console.log('value updated', e,v);*/
                           }
                           // console.log(e.target.value)
                           {/*this.props.supplierViewKpiSpinnerCheck(0);*/
                           }
                           {/*this.props.barChartSpinnerCheck(0);*/
                           }
                           let selection = "week_flag=" + v;
                           this.props.onSaveWeekParam(selection);

                           this.props.onPieChartSpinnerSuccess(0);
                           this.props.outPerformanceChartSuccess(0);
                           this.props.waterChartAsdaSuccess(0);
                           this.props.priceRangeChartSuccess(0);

                           this.props.onCompWaterfall();
                           this.props.onCompetitorPieChart();
                           this.props.onCompetitorPriceRange();
                           this.props.onCompetitorOutperformance();

                         }}/>
          </div>
        </div>

      </div>
    );
  }
}

TopFilterCompetitor.propTypes = {};

export default TopFilterCompetitor;
