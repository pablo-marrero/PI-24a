import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducer/index';

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));





















// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from '../reducer/reducer';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// export const store = createStore(
// //   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// )