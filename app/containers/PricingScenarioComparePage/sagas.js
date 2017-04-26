import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
import {FETCH_SCENARIO_DATA} from './constants';
import {fetchScenarioDataSuccess} from 'containers/PricingScenarioComparePage/actions';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

/* GENERATE SIDE FILTER*/
export function* generatePricingScenarioComparisonData() {
  console.log('generatePricingScenarioComparisonData');
  try {
    const data = yield call(request, `http://localhost:8090/pricing/scenario-graph/?name=departmentlevel&name=productlevel`);
    yield put(fetchScenarioDataSuccess(data));
  } catch (err) {}

}

export function* doGeneratePricingScenarioComparisonData() {
  const watcher = yield takeLatest(FETCH_SCENARIO_DATA, generatePricingScenarioComparisonData);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}

// All sagas to be loaded
export default [
  doGeneratePricingScenarioComparisonData
];
