/*
 *
 * ProductPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,SAVE_WEEK_PARAM,SAVE_METRIC_PARAM,FETCH_SAVE_WEEK_PARAM,FETCH_SAVE_WEEK_PARAM_SUCCESS,GENERATE_SIDE_FILTER_SUCCESS,GENERATE_URL_PARAMS_STRING,
  WEEK_FILTER_FETCH_SUCCESS,
  CHECKBOX_WEEK_CHANGE,
  WEEK, TABS_APPLY_SPINNER
} from './constants';

const initialState = fromJS({dataWeekParams:'week_flag=Latest Week',dataMetricParams:'metric_flag=Value'
});

function productPageReducer(state = initialState, action) {
  switch (action.type) {

    case SAVE_WEEK_PARAM:
      console.log('Save Week Action data',action.data);
      return state.set('dataWeekParams', action.data);

    case SAVE_METRIC_PARAM:
      console.log('Save Metric Action data',action.data);
      return state.set('dataMetricParams', action.data);

    case FETCH_SAVE_WEEK_PARAM_SUCCESS:
      console.log("Updated the Store state in Reducer", action.data);
      return state.set('data', action.data);


    // FILTERS
    case GENERATE_SIDE_FILTER_SUCCESS:
      console.log("Success in updating sideFilter state in Reducer", action.data);
      return state.set('sideFilter', action.data);


    case GENERATE_URL_PARAMS_STRING:
      console.log("Updating the urlParamsString in Reducer",action.data)
      return state.set('urlParamsString', action.data);

    //FOR WEEK FILTER DATA
    case WEEK_FILTER_FETCH_SUCCESS:
      console.log("reducer WEEK_FILTER_FETCH_SUCCESS", action.data);
      return state.set('week_filter_data', action.data)

    case CHECKBOX_WEEK_CHANGE:
      console.log('CHECKBOX_WEEK_CHANGE reducer', action.data);
      return state.set('filter_week_selection', action.data);

    case WEEK:
      console.log("reducer WEEK", action.data);
      return state.set('week', action.data)

 case TABS_APPLY_SPINNER:
      console.log("TABS_APPLY_SPINNER", action.spinnerCheck);
      return state.set('tabsApplySpinner', action.spinnerCheck)

    default:
      return state;
  }
}

export default productPageReducer;
