import { createSelector } from 'reselect';

/**
 * Direct selector to the supplier state domain
 */
const selectSupplierDomain = () => (state) => state.get('supplier');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Supplier
 */

const makeSelectSupplier = () => createSelector(
  selectSupplierDomain(),
  (substate) => substate.toJS()
);

export default makeSelectSupplier;
export {
  selectSupplierDomain,
};
