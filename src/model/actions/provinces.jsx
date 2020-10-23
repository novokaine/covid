import { api } from "../api/api";
import { getSelectedRegion } from "../selectors/regions";
import { getCovidDataAction } from "./covidData";

export function getProvicesAction() {
    return function (dispatch, getState) {
        dispatch({ type: 'GET_PROVINCES_REQUEST' });
        const region = getSelectedRegion(getState());

        api.get(`provinces/${region}`)
            .then(response => {
                dispatch({ type: 'GET_PROVINCES_SUCCESS', currentProvinces: response.data })
            })
            .catch(err => dispatch({ type: 'GET_PROVINCES_FAILURE', currentProvinces: err }));
    }
}

export function setActiveProvince(province) {
    return function (dispatch) {
        dispatch({ type: 'SET_ACTIVE_PROVINCE', activeProvince: province });
        dispatch(getCovidDataAction())
    }
}

export function filterProvinceAction(filter) {
    return function (dispatch) {
        dispatch({ type: 'SET_PROVINCE_FILTER', provincesFilter: filter })
    }
}