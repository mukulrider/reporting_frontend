// import { take, call, put, select } from 'redux-saga/effects';
import {
  KPI_CONSTANT,
  TOP_BOTTOM_CONSTANT,
  KPI_ASP_CONSTANT,
  GENERATE_URL_PARAMS_STRING,
  WEEK_FILTER_CONSTANT,
  GRAPH_FETCH,
  GENERATE_TABLE,
} from './constants';
import {
  kpiboxDataFetchSucess,
  SupplierTableDataFetchSuccess,
  topBottomChartFetchSuccess,
  generateSideFilterSuccess,
  WeekFilterFetchSuccess,
  fetchGraphSuccess,
  generateTableSuccess,
  generateCheckedList,
  kpiboxAspDataFetchSucess,
  supplierViewKpiSpinnerCheckSuccess,
  bubbleChartSpinnerCheckSuccess,
  barChartSpinnerCheckSuccess,
  tableChartSpinnerCheckSuccess,
  GenerateUrlParamsString3,
} from 'containers/Supplier/actions';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
import {MultiList} from 'react-multi-dropdown';
// Individual exports for testing
import {
  selectSupplierDomain
} from 'containers/Supplier/selectors';

export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

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

const userParamsAuth = gettingUserDetails();

// let host_url = "127.0.0.1:3000"
let host_url = "http://dvcmpapp00001uk.dev.global.tesco.org";
// FOR SUPPLIER POPUP TABLE

export function* generateDataFetch() {
  console.log('inside kpi');
  const urlName = yield select(selectSupplierDomain());
  // const weekurlparam = urlName.get('week_param');
  // const kpiparam = urlName.get('kpi_param');


  // CREATING 1 PARAMETER FOR APPENDING TO URL

  let urlParams = "";

  //*********************** FILTERS PARAMETERS ***********************
  // FOR TESCO WEEK
  let filter_week_selection = "";
  filter_week_selection = urlName.get('filter_week_selection');

  if (!(typeof(filter_week_selection) == "undefined") && !(filter_week_selection == "")) {
    filter_week_selection = urlName.get('filter_week_selection');
    console.log("filter_week_selection if", filter_week_selection);
  } else {
    filter_week_selection = "";
    console.log("filter_week_selection else", filter_week_selection);
  }

  if (!(typeof(filter_week_selection) == "undefined") && !(filter_week_selection == "")) {
    urlParams = filter_week_selection + '&';
    console.log("filter_week_selection urlParams if", urlParams);
  } else {
    console.log("filter_week_selection urlParams else", urlParams);
  }


  // FOR OTHER FILTERS EXCEPT TESCO WEEK

  let urlParamsString = urlName.get('urlParamsString');
  if (typeof(urlParamsString) == "undefined") {

    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlParams = urlParams + "&" + urlParamsString;
    console.log("urlParamsString urlParams if", urlParams);

  } else {
    console.log("urlParamsString urlParams else", urlParams);
  }

  //*********************** FILTERS PARAMETERS ENDED ***********************

  //*********************** KPI PARAMETERS *********************************
  let kpiparam = "";
  kpiparam = urlName.get('kpi_param');

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    kpiparam = urlName.get('kpi_param');
    console.log("urlParams if", urlParams);
  } else {
    kpiparam = "";
    console.log("kpiparam else", kpiparam);
  }

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlParams = urlParams + "&" + kpiparam;
    console.log("urlParams urlParams if", urlParams);
  } else {
    console.log("urlParams urlParams else", urlParams);
  }

  //*********************** WEEK TAB PARAMETERS *********************************
  let weekurlparam = "";
  weekurlparam = urlName.get('week_param');

  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    weekurlparam = urlName.get('week_param') + '&';
    console.log("weekurlparam if", weekurlparam);
  } else {
    weekurlparam = "";
    console.log("weekurlparam else", weekurlparam);
  }

  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlParams = urlParams + "&" + weekurlparam;
    console.log("weekurlparam urlParams if", urlParams);
  } else {
    console.log("weekurlparam urlParams else", urlParams);
  }

  console.log('userParamsAuth for supp', userParamsAuth);

  let storeParam = urlName.get('store_filter_param')
  if (!(typeof(storeParam) == "undefined") && !(storeParam == "")) {
    urlParams = urlParams + "&" + storeParam;
    console.log("storeParam urlParams if", urlParams);
  } else {
    console.log("storeParam urlParams else", urlParams);
  }


  if (!(typeof(userParamsAuth) == "undefined") && !(userParamsAuth == "")) {
    urlParams = urlParams + "&" + userParamsAuth;
  } else {
  }

  if (!(typeof(urlParams) == "undefined") && !(urlParams == "")) {
    urlParams = urlParams.replace('&', '');
  }

  console.log('final param kpi', urlParams);

  try {

    console.log('filter url', host_url + `/api/reporting/supplier_view_kpi?` + urlParams);
    const data = yield call(request, host_url + `/api/reporting/supplier_view_kpi?` + urlParams);

    yield put(kpiboxDataFetchSucess(data));

    let supplierViewKpiSpinnerCheck = 1;
    yield put(supplierViewKpiSpinnerCheckSuccess(supplierViewKpiSpinnerCheck));

  } catch (err) {
    // console.log(err);
  }
}


export function* doKPIFetch() {
  const watcher = yield takeLatest(KPI_CONSTANT, generateDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR SUPPLIER TABLE

export function* generateDataFetch4() {

  const urlName = yield select(selectSupplierDomain());
  // const weekurlparam = urlName.get('week_param');
  // const kpiparam = urlName.get('kpi_param');


  // CREATING 1 PARAMETER FOR APPENDING TO URL

  let urlParams = "";

  //*********************** FILTERS PARAMETERS ***********************
  // FOR TESCO WEEK
  let filter_week_selection = "";
  filter_week_selection = urlName.get('filter_week_selection');

  if (!(typeof(filter_week_selection) == "undefined") && !(filter_week_selection == "")) {
    urlParams = urlParams + '&' + filter_week_selection;
    console.log("filter_week_selection urlParams if", urlParams);
  } else {
    console.log("filter_week_selection urlParams else", urlParams);
  }


  // FOR OTHER FILTERS EXCEPT TESCO WEEK

  let urlParamsString = urlName.get('urlParamsString');
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlParams = urlParams + "&" + urlParamsString;
    console.log("urlParamsString urlParams if", urlParams);

  } else {
    console.log("urlParamsString urlParams else", urlParams);
  }

  //*********************** FILTERS PARAMETERS ENDED ***********************

  //*********************** KPI PARAMETERS *********************************
  let kpiparam = "";
  kpiparam = urlName.get('kpi_param');

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlParams = urlParams + "&" + kpiparam;
    console.log("urlParams urlParams if", urlParams);
  } else {
    console.log("urlParams urlParams else", urlParams);
  }

  //*********************** WEEK TAB PARAMETERS *********************************
  let weekurlparam = "";
  weekurlparam = urlName.get('week_param');

  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlParams = urlParams + "&" + weekurlparam;
    console.log("weekurlparam urlParams if", urlParams);
  } else {
    console.log("weekurlparam urlParams else", urlParams);
  }

  let storeParam = urlName.get('store_filter_param')
  if (!(typeof(storeParam) == "undefined") && !(storeParam == "")) {
    urlParams = urlParams + "&" + storeParam;
    console.log("storeParam urlParams if", urlParams);
  } else {
    console.log("storeParam urlParams else", urlParams);
  }


  if (!(typeof(userParamsAuth) == "undefined") && !(userParamsAuth == "")) {
    urlParams = urlParams + "&" + userParamsAuth;
  } else {

  }

  if (!(typeof(urlParams) == "undefined") && !(urlParams == "")) {
    urlParams = urlParams.replace('&', '');
  }

  console.log('urlParams1', urlParams);


  try {
    const data = yield call(request, host_url + `/api/reporting/supplier_view_sku_rsp?` + urlParams);

    yield put(kpiboxAspDataFetchSucess(data));

  } catch (err) {
    // console.log(err);
  }
}

export function* doKPIAspFetch() {
  const watcher = yield takeLatest(KPI_ASP_CONSTANT, generateDataFetch4);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


export function* generateDataFetch3() {
  // const urlParams = urlName.get('reducer');
  const urlName = yield select(selectSupplierDomain());
  // console.log("inside sagas.js", urlParams);
  // const weekurlparam = urlName.get('week_param');
  // const topbottomkpi = urlName.get('top_bottom_kpi');
  // const kpiparam = urlName.get('kpi_param');


  // CREATING 1 PARAMETER FOR APPENDING TO URL

  let urlParams = "";

  //*********************** FILTERS PARAMETERS ***********************
  // FOR TESCO WEEK
  let filter_week_selection = "";
  filter_week_selection = urlName.get('filter_week_selection');


  if (!(typeof(filter_week_selection) == "undefined") && !(filter_week_selection == "")) {
    urlParams = urlParams + '&' + filter_week_selection;
    console.log("filter_week_selection urlParams if", urlParams);
  } else {

  }

  // FOR OTHER FILTERS EXCEPT TESCO WEEK

  let urlParamsString = urlName.get('urlParamsString');
  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlParams = urlParams + "&" + urlParamsString;
    console.log("urlParamsString urlParams if", urlParams);

  } else {
    console.log("urlParamsString urlParams else", urlParams);
  }

  //*********************** FILTERS PARAMETERS ENDED ***********************

  //*********************** KPI PARAMETERS *********************************
  let kpiparam = "";
  kpiparam = urlName.get('kpi_param');

  if (!(typeof(kpiparam) == "undefined") && !(kpiparam == "")) {
    urlParams = urlParams + "&" + kpiparam;
    console.log("urlParams urlParams if", urlParams);
  } else {
    console.log("urlParams urlParams else", urlParams);
  }

//*********************** TOP BOTTOM KPI PARAMETERS *********************************
  let topbottomkpi = "";
  topbottomkpi = urlName.get('top_bottom_kpi');

  if (!(typeof(topbottomkpi) == "undefined") && !(topbottomkpi == "")) {
    urlParams = urlParams + "&" + topbottomkpi;
    console.log("urlParams topbottomkpi if", topbottomkpi);
  } else {
    console.log("urlParams topbottomkpi else", topbottomkpi);
  }

  //*********************** WEEK TAB PARAMETERS *********************************
  let weekurlparam = "";
  weekurlparam = urlName.get('week_param');

  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlParams = urlParams + "&" + weekurlparam;
    console.log("weekurlparam urlParams if", urlParams);
  } else {
    console.log("weekurlparam urlParams else", urlParams);
  }

  let storeParam = urlName.get('store_filter_param')
  if (!(typeof(storeParam) == "undefined") && !(storeParam == "")) {
    urlParams = urlParams + "&" + storeParam;
    console.log("storeParam urlParams if", urlParams);
  } else {
    console.log("storeParam urlParams else", urlParams);
  }

  if (!(typeof(userParamsAuth) == "undefined") && !(userParamsAuth == "")) {
    urlParams = urlParams + "&" + userParamsAuth;
    console.log("userParamsAuth if", urlParams);
  } else {
    console.log("userParamsAuth else", urlParams);
  }

  if (!(typeof(urlParams) == "undefined") && !(urlParams == "")) {
    urlParams = urlParams.replace('&', '');
  }

  console.log('urlParams2', urlParams);

  try {
    const topbot_data = yield call(request,
      host_url + `/api/reporting/supplier_view_top_bottom?` + urlParams);
    // host_url + `/api/reporting/supplier_view_top_bottom?` + weekurlparam + '&' + topbottomkpi + '&' + kpiparam);

    yield put(topBottomChartFetchSuccess(topbot_data));
    let barChartSpinnerCheck = 1;
    yield put(barChartSpinnerCheckSuccess(barChartSpinnerCheck));
  } catch (err) {
    // console.log(err);
  }
}

export function* doSupplierTopBotFetch() {
  const watcher = yield takeLatest(TOP_BOTTOM_CONSTANT, generateDataFetch3);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


//FOR GETTING FILTERS DATA
export function* generateSideFilter() {
  console.log('in bigger fn');
  let urlName = yield select(selectSupplierDomain());
  console.log('in bigger urlName', urlName);
  let urlParamsString = urlName.get('urlParamsString');
  console.log('in bigger urlParamsString', urlParamsString);

  let urlParamsString2 = urlName.get('urlParamsString2');
  console.log('in bigger urlParamsString2', urlParamsString2);

  let urlParamsString3 = urlName.get('urlParamsString3');
  console.log('in bigger urlParamsString3', urlParamsString3);


  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);

    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }

  if (urlParamsString3 == 1) {
    console.log('urlParamsString3 == 1 if',urlParamsString3);
    if (!(urlParamsString2 == "")) {
      urlParamsString = '?' + urlParamsString2;
      console.log('urlParamsString3 == 1 if if',urlParamsString);
    } else {
      urlParamsString = '?';
      console.log('urlParamsString3 == 1 if if else',urlParamsString);
    }
  } else {
    urlParamsString = '?' + urlParamsString;
    console.log('urlParamsString else',urlParamsString);
  }
  console.log('in bigger before try1', urlParamsString);
  console.log('calling url', host_url + `/api/reporting/filter_supplier` + urlParamsString  + '&' + userParamsAuth.replace('&', ''));


  try {
    const filter_data = yield call(request,
      host_url + `/api/reporting/filter_supplier` + urlParamsString  + '&' + userParamsAuth);
    console.log('filter_data', filter_data);
    yield put(generateSideFilterSuccess(filter_data));
    yield put(GenerateUrlParamsString3(0));
  } catch (err) {
    // console.log(err);
  }
}

//FOR GETTING FILTERS DATA
export function* doGenerateSideFilter() {
  console.log('filters prod called');
  const watcher = yield takeLatest(GENERATE_URL_PARAMS_STRING, generateSideFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// FOR SUPPLIER WEEK FILTER DATA
export function* generateWeekFilterFetch() {
  try {
    // todo: update url

    console.log("Inside generateWeekFilterFetch")
    let urlName = yield select(selectSupplierDomain());
    let weekurlparams = urlName.get('weekurlParam');
    // console.log("AAA", weekurlparams);
    // console.log(host_url + '/api/reporting/promo_filter_data?');
    // console.log('/api/reporting/promo_filter_data?');

    // if (urlParams==='')
    // {urlParams='default'
    // }
    // let urlParamsString =urlName.get('urlParamsString')
    // if(!urlParamsString){
    //   urlParamsString=''
    // }

    let filter_week_selection = "";
    filter_week_selection = urlName.get('filter_week_selection');
    let urlParams = "";
    if (!(typeof(filter_week_selection) == "undefined") && !(filter_week_selection == "")) {
      filter_week_selection = urlName.get('filter_week_selection');
      filter_week_selection = '?' + filter_week_selection;
      // console.log("filter_week_selection", filter_week_selection);
    } else {
      filter_week_selection = "?";
    }

    // if (!(filter_week_selection == "")) {
    //   let urlParams = filter_week_selection;
    //   console.log("urlParams1",urlParams);
    // } else {
    //   console.log("empty1");
    // }
    //
    // if (!(urlParams === "")) {
    //   urlParams = "?" + urlParams.replace('&', '');
    //   console.log("urlParams2",urlParams);
    // } else {
    //   console.log("typeof(urlParams)",!(urlParams === ""));
    //   console.log("typeof(urlParams)2",urlParams);
    //   console.log("else1");
    // }


    const data = yield call(request, host_url + '/api/reporting/supplier_filter_data_week' + filter_week_selection);

    // console.log(host_url + '/api/reporting/filter_data_week' + filter_week_selection);

    // const data = yield call(request, `http://10.1.161.82:8002/ranging/npd_view/filter_data?`);

    console.log("Filter week data", data);
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

// FOR SUPPLIER TABLE
//////////////////////////// SELECTION FOR SUPPLIER BUBBLE AND TABLE
export function* generateTable() {

  let urlName = yield select(selectSupplierDomain());
  //  Getting the url parameters for filters

  // let urlParams = urlName.get('urlParamsString');

  let weekParams = urlName.get('week_param');

  let storeParams = urlName.get('dataStoreUrlParams');
  let performanceParams = urlName.get('dataPerformanceUrlParams');

  let pageParams = urlName.get('dataPageUrlParams');
  let searchParams = urlName.get('textBoxQueryString');

  let SelectionState = '';

  if (weekParams !== '') {

    SelectionState = SelectionState + '&' + weekParams
    console.log('weekparams', SelectionState);

  }

  if (storeParams !== '') {

    SelectionState = SelectionState + '&' + storeParams
    console.log('storeparams', SelectionState);

  }

  if (performanceParams !== '') {

    SelectionState = SelectionState + '&' + performanceParams

  }

  if (searchParams !== '') {

    SelectionState = SelectionState + '&search=' + searchParams

  }

  if (pageParams !== '') {

    SelectionState = SelectionState + '&' + pageParams

  }


  // CREATING 1 PARAMETER FOR APPENDING TO URL

  let urlParams = "";

  //*********************** FILTERS PARAMETERS ***********************
  // FOR TESCO WEEK
  let filter_week_selection = "";
  filter_week_selection = urlName.get('filter_week_selection');

  if (!(typeof(filter_week_selection) == "undefined") && !(filter_week_selection == "")) {
    urlParams = filter_week_selection + '&';
    console.log("filter_week_selection urlParams if", urlParams);
  } else {
    console.log("filter_week_selection urlParams else", urlParams);
  }

  // FOR OTHER FILTERS EXCEPT TESCO WEEK

  let urlParamsString = urlName.get('urlParamsString');
  if (typeof(urlParamsString) == "undefined") {

    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlParams = urlParams + "&" + urlParamsString;
    console.log("urlParamsString urlParams if", urlParams);

  } else {
    console.log("urlParamsString urlParams else", urlParams);
  }

  //*********************** FILTERS PARAMETERS ENDED ***********************

  //*********************** WEEK TAB PARAMETERS *********************************
  let weekurlparam = "";
  weekurlparam = urlName.get('week_param');

  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlParams = urlParams + "&" + weekurlparam;
  } else {

  }

  // if (!(urlParams == "")) {
  //   urlParams = '?' + urlParams
  //   urlParams = urlParams.replace('&', '');
  // }
  // console.log('final param', urlParams);
  //


  let ajaxSelection = '';

  ajaxSelection = SelectionState;
  // ajaxSelection = SelectionState.replace('&', '');

  console.log('ddd', ajaxSelection);

  if (!(typeof(ajaxSelection) == "undefined") && !(ajaxSelection == "")) {
    urlParams = urlParams + '&' + ajaxSelection;

    if (!(typeof(userParamsAuth) == "undefined") && !(userParamsAuth == "")) {
      urlParams = urlParams + "&" + userParamsAuth;
    } else {

    }

    let storeParam = urlName.get('store_filter_param')
    if (!(typeof(storeParam) == "undefined") && !(storeParam == "")) {
      urlParams = urlParams + "&" + storeParam;
      console.log("storeParam urlParams if", urlParams);
    } else {
      console.log("storeParam urlParams else", urlParams);
    }

    if (!(typeof(urlParams) == "undefined") && !(urlParams == "")) {
      urlParams = urlParams.replace('&', '');
    }

    console.log('urlParams 7', urlParams);


    const data = yield call(request, host_url + `/api/reporting/supplier_view_table_bubble?` + urlParams);

    yield put(generateTableSuccess(data));

    let tableChartSpinnerCheck = 1;
    yield put(tableChartSpinnerCheckSuccess(tableChartSpinnerCheck));

  }

  else {
    console.log('data12');

    let storeParam = urlName.get('store_filter_param')
    if (!(typeof(storeParam) == "undefined") && !(storeParam == "")) {
      urlParams = urlParams + "&" + storeParam;
      console.log("storeParam urlParams if", urlParams);
    } else {
      console.log("storeParam urlParams else", urlParams);
    }

    if (!(typeof(userParamsAuth) == "undefined") && !(userParamsAuth == "")) {
      urlParams = urlParams + "&" + userParamsAuth;
    } else {

    }

    if (!(typeof(urlParams) == "undefined") && !(urlParams == "")) {
      urlParams = urlParams.replace('&', '');
    }

    console.log('urlParams 7', urlParams);

    const data = yield call(request, host_url + `/api/reporting/supplier_view_table_bubble?` + urlParams);

    yield put(generateTableSuccess(data));

    let tableChartSpinnerCheck = 1;
    yield put(tableChartSpinnerCheckSuccess(tableChartSpinnerCheck));

  }


}

export function* doGenerateTable() {
  console.log('smaller fn');
  const watcher = yield takeLatest(GENERATE_TABLE, generateTable);

  yield take(LOCATION_CHANGE);

  yield cancel(watcher)

}

/* GENERATE GRAPH */

export function* generateGraph() {
  console.log('bbb');
  let urlName = yield select(selectSupplierDomain());
  //  Getting the url parameters for filters
  console.log('bbb');
  // let urlParams = urlName.get('urlParamsString');

  // let weekParams = urlName.get('week_param');

  let storeParams = urlName.get('dataStoreUrlParams');
  let performanceParams = urlName.get('dataPerformanceUrlParams');

  let SelectionState = '';

  // if (weekParams !== '') {
  //
  //   SelectionState = SelectionState + '&' + weekParams
  //   console.log('weekparams', SelectionState);
  //
  // }

  if (storeParams !== '') {

    SelectionState = SelectionState + '&' + storeParams

  }

  if (performanceParams !== '') {

    SelectionState = SelectionState + '&' + performanceParams
  }


  // CREATING 1 PARAMETER FOR APPENDING TO URL

  let urlParams = "";

  //*********************** FILTERS PARAMETERS ***********************
  // FOR TESCO WEEK
  let filter_week_selection = "";
  filter_week_selection = urlName.get('filter_week_selection');

  if (!(typeof(filter_week_selection) == "undefined") && !(filter_week_selection == "")) {
    urlParams = urlParams + "&" + filter_week_selection;
  } else {

  }

  // FOR OTHER FILTERS EXCEPT TESCO WEEK

  let urlParamsString = urlName.get('urlParamsString');
  if (typeof(urlParamsString) == "undefined") {

    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);
    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlParams = urlParams + "&" + urlParamsString;
    console.log("urlParamsString urlParams if", urlParams);

  } else {
    console.log("urlParamsString urlParams else", urlParams);
  }

  //*********************** FILTERS PARAMETERS ENDED ***********************

  //*********************** WEEK TAB PARAMETERS *********************************
  let weekurlparam = "";
  weekurlparam = urlName.get('week_param');

  if (!(typeof(weekurlparam) == "undefined") && !(weekurlparam == "")) {
    urlParams = urlParams + "&" + weekurlparam;
  } else {

  }

  // if (!(urlParams == "")) {
  //   urlParams = '?' + urlParams
  //   // urlParams = urlParams.replace('&', '');
  // }

  let ajaxSelection = '';

  ajaxSelection = SelectionState;
  // ajaxSelection = SelectionState.replace('&', '');


  if (!(typeof(ajaxSelection) == "undefined") && !(ajaxSelection == "")) {
    urlParams = urlParams + '&' + ajaxSelection;

    let storeParam = urlName.get('store_filter_param')
    if (!(typeof(storeParam) == "undefined") && !(storeParam == "")) {
      urlParams = urlParams + "&" + storeParam;
      console.log("storeParam urlParams if", urlParams);
    } else {
      console.log("storeParam urlParams else", urlParams);
    }

    if (!(typeof(userParamsAuth) == "undefined") && !(userParamsAuth == "")) {
      urlParams = urlParams + '&' + userParamsAuth;
      console.log('urlParams 5', urlParams);
    } else {

    }

    if (!(typeof(urlParams) == "undefined") && !(urlParams == "")) {
      urlParams = urlParams.replace('&', '');
    }

    console.log('urlParams 7', urlParams);

    const data = yield call(request, host_url + `/api/reporting/supplier_view_chart_bubble?` + urlParams);

    yield put(fetchGraphSuccess(data));

    let bubbleChartSpinnerCheck = 1;
    yield put(bubbleChartSpinnerCheckSuccess(bubbleChartSpinnerCheck));
  }

  else {

    if (!(typeof(userParamsAuth) == "undefined") && !(userParamsAuth == "")) {
      urlParams = urlParams + '&' + userParamsAuth;
      console.log('urlParams 5', urlParams);
    } else {

    }

    let storeParam = urlName.get('store_filter_param')
    if (!(typeof(storeParam) == "undefined") && !(storeParam == "")) {
      urlParams = urlParams + "&" + storeParam;
      console.log("storeParam urlParams if", urlParams);
    } else {
      console.log("storeParam urlParams else", urlParams);
    }

    if (!(typeof(urlParams) == "undefined") && !(urlParams == "")) {
      urlParams = urlParams.replace('&', '');
    }

    console.log('urlParams 7', urlParams);
    const data = yield call(request, host_url + `/api/reporting/supplier_view_chart_bubble?` + urlParams);

    yield put(fetchGraphSuccess(data));

    let bubbleChartSpinnerCheck = 1;
    yield put(bubbleChartSpinnerCheckSuccess(bubbleChartSpinnerCheck));


  }

}

export function* doGenerateGraph() {
  console.log('aaa');
  const watcher = yield takeLatest(GRAPH_FETCH, generateGraph);

  yield take(LOCATION_CHANGE);

  yield cancel(watcher)
}


// All sagas to be loaded
export default [
  defaultSaga,
  doKPIFetch,
  // doKPIAspFetch,
  doSupplierTopBotFetch,
  doGenerateSideFilter,
  doWeekFilterFetch,
  doGenerateTable,
  doGenerateGraph
];
