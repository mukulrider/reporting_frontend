/*
 *
 * Supplier actions
 *
 */

import {
  DEFAULT_ACTION,
  KPI_CONSTANT,
  TOP_BOTTOM_CONSTANT,
  KPI_DATA_FETCH_SUCCESS,
  SUPPLIER_TABLE_DATA_FETCH_SUCCESS,
  SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS,
  WEEK_PARAM,
  KPI_PARAM,
  KPI_DATA_ASP_FETCH_SUCCESS,
  KPI_ASP_CONSTANT,
  TOP_BOTTOM_KPI,
  GENERATE_URL_PARAMS_STRING,
  FILTERS_DATA_SUCCESS,
  WEEK_FILTER_FETCH_SUCCESS,
  WEEK_FILTER_CONSTANT,
  CHECKBOX_WEEK_CHANGE,
  WEEK,
  GENERATE_TABLE,
  GENERATE_TABLE_SUCCESS,
  GRAPH_FETCH,
  GRAPH_FETCH_SUCCESS,
  SAVE_PERF_PARAM,
  SAVE_BUBBLE_PARAM2,
  SAVE_BUBBLE_PARAM,
  SAVE_PAGE_PARAM,
  RADIO_CHECK_PARAM,
  GENERATE_TEXTBOX_QUERY_STRING,
  SAVE_STORE_PARAM,
  SUPPLIER_VIEW_KPI_SPINNER,
  BUBBLE_CHART_SPINNER,
  BAR_CHART_SPINNER,
  TABLE_SPINNER,
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

export function kpiboxAspDataFetchSucess(data) {
  console.log('data in action for ajax table ASP', data);
  return {
    type: KPI_DATA_ASP_FETCH_SUCCESS,
    data,
  };
}

export function generateTableSuccess(data) {
console.log('ssss', data);
  return {
    type: GENERATE_TABLE_SUCCESS,
    data
  }
}

export function fetchGraphSuccess(data) {
// console.log(data);
  return {
    type: GRAPH_FETCH_SUCCESS,
    data
  }
}

export function fetchGraph() {
console.log('actions fetchGraph');

  return {
    type: GRAPH_FETCH
  }
}

export function generateTable() {
  console.log('gt');
  return {
    type: GENERATE_TABLE
  }
}

export function SavePFilterParam(data) {
  return {
    type: SAVE_PERF_PARAM,
    data
  };
}

export function SaveBubbleParam(data) {
  console.log("bubble data in action", data);
  return {
    type: SAVE_BUBBLE_PARAM,
    data
  };
}

export function SaveBubbleParam2(data) {
  console.log("bubble array for opacity-tab", data);
  return {
    type: SAVE_BUBBLE_PARAM2,
    data
  };
}

export function RadioChecked(data) {
  return {
    type: RADIO_CHECK_PARAM,
    data
  };
}
export function SavePageParam(data) {
// console.log("bubble data in action",data);
  return {
    type: SAVE_PAGE_PARAM,
    data
  };
}

export function generateTextBoxQueryString(data) {
console.log("Search in action for "+data);
  return {
    type: GENERATE_TEXTBOX_QUERY_STRING,
    data
  }
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

export function SaveStoreParam(data) {

  return {
    type: SAVE_STORE_PARAM ,
    data
  };
}


// For saving the week param (triggered by time period buttons)

export function SaveWeekParam(data) {
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


//FOR WEEK FILTER DATA

export function WeekFilterFetchSuccess(data) {
  console.log('WeekFilterFetchSuccess = actions', data);
  return {
    type: WEEK_FILTER_FETCH_SUCCESS,
    data,
  };
}

export function getWeekFilter() {
  console.log('actions.js getWeekFilter', WEEK_FILTER_CONSTANT);
  return {
    type: WEEK_FILTER_CONSTANT,
  };
}


export function checkboxWeekChange(data) {
  console.log("checkboxWeekChange Selection in actions" + data);
  return {
    type: CHECKBOX_WEEK_CHANGE,
    data
  };
}


export function SaveWeek(data) {
  console.log('SaveWeek = actions', +data);
  return {
    type: WEEK,
    data,
  };
}

//generate checked list
export function generateCheckedList(checked ,base_product_number) {
  console.log('checked', checked);
  console.log('base_product_number', base_product_number);
  return {
    type: GENERATE_CHECKED_LIST,
    checked ,base_product_number
  }
}

//SPINNER FOR SUPPLIER VIEW KPI

export function supplierViewKpiSpinnerCheckSuccess(supplierViewKpiSpinnerCheck) {
  console.log('supplierViewKpiSpinnerCheck', supplierViewKpiSpinnerCheck);
  return {
    type: SUPPLIER_VIEW_KPI_SPINNER,
    supplierViewKpiSpinnerCheck
  }
}

//SPINNER FOR BUBBLE CHART

export function bubbleChartSpinnerCheckSuccess(bubbleChartSpinnerCheck) {
  console.log('bubbleChartSpinnerCheckSuccess', bubbleChartSpinnerCheck);
  return {
    type: BUBBLE_CHART_SPINNER,
    bubbleChartSpinnerCheck
  }
}

//SPINNER FOR BUBBLE CHART

export function barChartSpinnerCheckSuccess(barChartSpinnerCheck) {
  console.log('barChartSpinnerCheckSuccess', barChartSpinnerCheck);
  return {
    type: BAR_CHART_SPINNER,
    barChartSpinnerCheck
  }
}

//SPINNER FOR TABLE

export function tableChartSpinnerCheckSuccess(tableChartSpinnerCheck) {
  console.log('tableChartSpinnerCheckSuccess', tableChartSpinnerCheck);
  return {
    type: TABLE_SPINNER,
    tableChartSpinnerCheck
  }
}
