
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


import {PromoKpiDataFetchSuccess,PromoSalesDataFetchSuccess,PromoGiveawayDataFetchSuccess,
PromoProdDataFetchSuccess,PromoPartDataFetchSuccess,FilterFetchSuccess,WeekFilterFetchSuccess}
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


let host_url="http://dvcmpapp00001uk.dev.global.tesco.org";
// All sagas to be loaded



// FOR PROMO BOXES
export function* generatePromoKpiDataFetch() {
  const urlName = yield select(selectPromotionDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
  }
  const kpiparam = urlName.get('kpi_param');
  console.log("sagas Week parameter", weekurlparam);
//  console.log("Filter parameter", filterurlparam);
  console.log("sagas kpiparam ", kpiparam);
  console.log("sagas kpiparam url",host_url+`/api/reporting/promo_kpi?`+ weekurlparam + '&' + urlParamsString + '&' + kpiparam+ '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/promo_kpi?`+ weekurlparam + '&' + urlParamsString + '&' + kpiparam+ '&' + weekselection);
  console.log("Heres the kpi data",data);
  yield put(PromoKpiDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}


export function* doPromoKpiFetch() {
  console.log('sagas doPromoKpiFetch ',KPI_CONSTANT);
  const watcher = yield takeLatest(KPI_CONSTANT, generatePromoKpiDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO SALES DATA
export function* generatePromoSalesDataFetch() {
  const urlName = yield select(selectPromotionDomain());
  const weekurlparam = urlName.get('week_param');
  const salesparam = urlName.get('sales_param');
  let urlParamsString =urlName.get('urlParamsString');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
  }
  const kpiparam = urlName.get('kpi_param');
  console.log("sagas Week parameter", weekurlparam);
//  console.log("Filter parameter", filterurlparam);
  console.log("sagas promo_sales ", kpiparam);
  console.log("sagas promo_sales url",host_url+`/api/reporting/promo_sales?`+ weekurlparam + '&' + urlParamsString + '&' + kpiparam+'&'+salesparam+ '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/promo_sales?`+ weekurlparam + '&' + urlParamsString + '&' + kpiparam+'&'+salesparam+ '&' + weekselection);
  console.log("Heres the promo sales data",data);
  yield put(PromoSalesDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}


export function* doPromoSalesFetch() {
  console.log('sagas doPromoSalesFetch ',SALES_CONSTANT);
  const watcher = yield takeLatest(SALES_CONSTANT, generatePromoSalesDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO GIVEAWAY DATA
export function* generatePromoGiveawayDataFetch() {
  const urlName = yield select(selectPromotionDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let giveawayparam = urlName.get('giveaway_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
  }
//  const filterurlparam = urlName.get('urlParamsString');
 // const kpiparam = urlName.get('kpi_param');
  console.log("sagas Week parameter", weekurlparam);
//  console.log("Filter parameter", filterurlparam);

  console.log("sagas generatePromoGiveawayDataFetch url",host_url+`/api/reporting/promo_giveaway/?`+ weekurlparam + '&' + urlParamsString +'&'+giveawayparam+ '&' + weekselection)
  const data = yield call(request,
    host_url+`/api/reporting/promo_giveaway/?` + weekurlparam + '&' + urlParamsString +'&'+giveawayparam+ '&' + weekselection );
  console.log("Heres the promo sales data",data);
  console.log("sagas generatePromoGiveawayDataFetch ",data)
  yield put(PromoGiveawayDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}


export function* doPromoGiveawayFetch() {
  console.log('sagas doPromoGiveawayFetch ',PROMO_GIVEAWAY_CONSTANT);
  const watcher = yield takeLatest(PROMO_GIVEAWAY_CONSTANT, generatePromoGiveawayDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}



// FOR PROMO PROD DATA
export function* generatePromoProdDataFetch() {
  const urlName = yield select(selectPromotionDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let promoprodparam = urlName.get('promo_prod_param');
  let weekselection =urlName.get('weekurlParam');

  if(!urlParamsString){
    urlParamsString=''
  }
//  const filterurlparam = urlName.get('urlParamsString');
  // const kpiparam = urlName.get('kpi_param');
  console.log("sagas Week parameter", weekurlparam);
//  console.log("Filter parameter", filterurlparam);

  console.log("sagas generatePromoProdDataFetch url",host_url+`/api/reporting/promo_prod/?`+ weekurlparam + '&' + urlParamsString + '&' + promoprodparam+ '&' + weekselection )
  const data = yield call(request,
    host_url+`/api/reporting/promo_prod/?` + weekurlparam + '&' + urlParamsString + '&' + promoprodparam+ '&' + weekselection);
  console.log("Heres the promo sales data",data);
  console.log("sagas generatePromoProdDataFetch ",data)
  yield put(PromoProdDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doPromoProdFetch() {
  console.log('sagas doPromoProdFetch ',PROMO_PROD_CONSTANT);
  const watcher = yield takeLatest(PROMO_PROD_CONSTANT, generatePromoProdDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO PART DATA
export function* generatePromoPartDataFetch() {
  const urlName = yield select(selectPromotionDomain());
  const weekurlparam = urlName.get('week_param');
  let urlParamsString =urlName.get('urlParamsString');
  let promopartparam = urlName.get('promo_part_param');
  let weekselection =urlName.get('weekurlParam');
  if(!urlParamsString){
    urlParamsString=''
  }
//  const filterurlparam = urlName.get('urlParamsString');
  // const kpiparam = urlName.get('kpi_param');
  console.log("sagas Week parameter", weekurlparam);
//  console.log("Filter parameter", filterurlparam);

  console.log("sagas generatePromoPartDataFetch url",host_url+`/api/reporting/promo_part/?`+ weekurlparam + '&' + urlParamsString + '&' + promopartparam+ '&' + weekselection);
  const data = yield call(request,
    host_url+`/api/reporting/promo_part/?` + weekurlparam + '&' + urlParamsString + '&' + promopartparam+ '&' + weekselection);
  console.log("Heres the promo sales data",data);
  console.log("sagas generatePromoPartDataFetch ",data)
  yield put(PromoPartDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}

export function* doPromoPartFetch() {
  console.log('sagas doPromoPartFetch ',PROMO_PART_CONSTANT);
  const watcher = yield takeLatest(PROMO_PART_CONSTANT, generatePromoPartDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO FILTER DATA
export function* generateFilterFetch() {
  try {
    // todo: update url

    console.log("Inside generateFilterFetch")
    let urlName=yield select(selectPromotionDomain());
    // let urlParams = urlName.get('filter_selection');
    // let weekurlparams = urlName.get('filter_week_selection');
    console.log(host_url+'/api/reporting/promo_filter_data?');

    // if (urlParams==='')
    // {urlParams='default'
    // }
    let urlParamsString =urlName.get('urlParamsString')
    if(!urlParamsString){
     urlParamsString=''
    }

    const data = yield call(request, host_url+'/api/reporting/promo_filter_data?' + urlParamsString);

    // console.log(host_url+'/api/reporting/filter_data_week?');
    // const data2 = yield call(request, host_url+'/api/reporting/filter_data_week?' );
    // console.log("sagas generateFilterFetch data2",data2)
    // const data = yield call(request, `http://localhost:8090/wash/?format=json`);
    // const data = yield call(request, `http://10.1.161.82:8000/ranging/npd_view/filter_data?`);
    // const filter_data = {"filter_data": data, "week_data": data2 }
    // // //console.log(data);
    yield put(FilterFetchSuccess(data));
  } catch (err) {
    // //console.log(err);
  }
}



export function* doFilterFetch() {
  console.log('sagas doFilterFetch ',FILTER_CONSTANT);
  const watcher = yield takeLatest(FILTER_CONSTANT, generateFilterFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}



// FOR PROMO WEEK FILTER DATA
export function* generateWeekFilterFetch() {
  try {
    // todo: update url

    console.log("Inside generateWeekFilterFetch")
    let urlName=yield select(selectPromotionDomain());
    let weekurlparams = urlName.get('weekurlParam');


    // if (urlParams==='')
    // {urlParams='default'
    // }
    // let urlParamsString =urlName.get('urlParamsString')
    // if(!urlParamsString){
    //   urlParamsString=''
    // }

    const data = yield call(request, host_url+'/api/reporting/promo_filter_data_week?' + weekurlparams);

    console.log(host_url+'/api/reporting/promo_filter_data_week?'+ weekurlparams);

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
  doPromoKpiFetch,
  doPromoSalesFetch,
  doPromoGiveawayFetch,
  doFilterFetch,
  doPromoProdFetch,
  doPromoPartFetch,
  doWeekFilterFetch
];

