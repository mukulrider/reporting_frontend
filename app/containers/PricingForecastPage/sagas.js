import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
import {
  DEFAULT_ACTION, FETCH_GRAPH_DATA, FETCH_GRAPH_DATA_SUCCESS
} from './constants';
import {fetchGraphData, fetchGraphDataSuccess} from 'containers/PricingForecastPage/actions';
import {makePricingForecastSelectedType} from 'containers/PricingForecastPage/selectors';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}


/* GENERATE SIDE FILTER*/
export function* generateSideFilter() {
  try {
    let urlParamsString = yield select(makePricingForecastSelectedType());
    console.log(urlParamsString);
    const data = yield call(request, `http://localhost:8090/pricing/scenario-graph/?name=${urlParamsString}`);
    yield put(fetchGraphDataSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateSideFilter() {
  const watcher = yield takeLatest(FETCH_GRAPH_DATA, generateSideFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}

// All sagas to be loaded
export default [
  defaultSaga,
  doGenerateSideFilter
];
