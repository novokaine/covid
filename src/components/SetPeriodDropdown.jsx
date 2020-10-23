import React from 'react';
import { connect } from "react-redux"
import { setIntervalPeriod } from "../model/actions/covidData";
import './SetPeriodDropdown.scss';

const SetPeriodDropdown = (props) => {

    return (
        <select onChange={(event) => props.setPeriodInterval(event.target.value)} className="select-period">
            <option value="7">last 7 days</option>
            <option value="30">last 1 month</option>
        </select>
    )
}

export default connect(null, dispatch => ({
    setPeriodInterval: (interval) => dispatch(setIntervalPeriod(interval))
}))(SetPeriodDropdown)