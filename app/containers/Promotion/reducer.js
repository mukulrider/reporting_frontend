/*
 *
 * Promotion reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  KPI_CONSTANT,
  KPI_FETCH_SUCCESS,
  SALES_CONSTANT,
  SALES_FETCH_SUCCESS,
  PROMO_INFO_CONSTANT,
  PROMO_INFO_FETCH_SUCCESS,
  WEEK_PARAM,
  KPI_PARAM
} from './constants';

const initialState = fromJS({
  week_param :'',
  kpi_param :'',
  kpi_data : {
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
      console.log("reducer KPI_CONSTANT",action.data)
      return state.set('kpi',action.data)
    case KPI_FETCH_SUCCESS:
      console.log("reducer KPI_FETCH_SUCCESS",action.data)
      return state.set('kpi_data',action.data)
    case SALES_CONSTANT:
      console.log("reducer SALES_CONSTANT",action.data)
      return state.set('sales',action.data)
    case SALES_FETCH_SUCCESS:
      console.log("reducer SALES_FETCH_SUCCESS",action.data)
      return state.set('sales_data',action.data)
    case  PROMO_INFO_CONSTANT:
      console.log("reducer PROMO_INFO_CONSTANT",action.data)
      return state.set('promo_info',action.data)
    case  PROMO_INFO_FETCH_SUCCESS:
      console.log("reducer PROMO_INFO_FETCH_SUCCESS",action.data)
      return state.set('promo_info_data',action.data)
    case WEEK_PARAM:
      console.log("reducer WEEK_PARAM",action.data);
      return state.set('week_param',action.data)
    case KPI_PARAM:
      console.log("reducer KPI_PARAM",action.data);
      return state.set('kpi_param',action.data)
    default:
      return state;
  }
}

export default promotionReducer;
