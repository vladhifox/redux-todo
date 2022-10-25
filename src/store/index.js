import {createStore, combineReducers} from 'redux';
import { dashboard_reducer } from './dashboard';
import { tasks_reducer } from './tasks_reducer'
import { lists_reducer } from './lists_reducer';
import { composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
        dashboard: dashboard_reducer,
        lists:lists_reducer,
        tasks:tasks_reducer
        
})

export const store = createStore(rootReducer, composeWithDevTools());