import {
  WATERFALL_CONSTANT, PIECHART_CONSTANT, PRICE_RANGE_CONSTANT, FILTER_CONSTANT, OUTPERFORMANCE_CONSTANT,
} from './constants';
import {
  CompetitorWaterfallDataFetchSuccess,
  CompetitorPieChartDataFetchSuccess,
  CompetitorPriceRangeDataFetchSuccess,
  FilterFetchSuccess,
  CompetitorOutpermanceFetchSuccess,
  onPieChartSpinnerSuccess,
  outPerformanceChartSuccess,
  waterChartAsdaSuccess,
  priceRangeChartSuccess
} from 'containers/Competitor/actions';


// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
// Individual exports for testing
import {
  selectCompetitorDomain, makeUrlParamsString,
} from 'containers/Competitor/selectors';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

let gettingUserDetails = () =>{
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
  let cookieParams= "";

  if ((typeof(buyer) == "undefined") || (buyer == "")) {
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

const host_url = 'http://172.20.181.92:8000';
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
  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(filterurlparam) == "undefined") && !(filterurlparam == "")) {
    urlAppends = urlAppends + '&' + filterurlparam;
    console.log('urlAppends2', urlAppends);
  } else {

  }

  if (!( typeof(waterfallparam) == "undefined") && !(waterfallparam == "")) {
    urlAppends = urlAppends + '&' + waterfallparam;
    console.log('urlAppends3', urlAppends);
  } else {

  }


  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends4', urlAppends);
  } else {

  }

  console.log('urlAppends5', urlAppends);

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request,
    `${host_url}/api/reporting/competitor_price_index?` + urlAppends,
    // `${host_url}/api/reporting/competitor_price_index?${weekurlparam}&${filterurlparam}&${waterfallparam}&${weekselection}&${userParams}`,

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
  console.log(`Pie Chart sagas.js${host_url}/api/reporting/competitor_market_share?${weekurlparam}&${kpiparam}&${filterurlparam}&${weekselection}&${userParams}`);

  // let getCookie;
  // getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // };
  // const user_token = getCookie('token');
  // const buyer = getCookie('buyer');
  // const token = user_token.concat('___').concat(buyer)


  let urlAppends = ""
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1 2', urlAppends);
  } else {

  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends2 2', urlAppends);
  } else {

  }

  if (!(typeof(filterurlparam) == "undefined") && !(filterurlparam == "")) {
    urlAppends = urlAppends + '&' + filterurlparam;
    console.log('urlAppends3 2', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends4 2', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends5 2', urlAppends);
  } else {

  }

  console.log('urlAppends6 2', urlAppends);
  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends7 2', urlAppends);


  const data = yield call(request,
    `${host_url}/api/reporting/competitor_market_share?` + urlAppends,
    // `${host_url}/api/reporting/competitor_market_share?${weekurlparam}&${kpiparam}&${filterurlparam}&${weekselection}&${userParams}`,
    // {
    //   headers: {
    //     Authorization: token
    //   }
    // }
  );
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
  console.log('generateCompetitorPriceRangeDataFetch sagas.js', `${host_url}/api/reporting/competitor_view_range?${weekurlparam}&${filterurlparam}&${weekselection}&${userParams}`);

  // let getCookie;
  // getCookie = (name) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // };
  // const user_token = getCookie('token');
  // const buyer = getCookie('buyer');
  // const token = user_token.concat('___').concat(buyer)

  let urlAppends = ""
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1 3', urlAppends);
  } else {

  }

if (!(typeof(filterurlparam) == "undefined") && !(filterurlparam == "")) {
    urlAppends = urlAppends + '&' + filterurlparam;
    console.log('urlAppends2 3', urlAppends);
  } else {

  }

if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends3 3', urlAppends);
  } else {

  }

if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends4 3', urlAppends);
  } else {

  }


  console.log('urlAppends5 3', urlAppends);
  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends.replace('&', '');
  }

  console.log('urlAppends6 3', urlAppends);


  const data = yield call(request,
    `${host_url}/api/reporting/competitor_view_range?` + urlAppends,
    // `${host_url}/api/reporting/competitor_view_range?${weekurlparam}&${filterurlparam}&${weekselection}&${userParams}`,
    // {
    //   headers: {
    //     Authorization: token
    //   }
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


  let urlAppends = ""
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1 4', urlAppends);
  } else {

  }

 if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends2 4', urlAppends);
  } else {

  }

 if (!(typeof(filterurlparam) == "undefined") && !(filterurlparam == "")) {
    urlAppends = urlAppends + '&' + filterurlparam;
    console.log('urlAppends3 4', urlAppends);
  } else {

  }

 if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends3 4', urlAppends);
  } else {

  }

 if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends3 4', urlAppends);
  } else {

  }

  console.log('urlAppends4 4', urlAppends);

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends.replace('&', '');
  }

  console.log('urlAppends4 5', urlAppends);


  try {
    const data = yield call(request,
      `${host_url}/api/reporting/competitor_market_outperformance?` + urlAppends,
      // `${host_url}/api/reporting/competitor_market_outperformance?${weekurlparam}&${kpiparam}&${filterurlparam}&${weekselection}&${userParams}`,
      // {
      //   headers: {
      //     Authorization: token
      //   }
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
    const weekurlparams = urlName.get('filter_week_selection');
    let urlParams = urlName.get('filter_selection');

    if (!(typeof(urlParams) == "undefined") && !(urlParams == "")) {
      let urlParamsStringCheck = urlParams.substring(0, 2);
      if (urlParamsStringCheck == 20) {
        urlParams = urlParams.substring(14, urlParamsString.length);
      }
    }
    // {
    //   headers: {
    //     Authorization: token,
    //   },
    // }


    // if (urlParams==='')
    // {urlParams='default'
    // }

    const data = yield call(request, `${host_url}/api/reporting/competitor_filter_data?${urlParams}&${userParams}`,
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
    const filter_data = {filter_data: data, week_data: data2};
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
