import { api } from "../api/api"
import { getProvicesAction } from "./provinces";

export function getRegionsListAction() {
    return function (dispatch) {
        dispatch({ type: 'GET_REGIONS_REQUEST' });
        api.get('regions')
            .then(response => dispatch({ type: 'GET_REGIONS_SUCCESS', regionsList: response.data }))
    }
}

export function setActiveRegionAction(regionName) {
    return function (dispatch) {
        dispatch({ type: 'SET_ACTIVE_REGION', regionName });
        dispatch(getProvicesAction())
    }
}