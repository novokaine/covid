import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRegionsListAction, setActiveRegionAction } from '../model/actions/regions'
import { getIsRegionsLoading, getRegionsList } from '../model/selectors/regions';
import './Regions.scss'


class Regions extends Component {
    componentDidMount() {
        this.props.getRegions()
    }
    render() {
        const { isRegionsLoading, regionsList, setActiveRegion } = this.props;
        return (
            <div className="region-list">
                <ul>
                    {!isRegionsLoading && regionsList.map(region => {
                        console.log(region)
                        return (
                            <li>
                                <button type="button" onClick={() => setActiveRegion(region.iso)}>{region.name}</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default connect(state => ({
    isRegionsLoading: getIsRegionsLoading(state),
    regionsList: getRegionsList(state)
}), dispatch => ({
    getRegions: () => dispatch(getRegionsListAction()),
    setActiveRegion: (name) => dispatch(setActiveRegionAction(name))
}))(Regions)