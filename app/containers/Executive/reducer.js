/*
 *
 * Executive reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FILTER_CONSTANT,
  FILTER_FETCH_SUCCESS,
  CHECKBOX_CHANGE,
  WEEK_FILTER_CONSTANT,
  WEEK_FILTER_FETCH_SUCCESS,
  WEEK_FILTER_PARAM,
  GENERATE_FILTER_PARAMS_STRING,
  GENERATE_BEST_WORST_PERFORMANCE_TABLE,
  WEEK_PARAM,
  KPI_PARAM,
  DRIVER_PARAM,
  VALUE_INTERNAL_TABS,
  VALUE_EXTERNAL_TABS,
  OVERVIEW_KPI_CONSTANT,
  OVERVIEW_KPI_FETCH_SUCCESS,
  ROLES_INTENT_CONSTANT,
  ROLES_INTENT_FETCH_SUCCESS,
  BUDGET_FORECAST_CONSTANT,
  BUDGET_FORECAST_FETCH_SUCCESS,
  OVERVIEW_KPI_TREND_CONSTANT,
  OVERVIEW_KPI_TREND_FETCH_SUCCESS,
  OVERVIEW_DRIVERS_INTERNAL_CONSTANT,
  OVERVIEW_DRIVERS_INTERNAL_FETCH_SUCCESS,
  OVERVIEW_DRIVERS_EXTERNAL_CONSTANT,
  OVERVIEW_DRIVERS_EXTERNAL_FETCH_SUCCESS,
  KPI_BOXES_CONSTANT,
  KPI_BOXES_FETCH_SUCCESS,
  BEST_WORST_CONSTANT,
  BEST_WORST_FETCH_SUCCESS,
  BEST_INFO_CONSTANT,
  BEST_INFO_FETCH_SUCCESS,
  WORST_INFO_CONSTANT,
  WORST_INFO_FETCH_SUCCESS,
  SUPPLIER_INFO_CONSTANT,
  SUPPLIER_INFO_FETCH_SUCCESS,
  TOP_SUPPLIER_INFO_CONSTANT,
  TOP_SUPPLIER_INFO_FETCH_SUCCESS,
  BOT_SUPPLIER_INFO_CONSTANT,
  BOT_SUPPLIER_INFO_FETCH_SUCCESS,
  DRIVERS_INTERNAL_CONSTANT,
  DRIVERS_INTERNAL_FETCH_SUCCESS,
  DRIVERS_EXTERNAL_CONSTANT,
  DRIVERS_EXTERNAL_FETCH_SUCCESS,
  PRICE_KPI_CONSTANT,
  PRICE_KPI_FETCH_SUCCESS,
  FILTERED_FLAG,
  TOP_SELECTED_NAME,
  BOT_SELECTED_NAME,
  SUPPLIER_NAME,
  TOP_BOT_FLAG,

  //Spinner Flag Constants


  ROLES_INTENT_SPINNER_FLAG,
  OVERVIEW_KPI_SPINNER_FLAG,
  OVERVIEW_KPI_TREND_SPINNER_FLAG,
  OVERVIEW_INTERNAL_DRIVER_SPINNER_FLAG,
  OVERVIEW_EXTERNAL_DRIVER_SPINNER_FLAG,
  KPI_SPINNER_FLAG,
  INTERNAL_DRIVER_SPINNER_FLAG,
  EXTERNAL_DRIVER_SPINNER_FLAG,
  PRICE_KPI_SPINNER_FLAG, GENERATE_BEST_WORST_PERFORMANCE_SUCCESS, GENERATE_BEST_WORST_PERFORMANCE_TABLE_SUCCESS,
  STORE_FILTER_PARAM
} from './constants';


const initialState = fromJS({
  week_param: 'week_flag=Current Week',
  week_filter_param: '',
  kpi_param: 'kpi_type=Overview',
  driver_param: 'internal',
  urlParamsString: '',
  weekurlParam: '',
  filtered_flag: 'no',
  top_name: 'None',
  bot_name: 'None',
  supplier_name: 'None',
  value_internal_tab: 'kpi',
  value_external_tab: 'sunshine',
  //Initial Data

  overview_drivers_external_data: {
    "rainfall": {
      "wow": "0",
      "yoy": "0",
      "avg": "0"
    },
    "temperature": {
      "wow": "0",
      "avg": "0"
    },
    "sunshine": {
      "wow": "0",
      "yoy": "0",
      "avg": "0"
    },
    "holidays": [
      {
        "holiday_description": "No holidays for the selected time period",
        "holiday_date": "-----"
      }
    ]
  },
  kpi_boxes_data: {
    "total_value": {
      "yoy": "0",
      "wow": "0",
      "total_lfl": "0",
      "lfl": "0",
      "total": "0"
    },
    "growth": {
      "total": "0",
      "total_lfl": "0",
      "wow": "0",
      "yoy": "0",
      "lfl": "0",
      "of_wow": "0",
      "of_yoy": "0",
      "of_lfl": "0",
    },
    "market": {
      "total": "0",
      "total_lfl": "0",
      "share": "0",
      "opportunity": "0",
      "outperformance": "0",
    },

  },
  price_kpi_data: {
    "ACP_abs": 0,
    "ACP_fisher_infl": 0,
    "line_count": 0,
    "ACP_lfl_abs": 0,
    "ACPInfl_var_wow": 0,
    "ASPInfl_var_lfl": 0,
    "price_index_var_wow": 0,
    "ASP_lfl_abs": 0,
    "ASPInfl_var_yoy": 0,
    "ASP_abs": 0,
    "ASPInfl_var_wow": 0,
    "ASP_fisher_infl": 0,
    "ACPInfl_var_yoy": 0,
    "ACPInfl_var_lfl": 0,
    "price_index_cw": 0
  },
  best_worst_data: {
    "top_5": [
      {
        "name": "-----"
      },
      {
        "name": "-----"
      },
      {
        "name": "-----"
      },
      {
        "name": "-----"
      },
      {
        "name": "-----"
      }
    ],
    "Choose_filters": "yes",
    "bot_5": [
      {
        "name": "-----"
      },
      {
        "name": "-----"
      },
      {
        "name": "-----"
      },
      {
        "name": "-----"
      },
      {
        "name": "-----"
      }
    ]
  },
  worst_info_data: {

    "fetch": "fail"
  },
  best_info_data: {

    "fetch": "fail"
  },


 promo_stack_key_list:
   ["0","fs_cont_to_growth", "trade_plan_cont_to_growth", "shelf_cont_to_growth", "base_cont_to_growth","event_cont_to_growth"],
  kpi_stack_key_list:
    ["0","item_price_var", "transaction_var", "items_per_basket_var"]

});

function executiveReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FILTER_CONSTANT:
      console.log("reducer FILTER_CONSTANT",action.data);
      return state.set('filter',action.data);
    case FILTER_FETCH_SUCCESS:
      console.log("reducer FILTER_FETCH_SUCCESS",action.data);
      return state.set('filter_data',action.data);
    case CHECKBOX_CHANGE:
      console.log("reducer CHECKBOX_CHANGE",action.data);
      return state.set('checkbox',action.data);
    case WEEK_FILTER_CONSTANT:
      console.log("reducer WEEK_FILTER_CONSTANT",action.data);
      return state.set('week_filter',action.data);
    case WEEK_FILTER_FETCH_SUCCESS:
      console.log("reducer WEEK_FILTER_FETCH_SUCCESS",action.data);
      return state.set('week_filter_data',action.data);
    case WEEK_FILTER_PARAM:
      console.log("reducer WEEK_FILTER_PARAM",action.data);
      return state.set('week_filter_param',action.data);
    case STORE_FILTER_PARAM:
      console.log("reducer STORE_FILTER_PARAM",action.data);
      return state.set('store_filter_param',action.data);
    case OVERVIEW_KPI_CONSTANT:
      console.log("reducer OVERVIEW_KPI_CONSTANT",action.data);
      return state.set('overview_kpi',action.data);
    case OVERVIEW_KPI_FETCH_SUCCESS:
      console.log("reducer OVERVIEW_KPI_FETCH_SUCCESS",action.data);
      return state.set('overview_kpi_data',action.data);
    case ROLES_INTENT_CONSTANT:
      console.log("reducer ROLES_INTENT_CONSTANT",action.data);
      return state.set('roles_intent',action.data);
    case ROLES_INTENT_FETCH_SUCCESS:
      console.log("reducer ROLES_INTENT_FETCH_SUCCESS",action.data);
      return state.set('roles_intent_data',action.data);
    case BUDGET_FORECAST_CONSTANT:
      console.log("reducer BUDGET_FORECAST_CONSTANT",action.data);
      return state.set('budget_forecast',action.data);
    case BUDGET_FORECAST_FETCH_SUCCESS:
      console.log("reducer BUDGET_FORECAST_FETCH_SUCCESS",action.data);
      return state.set('budget_forecast_data',action.data);
    case OVERVIEW_KPI_TREND_CONSTANT:
      console.log("reducer OVERVIEW_KPI_TREND_CONSTANT",action.data);
      return state.set('overview_kpi_trend',action.data);
    case OVERVIEW_KPI_TREND_FETCH_SUCCESS:
      console.log("reducer OVERVIEW_KPI_TREND_FETCH_SUCCESS",action.data);
      return state.set('overview_kpi_trend_data',action.data);
    case OVERVIEW_DRIVERS_INTERNAL_CONSTANT:
      console.log("reducer OVERVIEW_DRIVERS_INTERNAL_CONSTANT",action.data);
      return state.set('overview_drivers_internal',action.data);
    case OVERVIEW_DRIVERS_INTERNAL_FETCH_SUCCESS:
      console.log("reducer OVERVIEW_DRIVERS_INTERNAL_FETCH_SUCCESS",action.data);
      return state.set('overview_drivers_internal_data',action.data);
    case OVERVIEW_DRIVERS_EXTERNAL_CONSTANT:
      console.log("reducer OVERVIEW_DRIVERS_EXTERNAL_CONSTANT",action.data);
      return state.set('overview_drivers_external',action.data);
    case OVERVIEW_DRIVERS_EXTERNAL_FETCH_SUCCESS:
      console.log("reducer OVERVIEW_DRIVERS_EXTERNAL_FETCH_SUCCESS",action.data);
      return state.set('overview_drivers_external_data',action.data);
    case KPI_BOXES_CONSTANT:
      console.log("reducer KPI_BOXES_CONSTANT",action.data);
      return state.set('kpi_boxes',action.data);
    case KPI_BOXES_FETCH_SUCCESS:
      console.log("reducer KPI_BOXES_FETCH_SUCCESS",action.data);
      return state.set('kpi_boxes_data',action.data);
    case BEST_WORST_CONSTANT:
      console.log("reducer BEST_WORST_CONSTANT",action.data);
      return state.set('best_worst',action.data);
    case BEST_WORST_FETCH_SUCCESS:
      console.log("reducer BEST_WORST_FETCH_SUCCESS",action.data);
      return state.set('best_worst_data',action.data);
    case BEST_INFO_CONSTANT:
      console.log("reducer BEST_INFO_CONSTANT",action.data);
      return state.set('best_info',action.data);
    case BEST_INFO_FETCH_SUCCESS:
      console.log("reducer BEST_INFO_FETCH_SUCCESS",action.data);
      return state.set('best_info_data',action.data);
    case WORST_INFO_CONSTANT:
      console.log("reducer WORST_INFO_CONSTANT",action.data);
      return state.set('worst_info',action.data);
    case WORST_INFO_FETCH_SUCCESS:
      console.log("reducer WORST_INFO_FETCH_SUCCESS",action.data);
      return state.set('worst_info_data',action.data);
    case TOP_SUPPLIER_INFO_CONSTANT:
      console.log("reducer TOP_SUPPLIER_INFO_CONSTANT",action.data);
      return state.set('top_supp_info',action.data);
    case TOP_SUPPLIER_INFO_FETCH_SUCCESS:
      console.log("reducer TOP_SUPPLIER_INFO_FETCH_SUCCESS",action.data);
      return state.set('top_supp_info_data',action.data);
    case BOT_SUPPLIER_INFO_CONSTANT:
      console.log("reducer BOT_SUPPLIER_INFO_CONSTANT",action.data);
      return state.set('bot_supp_info',action.data);
    case BOT_SUPPLIER_INFO_FETCH_SUCCESS:
      console.log("reducer BOT_SUPPLIER_INFO_FETCH_SUCCESS",action.data);
      return state.set('bot_supp_info_data',action.data);
    case SUPPLIER_INFO_CONSTANT:
      console.log("reducer SUPPLIER_INFO_CONSTANT",action.data);
      return state.set('supp_info',action.data);
    case SUPPLIER_INFO_FETCH_SUCCESS:
      console.log("reducer SUPPLIER_INFO_FETCH_SUCCESS",action.data);
      return state.set('supp_info_data',action.data);
    case DRIVERS_INTERNAL_CONSTANT:
      console.log("reducer DRIVERS_INTERNAL_CONSTANT",action.data);
      return state.set('drivers_internal',action.data);
    case DRIVERS_INTERNAL_FETCH_SUCCESS:
      console.log("reducer DRIVERS_INTERNAL_FETCH_SUCCESS",action.data);
      return state.set('drivers_internal_data',action.data);
    case DRIVERS_EXTERNAL_CONSTANT:
      console.log("reducer DRIVERS_EXTERNAL_CONSTANT",action.data);
      return state.set('drivers_external',action.data);
    case DRIVERS_EXTERNAL_FETCH_SUCCESS:
      console.log("reducer DRIVERS_EXTERNAL_FETCH_SUCCESS",action.data);
      return state.set('drivers_external_data',action.data);
    case PRICE_KPI_CONSTANT:
      console.log("reducer PRICE_KPI_CONSTANT",action.data);
      return state.set('price_kpi',action.data);
    case PRICE_KPI_FETCH_SUCCESS:
      console.log("reducer PRICE_KPI_FETCH_SUCCESS",action.data);
      return state.set('price_kpi_data',action.data);
    case GENERATE_FILTER_PARAMS_STRING:
      console.log("reducer GENERATE_FILTER_PARAMS_STRING",action.data);
      return state.set('urlParamsString',action.data);
    case WEEK_PARAM:
      console.log("reducer WEEK_PARAM",action.data);
      return state.set('week_param',action.data);
    case KPI_PARAM:
      console.log("reducer KPI_PARAM",action.data);
      return state.set('kpi_param',action.data);
    case DRIVER_PARAM:
      console.log("reducer KPI_PARAM",action.data);
      return state.set('driver_param',action.data);
    case VALUE_INTERNAL_TABS:
      console.log("reducer VALUE_INTERNAL_TABS",action.data);
      return state.set('value_internal_tab',action.data);
    case VALUE_EXTERNAL_TABS:
      console.log("reducer VALUE_EXTERNAL_TABS",action.data);
      return state.set('value_external_tab',action.data);
    case FILTERED_FLAG:
      console.log("reducer FILTERED_FLAG",action.data);
      return state.set('filtered_flag',action.data);
    case TOP_SELECTED_NAME:
      console.log("reducer TOP_SELECTED_NAME",action.data);
      return state.set('top_name',action.data);
    case BOT_SELECTED_NAME:
      console.log("reducer BOT_SELECTED_NAME",action.data);
      return state.set('bot_name',action.data);
    case SUPPLIER_NAME:
      console.log("reducer SUPPLIER_NAME",action.data);
      return state.set('supplier_name',action.data);
    case TOP_BOT_FLAG:
      console.log("reducer TOP_BOT_FLAG",action.data);
      return state.set('top_bot_flag',action.data);

    case ROLES_INTENT_SPINNER_FLAG:
    console.log("reducer ROLES_INTENT_SPINNER_FLAG",action.spinnerCheck);
    return state.set('rolesIntentSpinner',action.spinnerCheck);

    case OVERVIEW_KPI_TREND_SPINNER_FLAG:
      console.log("reducer OVERVIEW_KPI_TREND_SPINNER_FLAG",action.spinnerCheck);
      return state.set('overviewKPITrendSpinner',action.spinnerCheck);

    case OVERVIEW_KPI_SPINNER_FLAG:
      console.log("reducer OVERVIEW_KPI_SPINNER_FLAG",action.spinnerCheck);
      return state.set('overviewKPISpinner',action.spinnerCheck);

    case OVERVIEW_INTERNAL_DRIVER_SPINNER_FLAG:
      console.log("reducer OVERVIEW_INTERNAL_DRIVER_SPINNER_FLAG",action.spinnerCheck);
      return state.set('overviewInternalDriverSpinner',action.spinnerCheck);

    case OVERVIEW_EXTERNAL_DRIVER_SPINNER_FLAG:
      console.log("reducer OVERVIEW_EXTERNAL_DRIVER_SPINNER_FLAG",action.spinnerCheck);
      return state.set('overviewExternalDriverSpinner',action.spinnerCheck);

    case KPI_SPINNER_FLAG:
      console.log("reducer KPI_SPINNER_FLAG",action.spinnerCheck);
      return state.set('KPISpinner',action.spinnerCheck);

    case INTERNAL_DRIVER_SPINNER_FLAG:
      console.log("reducer INTERNAL_DRIVER_SPINNER_FLAG",action.spinnerCheck);
      return state.set('internalDriverSpinner',action.spinnerCheck);

    case EXTERNAL_DRIVER_SPINNER_FLAG:
      console.log("reducer EXTERNAL_DRIVER_SPINNER_FLAG",action.spinnerCheck);
      return state.set('externalDriverSpinner',action.spinnerCheck);

    case PRICE_KPI_SPINNER_FLAG:
      console.log("reducer PRICE_KPI_SPINNER_FLAG",action.spinnerCheck);
      return state.set('priceKPISpinner',action.spinnerCheck);

    //saurav
    case GENERATE_BEST_WORST_PERFORMANCE_SUCCESS:
      return state.set('bestWorstPerformance',action.data)
    case GENERATE_BEST_WORST_PERFORMANCE_TABLE:
      // alert(action.data)
      return state.set('tableSelectedLevel',action.data)
    case GENERATE_BEST_WORST_PERFORMANCE_TABLE_SUCCESS:
      return state.set('bestWorstPerformanceTable',action.data)

    default:
      return state;
  }
}

export default executiveReducer;
