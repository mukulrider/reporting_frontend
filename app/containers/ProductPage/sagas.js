/* eslint-disable import/first */
import { fork, take, call, put, select, takeLatest } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
// import axios from 'axios';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import {
  API_FETCH, SAVE_WEEK_PARAM, SAVE_METRIC_PARAM, GENERATE_URL_PARAMS_STRING, FETCH_FILTERED_PRODUCT_DATA
} from './constants';
import {
  apiFetchSuccess,fetchSaveWeekParamSuccess,fetchSaveMetricParamSuccess,generateUrlParamsString, generateSideFilterSuccess,generateCascadingFilter
} from 'containers/ProductPage/actions';

import {
  selectProductPageDomain
} from "./selectors";
// 1. our worker saga


export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

/* GENERATE SIDE FILTER*/
export function* generateSideFilter() {
  let urlName = yield select(selectProductPageDomain());
  console.log("urlName for sideFilter",urlName);
  let urlParamsString = urlName.get('urlParamsString');
  console.log("My urlParamsString for SideFilter",urlParamsString);
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  }
  // alert(urlParamsString);
  try {
    // todo: update url

    // const data = yield call(request, `http://172.20.244.141:8000/api/product_impact/filter_data/?${urlParamsString}`);
    const data = yield call(request, `http://localhost:8000/sales/product/filter_data/?${urlParamsString}`);
    console.log("This is my fetched filter data",data);

    yield put(generateSideFilterSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateSideFilter() {
  const watcher = yield takeLatest(GENERATE_URL_PARAMS_STRING, generateSideFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

//generate Week Filtered Data
export function* generateWeekFilter() {
  console.log('done')
  let urlName = yield select(selectProductPageDomain());
  console.log("urlName",urlName);
  let urlParams1 = urlName.get('dataWeekParams');
  let urlParams2 = urlName.get('dataMetricParams');
  let urlParams=urlParams1+ "&" +urlParams2;
  let urlparamsFilter = "";
  if (!(urlName.get('urlParamsString') == "")) {
    urlparamsFilter = urlName.get('urlParamsString');
    console.log("urlParamsFilter:",urlparamsFilter);
  }

  if (!(typeof(urlparamsFilter) == "undefined") && !(urlparamsFilter == "")) {
    urlParams = urlParams + "&" + urlparamsFilter;
  } else {
    // alert("empty");
  }
  console.log('urlParams for Week,Metric,Filter Tabs',urlParams1,urlParams2,urlparamsFilter);
  console.log('Complete urlParams',urlParams);
/*  let paramString = '';
  Object.keys(urlParams).map(obj => {
    console.log(obj,urlParams[obj]);
    paramString += `&${obj}=${urlParams[obj]}`
  });
  paramString = paramString.replace('&', '');*/
  try {
    // todo: update url
    let data = '';
    if (urlParams){
      data = yield call(request, `http://127.0.0.1:8000/sales/product/performance?` + urlParams);
      console.log("This is my fetched drf dta",data);

    }else{
      data = yield call(request, `http://127.0.0.1:8000/sales/product/performance`);
    }
    // // console.log(data);
    yield put(fetchSaveWeekParamSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateCascadingFilter() {
  console.log('done2')
  const watcher = yield takeLatest(FETCH_FILTERED_PRODUCT_DATA, generateWeekFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}

export function* doGenerateWeekFilter() {
  const watcher = yield takeLatest(SAVE_WEEK_PARAM, generateWeekFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}
export function* doGenerateMetricFilter() {
  const watcher = yield takeLatest(SAVE_METRIC_PARAM, generateWeekFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}

// All sagas to be loaded


export default [
  defaultSaga,
  doGenerateWeekFilter,
  doGenerateMetricFilter,
  doGenerateSideFilter,
  doGenerateCascadingFilter
];
