/**
 *
 * TopFilterDSS
 *
 */

import React from 'react';
import SelectInput from 'components/select_input';

// import styled from 'styled-components';


class TopFilterDSS extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {

    // Creating the array for Tesco week
    let week_data = [];
    if (this.props.week_data && this.props.week_data.tesco_week) {
      this.props.week_data.tesco_week.map(obj => {
        week_data.push({rowText: obj.week_ty})
      });
    }

    // Creating array for dates
    let week_date_data = [];
    if (this.props.week_data && this.props.week_data.calender_date) {
      this.props.week_data.calender_date.map(obj => {
        week_date_data.push({rowText: obj.date_ty})
      });
    }

    return (
      <div>
        <div className="row">
          <div className="col-xs-3">
            <SelectInput
              label={'store_type'} name={'store_type'} id={'store_type_select'}
              data={[{rowText: 'All Stores'}, {rowText: 'Main Estate'}, {rowText: 'Express'}]}
              valid
              fieldBlurred={() => {
                console.log('field blurred');
              }}
              valueUpdated={(e, val) => {
                console.log('value updated');
                let storeSelection = '';
                if (val === 'All Stores') {
                  storeSelection = 'store_type=Express&store_type=Main Estate';
                } else {
                  storeSelection = 'store_type=' + val;
                }
                // Spinner functions are called
                this.props.DSViewKpiSpinnerCheck(0);
                this.props.LineChartSpinnerCheck(0);
                this.props.storeSelectionParams(storeSelection);
                // Call to update the cards and charts
                // let filter_params = JSON.stringify(this.props.onCheckboxWeekChange());
                // let filterSelection = filter_params + storeSelection;
                // this.props.onCheckboxWeekChange(filterSelection);

                // this.props.onGenerateSideFilter();
                this.props.loadKpi();
                this.props.ChartDataCall();
                this.props.CardsDataCall();
              }}
            />

          </div>
          <div className="col-xs-3">
            <SelectInput
              label={'week'} name={'week'} id={'week_select'} data={week_data}
              valid
              fieldBlurred={() => {
              }}
              valueUpdated={(e, v) => {
                let selection = "tesco_week=" + v;
                this.props.onSaveWeek(selection);
                this.props.onSaveDateFilterParam('');
                this.props.DSViewKpiSpinnerCheck(0);
                this.props.LineChartSpinnerCheck(0);

                this.props.ongenerateWeekFilter();
                this.props.loadKpi();
                this.props.ChartDataCall();
                this.props.CardsDataCall();
              }}
            />
          </div>
          <div className="col-xs-3">
            <SelectInput
              label={'week_date'} name={'week_date'} id={'week_date_select'} data={week_date_data}
              valid
              fieldBlurred={() => {
              }}
              valueUpdated={(e, v) => {
                console.log('value updated', e, v);
                // console.log(e.target.value)
                let selection = "dt_sel=" + v;
                this.props.onSaveDateFilterParam(selection);
                this.props.DSViewKpiSpinnerCheck(0);

                this.props.loadKpi();
                this.props.CardsDataCall();

              }}
            />
          </div>
        </div>

      </div>
    );
  }
}

TopFilterDSS.propTypes = {};

export default TopFilterDSS;
