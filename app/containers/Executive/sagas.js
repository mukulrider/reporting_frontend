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
} from './constants';




import {OverviewKpiDataFetchSuccess,
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
  FilterFetchSuccess
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


let host_url="http://127.0.0.1:8000";
// All sagas to be loaded

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}


// For Overview KPIS
export function* generateOverviewKpiDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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


  console.log("sagas generateOverviewKpiDataFetch url",host_url+`/api/reporting/exec_overview_kpis?`+ weekurlparam + '&' + urlParamsString + weekParamString +  '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/exec_overview_kpis?`+ weekurlparam + '&' + urlParamsString + '&' + weekParamString +  '&' + weekselection);
  console.log("Heres the generateOverviewKpiDataFetch data",data);
  yield put(OverviewKpiDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doPromoOverviewKpiFetch() {
  console.log('sagas doPromoOverviewKpiFetch ',OVERVIEW_KPI_CONSTANT);
  const watcher = yield takeLatest(OVERVIEW_KPI_CONSTANT, generateOverviewKpiDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Roles and Intent
export function* generateRolesAndIntentDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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


  console.log("sagas generateRolesAndIntentDataFetch url",host_url+`/api/reporting/exec_roles_and_intent?`+ weekurlparam + '&' + urlParamsString + weekParamString +  '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/exec_roles_and_intent?`+ weekurlparam + '&' + urlParamsString + '&' + weekParamString +  '&' + weekselection);
  console.log("Heres the generateRolesAndIntentDataFetch data",data);
  yield put(RolesAndIntentDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doRolesAndIntentFetch() {
  console.log('sagas doRolesAndIntentFetch ',ROLES_INTENT_CONSTANT);
  const watcher = yield takeLatest(ROLES_INTENT_CONSTANT, generateRolesAndIntentDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Budget and Forecast
export function* generateBudgetForecastDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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


  console.log("sagas generateBudgetForecastDataFetch url",host_url+`/api/reporting/exec_budget_forecast?`+ weekurlparam + '&' + urlParamsString + weekParamString +  '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/exec_budget_forecast?`+ weekurlparam + '&' + urlParamsString + '&' + weekParamString +  '&' + weekselection);
  console.log("Heres the generateBudgetForecastDataFetch data",data);
  yield put(BudgetAndForecastDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}


export function* doBudgetForecastFetch() {
  console.log('sagas doBudgetForecastFetch ',BUDGET_FORECAST_CONSTANT);
  const watcher = yield takeLatest(BUDGET_FORECAST_CONSTANT, generateBudgetForecastDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Overview KPI trend
export function* generateOverviewKPITrendDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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


  console.log("sagas generateOverviewKPITrendDataFetch url",host_url+`/api/reporting/exec_overview_kpitrends?`+ weekurlparam + '&' + urlParamsString + weekParamString +  '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/exec_overview_kpitrends?`+ weekurlparam + '&' + urlParamsString + '&' + weekParamString +  '&' + weekselection);
  console.log("Heres the generateOverviewKPITrendDataFetch data",data);
  yield put(OverviewKpiTrendDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doOverviewKPITrendFetch() {
  console.log('sagas doOverviewTrendFetch ',OVERVIEW_KPI_TREND_CONSTANT);
  const watcher = yield takeLatest(OVERVIEW_KPI_TREND_CONSTANT, generateOverviewKPITrendDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Overview Drivers Internal
export function* generateOverviewDriversInternalDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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


  console.log("sagas generateOverviewDriversInternalDataFetch url",host_url+`/api/reporting/exec_overview_drivers_internal?`+ weekurlparam + '&' + urlParamsString + weekParamString +  '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/exec_overview_drivers_internal?`+ weekurlparam + '&' + urlParamsString + '&' +weekParamString +  '&' + weekselection);
  console.log("Heres the generateOverviewDriversInternalDataFetch data",data);
  yield put(OverviewDriversInternalDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doOverviewDriversInternalFetch() {
  console.log('sagas doOverviewDriversInternalFetch ',OVERVIEW_DRIVERS_INTERNAL_CONSTANT);
  const watcher = yield takeLatest(OVERVIEW_DRIVERS_INTERNAL_CONSTANT, generateOverviewDriversInternalDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Overview Drivers External
export function* generateOverviewDriversExternalDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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


  console.log("sagas generateOverviewDriversExternalDataFetch url",host_url+`/api/reporting/exec_overview_drivers_external?`+ weekurlparam + '&' + urlParamsString + weekParamString +  '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/exec_overview_drivers_external?`+ weekurlparam + '&' + urlParamsString + '&' + weekParamString +  '&' + weekselection);
  console.log("Heres the generateOverviewDriversExternalDataFetch data",data);
  yield put(OverviewDriversExternalDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doOverviewDriversExternalFetch() {
  console.log('sagas doOverviewDriversExternalFetch ',OVERVIEW_DRIVERS_EXTERNAL_CONSTANT);
  const watcher = yield takeLatest(OVERVIEW_DRIVERS_EXTERNAL_CONSTANT, generateOverviewDriversExternalDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Kpi boxes
export function* generateKpiBoxesDataFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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


  console.log("sagas generateKpiBoxesDataFetch url",host_url+`/api/reporting/exec_kpi?`+ weekurlparam + '&' + urlParamsString + weekParamString + '&' + kpiparam +  '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/exec_kpi?`+ weekurlparam + '&' + urlParamsString + '&' + weekParamString +  '&' + kpiparam +  '&' + weekselection);
  console.log("Heres the generateKpiBoxesDataFetch data",data);
  yield put(KpiBoxesDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doKpiBoxesFetch() {
  console.log('sagas doKpiBoxesFetch ',KPI_BOXES_CONSTANT);
  const watcher = yield takeLatest(KPI_BOXES_CONSTANT, generateKpiBoxesDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Best Worst
export function* generateBestWorstFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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


  console.log("sagas generateBestWorstFetch url",host_url+`/api/reporting/exec_best_worst?`+ weekurlparam + '&' + urlParamsString + weekParamString + '&' + kpiparam +  '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/exec_best_worst?`+ weekurlparam + '&' + urlParamsString + '&' + weekParamString +  '&' + kpiparam +  '&' + weekselection);
  console.log("Heres the generateBestWorstFetch data",data);
  yield put(BestWorstDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doBestWorstFetch() {
  console.log('sagas doBestWorstFetch ',BEST_WORST_CONSTANT);
  const watcher = yield takeLatest(BEST_WORST_CONSTANT, generateBestWorstFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Best Info
export function* generateBestInfoFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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
  if (selected == 'None')
  {
    selected='';
  }
  console.log("sagas generateBestInfoFetch url",host_url+`/api/reporting/exec_best_info?`+ weekurlparam + '&' + urlParamsString + weekParamString + '&' + kpiparam +  '&' + weekselection + '&' + selected)
  const data = yield call(request,
    host_url+`/api/reporting/exec_best_info?`+ weekurlparam + '&' + urlParamsString + '&' + weekParamString +  '&' + kpiparam +  '&' + weekselection+ '&' + selected);
  console.log("Heres the generateBestInfoFetch data",data);
  yield put(BestInfoDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doBestInfoFetch() {
  console.log('sagas doBestInfoFetch ',BEST_INFO_CONSTANT);
  const watcher = yield takeLatest(BEST_INFO_CONSTANT, generateBestInfoFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Worst Info
export function* generateWorstInfoFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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
  if (selected == 'None')
  {
    selected='';
  }
  console.log("sagas generateWorstInfoFetch url",host_url+`/api/reporting/exec_worst_info?`+ weekurlparam + '&' + urlParamsString + weekParamString + '&' + kpiparam +  '&' + weekselection + '&' + selected)
  const data = yield call(request,
    host_url+`/api/reporting/exec_worst_info?`+ weekurlparam + '&' + urlParamsString + '&' + weekParamString +  '&' + kpiparam +  '&' + weekselection+'&'+selected);
  console.log("Heres the generateWorstInfoFetch data",data);
  yield put(WorstInfoDataFetchSuccess(data));
  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doWorstInfoFetch() {
  console.log('sagas doWorstInfoFetch ',WORST_INFO_CONSTANT);
  const watcher = yield takeLatest(WORST_INFO_CONSTANT, generateWorstInfoFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Supplier Info
export function* generateSupplierInfoFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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
  if (selected_supplier == 'None')
  {
    selected_supplier='';
  }
  let topbotflag = urlName.get('top_bot_flag');
  console.log("generateSupplierInfoFetch topbotflag",topbotflag);
  let selected='';
  if (topbotflag == 'top')
  {
    selected = urlName.get('top_name');
    console.log("generateSupplierInfoFetch top_name",selected)
  }
  else
  {
    selected = urlName.get('bot_name');
    console.log("generateSupplierInfoFetch bot_name",selected)
  }

  if (selected == 'None')
  {
    selected='';
  }


  console.log("sagas generateSupplierInfoFetch url",host_url+`/api/reporting/exec_supp_info?`+ weekurlparam + '&' + urlParamsString + weekParamString + '&' + kpiparam +  '&' + weekselection+'&'+selected+'&'+selected_supplier)
  const data = yield call(request,
    host_url+`/api/reporting/exec_supp_info?`+ weekurlparam + '&' + urlParamsString + '&' + weekParamString +  '&' + kpiparam +  '&' + weekselection+'&'+selected+'&'+selected_supplier);
  console.log("Heres the generateSupplierInfoFetch data",data);
  yield put(SupplierInfoDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doSupplierInfoFetch() {
  console.log('sagas doSupplierInfoFetch ',SUPPLIER_INFO_CONSTANT);
  const watcher = yield takeLatest(SUPPLIER_INFO_CONSTANT, generateSupplierInfoFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


//For Top Supplier Info

export function* generateTopSupplierInfoFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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
  if (selected_supplier == 'None')
  {
    selected_supplier='';
  }
  let selected = urlName.get('top_name');

  if (selected == 'None')
  {
    selected='';
  }


  console.log("sagas generateTopSupplierInfoFetch url",host_url+`/api/reporting/exec_supp_info?`+ weekurlparam + '&' + urlParamsString + weekParamString + '&' + kpiparam +  '&' + weekselection+'&'+selected+'&'+selected_supplier)
  const data = yield call(request,
    host_url+`/api/reporting/exec_supp_info?`+ weekurlparam + '&' + urlParamsString + '&' +  weekParamString +  '&' + kpiparam +  '&' + weekselection+'&'+selected+'&'+selected_supplier);
  console.log("Heres the generateTopSupplierInfoFetch data",data);
  yield put(TopSupplierInfoDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doTopSupplierInfoFetch() {
  console.log('sagas doSupplierInfoFetch ',TOP_SUPPLIER_INFO_CONSTANT);
  const watcher = yield takeLatest(TOP_SUPPLIER_INFO_CONSTANT, generateTopSupplierInfoFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


//For Bot Supplier Info

export function* generateBotSupplierInfoFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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
  if (selected_supplier == 'None')
  {
    selected_supplier='';
  }
  let selected = urlName.get('bot_name');

  if (selected == 'None')
  {
    selected='';
  }


  console.log("sagas generateBotSupplierInfoFetch url",host_url+`/api/reporting/exec_supp_info?`+ weekurlparam + '&' + urlParamsString + weekParamString + '&' + kpiparam +  '&' + weekselection+'&'+selected+'&'+selected_supplier)
  const data = yield call(request,
    host_url+`/api/reporting/exec_supp_info?`+ weekurlparam + '&' + urlParamsString + '&' + weekParamString +  '&' + kpiparam +  '&' + weekselection+'&'+selected+'&'+selected_supplier);
  console.log("Heres the generateBotSupplierInfoFetch data",data);
  yield put(BotSupplierInfoDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doBotSupplierInfoFetch() {
  console.log('sagas doBotSupplierInfoFetch ',BOT_SUPPLIER_INFO_CONSTANT);
  const watcher = yield takeLatest(BOT_SUPPLIER_INFO_CONSTANT, generateBotSupplierInfoFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}








// For Drivers Internal
export function* generateDriversInternalFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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


  console.log("sagas generateDriversInternalFetch url",host_url+`/api/reporting/exec_drivers_internal?`+ weekurlparam + '&' + urlParamsString + weekParamString + '&' + kpiparam +  '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/exec_drivers_internal?`+ weekurlparam + '&' + urlParamsString + '&' +  weekParamString +  '&' + kpiparam +  '&' + weekselection);
  console.log("Heres the generateDriversInternalFetch data",data);
  yield put(DriversInternalDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doDriversInternalFetch() {
  console.log('sagas doDriversInternalFetch ',DRIVERS_INTERNAL_CONSTANT);
  const watcher = yield takeLatest(DRIVERS_INTERNAL_CONSTANT, generateDriversInternalFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Drivers External
export function* generateDriversExternalFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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


  console.log("sagas generateDriversExternalFetch url",host_url+`/api/reporting/exec_drivers_external?`+ weekurlparam + '&' + urlParamsString + weekParamString + '&' + kpiparam +  '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/exec_drivers_external?`+ weekurlparam + '&' + urlParamsString + '&' +  weekParamString +  '&' + kpiparam +  '&' + weekselection);
  console.log("Heres the generateDriversExternalFetch data",data);
  yield put(DriversExternalDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doDriversExternalFetch() {
  console.log('sagas doDriversExternalFetch ',DRIVERS_EXTERNAL_CONSTANT);
  const watcher = yield takeLatest(DRIVERS_EXTERNAL_CONSTANT, generateDriversExternalFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// For Price KPI
export function* generatePriceKPIFetch() {
  const urlName = yield select(selectExecutiveDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekParamString =urlName.get('week_filter_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
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


  console.log("sagas generatePriceKPIFetch url",host_url+`/api/reporting/exec_price_kpi?`+ weekurlparam + '&' + urlParamsString + weekParamString + '&' + kpiparam +  '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/exec_price_kpi?`+ weekurlparam + '&' + urlParamsString + '&' + weekParamString +  '&' + kpiparam +  '&' + weekselection);
  console.log("Heres the generatePriceKPIFetch data",data);
  yield put(PriceKPIDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doPriceKPIFetch() {
  console.log('sagas doPriceKPIFetch ',PRICE_KPI_CONSTANT);
  const watcher = yield takeLatest(PRICE_KPI_CONSTANT, generatePriceKPIFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
















// FOR PROMO FILTER DATA
export function* generateFilterFetch() {

  // let getCookie;
  // getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // };
  // const user_token = getCookie('token');
  // const buyer = getCookie('buyer');
  // const token = user_token.concat('___').concat(buyer)

  try {
    // todo: update url

    console.log("Inside generateFilterFetch")
    let urlName=yield select(selectExecutiveDomain());
    // let urlParams = urlName.get('filter_selection');
    // let weekurlparams = urlName.get('filter_week_selection');
    console.log(host_url+'/api/reporting/exec_filter_data?');

    // if (urlParams==='')
    // {urlParams='default'
    // }
    let urlParamsString =urlName.get('urlParamsString');
// let weekParamString =urlName.get('week_filter_param');

    if(!urlParamsString){
      urlParamsString=''
    }
    if (typeof(urlParamsString) == "undefined") {
      urlParamsString = "";
    } else {
      let urlParamsStringCheck = urlParamsString.substring(0, 2);
      if (urlParamsStringCheck == 20) {
        urlParamsString = urlParamsString.substring(14, urlParamsString.length);
      }
    }
    const data = yield call(request,
      host_url+'/api/reporting/exec_filter_data?' + urlParamsString
      // {
      //   headers: {
      //     Authorization: token
      //   }
      // }
      );

    // console.log(host_url+'/api/reporting/filter_data_week?');
    // const data2 = yield call(request, host_url+'/api/reporting/filter_data_week?' );
    // console.log("sagas generateFilterFetch data2",data2)
    // const data = yield call(request, `http://localhost:8090/wash/?format=json`);
    // const data = yield call(request, `http://10.1.161.82:8000/ranging/npd_view/filter_data?`);
    // const filter_data = {"filter_data": data, "week_data": data2 }
    // // //console.log(data);
    yield put(FilterFetchSuccess(data));
  } catch (err) {
    // //console.log(err);
  }
}

export function* doFilterFetch() {
  console.log('sagas doFilterFetch ',FILTER_CONSTANT);
  const watcher = yield takeLatest(FILTER_CONSTANT, generateFilterFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO WEEK FILTER DATA
export function* generateWeekFilterFetch() {
  try {
    // todo: update url
    console.log("Inside generateWeekFilterFetch")
    let urlName=yield select(selectExecutiveDomain());
    let weekurlparams = urlName.get('week_filter_param');


    // if (urlParams==='')
    // {urlParams='default'
    // }
    // let urlParamsString =urlName.get('urlParamsString');
// let weekParamString =urlName.get('week_filter_param');
    // if(!urlParamsString){
    //   urlParamsString=''
    // }

    const data = yield call(request, host_url+'/api/reporting/week_exec_filter_data?' + weekurlparams);

    console.log(host_url+'/api/reporting/week_exec_filter_data?'+ weekurlparams);

    // const data = yield call(request, `http://10.1.161.82:8000/ranging/npd_view/filter_data?`);

    console.log("Filter week data",data);
    yield put(WeekFilterFetchSuccess(data));
  } catch (err) {
    console.log(err);
  }
}

export function* doWeekFilterFetch() {
  console.log('sagas doFilterFetch ',WEEK_FILTER_CONSTANT);
  const watcher = yield takeLatest(WEEK_FILTER_CONSTANT, generateWeekFilterFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}












// All sagas to be loaded
export default [
  defaultSaga,
  doFilterFetch,
  doWeekFilterFetch,
  doPromoOverviewKpiFetch,
  doRolesAndIntentFetch,
  doBudgetForecastFetch,
  doOverviewKPITrendFetch,
  doOverviewDriversInternalFetch,
  doOverviewDriversExternalFetch,
  doKpiBoxesFetch,
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
