import createReducer from '../store/createReducer';

const initialState = {
    provincesList: [],
    isProvincesLoading: true,
    activeProvince: '',
    provincesFilter: ''
}

export function GET_PROVINCES_REQUEST(nextState) {
    nextState.isProvincesLoading = true;
}
export function GET_PROVINCES_SUCCESS(nextState, action) {
    nextState.isProvincesLoading = false;
    nextState.provincesList = action.currentProvinces;
}
export function GET_PROVINCES_FAILURE(nextState) {
    nextState.isProvincesLoading = false;
    nextState.provincesList = [];
}

export function SET_ACTIVE_PROVINCE(nextState, action) {
    nextState.activeProvince = action.activeProvince;
}
export function SET_PROVINCE_FILTER(nextState, action) {
    nextState.provincesFilter = action.provincesFilter;
}
export default createReducer(initialState, {
    GET_PROVINCES_REQUEST,
    GET_PROVINCES_SUCCESS,
    GET_PROVINCES_FAILURE,
    SET_ACTIVE_PROVINCE,
    SET_PROVINCE_FILTER
});