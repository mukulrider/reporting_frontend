/*
 *
 * Supplier reducer
 *
 */

import {fromJS} from 'immutable';
import {
  DEFAULT_ACTION,
  KPI_CONSTANT,
  TOP_BOTTOM_CONSTANT,
  KPI_DATA_FETCH_SUCCESS,
  SUPPLIER_TABLE_DATA_FETCH_SUCCESS,
  GENERATE_TEXTBOX_QUERY_STRING, SAVE_PAGE_PARAM,
  SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS,
  WEEK_PARAM,
  KPI_PARAM,
  FILTERS_DATA_SUCCESS,
  KPI_ASP_CONSTANT,
  KPI_DATA_ASP_FETCH_SUCCESS,
  TOP_BOTTOM_KPI,
  GENERATE_URL_PARAMS_STRING,
  GENERATE_URL_PARAMS_STRING2,
  GENERATE_URL_PARAMS_STRING3,
  WEEK_FILTER_FETCH_SUCCESS,
  CHECKBOX_WEEK_CHANGE,
  WEEK,
  GRAPH_FETCH_SUCCESS,
  SAVE_BUBBLE_PARAM,
  SAVE_BUBBLE_PARAM2,
  RADIO_CHECK_PARAM,
  GENERATE_TABLE_SUCCESS,
  GENERATE_CHECKED_LIST,
  SAVE_PERF_PARAM,
  SAVE_STORE_PARAM,
  SUPPLIER_VIEW_KPI_SPINNER,
  BUBBLE_CHART_SPINNER,
  BAR_CHART_SPINNER,
  TABLE_SPINNER,
  STORE_FILTER_PARAM,
  DEFAULT_GREY_SCREEN,
  GENERATE_URL_PARAMS_STRING_FOR_FILTERS,
  BRAND_PARAM,
  GENERATE_URL_PARAMS_STRING_PARENT,
  GENERATE_URL_PARAMS_STRING_SUPPLIER,
} from './constants';

const initialState = fromJS({
  reducer1: {'sales': '---'},
  reducer1: {'sales_lfl': '---'},
  reducer1: {'sales_var_week': '---'},
  reducer1: {'sales_var_year': '---'},
  reducer1: {'sales_var_year_lfl': '---'},
  reducer1: {'sales_growth_wow_1': '---'},
  reducer1: {'sales_growth_wow_2': '---'},
  reducer1: {'sales_growth_yoy_1': '---'},
  reducer1: {'sales_growth_yoy_2': '---'},
  reducer1: {'sales_growth_yoy_lfl_1': '---'},
  reducer1: {'sales_growth_yoy_lfl_2': '---'},
  week_param: '',
  kpi_param: '',
  brandParam: '',
  top_bottom_kpi: '',
  prodArrayTable: '[]',
  prodArrayOpacity: '[]',
  radioChecked: '',
  urlParamsString: '',
  dataPerformanceUrlParams: '',
  bubbleParams: '',
  textBoxQueryString: '',
  dataPageUrlParams: '',
  dataStoreUrlParams: '',
  dataWeekUrlParams: '',
  filter_week_selection: '',
  newUrlparamsForFilters: '',
  checkedList: [],
  chartData: [
    {
      x: 200,
      y: 100,
      ros: 20
    },
    {
      x: 160,
      y: 200,
      ros: 10
    },
    {
      x: 240,
      y: 250,
      ros: 20
    },
    {
      x: 320,
      y: 50,
      ros: 10
    },
    {
      x: 400,
      y: 70,
      ros: 10
    },
    {
      x: 430,
      y: 70,
      ros: 10
    }],
  urlParams: '',
  supplierViewKpiSpinner: '',


});

function supplierReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      console.log("printing state", state)
      return state;

    case KPI_CONSTANT:
      return state.set('reducer', action.data);
    case KPI_ASP_CONSTANT:
      return state.set('reducer', action.data);
    case TOP_BOTTOM_CONSTANT:
      return state.set('topBotVar', action.data);

    case SAVE_BUBBLE_PARAM2:
      return state.set('prodArrayOpacity', action.data);

    case KPI_DATA_FETCH_SUCCESS:
      return state.set('reducer1', action.data);

    case KPI_DATA_ASP_FETCH_SUCCESS:
      return state.set('reducer1', action.data);

// FOR SAVING FILTERS DATA GOT FROM AJAX CALL IN REDUCER/STATE
    case FILTERS_DATA_SUCCESS:
      console.log("filter data in reducer");
      return state.set('sideFilter', action.data);

    case GRAPH_FETCH_SUCCESS:
      return state.set('chartData', action.data);

    case SAVE_PERF_PARAM:
      return state.set('dataPerformanceUrlParams', action.data);

    case SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS:
      return state.set('topBotData', action.data);

    case WEEK_PARAM:
      return state.set('week_param', action.data);

    case KPI_PARAM:
      return state.set('kpi_param', action.data);

    case TOP_BOTTOM_KPI:
      return state.set('top_bottom_kpi', action.data);

    //STORING FILTERS SELECTED BY USER
    case GENERATE_URL_PARAMS_STRING:
      if (action.data === 0) {
        return state
      } else {
        return state.set('urlParamsString', action.data);
      }

    //STORING FILTERS ON DEFAULT LOAD FOR AJAX CALL
    case GENERATE_URL_PARAMS_STRING2:
      return state.set('urlParamsString2', action.data);

//FLAG FOR KNOWING DEFAULT PAGE LOAD
    case GENERATE_URL_PARAMS_STRING3:
      return state.set('urlParamsString3', action.data);

    case SAVE_BUBBLE_PARAM:
      return state.set('prodArrayTable', action.data);

    case SAVE_STORE_PARAM:
      return state.set('dataStoreUrlParams', action.data);

    //FOR WEEK FILTER DATA
    case WEEK_FILTER_FETCH_SUCCESS:
      return state.set('week_filter_data', action.data)

    case CHECKBOX_WEEK_CHANGE:
      return state.set('filter_week_selection', action.data);

    //For table
    case GENERATE_TABLE_SUCCESS:
      return state.set('data', action.data);

    case GENERATE_TEXTBOX_QUERY_STRING:
      return state.set('textBoxQueryString', action.data);

    case SAVE_PAGE_PARAM:
      return state.set('dataPageUrlParams', action.data);

    case RADIO_CHECK_PARAM:
      return state.set('radioChecked', action.data);

    case WEEK:
      return state.set('week', action.data)

    case GENERATE_CHECKED_LIST:
      return state.set('checkedList', (() => {
        // console.log(state.get('checkedList'));
        let entireChangedPrices = state.get('checkedList');
        // console.log('entireChangedPrices', entireChangedPrices);
        const toDelete = new Set([action.base_product_number]);
        // console.log('toDelete', toDelete);
        const newArray = entireChangedPrices.filter(obj => !toDelete.has(obj.productId));
        // console.log(newArray, action.checked, action.base_product_number);
        return [...newArray,
          {
            productId: action.base_product_number,
            checked: action.checked,
          }
        ]
      })());

    //SPINNER FOR SUPPLIER VIEW KPI
    case SUPPLIER_VIEW_KPI_SPINNER:
      return state.set('supplierViewKpiSpinner', action.supplierViewKpiSpinnerCheck)

    //SPINNER FOR BUBBLE CHART
    case BUBBLE_CHART_SPINNER:
      return state.set('bubbleChartSpinnerCheck', action.bubbleChartSpinnerCheck)

    //SPINNER FOR BAR CHART
    case BAR_CHART_SPINNER:
      return state.set('barChartSpinnerCheck', action.barChartSpinnerCheck)

    //SPINNER FOR TABLE
    case TABLE_SPINNER:
      return state.set('tableChartSpinnerCheck', action.tableChartSpinnerCheck)

    case STORE_FILTER_PARAM:
      return state.set('store_filter_param', action.data);

    case DEFAULT_GREY_SCREEN:
      return state.set('defaultGreyScreen', action.data);

    case GENERATE_URL_PARAMS_STRING_FOR_FILTERS:
      return state.set('newUrlparamsForFilters', action.data);

    case BRAND_PARAM:
      return state.set('brandParam', action.data);

    case GENERATE_URL_PARAMS_STRING_PARENT:
      return state.set('parentParam', action.data);

    //FOR SENDING FILTER DATA - SUPPLIER
    case GENERATE_URL_PARAMS_STRING_SUPPLIER:
      return state.set('supplierParam', action.data);

    default:
      return state;
  }
}

export default supplierReducer;
