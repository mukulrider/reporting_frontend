// import { take, call, put, select } from 'redux-saga/effects';
import {
  KPI_CONSTANT, TABLE_CONSTANT, TOP_BOTTOM_CONSTANT, KPI_ASP_CONSTANT, GENERATE_URL_PARAMS_STRING,WEEK_FILTER_CONSTANT
} from './constants';
import {
  kpiboxDataFetchSucess, SupplierTableDataFetchSuccess, topBottomChartFetchSuccess, kpiboxDataFetchSucessAsp, generateSideFilterSuccess, WeekFilterFetchSuccess
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
let host_url = "http://172.20.244.254:8000"
// FOR SUPPLIER POPUP TABLE
export function* generateDataFetch() {
  const urlName = yield select(selectSupplierDomain());
  const weekurlparam = urlName.get('week_param');
  const kpiparam = urlName.get('kpi_param');
  // console.log("inside sagas.js", urlParams);

  // try {
  const data = yield call(request, host_url + `/api/reporting/supplier_view_kpi?` + weekurlparam + '&' + kpiparam);
  console.log("Heres the kpi data", data);
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

export function* generateDataFetch4() {
  // const urlName = yield select(selectSupplierDomain());
  // const urlParams = urlName.get('reducer');
  // console.log("inside sagas.js", urlParams);
  const weekurlparam = urlName.get('week_param');

  // try {
  const table_data = yield call(request,
    host_url + `/api/reporting/supplier_view_table_bubble?` + weekurlparam);
  console.log("generateDataFetch2 sagas.js", table_data);
  yield put(SupplierTableDataFetchSuccess(table_data));
  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doKPIAspFetch() {
  const watcher = yield takeLatest(KPI_CONSTANT_ASP, generateDataFetch4);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR SUPPLIER TABLE

export function* generateDataFetch2() {
  const urlName = yield select(selectSupplierDomain());
  // const urlParams = urlName.get('reducer');
  // console.log("inside sagas.js", urlParams);
  const weekurlparam = urlName.get('week_param');

  // try {
  const table_data = yield call(request,
    host_url + `/api/reporting/supplier_view_table_bubble?` + weekurlparam);
  console.log("generateDataFetch2 sagas.js", table_data);
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


export function* generateDataFetch3() {
  // const urlParams = urlName.get('reducer');
  const urlName = yield select(selectSupplierDomain());
  // console.log("inside sagas.js", urlParams);
  const weekurlparam = urlName.get('week_param');
  const topbottomkpi = urlName.get('top_bottom_kpi');
  const kpiparam = urlName.get('kpi_param');
  // try {
  const topbot_data = yield call(request,
    host_url + `/api/reporting/supplier_view_top_bottom?` + weekurlparam + '&' + topbottomkpi + '&' + kpiparam);
  console.log("generateDataFetch3 sagas.js", topbot_data);
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


//FOR GETTING FILTERS DATA
export function* generateSideFilter() {
  let urlName = yield select(selectSupplierDomain());
  let urlParamsString = urlName.get('urlParamsString');

  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  }


  try {
    const filter_data = yield call(request,
      host_url + `/api/reporting/filter_supplier/?${urlParamsString}`);
    console.log('filter_data',filter_data);
    yield put(generateSideFilterSuccess(filter_data));
  } catch (err) {
    // console.log(err);
  }
}

//FOR GETTING FILTERS DATA
export function* doGenerateSideFilter() {
  const watcher = yield takeLatest(GENERATE_URL_PARAMS_STRING, generateSideFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}




// FOR SUPPLIER WEEK FILTER DATA
export function* generateWeekFilterFetch() {
  try {
    // todo: update url

    console.log("Inside generateWeekFilterFetch")
    let urlName=yield select(selectSupplierDomain());
    let weekurlparams = urlName.get('weekurlParam');
    console.log("AAA",weekurlparams);
    console.log(host_url+'/api/reporting/promo_filter_data?');
    console.log('/api/reporting/promo_filter_data?');

    // if (urlParams==='')
    // {urlParams='default'
    // }
    // let urlParamsString =urlName.get('urlParamsString')
    // if(!urlParamsString){
    //   urlParamsString=''
    // }

    const data = yield call(request, host_url+'/api/reporting/filter_data_week');

    console.log(host_url+'/api/reporting/filter_data_week');

    // const data = yield call(request, `http://10.1.161.82:8000/ranging/npd_view/filter_data?`);

    console.log("Filter week data",data);
    yield put(WeekFilterFetchSuccess(data));
  } catch (err) {
    console.log(err);
  }
}



export function* doWeekFilterFetch() {
  console.log('sagas doFilterFetch ',WEEK_FILTER_CONSTANT);
  const watcher = yield takeLatest(WEEK_FILTER_CONSTANT, generateWeekFilterFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}





// All sagas to be loaded
export default [
  defaultSaga,
  doKPIFetch,
  doSupplierTableFetch,
  doSupplierTopBotFetch,
  doGenerateSideFilter,
  doWeekFilterFetch,
];
