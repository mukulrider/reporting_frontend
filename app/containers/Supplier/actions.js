/*
 *
 * Supplier actions
 *
 */

import {
  DEFAULT_ACTION,
  KPI_CONSTANT,
  TOP_BOTTOM_CONSTANT,
  BRAND_PARAM,
  KPI_DATA_FETCH_SUCCESS,
  SUPPLIER_TABLE_DATA_FETCH_SUCCESS,
  SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS,
  WEEK_PARAM,
  KPI_PARAM,
  KPI_DATA_ASP_FETCH_SUCCESS,
  KPI_ASP_CONSTANT,
  TOP_BOTTOM_KPI,
  GENERATE_URL_PARAMS_STRING,
  GENERATE_URL_PARAMS_STRING2,
  GENERATE_URL_PARAMS_STRING3,
  GENERATE_URL_PARAMS_STRING_PARENT,
  GENERATE_URL_PARAMS_STRING_SUPPLIER,
  GENERATE_URL_PARAMS_STRING_FOR_FILTERS,
  GENERATE_SIDE_FILTER,
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
  STORE_FILTER_PARAM,
  DEFAULT_GREY_SCREEN,
} from './constants';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function kpibox() {
  return {
    type: KPI_CONSTANT,

  };
}

export function kpibox_asp() {
  return {
    type: KPI_ASP_CONSTANT,

  };
}


export function kpiboxDataFetchSucess(data) {
  return {
    type: KPI_DATA_FETCH_SUCCESS,
    data,
  };
}

export function kpiboxAspDataFetchSucess(data) {
  return {
    type: KPI_DATA_ASP_FETCH_SUCCESS,
    data,
  };
}

export function generateTableSuccess(data) {
  return {
    type: GENERATE_TABLE_SUCCESS,
    data
  }
}

export function fetchGraphSuccess(data) {
  return {
    type: GRAPH_FETCH_SUCCESS,
    data
  }
}

export function fetchGraph() {
  return {
    type: GRAPH_FETCH
  }
}

export function generateTable() {
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
  return {
    type: SAVE_BUBBLE_PARAM,
    data
  };
}

export function SaveBubbleParam2(data) {
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
  return {
    type: SAVE_PAGE_PARAM,
    data
  };
}

export function generateTextBoxQueryString(data) {
  return {
    type: GENERATE_TEXTBOX_QUERY_STRING,
    data
  }
}


export function SupplierTableDataFetchSuccess(data) {
  return {
    type: SUPPLIER_TABLE_DATA_FETCH_SUCCESS,
    data,
  };
}

export function topBottomChart() {
  return {
    type: TOP_BOTTOM_CONSTANT,

  };
}

//SAVING BRAND FILTER PARAMS
export function onSaveBrandFilterParam(data) {
  return {
    type: BRAND_PARAM,
    data

  };
}


export function topBottomChartFetchSuccess(data) {
  return {
    type: SUPPLIER_TOP_BOTTOM_FETCH_SUCCESS,
    data,
  };
}

export function SaveStoreParam(data) {
  return {
    type: SAVE_STORE_PARAM,
    data
  };
}


// For saving the week param (triggered by time period buttons)

export function SaveWeekParam(data) {
  return {
    type: WEEK_PARAM,
    data,
  };
}

// For saving the KPI param (triggered by KPI buttons)
export function SaveKPIParam(data) {
  return {
    type: KPI_PARAM,
    data,
  };
}

export function SaveTopBottomParam(data) {
  return {
    type: TOP_BOTTOM_KPI,
    data,
  };
}

// FOR GETTING FILTERS DATA (FOR STORING FILTER DATA)
export function GenerateUrlParamsString(data) {
  return {
    type: GENERATE_URL_PARAMS_STRING,
    data,
  };
}

// FOR GETTING FILTERS DATA (FOR DOING AJAX CALL) - NEW
export function onGenerateSideFilter() {
  return {
    type: GENERATE_SIDE_FILTER
  };
}

// FOR GETTING FILTERS DATA (FOR DOING AJAX CALL) - DOING NEW AJAX CALLS
export function onGenerateUrlParamsStringForFilters(data) {
  console.log('filters1', data);
  return {
    type: GENERATE_URL_PARAMS_STRING_FOR_FILTERS,
    data,
  };
}

// FOR GETTING FILTERS DATA (FOR DOING AJAX CALL) ON DEFAULT PAGE LOAD
export function GenerateUrlParamsString2(data) {
  return {
    type: GENERATE_URL_PARAMS_STRING2,
    data,
  };
}

//FLAG FOR KNOWING DEFAULT PAGE LOAD
export function GenerateUrlParamsString3(data) {
  return {
    type: GENERATE_URL_PARAMS_STRING3,
    data,
  };
}
//FOR SENDING FILTER DATA - PARENT SUPPLIER
export function onGenerateUrlParamsStringParent(data) {
  return {
    type: GENERATE_URL_PARAMS_STRING_PARENT,
    data,
  };
}

//FOR SENDING FILTER DATA - SUPPLIER
export function onGenerateUrlParamsStringSupplier(data) {
  return {
    type: GENERATE_URL_PARAMS_STRING_SUPPLIER,
    data,
  };
}

// FOR SAVING FILTERS DATA GOT FROM AJAX CALL IN REDUCER/STATE
export function generateSideFilterSuccess(data) {
  return {
    type: FILTERS_DATA_SUCCESS,
    data,
  };
}


//FOR WEEK FILTER DATA
export function WeekFilterFetchSuccess(data) {
  return {
    type: WEEK_FILTER_FETCH_SUCCESS,
    data,
  };
}

export function getWeekFilter() {
  return {
    type: WEEK_FILTER_CONSTANT,
  };
}


export function checkboxWeekChange(data) {
  return {
    type: CHECKBOX_WEEK_CHANGE,
    data
  };
}


export function SaveWeek(data) {
  return {
    type: WEEK,
    data,
  };
}

//generate checked list
export function generateCheckedList(checked, base_product_number) {
  return {
    type: GENERATE_CHECKED_LIST,
    checked, base_product_number
  }
}

//SPINNER FOR SUPPLIER VIEW KPI
export function supplierViewKpiSpinnerCheckSuccess(supplierViewKpiSpinnerCheck) {
  return {
    type: SUPPLIER_VIEW_KPI_SPINNER,
    supplierViewKpiSpinnerCheck
  }
}

//SPINNER FOR BUBBLE CHART
export function bubbleChartSpinnerCheckSuccess(bubbleChartSpinnerCheck) {
  return {
    type: BUBBLE_CHART_SPINNER,
    bubbleChartSpinnerCheck
  }
}

//SPINNER FOR BUBBLE CHART

export function barChartSpinnerCheckSuccess(barChartSpinnerCheck) {
  return {
    type: BAR_CHART_SPINNER,
    barChartSpinnerCheck
  }
}

//SPINNER FOR TABLE

export function tableChartSpinnerCheckSuccess(tableChartSpinnerCheck) {
  return {
    type: TABLE_SPINNER,
    tableChartSpinnerCheck
  }
}

export function StoreFilterParam(data) {
  return {
    type: STORE_FILTER_PARAM,
    data,
  };
}


export function defaultGreyScreen(data) {
  return {
    type: DEFAULT_GREY_SCREEN,
    data,
  };
}
