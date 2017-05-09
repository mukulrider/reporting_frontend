import { createSelector } from 'reselect';

/**
 * Direct selector to the dailySales state domain
 */
const selectDailySalesDomain = () => (state) => state.get('dailySales');
//console.log("Raunak's Test", state.get('dailySales'));
/**
 * Other specific selectors
 */


/**
 * Default selector used by DailySales
 */

const makeSelectDailySales = () => createSelector(
  selectDailySalesDomain(),
  (substate) => substate.toJS()
);

export default makeSelectDailySales;
export {
  selectDailySalesDomain,
};
