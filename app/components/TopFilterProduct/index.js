/**
 *
 * TopFilterProduct
 *
 */

import React from 'react';
import SelectInput from 'components/select_input';

// import styled from 'styled-components';


class TopFilterProduct extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    let week_data = []

    this.props.week_filter_data[0].items.map(obj => {
      week_data.push({rowText: obj.name})
    });
    console.log('>>>>>week data>>>');
    console.log(week_data);

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
              valueUpdated={(e, v) => {
                console.log('value updated');
                // console.log(e.target.value);
                if (v == 'All Stores') {
                  this.props.onSaveStoreFilterParam();
                } else {
                  this.props.onSaveStoreFilterParam('store_type=' + v);
                }
                this.props.tabsAndApplySpinner(0);
                this.props.onProductPage();
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
                console.log('value updated', e, v);
                // console.log(e.target.value)
                let selection = "tesco_week=" + v;
                this.props.onSaveWeek(selection);
                this.props.onCheckboxWeekChange(selection);

                this.props.tabsAndApplySpinner(0);
                this.props.onProductPage();

              }}
            />
          </div>
          <div className="col-xs-3">
            <SelectInput
              label={'week'} name={'week'} id={'week_select'}
              data={[{rowText: 'Selected Week'}, {rowText: 'Latest 4 Weeks'}, {rowText: 'Latest 13 Weeks'}, {rowText: 'Latest 26 Weeks'}, {rowText: 'YTD'}]}
              valid
              fieldBlurred={() => {
              }}
              valueUpdated={(e, v) => {
                console.log('value updated', e, v);
                // console.log(e.target.value)
		if (v == 'Selected Week') {
			v = 'Latest Week';
		}
		else if (v == 'Latest 4 Weeks'){
			v = 4;
		}
		else if (v == 'Latest 13 Weeks'){
			v = 13;
		}
		else if (v == 'Latest 26 Weeks'){
			v = 26;
		}
		else if (v == 'YTD'){
			v = 'YTD';
		}
                let selection = "week_flag=" + v;
                this.props.onSaveWeekParam(selection);
                this.props.tabsAndApplySpinner(0);
                this.props.onProductPage();

              }}
            />
          </div>
        </div>

      </div>
    );
  }
}

TopFilterProduct.propTypes = {};

export default TopFilterProduct;
