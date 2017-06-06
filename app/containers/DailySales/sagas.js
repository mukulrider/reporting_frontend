// import { take, call, put, select } from 'redux-saga/effects';

import {
  DEFAULT_ACTION,
  PRODUCT_CONSTANT,
  PRODUCT_CARDS_CONSTANT,
  PRODUCT_CHARTS_CONSTANT,
  CARDS_CONSTANT,
  CHARTS_CONSTANT,
  FILTER_CONSTANT,
  WEEK_FILTER_CONSTANT
} from './constants';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}
import {cardsCallAction,cardDataFetchSuccess,chartDataFetchSuccess,prodCardsDataFetchSuccess,prodChartsDataFetchSuccess,LineChartSpinnerCheckSuccess,
  FilterFetchSuccess, WeekFilterFetchSuccess,DSViewKpiSpinnerCheckSuccess,prodCardsSpinnerCheckSuccess,prodChartsSpinnerCheckSuccess,
  defaultPageLoadCheck}
  from './actions';

// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
// Individual exports for testing
import {
  selectDailySalesDomain
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

  if ((typeof(buyer) === "undefined") || (buyer === "")) {
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
const userParams = gettingUserDetails();


let host_url="http://dvcmpapp00001uk.dev.global.tesco.org";
// let host_url="http://127.0.0.1:8000";
// All sagas to be loaded

// FOR CARDS DATA
export function* Cards_watcher() {
  console.log('Cards_watcher triggered');
  const watcher = yield takeLatest(CARDS_CONSTANT, cardData_pull);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
export function* cardData_pull() {
  const urlName = yield select(selectDailySalesDomain());
  console.log("Begin Card Data Pull");
  const kpiparam = urlName.get('kpi_param');
  const filter = urlName.get('filter_week_selection');
  const storeType = urlName.get('store_filter_param');
  const week_filter = urlName.get('week');
  const date_filter = urlName.get('dateurlParam');

  let urlAppends = "";

  if (!(typeof(week_filter) == "undefined") && !(week_filter == "")) {
    urlAppends = urlAppends + '&' + week_filter;
    console.log('urlAppends1', urlAppends);
  }

  const data = yield call(request,host_url+"/api/reporting/data_daily_sales?"+'&'+kpiparam+'&'+week_filter + '&' + filter + '&' + storeType + '&' + date_filter + '&'+ userParams);
  console.log("Line chart fetched data",data);
  console.log("Along with the URL",host_url+"/api/reporting/data_daily_sales?"+'&'+kpiparam+'&'+week_filter + '&' + filter +'&' + storeType + '&' + date_filter + '&'+ userParams);
  yield put(cardDataFetchSuccess(data));

  let LineChartSpinnerCheck = 1;
  yield put(LineChartSpinnerCheckSuccess(LineChartSpinnerCheck));

}
// FOR CHARTS DATA
export function* Charts_watcher() {
  console.log('Chart_watcher triggered');
  const watcher = yield takeLatest(CHARTS_CONSTANT, chartData_pull);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* chartData_pull() {
  const urlName = yield select(selectDailySalesDomain());
  console.log("Begin Line Chart Pull");
  const kpiparam = urlName.get('kpi_param');
  const filter = urlName.get('filter_week_selection');
  const storeType = urlName.get('store_filter_param');
  const week_filter = urlName.get('week');



  const data = yield call(request,host_url+"/api/reporting/graph_daily_sales?"+'&'+kpiparam+'&'+week_filter + '&' + filter +  '&' + storeType +'&'+ userParams);
  console.log("Charts data fetched",data);
  console.log("Along with the URL",host_url+"/api/reporting/graph_daily_sales?"+'&'+kpiparam+'&'+week_filter + '&' + filter + '&' + storeType +'&'+ userParams);
  yield put(chartDataFetchSuccess(data));

  let LineChartSpinnerCheck = 1;
  yield put(LineChartSpinnerCheckSuccess(LineChartSpinnerCheck));

}

export function* ProdCardsData_watcher() {
  console.log('Chart_watcher triggered');
  const watcher = yield takeLatest(PRODUCT_CARDS_CONSTANT, prodCardsData_pull);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* prodCardsData_pull() {
  const urlName = yield select(selectDailySalesDomain());
  console.log("Begin Product Cards Data Pull");
  const kpiparam = urlName.get('kpi_param');
  const storeType = urlName.get('store_filter_param');
  const week_filter = urlName.get('week');
  const date_filter = urlName.get('dateurlParam');
  const prod_filter = urlName.get('product');



  const data = yield call(request,host_url+"/api/reporting/data_daily_sales?"+'&'+kpiparam +'&' + storeType +'&'+week_filter +'&'+date_filter +'&'+ userParams + '&' + prod_filter);
  console.log("Product Cards data fetched",data);
  console.log("Along with the URL",host_url+"/api/reporting/data_daily_sales?"+'&'+kpiparam +'&' + storeType +'&'+week_filter +'&'+date_filter +'&'+ userParams + '&' + prod_filter);
  yield put(prodCardsDataFetchSuccess(data));

  let ProdCardsSpinnerCheck = 1;
  yield put(prodCardsSpinnerCheckSuccess(ProdCardsSpinnerCheck));

}

export function* ProdChartsData_watcher() {
  console.log('Chart_watcher triggered');
  const watcher = yield takeLatest(PRODUCT_CHARTS_CONSTANT, prodChartsData_pull);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* prodChartsData_pull() {
  const urlName = yield select(selectDailySalesDomain());
  console.log("Begin Product Charts Data Pull");
  const kpiparam = urlName.get('kpi_param');
  const storeType = urlName.get('store_filter_param');
  const week_filter = urlName.get('week');
  const prod_filter = urlName.get('product');



  const data = yield call(request,host_url+"/api/reporting/graph_daily_sales?"+'&'+kpiparam+'&'+week_filter +  '&' + storeType +'&'+week_filter +'&'+ userParams + '&' + prod_filter);
  console.log("Product Charts data fetched",data);
  console.log("Along with the URL",host_url+"/api/reporting/graph_daily_sales?"+'&'+kpiparam+'&'+week_filter + '&' + storeType +'&'+week_filter +'&'+ userParams + '&' + prod_filter);
  yield put(prodChartsDataFetchSuccess(data));

  let ProdChartsSpinnerCheck = 1;
  yield put(prodChartsSpinnerCheckSuccess(ProdChartsSpinnerCheck));

}
// FOR FILTER DATA

export function* doFilterFetch() {
  console.log('Filter_Watcher ', FILTER_CONSTANT);
  const watcher = yield takeLatest(FILTER_CONSTANT, generateFilterFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* generateFilterFetch() {
  let urlName = yield select(selectDailySalesDomain());
  let urlParamsString = urlName.get('filter_week_selection');
  // let urlParamsString = urlName.get('filter_selection');
  console.log('urlParamsString-> ', urlParamsString);
  if (!urlParamsString) {
    urlParamsString = ''
  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    // urlParamsString = '?' + urlParamsString;
  }
  try {
    const data = yield call(request, host_url + '/api/reporting/filter_daily_sales?' + urlParamsString + '&' + userParams,
    );
    console.log("Filter data", data);
    yield put(FilterFetchSuccess(data));

    let DSViewKpiSpinnerCheck = 1;
    yield put(DSViewKpiSpinnerCheckSuccess(DSViewKpiSpinnerCheck));
  } catch (err) {
    console.log(err);
  }
}


// FOR WEEK FILTER DATA
export function* generateWeekFilterFetch() {

  // todo: update url

  console.log("Inside generateWeekFilterFetch");
  let urlName = yield select(selectDailySalesDomain());
  let urlParams = "";
  let filter_week_selection = urlName.get('week');
  console.log("below filter", filter_week_selection);
  let abc = urlName.get('defaultPageLoadCheck');
  console.log("below filter1", abc);


  if ((localStorage.getItem('weekParams') == "") || (localStorage.getItem('weekParams') === null) || (typeof(localStorage.getItem('weekParams')) === undefined)) {

    if (abc == 1) {
      urlParams = '?';
      // urlParams = '?' + 'tesco_week_flag=1';
      console.log("flag check if", urlParams);
    } else {
      if (!(typeof(filter_week_selection) == "undefined") && !(filter_week_selection == "")) {

        urlParams = '?' + filter_week_selection;
        console.log("flag check if", urlParams);
      } else {

      }
    }
  } else {
    urlParams = '?' + localStorage.getItem('weekParams');
    console.log("flag check outer else", urlParams);
  }

  try {
    const data = yield call(request, host_url + '/api/reporting/dss_filter_week' + urlParams);
    // const data = yield call(request, host_url+'/api/reporting/product/filter_data_week?' + urlParams);
    console.log("Filter week data", data);

    yield put(defaultPageLoadCheck(0));
    yield put(WeekFilterFetchSuccess(data));
  } catch (err) {
    console.log("Error", err);
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
  Cards_watcher,
  Charts_watcher,
  ProdCardsData_watcher,
  ProdChartsData_watcher,
  doFilterFetch,
  WeekFilter_watcher,
  generateWeekFilterFetch
];
