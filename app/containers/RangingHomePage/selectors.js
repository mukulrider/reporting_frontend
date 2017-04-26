import { createSelector } from 'reselect';

/**
 * Direct selector to the rangingHomePage state domain
 */
const selectRangingHomePageDomain = () => (state) => state.get('rangingHomePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RangingHomePage
 */

const makeSelectRangingHomePage = () => createSelector(
  selectRangingHomePageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectRangingHomePage;
export {
  selectRangingHomePageDomain,
};
