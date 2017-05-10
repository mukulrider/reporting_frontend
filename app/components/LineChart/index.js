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
  created3Graph = (data,y_axis) => {
console.log("This is my line chart data:",data);

    // let data1 = [
    //   {
    //     "tot_val": "17554460.700",
    //     "calendar_date": "2017-05-04"
    //   },
    //   {
    //     "tot_val": "15124515.440",
    //     "calendar_date": "2017-05-03"
    //   },
    //   {
    //     "tot_val": "15631658.030",
    //     "calendar_date": "2017-05-02"
    //   },
    //   {
    //     "tot_val": "14924648.100",
    //     "calendar_date": "2017-05-01"
    //   },
    //   {
    //     "tot_val": "15347016.900",
    //     "calendar_date": "2017-04-30"
    //   },
    //   {
    //     "tot_val": "28903519.880",
    //     "calendar_date": "2017-04-29"
    //   },
    //   {
    //     "tot_val": "28469925.330",
    //     "calendar_date": "2017-04-28"
    //   },
    //   {
    //     "tot_val": "19627733.270",
    //     "calendar_date": "2017-04-27"
    //   }
    // ];

    const data1=data;
    let margin = {top: 30, right: 40, bottom: 70, left: 50},
      width = 700 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;
console.log("Margin.Left:",margin.left);
console.log("Margin.Right:",margin.right);
    let svg = d3.select("#sampleSvg")

    svg.selectAll("*").remove();

    svg.attr('width',width+margin.left+margin.right)
      .attr('height',height+margin.top+margin.bottom)
      .append("g")
      .attr('transform', 'translate(200,0)');

    const parseTime = d3.timeParse("%Y-%m-%d");

    let x = d3.scaleTime()
      .rangeRound([0, width]);

    let y = d3.scaleLinear()
      .rangeRound([height, 0]);

    let line = d3.line()
      .x(function (d) {return x(d.calendar_date)})
      .y(function (d) {return y(d.tot_val)});

    let formatTime = d3.timeFormat("%d %b");


    // console.log("Parsed Value", formatTime(parseTime("June 30, 2015")));
    data1.forEach((d) => {
      // console.log("Parsed Value", parseTime(d.calendar_date));
      // console.log("Formated Value", formatTime(parseTime(d.calendar_date)));
      d.calendar_date = parseTime(d.calendar_date);
      // console.log("formatting",d3.time.format('%m-%d')(d.calendar_date));
      d.tot_val = +d.tot_val;
      return d;
    });

      x.domain(d3.extent(data1, function (d) {
        return d.calendar_date;
      }));
      y.domain(d3.extent(data1, function (d) {
        return d.tot_val;
      }));

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(
          function(data){
          var dateObj = new Date(data);
          return dateObj.getDate() + '-' + dateObj.getMonth() + '-' + dateObj.getFullYear()}).ticks(7)
        ).selectAll("text")
        .attr("transform","translate(20,10)rotate(45)")
        .select(".domain")
        .remove();

      //Axis Title
      svg.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text(this.props.y_axis)
        .selectAll();

      svg.append("path")
        .datum(data1)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);



  }
  componentDidMount = () => {
    console.log("Line Chart Data",this.props.data)
    this.created3Graph(this.props.data)
    console.log("Line Chart Props",this.props.y_axis)
  };

  componentDidUpdate = () => {
    console.log("updated.. line chart", this.props.data)
    this.created3Graph(this.props.data)
  };

  render() {
    return (
      <div>
        <svg id="sampleSvg" className="lineChart"></svg>
      </div>
    );
  }
}

LineChart.propTypes = {};

export default LineChart;
