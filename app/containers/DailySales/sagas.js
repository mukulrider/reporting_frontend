// import { take, call, put, select } from 'redux-saga/effects';

import {
  DEFAULT_ACTION,
  LINECHART_CONSTANT,
  FILTER_CONSTANT,
  WEEK_FILTER_CONSTANT
} from './constants';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}
import {lineChartCallAction,LineChartDataFetchSuccess,
  PromoKpiDataFetchSuccess, FilterFetchSuccess, WeekFilterFetchSuccess}
  from './actions';

// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
// Individual exports for testing
import {
  selectDailySalesDomain
} from './selectors';


// let host_url="http://10.1.244.200:8000";
let host_url="http://172.20.246.60:8001";
// All sagas to be loaded


// FOR LINECHART DATA
export function* LineChart_watcher() {
  console.log('LineChart_watcher triggered');
  const watcher = yield takeLatest(LINECHART_CONSTANT, LineChartData_pull);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* LineChartData_pull() {
  const urlName = yield select(selectDailySalesDomain());
  console.log("Begin Line Chart Pull");
  const kpiparam = urlName.get('kpi_param');
  const week_filter = urlName.get('filter_week_selection');
  const filter = urlName.get('filter_selection');

  const data = yield call(request,host_url+"/api/reporting/daily_sales?"+'&'+kpiparam+'&'+filter+'&'+week_filter);
  console.log("Line chart fetched data",data);
  console.log("Along with the URL",host_url+"/api/reporting/daily_sales?"+'&'+kpiparam+'&'+filter+'&'+week_filter);
  yield put(LineChartDataFetchSuccess(data));

}


// FOR FILTER DATA

export function* doFilterFetch() {
  console.log('Filter_Watcher ',FILTER_CONSTANT);
  const watcher = yield takeLatest(FILTER_CONSTANT, generateFilterFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* generateFilterFetch() {
  // todo: update url

  let getCookie;
  getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
  const user_token = getCookie('token');
  const buyer = getCookie('buyer');
  const token = user_token.concat('___').concat(buyer)

  let urlName=yield select(selectDailySalesDomain());
  let urlParamsString = urlName.get('filter_selection');
  console.log('urlParamsString-> ',urlParamsString);
  if(!urlParamsString){
    urlParamsString=''
  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlParamsString = '?' + urlParamsString;
  }
  try {
    const data = yield call(request, host_url+'/api/reporting/filter_daily_sales' + urlParamsString,
      {
        headers: {
          Authorization: token
        }
      }
      );
    // const data = yield call(request, host_url+'/api/reporting/filter_data?' + urlParamsString);

    // console.log(host_url+'/api/reporting/filter_data_week?');
    // const data2 = yield call(request, host_url+'/api/reporting/filter_data_week?' +weekurlparams);
    // console.log("sagas generateFilterFetch data2",data2)
    // const filter_data = {"filter_data": data, "week_data": data2 }
    console.log("Filter data",data);
    yield put(FilterFetchSuccess(data));
  } catch (err) {
    console.log(err);
  }
}


// FOR WEEK FILTER DATA
export function* generateWeekFilterFetch() {

  // todo: update url

  console.log("Inside generateWeekFilterFetch");
  let urlName=yield select(selectDailySalesDomain());
  // let weekurlparams1 = urlName.get('filter_week_selection');

  //*********************** FILTERS PARAMETERS *****************************
  // FOR TESCO WEEK
  let urlParams = "";
  let filter_week_selection = '';
  filter_week_selection = urlName.get('week');
  if (!(typeof(filter_week_selection) == "undefined") && !(filter_week_selection == "")) {
    filter_week_selection = urlName.get('week');
    console.log("filter_week_selection if", filter_week_selection);
  } else {
    filter_week_selection = "";
    console.log("filter_week_selection else", filter_week_selection);
  }
  if (!(typeof(filter_week_selection) == "undefined") && !(filter_week_selection == "")) {
    urlParams = '?' + filter_week_selection;
    console.log("filter_week_selection urlParams if", urlParams);
  } else {
    console.log("filter_week_selection urlParams else", urlParams);
  }

  try{
    const data = yield call(request, host_url+'/api/reporting/filter_daily_tesco_week' + urlParams);
    // const data = yield call(request, host_url+'/api/reporting/product/filter_data_week?' + urlParams);
    console.log("Filter week data",data);

    yield put(WeekFilterFetchSuccess(data));
  } catch (err) {
    console.log("Error",err);
  }
}

export function* WeekFilter_watcher() {
  console.log('WeekFilter_watcher');
  const watcher = yield takeLatest(WEEK_FILTER_CONSTANT, generateWeekFilterFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// All sagas to be loaded
export default [
  defaultSaga,
  LineChart_watcher,
  doFilterFetch,
  WeekFilter_watcher,
  generateWeekFilterFetch
];
