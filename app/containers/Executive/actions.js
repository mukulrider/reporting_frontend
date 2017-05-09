/*
 *
 * Executive actions
 *
 */

import {
  DEFAULT_ACTION,
  FILTER_CONSTANT,
  FILTER_FETCH_SUCCESS,
  CHECKBOX_CHANGE,
  WEEK_FILTER_CONSTANT,
  WEEK_FILTER_FETCH_SUCCESS,
  WEEK_FILTER_PARAM,
  GENERATE_FILTER_PARAMS_STRING,
  WEEK_PARAM,
  KPI_PARAM,
  OVERVIEW_KPI_CONSTANT,
  OVERVIEW_KPI_FETCH_SUCCESS,
  ROLES_INTENT_CONSTANT,
  ROLES_INTENT_FETCH_SUCCESS,
  BUDGET_FORECAST_CONSTANT,
  BUDGET_FORECAST_FETCH_SUCCESS,
  OVERVIEW_KPI_TREND_CONSTANT,
  OVERVIEW_KPI_TREND_FETCH_SUCCESS,
  OVERVIEW_DRIVERS_INTERNAL_CONSTANT,
  OVERVIEW_DRIVERS_INTERNAL_FETCH_SUCCESS,
  OVERVIEW_DRIVERS_EXTERNAL_CONSTANT,
  OVERVIEW_DRIVERS_EXTERNAL_FETCH_SUCCESS,
  KPI_BOXES_CONSTANT,
  KPI_BOXES_FETCH_SUCCESS,
  BEST_WORST_CONSTANT,
  BEST_WORST_FETCH_SUCCESS,
  BEST_INFO_CONSTANT,
  BEST_INFO_FETCH_SUCCESS,
  WORST_INFO_CONSTANT,
  WORST_INFO_FETCH_SUCCESS,
  SUPPLIER_INFO_CONSTANT,
  SUPPLIER_INFO_FETCH_SUCCESS,
  DRIVERS_INTERNAL_CONSTANT,
  DRIVERS_INTERNAL_FETCH_SUCCESS,
  DRIVERS_EXTERNAL_CONSTANT,
  DRIVERS_EXTERNAL_FETCH_SUCCESS,
  PRICE_KPI_CONSTANT,
  PRICE_KPI_FETCH_SUCCESS,
  DRIVER_PARAM,
  FILTERED_FLAG,
  TOP_SELECTED_NAME,
  BOT_SELECTED_NAME,
  SUPPLIER_NAME,
  TOP_BOT_FLAG,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

//For Overview KPIs
export function OverviewKpiData()
{
  console.log('actions.js OverviewKpiData OVERVIEW_KPI_CONSTANT');
  return {
    type: OVERVIEW_KPI_CONSTANT,
  };
}

export function OverviewKpiDataFetchSuccess(data)
{
  console.log('OverviewKpiDataFetchSuccess OVERVIEW_KPI_FETCH_SUCCESS actions',data)
  return {
    type: OVERVIEW_KPI_FETCH_SUCCESS,
    data,
  };
}

//For Roles and Intent
export function RolesAndIntentData()
{
  console.log('actions.js RolesAndIntentData ROLES_INTENT_CONSTANT');
  return {
    type: ROLES_INTENT_CONSTANT,
  };
}

export function RolesAndIntentDataFetchSuccess(data)
{
  console.log('RolesAndIntentDataFetchSuccess ROLES_INTENT_FETCH_SUCCESS actions',data)
  return {
    type: ROLES_INTENT_FETCH_SUCCESS,
    data,
  };
}

//For Budget and Forecast
export function BudgetAndForecastData()
{
  console.log('actions.js BudgetAndForecastData BUDGET_FORECAST_CONSTANT');
  return {
    type: BUDGET_FORECAST_CONSTANT,
  };
}

export function BudgetAndForecastDataFetchSuccess(data)
{
  console.log('BudgetAndForecastDataFetchSuccess BUDGET_FORECAST_FETCH_SUCCESS actions',data)
  return {
    type: BUDGET_FORECAST_FETCH_SUCCESS,
    data,
  };
}

//For Overview KPI trend
export function OverviewKpiTrendData()
{
  console.log('actions.js OverviewKpiTrendData OVERVIEW_KPI_TREND_CONSTANT');
  return {
    type: OVERVIEW_KPI_TREND_CONSTANT,
  };
}

export function OverviewKpiTrendDataFetchSuccess(data)
{
  console.log('OverviewKpiTrendDataFetchSuccess OVERVIEW_KPI_TREND_FETCH_SUCCESS actions',data)
  return {
    type: OVERVIEW_KPI_TREND_FETCH_SUCCESS,
    data,
  };
}

//For Overview Drivers Internal
export function OverviewDriversInternalData()
{
  console.log('actions.js OverviewDriversInternalData OVERVIEW_DRIVERS_INTERNAL_CONSTANT');
  return {
    type: OVERVIEW_DRIVERS_INTERNAL_CONSTANT,
  };
}

export function OverviewDriversInternalDataFetchSuccess(data)
{
  console.log('OverviewDriversInternalDataFetchSuccess OVERVIEW_DRIVERS_INTERNAL_FETCH_SUCCESS actions',data)
  return {
    type: OVERVIEW_DRIVERS_INTERNAL_FETCH_SUCCESS,
    data,
  };
}

//For Overview Drivers External
export function OverviewDriversExternalData()
{
  console.log('actions.js OverviewDriversExternalData OVERVIEW_DRIVERS_EXTERNAL_CONSTANT');
  return {
    type: OVERVIEW_DRIVERS_EXTERNAL_CONSTANT,
  };
}

export function OverviewDriversExternalDataFetchSuccess(data)
{
  console.log('OverviewDriversExternalDataFetchSuccess OVERVIEW_DRIVERS_EXTERNAL_FETCH_SUCCESS_FETCH_SUCCESS actions',data)
  return {
    type: OVERVIEW_DRIVERS_EXTERNAL_FETCH_SUCCESS,
    data,
  };
}



//For KPI boxes
export function KpiBoxesData()
{
  console.log('actions.js OverviewDriversExternalData OVERVIEW_DRIVERS_EXTERNAL_CONSTANT');
  return {
    type: KPI_BOXES_CONSTANT,
  };
}

export function KpiBoxesDataFetchSuccess(data)
{
  console.log('OverviewDriversExternalDataFetchSuccess OVERVIEW_DRIVERS_EXTERNAL_FETCH_SUCCESS_FETCH_SUCCESS actions',data)
  return {
    type: KPI_BOXES_FETCH_SUCCESS,
    data,
  };
}

//For Best Worst
export function BestWorstData()
{
  console.log('actions.js BestWorstData BEST_WORST_CONSTANT');
  return {
    type: BEST_WORST_CONSTANT,
  };
}

export function BestWorstDataFetchSuccess(data)
{
  console.log('BestWorstDataFetchSuccess BEST_WORST_FETCH_SUCCESS actions',data)
  return {
    type: BEST_WORST_FETCH_SUCCESS,
    data,
  };
}

//For Best Info
export function BestInfoData()
{
  console.log('actions.js BestInfoData BEST_INFO_CONSTANT');
  return {
    type: BEST_INFO_CONSTANT,
  };
}

export function BestInfoDataFetchSuccess(data)
{
  console.log('BestInfoDataFetchSuccess BEST_INFO_FETCH_SUCCESS actions',data)
  return {
    type: BEST_INFO_FETCH_SUCCESS,
    data,
  };
}

//For Worst Info

export function WorstInfoData()
{
  console.log('actions.js WorstInfoData WORST_INFO_CONSTANT');
  return {
    type: WORST_INFO_CONSTANT,
  };
}

export function WorstInfoDataFetchSuccess(data)
{
  console.log('WorstInfoDataFetchSuccess WORST_INFO_FETCH_SUCCESS actions',data)
  return {
    type: WORST_INFO_FETCH_SUCCESS,
    data,
  };
}

//For Supplier

export function SupplierInfoData()
{
  console.log('actions.js SupplierInfoData SUPPLIER_INFO_CONSTANT');
  return {
    type: SUPPLIER_INFO_CONSTANT,
  };
}

export function SupplierInfoDataFetchSuccess(data)
{
  console.log('SupplierInfoDataFetchSuccess SUPPLIER_INFO_FETCH_SUCCESS actions',data)
  return {
    type: SUPPLIER_INFO_FETCH_SUCCESS,
    data,
  };
}

//For Drivers Internal

export function DriversInternalData()
{
  console.log('actions.js DriversInternalData SUPPLIER_INFO_CONSTANT');
  return {
    type: DRIVERS_INTERNAL_CONSTANT,
  };
}

export function DriversInternalDataFetchSuccess(data)
{
  console.log('DriversInternalDataFetchSuccess SUPPLIER_INFO_FETCH_SUCCESS actions',data)
  return {
    type: DRIVERS_INTERNAL_FETCH_SUCCESS,
    data,
  };
}

//For Drivers External

export function DriversExternalData()
{
  console.log('actions.js DriversExternalData DRIVERS_EXTERNAL_CONSTANT');
  return {
    type: DRIVERS_EXTERNAL_CONSTANT,
  };
}

export function DriversExternalDataFetchSuccess(data)
{
  console.log('DriversExternalDataFetchSuccess DRIVERS_EXTERNAL_FETCH_SUCCESS actions',data)
  return {
    type: DRIVERS_EXTERNAL_FETCH_SUCCESS,
    data,
  };
}

//For Price KPI

export function PriceKPIData()
{
  console.log('actions.js PriceKPIData DRIVERS_EXTERNAL_CONSTANT');
  return {
    type: PRICE_KPI_CONSTANT,
  };
}

export function PriceKPIDataFetchSuccess(data)
{
  console.log('PriceKPIDataFetchSuccess DRIVERS_EXTERNAL_FETCH_SUCCESS actions',data)
  return {
    type: PRICE_KPI_FETCH_SUCCESS,
    data,
  };
}



//FOR SAVING WEEK PARAM (triggered by Week Buttons)

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



//For Saving Internal / External Driver Option (triggered by Internal/External buttons)

export function SaveDriverParam(data) {
  console.log('SaveDriverParam = actions', data);
  return {
    type: DRIVER_PARAM,
    data,
  };
}



//--------------------- FILTER DATA -------------------------------


export function getFilter()
{
  console.log('actions.js Get Filter',FILTER_CONSTANT);
  return {
    type: FILTER_CONSTANT,
  };
}


export function FilterFetchSuccess(data)
{
  console.log('PromoFilterFetchSuccess = actions', data);
  return {
    type: FILTER_FETCH_SUCCESS,
    data,
  };
}


export function generateUrlParamsString(data)
{
  console.log('PromoFilterFetchSuccess = actions', data);
  return {
    type: GENERATE_FILTER_PARAMS_STRING,
    data,
  };
}



//Week Filter


export function getWeekFilter()
{
  console.log('actions.js getWeekFilter',WEEK_FILTER_CONSTANT);
  return {
    type: WEEK_FILTER_CONSTANT,
  };
}

export function WeekFilterFetchSuccess(data)
{
  console.log('WeekFilterFetchSuccess = actions', data);
  return {
    type: WEEK_FILTER_FETCH_SUCCESS,
    data,
  };
}

export function WeekFilterParam(data)
{
  console.log('WeekFilterParam = actions', data);
  return {
    type: WEEK_FILTER_PARAM,
    data,
  };
}




// For the top5/bot5 modals


export function SaveFilteredFlag(data)
{
  console.log('SaveFilteredFlag = actions', data);
  return {
    type: FILTERED_FLAG,
    data,
  };
}

export function SaveTopName(data) {
  console.log('SaveTopName = actions', data);
  return {
    type: TOP_SELECTED_NAME,
    data,
  };
}

export function SaveBotName(data) {
  console.log('SaveBotName = actions', data);
  return {
    type: BOT_SELECTED_NAME,
    data,
  };
}

export function SaveSupplierName(data) {
  console.log('SaveSupplierName = actions', data);
  return {
    type: SUPPLIER_NAME,
    data,
  };
}

export function SaveTopBotFlag(data) {
  console.log('SaveSupplierName = actions', data);
  return {
    type: TOP_BOT_FLAG,
    data,
  };
}
