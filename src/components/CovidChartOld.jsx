import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CHART_SIZE } from '../constants/chart';
import * as d3 from 'd3';
import { getCovidDataAction, setIntervalPeriod, getDummyDataAction } from '../model/actions/covidData';
import { getIsCovidDataLoading, getCurrentCovidData, getPeriodInterval, getPeriodDates, currentCsvData } from '../model/selectors/covidData';


class CovidChart extends Component {
    componentDidMount() {
        this.props.getDummyData();
    }

    getChartScaleOld() {
        const { width, height } = CHART_SIZE;
        const { selectedPeriod, covidData } = this.props;
        const { confirmed, deaths } = covidData[0];
        const maxData = Math.max(confirmed, deaths);

        const xScale = d3
            .scaleTime()
            .range([0, width - 100])
            .domain([selectedPeriod.start, selectedPeriod.end])


        const yScale = d3.scaleLinear()
            .domain([0, maxData])
            .range([height - 40, 0]);
        return { xScale, yScale }
    }

    getChartScale() {
        const { csvData } = this.props;
        const { width, height } = CHART_SIZE;
        const xScale = d3.scaleBand().range([0, width]);
        const yScale = d3.scaleLinear().range([height, 0]);
        xScale.domain(csvData.map(function (d) { return d.date; }));
        yScale.domain([0, d3.max(csvData, function (d) { return d.price; })]);

        return { xScale, yScale }
    }

    drawLine() {
        const { xScale, yScale } = this.getChartScale();
        const { covidData } = this.props;
        const { confirmed, deaths } = covidData[0];
        const line = d3
            .line()
            .x(d => xScale(d))
            .y(d => yScale(d));
        return line([confirmed, deaths])
    }

    renderChartData() {
        const { width, height } = CHART_SIZE;
        const { csvData } = this.props;
        const { xScale, yScale } = this.getChartScale();
        const margin = { top: 5, right: 5, bottom: 5, left: 5 };


        const x = d3
            .scaleBand()
            .domain(csvData.map(d => d.date))
            .rangeRound([margin.left, width - margin.right])
            .padding(0);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(csvData, d => d.price)])
            .range([height - margin.bottom, margin.top]);


        const svg = d3.select('.bar')

        svg
            .append('rect')
            .data(csvData)
            .attr('fill', '#fd4d61')
            .attr('x', d => x(d.date))
            .attr('y', d => y(d.price))
            .attr('height', d => y(0) - y(d.price))
            .attr('width', x.bandwidth());

        // const xScale = d3.scaleBand().range([0, width]);
        // const yScale = d3.scaleLinear().range([height, 0]);
        // xScale.domain(csvData.map(function (d) { return d.date; }));
        // yScale.domain([0, d3.max(csvData, function (d) { return d.price; })]);

        // d3.select('.bar')
        //     .data(csvData)
        //     .append('rect')
        //     .attr('x', (d) => d.date)
        //     .attr('y', (d) => d.price)
        //     .attr("width", xScale.bandwidth())
        //     .attr("height", (d) => height - yScale(d.price));

    }

    renderChartAxis() {
        const { width, height } = CHART_SIZE;
        const { csvData } = this.props;
        const { xScale, yScale } = this.getChartScale();

        const x_axis = d3.axisBottom()
            .scale(xScale);

        const y_axis = d3.axisLeft()
            .scale(yScale);

        const xAxisTranslate = height - 30;

        d3.select('.axis_x').attr('transform', `translate(50, ${xAxisTranslate})`).call(x_axis)
        d3.select('.axis_y').call(y_axis);
    }

    renderChartDataOld() {
        const { width, height } = CHART_SIZE;
        const { covidData, selectedPeriod } = this.props;
        const { confirmed, deaths, date } = covidData[0];
        const { xScale, yScale } = this.getChartScale()

        const group = d3.select('.bar')

        const data = [{
            year: 2011,
            value: 3000
        },
        {
            year: 2012,
            value: 4000,
        }]

        group.data(data)
            .enter()
            .append('rect')
            .attr('x', (d) => xScale(d.year))
            .attr('y', (d) => yScale(d.value))
            .attr('width', xScale.bandwidth())
            .attr("height", function (d) { return height - yScale(d.confirmed); })



        // return (
        //     <g className="data">
        //         <path d={this.drawLine()} />
        //         {/* <path d={this.drawLine(confirmed)} />
        //         <path d={this.drawLine(deaths)} /> */}
        //     </g>
        // )
    }

    renderChartAxisOld() {
        const { width, height } = CHART_SIZE;
        const { xScale, yScale } = this.getChartScale();

        const x_axis = d3.axisBottom()
            .scale(xScale);

        const y_axis = d3.axisLeft()
            .scale(yScale);

        const xAxisTranslate = height - 30;

        d3.select('.axis_x').attr('transform', `translate(50, ${xAxisTranslate})`).call(x_axis)
        d3.select('.axis_y').call(y_axis);
        this.renderChartData();
    }

    render() {
        const { covidData, isDataLoading, setPeriodInterval, periodDates } = this.props;
        const { confirmed, deaths } = covidData;
        const { width, height } = CHART_SIZE;
        return (
            <div>

                <svg width={width} height={height} id="covidData">
                    <g className="axis_x"></g>
                    <g className="axis_y" transform="translate(50, 10)"></g>
                    <g className="bar"></g>
                    {!isDataLoading && covidData.length && (this.renderChartAxis())}
                    {/* {!isDataLoading && covidData.length && (this.renderChartData())} */}
                </svg>
            </div>
        )
    }
}

export default connect(state => ({
    isDataLoading: getIsCovidDataLoading(state),
    covidData: getCurrentCovidData(state),
    selectedPeriod: getPeriodInterval(state),
    periodDates: getPeriodDates(state),
    csvData: currentCsvData(state)
}), dispatch => ({
    setPeriodInterval: (interval) => dispatch(setIntervalPeriod(interval)),
    getDummyData: () => dispatch(getDummyDataAction())
}))(CovidChart)