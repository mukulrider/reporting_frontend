/*
 *
 * ProductPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,SAVE_WEEK_PARAM,SAVE_METRIC_PARAM,FETCH_SAVE_WEEK_PARAM,FETCH_SAVE_WEEK_PARAM_SUCCESS,GENERATE_SIDE_FILTER_SUCCESS,GENERATE_URL_PARAMS_STRING
} from './constants';

const initialState = fromJS({dataWeekParams:'week_flag=Latest Week',dataMetricParams:'metric_flag=Value',urlParamsString:'', d3_output: [{
  "tesco_week": "201701",
  "sales_ly": 83705581.44,
  "sales_ty": 100643914.24
},
  {
    "tesco_week": "201702",
    "sales_ly": 91073256.48,
    "sales_ty": 98391245.6
  },
  {
    "tesco_week": "201703",
    "sales_ly": 85031043.84,
    "sales_ty": 102385268.8
  },
  {
    "tesco_week": "201704",
    "sales_ly": 91091389.45,
    "sales_ty": 102902768.64
  },
  {
    "tesco_week": "201705",
    "sales_ly": 86194442.4,
    "sales_ty": 128032018.88
  },
  {
    "tesco_week": "201706",
    "sales_ly": 93868120.02,
    "sales_ty": 125344453.44
  },
  {
    "tesco_week": "201707",
    "sales_ly": 103393463.52,
    "sales_ty": 110335485.28
  }],comp_data: [
{
  "metric_title": "Value",
  "wow_change": -11.96,
  "lfl_change": 1.13,
  "metric_lfl": 77400656.37,
  "metric_all": 110535028.64,
  "yoy_change": 6.71,
  "tesco_week": "201707"
}
]
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

    default:
      return state;
  }
}

export default productPageReducer;
