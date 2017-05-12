
import {
  WATERFALL_CONSTANT, PIECHART_CONSTANT, PRICE_RANGE_CONSTANT, FILTER_CONSTANT, OUTPERFORMANCE_CONSTANT,
} from './constants';
import {
  CompetitorWaterfallDataFetchSuccess, CompetitorPieChartDataFetchSuccess, CompetitorPriceRangeDataFetchSuccess,
  FilterFetchSuccess, CompetitorOutpermanceFetchSuccess,onPieChartSpinnerSuccess, outPerformanceChartSuccess,waterChartAsdaSuccess,
  priceRangeChartSuccess
} from 'containers/Competitor/actions';


// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
// Individual exports for testing
import {
  selectCompetitorDomain, makeUrlParamsString,
} from 'containers/Competitor/selectors';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}
const host_url = 'http://10.1.244.154:8000';
// const host_url = 'http://10.1.244.154:8000';
// All sagas to be loaded

// FOR COMPETITOR WATERFALL CHART
export function* generateCompetitorWaterfallDataFetch() {
  const urlName = yield select(selectCompetitorDomain());
  const weekurlparam = urlName.get('week_param');
  const filterurlparam = urlName.get('filter_selection');
  const weekselection = urlName.get('filter_week_selection');
  const waterfallparam = urlName.get('dataPriceIndexParam');
  console.log('Week parameter', weekurlparam);
  console.log('Filter parameter', filterurlparam);
  console.log('Waterfall param', waterfallparam);

  // let getCookie;
  // getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // };
  // const user_token = getCookie('token');
  // const buyer = getCookie('buyer');
  // const token = user_token.concat('___').concat(buyer)

  //
  // //paramString = paramString + '&week=' + urlParams;
  // paramString = paramString.replace('&', '');
  const data = yield call(request,
    `${host_url}/api/reporting/competitor_price_index?${weekurlparam}&${filterurlparam}&${waterfallparam}&${weekselection}`,
    // {
    //   headers: {
    //     Authorization: token
    //   }
    // }
    );
  console.log('Heres the kpi data', data);
  let spinnerCheck = 1;
  yield put(CompetitorWaterfallDataFetchSuccess(data));
  yield put(waterChartAsdaSuccess(spinnerCheck));

  // } catch (err) {
  //   // console.log(err);
  // }
}


export function* doCompetitorWaterfallFetch() {
  const watcher = yield takeLatest(WATERFALL_CONSTANT, generateCompetitorWaterfallDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR COMPETITOR PIE CHART
export function* generateCompetitorPieChartDataFetch() {
  const urlName = yield select(selectCompetitorDomain());
  const weekurlparam = urlName.get('week_param');
  const filterurlparam = urlName.get('filter_selection');
  const kpiparam = urlName.get('kpi_param');
  const weekselection = urlName.get('filter_week_selection');

  console.log('Week parameter', weekurlparam);
  console.log('Filter parameter', filterurlparam);
  console.log(`Pie Chart sagas.js${host_url}/api/reporting/competitor_market_share?${weekurlparam}&${kpiparam}&${filterurlparam}&${weekselection}`);

  // let getCookie;
  // getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // };
  // const user_token = getCookie('token');
  // const buyer = getCookie('buyer');
  // const token = user_token.concat('___').concat(buyer)

  const data = yield call(request,
    `${host_url}/api/reporting/competitor_market_share?${weekurlparam}&${kpiparam}&${filterurlparam}&${weekselection}`,
    {
      // headers: {
      //   Authorization: token
      // }
    });
  console.log('Heres the kpi data', data);
  let spinnerCheck = 1;
  yield put(CompetitorPieChartDataFetchSuccess(data));
  yield put(onPieChartSpinnerSuccess(spinnerCheck));
}


export function* doCompetitorPieChartFetch() {
  const watcher = yield takeLatest(PIECHART_CONSTANT, generateCompetitorPieChartDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// For competitor price range MULTILINE CHART
export function* generateCompetitorPriceRangeDataFetch() {
  const urlName = yield select(selectCompetitorDomain());
  const weekurlparam = urlName.get('week_param');
  const filterurlparam = urlName.get('filter_selection');
  const weekselection = urlName.get('filter_week_selection');
  // console.log("inside sagas.js", urlParams);
  console.log('generateCompetitorPriceRangeDataFetch sagas.js', `${host_url}/api/reporting/competitor_view_range?${weekurlparam}&${filterurlparam}&${weekselection}`);

  // let getCookie;
  // getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // };
  // const user_token = getCookie('token');
  // const buyer = getCookie('buyer');
  // const token = user_token.concat('___').concat(buyer)

  const data = yield call(request,
    `${host_url}/api/reporting/competitor_view_range?${weekurlparam}&${filterurlparam}&${weekselection}`,
    // {
    //   // headers: {
    //   //   Authorization: token
    //   // }
    // }
    );
  console.log('Heres the kpi data', data);

  let spinnerCheck = 1;
  yield put(CompetitorPriceRangeDataFetchSuccess(data));
  yield put(priceRangeChartSuccess(spinnerCheck));


  // } catch (err) {
  //   // console.log(err);
  // }
}


export function* doCompetitorPriceRangeFetch() {
  const watcher = yield takeLatest(PRICE_RANGE_CONSTANT, generateCompetitorPriceRangeDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR COMPETITOR outperformance fetch
export function* generateCompetitorOutperformance() {
  const urlName = yield select(selectCompetitorDomain());
  const weekurlparam = urlName.get('week_param');
  const filterurlparam = urlName.get('filter_selection');
  const kpiparam = urlName.get('kpi_param');
  const weekselection = urlName.get('filter_week_selection');
  console.log('Week parameter', weekurlparam);
  console.log('Filter parameter', filterurlparam);
  console.log('Kpi parameter', kpiparam);

  // let getCookie;
  // getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // };
  // const user_token = getCookie('token');
  // const buyer = getCookie('buyer');
  // const token = user_token.concat('___').concat(buyer)


  try {
  const data = yield call(request,
    `${host_url}/api/reporting/competitor_market_outperformance?${weekurlparam}&${kpiparam}&${filterurlparam}&${weekselection}`,
    // {
    //   // headers: {
    //   //   Authorization: token
    //   // }
    // }
      );

  console.log('generateCompetitorOutperformance', data);
    let spinnerCheck = 1;
    yield put(CompetitorOutpermanceFetchSuccess(data));
    yield put(outPerformanceChartSuccess(spinnerCheck));


  } catch (err) {
    // console.log(err);
  }
}


export function* doCompetitorOutperformanceFetch() {
  const watcher = yield takeLatest(OUTPERFORMANCE_CONSTANT, generateCompetitorOutperformance);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
// For generating filters
export function* generateFilterFetch() {
  try {
    // let getCookie;
    // getCookie = (name) => {
    //   const value = `; ${document.cookie}`;
    //   const parts = value.split(`; ${name}=`);
    //   if (parts.length === 2) return parts.pop().split(';').shift();
    // };
    // const user_token = getCookie('token');
    // const buyer = getCookie('buyer');
    // const token = user_token.concat('___').concat(buyer)

    const urlName = yield select(selectCompetitorDomain());
    const urlParams = urlName.get('filter_selection');
    const weekurlparams = urlName.get('filter_week_selection');
    console.log(`${host_url}/api/reporting/competitor_filter_data?${urlParams}`,
      // {
      //   headers: {
      //     Authorization: token,
      //   },
      // }
      );

    // if (urlParams==='')
    // {urlParams='default'
    // }

    const data = yield call(request, `${host_url}/api/reporting/competitor_filter_data?${urlParams}`,
      // {
      //   headers: {
      //     Authorization: token,
      //   },
      // }
      );

    console.log(`${host_url}/api/reporting/filter_data_week?${weekurlparams}`);
    const data2 = yield call(request, `${host_url}/api/reporting/filter_data_week?${weekurlparams}`,
      // {
      //   headers: {
      //     Authorization: token,
      //   },
      // }
      );
    console.log('sagas generateFilterFetch data2', data2);
    // const data = yield call(request, `http://localhost:8090/wash/?format=json`);
    // const data = yield call(request, `http://10.1.161.82:8000/ranging/npd_view/filter_data?`);
    const filter_data = { filter_data: data, week_data: data2 };
    // // //console.log(data);
    yield put(FilterFetchSuccess(filter_data));
  } catch (err) {
    // //console.log(err);
  }
}


export function* doFilterFetch() {
  const watcher = yield takeLatest(FILTER_CONSTANT, generateFilterFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


export default [
  defaultSaga,
  doCompetitorWaterfallFetch,
  doCompetitorPieChartFetch,
  doCompetitorPriceRangeFetch,
  doFilterFetch,
  doCompetitorOutperformanceFetch,
];
