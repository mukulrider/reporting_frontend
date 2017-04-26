/*
 *
 * RangingNegotiationPage actions
 *
 */

import {
  DEFAULT_ACTION,FETCH_DATA, FETCH_DATA_SUCCESS , URL_PARAM , WEEK_FETCH, GENERATE_FILE,
  GENERATE_TABLE, GENERATE_TABLE_SUCCESS,
  GENERATE_SIDE_FILTER, GENERATE_SIDE_FILTER_SUCCESS, GENERATE_URL_PARAMS, GENERATE_URL_PARAMS_STRING, GRAPH_FETCH,GRAPH_FETCH_SUCCESS,
    FILTER_FETCH,FILTER_FETCH_SUCCESS,SAVE_PERF_PARAM,SAVE_STORE_PARAM,SAVE_WEEK_PARAM,SAVE_BUBBLE_PARAM,SAVE_SIDE_FILTER_PARAM,SAVE_PAGE_PARAM,
  GENERATE_TEXTBOX_QUERY_STRING,RESET_CLICKED
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}


export function WeekClick(data) {
    console.log('Nego data fetch action');
    return {
        type: WEEK_FETCH, data
    };
}




export function fetchDataSuccess(data) {
    console.log('apiFetchSuccess action', data);
    return {
        type: FETCH_DATA_SUCCESS,
        data
    };
}

export function urlDataSuccess(data) {
    console.log('checking url params', data);
    return {
        type: URL_PARAM,
        data
    };
}



export function generateFile() {
  return {
    type: GENERATE_FILE
  }
}

export function generateTable() {
  return {
    type: GENERATE_TABLE
  }
}

export function generateTableSuccess(data) {
    console.log('generateTableSuccess', data);
    return {
    type: GENERATE_TABLE_SUCCESS,
    data
  }
}

export function generateSideFilter() {
  return {
    type: GENERATE_SIDE_FILTER
  }
}

export function generateSideFilterSuccess(data) {
  return {
    type: GENERATE_SIDE_FILTER_SUCCESS,
    data
  }
}

export function generateUrlParams(data) {
  // console.log(data);
  return {
    type: GENERATE_URL_PARAMS,
    data
  }
}
export function generateUrlParamsString(data) {
  // console.log(data);
  return {
    type: GENERATE_URL_PARAMS_STRING,
    data
  }
}

export function fetchGraph() {
  console.log('fetchGraph');
  return {
    type: GRAPH_FETCH
  }
}

export function fetchGraphSuccess(data) {
  // console.log(data);
  return {
    type: GRAPH_FETCH_SUCCESS,
    data
  }
}
export function fetchPerformanceFilter(data) {
  console.log("action saving state");
  console.log(data);
  return {
    type: FILTER_FETCH,
      data
  }
}


export function SavePFilterParam(data) {
    return {
        type: SAVE_PERF_PARAM ,
        data
    };
}
export function SaveStoreParam(data) {

    return {
        type: SAVE_STORE_PARAM ,
        data
    };
}
export function SaveWeekParam(data) {

    return {
        type: SAVE_WEEK_PARAM ,
        data
    };
}

export function SaveBubbleParam(data) {
  console.log("bubble data in action",data);
  return {
        type: SAVE_BUBBLE_PARAM ,
        data
    };
}

export function SavePageParam(data) {
  console.log("bubble data in action",data);
  return {
        type: SAVE_PAGE_PARAM ,
        data
    };
}

export function SaveSideFilterParam(data) {
  console.log("Filter data in action",data);
  return {
        type: SAVE_SIDE_FILTER_PARAM ,
        data
    };
}

export function generateTextBoxQueryString(data) {
  console.log("Search in action for "+data);
  return {
    type: GENERATE_TEXTBOX_QUERY_STRING,
    data
  }
}export function ResetClickParam(data) {
  console.log("Search in action for "+data);
  return {
    type: RESET_CLICKED,
    data
  }
}

export function fetchPerformanceFilterSuccess(data) {
  // console.log(data);
  return {
    type: FILTER_FETCH_SUCCESS,
    data
  }
}

