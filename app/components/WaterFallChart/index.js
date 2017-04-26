/**
*
* WaterFallChart
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import style from './style.scss';
import * as d3          from 'd3';
class WaterFallChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  d3Chart = (id) => {
    var formatChange = d3.format("+d"),
      formatValue = d3.format("d");

    var svg = d3.select("#" + id);

    var margin = {top: 20, right: 40, bottom: 40, left: 80},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("https://gist.githubusercontent.com/mbostock/c957dc9c1f8a0bae58d5/raw/2a02cb873c377bc018edc31e9b683c58623aae65/data.tsv", function (d) {
      d.value = +d.value;
      return d;
    }, function (error, data) {
      if (error) throw error;

      // Compute a simple “stack” by iterating over the data.
      data.reduce(function (v, d) {
        return d.value1 = (d.value0 = v) + d.value;
      }, 0);

      var x = d3.scaleLinear()
        .domain(d3.extent(data, function (d) {
          return d.value1;
        })).nice()
        .range([0, width]);

      var y = d3.scaleBand()
        .domain(data.map(function (d) {
          return d.region;
        }))
        .rangeRound([0, height])
        .padding(0.1);

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "axis axis--x")
        .call(d3.axisBottom(x));

      g.append("g").selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("class", function (d) {
          return "rect rect--" + (d.value0 < d.value1 ? "positive" : "negative");
        })
        .attr("y", function (d) {
          return y(d.region);
        })
        .attr("x", function (d) {
          return x(d.value0 < d.value1 ? d.value0 : d.value1);
        })
        .attr("width", function (d) {
          return d.value0 < d.value1 ? x(d.value1) - x(d.value0) : x(d.value0) - x(d.value1);
        })
        .attr("height", y.bandwidth());

      var label = g.append("g").selectAll("text")
        .data(data)
        .enter().append("text")
        .attr("class", function (d) {
          return "label label--" + (d.value0 < d.value1 ? "positive" : "negative");
        })
        .attr("y", function (d) {
          return y(d.region) + y.bandwidth() / 2;
        });

      label.append("tspan")
        .attr("class", "label-change")
        .attr("dy", "-.2em")
        .text(function (d) {
          return formatChange(d.value1 - d.value0);
        });

      label.append("tspan")
        .attr("class", "label-value")
        .attr("dy", "1.1em")
        .text(function (d) {
          return formatValue(d.value1);
        });

      label.selectAll("tspan")
        .attr("x", function (d) {
          return x(d.value1) + (d.value0 < d.value1 ? -6 : 6);
        });

      g.append("g")
        .attr("class", "axis axis--y")
        .attr("transform", "translate(" + x(0) + ",0)")
        .call(d3.axisLeft(y).tickSize(0).tickPadding(x(0) + 6));
    });
  }
  componentDidMount = () => {
    this.d3Chart(this.props.id);
  };

  render() {
    return (
      <div>
        <svg id={this.props.id} width="960" height="500"></svg>
      </div>
    );
  }
}

WaterFallChart.propTypes = {

};

export default WaterFallChart;
