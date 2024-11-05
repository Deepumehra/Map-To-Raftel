import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from '../Authentication/Reducer';
import { huntReducer } from '../Hunts/Reducer';
// Combine your reducers
const rootReducer = combineReducers({
    auth: authReducer,
    hunt:huntReducer
});

// Create the store with `legacy_createStore` and apply thunk middleware
const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
