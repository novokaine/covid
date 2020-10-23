import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHART_SIZE } from '../constants/chart';
import { getDummyDataAction } from '../model/actions/covidData';
import { currentCsvData, getCurrentCovidData, getIsCovidDataLoading } from '../model/selectors/covidData';
import * as d3 from 'd3';
import SetPeriodDropdown from './SetPeriodDropdown';
import Loader from './Loader';
import './CovidChart.scss';

const { width, height } = CHART_SIZE;
const dimensions = {
    rangeWidth: width - 55,
    rangeHeight: height - 80
}
const { rangeWidth, rangeHeight } = dimensions;
const translateLeft = 50;

class CovidChart extends Component {
    componentDidMount() {
        this.props.getCsvData()
    }

    getChartScale() {
        const { csvData, covidData, isDataLoading } = this.props;
        // if (isDataLoading) {
        //     return;
        // }
        const xScale = d3.scaleBand().range([0, rangeWidth]).padding(0.2);
        const yScale = d3.scaleLinear().range([rangeHeight, 0]);

        // xScale.domain(csvData.map((d) => d.date));
        // yScale.domain([0, d3.max(csvData, (d) => d.price)]);

        xScale.domain(covidData.map((d) => d.date));
        yScale.domain([0, d3.max(covidData, (d) => d.confirmed)])

        // const max = this.getMaxValue()


        return { xScale, yScale }
    }

    renderCharAxis() {
        const { height } = CHART_SIZE;
        const { xScale, yScale } = this.getChartScale();

        const x_axis = d3.axisBottom(xScale);
        const y_axis = d3.axisLeft(yScale);
        const xAxisTranslate = height - 70;

        d3.select('.axis_x').attr('transform', `translate(${translateLeft}, ${xAxisTranslate})`).call(x_axis)
        d3.select('.axis_y').call(y_axis);
        this.renderGridLines();
    }

    renderGridLines() {
        const { width, height } = CHART_SIZE;
        const { yScale } = this.getChartScale();
        const grid = () => d3.axisLeft(yScale);
        d3.select('#grid').call(grid().tickSize(-width))
    }

    renderChartData() {
        const { xScale, yScale } = this.getChartScale()
        const { csvData, covidData } = this.props;
        return covidData.map(current => {
            const { date, confirmed, deaths } = current;

            return (
                //rotate(90 40 0)
                <g key={date} className="report">
                    <g transform={`translate(${xScale(date)})`}>
                        <rect className="bar confirmed" y={yScale(confirmed)} width={xScale.bandwidth()} height={rangeHeight - yScale(confirmed)} />
                        <text
                            className="desc"
                            transform={`

                                translate(${xScale.bandwidth() / 3}, ${yScale(confirmed / 2)})`
                            }>
                            {confirmed}
                        </text>
                    </g>
                    <g transform={`translate(${xScale(date)})`}>
                        <rect className="bar deaths" y={yScale(deaths)} width={xScale.bandwidth()} height={rangeHeight - yScale(deaths)} />
                        <text
                            className="desc"
                            transform={`
                                translate(${xScale.bandwidth() / 3}, ${yScale(deaths) - 5})
                            `}>
                            {deaths}
                        </text>
                    </g>
                </g>
            )
        })
    }

    render() {
        const { width, height } = CHART_SIZE;
        const { isDataLoading, covidData } = this.props;
        return (
            <div>
                <SetPeriodDropdown />
                <div>
                    <svg width={width} height={height}>
                        <g className="axis_x"></g>
                        <g className="axis_y" transform={`translate(${translateLeft}, 10)`}></g>
                        <g id="grid" transform={`translate(${translateLeft}, 10)`}></g>
                        <Loader isLoading={isDataLoading}>
                            {!isDataLoading && this.renderCharAxis()}

                            {/* <g className="bars">
                                {!isDataLoading && this.renderChartData()}
                            </g> */}
                            <g className="bars" transform={`translate(${translateLeft}, 10)`}>
                                {!isDataLoading && this.renderChartData()}
                            </g>
                        </Loader>
                    </svg>
                </div>
            </div>
        )
    }
}

// 1. draw a chart using csv dummy data - raedy
// 2. aggregate covid data:
/**  eg
 * "Alabama":{
        2020-04-11:{
            infected: 300,
            deaths: 0
        },
        2020-04-12:{
            infected: 299,
            deaths: 0
        }
    }
*/
export default connect(state => ({
    csvData: currentCsvData(state),
    isDataLoading: getIsCovidDataLoading(state),
    covidData: getCurrentCovidData(state)
}), dispatch => ({
    getCsvData: () => dispatch(getDummyDataAction())
}))(CovidChart)