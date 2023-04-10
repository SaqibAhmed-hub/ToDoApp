import { createStore, combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import taskReducer from '../reducers/reducers';

const rootReducer = combineReducers({ taskReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));