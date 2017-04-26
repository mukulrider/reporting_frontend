/*
 *
 * Supplier actions
 *
 */

import {
  DEFAULT_ACTION, KPI_CONSTANT,TABLE_CONSTANT,TOP_BOTTOM_CONSTANT, KPI_DATA_FETCH_SUCCESS, SUPPLIER_TABLE_DATA_FETCH_SUCCESS, SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS
} from './constants';


export function defaultAction() {
  console.log("default action")
  return {
    type: DEFAULT_ACTION,
  };
}

export function kpibox() {
  console.log("action.js");
  return {
    type: KPI_CONSTANT,

  };
}


export function kpiboxDataFetchSucess(data) {
  console.log('data in action for ajax table', data);
  return {
    type: KPI_DATA_FETCH_SUCCESS,
    data,
  };
}

export function supplierTable() {
  console.log("action.js supplierTable");
  return {
    type: TABLE_CONSTANT,

  };
}



export function SupplierTableDataFetchSuccess(data) {
  console.log('SUPPLIER_TABLE_DATA_FETCH_SUCCESS - actions', data);
  return {
    type: SUPPLIER_TABLE_DATA_FETCH_SUCCESS,
    data,
  };
}

export function topBottomChart() {
  console.log("action.js topBottomChart");
  return {
    type: TOP_BOTTOM_CONSTANT,

  };
}



export function topBottomChartFetchSuccess(data) {
  console.log('SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS - actions', data);
  return {
    type: SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS,
    data,
  };
}


export function saveWeekParam(data) {
  // console.log('Saving url params in action',data);
  return {
    type: SAVE_WEEK_PARAM ,
    data
  };
}
