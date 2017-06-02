// import { take, call, put, select } from 'redux-saga/effects';
import {
  FILTER_CONSTANT,

  WEEK_FILTER_CONSTANT,
  OVERVIEW_KPI_CONSTANT,
  ROLES_INTENT_CONSTANT,
  BUDGET_FORECAST_CONSTANT,
  OVERVIEW_KPI_TREND_CONSTANT,
  OVERVIEW_DRIVERS_INTERNAL_CONSTANT,
  OVERVIEW_DRIVERS_EXTERNAL_CONSTANT,
  KPI_BOXES_CONSTANT,
  BEST_WORST_CONSTANT,
  BEST_INFO_CONSTANT,
  WORST_INFO_CONSTANT,
  SUPPLIER_INFO_CONSTANT,
  TOP_SUPPLIER_INFO_CONSTANT,
  BOT_SUPPLIER_INFO_CONSTANT,
  DRIVERS_INTERNAL_CONSTANT,
  DRIVERS_EXTERNAL_CONSTANT,
  PRICE_KPI_CONSTANT,
  GENERATE_BEST_WORST_PERFORMANCE,
  OVERVIEW_KPI_SPINNER_FLAG,
  PRICE_KPI_SPINNER_FLAG, GENERATE_BEST_WORST_PERFORMANCE_TABLE,
  KPI_SPINNER_FLAG
} from './constants';


import {
  OverviewKpiDataFetchSuccess,
  RolesAndIntentDataFetchSuccess,
  BudgetAndForecastDataFetchSuccess,
  OverviewKpiTrendDataFetchSuccess,
  OverviewDriversInternalDataFetchSuccess,
  OverviewDriversExternalDataFetchSuccess,
  KpiBoxesDataFetchSuccess,
  BestWorstDataFetchSuccess,
  BestInfoDataFetchSuccess,
  WorstInfoDataFetchSuccess,
  SupplierInfoDataFetchSuccess,
  TopSupplierInfoDataFetchSuccess,
  BotSupplierInfoDataFetchSuccess,
  DriversInternalDataFetchSuccess,
  DriversExternalDataFetchSuccess,
  PriceKPIDataFetchSuccess,
  WeekFilterFetchSuccess,
  FilterFetchSuccess,
  spinnerRolesAndIntent,
  spinnerOverviewKPI,
  spinnerOverviewKPITrend,
  spinnerOverviewInternalDrivers,
  spinnerOverviewExternalDrivers,
  spinnerKPI,
  spinnerInternalDrivers,
  spinnerExternalDrivers,
  spinnerPriceKPI,
  generateBestWorstPerformanceSuccess,
  generateBestWorstPerformanceTableSuccess
}
  from 'containers/Executive/actions';


// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';

import {LOCATION_CHANGE} from 'react-router-redux';

import request from 'utils/request';

// Individual exports for testing

import {
  selectExecutiveDomain
} from 'containers/Executive/selectors';

let gettingUserDetails = () => {
  //function to get values from cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  };
  //fetching values from cookie
  const userId = getCookie('token');
  const userName = getCookie('user');
  const designation = getCookie('designation');
  const buyingController = getCookie('buying_controller');
  let buyer = getCookie('buyer');
  let cookieParams = "";

  if ((typeof(buyer) == "undefined") || (buyer == "")) {
    buyer = "";
    cookieParams = `user_id=${userId}&user_name=${userName}&designation=${designation}&buying_controller_header=${buyingController}`;
    console.log('buyer empty', buyer);
  } else {
    cookieParams = `user_id=${userId}&user_name=${userName}&designation=${designation}&buying_controller_header=${buyingController}&buyer_header=${buyer}`;
    console.log('buyer non - empty', buyer);
  }

  // const cookieParams = `user_id=${userId}&user_name=${userName}&designation=${designation}&buying_controller_header=${buyingController}&buyer_header=${buyer}`;
  return (cookieParams);
};
const userParams = gettingUserDetails();
// alert(userParams)

let host_url = "http://172.20.181.92:8000";

// All sagas to be loaded

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}


// For Overview KPIS
export function* generateOverviewKpiDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let storeParamString = urlName.get('store_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  // const kpiparam = urlName.get('kpi_param');


  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(storeParamString) == "undefined") && !(storeParamString == "")) {
    urlAppends = urlAppends + '&' + storeParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (userParams) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/exec_overview_kpis?` + urlAppends);
  // const data = yield call(request,host_url + `/api/reporting/exec_overview_kpis?` + weekurlparam + '&' + urlParamsString + '&' + weekParamString + '&' + weekselection + '&' + userParams);

  yield put(OverviewKpiDataFetchSuccess(data));
  let spinnerFlag = 1;
  yield put(spinnerOverviewKPI(spinnerFlag));
  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doPromoOverviewKpiFetch() {
  console.log('sagas doPromoOverviewKpiFetch ', OVERVIEW_KPI_CONSTANT);
  const watcher = yield takeLatest(OVERVIEW_KPI_CONSTANT, generateOverviewKpiDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Roles and Intent
export function* generateRolesAndIntentDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  // const kpiparam = urlName.get('kpi_param');

  // yield put(RolesAndIntentDataFetchSuccess({bestWorstPerformance: 0}));

  console.log("sagas generateRolesAndIntentDataFetch url", host_url + `/api/reporting/exec_roles_and_intent?` + weekurlparam + '&' + urlParamsString + weekParamString + '&' + weekselection + '&' + userParams)

  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);


  const data = yield call(request, host_url + `/api/reporting/exec_roles_and_intent?` + urlAppends);
  // const data = yield call(request,host_url + `/api/reporting/exec_roles_and_intent?` + weekurlparam + '&' + urlParamsString + '&' + weekParamString + '&' + weekselection + '&' + userParams);

  yield put(RolesAndIntentDataFetchSuccess(data));

  let spinnerFlag = 1;
  yield put(spinnerRolesAndIntent(spinnerFlag));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doRolesAndIntentFetch() {
  console.log('sagas doRolesAndIntentFetch ', ROLES_INTENT_CONSTANT);
  const watcher = yield takeLatest(ROLES_INTENT_CONSTANT, generateRolesAndIntentDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Budget and Forecast
export function* generateBudgetForecastDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  // const kpiparam = urlName.get('kpi_param');

  console.log("sagas generateBudgetForecastDataFetch url", host_url + `/api/reporting/exec_budget_forecast?` + weekurlparam + '&' + urlParamsString + weekParamString + '&' + weekselection + '&' + userParams)

  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/exec_budget_forecast?` + urlAppends);
  // const data = yield call(request,host_url + `/api/reporting/exec_budget_forecast?` + weekurlparam + '&' + urlParamsString + '&' + weekParamString + '&' + weekselection + '&' + userParams);

  yield put(BudgetAndForecastDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}


export function* doBudgetForecastFetch() {
  console.log('sagas doBudgetForecastFetch ', BUDGET_FORECAST_CONSTANT);
  const watcher = yield takeLatest(BUDGET_FORECAST_CONSTANT, generateBudgetForecastDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Overview KPI trend
export function* generateOverviewKPITrendDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  // const kpiparam = urlName.get('kpi_param');

  console.log("sagas generateOverviewKPITrendDataFetch url", host_url + `/api/reporting/exec_overview_kpitrends?` + weekurlparam + '&' + urlParamsString + weekParamString + '&' + weekselection + '&' + userParams)

  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }


  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/exec_overview_kpitrends?` + urlAppends);
  // const data = yield call(request, host_url + `/api/reporting/exec_overview_kpitrends?` + weekurlparam + '&' + urlParamsString + '&' + weekParamString + '&' + weekselection + '&' + userParams);

  yield put(OverviewKpiTrendDataFetchSuccess(data));

  let spinnerflag = 1;
  yield put(spinnerOverviewKPITrend(spinnerflag));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doOverviewKPITrendFetch() {
  console.log('sagas doOverviewTrendFetch ', OVERVIEW_KPI_TREND_CONSTANT);
  const watcher = yield takeLatest(OVERVIEW_KPI_TREND_CONSTANT, generateOverviewKPITrendDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Overview Drivers Internal
export function* generateOverviewDriversInternalDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  // const kpiparam = urlName.get('kpi_param');

  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/exec_overview_drivers_internal?` + urlAppends);

  yield put(OverviewDriversInternalDataFetchSuccess(data));

  let spinnerflag = 1;
  yield put(spinnerOverviewInternalDrivers(spinnerflag));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doOverviewDriversInternalFetch() {
  console.log('sagas doOverviewDriversInternalFetch ', OVERVIEW_DRIVERS_INTERNAL_CONSTANT);
  const watcher = yield takeLatest(OVERVIEW_DRIVERS_INTERNAL_CONSTANT, generateOverviewDriversInternalDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Overview Drivers External
export function* generateOverviewDriversExternalDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  // const kpiparam = urlName.get('kpi_param');

  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/exec_overview_drivers_external?` + urlAppends);
  yield put(OverviewDriversExternalDataFetchSuccess(data));

  let spinnerflag = 1;
  yield put(spinnerOverviewExternalDrivers(spinnerflag));


  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doOverviewDriversExternalFetch() {
  console.log('sagas doOverviewDriversExternalFetch ', OVERVIEW_DRIVERS_EXTERNAL_CONSTANT);
  const watcher = yield takeLatest(OVERVIEW_DRIVERS_EXTERNAL_CONSTANT, generateOverviewDriversExternalDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Kpi boxes
export function* generateKpiBoxesDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  const kpiparam = urlName.get('kpi_param');

  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  const data = yield call(request, host_url + `/api/reporting/exec_kpi?` + urlAppends);

  yield put(KpiBoxesDataFetchSuccess(data));
  let spinnerFlag = 1;
  yield put(spinnerKPI(spinnerFlag));
  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doKpiBoxesFetch() {
  console.log('sagas doKpiBoxesFetch ', KPI_BOXES_CONSTANT);
  const watcher = yield takeLatest(KPI_BOXES_CONSTANT, generateKpiBoxesDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Best Worst
export function* generateBestWorstFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  const kpiparam = urlName.get('kpi_param');

  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }


  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/exec_best_worst?` + urlAppends);
  console.log("Heres the generateBestWorstFetch data", data);
  yield put(BestWorstDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doBestWorstFetch() {
  console.log('sagas doBestWorstFetch ', BEST_WORST_CONSTANT);
  const watcher = yield takeLatest(BEST_WORST_CONSTANT, generateBestWorstFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Best Info
export function* generateBestInfoFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  let kpiparam = urlName.get('kpi_param');

  let selected = urlName.get('top_name');
  if (selected == 'None') {
    selected = '';
  }

  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(selected) == "undefined") && !(selected == "")) {
    urlAppends = urlAppends + '&' + selected;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (userParams) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (urlAppends) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);
  // alert(userParams)
  // alert(urlAppends)
  const data = yield call(request, host_url + `/api/reporting/exec_best_info?` + urlAppends);

  yield put(BestInfoDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doBestInfoFetch() {
  console.log('sagas doBestInfoFetch ', BEST_INFO_CONSTANT);
  const watcher = yield takeLatest(BEST_INFO_CONSTANT, generateBestInfoFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Worst Info
export function* generateWorstInfoFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  const kpiparam = urlName.get('kpi_param');
  let selected = urlName.get('bot_name');
  if (selected == 'None') {
    selected = '';
  }

  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(selected) == "undefined") && !(selected == "")) {
    urlAppends = urlAppends + '&' + selected;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/exec_worst_info?` + urlAppends);

  yield put(WorstInfoDataFetchSuccess(data));
  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doWorstInfoFetch() {
  console.log('sagas doWorstInfoFetch ', WORST_INFO_CONSTANT);
  const watcher = yield takeLatest(WORST_INFO_CONSTANT, generateWorstInfoFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Supplier Info
export function* generateSupplierInfoFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  const kpiparam = urlName.get('kpi_param');


  let selected_supplier = urlName.get('supplier_name');
  if (selected_supplier == 'None') {
    selected_supplier = '';
  }
  let topbotflag = urlName.get('top_bot_flag');
  console.log("generateSupplierInfoFetch topbotflag", topbotflag);
  let selected = '';
  if (topbotflag == 'top') {
    selected = urlName.get('top_name');
    console.log("generateSupplierInfoFetch top_name", selected)
  }
  else {
    selected = urlName.get('bot_name');
    console.log("generateSupplierInfoFetch bot_name", selected)
  }

  if (selected == 'None') {
    selected = '';
  }

  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(selected) == "undefined") && !(selected == "")) {
    urlAppends = urlAppends + '&' + selected;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(selected_supplier) == "undefined") && !(selected_supplier == "")) {
    urlAppends = urlAppends + '&' + selected_supplier;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/exec_supp_info?` + urlAppends);

  yield put(SupplierInfoDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doSupplierInfoFetch() {
  console.log('sagas doSupplierInfoFetch ', SUPPLIER_INFO_CONSTANT);
  const watcher = yield takeLatest(SUPPLIER_INFO_CONSTANT, generateSupplierInfoFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


//For Top Supplier Info

export function* generateTopSupplierInfoFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  const kpiparam = urlName.get('kpi_param');


  let selected_supplier = urlName.get('supplier_name');
  if (selected_supplier == 'None') {
    selected_supplier = '';
  }
  let selected = urlName.get('top_name');

  if (selected == 'None') {
    selected = '';
  }

  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(selected) == "undefined") && !(selected == "")) {
    urlAppends = urlAppends + '&' + selected;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(selected_supplier) == "undefined") && !(selected_supplier == "")) {
    urlAppends = urlAppends + '&' + selected_supplier;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/exec_supp_info?` + urlAppends);

  yield put(TopSupplierInfoDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doTopSupplierInfoFetch() {
  console.log('sagas doSupplierInfoFetch ', TOP_SUPPLIER_INFO_CONSTANT);
  const watcher = yield takeLatest(TOP_SUPPLIER_INFO_CONSTANT, generateTopSupplierInfoFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


//For Bot Supplier Info

export function* generateBotSupplierInfoFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  const kpiparam = urlName.get('kpi_param');


  let selected_supplier = urlName.get('supplier_name');
  if (selected_supplier == 'None') {
    selected_supplier = '';
  }
  let selected = urlName.get('bot_name');

  if (selected == 'None') {
    selected = '';
  }


  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(selected) == "undefined") && !(selected == "")) {
    urlAppends = urlAppends + '&' + selected;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(selected_supplier) == "undefined") && !(selected_supplier == "")) {
    urlAppends = urlAppends + '&' + selected_supplier;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/exec_supp_info?` + urlAppends);

  yield put(BotSupplierInfoDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doBotSupplierInfoFetch() {
  console.log('sagas doBotSupplierInfoFetch ', BOT_SUPPLIER_INFO_CONSTANT);
  const watcher = yield takeLatest(BOT_SUPPLIER_INFO_CONSTANT, generateBotSupplierInfoFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Drivers Internal
export function* generateDriversInternalFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  const kpiparam = urlName.get('kpi_param');


  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/exec_drivers_internal?` + urlAppends);

  yield put(DriversInternalDataFetchSuccess(data));


  let spinnerflag = 1;
  yield put(spinnerInternalDrivers(spinnerflag));


  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doDriversInternalFetch() {
  console.log('sagas doDriversInternalFetch ', DRIVERS_INTERNAL_CONSTANT);
  const watcher = yield takeLatest(DRIVERS_INTERNAL_CONSTANT, generateDriversInternalFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Drivers External
export function* generateDriversExternalFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  const kpiparam = urlName.get('kpi_param');

  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);


  const data = yield call(request, host_url + `/api/reporting/exec_drivers_external?` + urlAppends);

  yield put(DriversExternalDataFetchSuccess(data));

  let spinnerflag = 1;
  yield put(spinnerExternalDrivers(spinnerflag));


  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doDriversExternalFetch() {
  console.log('sagas doDriversExternalFetch ', DRIVERS_EXTERNAL_CONSTANT);
  const watcher = yield takeLatest(DRIVERS_EXTERNAL_CONSTANT, generateDriversExternalFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Price KPI
export function* generatePriceKPIFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekParamString = urlName.get('week_filter_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  const kpiparam = urlName.get('kpi_param');


  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
    urlAppends = urlAppends + '&' + weekParamString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/exec_pricing?` + urlAppends);

  yield put(PriceKPIDataFetchSuccess(data));
  let spinnerFlag = 1;
  yield put(spinnerPriceKPI(spinnerFlag));
  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doPriceKPIFetch() {
  console.log('sagas doPriceKPIFetch ', PRICE_KPI_CONSTANT);
  const watcher = yield takeLatest(PRICE_KPI_CONSTANT, generatePriceKPIFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO FILTER DATA
export function* generateFilterFetch() {


  try {
    // todo: update url

    console.log("Inside generateFilterFetch")
    let urlName = yield select(selectExecutiveDomain());
    // let urlParams = urlName.get('filter_selection');
    // let weekurlparams = urlName.get('filter_week_selection');
    console.log(host_url + '/api/reporting/exec_filter_data?');

    // if (urlParams==='')
    // {urlParams='default'
    // }
    let urlParamsString = urlName.get('urlParamsString');
// let weekParamString =urlName.get('week_filter_param');

    if (!urlParamsString) {
      urlParamsString = ''
    }
    if (typeof(urlParamsString) == "undefined") {
      urlParamsString = "";
    } else {
      let urlParamsStringCheck = urlParamsString.substring(0, 2);
      if (urlParamsStringCheck == 20) {
        urlParamsString = urlParamsString.substring(14, urlParamsString.length);
      }
    }

    let urlAppends = "";

    if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
      urlAppends = urlAppends + '&' + urlParamsString;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
      urlAppends = urlAppends + '&' + userParams;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
      urlAppends = urlAppends.replace('&', '');
    }
    console.log('urlAppends6', urlAppends);

    // localStorage.setItem('urlAppends', urlAppends);
    const data = yield call(request, host_url + '/api/reporting/exec_filter_data?' + urlAppends);

    yield put(FilterFetchSuccess(data));
  } catch (err) {
    // //console.log(err);
  }
}

export function* doFilterFetch() {
  console.log('sagas doFilterFetch ', FILTER_CONSTANT);
  const watcher = yield takeLatest(FILTER_CONSTANT, generateFilterFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO WEEK FILTER DATA
export function* generateWeekFilterFetch() {
  try {
    // todo: update url
    console.log("Inside generateWeekFilterFetch")
    let urlName = yield select(selectExecutiveDomain());
    let weekurlparams = urlName.get('week_filter_param');


    // if (urlParams==='')
    // {urlParams='default'
    // }
    // let urlParamsString =urlName.get('urlParamsString');
// let weekParamString =urlName.get('week_filter_param');
    // if(!urlParamsString){
    //   urlParamsString=''
    // }

    const data = yield call(request, host_url + '/api/reporting/week_exec_filter_data?' + weekurlparams);
    // const data = yield call(request, host_url+'/api/reporting/week_exec_filter_data?' + weekurlparams + '&' + userParams);

    console.log(host_url + '/api/reporting/week_exec_filter_data?' + weekurlparams);

    // const data = yield call(request, `http://10.1.161.82:8002/ranging/npd_view/filter_data?`);

    console.log("Filter week data", data);
    yield put(WeekFilterFetchSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

export function* doWeekFilterFetch() {
  console.log('sagas doFilterFetch ', WEEK_FILTER_CONSTANT);
  const watcher = yield takeLatest(WEEK_FILTER_CONSTANT, generateWeekFilterFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// saurav
// FOR PROMO WEEK FILTER DATA
export function* generateBestWorstPerformance() {
  try {
    yield put(generateBestWorstPerformanceSuccess(''));

    // todo: update url
    console.log("Inside generateWeekFilterFetch")
    const urlName = yield select(selectExecutiveDomain());
    const weekurlparam = urlName.get('week_param');
    let urlParamsString = urlName.get('urlParamsString');
    let weekParamString = urlName.get('week_filter_param');
    let weekselection = urlName.get('weekurlParam');
    if (!urlParamsString) {
      urlParamsString = ''
    }
    if (typeof(urlParamsString) == "undefined") {
      urlParamsString = "";
    } else {
      let urlParamsStringCheck = urlParamsString.substring(0, 2);
      if (urlParamsStringCheck == 20) {
        urlParamsString = urlParamsString.substring(14, urlParamsString.length);
      }
    }
    const kpiparam = urlName.get('kpi_param');

    let urlAppends = "";
    if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
      urlAppends = urlAppends + '&' + weekurlparam;
      console.log('urlAppends1', urlAppends);
    } else {

    }
    //
    // if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    //   urlAppends = urlAppends + '&' + urlParamsString;
    //   console.log('urlAppends1', urlAppends);
    // } else {
    //
    // }

    if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
      urlAppends = urlAppends + '&' + weekParamString;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
      urlAppends = urlAppends + '&' + kpiparam;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
      urlAppends = urlAppends + '&' + weekselection;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
      urlAppends = urlAppends + '&' + userParams;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
      urlAppends = urlAppends.replace('&', '');
    }
    console.log('urlAppends10 generateBestWorstPerformance', urlAppends);
    const data = yield call(request, host_url + '/api/reporting/executive_best_worst_performance?' + urlAppends);

    // const data = yield call(request, `http://172.20.181.92:8002/api/reporting/executive_best_worst_performance?week_flag=Current%20Week&kpi_type=Value&user_id=c13a9c506c8e6db5fb9f0307e3a472ba2b85dcd2&user_name=sam.augustine@mu-sigma.com&designation=Buyer&buying_controller_header=Meat%20Fish%20and%20Veg&buyer_header=Fish`);
    // const data = yield call(request, host_url + '/api/reporting/week_exec_filter_data?' + weekurlparams);
    // const data = yield call(request, host_url+'/api/reporting/week_exec_filter_data?' + weekurlparams + '&' + userParams);

    // console.log(host_url + '/api/reporting/week_exec_filter_data?' + weekurlparams);

    // const data = yield call(request, `http://10.1.161.82:8002/ranging/npd_view/filter_data?`);

    console.log("Filter week data", data);
    yield put(generateBestWorstPerformanceSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

export function* doGenerateBestWorstPerformance() {
  console.log('sagas doFilterFetch ', WEEK_FILTER_CONSTANT);
  const watcher = yield takeLatest(GENERATE_BEST_WORST_PERFORMANCE, generateBestWorstPerformance);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// saurav
// FOR PROMO WEEK FILTER DATA
export function* generateBestWorstPerformanceTable() {
  try {
    // todo: update url
    console.log("Inside generateWeekFilterFetch")
    const urlName = yield select(selectExecutiveDomain());
    const weekurlparam = urlName.get('week_param');
    let urlParamsString = urlName.get('urlParamsString');
    let weekParamString = urlName.get('week_filter_param');
    let weekselection = urlName.get('weekurlParam');
    let tableSelectedLevel = urlName.get('tableSelectedLevel');
    // alert(tableSelectedLevel)
    if (!urlParamsString) {
      urlParamsString = ''
    }
    if (typeof(urlParamsString) == "undefined") {
      urlParamsString = "";
    } else {
      let urlParamsStringCheck = urlParamsString.substring(0, 2);
      if (urlParamsStringCheck == 20) {
        urlParamsString = urlParamsString.substring(14, urlParamsString.length);
      }
    }
    const kpiparam = urlName.get('kpi_param');

    let urlAppends = "";
    if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
      urlAppends = urlAppends + '&' + weekurlparam;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
      // urlAppends = urlAppends + '&' + urlParamsString;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(weekParamString) == "undefined") && !(weekParamString == "")) {
      urlAppends = urlAppends + '&' + weekParamString;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
      urlAppends = urlAppends + '&' + kpiparam;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
      urlAppends = urlAppends + '&' + weekselection;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
      urlAppends = urlAppends + '&' + userParams;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(userParams) == "undefined") && !(tableSelectedLevel == "")) {
      urlAppends = urlAppends + '&selected_level=' + tableSelectedLevel;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
      urlAppends = urlAppends.replace('&', '');
    }
    console.log('urlAppends11 generateBestWorstPerformanceTable', urlAppends);
    const data = yield call(request, host_url + '/api/reporting/exec_supplier_info?' + urlAppends);

    // const data = yield call(request, `http://172.20.181.92:8000/api/reporting/exec_supplier_info?week_flag=Current%20Week&kpi_type=Value&selected_level=Coated%20Fish&selected_supplier=4894.%20-%20BIRDS%20EYE&user_id=c13a9c506c8e6db5fb9f0307e3a472ba2b85dcd2&user_name=sam.augustine@mu-sigma.com&designation=Buyer&buying_controller_header=Meat%20Fish%20and%20Veg&buyer_header=Fish%200`);
    // const data = yield call(request, host_url + '/api/reporting/week_exec_filter_data?' + weekurlparams);
    // const data = yield call(request, host_url+'/api/reporting/week_exec_filter_data?' + weekurlparams + '&' + userParams);

    // console.log(host_url + '/api/reporting/week_exec_filter_data?' + weekurlparams);

    // const data = yield call(request, `http://10.1.161.82:8002/ranging/npd_view/filter_data?`);

    console.log("Filter week data", data);
    yield put(generateBestWorstPerformanceTableSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

export function* doGenerateBestWorstPerformanceTable() {
  console.log('sagas doFilterFetch ', WEEK_FILTER_CONSTANT);
  const watcher = yield takeLatest(GENERATE_BEST_WORST_PERFORMANCE_TABLE, generateBestWorstPerformanceTable);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// All sagas to be loaded
export default [
  defaultSaga, doGenerateBestWorstPerformance,
  doFilterFetch,
  doWeekFilterFetch,
  doPromoOverviewKpiFetch,
  doRolesAndIntentFetch,
  doBudgetForecastFetch,
  doOverviewKPITrendFetch,
  doOverviewDriversInternalFetch,
  doOverviewDriversExternalFetch,
  doKpiBoxesFetch, doGenerateBestWorstPerformanceTable,
  doBestWorstFetch,
  doBestInfoFetch,
  doWorstInfoFetch,
  doSupplierInfoFetch,
  doTopSupplierInfoFetch,
  doBotSupplierInfoFetch,
  doDriversInternalFetch,
  doDriversExternalFetch,
  doPriceKPIFetch
];
