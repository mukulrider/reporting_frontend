/*
 *
 * DelistContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  API_FETCH_SUCCESS,
  DATA_URL_PARAMS,
  WEEK_URL,
  TABLE_DATA_FETCH,
  TABLE_DATA_FETCH_SUCCESS,
  SUBSTITUTE_DATA_URL,
  SUPPLIER_IMPACT_TABLE_DATA_URL,
  GENERATE_SIDE_FILTER,
  GENERATE_URL_PARAMS,
  GENERATE_URL_PARAMS_STRING,
  GENERATE_SIDE_FILTER_SUCCESS,
  GENERATE_TABLE_SUCCESS,
  WATERFALL_VALUE,
  WATERFALL_VALUE_SUCCESS,
  TEST_AJAX_SUCCESS,
  DELIST_POPUP_TABLE_DATA_FETCH_SUCCESS,
  SUPPLIER_POPUP_TABLE_DATA_FETCH_SUCCESS,
  SUBSTITUTE_DATA_URL_SUCCESS
} from './constants';

const initialState = fromJS(
  {
    barChart2Data: [{ letter: 'A', frequency: 100 }, { letter: 'B', frequency: 200 }],
    waterFallChart2Data_1: [{ name: ' Product Revenue ', value: 420000 },
      { name: ' Services Revenue ', value: 210000 },
      { name: ' Employee Revenue ', value: 190000 },
      { name: ' Fixed Costs ', value: -170000 },
      { name: ' Variable Costs ', value: -140000 }],
    waterFallChart2Data_2: [{ name: ' Product Revenue ', value: 420000 },
      { name: ' Services Revenue ', value: 210000 },
      { name: ' Employee Revenue ', value: 190000 },
      { name: ' Fixed Costs ', value: -170000 },
      { name: ' Variable Costs ', value: -140000 }],
    waterFallChart2Data_3: [{ name: ' Product Revenue ', value: 420000 },
      { name: ' Services Revenue ', value: 210000 },
      { name: ' Employee Revenue ', value: 190000 },
      { name: ' Fixed Costs ', value: -170000 },
      { name: ' Variable Costs ', value: -140000 }],
    waterFallChart2Data_4: [{ name: ' Product Revenue ', value: 420000 },
      { name: ' Services Revenue ', value: 210000 },
      { name: ' Employee Revenue ', value: 190000 },
      { name: ' Fixed Costs ', value: -170000 },
      { name: ' Variable Costs ', value: -140000 }],
  });

function delistContainerReducer(state = initialState, action) {
  switch (action.type) {
    case WEEK_URL:
      return state.set('weekNumber', action.data);

    case API_FETCH_SUCCESS:
      return state.set('data', action.data);

    case DATA_URL_PARAMS:
      return state.set('dataUrlparams', action.data);

    case TABLE_DATA_FETCH:
      return state.set('tableDataFetch', action.data);

    case TABLE_DATA_FETCH_SUCCESS:
      return state.set('tableModalData', action.data);

    // DELIST POPUP TABLE
    case DELIST_POPUP_TABLE_DATA_FETCH_SUCCESS:
      return state.set('delisrPopuptableData', action.data);

    case SUBSTITUTE_DATA_URL:
      return state.set('substitutesData', action.data);
    case SUBSTITUTE_DATA_URL_SUCCESS:
      console.log("data from ajax for table popup - 2", action.data)
      return state.set('substitutesTableData', action.data);

   // FOR SUPPLIER POPUP DATA
    case SUPPLIER_IMPACT_TABLE_DATA_URL:
      console.log('state saved', action.data);
      return state.set('supplierPopupTableData', action.data);

    case SUPPLIER_POPUP_TABLE_DATA_FETCH_SUCCESS:
      console.log('checking in reducer for popup ajax data', action.data);
        return state.set('supplierPopuptableDataSuccess', action.data);


    // WATERFALL CHART - VALUE
    case WATERFALL_VALUE_SUCCESS:
      return state.set('waterfallValue', action.data);

    // FILTERS
    case GENERATE_SIDE_FILTER_SUCCESS:
      return state.set('sideFilter', action.data);
    case GENERATE_URL_PARAMS:
      return state.set('urlParams', action.data);
    case GENERATE_URL_PARAMS_STRING:
      return state.set('urlParamsString', action.data);

    // AJAX TEST
    case TEST_AJAX_SUCCESS:
      return state.set('testAjax', action.data);

    default:
      return state;
  }
}

export default delistContainerReducer;
