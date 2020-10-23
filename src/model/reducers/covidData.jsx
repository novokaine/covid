import { dayInMilliseconds } from '../../constants/chart';
import createReducer from '../store/createReducer';
function setCurrentInterval() {


    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999)
    const end = endDate.getTime();

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const start = startDate.getTime() - 7 * dayInMilliseconds

    return {
        start, end
    }
}

const initialState = {
    isCovidDataLoading: false,
    covidData: [],
    currentPeriod: setCurrentInterval(),
    jsonData: []
}

function GET_COVID_DATA_REQUEST(nextState) {
    nextState.isCovidDataLoading = true;
}

function GET_COVID_DATA_SUCCESS(nextState, action) {
    nextState.covidData = action.covidData;
    nextState.isCovidDataLoading = false;
}

function GET_COVID_DATA_FAILURE(nextState) {
    nextState.covidData = [];
    nextState.isCovidDataLoading = false;
}

function SET_PERIOD_INTERVAL(nextState, action) {
    nextState.currentPeriod = action.currentPeriod;
}

function FETCH_CSV_DATA(nextState, action) {
    nextState.jsonData = action.data
}

export default createReducer(initialState, {
    GET_COVID_DATA_REQUEST,
    GET_COVID_DATA_SUCCESS,
    GET_COVID_DATA_FAILURE,
    SET_PERIOD_INTERVAL,
    FETCH_CSV_DATA
})