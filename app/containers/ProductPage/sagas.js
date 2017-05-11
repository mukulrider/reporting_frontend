/* eslint-disable import/first */
import { fork, take, call, put, select, takeLatest } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
// import axios from 'axios';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import {
  API_FETCH, SAVE_WEEK_PARAM, SAVE_METRIC_PARAM, GENERATE_URL_PARAMS_STRING, FETCH_FILTERED_PRODUCT_DATA, WEEK_FILTER_CONSTANT,
} from './constants';
import {
  apiFetchSuccess, fetchSaveWeekParamSuccess, fetchSaveMetricParamSuccess, generateUrlParamsString, generateSideFilterSuccess, generateCascadingFilter, WeekFilterFetchSuccess,
} from 'containers/ProductPage/actions';

import {
  selectProductPageDomain,
} from './selectors';
// 1. our worker saga


export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}
const host_url = 'http://127.0.0.1:8000';
// let host_url = "http://172.20.244.228:8000"


/* GENERATE SIDE FILTER*/
export function* generateSideFilter() {
  const urlName = yield select(selectProductPageDomain());

  // let getCookie;
  // getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // };
  // const user_token = getCookie('token');
  // const buyer = getCookie('buyer');
  // const token = user_token.concat('___').concat(buyer)

  console.log('urlName for sideFilter', urlName);
  let urlParamsString = urlName.get('urlParamsString');
  console.log('urlparam1', urlParamsString);
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);

    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }

  console.log('My urlParamsString for SideFilter', urlParamsString);
  // alert(urlParamsString);
  try {
    // todo: update url

    // const data = yield call(request, `http://172.20.244.141:8000/api/product_impact/filter_data/?${urlParamsString}`);
    const filter_data = yield call(request, `${host_url}/api/reporting/filter_data_product/?${urlParamsString}`);
    console.log('This is my fetched filter data', filter_data);

    yield put(generateSideFilterSuccess(filter_data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateSideFilter() {
  const watcher = yield takeLatest(GENERATE_URL_PARAMS_STRING, generateSideFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// generate Week Filtered Data
export function* generateWeekFilter() {
  const urlName = yield select(selectProductPageDomain());
  console.log('urlName', urlName);
  const urlParamsWeekFlag = urlName.get('dataWeekParams');
  const urlParamsMetricFlag = urlName.get('dataMetricParams');
//  const urlParamsWeekFilter = urlName.get('filter_week_selection');

  let urlParams = `${urlParamsWeekFlag}&${urlParamsMetricFlag}`;

  let urlParamsWeekFilter = "";
  urlParamsWeekFilter = urlName.get('filter_week_selection');
  if (!(typeof(urlParamsWeekFilter) == "undefined") && !(urlParamsWeekFilter == "")) {
    urlParamsWeekFilter = urlName.get('filter_week_selection');
    urlParams = `${urlParams}&${urlParamsWeekFilter}`;
    console.log("filter_week_selection", urlParamsWeekFilter);
  } else {
    urlParamsWeekFilter = "";
  }
  console.log("Week Filter With Week,Metric Flag:",urlParamsWeekFilter);
  console.log(urlParams);

  let urlparamsHierarchyFilter = urlName.get('urlParamsString');
  if (typeof(urlparamsHierarchyFilter) == "undefined") {
    urlparamsHierarchyFilter = "";
  } else {
    let urlParamsStringCheck = urlparamsHierarchyFilter.substring(0, 2);

    if (urlParamsStringCheck == 20) {
      urlparamsHierarchyFilter = urlparamsHierarchyFilter.substring(14, urlparamsHierarchyFilter.length);
    }
  }

  urlParams = `${urlParams}&${urlparamsHierarchyFilter}`;
  console.log('urlParams for Week Flag,Metric Flag,Week Filter, Hierarchy Fliter', urlParamsWeekFlag, urlParamsMetricFlag,urlParamsWeekFilter, urlparamsHierarchyFilter);
  console.log('Complete urlParams', urlParams);
/*  let paramString = '';
  Object.keys(urlParams).map(obj => {
    console.log(obj,urlParams[obj]);
    paramString += `&${obj}=${urlParams[obj]}`
  });
  paramString = paramString.replace('&', '');*/
  try {
    let data = '';
    if (urlParams) {
      data = yield call(request, `${host_url}/api/reporting/product?${urlParams}`);
      console.log('This is my fetched drf dta', data);
    } else {
      data = yield call(request, `${host_url}/api/reporting/product`);
    }
    // // console.log(data);
    yield put(fetchSaveWeekParamSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateCascadingFilter() {
  const watcher = yield takeLatest(FETCH_FILTERED_PRODUCT_DATA, generateWeekFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* doGenerateWeekFilter() {
  const watcher = yield takeLatest(SAVE_WEEK_PARAM, generateWeekFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* doGenerateMetricFilter() {
  const watcher = yield takeLatest(SAVE_METRIC_PARAM, generateWeekFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* generateWeekFilterFetch() {
  try {
    console.log('Inside generateWeekFilterFetch');
    const urlName = yield select(selectProductPageDomain());
    console.log('Tesco Week Filter urlName:', urlName);
    let weekurlparams = '';

    let filter_week_selection = '';
    filter_week_selection = urlName.get('filter_week_selection');
    const urlParams = '';
    if (!(typeof (filter_week_selection) === 'undefined') && !(filter_week_selection == '')) {
      filter_week_selection = urlName.get('filter_week_selection');
//      filter_week_selection = `?${filter_week_selection}`;
      console.log('filter_week_selection', filter_week_selection);
    } else {
      filter_week_selection = '';
    }

    // if (!(filter_week_selection == "")) {
    //   let urlParams = filter_week_selection;
    //   console.log("urlParams1",urlParams);
    // } else {
    //   console.log("empty1");
    // }
    //
    // if (!(urlParams === "")) {
    //   urlParams = "?" + urlParams.replace('&', '');
    //   console.log("urlParams2",urlParams);
    // } else {
    //   console.log("typeof(urlParams)",!(urlParams === ""));
    //   console.log("typeof(urlParams)2",urlParams);
    //   console.log("else1");
    // }


    const data = yield call(request, `${host_url}/api/reporting/product/filter_data_week?${filter_week_selection}`);

    console.log(`${host_url}/api/reporting/filter_data_week${filter_week_selection}`);

    // const data = yield call(request, `http://10.1.161.82:8000/ranging/npd_view/filter_data?`);

    console.log('Filter week data', data);
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
// All sagas to be loaded


export default [
  defaultSaga,
  doGenerateWeekFilter,
  doGenerateMetricFilter,
  doGenerateSideFilter,
  doGenerateCascadingFilter,
  doWeekFilterFetch,
];
