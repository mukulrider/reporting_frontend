/*
 *
 * Supplier reducer
 *
 */

import {fromJS} from 'immutable';
import {
  DEFAULT_ACTION,
  KPI_CONSTANT,
  TABLE_CONSTANT,
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
  top_bottom_kpi: ''

});

function supplierReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      console.log("printing state", state)
      return state;

    case KPI_CONSTANT:
      console.log("reducer.js", action.data);
      return state.set('reducer', action.data);
    case KPI_ASP_CONSTANT:
      console.log("reducer.js", action.data);
      return state.set('kpi_asp1', action.data);
    case TABLE_CONSTANT:
      console.log("reducer.js", action.data);
      return state.set('table_var', action.data);
    case TOP_BOTTOM_CONSTANT:
      console.log("reducer.js", action.data);
      return state.set('topBotVar', action.data);

    case KPI_DATA_FETCH_SUCCESS:
      console.log("reducer.js KPI data", action.data);
      return state.set('reducer1', action.data);
    case KPI_DATA_ASP_FETCH_SUCCESS:
      console.log("reducer.js KPI data", action.data);
      return state.set('kpi_asp', action.data);

    case SUPPLIER_TABLE_DATA_FETCH_SUCCESS:
      console.log("reducer SUPPLIER_TABLE_DATA_FETCH_SUCCESS", action.data);
      return state.set('tableData', action.data);

// FOR SAVING FILTERS DATA GOT FROM AJAX CALL IN REDUCER/STATE
    case FILTERS_DATA_SUCCESS:
      console.log("filter data in reducer");
      return state.set('sideFilter', action.data);


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

    //FOR WEEK FILTER DATA
    case WEEK_FILTER_FETCH_SUCCESS:
      console.log("reducer WEEK_FILTER_FETCH_SUCCESS", action.data);
      return state.set('week_filter_data', action.data)


    default:
      return state;
  }
}

export default supplierReducer;
