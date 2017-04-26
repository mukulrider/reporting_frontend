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
  PROMO_INFO_CONSTANT,
  PROMO_INFO_FETCH_SUCCESS,
  FILTER_CONSTANT,
  FILTER_FETCH_SUCCESS,
  CHECKBOX_CHANGE
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
//For KPI BOXES
export function PromoKpiData()
{
  console.log('actions.js KPI_CONSTANT CONSTANT');
  return {
    type: KPI_CONSTANT,
  };
}

export function PromoKpiDataFetchSuccess(data)
{
  console.log('PromoKpiDataFetchSuccess actions',data)
  return {
    type: KPI_FETCH_SUCCESS,
    data,
  };
}

// FOR FETCHING SALES DATA

export function PromoSalesData()
{
  console.log('actions.js SALES_CONSTANT CONSTANT');
  return {
    type: SALES_CONSTANT,
  };
}

export function PromoSalesDataFetchSuccess(data)
{
  console.log('PromoSalesDataFetchSuccess(data) actions',data)
  return {
    type: SALES_FETCH_SUCCESS,
    data,
  };
}

// FOR FETCHING PROMO INFO

export function PromoInfoData()
{
  console.log('actions.js PromoInfoData PROMO_INFO_CONSTANT');
  return {
    type: PROMO_INFO_CONSTANT,
  };
}

export function PromoInfoDataFetchSuccess(data)
{
  console.log('PromoInfoDataFetchSuccess(data) PROMO_INFO_FETCH_SUCCESS actions',data)
  return {
    type: PROMO_INFO_FETCH_SUCCESS,
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
