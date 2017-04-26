import { createSelector } from 'reselect';

/**
 * Direct selector to the pricingHomePage state domain
 */
const selectPricingHomePageDomain = () => (state) => state.get('pricingHomePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PricingHomePage
 */

const makeSelectPricingHomePage = () => createSelector(
  selectPricingHomePageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectPricingHomePage;
export {
  selectPricingHomePageDomain,
};
