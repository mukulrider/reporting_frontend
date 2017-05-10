/**
 * Created by musigma on 1/3/17.
 */
import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');
// const randomizeData = (state) => state.get('randomizeData');
// const makeStore = () => state.get('');

console.log('selectHome');
const makeSelectUsername = () => createSelector(
  selectHome,
  (homeState) => homeState.get('username')
);

const makeUserInputTable = () => createSelector(
  selectHome,
  (homeState) => homeState.get('userInputTable')
);

const makeSideFilter = () => createSelector(
  selectHome,
  (homeState) => homeState.get('sideFilter')
);

const makeUrlParams = () => createSelector(
  selectHome,
  (homeState) => homeState.get('urlParams')
);

const makeUrlParamsString = () => createSelector(
  selectHome,
  (homeState) => homeState.get('urlParamsString')
);
const makeTextBoxQueryString = () => createSelector(
  selectHome,
  (homeState) => homeState.get('textBoxQueryString')
);

const makeNewScenarioString = () => createSelector(
  selectHome,
  (homeState) => homeState.get('newScenarioString')
);

const makeNewScenarioWeek = () => createSelector(
  selectHome,
  (homeState) => homeState.get('newScenarioWeek')
);

const makeNewScenarioStoreFormat = () => createSelector(
  selectHome,
  (homeState) => homeState.get('newScenarioStoreFormat')
);

export {
  makeSelectUsername, makeUserInputTable, makeSideFilter,
  makeUrlParams, makeUrlParamsString, makeTextBoxQueryString,
  makeNewScenarioString, makeNewScenarioWeek, makeNewScenarioStoreFormat
}