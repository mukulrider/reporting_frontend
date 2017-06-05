import { fork, take, call, put, select, takeLatest } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import {
  KANTAR_DATA_CONSTANT,WEEK_FILTER,HIERARCHY_FILTER
} from './constants';

import {
  fetchWeekFilterDataSuccess,fetchHierarchyFilterDataSuccess,fetchKantarDataSuccess
} from 'containers/KantarReport/actions';

import {
  selectKantarReportDomain,
} from './selectors';


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
// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

const host_url = "http://127.0.0.1:8000";

export function* generateKantarData() {
  const urlName = yield select(selectKantarReportDomain());
  console.log('urlName', urlName);
  const week = urlName.get('week');
  const category = urlName.get('category');
  const retailer = urlName.get('retailer');
  const supplier = urlName.get('supplier');

  try {
    let data = '';
      data = yield call(request, `${host_url}/api/reporting/kantar_data?`+'&'+week +'&'+category +'&'+retailer +'&'+supplier);
      console.log('This is my fetched Kantar dta', data);
    // // console.log(data);
    yield put(fetchKantarDataSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}
export function* callGenerateKantarData() {
  const watcher = yield takeLatest(KANTAR_DATA_CONSTANT, generateKantarData);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* callGenerateWeekData() {
  const watcher = yield takeLatest(WEEK_FILTER, generateWeekData);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* generateWeekData() {
  const urlName = yield select(selectKantarReportDomain());

  try {
    let data = '';
    data = yield call(request, `${host_url}/api/reporting/kantar_tesco_week_filter?`);
    console.log('This is my fetched Tesco filter dta', data);
    // // console.log(data);
    yield put(fetchWeekFilterDataSuccess(data));
  } catch (err) {
  }
}

export function* callGenerateHierarchyData() {
  const watcher = yield takeLatest(HIERARCHY_FILTER, generateHierarchyData);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* generateHierarchyData() {
  const urlName = yield select(selectKantarReportDomain());

  try {
    let data = '';
    data = yield call(request, `${host_url}/api/reporting/kantar_filter?`);
    console.log('This is my fetched Hierarchy filter dta', data);
    // // console.log(data);
    yield put(fetchHierarchyFilterDataSuccess(data));
  } catch (err) {
  }
}
// All sagas to be loaded
export default [
  defaultSaga,
  callGenerateWeekData,
  callGenerateHierarchyData,
  callGenerateKantarData
];
