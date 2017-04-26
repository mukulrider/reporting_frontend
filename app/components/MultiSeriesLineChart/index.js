/**
 *
 * MultiSeriesLineChart
 *
 */

import React from 'react';
// import styled from 'styled-components';

import {FormattedMessage} from 'react-intl';
import messages from './messages';
import style from './style.scss';
import * as d3          from 'd3';

class MultiSeriesLineChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  d3Chart = (id, json, xAxisVar, yAxisVar, yAixsName, yAxisType = 'count') => {
    console.log(json);
    let svg = d3.select(`#${id}`);
    svg.selectAll("*").remove();
    svg = d3.select("#" + id),
      margin = {top: 20, right: 80, bottom: 35, left: 80},
      width = svg.attr("width") - margin.left - margin.right,
      height = svg.attr("height") - margin.top - margin.bottom;

    svg.selectAll("*").remove();
    let g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    let parseTime = d3.timeParse("%Y%m%d");

    let x = d3.scaleLinear().range([0, width]),
      y = d3.scaleLinear().range([height, 0]),
      z = d3.scaleOrdinal().range(["#3375b2", "#cc3333"]);

    let line = d3.line()
      .curve(d3.curveBasis)
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        if (yAxisType == 'percentage') {
          return y(d.temperature);
        }
        return y(d.temperature / 1000);
      });


    let cities = json;

    x.domain([
      d3.min(cities, function (c) {
        return d3.min(c.values, function (d) {
          return d.date;
        });
      }),
      d3.max(cities, function (c) {
        return d3.max(c.values, function (d) {
          return d.date;
        });
      })
    ]).nice();

    y.domain([
      d3.min(cities, function (c) {
        return d3.min(c.values, function (d) {
          if (yAxisType == 'percentage') {
            return d.temperature;
          }
          return d.temperature / 1000;
        });
      }),
      d3.max(cities, function (c) {
        return d3.max(c.values, function (d) {
          if (yAxisType == 'percentage') {
            return d.temperature;
          }
          return d.temperature / 1000;
        });
      })
    ]).nice();

    z.domain(cities.map(function (c) {
      return c.id;
    }));

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("transform", "rotate(0)")
      .attr("x", width / 2)
      .attr("y", 35)
      .attr("dx", "0.71em")
      .attr("fill", "#000")
      .text('Weeks');

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -60)
      .attr("y", -75)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text(yAixsName);

    let city = g.selectAll(".city")
      .data(cities)
      .enter().append("g")
      .attr("class", "city");

    city.append("path")
      .attr("class", "line")
      .attr("d", function (d) {
        return line(d.values);
      })
      .style("stroke", function (d) {
        return z(d.id);
      });

    // city.append("text")
    //   .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
    //   .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
    //   .attr("x", 3)
    //   .attr("dy", "0.35em")
    //   .style("font", "10px sans-serif")
    //   .text(function(d) { return d.id; });

    let legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(['Baseline', 'Scenario'])
      .enter().append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function (d) {
        return d;
      });
  };

  componentDidUpdate = () => {
    this.d3Chart(this.props.id, this.props.graphData,
      this.props.xAxisVar, this.props.yAxisVar,
      this.props.yAixsName,
      this.props.yAxisType);
  };

  render() {
    return (
      <div>
        <svg id={this.props.id} width="560" height="300"></svg>
      </div>
    );
  }
}

MultiSeriesLineChart.propTypes = {};

export default MultiSeriesLineChart;
