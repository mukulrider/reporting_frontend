// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars
  const namespace = '';
  return [
     {
      path: 'sales/competitor',
      name: 'competitor',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Competitor/reducer'),
          import('containers/Competitor/sagas'),
          import('containers/Competitor'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('competitor', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: 'sales/supplier',
      name: 'supplier',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Supplier/reducer'),
          import('containers/Supplier/sagas'),
          import('containers/Supplier'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('supplier', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: 'sales/promo',
      name: 'promotion',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Promotion/reducer'),
          import('containers/Promotion/sagas'),
          import('containers/Promotion'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('promotion', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/sales/product',
      name: 'productPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ProductPage/reducer'),
          import('containers/ProductPage/sagas'),
          import('containers/ProductPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('productPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: 'sales/executive',
      name: 'executive',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Executive/reducer'),
          import('containers/Executive/sagas'),
          import('containers/Executive'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('executive', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/sales/dailysales',
      name: 'dailySales',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/DailySales/reducer'),
          import('containers/DailySales/sagas'),
          import('containers/DailySales'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('dailySales', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, /*{
      path: '/sales/kantar',
      name: 'kantarReport',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/KantarReport/reducer'),
          import('containers/KantarReport/sagas'),
          import('containers/KantarReport'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('kantarReport', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },*/ {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
