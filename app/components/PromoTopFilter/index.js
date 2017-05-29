/**
 *
 * PromoTopFilter
 *
 */

import React from 'react';
import SelectInput from 'components/select_input';

// import styled from 'styled-components';


class PromoTopFilter extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    let week_data = []

    this.props.week_filter_data[0].items.map(obj => {
      week_data.push({rowText: obj.name})
    });

    return (
      <div>
        <div className="row">
          <div className="col-xs-1"></div>
          <div className="col-xs-3">
            <SelectInput label={'week'} name={'week'} id={'week_select'}
                         data={[{rowText: 'All Stores'}, {rowText: 'Main Estate'}, {rowText: 'Express'}]}
                         valid
                         fieldBlurred={() => {
                           console.log('field blurred');
                         }}
                         valueUpdated={(e,v) => {
                           console.log('value updated');
                           // console.log(e.target.value);
                           if (v == 'All Stores'){
                             this.props.onSaveStoreFilterParam('store_type=Express&store_type=Main Estate');

                           }else {
                             this.props.onSaveStoreFilterParam('store_type='+v);

                           }

                           this.props.pieChartSuccess(0);
                           this.props.kpiDataSuccess(0);
                           {/*this.props.promoGiveAwaySuccess(0);*/}
                           this.props.trendChartSpinner(0);
                           this.props.productsCountSplitSuccess(0);
                           {/*this.props.promoParticipationBySplitSuccess(0);*/}
                           this.props.productsTableSplitSuccess(0);
                           this.props.productsOnPromoTableFetch();
                           this.props.trendChartDataFetch();

                           this.props.loadKpi();
                           this.props.loadSales();
                           this.props.loadPromoGiveaway();
                           this.props.loadPromoProd();
                           this.props.loadPromoPart();

                         }}/>
          </div>
          <div className="col-xs-3">
            <SelectInput label={'week'} name={'week'} id={'week_select'} data={week_data}
                         valid
                         fieldBlurred={() => {
                         }}
                         valueUpdated={(e,v) => {
                           console.log('value updated', e,v);
                           // console.log(e.target.value)
                           let selection = "tesco_week=" + v;
                           this.props.onSaveWeekFilterParam(selection);

                           this.props.pieChartSuccess(0);
                           this.props.kpiDataSuccess(0);
                           {/*this.props.promoGiveAwaySuccess(0);*/}
                           this.props.trendChartSpinner(0);
                           this.props.productsCountSplitSuccess(0);
                           {/*this.props.promoParticipationBySplitSuccess(0);*/}
                           this.props.productsTableSplitSuccess(0);
                           this.props.productsOnPromoTableFetch();
                           this.props.trendChartDataFetch();

                           this.props.loadKpi();
                           this.props.loadSales();
                           this.props.loadPromoGiveaway();
                           this.props.loadPromoProd();
                           this.props.loadPromoPart();

                         }}/>
          </div>
          <div className="col-xs-3">
            <SelectInput label={'week'} name={'week'} id={'week_select'}
                         data={[{rowText: 'Current Week'}, {rowText: 'Latest 4 Weeks'}, {rowText: 'Latest 13 Weeks'}, {rowText: 'Latest 26 Weeks'}, {rowText: 'YTD'}]}
                         valid
                         fieldBlurred={() => {
                         }}
                         valueUpdated={(e,v) => {
                           console.log('value updated', e,v);
                           // console.log(e.target.value)
                           let selection = "week_flag=" + v;
                           this.props.onSaveWeekParam(selection);

                           this.props.pieChartSuccess(0);
                           this.props.kpiDataSuccess(0);
                           {/*this.props.promoGiveAwaySuccess(0);*/}
                           this.props.trendChartSpinner(0);
                           this.props.productsCountSplitSuccess(0);
                           {/*this.props.promoParticipationBySplitSuccess(0);*/}
                           this.props.productsTableSplitSuccess(0);
                           this.props.productsOnPromoTableFetch();
                           this.props.trendChartDataFetch();

                           this.props.loadKpi();
                           this.props.loadSales();
                           this.props.loadPromoGiveaway();
                           this.props.loadPromoProd();
                           this.props.loadPromoPart();

                         }}/>
          </div>
        </div>

      </div>
    );
  }
}

PromoTopFilter.propTypes = {};

export default PromoTopFilter;
