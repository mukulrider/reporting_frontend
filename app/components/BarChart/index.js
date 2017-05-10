/**
 *
 * BarChart
 *
 */

import React from 'react';
// import styled from 'styled-components';
import * as d3          from 'd3';
import styles from './style.scss';
import {FormattedMessage} from 'react-intl';
import messages from './messages';
import Button from 'components/button';
// import jsonfile from './data.json';
// import jsonfile2 from './data2.json';

class BarChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  created3Graph = (id, json, xAxisVar, yAxisVar) => {
    // console.log(id);
    let data2 = [{letter: 'A', frequency: 0.08167}, {letter: 'B', frequency: 0.01492}, {
      letter: 'C',
      frequency: 0.07492
    }];
    let margin = {top: 20, right: 20, bottom: 30, left: 40};
    let height = 500 - margin.top - margin.bottom;
    let width = 960 - margin.left - margin.right;
    // let svg = d3.select('[id=' + id + ']');
    let svg = d3.select('#' + id);
    console.log(svg);
    svg.attr("width", width + margin.left + margin.right);
    svg.attr("height", height + margin.top + margin.bottom);

    let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

    let g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("data.tsv", function (error, data) {
      data = data2;
      if (error) throw error;

      x.domain(data.map(function (d) {
        return d[xAxisVar];
      }));
      y.domain([0, d3.max(data, function (d) {
        return d[yAxisVar];
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
          return x(d[xAxisVar]);
        })
        .attr("y", function (d) {
          return y(d[yAxisVar]);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d[yAxisVar]);
        });
    });
  };

  componentDidMount = () => {
    this.created3Graph(this.props.id, this.props.graphData, this.props.xAxisVar, this.props.yAxisVar)
  };

  componentDidUpdate = () => {
    this.created3Graph(this.props.id, this.props.graphData, this.props.xAxisVar, this.props.yAxisVar)
  };

  render() {
    const id = 'id_' + 'nike' + '_';
    // const id = 'id_1489562187437'
    // console.log(id);
    return (
      <div>
        <svg id={this.props.id} className="chart"></svg>
      </div>
    );
  }
}

BarChart.propTypes = {};

export default BarChart;
