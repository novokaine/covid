import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProvicesAction, setActiveProvince, filterProvinceAction } from '../model/actions/provinces';
import { getActiveProvince, getIsProvincesLoading, getProvincesFilter, getProvincesList } from '../model/selectors/provinces';
import './Provinces.scss';
import Regions from './Regions';

class Provinces extends Component {
    componentDidMount() {
        this.props.getProvinces();
    }

    render() {
        const { isProvincesloading, provincesList, setActiveProvince, activeProvince, filterProvince, filter } = this.props;

        return (
            <div>
                {/* Regions are yet to be done, - lack of available time */}
                {/* <Regions /> */}
                <div className="countries">
                    <input value={filter} type="text" name="search" placeholder="Search by country" className="search" onChange={(event) => filterProvince(event.target.value)} />
                    <ul>
                        {!isProvincesloading && (
                            provincesList.length ? provincesList.map(currentProvince => {
                                const active = activeProvince === currentProvince.province ? 'active' : '';
                                return (
                                    <li key={currentProvince.province}>
                                        <button type="button" onClick={() => setActiveProvince(currentProvince.province)} className={active}>
                                            {currentProvince.province}
                                        </button>
                                    </li>
                                )
                            }) : <p>No matches</p>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    isProvincesloading: getIsProvincesLoading(state),
    provincesList: getProvincesList(state),
    activeProvince: getActiveProvince(state),
    filter: getProvincesFilter(state)
}), dispatch => ({
    getProvinces: () => dispatch(getProvicesAction()),
    setActiveProvince: (iso) => dispatch(setActiveProvince(iso)),
    filterProvince: (name) => dispatch(filterProvinceAction(name))
}))(Provinces)