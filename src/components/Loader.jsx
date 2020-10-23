import React from 'react';
import { CHART_SIZE } from '../constants/chart';

const Loader = (props) => {
    const { width, height } = CHART_SIZE;
    const loading = (
        <g transform={`translate(${width / 2}, ${height / 3})`}>
            <circle fill="none" stroke="steelblue" strokeWidth="6" strokeMiterlimit="15" strokeDasharray="14.2472,14.2472" cx="50" cy="50" r="47" >
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    dur="5s"
                    from="0 50 50"
                    to="360 50 50"
                    repeatCount="indefinite" />
            </circle>
            <circle fill="none" stroke="steelblue" strokeWidth="1" strokeMiterlimit="10" strokeDasharray="10,10" cx="50" cy="50" r="39">
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    dur="5s"
                    from="0 50 50"
                    to="-360 50 50"
                    repeatCount="indefinite" />
            </circle>
        </g >
    )

    return props.isLoading ? loading : props.children;
}

export default Loader;