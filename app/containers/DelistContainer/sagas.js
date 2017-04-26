// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
// Individual exports for testing
import {
  API_FETCH,
  WEEK_URL,
  TABLE_DATA_FETCH,
  SUBSTITUTE_DATA_URL,
  SUPPLIER_IMPACT_TABLE_DATA_URL,
  GENERATE_TABLE,
  GENERATE_SIDE_FILTER,
  WATERFALL_VALUE,
  SUBSTITUTE_DATA_URL_SUCCESS,
  SUPPLIER_IMPACT_TABLE_DATA_URL_SUCCESS,
  TEST_AJAX,
} from './constants';

import {
  selectDelistContainerDomain, makeUrlParams, makeUrlParamsString,
} from 'containers/DelistContainer/selectors';

import {
  apiFetchSuccess,
  ModalTableDataFetchSuccess,
  generateTableSuccess,
  generateSideFilterSuccess,
  WaterfallValueChartSuccess,
  SubstitutesClickSuccess,
  ajaxFetchSuccess,
  DelistPopupTableDataFetchSuccess,
  SupplierPopupTableDataFetchSuccess,
} from 'containers/DelistContainer/actions';
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

// All sagas to be loaded
export function* generateApiFetch() {
  const urlName = yield select(selectDelistContainerDomain());
  const urlParams = urlName.get('dataUrlparams');
  let paramstring = '';
  Object.keys(urlParams).map((obj) => {
    paramstring += `&${obj}=${urlParams[obj]}`;
  });
  paramstring = paramstring.replace('&', '');
  try {
    const data = yield call(request,
      `http://172.20.78.87:8000/ranging/product_impact_table/?${paramstring}`);
    // `http://localhost:8090/pricing/generate-scenario/?` + paramstring);
    yield put(apiFetchSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doApiFetch() {
  const watcher = yield takeLatest(API_FETCH, generateApiFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* generateWeekFetch() {
  const urlName = yield select(selectDelistContainerDomain());
  const urlParams = urlName.get('weekNumber');
  let paramstring = '';

  // Object.keys(urlParams).map(obj => {
  //   console.log('obj-> ', obj);
  //   paramstring += `&${obj}=${urlParams[obj]}`;
  // });

  paramstring = `${paramstring}&time_period=${urlParams}`;
  paramstring = paramstring.replace('&', '');
  try {
    const data = yield call(request,
      // `http://localhost:8090/pricing/generate-scenario/?` + paramstring);
      `http://172.20.246.140:8000/ranging/product_impact_chart/?${paramstring}`);
    yield put(apiFetchSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doWeekFetch() {
  const watcher = yield takeLatest(WEEK_URL, generateWeekFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// export function* generateTableFetch() {
//   console.log('generateTableFetch>>>>>>>>>>>>>>>>>')
//   let urlName = yield select(selectDelistContainerDomain());
//   let urlParams = urlName.get("tableDataFetch");
//   console.log(urlParams);
//
//   let paramstring = '';
//   Object.keys(urlParams).map(obj => {
//     paramstring += `&${obj}=${urlParams[obj]}`;
//   })
//   paramstring = paramstring + '&id=' + urlParams;
//   paramstring = paramstring.replace('&', '')
//   try {
//     const data = yield call(request,
//       `http://172.20.246.140:8000/ranging/product_impact_table/?` + paramstring);
//     yield put(ModalTableDataFetchSuccess(data));
//   } catch (err) {
//     // console.log(err);
//   }
// }
//
// export function* doTableFetch() {
//   const watcher = yield takeLatest(GENERATE_TABLE, generateTableFetch);
//   yield take(LOCATION_CHANGE);
//   yield cancel(watcher);
// }

export function* generateSubstitutesFetch() {
  const urlName = yield select(selectDelistContainerDomain());
  const urlParams = urlName.get('substitutesData');

  try {
    const data = yield call(request,
      // `http://172.20.246.140:8000/ranging/product_impact_chart/`);
      `http://172.20.78.87:8000/ranging/delist_table_popup?delist_product=${urlParams}`);
    yield put(SubstitutesClickSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doSubstitutesFetch() {
  const watcher = yield takeLatest(SUBSTITUTE_DATA_URL, generateSubstitutesFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// FOR SUPPLIER POPUP TABLE
export function* generateSupplierPopupTableFetch() {
  const urlName = yield select(selectDelistContainerDomain());
  //console.log('urlName', urlName);
  const urlParams = urlName.get('supplierPopupTableData');
  //console.log('urlParams', urlParams);

  try {
    const data = yield call(request,
      // `http://172.20.246.140:8000/ranging/product_impact_chart/`);
      `http://172.20.78.87:8000/ranging/supplier_table_popup?supplier=${urlParams}`);
    yield put(SupplierPopupTableDataFetchSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

// FOR SUPPLIER POPUP TABLE
export function* doSupplierPopupTableFetch() {
//  console.log('inside 1st fn in sagas');
  const watcher = yield takeLatest(SUPPLIER_IMPACT_TABLE_DATA_URL, generateSupplierPopupTableFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// WATERFALL CHART - VALIUE
export function* generateWaterfallValueFetch() {
  // let urlName = yield select(selectDelistContainerDomain());
  // let urlParams = urlName.get("waterfallValue");
  // console.log('urlParams for waterfall chart - value', urlParams);
  //
  // let paramstring = '';
  // Object.keys(urlParams).map(obj => {
  //   paramstring += `&${obj}=${urlParams[obj]}`;
  // })
  // paramstring = paramstring + '&id=' + urlParams;
  // paramstring = paramstring.replace('&', '')
  try {
    const data = yield call(request,
      // `http://localhost:8090/pricing/generate-scenario/?` + paramstring);
      // 'http://172.20.246.140:8000/ranging/product_impact_chart/');
      'http://172.20.78.87:8000/ranging/product_impact_chart/');
    yield put(WaterfallValueChartSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doWaterfallChartValueFetch() {
  const watcher = yield takeLatest(WATERFALL_VALUE, generateWaterfallValueFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// FILTERS
/* GENERATE TABLE */
export function* generateTable() {
  let urlParamsString = yield select(makeUrlParamsString());
  urlParamsString = urlParamsString.urlParamsString;
  try {
    urlParamsString = urlParamsString.replace('commercial_director', 'commerical_director');

    // const data = yield call(request, `http://127.0.0.1:8090/inputpage/?format=json&${urlParamsString}`);
    const data = yield call(request, `http://172.20.78.87:8000/ranging/product_impact_table/?${urlParamsString}`);
    // const data = yield call(request, `http://172.20.246.140:8000/ranging/product_impact_table/?${urlParamsString}`);
    // const data = yield call(request, `http://172.20.78.87:8080/ranging/product_impact/filter_data&${urlParamsString}`);
    yield put(generateTableSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}
// buyingc, parent supplier, buyer, jr bu, pd sub, brand ind, products
export function* doGenerateTable() {
  const watcher = yield takeLatest(GENERATE_TABLE, generateTable);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/* GENERATE SIDE FILTER*/
export function* generateSideFilter() {
  try {
    // todo: update url
    const data = yield call(request, 'http://172.20.246.141:8000/ranging/product_impact/filter_data');
    yield put(generateSideFilterSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateSideFilter() {
  const watcher = yield takeLatest(GENERATE_SIDE_FILTER, generateSideFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// TESTING AJAX

export function* generateAjaxFetch() {
  const urlName = yield select(selectDelistContainerDomain());
  const urlParams = urlName.get('dataUrlparams');
  let paramstring = '';
  Object.keys(urlParams).map((obj) => {
    paramstring += `&${obj}=${urlParams[obj]}`;
  });
  paramstring = paramstring.replace('&', '');
  try {
    const data = yield call(request,
      // `http://172.20.246.140:8000/ranging/product_impact_table?${paramstring}`);
      `http://172.20.78.87:8000/ranging/product_impact_table?${paramstring}`);
    yield put(ajaxFetchSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doAjaxFetch() {
  const watcher = yield takeLatest(TEST_AJAX, generateAjaxFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  defaultSaga,
  doApiFetch,
  doWeekFetch,
  // doTableFetch,
  doWaterfallChartValueFetch,
  doSubstitutesFetch, doGenerateSideFilter, doGenerateTable,
  doAjaxFetch,
  doSupplierPopupTableFetch,
];
