/*
 *
 * KantarReport reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,WEEK, CATEGORY, RETAILER, SUPPLIER,
  WEEK_FILTER_DATA_SUCCESS_CONSTANT,HIERARCHY_FILTER_DATA_SUCCESS_CONSTANT, KANTAR_DATA_SUCCESS_CONSTANT
} from './constants';

const initialState = fromJS({});

function kantarReportReducer(state = initialState, action) {
  switch (action.type) {

    case WEEK:
      console.log("Reducer Save Week", action.data);
      return state.set('week', action.data)

    case CATEGORY:
      console.log("Reducer Save Category", action.data);
      return state.set('category', action.data)

    case RETAILER:
      console.log("Reducer Save Retailer", action.data);
      return state.set('retailer', action.data)

    case SUPPLIER:
      console.log("Reducer Save Supplier", action.data);
      return state.set('supplier', action.data)

    case WEEK_FILTER_DATA_SUCCESS_CONSTANT:
      console.log("Reducer Fetch week Filter Data Success", action.data);
      return state.set('week_data', action.data)

    case HIERARCHY_FILTER_DATA_SUCCESS_CONSTANT:
      console.log("Reducer Fetch Hierarchy Data Success", action.data);
      return state.set('hierarchy_data', action.data)

    case KANTAR_DATA_SUCCESS_CONSTANT:
      console.log("Reducer Fetch Kantar Data Success", action.data);
      return state.set('data', action.data)

    default:
      return state;
  }
}

export default kantarReportReducer;
