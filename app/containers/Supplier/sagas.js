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
  kpiboxAspDataFetchSucess
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
let host_url = "http://172.20.244.243:8000"
// let host_url = "http://172.20.244.228:8000"
// FOR SUPPLIER POPUP TABLE
export function* generateDataFetch() {
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
    urlParams = filter_week_selection;
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
    weekurlparam = urlName.get('week_param');
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

  if (!(urlParams == "")) {
    urlParams = '?' + urlParams
    // urlParams = urlParams.replace('&', '');
  }
  console.log('final param', urlParams);

  try {
    const data = yield call(request, host_url + `/api/reporting/supplier_view_kpi` + urlParams);
    // const data = yield call(request, host_url + `/api/reporting/supplier_view_kpi?` + weekurlparam + '&' + kpiparam);

    yield put(kpiboxDataFetchSucess(data));

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
    filter_week_selection = urlName.get('filter_week_selection');
    console.log("filter_week_selection if", filter_week_selection);
  } else {
    filter_week_selection = "";
    console.log("filter_week_selection else", filter_week_selection);
  }

  if (!(typeof(filter_week_selection) == "undefined") && !(filter_week_selection == "")) {
    urlParams = filter_week_selection;
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
    weekurlparam = urlName.get('week_param');
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

  if (!(urlParams == "")) {
    urlParams = '?' + urlParams
    // urlParams = urlParams.replace('&', '');
  }
  console.log('final param', urlParams);



  try {
    const data = yield call(request, host_url + `/api/reporting/supplier_view_sku_rsp?` + urlParams);
    // const data = yield call(request, host_url + `/api/reporting/supplier_view_sku_rsp?` + weekurlparam + '&' + kpiparam);
    console.log("Heres the kpi ASP data", data);
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
  // const weekurlparam = urlName.get('week_param');
  const topbottomkpi = urlName.get('top_bottom_kpi');
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
    urlParams = filter_week_selection;
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
    weekurlparam = urlName.get('week_param');
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

  if (!(urlParams == "")) {
    urlParams = '?' + urlParams
    // urlParams = urlParams.replace('&', '');
  }
  console.log('final param', urlParams);


  try {
    const topbot_data = yield call(request,
      host_url + `/api/reporting/supplier_view_top_bottom` + urlParams);
    // host_url + `/api/reporting/supplier_view_top_bottom?` + weekurlparam + '&' + topbottomkpi + '&' + kpiparam);
    yield put(topBottomChartFetchSuccess(topbot_data));
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
  let urlName = yield select(selectSupplierDomain());
  let urlParamsString = urlName.get('urlParamsString');

  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  } else {
    let urlParamsStringCheck = urlParamsString.substring(0, 2);

    if (urlParamsStringCheck == 20) {
      urlParamsString = urlParamsString.substring(14, urlParamsString.length);
    }
  }

  try {
    const filter_data = yield call(request,
      host_url + `/api/reporting/filter_supplier?${urlParamsString}`);
    console.log('filter_data', filter_data);
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
    let urlName = yield select(selectSupplierDomain());
    let weekurlparams = urlName.get('weekurlParam');
    console.log("AAA", weekurlparams);
    console.log(host_url + '/api/reporting/promo_filter_data?');
    console.log('/api/reporting/promo_filter_data?');

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
      console.log("filter_week_selection", filter_week_selection);
    } else {
      filter_week_selection = "";
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


    const data = yield call(request, host_url + '/api/reporting/filter_data_week' + filter_week_selection);

    console.log(host_url + '/api/reporting/filter_data_week' + filter_week_selection);

    // const data = yield call(request, `http://10.1.161.82:8000/ranging/npd_view/filter_data?`);

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
  console.log('bigger fn');
  let urlName = yield select(selectSupplierDomain());
  // let urlParams = urlName.get('urlParamsString');
  // console.log('urlParams--', urlParams);
  let weekParams = urlName.get('dataWeekUrlParams');
  let storeParams = urlName.get('dataStoreUrlParams');
  let performanceParams = urlName.get('dataPerformanceUrlParams');
  let bubbleParams = urlName.get('prodArrayTable')
  let treated_bubble_params = bubbleParams.replace(/[^=,\w\s]/gi, '');
  let treated_bubble_params2 = treated_bubble_params.replace(/,/g, "&");
  let pageParams = urlName.get('dataPageUrlParams');
  let searchParams = urlName.get('textBoxQueryString');
  let resetParams = urlName.get('resetUrlParams');
  if (resetParams !== '') {
    bubbleParams = '';
    performanceParams = '';
  }

  let SelectionState = '';
  if (!(typeof(weekParams) == "undefined") && weekParams !== '') {
    SelectionState = SelectionState + '&' + weekParams
  }
  if (!(typeof(storeParams) == "undefined") && storeParams !== '') {
    SelectionState = SelectionState + '&' + storeParams
  }
//This appends quartile filters, right now commented as functionality not yet figured out

  if (!(typeof(performanceParams) == "undefined") && performanceParams !== '') {
    SelectionState = SelectionState + '&' + performanceParams
  }
  if (!(typeof(treated_bubble_params2) == "undefined") && treated_bubble_params2 !== '') {
    SelectionState = SelectionState + '&' + treated_bubble_params2
  }

  if (!(typeof(pageParams) == "undefined") && pageParams !== '') {
    SelectionState = SelectionState + '&' + pageParams
  }


  if (!(typeof(searchParams) == "undefined") && searchParams !== '') {

    SelectionState = SelectionState + '&' + "search=" + searchParams
  }

  console.log('SelectionState1', SelectionState);
//Removing "&"


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
    urlParams = filter_week_selection;
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
    weekurlparam = urlName.get('week_param');
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

  if (!(urlParams == "")) {
    urlParams = '?' + urlParams
    // urlParams = urlParams.replace('&', '');
  }
  console.log('final param', urlParams);







  let ajaxSelection = '';

  ajaxSelection = SelectionState.replace('&', '');

  console.log('ajaxSelection2', ajaxSelection);

  if (ajaxSelection != '') {
    // const data = yield call(request, `http:// 172.20.244.223:8000/ranging/nego_bubble_table?` + ajaxSelection+"&"+urlParams);

    // const data = yield call(request, `http://172.20.244.223:8000/api/nego_table?` + ajaxSelection + "&" + urlParams);
    const data = yield call(request, host_url + `/api/reporting/supplier_view_table_bubble?` + ajaxSelection + "&" + urlParams);
    yield put(generateTableSuccess(data));

  }

  else {
    if (!(typeof(urlParams) == "undefined") && !(urlParams == "")) {
      const data = yield call(request, host_url + `/api/reporting/supplier_view_table_bubble` + urlParams);
      yield put(generateTableSuccess(data));
    } else {
      const data = yield call(request, host_url + `/api/reporting/supplier_view_table_bubble?`);
      yield put(generateTableSuccess(data));
    }
// const data = yield call(request, `http:// 172.20.244.223:8000/ranging/nego_bubble_table?`+urlParams);
    // const data = yield call(request, `http://172.20.244.223:8000/api/nego_table?` + urlParams);
    // const data = yield call(request,  host_url + `/api/reporting/supplier_view_table_bubble?`+ urlParams);
    // yield put(generateTableSuccess(data));

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

  let urlName = yield select(selectSupplierDomain());
//  Getting the url parameters for filters
  console.log('bbb');
  let urlParams = urlName.get('urlParamsString');

  let weekParams = urlName.get('dataWeekUrlParams');

  let storeParams = urlName.get('dataStoreUrlParams');

  let performanceParams = urlName.get('dataPerformanceUrlParams');

  let bubbleParams = urlName.get('dataBubbleUrlParams');

  console.log('bubbleParams......', bubbleParams);

  if ((typeof(bubbleParams) == "undefined")) {
    bubbleParams = "";
  }

  var treated_bubble_params = bubbleParams.replace(/[^=,\w\s]/gi, '');

  console.log('treated_bubble_params', treated_bubble_params);

  var treated_bubble_params2 = treated_bubble_params.replace(/,/g, "&");

  console.log('treated_bubble_params2', treated_bubble_params2);

  let SelectionState = '';

  if (weekParams !== '') {

    SelectionState = SelectionState + '&' + weekParams

  }

  if (storeParams !== '') {

    SelectionState = SelectionState + '&' + storeParams

  }

  if (performanceParams !== '') {

    SelectionState = SelectionState + '&' + performanceParams

  }

  if (treated_bubble_params2 !== '') {

    SelectionState = SelectionState + '&' + treated_bubble_params2

  }
//Removing "&"

  console.log('ccc', SelectionState);


  let ajaxSelection = '';

  ajaxSelection = SelectionState.replace('&', '');

  console.log('ddd', ajaxSelection);

  if (!(typeof(ajaxSelection) == "undefined") && !(ajaxSelection == "")) {
    console.log('entered ajaxselection', ajaxSelection);
    const data = yield call(request,

        host_url + `/api/reporting/supplier_view_chart_bubble?`
      )
    ;
// const data = yield call(request, `http://172.20.244.223:8000/api/nego_chart?` + urlParams +"&"+ ajaxSelection);

    console.log('eee', data);

    yield put(fetchGraphSuccess(data));

  }

  else {
// const data = yield call(request, `http:// 172.20.244.223:8000/ranging/nego_bubble_chart?`+urlParams );

    const data = yield call(request, host_url + `/api/reporting/supplier_view_chart_bubble?`);
// const data = yield call(request, `http://172.20.244.223:8000/api/nego_chart?`+urlParams );
    console.log('fff', data);
    yield put(fetchGraphSuccess(data));

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
  doSupplierTopBotFetch,
  doGenerateSideFilter,
  doWeekFilterFetch,
  doGenerateTable,
  doGenerateGraph
];
