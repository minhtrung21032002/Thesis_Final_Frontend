import { combineReducers } from '@reduxjs/toolkit';


import serviceReducer from './reducers/serviceReducer';

const rootReducer = combineReducers({
    // user: userReducer,
    serviceReducer: serviceReducer,


});

export default rootReducer;
