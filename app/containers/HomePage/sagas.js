/**
 * Created by musigma on 1/3/17.
 */
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
import {
  ajaxRequest, ajaxRequestSuccess, ajaxRequestError,
  generateTableSuccess, generateSideFilterSuccess
} from 'containers/HomePage/actions';
import {
  makeUrlParams, makeUrlParamsString, makeTextBoxQueryString,
  makeNewScenarioString, makeNewScenarioWeek, makeNewScenarioStoreFormat
} from 'containers/HomePage/selectors';
import {
  AJAX_REQUEST, AJAX_REQUEST_SUCCESS, AJAX_REQUEST_ERROR,
  GENERATE_FILE, GENERATE_TABLE,
  GENERATE_SIDE_FILTER_SUCCESS, GENERATE_SIDE_FILTER,
  GENERATE_TEXTBOX_QUERY_STRING, GENERATE_SCENARIO,
  GENERATE_NEW_SCENARIO_STRING
} from './constants';

/**
 * Root saga manages watcher lifecycle
 */

export function* getData() {
  // console.log('getData');
  const cityName = 'London';
  try {
    const data = yield call(request, `http://localhost:8000/firstpage/?format=json`);
    // console.log(data);
    yield put(ajaxRequestSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doAjaxRequest() {
  const watcher = yield takeLatest(AJAX_REQUEST, getData);
  // console.log('doAjaxRequest');
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


export function* generateFile() {
  try {
    const data = yield call(request, `http://127.0.0.1:8090/generate-file/?ud=124&format=json`);
    // console.log(data);
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateFile() {
  const watcher = yield takeLatest(GENERATE_FILE, generateFile);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}

/* GENERATE TABLE */
export function* generateTable() {
  let urlParamsString = yield select(makeUrlParamsString());
  try {
    urlParamsString = urlParamsString.replace('commercial_director', 'commerical_director');

    const data = yield call(request, `http://127.0.0.1:8090/inputpage/?format=json&${urlParamsString}`);
    yield put(generateTableSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateTable() {
  const watcher = yield takeLatest(GENERATE_TABLE, generateTable);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}

/* GENERATE SIDE FILTER*/
export function* generateSideFilter() {
  try {
    // todo: update url
    const data = yield call(request, `http://localhost:8090/wash/?format=json`);
    // // console.log(data);
    yield put(generateSideFilterSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateSideFilter() {
  const watcher = yield takeLatest(GENERATE_SIDE_FILTER, generateSideFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}

/* GENERATE TEXT BOX TABLE*/
export function* generateTextBoxTable() {
  try {
    // todo: update url
    let textBoxQueryString = yield select(makeTextBoxQueryString());
    console.log(textBoxQueryString);
    const data = yield call(request, `http://localhost:8090/pricing/autocomplete/?brand_name=${textBoxQueryString}`);
    yield put(generateTableSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateTextBoxTable() {
  const watcher = yield takeLatest(GENERATE_TEXTBOX_QUERY_STRING, generateTextBoxTable);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/* GENERATE TEXT BOX TABLE*/
export function* generateScenario() {
  try {
    // todo: update url
    let textBoxQueryString = yield select(makeTextBoxQueryString());
    console.log(textBoxQueryString);
    const data = yield call(request, `http://localhost:8090/pricing/autocomplete/?brand_name=${textBoxQueryString}`);
    yield put(generateTableSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateScenario() {
  const watcher = yield takeLatest(GENERATE_SCENARIO, generateScenario);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/* GENERATE NEW SCENARIO */
export function* generateNewScenario() {
  try {
    // todo: update url
    let newScenarioString = yield select(makeNewScenarioString());
    let newScenarioWeek = yield select(makeNewScenarioWeek());
    let newScenarioStoreFormat = yield select(makeNewScenarioStoreFormat());
    const data = yield call(request, `http://localhost:8090/pricing/generate-scenario/`,
      {
        method: 'POST',
        headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',},
        body: JSON.stringify({name: newScenarioString,
          store_format: newScenarioStoreFormat,
          weeks: parseInt(newScenarioWeek)})
      });
    // yield put(generateTableSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateNewScenario() {
  const watcher = yield takeLatest(GENERATE_SCENARIO, generateNewScenario);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  doAjaxRequest,
  doGenerateFile,
  doGenerateTable,
  doGenerateSideFilter,
  doGenerateTextBoxTable,
  doGenerateNewScenario
];
