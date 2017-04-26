/*
 *
 * Supplier reducer
 *
 */

import {fromJS} from 'immutable';
import {
  DEFAULT_ACTION, KPI_CONSTANT,TABLE_CONSTANT,TOP_BOTTOM_CONSTANT,KPI_DATA_FETCH_SUCCESS, SUPPLIER_TABLE_DATA_FETCH_SUCCESS, SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS
} from './constants';

const initialState = fromJS({
  reducer1:{'sales':'---'},
  reducer1:{'sales_lfl':'---'},
  reducer1:{'sales_var_week':'---'},
  reducer1:{'sales_var_year':'---'},
  reducer1:{'sales_var_year_lfl':'---'},
  reducer1:{'sales_growth_wow_1':'---'},
  reducer1:{'sales_growth_wow_2':'---'},
  reducer1:{'sales_growth_yoy_1':'---'},
  reducer1:{'sales_growth_yoy_2':'---'},
  reducer1:{'sales_growth_yoy_lfl_1':'---'},
  reducer1:{'sales_growth_yoy_lfl_2':'---'}

});

function supplierReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      console.log("printing state",state)
      return state;

    case KPI_CONSTANT:
      console.log("reducer.js", action.data);
      return state.set('reducer', action.data);

    case TABLE_CONSTANT:
      console.log("reducer.js", action.data);
      return state.set('table_var', action.data);
    case TOP_BOTTOM_CONSTANT:
      console.log("reducer.js", action.data);
      return state.set('topBotVar', action.data);

    case KPI_DATA_FETCH_SUCCESS:
      console.log("reducer.js KPI data", action.data);
      return state.set('reducer1', action.data);

    case SUPPLIER_TABLE_DATA_FETCH_SUCCESS:
      console.log("reducer SUPPLIER_TABLE_DATA_FETCH_SUCCESS", action.data);
      return state.set('tableData', action.data);

    case SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS:
      console.log("reducer SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS", action.data);
      return state.set('topBotData', action.data);

    default:
      return state;
  }
}

export default supplierReducer;
