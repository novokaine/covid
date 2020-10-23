import { dayInMilliseconds } from "../../constants/chart";
import { api } from "../api/api";
import { getActiveProvince } from "../selectors/provinces"
import csvtojson from 'csvtojson';
import * as csvData from './sp500.csv';
import * as d3 from 'd3';
import { getPeriodInterval } from "../selectors/covidData";


export function getCovidDataActionOld() {
    return function (dispatch, getState) {
        const currentProvince = getActiveProvince(getState());

        if (currentProvince === '') {
            return;
        }

        dispatch({ type: 'GET_COVID_DATA_REQUEST' })
        return api.get(`reports?date=2020-04-16&q=US%20Alabama&iso=USA&region_name=US&region_province=${currentProvince}`)
            .then((response) => dispatch({ type: 'GET_COVID_DATA_SUCCESS', covidData: response.data }))
            .catch((err) => dispatch({ type: 'GET_COVID_DATA_FAILURE', err }))
    }
}

const formattingDate = (timeInterval) => {
    let { start, end } = timeInterval;
    const storedInMs = [];
    const storedAsDate = [];

    const miliseconds = dayInMilliseconds;

    const formatDate = (miliseconds) => {
        const year = new Date(miliseconds).getFullYear();
        const month = new Date(miliseconds).getMonth()
        const day = new Date(miliseconds).getDate();
        const zeroedMonth = month < 10 ? `0${month}` : month;
        const zeroedDay = day < 10 ? `0${day}` : day;
        return [year, zeroedMonth, zeroedDay].join('-');
    }

    while (end - miliseconds > start) {
        storedInMs.push(end - miliseconds);
        end = end - miliseconds;
    }

    storedInMs.map(current => {
        storedAsDate.push(formatDate(current));
    });


    return storedAsDate;
}

export function getCovidDataByDay(day) {
    return async function (dispatch, getState) {
        const currentProvince = getActiveProvince(getState());
        if (currentProvince === '') {
            return;
        }

        return api
            .get(`reports?date=${day}&q='${currentProvince}'&iso=USA&region_name=US`)
            .then(response => response.data)
            .catch(err => err)

    }
}

export function getCovidDataAction() {
    return async function (dispatch, getState) {

        const timeInterval = getPeriodInterval(getState());
        const dateIntervals = formattingDate(timeInterval);

        dispatch({ type: 'GET_COVID_DATA_REQUEST' });
        const result = [];
        const data = dateIntervals.map(current => {
            return dispatch(getCovidDataByDay(current)).then((response) => {
                return response;
            });
        });

        const currentData = await Promise.allSettled(data).then(result => result);
        currentData.map(current => {
            result.push(current.value)
        });

        dispatch({ type: 'GET_COVID_DATA_SUCCESS', covidData: result })

    }
}

export function setIntervalPeriod(interval) {
    return function (dispatch, getState) {
        const currentProvince = getActiveProvince(getState());
        let endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        const end = endDate.getTime();
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const start = startDate.getTime() - interval * dayInMilliseconds;
        dispatch({ type: 'SET_PERIOD_INTERVAL', currentPeriod: { start, end } });

        currentProvince && dispatch(getCovidDataAction())
    }
}

export function getDummyDataAction() {
    return async function (dispatch) {
        let jsonData = [];
        await d3.csv(csvData, (data, err) => {
            jsonData.push({ date: data.date, price: Number(data.price) })
        }).then(() => dispatch({ type: 'FETCH_CSV_DATA', data: jsonData }));
    }
}