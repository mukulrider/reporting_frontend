import { createSelector } from 'reselect';

/**
 * Direct selector to the competitor state domain
 */
const selectCompetitorDomain = () => (state) => state.get('competitor');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Competitor
 */

const makeSelectCompetitor = () => createSelector(
  selectCompetitorDomain(),
  (substate) => substate.toJS()
);
const makeUrlParamsString = () => createSelector(
  selectCompetitorDomain(),
  (substate) => substate.toJS()
);

export default makeSelectCompetitor;
export {
  selectCompetitorDomain,
  makeUrlParamsString
};
