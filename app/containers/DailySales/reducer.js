/*
 *
 * DailySales reducer
 *
 */

import {fromJS} from 'immutable';
import {
  DEFAULT_ACTION,
  CARDS_DATA_FETCH_SUCCESS,
  CHARTS_DATA_FETCH_SUCCESS,
  PROD_CARDS_DATA_FETCH_SUCCESS,
  PROD_CHARTS_DATA_FETCH_SUCCESS,
  KPI_PARAM,
  FILTER_CONSTANT,
  KPI_CONSTANT,
  KPI_FETCH_SUCCESS,
  WEEK_PARAM,
  GENERATE_FILTER_PARAMS_STRING,
  FILTER_FETCH_SUCCESS,
  WEEK_FILTER_CONSTANT,
  WEEK_FILTER_FETCH_SUCCESS,
  DATE_FILTER_PARAM,
  GENERATE_URL_PARAMS,
  DS_VIEW_KPI_SPINNER,
  LINE_CHART_SPINNER,
  PROD_CARDS_SPINNER,
  PROD_CHARTS_SPINNER,
  STORE_FILTER_PARAM,
  WEEK,
  PRODUCT_CONSTANT,
  CHECKBOX_CHANGE,
  CHECKBOX_WEEK_CHANGE,
  DEFAULT_PAGE_LOAD_CHECK,
  DEFAULT_GREY_SCREEN
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
      return state.set('chart_data', action.data);

    case CARDS_DATA_FETCH_SUCCESS:
      console.log("reducer CARDS_DATA_FETCH_SUCCESS", action.data)
      return state.set('cards_data', action.data);

    case CHARTS_DATA_FETCH_SUCCESS:
      console.log("reducer CHARTS_DATA_FETCH_SUCCESS", action.data)
      return state.set('charts_data', action.data);

    case PROD_CARDS_DATA_FETCH_SUCCESS:
      console.log("reducer PROD_CARDS_DATA_FETCH_SUCCESS", action.data)
      return state.set('prod_cards_data', action.data);

    case PROD_CHARTS_DATA_FETCH_SUCCESS:
      console.log("reducer PROD_CHARTS_DATA_FETCH_SUCCESS", action.data)
      return state.set('prod_charts_data', action.data);

    case KPI_PARAM:
      console.log("reducer KPI_PARAM", action.data);
      return state.set('kpi_param', action.data);
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
    case DATE_FILTER_PARAM:
      console.log("reducer DATE_FILTER_PARAM", action.data);
      return state.set('dateurlParam', action.data);
    case STORE_FILTER_PARAM:
      console.log("reducer STORE_FILTER_PARAM",action.data);
      return state.set('store_filter_param',action.data);

    //SPINNER FOR DS VIEW KPI
    case DS_VIEW_KPI_SPINNER:
      console.log("DS_VIEW_KPI_SPINNER", action.DSViewKpiSpinnerCheck);
      return state.set('DSViewKpiSpinner', action.DSViewKpiSpinnerCheck)

    //SPINNER FOR LINE CHART
    case LINE_CHART_SPINNER:
      console.log("LINE_CHART_SPINNER", action.LineChartSpinnerCheck);
      return state.set('LineChartSpinnerCheck', action.LineChartSpinnerCheck)

    //SPINNER FOR PROD DAILY TREND CHART
    case PROD_CARDS_SPINNER:
      console.log("PROD_CARDS_SPINNER", action.ProdCardsSpinnerCheck);
      return state.set('ProdCardsSpinnerCheck', action.ProdCardsSpinnerCheck)

    //SPINNER FOR PROD CUM TREND CHART
    case PROD_CHARTS_SPINNER:
      console.log("PROD_CHARTS_SPINNER", action.ProdChartsSpinnerCheck);
      return state.set('ProdChartsSpinnerCheck', action.ProdChartsSpinnerCheck)

    //FOR FILTERS
    case GENERATE_URL_PARAMS:
      console.log("reducer WEEK", action.data)
      return state.set('urlParams', action.data);

    case WEEK:
      console.log("reducer WEEK", action.data);
      return state.set('week', action.data);

    case PRODUCT_CONSTANT:
      console.log("reducer PRODUCT", action.data);
      return state.set('product', action.data);

    case CHECKBOX_CHANGE:
      console.log(CHECKBOX_CHANGE, 'reducer', action);
      return state.set('filter_selection', action.data);

    case CHECKBOX_WEEK_CHANGE:
      console.log('CHECKBOX_WEEK_CHANGE reducer', action.data);
      return state.set('filter_week_selection', action.data);

    case DEFAULT_PAGE_LOAD_CHECK:
      console.log('DEFAULT_PAGE_LOAD_CHECK reducer', action.data);
      return state.set('defaultPageLoadCheck', action.data);

    case DEFAULT_GREY_SCREEN:
      console.log("DEFAULT_GREY_SCREEN", action.data);
      return state.set('defaultGreyScreen', action.data);

    default:
      return state;
  }
}


export default dailySalesReducer;
