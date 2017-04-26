
import {
  DEFAULT_ACTION,
  KPI_CONSTANT,
  SALES_CONSTANT,
  PROMO_INFO_CONSTANT
  // FILTER_CONSTANT,
  // FILTER_FETCH_SUCCESS,
  // CHECKBOX_CHANGE
} from './constants';


import {PromoKpiDataFetchSuccess,PromoSalesDataFetchSuccess,PromoInfoDataFetchSuccess} from 'containers/Promotion/actions';
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


let host_url="http://172.20.246.60:8000";
// All sagas to be loaded



// FOR PROMO BOXES
export function* generatePromoKpiDataFetch() {
  const urlName = yield select(selectPromotionDomain());
  const weekurlparam = urlName.get('week_param');
  const filterurlparam ='';
//  const filterurlparam = urlName.get('urlParamsString');
  const kpiparam = urlName.get('kpi_param');
  console.log("sagas Week parameter", weekurlparam);
//  console.log("Filter parameter", filterurlparam);
  console.log("sagas kpiparam ", kpiparam);
  console.log("sagas kpiparam url",host_url+`/api/reporting/promo_kpi?`+ weekurlparam + '&' + filterurlparam + '&' + kpiparam)
  const data = yield call(request,
    host_url+`/api/reporting/promo_kpi?`+ weekurlparam + '&' + filterurlparam + '&' + kpiparam);
  console.log("Heres the kpi data",data);
  yield put(PromoKpiDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}


export function* doPromoKpiFetch() {
  const watcher = yield takeLatest(KPI_CONSTANT, generatePromoKpiDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR PROMO SALES DATA
export function* generatePromoSalesDataFetch() {
  const urlName = yield select(selectPromotionDomain());
  const weekurlparam = urlName.get('week_param');
  const filterurlparam ='';
//  const filterurlparam = urlName.get('urlParamsString');
  const kpiparam = urlName.get('kpi_param');
  console.log("sagas Week parameter", weekurlparam);
//  console.log("Filter parameter", filterurlparam);
  console.log("sagas kpiparam ", kpiparam);
  console.log("sagas kpiparam url",host_url+`/api/reporting/promo_sales?`+ weekurlparam + '&' + filterurlparam + '&' + kpiparam)
  const data = yield call(request,
    host_url+`/api/reporting/promo_sales?` + weekurlparam + '&' + filterurlparam + '&' + kpiparam);
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


// FOR PROMO INFO DATA
export function* generatePromoInfoDataFetch() {
  const urlName = yield select(selectPromotionDomain());
  const weekurlparam = urlName.get('week_param');
  const filterurlparam ='';
//  const filterurlparam = urlName.get('urlParamsString');
 // const kpiparam = urlName.get('kpi_param');
  console.log("sagas Week parameter", weekurlparam);
//  console.log("Filter parameter", filterurlparam);

  console.log("sagas kpiparam url",host_url+`/api/reporting/promo_info?`+ weekurlparam + '&' + filterurlparam )
  const data = yield call(request,
    host_url+`/api/reporting/promo_sales?` + weekurlparam + '&' + filterurlparam );
  console.log("Heres the promo sales data",data);
  console.log("sagas generatePromoInfoDataFetch ",data)
  yield put(PromoInfoDataFetchSuccess(data));

  // } catch (err) {
  //   // console.log(err);
  // }
}


export function* doPromoInfoFetch() {
  console.log('sagas doPromoInfoFetch ',PROMO_INFO_CONSTANT);
  const watcher = yield takeLatest(PROMO_INFO_CONSTANT, generatePromoInfoDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}



// All sagas to be loaded
export default [
  defaultSaga,
  doPromoKpiFetch,
  doPromoSalesFetch,
  doPromoInfoFetch
];

