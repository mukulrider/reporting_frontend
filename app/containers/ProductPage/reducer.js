/*
 *
 * ProductPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
  DEFAULT_ACTION,
  WEEK_FILTER_CONSTANT,
  SAVE_WEEK_PARAM,
  SAVE_METRIC_PARAM,
  SAVE_PRODUCT,
  SAVE_PRODUCT_TREND,
  FETCH_SAVE_SUPPLIER_INFO_SUCCESS,
  FETCH_SAVE_PRODUCT_TREND_SUCCESS,
  FETCH_SAVE_WEEK_PARAM,
  FETCH_SAVE_WEEK_PARAM_SUCCESS,
  GENERATE_SIDE_FILTER_SUCCESS,
  GENERATE_URL_PARAMS_STRING,
  WEEK_FILTER_FETCH_SUCCESS,
  CHECKBOX_WEEK_CHANGE,
  DEFAULT_TESCO_WEEK,
  SAVE_USER_PARAMS,
  WEEK,
  TABS_APPLY_SPINNER,
  DEFAULT_GREY_SCREEN,
  STORE_FILTER_PARAM,
} from './constants';

const initialState = fromJS({dataWeekParams:'week_flag=Latest Week',dataMetricParams:'metric_flag=Value',
  store_filter_param:'store_type=Express&store_type=Main Estate',dataWeekParams: 'week_flag=Latest Week', dataMetricParams: 'metric_flag=Value'
});

function productPageReducer(state = initialState, action) {
  switch (action.type) {

    case SAVE_WEEK_PARAM:
      console.log('Save Week Action data', action.data);
      return state.set('dataWeekParams', action.data);

    case SAVE_METRIC_PARAM:
      console.log('Save Metric Action data', action.data);
      return state.set('dataMetricParams', action.data);

    case SAVE_PRODUCT:
      console.log('Save Product Action data', action.data);
      return state.set('dataProduct', action.data);

    case SAVE_PRODUCT_TREND:
      console.log('Save Product Trend Action data', action.data);
      return state.set('dataProduct', action.data);

    case FETCH_SAVE_WEEK_PARAM_SUCCESS:
      console.log("Updated the Store state in Reducer", action.data);
      return state.set('data', action.data);

    case FETCH_SAVE_SUPPLIER_INFO_SUCCESS:
      console.log("Updated the Supplier state in Reducer", action.data);
      return state.set('supplier_info', action.data);

    case FETCH_SAVE_PRODUCT_TREND_SUCCESS:
      console.log("Updated the Product Trend Data in Reducer", action.data);
      return state.set('product_trend', action.data);

    // FILTERS
    case GENERATE_SIDE_FILTER_SUCCESS:
      console.log("Success in updating sideFilter state in Reducer", action.data);
      return state.set('sideFilter', action.data);

    case STORE_FILTER_PARAM:
      console.log("reducer STORE_FILTER_PARAM",action.data);
      return state.set('store_filter_param',action.data);

    case GENERATE_URL_PARAMS_STRING:
      console.log("Updating the urlParamsString in Reducer", action.data)
      return state.set('urlParamsString', action.data);

    case WEEK_FILTER_CONSTANT:
      console.log("DefaultTescoWeek in Reducer", action.data)
      return state.set('urlTescoDefault', action.data);

    //FOR WEEK FILTER DATA
    case WEEK_FILTER_FETCH_SUCCESS:
      console.log("reducer WEEK_FILTER_FETCH_SUCCESS", action.data);
      return state.set('week_filter_data', action.data)

    case DEFAULT_TESCO_WEEK:
      console.log('DEFAULT_TESCO_WEEK reducer', action.data);
      return state.set('filter_week_selection', "tesco_week=" + action.data);

    case CHECKBOX_WEEK_CHANGE:
      console.log('CHECKBOX_WEEK_CHANGE reducer', action.data);
      return state.set('filter_week_selection', action.data);

    case WEEK:
      console.log("reducer WEEK", action.data);
      return state.set('week', action.data)

    case SAVE_USER_PARAMS:
      console.log("reducer SAVE_USER_PARAMS", action.data);
      return state.set('userParams', action.data)

    case TABS_APPLY_SPINNER:
      console.log("TABS_APPLY_SPINNER", action.spinnerCheck);
      return state.set('tabsApplySpinner', action.spinnerCheck)

    case DEFAULT_GREY_SCREEN:
      console.log("DEFAULT_GREY_SCREEN", action.data);
      return state.set('defaultGreyScreen', action.data);

    default:
      return state;
  }
}

export default productPageReducer;
