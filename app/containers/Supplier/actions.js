/*
 *
 * Supplier actions
 *
 */

import {
  DEFAULT_ACTION, KPI_CONSTANT,TABLE_CONSTANT,TOP_BOTTOM_CONSTANT, KPI_DATA_FETCH_SUCCESS, SUPPLIER_TABLE_DATA_FETCH_SUCCESS, SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS, WEEK_PARAM, KPI_PARAM, KPI_DATA_ASP_FETCH_SUCCESS, KPI_ASP_CONSTANT, TOP_BOTTOM_KPI, GENERATE_URL_PARAMS_STRING, FILTERS_DATA_SUCCESS
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

export function kpibox_asp() {
  console.log("action.js");
  return {
    type: KPI_ASP_CONSTANT,

  };
}


export function kpiboxDataFetchSucess(data) {
  console.log('data in action for ajax table', data);
  return {
    type: KPI_DATA_FETCH_SUCCESS,
    data,
  };
}

export function kpiboxDataFetchSucessAsp(data) {
  console.log('data in action for ajax table ASP', data);
  return {
    type: KPI_DATA_ASP_FETCH_SUCCESS,
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



// For saving the week param (triggered by time period buttons)

export function SaveWeekParam(data)
{
  console.log('SaveWeekParam = actions', data);
  return {
    type: WEEK_PARAM,
    data,
  };
}

// For saving the KPI param (triggered by KPI buttons)

export function SaveKPIParam(data) {
  console.log('SaveKPIParam = actions', data);
  return {
    type: KPI_PARAM,
    data,
  };
}

export function SaveTopBottomParam(data) {
  console.log('SaveTopBottomParam = actions', data);
  return {
    type: TOP_BOTTOM_KPI,
    data,
  };
}

// FOR GETTING FILTERS DATA (FOR DOING AJAX CALL)

export function GenerateUrlParamsString(data) {
  console.log('filters');
  return {
    type: GENERATE_URL_PARAMS_STRING,
    data,
  };
}

// FOR SAVING FILTERS DATA GOT FROM AJAX CALL IN REDUCER/STATE

export function generateSideFilterSuccess(data) {
  console.log('filters = actions', data);
  return {
    type: FILTERS_DATA_SUCCESS,
    data,
  };
}

