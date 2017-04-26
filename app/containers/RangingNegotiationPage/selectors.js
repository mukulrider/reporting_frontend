import { createSelector } from 'reselect';

/**
 * Direct selector to the rangingNegotiationPage state domain
 */
const selectRangingNegotiationPageDomain = () => (state) => state.get('rangingNegotiationPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RangingNegotiationPage
 */

const makeSelectRangingNegotiationPage = () => createSelector(
  selectRangingNegotiationPageDomain(),
  (substate) => substate.toJS()
);

const makeUrlParamsString = () => createSelector(
  selectRangingNegotiationPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectRangingNegotiationPage;
export {
  selectRangingNegotiationPageDomain,
  makeUrlParamsString
};
