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
  PIE_CHART_SPINNER_SUCCESS,
  PROMO_GIVE_AWAY_SPINNER_SUCCESS,
  PRODUCTS_COUNT_SPILT_SPINNER_SUCCESS,
  PROMO_PARTICIPATION_SPILT_SPINNER_SUCCESS,
  PRODUCTS_TABLE_SPINNER_SUCCESS,
  KPI_SPINNER_SUCCESS,
  SAVE_TREND_CHART_TAB_PARAMS,
  SAVE_METRIC_SELECTION_TAB,
  TREND_CHART_SPINNER,

  PRODUCTS_ON_PROMOTION_TABLE_SUCCESS, TREND_FOR_EACH_TAB_SUCCESS, PIE_CHART_FOR_EACH_TAB_SUCCESS, STORE_FILTER_PARAM,
  MODAL_PRODUCT_NAME, MODAL_PRODUCT_DATA_SUCCESS, MODAL_SAVE_TREND_CHART_TAB_PARAMS, DEFAULT_GREY_SCREEN,
  SAVE_PIE_CHART_TYPE, SAVE_LINE_CHART_TYPE, SAVE_MODAL_LINE_CHART_TYPE,

} from './constants';

const initialState = fromJS({
  week_param: 'week_flag=Current Week',
  kpi_param: '',
  urlParamsString: '',
  sales_param: '',
  giveaway_param: '',
  promo_prod_param: '',
  promo_part_param: '',
  lineChartType: 'absolute',
  modalLineChartType: 'absolute',
  weekurlParam: '',
  kpi_data: {
    asp: {
      promo_asp: '0',
      nonpromo_asp: '0',
    },
    promo: {
      var_promo_lfl: '0',
      var_promo_yoy: '0',
      promo: '0',
      promo_lfl: '0',
      var_promo_wow: '0',
    },
    nonpromo: {
      var_nonpromo_lfl: '0',
      var_nonpromo_yoy: '0',
      var_nonpromo_wow: '0',
      nonpromo: '0',
      nonpromo_lfl: '0',
    },
    total: {
      var_total_lfl: '0',
      var_total_wow: '0',
      var_total_yoy: '0',
      total_lfl: '0',
      total: '0',
    },
  },
  trendChartTabParam: 'promo_type=Total Promo',
  modalTrendChartTabParam: 'promo_type=Total Promo',
  metricSelected: 'value',

});

function promotionReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case KPI_CONSTANT:
      console.log('reducer KPI_CONSTANT', action.data);
      return state.set('kpi', action.data);
    case KPI_FETCH_SUCCESS:
      console.log('reducer KPI_FETCH_SUCCESS', action.data);
      return state.set('kpi_data', action.data);
    case SALES_CONSTANT:
      console.log('reducer SALES_CONSTANT', action.data);
      return state.set('sales', action.data);
    case SALES_FETCH_SUCCESS:
      console.log('reducer SALES_FETCH_SUCCESS', action.data);
      return state.set('sales_data', action.data);
    case PROMO_GIVEAWAY_CONSTANT:
      console.log('reducer PROMO_GIVEAWAY_CONSTANT', action.data);
      return state.set('promo_giveaway', action.data);
    case PROMO_GIVEAWAY_FETCH_SUCCESS:
      console.log('reducer PROMO_GIVEAWAY_FETCH_SUCCESS', action.data);
      return state.set('promo_giveaway_data', action.data);
    case PROMO_PROD_CONSTANT:
      console.log('reducer PROMO_PROD_CONSTANT', action.data);
      return state.set('promo_prod', action.data);
    case PROMO_PROD_FETCH_SUCCESS:
      console.log('reducer PROMO_PROD_FETCH_SUCCESS', action.data);
      return state.set('promo_prod_data', action.data);
    case PROMO_PART_CONSTANT:
      console.log('reducer PROMO_PART_CONSTANT', action.data);
      return state.set('promo_part', action.data);
    case PROMO_PART_FETCH_SUCCESS:
      console.log('reducer PROMO_PART_FETCH_SUCCESS', action.data);
      return state.set('promo_part_data', action.data);
    case FILTER_CONSTANT:
      console.log('reducer FILTER_CONSTANT', action.data);
      return state.set('filters', action.data);
    case FILTER_FETCH_SUCCESS:
      console.log('reducer FILTER_FETCH_SUCCESS', action.data);
      return state.set('filter_data', action.data);
    case WEEK_FILTER_CONSTANT:
      console.log('reducer WEEK_FILTER_CONSTANT', action.data);
      return state.set('week_filters', action.data);
    case WEEK_FILTER_FETCH_SUCCESS:
      console.log('reducer WEEK_FILTER_FETCH_SUCCESS', action.data);
      return state.set('week_filter_data', action.data);
    case WEEK_PARAM:
      console.log('reducer WEEK_PARAM', action.data);
      return state.set('week_param', action.data);
    case KPI_PARAM:
      console.log('reducer KPI_PARAM', action.data);
      return state.set('kpi_param', action.data);
    case SALES_PARAM:
      console.log('reducer SALES_PARAM', action.data);
      return state.set('sales_param', action.data);
    case GIVEAWAY_PARAM:
      console.log('reducer GIVEAWAY_PARAM', action.data);
      return state.set('giveaway_param', action.data);
    case PROMO_PROD_PARAM:
      console.log('reducer PROMO_PROD_PARAM', action.data);
      return state.set('promo_prod_param', action.data);
    case PROMO_PART_PARAM:
      console.log('reducer PROMO_PART_PARAM', action.data);
      return state.set('promo_part_param', action.data);
    case GENERATE_FILTER_PARAMS_STRING:
      console.log('reducer GENERATE_FILTER_PARAMS_STRING', action.data);
      return state.set('urlParamsString', action.data);
    case WEEK_FILTER_PARAM:
      console.log('reducer WEEK_FILTER_PARAM', action.data);
      return state.set('weekurlParam', action.data);
    case STORE_FILTER_PARAM:
      console.log('reducer STORE_FILTER_PARAM', action.data);
      return state.set('store_filter_param', action.data);

    // PIE CHART - SPINNER
    case PIE_CHART_SPINNER_SUCCESS:
      console.log('PIE_CHART_SPINNER_SUCCESS', action.spinnerCheck);
      return state.set('pieChartSpinnerSuccess', action.spinnerCheck);

    // PROMO GIVE AWAY- SPINNER
    case PROMO_GIVE_AWAY_SPINNER_SUCCESS:
      console.log('PROMO_GIVE_AWAY_SPINNER_SUCCESS', action.spinnerCheck);
      return state.set('promoGiveAwaySpinnerSuccess', action.spinnerCheck);

    // PRODUCTS COUNT SPLIT SPINNER - SPINNER
    case PRODUCTS_COUNT_SPILT_SPINNER_SUCCESS:
      console.log('PRODUCTS_COUNT_SPILT_SPINNER_SUCCESS', action.spinnerCheck);
      return state.set('productsCountSplitSpinnerSuccess', action.spinnerCheck);

// SPINNERS - PROMO PARTICIPATION SPILT SPINNER
    case PROMO_PARTICIPATION_SPILT_SPINNER_SUCCESS:
      console.log('PROMO_PARTICIPATION_SPILT_SPINNER_SUCCESS', action.spinnerCheck);
      return state.set('promoparticipationSplitSpinnerSuccess', action.spinnerCheck);

    // SPINNERS - PROMO PARTICIPATION SPILT SPINNER
    case PROMO_PARTICIPATION_SPILT_SPINNER_SUCCESS:
      console.log('PROMO_PARTICIPATION_SPILT_SPINNER_SUCCESS', action.spinnerCheck);
      return state.set('promoparticipationSplitSpinnerSuccess', action.spinnerCheck);

    // SPINNERS - TOP 25 PRODUCTS TABLE
    case PRODUCTS_TABLE_SPINNER_SUCCESS:
      console.log('PRODUCTS_TABLE_SPINNER_SUCCESS', action.spinnerCheck);
      return state.set('productsTableSpinnerSuccess', action.spinnerCheck);

    // SPINNERS - KPI DATA
    case KPI_SPINNER_SUCCESS:
      console.log('KPI_SPINNER_SUCCESS', action.spinnerCheck);
      return state.set('kpiSpinnerSuccess', action.spinnerCheck);

    // SPINNERS - TREND CHART
    case TREND_CHART_SPINNER:
      console.log('TREND_CHART_SPINNER', action.spinnerCheck);
      return state.set('trendChartSpinnerSuccess', action.spinnerCheck);

    case SAVE_PIE_CHART_TYPE:
      return state.set('pieChartType', action.data);
    case SAVE_LINE_CHART_TYPE:
      return state.set('lineChartType', action.data);
    case SAVE_MODAL_LINE_CHART_TYPE:
      return state.set('modalLineChartType', action.data);

    // ---------------------------After adding tabs------------------------

    case PRODUCTS_ON_PROMOTION_TABLE_SUCCESS:
      return state.set('productsOnPromotion', action.data);
    case TREND_FOR_EACH_TAB_SUCCESS:
      return state.set('trendChartData', action.data);
    case PIE_CHART_FOR_EACH_TAB_SUCCESS:
      return state.set('pieChartData', action.data);
    case SAVE_TREND_CHART_TAB_PARAMS:
      return state.set('trendChartTabParam', action.data);
    case MODAL_SAVE_TREND_CHART_TAB_PARAMS:
      return state.set('modalTrendChartTabParam', action.data);
    case SAVE_METRIC_SELECTION_TAB:
      return state.set('metricSelected', action.data);

    case MODAL_PRODUCT_NAME:
      return state.set('modalProductName', action.data);
    case MODAL_PRODUCT_DATA_SUCCESS:
      return state.set('modalProductData', action.data);

    // -------------------------DEFAULT SCREEN WHEN FILTERS ARE CLEARED----------------------
    case DEFAULT_GREY_SCREEN:
      console.log('DEFAULT_GREY_SCREEN', action.data);
      return state.set('defaultGreyScreen', action.data);

    default:
      return state;
  }
}

export default promotionReducer;
