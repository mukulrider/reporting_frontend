/*
 *
 * Competitor reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, WATERFALL_CONSTANT, WATERFALL_DATA_FETCH_SUCCESS, PIECHART_CONSTANT,
  PIECHART_DATA_FETCH_SUCCESS,
  PRICE_RANGE_CONSTANT, PRICE_RANGE_DATA_FETCH_SUCCESS, WEEK_PARAM, KPI_PARAM, FILTER_CONSTANT,
  FILTER_FETCH_SUCCESS, CHECKBOX_CHANGE, GENERATE_URL_PARAMS, GENERATE_URL_PARAMS_STRING,
  SEND_URL_PARAMS, SAVE_PRICE_INDEX, OUTPERFORMANCE_CONSTANT, PRICE_OUTPERFORMACE_FETCH_SUCCESS,
  PRICE_INDEX_CLICK, WEEK, CHECKBOX_WEEK_CHANGE,
} from './constants';



const initialState = fromJS({
  piechart_data:{'tesco_share_data':'0'},
  dataWeekUrlParams: '',
  urlParamsString: '',
  filter_selection: '',
  kpi_type: '',
  dataPriceIndexParam: '',
  chat_data: '',
  filter_week_selection:'',

});


function competitorReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      console.log("printing state",state)
      return state;

    case WATERFALL_CONSTANT:
      console.log("reducer.js", action.data);
      return state.set('waterfall', action.data);
    case WATERFALL_DATA_FETCH_SUCCESS:
      console.log("reducer WATERFALL_DATA_FETCH_SUCCESS", action.data);
      return state.set('waterfall_data', action.data);

    case PIECHART_CONSTANT:
      console.log("reducer.js", action.data);
      return state.set('piechart', action.data);
    case PIECHART_DATA_FETCH_SUCCESS:
      console.log("reducer PIECHART_DATA_FETCH_SUCCESS", action.data);
      return state.set('piechart_data', action.data);

    case PRICE_RANGE_CONSTANT:
      console.log("reducer.js", action.data);
      return state.set('pricerange', action.data);
    case PRICE_RANGE_DATA_FETCH_SUCCESS:
      console.log("reducer PRICE_RANGE_DATA_FETCH_SUCCESS", action.data);
      return state.set('pricerange_data', action.data);

    case OUTPERFORMANCE_CONSTANT:
      console.log("reducer.js", action.data);
      return state.set('outperformance', action.data);
    case PRICE_OUTPERFORMACE_FETCH_SUCCESS:
      console.log("reducer PRICE_RANGE_DATA_FETCH_SUCCESS", action.data);
      return state.set('outperformance_data', action.data);
      return state.set('dataBrandParams', action.data);

    case WEEK_PARAM:
      console.log("reducer WEEK_PARAM",action.data);
      return state.set('week_param',action.data)
    case KPI_PARAM:
      console.log("reducer KPI_PARAM",action.data);
      return state.set('kpi_param',action.data)
    case WEEK:
      console.log("reducer WEEK",action.data);
      return state.set('week',action.data)

    case FILTER_CONSTANT:
      console.log("reducer FILTER_CONSTANT", action.data);
      return state.set('filters', action.data);
    case FILTER_FETCH_SUCCESS:
      console.log("reducer FILTER_FETCH_SUCCESS",action.data);
      return state.set('filter_data',action.data)

    case CHECKBOX_CHANGE:
    // console.log(CHECKBOX_CHANGE, 'reducer', action);
    return state.set('filter_selection', action.data);

    case CHECKBOX_WEEK_CHANGE:
      console.log('CHECKBOX_WEEK_CHANGE reducer', action.data);
      return state.set('filter_week_selection', action.data);

    case GENERATE_URL_PARAMS:
      return state.set('urlParams', action.data);

    case GENERATE_URL_PARAMS_STRING:
      return state.set('urlParamsString', action.data);

    case SEND_URL_PARAMS:
      // console.log("2.Updated the state in Reducer", action.data);
      return state.set('dataUrlParms', action.data);
    case SAVE_PRICE_INDEX:
      return state.set('price_index', action.data);

    case PRICE_INDEX_CLICK:
      console.log("reducer PRICE_INDEX_CLICK", action.data);
      return state.set('dataPriceIndexParam', action.data);

    // case UPDATE_CHART_DATA:
    //   console.log("reducer UPDATE_CHART_DATA", action.data);
    //   return state.set('chat_data', (() => {
    //     let data = state.get('waterfall_data');
    //     let selected = state.get('dataPriceIndexParam');
    //     let toSend = [];
    //     Object.keys(data).map(obj => {
    //       console.log('>>>>>>>>', obj);
    //       obj=obj.toLowerCase();
    //       if(obj.startsWith(selected)){
    //         toSend.push(data[obj])
    //       }
    //     });
    //     console.log('To send updated',toSend);
    //     return toSend;
    //   })());

    default:
      return state;

  }
}

export default competitorReducer;
