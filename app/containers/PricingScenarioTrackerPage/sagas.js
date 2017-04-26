import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
import {SCENARIO_STATUS} from './constants';
import {scenarioTrackerSuccess} from 'containers/PricingScenarioTrackerPage/actions';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

/* GENERATE SIDE FILTER*/
export function* generatePricingScenarioTracker() {
  console.log('generatePricingScenarioComparisonData');
  try {
    const data = yield call(request, `http://localhost:8090/pricing/generate-scenario/`);
    yield put(scenarioTrackerSuccess(data));
  } catch (err) {}

}

export function* doGeneratePricingScenarioTracker() {
  const watcher = yield takeLatest(SCENARIO_STATUS, generatePricingScenarioTracker);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}

// All sagas to be loaded
export default [
  defaultSaga,
  doGeneratePricingScenarioTracker
];
