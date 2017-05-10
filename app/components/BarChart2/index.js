/**
 *
 * BarChart2
 *
 */

import React from 'react';
// import styled from 'styled-components';

import * as d3          from 'd3';
import styles from './style.scss';
import {FormattedMessage} from 'react-intl';
import messages from './messages';

class BarChart2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (data) => {
    var svg = d3.select("#barchart2"),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // d3.tsv("https://gist.githubusercontent.com/mbostock/3885304/raw/a91f37f5f4b43269df3dbabcda0090310c05285d/data.tsv", function(d) {
    //   d.frequency = +d.frequency;
    //   return d;
    // }, function(error, data) {
    //   if (error) throw error;
    //
    // console.log(data);
    // let data = [{"letter":"A", frequency:100}, {"letter":"B", frequency:200}];

    console.log(data);

    x.domain(data.map(function (d) {
      return d.letter;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d.frequency;
    })]);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {
        return x(d.letter);
      })
      .attr("y", function (d) {
        return y(d.frequency);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.frequency);
      });
    // });
  };
  componentDidMount = () => {
    this.createChart(this.props.data)
  };

  componentDidUpdate = () => {
    this.createChart(this.props.data)
  };

  render() {
    return (
      <div>
        <svg width="960" height="500" id="barchart2"></svg>
      </div>
    );
  }
}

BarChart2.propTypes = {};

export default BarChart2;
