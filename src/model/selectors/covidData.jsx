import { createSelector } from "reselect";
import { dayInMilliseconds } from "../../constants/chart";

export const getIsCovidDataLoading = (state) => state.covidReducer.isCovidDataLoading;
export const currentCovidData = (state) => state.covidReducer.covidData;
export const getPeriodInterval = (state) => state.covidReducer.currentPeriod;
export const currentCsvData = (state) => state.covidReducer.jsonData;

export const getPeriodDates = createSelector([getPeriodInterval], (period) => {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const start = startDate - period * dayInMilliseconds;

});


export const getCurrentCovidData = createSelector([getIsCovidDataLoading, currentCovidData], (isDataLoading, covidData) => {
    if (isDataLoading) {
        return { confirmed: 0, deaths: 0 };
    }

    let processedData = [];

    covidData.map(current => {
        const { date, confirmed, deaths } = current[0];
        processedData.push({ date, confirmed, deaths })
    });

    return processedData.reverse();
})