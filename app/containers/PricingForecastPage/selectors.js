import { createSelector } from 'reselect';

/**
 * Direct selector to the pricingForecastPage state domain
 */
const selectPricingForecastPageDomain = () => (state) => state.get('pricingForecastPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PricingForecastPage
 */

// const makeSelectPricingForecastPage = () => createSelector(
//   selectPricingForecastPageDomain(),
//   (substate) => substate.toJS()
// );

const makePricingGraphData = () => createSelector(
  selectPricingForecastPageDomain(),
  (pricingForecastState) => pricingForecastState.get('pricingGraphData')
);

const makePricingForecastSelectedType = () => createSelector(
  selectPricingForecastPageDomain(),
  (pricingForecastState) => pricingForecastState.get('pricingForecastSelectedType')
);

// export default makeSelectPricingForecastPage;
// export {
//   selectPricingForecastPageDomain,
//   makePricingGraphData
// };

export {
  makePricingGraphData,
  makePricingForecastSelectedType
};
