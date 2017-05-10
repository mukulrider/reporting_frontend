import { createSelector } from 'reselect';

/**
 * Direct selector to the promotion state domain
 */
const selectPromotionDomain = () => (state) => state.get('promotion');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Promotion
 */

const makeSelectPromotion = () => createSelector(
  selectPromotionDomain(),
  (substate) => substate.toJS()
);

export default makeSelectPromotion;
export {
  selectPromotionDomain,
};
