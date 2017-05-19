import {
  DEFAULT_ACTION,
  KPI_CONSTANT,
  SALES_CONSTANT,
  PROMO_GIVEAWAY_CONSTANT,
  PROMO_PROD_CONSTANT,
  PROMO_PART_CONSTANT,
  FILTER_CONSTANT,
  WEEK_FILTER_CONSTANT
  // FILTER_CONSTANT,
  // FILTER_FETCH_SUCCESS,
  // CHECKBOX_CHANGE
} from './constants';


import {
  PromoKpiDataFetchSuccess,
  PromoSalesDataFetchSuccess,
  PromoGiveawayDataFetchSuccess,
  PromoProdDataFetchSuccess,
  PromoPartDataFetchSuccess,
  FilterFetchSuccess,
  WeekFilterFetchSuccess,
  pieChartSuccess,
  promoGiveAwaySuccess,
  productsCountSplitSuccess,
  promoParticipationBySplitSuccess,
  productsTableSplitSuccess,
  kpiDataSuccess,

}
  from 'containers/Promotion/actions';
// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
// Individual exports for testing
import {
  selectPromotionDomain
} from 'containers/Promotion/selectors';


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


let host_url = "http://172.20.181.92:8000";
// let host_url="http://172.20.246.13:8000";
// All sagas to be loaded

// FOR PROMO BOXES
export function* generatePromoKpiDataFetch() {
  const urlName = yield select(selectPromotionDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  const kpiparam = urlName.get('kpi_param');

  // ADDING PARAMETERS TO 1 VARIABLE FOR APPENDING IN THE URL

  let urlAppends = ""
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1 1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1 2', urlAppends);
  } else {

  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends1 3', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1 4', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1 5', urlAppends);
  } else {

  }

  console.log('urlAppends1 6', urlAppends);

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends.replace('&', '');
  }

  console.log('urlAppends1 7', urlAppends);

  const data = yield call(request,
    host_url + `/api/reporting/promo_kpi?` + urlAppends);
  // host_url+`/api/reporting/promo_kpi?`+ weekurlparam + '&' + urlParamsString + '&' + kpiparam + '&' + weekselection + '&' + userParams);

  yield put(PromoKpiDataFetchSuccess(data));

  let spinnerCheck = 1;
  yield put(kpiDataSuccess(spinnerCheck));

  // } catch (err) {
  //   // console.log(err);
  // }
}


export function* doPromoKpiFetch() {
  console.log('sagas doPromoKpiFetch ', KPI_CONSTANT);
  const watcher = yield takeLatest(KPI_CONSTANT, generatePromoKpiDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO SALES DATA
export function* generatePromoSalesDataFetch() {
  const urlName = yield select(selectPromotionDomain());
  const weekurlparam = urlName.get('week_param');
  const salesparam = urlName.get('sales_param');
  let urlParamsString = urlName.get('urlParamsString');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }
  const kpiparam = urlName.get('kpi_param');
  console.log("sagas promo_sales url", host_url + `/api/reporting/promo_sales?` + weekurlparam + '&' + urlParamsString + '&' + kpiparam + '&' + salesparam + '&' + weekselection + '&' + userParams)

  let urlAppends = ""

  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends2', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends2', urlAppends);
  } else {

  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends2', urlAppends);
  } else {

  }

  if (!(typeof(salesparam) == "undefined") && !(salesparam == "")) {
    urlAppends = urlAppends + '&' + salesparam;
    console.log('urlAppends2', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends2', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends2', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);


  const data = yield call(request, host_url + `/api/reporting/promo_sales?` + urlAppends);
  // const data = yield call(request,host_url+`/api/reporting/promo_sales?`+ weekurlparam + '&' + urlParamsString + '&' + kpiparam+'&'+salesparam+ '&' + weekselection + '&' + userParams);
  yield put(PromoSalesDataFetchSuccess(data));

  let spinnerCheck = 1;
  console.log('spinnerCheck for pie',spinnerCheck);
  yield put(pieChartSuccess(spinnerCheck))


  let spinnerCheckTable = 1;
  console.log('spinnerCheck for pie2',spinnerCheckTable);
  yield put(productsCountSplitSuccess(spinnerCheckTable));

  // } catch (err) {
  //   // console.log(err);
  // }
}


export function* doPromoSalesFetch() {
  console.log('sagas doPromoSalesFetch ', SALES_CONSTANT);
  const watcher = yield takeLatest(SALES_CONSTANT, generatePromoSalesDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO GIVEAWAY DATA
export function* generatePromoGiveawayDataFetch() {
  const urlName = yield select(selectPromotionDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let giveawayparam = urlName.get('giveaway_param');
  let weekselection = urlName.get('weekurlParam');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }

  console.log("sagas generatePromoGiveawayDataFetch url", host_url + `/api/reporting/promo_giveaway/?` + weekurlparam + '&' + urlParamsString + '&' + giveawayparam + '&' + weekselection + '&' + userParams)

  let urlAppends = "";

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(giveawayparam) == "undefined") && !(giveawayparam == "")) {
    urlAppends = urlAppends + '&' + giveawayparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/promo_giveaway?` + urlAppends);
  // const data = yield call(request, host_url + `/api/reporting/promo_giveaway/?` + weekurlparam + '&' + urlParamsString + '&' + giveawayparam + '&' + weekselection + '&' + userParams);
  yield put(PromoGiveawayDataFetchSuccess(data));

  let spinnerCheck = 1;
  yield put(promoGiveAwaySuccess(spinnerCheck));

  // } catch (err) {
  //   // console.log(err);
  // }
}


export function* doPromoGiveawayFetch() {
  console.log('sagas doPromoGiveawayFetch ', PROMO_GIVEAWAY_CONSTANT);
  const watcher = yield takeLatest(PROMO_GIVEAWAY_CONSTANT, generatePromoGiveawayDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO PROD DATA
export function* generatePromoProdDataFetch() {
  const urlName = yield select(selectPromotionDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let promoprodparam = urlName.get('promo_prod_param');
  let weekselection = urlName.get('weekurlParam');

  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }

  console.log("sagas generatePromoProdDataFetch url", host_url + `/api/reporting/promo_prod/?` + weekurlparam + '&' + urlParamsString + '&' + promoprodparam + '&' + weekselection + '&' + userParams)

  let urlAppends = ""

  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(promoprodparam) == "undefined") && !(promoprodparam == "")) {
    urlAppends = urlAppends + '&' + promoprodparam;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends1', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }
  console.log('urlAppends6', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/promo_prod?` + urlAppends);
  // const data = yield call(request,host_url + `/api/reporting/promo_prod/?` + weekurlparam + '&' + urlParamsString + '&' + promoprodparam + '&' + weekselection + '&' + userParams);

  yield put(PromoProdDataFetchSuccess(data));


  let spinnerCheck = 1;
  console.log('spinnerCheck');
  yield put(productsCountSplitSuccess(spinnerCheck));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doPromoProdFetch() {
  console.log('sagas doPromoProdFetch ', PROMO_PROD_CONSTANT);
  const watcher = yield takeLatest(PROMO_PROD_CONSTANT, generatePromoProdDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO PART DATA
export function* generatePromoPartDataFetch() {
  const urlName = yield select(selectPromotionDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString = urlName.get('urlParamsString');
  let promopartparam = urlName.get('promo_part_param');
  let weekselection = urlName.get('weekurlParam');
  const kpiparam = urlName.get('kpi_param');
  if (!urlParamsString) {
    urlParamsString = ''
  }
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }

  let urlAppends = "";
  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlAppends = urlAppends + '&' + weekurlparam;
    console.log('urlAppends55', urlAppends);
  } else {

  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlAppends = urlAppends + '&' + urlParamsString;
    console.log('urlAppends44', urlAppends);
  } else {

  }

  if (!(typeof(promopartparam) == "undefined") && !(promopartparam == "")) {
    urlAppends = urlAppends + '&' + promopartparam;
    console.log('urlAppends33', urlAppends);
  } else {

  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlAppends = urlAppends + '&' + kpiparam;
    console.log('urlAppends22', urlAppends);
  } else {

  }

  if (!(typeof(weekselection) == "undefined") && !(weekselection == "")) {
    urlAppends = urlAppends + '&' + weekselection;
    console.log('urlAppends22', urlAppends);
  } else {

  }

  if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
    urlAppends = urlAppends + '&' + userParams;
    console.log('urlAppends11', urlAppends);
  } else {

  }

  if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
    urlAppends = urlAppends.replace('&', '');
  }

  console.log('urlAppends61', urlAppends);

  const data = yield call(request, host_url + `/api/reporting/promo_part?` + urlAppends);
  yield put(PromoPartDataFetchSuccess(data));

  let spinnerCheck = 1;
  yield put(promoParticipationBySplitSuccess(spinnerCheck));
  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doPromoPartFetch() {
  console.log('sagas doPromoPartFetch ', PROMO_PART_CONSTANT);
  const watcher = yield takeLatest(PROMO_PART_CONSTANT, generatePromoPartDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO FILTER DATA
export function* generateFilterFetch() {
  try {
    // todo: update url

    let urlName = yield select(selectPromotionDomain());
    // let urlParams = urlName.get('filter_selection');
    // let weekurlparams = urlName.get('filter_week_selection');
    console.log(host_url + '/api/reporting/promo_filter_data?');

    // if (urlParams==='')
    // {urlParams='default'
    // }
    let urlParamsString = urlName.get('urlParamsString')
    if (!urlParamsString) {
      urlParamsString = ''
    }
    if (typeof(urlParamsString) == "undefined") {
      urlParamsString = "";
    } else {
      let urlParamsStringCheck = urlParamsString.substring(0, 2);
      if (urlParamsStringCheck == 20) {
        urlParamsString = urlParamsString.substring(14, urlParamsString.length);
      }
    }

    let urlAppends = ""

    if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
      urlAppends = urlAppends + '&' + urlParamsString;
      console.log('urlAppends1', urlAppends);
    } else {

    }
    if (!(typeof(userParams) == "undefined") && !(userParams == "")) {
      urlAppends = urlAppends + '&' + userParams;
      console.log('urlAppends1', urlAppends);
    } else {

    }

    if (!(typeof(urlAppends) == "undefined") && !(urlAppends == "")) {
      urlAppends = urlAppends.replace('&', '');
    }
    console.log('urlAppends6', urlAppends);


    const data = yield call(request,host_url + '/api/reporting/promo_filter_data?' + urlAppends);

    yield put(FilterFetchSuccess(data));
  } catch (err) {
    // //console.log(err);
  }
}


export function* doFilterFetch() {
  console.log('sagas doFilterFetch ', FILTER_CONSTANT);
  const watcher = yield takeLatest(FILTER_CONSTANT, generateFilterFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO WEEK FILTER DATA
export function* generateWeekFilterFetch() {
  try {
    // todo: update url
    console.log("Inside generateWeekFilterFetch")
    let urlName = yield select(selectPromotionDomain());
    let weekurlparams = urlName.get('weekurlParam');


    // if (urlParams==='')
    // {urlParams='default'
    // }
    // let urlParamsString =urlName.get('urlParamsString')
    // if(!urlParamsString){
    //   urlParamsString=''
    // }

    const data = yield call(request, host_url + '/api/reporting/week_promo_filter_data?' + weekurlparams);

    console.log(host_url + '/api/reporting/week_promo_filter_data?' + weekurlparams);
    yield put(WeekFilterFetchSuccess(data));
  } catch (err) {
    console.log(err);
  }
}


export function* doWeekFilterFetch() {
  console.log('sagas doFilterFetch ', WEEK_FILTER_CONSTANT);
  const watcher = yield takeLatest(WEEK_FILTER_CONSTANT, generateWeekFilterFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// All sagas to be loaded
export default [
  defaultSaga,
  doPromoKpiFetch,
  doPromoSalesFetch,
  doPromoGiveawayFetch,
  doFilterFetch,
  doPromoProdFetch,
  doPromoPartFetch,
  doWeekFilterFetch
];

