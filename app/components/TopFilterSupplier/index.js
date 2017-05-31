/**
 *
 * TopFilterSupplier
 *
 */

import React from 'react';
import SelectInput from 'components/select_input';

// import styled from 'styled-components';


class TopFilterSupplier extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
                           {/*console.log('field blurred');*/}
                         }}
                         valueUpdated={(e,v) => {
                           {/*console.log('value updated');*/}
                           // console.log(e.target.value);
                           if (v == 'All Stores'){
                             this.props.supplierViewKpiSpinnerCheck(0);
                             this.props.barChartSpinnerCheck(0);
                             this.props.onSaveStoreFilterParam('store_type=Express&store_type=Main Estate');

                             this.props.onKPIBox();
                             this.props.ontopBottomChart();

                           }else {
                             this.props.supplierViewKpiSpinnerCheck(0);
                             this.props.barChartSpinnerCheck(0);
                             this.props.onSaveStoreFilterParam('store_type='+v);
                             this.props.onKPIBox();
                             this.props.ontopBottomChart();
                           }

                         }}/>
          </div>
          <div className="col-xs-3">
            <SelectInput label={'week'} name={'week'} id={'week_select'} data={week_data}
                         valid
                         fieldBlurred={() => {
                         }}
                         valueUpdated={(e,v) => {
                           {/*console.log('value updated', e,v);*/}
                           // console.log(e.target.value)
                           this.props.supplierViewKpiSpinnerCheck(0);
                           this.props.barChartSpinnerCheck(0);

                           let selection = "tesco_week=" + v;
                           this.props.onSaveWeekFilterParam(selection);

                           this.props.onKPIBox();
                           this.props.ontopBottomChart();

                         }}/>
          </div>
          <div className="col-xs-3">
            <SelectInput label={'week'} name={'week'} id={'week_select'}
                         data={[{rowText: 'Selected Week', rowValue: '1'}, {rowText: 'Latest 4 Weeks', rowValue: '2'}, {rowText: 'Latest 13 Weeks', rowValue: '3'}, {rowText: 'Latest 52 Weeks', rowValue: '4'}, {rowText: 'YTD', rowValue: '5'}]}
                         valid
                         fieldBlurred={() => {
                         }}
                         valueUpdated={(e,v) => {
                           {/*console.log('value updated', e,v);*/}
                           // console.log(e.target.value)
                           this.props.supplierViewKpiSpinnerCheck(0);
                           this.props.barChartSpinnerCheck(0);
                           let selection = "week_flag=" + v;
                           this.props.onSaveWeekParam(selection);

                           this.props.onKPIBox();
                           this.props.ontopBottomChart();
                           {/*this.props.spinnerRolesAndIntent(0);*/}
                           {/*this.props.spinnerOverviewKPI(0);*/}
                           {/*this.props.spinnerOverviewKPITrend(0);*/}
                           {/*this.props.spinnerOverviewInternalDrivers(0);*/}
                           {/*this.props.spinnerOverviewExternalDrivers(0);*/}

                           {/*this.props.loadOverviewKpi();*/}
                           {/*this.props.loadOverviewKpiTrend();*/}
                           {/*this.props.loadOverviewDriversInternal();*/}
                           {/*this.props.loadOverviewDriversExternal();*/}
                           {/*this.props.loadRolesAndIntent();*/}
                           {/*this.props.loadBudgetAndForecast();*/}

                         }}/>
          </div>
        </div>

      </div>
    );
  }
}

TopFilterSupplier.propTypes = {};

export default TopFilterSupplier;
