/*
 *
 * Promotion reducer
 *
 */

import {fromJS} from 'immutable';
import {
  DEFAULT_ACTION,
  KPI_CONSTANT,
  KPI_FETCH_SUCCESS,
  SALES_CONSTANT,
  SALES_FETCH_SUCCESS,
  PROMO_GIVEAWAY_CONSTANT,
  PROMO_GIVEAWAY_FETCH_SUCCESS,
  WEEK_PARAM,
  KPI_PARAM,
  FILTER_CONSTANT, GENERATE_FILTER_PARAMS_STRING,
  FILTER_FETCH_SUCCESS,
  SALES_PARAM,
  PROMO_PART_PARAM,
  PROMO_PROD_PARAM,
  GIVEAWAY_PARAM,
  PROMO_PROD_CONSTANT,
  PROMO_PROD_FETCH_SUCCESS,
  PROMO_PART_CONSTANT,
  PROMO_PART_FETCH_SUCCESS,
  WEEK_FILTER_CONSTANT,
  WEEK_FILTER_FETCH_SUCCESS,
  WEEK_FILTER_PARAM,
  GENERATE_URL_PARAMS,
  WEEK,
  CHECKBOX_CHANGE,
  CHECKBOX_WEEK_CHANGE,

} from './constants';

const initialState = fromJS({
  week_param: '',
  kpi_param: '',
  urlParamsString: '',
  sales_param: '',
  giveaway_param: '',
  promo_prod_param: '',
  promo_part_param: '',
  weekurlParam: '',
  kpi_data: {
    "asp": {
      "promo_asp": "0",
      "nonpromo_asp": "0"
    },
    "promo": {
      "var_promo_lfl": "0",
      "var_promo_yoy": "0",
      "promo": "0",
      "promo_lfl": "0",
      "var_promo_wow": "0"
    },
    "nonpromo": {
      "var_nonpromo_lfl": "0",
      "var_nonpromo_yoy": "0",
      "var_nonpromo_wow": "0",
      "nonpromo": "0",
      "nonpromo_lfl": "0"
    },
    "total": {
      "var_total_lfl": "0",
      "var_total_wow": "0",
      "var_total_yoy": "0",
      "total_lfl": "0",
      "total": "0"
    }
  }

});

function promotionReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case KPI_CONSTANT:
      console.log("reducer KPI_CONSTANT", action.data)
      return state.set('kpi', action.data)
    case KPI_FETCH_SUCCESS:
      console.log("reducer KPI_FETCH_SUCCESS", action.data)
      return state.set('kpi_data', action.data)
    case SALES_CONSTANT:
      console.log("reducer SALES_CONSTANT", action.data)
      return state.set('sales', action.data)
    case SALES_FETCH_SUCCESS:
      console.log("reducer SALES_FETCH_SUCCESS", action.data)
      return state.set('sales_data', action.data)
    case  PROMO_GIVEAWAY_CONSTANT:
      console.log("reducer PROMO_GIVEAWAY_CONSTANT", action.data)
      return state.set('promo_giveaway', action.data)
    case  PROMO_GIVEAWAY_FETCH_SUCCESS:
      console.log("reducer PROMO_GIVEAWAY_FETCH_SUCCESS", action.data)
      return state.set('promo_giveaway_data', action.data)
    case  PROMO_PROD_CONSTANT:
      console.log("reducer PROMO_PROD_CONSTANT", action.data)
      return state.set('promo_prod', action.data)
    case  PROMO_PROD_FETCH_SUCCESS:
      console.log("reducer PROMO_PROD_FETCH_SUCCESS", action.data)
      return state.set('promo_prod_data', action.data)
    case  PROMO_PART_CONSTANT:
      console.log("reducer PROMO_PART_CONSTANT", action.data)
      return state.set('promo_part', action.data)
    case  PROMO_PART_FETCH_SUCCESS:
      console.log("reducer PROMO_PART_FETCH_SUCCESS", action.data)
      return state.set('promo_part_data', action.data)
    case FILTER_CONSTANT:
      console.log("reducer FILTER_CONSTANT", action.data);
      return state.set('filters', action.data);
    case FILTER_FETCH_SUCCESS:
      console.log("reducer FILTER_FETCH_SUCCESS", action.data);
      return state.set('filter_data', action.data);
    case WEEK_FILTER_CONSTANT:
      console.log("reducer WEEK_FILTER_CONSTANT", action.data);
      return state.set('week_filters', action.data);
    case WEEK_FILTER_FETCH_SUCCESS:
      console.log("reducer WEEK_FILTER_FETCH_SUCCESS", action.data);
      return state.set('week_filter_data', action.data)
    case WEEK_PARAM:
      console.log("reducer WEEK_PARAM", action.data);
      return state.set('week_param', action.data)
    case KPI_PARAM:
      console.log("reducer KPI_PARAM", action.data);
      return state.set('kpi_param', action.data)
    case SALES_PARAM:
      console.log("reducer SALES_PARAM", action.data);
      return state.set('sales_param', action.data)
    case GIVEAWAY_PARAM:
      console.log("reducer GIVEAWAY_PARAM", action.data);
      return state.set('giveaway_param', action.data)
    case PROMO_PROD_PARAM:
      console.log("reducer PROMO_PROD_PARAM", action.data);
      return state.set('promo_prod_param', action.data)
    case PROMO_PART_PARAM:
      console.log("reducer PROMO_PART_PARAM", action.data);
      return state.set('promo_part_param', action.data)
    case GENERATE_FILTER_PARAMS_STRING:
      console.log("reducer GENERATE_FILTER_PARAMS_STRING", action.data);
      return state.set('urlParamsString', action.data)
    case WEEK_FILTER_PARAM:
      console.log("reducer WEEK_FILTER_PARAM", action.data);
      return state.set('weekurlParam', action.data)

    //FOR FILTERS
    case GENERATE_URL_PARAMS:
      return state.set('urlParams', action.data);

    case WEEK:
      console.log("reducer WEEK", action.data);
      return state.set('week', action.data)

    case CHECKBOX_CHANGE:
      // console.log(CHECKBOX_CHANGE, 'reducer', action);
      return state.set('filter_selection', action.data);

    case CHECKBOX_WEEK_CHANGE:
      console.log('CHECKBOX_WEEK_CHANGE reducer', action.data);
      return state.set('filter_week_selection', action.data);


    default:
      return state;
  }
}

export default promotionReducer;
