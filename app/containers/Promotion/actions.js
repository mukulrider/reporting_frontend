/*
 *
 * Promotion actions
 *
 */

import {
  DEFAULT_ACTION,
  KPI_CONSTANT,
  KPI_FETCH_SUCCESS,
  WEEK_PARAM,
  KPI_PARAM,
  SALES_CONSTANT,
  SALES_FETCH_SUCCESS,
  PROMO_GIVEAWAY_CONSTANT,
  PROMO_GIVEAWAY_FETCH_SUCCESS,
  PROMO_PROD_CONSTANT,
  PROMO_PROD_FETCH_SUCCESS,
  PROMO_PART_CONSTANT,
  PROMO_PART_FETCH_SUCCESS,
  FILTER_CONSTANT,
  FILTER_FETCH_SUCCESS,
  GENERATE_URL_PARAMS,
  GENERATE_URL_PARAMS_STRING,
  GENERATE_FILTER_PARAMS_STRING,
  CHECKBOX_CHANGE, GENERATE_URL_PARAMS_DATA,
  SALES_PARAM,
  GIVEAWAY_PARAM,
  PROMO_PROD_PARAM,
  PROMO_PART_PARAM,
  WEEK_FILTER_CONSTANT,
  WEEK_FILTER_FETCH_SUCCESS,
  WEEK_FILTER_PARAM,
  PIE_CHART_SPINNER_SUCCESS,
  PROMO_GIVE_AWAY_SPINNER_SUCCESS,
  PRODUCTS_COUNT_SPILT_SPINNER_SUCCESS,
  PROMO_PARTICIPATION_SPILT_SPINNER_SUCCESS,
  PRODUCTS_TABLE_SPINNER_SUCCESS,
  KPI_SPINNER_SUCCESS,
  SAVE_TREND_CHART_TAB_PARAMS,
  SAVE_METRIC_SELECTION_TAB,
  TREND_CHART_SPINNER,

  PIE_CHART_FOR_EACH_TAB, PIE_CHART_FOR_EACH_TAB_SUCCESS, TREND_FOR_EACH_TAB, TREND_FOR_EACH_TAB_SUCCESS,
  PRODUCTS_ON_PROMOTION_TABLE, PRODUCTS_ON_PROMOTION_TABLE_SUCCESS, STORE_FILTER_PARAM, MODAL_PRODUCT_NAME,
  MODAL_PRODUCT_DATA_SUCCESS, MODAL_PRODUCT_DATA, MODAL_SAVE_TREND_CHART_TAB_PARAMS, DEFAULT_GREY_SCREEN

} from './constants';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
//For KPI BOXES
export function PromoKpiData() {
  console.log('actions.js KPI_CONSTANT CONSTANT');
  return {
    type: KPI_CONSTANT,
  };
}

export function PromoKpiDataFetchSuccess(data) {
  console.log('PromoKpiDataFetchSuccess actions', data)
  return {
    type: KPI_FETCH_SUCCESS,
    data,
  };
}

// FOR FETCHING SALES DATA

export function PromoSalesData() {
  console.log('actions.js SALES_CONSTANT CONSTANT');
  return {
    type: SALES_CONSTANT,
  };
}

export function PromoSalesDataFetchSuccess(data) {
  console.log('PromoSalesDataFetchSuccess(data) actions', data)
  return {
    type: SALES_FETCH_SUCCESS,
    data,
  };
}

// FOR FETCHING PROMO GIVEAWAY

export function PromoGiveawayData() {
  console.log('actions.js PromoGiveawayData PROMO_GIVEAWAY_CONSTANT');
  return {
    type: PROMO_GIVEAWAY_CONSTANT,
  };
}

export function PromoGiveawayDataFetchSuccess(data) {
  console.log('PromoGiveawayDataFetchSuccess(data) PROMO_GIVEAWAY_FETCH_SUCCESS actions', data)
  return {
    type: PROMO_GIVEAWAY_FETCH_SUCCESS,
    data,
  };
}

// FOR FETCHING PROMO PROD

export function PromoProdData() {
  // console.log('actions.js PromoProdData PROMO_PROD_CONSTANT');
  return {
    type: PROMO_PROD_CONSTANT,
  };
}

export function PromoProdDataFetchSuccess(data) {
  // console.log('PromoProdDataFetchSuccess(data) PROMO_PROD_FETCH_SUCCESS actions', data)
  return {
    type: PROMO_PROD_FETCH_SUCCESS,
    data,
  };
}


// FOR FETCHING PROMO PART

export function PromoPartData() {
  // console.log('actions.js PromoPartData PROMO_PART_CONSTANT');
  return {
    type: PROMO_PART_CONSTANT,
  };
}

export function PromoPartDataFetchSuccess(data) {
  // console.log('PromoPartDataFetchSuccess(data) PROMO_PART_FETCH_SUCCESS actions', data)
  return {
    type: PROMO_PART_FETCH_SUCCESS,
    data,
  };
}


//FOR SAVING WEEK PARAM (triggered by Week Buttons)

export function SaveWeekParam(data) {
  // console.log('SaveWeekParam = actions', data);
  return {
    type: WEEK_PARAM,
    data,
  };
}

// For saving the KPI param (triggered by KPI buttons)

export function SaveKPIParam(data) {
  // console.log('SaveKPIParam = actions', data);
  return {
    type: KPI_PARAM,
    data,
  };
}


export function SaveSalesParam(data) {
  // console.log('SaveSalesParam = actions', data);
  return {
    type: SALES_PARAM,
    data,
  };
}

export function SaveGiveawayParam(data) {
  // console.log('SaveGiveawayParam = actions', data);
  return {
    type: GIVEAWAY_PARAM,
    data,
  };
}

export function SavePromoProdParam(data) {
  // console.log('SavePromoProdParam = actions', data);
  return {
    type: PROMO_PROD_PARAM,
    data,
  };
}

export function SavePromoPartParam(data) {
  // console.log('SavePromoPartParam = actions', data);
  return {
    type: PROMO_PART_PARAM,
    data,
  };
}
//--------------------- FILTER DATA -------------------------------


export function getFilter() {
  // console.log('actions.js Get Filter', FILTER_CONSTANT);
  return {
    type: FILTER_CONSTANT,
  };
}


export function FilterFetchSuccess(data) {
  // console.log('PromoFilterFetchSuccess = actions', data);
  return {
    type: FILTER_FETCH_SUCCESS,
    data,
  };
}


export function generateUrlParamsString(data) {
  // console.log('PromoFilterFetchSuccess = actions', data);
  return {
    type: GENERATE_FILTER_PARAMS_STRING,
    data,
  };
}
//Week Filter


export function getWeekFilter() {
  // console.log('actions.js getWeekFilter', WEEK_FILTER_CONSTANT);
  return {
    type: WEEK_FILTER_CONSTANT,
  };
}

export function WeekFilterFetchSuccess(data) {
  // console.log('WeekFilterFetchSuccess = actions', data);
  return {
    type: WEEK_FILTER_FETCH_SUCCESS,
    data,
  };
}
export function WeekFilterParam(data) {
  // console.log('WeekFilterParam = actions', data);
  return {
    type: WEEK_FILTER_PARAM,
    data,
  };
}


//PIE CHART SPINNER
export function pieChartSuccess(spinnerCheck) {
  // console.log('pieChartSuccess', spinnerCheck);
  return {
    type: PIE_CHART_SPINNER_SUCCESS,
    spinnerCheck
  }
}

//MULTI LINE PROMO CHART SPINNER
export function promoGiveAwaySuccess(spinnerCheck) {
  // console.log('promoGiveAwaySuccess', spinnerCheck);
  return {
    type: PROMO_GIVE_AWAY_SPINNER_SUCCESS,
    spinnerCheck
  }
}


export function StoreFilterParam(data)
{
  console.log('StoreFilterParam = actions', data);
  return {
    type: STORE_FILTER_PARAM,
    data,
  };
}



//productsCountSplitSuccess SPINNER
export function productsCountSplitSuccess(spinnerCheck) {
  // console.log('productsCountSplitSuccess', spinnerCheck);
  return {
    type: PRODUCTS_COUNT_SPILT_SPINNER_SUCCESS,
    spinnerCheck
  }
}

//promoParticipationBySplitSuccess SPINNER
export function promoParticipationBySplitSuccess(spinnerCheck) {
  console.log('promoParticipationBySplitSuccess', spinnerCheck);
  return {
    type: PROMO_PARTICIPATION_SPILT_SPINNER_SUCCESS,
    spinnerCheck
  }
}

//promoParticipationBySplitSuccess SPINNER
export function productsTableSplitSuccess(spinnerCheck) {
  console.log('productsTableSplitSuccess', spinnerCheck);
  return {
    type: PRODUCTS_TABLE_SPINNER_SUCCESS,
    spinnerCheck
  }
}

//kpiDataSuccess SPINNER
export function kpiDataSuccess(spinnerCheck) {
  console.log('kpiDataSuccess', spinnerCheck);
  return {
    type: KPI_SPINNER_SUCCESS,
    spinnerCheck
  }
}




//================================================================================

//------------------------------  PIE CHART ---------------------------------------

export function pieChartDataFetch() {
  return {
    type: PIE_CHART_FOR_EACH_TAB
  }
}

//
export function pieChartDataFetchSuccess(data) {
  return {
    type: PIE_CHART_FOR_EACH_TAB_SUCCESS,
    data
  }
}

//------------------------------  TREND CHART ---------------------------------------

export function trendChartDataFetch() {
  return {
    type: TREND_FOR_EACH_TAB
  }
}

//
export function trendChartDataFetchSuccess(data) {
  return {
    type: TREND_FOR_EACH_TAB_SUCCESS,
    data
  }
}


//------------------------------  TREND CHART ---------------------------------------

export function productsOnPromoTableFetch() {
  return {
    type: PRODUCTS_ON_PROMOTION_TABLE
  }
}

//
export function productsOnPromoTableSuccess(data) {
  return {
    type: PRODUCTS_ON_PROMOTION_TABLE_SUCCESS,
    data
  }
}

//-------------------------Trend chart Tabs ----------------------
export function saveTrendChartTabParam(data) {
  return {
    type: SAVE_TREND_CHART_TAB_PARAMS,
    data
  }
}


//-------------------------Trend chart Tabs ----------------------
export function modalSaveTrendChartTabParam(data) {
  return {
    type: MODAL_SAVE_TREND_CHART_TAB_PARAMS,
    data
  }
}


//-------------------------Trend chart Tabs ----------------------
export function saveMetricSelectionTabParam(data) {
  return {
    type: SAVE_METRIC_SELECTION_TAB,
    data
  }
}
//-------------------------Trend chart SPINNER ----------------------
export function trendChartSpinner(spinnerCheck) {
  return {
    type: TREND_CHART_SPINNER,
    spinnerCheck
  }
}

//-------------------------Trend chart SPINNER ----------------------
export function modalProductName(data) {
  return {
    type: MODAL_PRODUCT_NAME,
    data
  }
}

//-------------------------Trend chart SPINNER ----------------------
export function modalProductInfo(data) {
  return {
    type: MODAL_PRODUCT_DATA,
    data
  }
}

//-------------------------Trend chart SPINNER ----------------------
export function modalProductInfoSuccess(data) {
  return {
    type: MODAL_PRODUCT_DATA_SUCCESS,
    data
  }
}

//-------------------------DEFAULT SCREEN WHEN FILTERS ARE CLEARED----------------------
export function defaultGreyScreen(data)
{
  console.log('defaultGreyScreen', data);
  return {
    type: DEFAULT_GREY_SCREEN,
    data,
  };
}
