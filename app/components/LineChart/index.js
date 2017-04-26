/**
 *
 * LineChart
 *
 */

import React from 'react';
// import styled from 'styled-components';

import {FormattedMessage} from 'react-intl';
import messages from './messages';
import Button from 'components/button';
import * as d3          from 'd3';

class LineChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  created3Graph = (id, json) => {
    let data2 = [{date: '24-Apr-07', close: 93.24},
      {date: '25-Apr-07', close: 92.24},
      {date: '26-Apr-07', close: 94.24},
      {date: '27-Apr-07', close: 93.24}];

    let margin = {top: 10, right: 10, bottom: 50, left: 30},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    // let svg = d3.select(".lineChart").attr("width") - margin.left - margin.right,
    //   height = +svg.attr("height") - margin.top - margin.bottom,
    //   g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let svg = d3.select("#" + id)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let parseTime = d3.timeParse("%d-%b-%y");
    // data2 = data2.map(obj=>{
    //   return {date: parseTime(obj.date), close: obj.close}
    // });
    let x = d3.scaleLinear()
      .rangeRound([0, width]);

    let y = d3.scaleLinear()
      .rangeRound([height, 0]);

    let line = d3.line()
      .x(function (d) {
        return x(d.Week);
      })
      .y(function (d) {
        return y(d.Scenario_Units);
      });

    let xaxis = d3.axisBottom(x);
    let yaxis = d3.axisLeft(y);
    // d3.tsv("https://gist.githubusercontent.com/mbostock/3883245/raw/bb1f7271beadff13fc721c66c3e857d89627c554/data.tsv",
    d3.tsv("https://gist.githubusercontent.com/sauravskumar/a8090524e6e0476ac7c88ab7d4007913/raw/603898c6769e8500dcf9ec883dc28a1e75d01534/dep.tsv",
      function(d) {
        d.Week = d.Week;
        d.Scenario_Units = +d.Scenario_Units;
        return d;
      },
      function (error, data) {
      // data = data2;
      if (error) throw error;

      x.domain(d3.extent(data, function (d) {
        return d.Week;
      }));
      y.domain(d3.extent(data, function (d) {
        return d.Scenario_Units;
      }));

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxis)
        .select(".domain")
        .remove();

      g.append("g")
        .call(yaxis)
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Price ($)");

      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    });
  };

  componentDidMount = () => {
    this.created3Graph(this.props.id, this.props.graphData, this.props.xAxisVar, this.props.yAxisVar)
  };

  componentDidUpdate = () => {
    this.created3Graph(this.props.id, this.props.graphData, this.props.xAxisVar, this.props.yAxisVar)
  };

  render() {
    return (
      <div>
        <svg id={this.props.id} className="lineChart"></svg>
      </div>
    );
  }
}

LineChart.propTypes = {};

export default LineChart;
