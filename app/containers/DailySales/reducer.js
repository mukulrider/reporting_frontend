/*
 *
 * DailySales reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LINECHART_FETCH_SUCCESS,
  KPI_PARAM,
  FILTER_CONSTANT,
  KPI_CONSTANT,
  KPI_FETCH_SUCCESS,
  SALES_CONSTANT,
  SALES_FETCH_SUCCESS,
  WEEK_PARAM,
  GENERATE_FILTER_PARAMS_STRING,
  FILTER_FETCH_SUCCESS,
  WEEK_FILTER_CONSTANT,
  WEEK_FILTER_FETCH_SUCCESS,
  WEEK_FILTER_PARAM,
  GENERATE_URL_PARAMS,
  DS_VIEW_KPI_SPINNER,
  LINE_CHART_SPINNER,
  WEEK,
  CHECKBOX_CHANGE,
  CHECKBOX_WEEK_CHANGE
} from './constants';


const initialState = fromJS({
  week_param: '',
  kpi_param: '',
  urlParamsString: '',
  giveaway_param: '',
  promo_prod_param: '',
  promo_part_param: '',
  DSViewKpiSpinner: '',
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


function dailySalesReducer(state = initialState, action) {
  switch (action.type) {

    case DEFAULT_ACTION:
      return state.set('linechart_data', action.data);
    case LINECHART_FETCH_SUCCESS:
      console.log("reducer LINECHART_FETCH_SUCCESS", action.data)
      return state.set('linechart_data', action.data);
    case KPI_PARAM:
      console.log("reducer KPI_PARAM",action.data);
      return state.set('kpi_param',action.data);
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
      return state.set('week_filter_data', action.data);
    case WEEK_PARAM:
      console.log("reducer WEEK_PARAM", action.data);
      return state.set('week_param', action.data);
    case WEEK_FILTER_PARAM:
      console.log("reducer WEEK_FILTER_PARAM", action.data);
      return state.set('weekurlParam', action.data);

    //SPINNER FOR DS VIEW KPI
    case DS_VIEW_KPI_SPINNER:
      console.log("DS_VIEW_KPI_SPINNER", action.DSViewKpiSpinnerCheck);
      return state.set('DSViewKpiSpinner', action.DSViewKpiSpinnerCheck)

    //SPINNER FOR LINE CHART
    case LINE_CHART_SPINNER:
      console.log("LINE_CHART_SPINNER", action.LineChartSpinnerCheck);
      return state.set('LineChartSpinnerCheck', action.LineChartSpinnerCheck)

    //FOR FILTERS
    case GENERATE_URL_PARAMS:
      console.log("reducer WEEK", action.data)
      return state.set('urlParams', action.data);

    case WEEK:
      console.log("reducer WEEK", action.data);
      return state.set('week', action.data);

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




export default dailySalesReducer;
