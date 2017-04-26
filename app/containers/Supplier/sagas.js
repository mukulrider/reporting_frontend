// import { take, call, put, select } from 'redux-saga/effects';
import {
  KPI_CONSTANT, TABLE_CONSTANT, TOP_BOTTOM_CONSTANT
} from './constants';
import {
  kpiboxDataFetchSucess, SupplierTableDataFetchSuccess, topBottomChartFetchSuccess
} from 'containers/Supplier/actions';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
// Individual exports for testing
import {
  selectSupplierDomain
} from 'containers/Supplier/selectors';
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}
let host_url =   "http://172.20.246.47:8000"
// FOR SUPPLIER POPUP TABLE
export function* generateDataFetch() {
  const urlName = yield select(selectSupplierDomain());
  // const urlParams = urlName.get('reducer');
  // console.log("inside sagas.js", urlParams);

  // try {
    const data = yield call(request,host_url+`/sales/supplier_view_kpi`);
    console.log("Heres the kpi data",data);
    yield put(kpiboxDataFetchSucess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}


export function* doKPIFetch() {
  const watcher = yield takeLatest(KPI_CONSTANT, generateDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}



// FOR SUPPLIER TABLE

export function* generateDataFetch2() {
  // const urlName = yield select(selectSupplierDomain());
  // const urlParams = urlName.get('reducer');
  // console.log("inside sagas.js", urlParams);

  // try {
  const table_data = yield call(request,
    host_url+`/sales/supplier_view_table_bubble`);
  console.log("generateDataFetch2 sagas.js",table_data);
  yield put(SupplierTableDataFetchSuccess(table_data));
  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doSupplierTableFetch() {
  const watcher = yield takeLatest(TABLE_CONSTANT, generateDataFetch2);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


export function* generateDataFetch3()
{
  // const urlParams = urlName.get('reducer');
  // console.log("inside sagas.js", urlParams);

  // try {
  const topbot_data = yield call(request,
    host_url+`/sales/supplier_view_top_bottom`);
  console.log("generateDataFetch3 sagas.js",topbot_data);
  yield put(topBottomChartFetchSuccess(topbot_data));
  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doSupplierTopBotFetch() {
  const watcher = yield takeLatest(TOP_BOTTOM_CONSTANT, generateDataFetch3);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}




// All sagas to be loaded
export default [
  defaultSaga,
  doKPIFetch,
  doSupplierTableFetch,
  doSupplierTopBotFetch
];
