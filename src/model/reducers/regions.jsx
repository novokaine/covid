import createReducer from "../store/createReducer";

const initialState = {
    isRegionsLoading: true,
    regionsList: [],
    activeRegion: 'USA'
}

function GET_REGIONS_REQUEST(nextState) {
    nextState.isRegionsLoading = true;
}

function GET_REGIONS_SUCCESS(nextState, action) {
    nextState.regionsList = action.regionsList;
    nextState.isRegionsLoading = false;
}

function GET_REGIONS_FAILURE(nextState) {
    nextState.isRegionsLoading = false;
    nextState.regionsList = [];
}

function SET_ACTIVE_REGION(nextState, action) {
    nextState.activeRegion = action.regionName;
}

export default createReducer(initialState, {
    GET_REGIONS_REQUEST,
    GET_REGIONS_SUCCESS,
    GET_REGIONS_FAILURE,
    SET_ACTIVE_REGION
})