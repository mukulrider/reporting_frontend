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
  SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS,
  WEEK_PARAM,
  KPI_PARAM,
  FILTERS_DATA_SUCCESS,
  KPI_ASP_CONSTANT,
  KPI_DATA_ASP_FETCH_SUCCESS,
  TOP_BOTTOM_KPI,
  GENERATE_URL_PARAMS_STRING,
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
  top_bottom_kpi: '',
  prodArrayTable: '[]',
  prodArrayOpacity: '[]',
  radioChecked: '',
  dataPerformanceUrlParams: '',
  bubbleParams: '',
  performanceParams: '',
  dataStoreUrlParams: '',
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


});

function supplierReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      console.log("printing state", state)
      return state;

    case KPI_CONSTANT:
      console.log("reducer.js KPI CONSTANT", action.data);
      return state.set('reducer', action.data);
    case KPI_ASP_CONSTANT:
      console.log("reducer.js KPI ASP CONTANT", action.data);
      return state.set('reducer', action.data);
    case TOP_BOTTOM_CONSTANT:
      console.log("reducer.js TOP BOTTOM CONTANT", action.data);
      return state.set('topBotVar', action.data);

    case SAVE_BUBBLE_PARAM2:
      console.log("Bubble array in reducer2", action.data);
      return state.set('prodArrayOpacity', action.data);

    case KPI_DATA_FETCH_SUCCESS:
      console.log("reducer.js KPI data", action.data);
      return state.set('reducer1', action.data);
    case KPI_DATA_ASP_FETCH_SUCCESS:
      console.log("reducer.js KPI data ASP", action.data);
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
      console.log("reducer SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS", action.data);
      return state.set('topBotData', action.data);
    case WEEK_PARAM:
      console.log("reducer WEEK_PARAM", action.data);
      return state.set('week_param', action.data)
    case KPI_PARAM:
      console.log("reducer KPI_PARAM", action.data);
      return state.set('kpi_param', action.data)
    case TOP_BOTTOM_KPI:
      console.log("reducer TOP_BOTTOM_KPI", action.data);
      return state.set('top_bottom_kpi', action.data);

    //STORING FILTERS SELECTED BY USER
    case GENERATE_URL_PARAMS_STRING:
      return state.set('urlParamsString', action.data);

    case SAVE_BUBBLE_PARAM:
      console.log("Bubble array in reducer", action.data);
      return state.set('prodArrayTable', action.data);

    case SAVE_STORE_PARAM:
      return state.set('dataStoreUrlParams', action.data);

    //FOR WEEK FILTER DATA
    case WEEK_FILTER_FETCH_SUCCESS:
      console.log("reducer WEEK_FILTER_FETCH_SUCCESS", action.data);
      return state.set('week_filter_data', action.data)

    case CHECKBOX_WEEK_CHANGE:
      console.log('CHECKBOX_WEEK_CHANGE reducer', action.data);
      return state.set('filter_week_selection', action.data);

    //For table
    case GENERATE_TABLE_SUCCESS:
      console.log('generate_table_success..................')
      return state.set('data', action.data);

    case RADIO_CHECK_PARAM:
      console.log("RADIO_CHECK_PARAM", action.data);
      return state.set('radioChecked', action.data);

    case WEEK:
      console.log("reducer WEEK", action.data);
      return state.set('week', action.data)

    case GENERATE_CHECKED_LIST:
      return state.set('checkedList', (() => {
        console.log(state.get('checkedList'));
        let entireChangedPrices = state.get('checkedList');
        console.log('entireChangedPrices', entireChangedPrices);
        const toDelete = new Set([action.base_product_number]);
        console.log('toDelete', toDelete);
        const newArray = entireChangedPrices.filter(obj => !toDelete.has(obj.productId));
        // console.log(newArray, action.checked, action.base_product_number);
        return [...newArray,
          {
            productId: action.base_product_number,
            checked: action.checked,
          }
        ]
      })());

    default:
      return state;
  }
}

export default supplierReducer;
