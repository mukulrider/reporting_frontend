// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
import {
    makeUrlParams
} from 'containers/RangingHomePage/selectors';
import {
    API_FETCH
} from './constants';
import {
    apiFetchSuccess
} from 'containers/RangingHomePage/actions';
// Individual exports for testing
export function* defaultSaga() {
    // See example in containers/HomePage/sagas.js
}

// All sagas to be loaded
export function* generateApiFetch() {
    console.log('generateApiFetch saga');
    try {
        const data = yield call(request, `http://localhost:8090/pricing/generate-scenario/`);
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

export default [
    defaultSaga,
    doApiFetch
];
