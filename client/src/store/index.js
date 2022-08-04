import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/index';
import { authReducer } from '../reducerLogin/auth';

const composeEnhancers = (
    (typeof windows !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
)

const reducers = combineReducers({
    auth:authReducer,
    reducer: reducer
})

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

