import { createSelector } from "reselect";

export const getIsProvincesLoading = (state) => state.countryProvincies.isProvincesLoading
export const allProvinces = (state) => state.countryProvincies.provincesList;;
export const getActiveProvince = (state) => state.countryProvincies.activeProvince;
export const getProvincesFilter = (state) => state.countryProvincies.provincesFilter;


export const getProvincesList = createSelector(
    [allProvinces, getIsProvincesLoading, getProvincesFilter],
    (allProvinces, isProvincesLoading, filterCriteria) => {
        if (isProvincesLoading) {
            return;
        }

        if (filterCriteria === '') {
            return allProvinces;
        }

        const regex = new RegExp(filterCriteria, 'gi');

        return allProvinces.filter(current => current.province.match(regex));
    })