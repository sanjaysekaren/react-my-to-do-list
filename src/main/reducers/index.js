import {combineReducers} from 'redux';
import {dashboardReducer} from '../containers/dashboard/dashboardReducer'

const rootReducer = combineReducers({
    dashboardReducers:dashboardReducer
})

export default rootReducer;