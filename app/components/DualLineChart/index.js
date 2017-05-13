/**
*
* DualLineChart
*
*/

'use strict';
import React from 'react';
import $ from 'jquery';
import * as d3 from 'd3';
import styles from './style.scss';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class DualLineChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  createChart = (data, ty_text, ly_text, y_axis_text) => {
    const data1 = data;
    console.log('This is my data');
    console.log(data1);
    console.log(ty_text);
    console.log(ly_text);

    let margin = {top: 30, right: 30, bottom: 80, left: 80},
      width = 850 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    console.log(height + 10);
// parse the date / time
    const parseTime = d3.timeParse('%Y%W');

// set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const z = d3.scaleOrdinal()
      .range(['#CFDB39', '#02958B']);

    const xAxis = d3.axisBottom()
      .scale(x)
      .tickFormat(d3.timeFormat('%Y%W'))
      .ticks(d3.timeWeek.every(1));

    let format = d3.format(',');

    const yAxis = d3.axisLeft()
      .scale(y)
      .tickFormat((d) => {
        if ((d / 1000) >= 1 || (d / 1000) <= -1) {
          d = d / 1000;
        }
        if (y_axis_text == "Sales Volume") {
          return `${format(d)} K`;
        }
        else {
          return `£ ${format(d)} K`;
        }
      });

// define the 1st line
    const valueline = d3.line()
      .x((d) => x(d.tesco_week))
      .y((d) => y(d.metric_ty));

// define the 2nd line
    const valueline2 = d3.line()
      .x((d) => x(d.tesco_week))
      .y((d) => y(d.metric_ly));

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

    let svg = d3.select('#sample');
    svg.selectAll('*').remove();

    svg = d3.select('#sample')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        `translate(${margin.left},${margin.top})`);
// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin


// Get the data


    // format the data
    data1.forEach((d) => {
      d.tesco_week = parseTime(d.tesco_week);
      d.metric_ty = +d.metric_ty;
      d.metric_ly = +d.metric_ly;
    });

    // Scale the range of the data
    /*      x.domain(d3.extent(data1, function(d) { return d.tesco_week; }));
     y.domain([0, d3.max(data1, function(d) {
     return (Math.max(d.sales_ty, d.sales_ly)/1000000); })]);*/


    // Add the valueline path.
    x.domain(d3.extent(data1, (d) => d.tesco_week));
    y.domain([d3.min(data1, (d) => (Math.min(0, d.metric_ty, d.metric_ly))), d3.max(data1, (d) => (Math.max(d.metric_ty, d.metric_ly)))]);
    z.domain(['ty_text', 'ly_text']);

    // Add the valueline path.
    svg.append('path')
      .data([data1])
      .attr('class', 'line')
      .style('stroke', '#02958B')
      .attr('d', valueline);

    // Add the valueline2 path.
    svg.append('path')
      .data([data1])
      .attr('class', 'line')
      .style('stroke', '#CFDB39')
      .attr('d', valueline2);

    // Add the X Axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)')
      .append('text')
      .attr('x', width / 2)
      .attr('y', 35)
      .attr('dx', '0.71em')
      .attr('fill', '#000')
      .style('font', '20px sans-serif')
      .text('Weeks---->');

    // Add the Y Axis
    svg.append('g')
      .call(yAxis);

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - (margin.left))
      .attr('x', 0 - (height / 2) - 15)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font', '18px sans-serif')
      .text((d) => y_axis_text);

    const legend = svg.selectAll('.legend')
      .data(['metric_ly', 'metric_ty'])
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0,${i * 10})`)
      .style('font', '12px sans-serif');

    legend.append('rect')
      .attr('x', width / 2 + 3 * (margin.left))
      .attr('y',  margin.top/2)
      .attr('width', 25)
      .attr('height', 2.5)
      .attr('fill', z);

    legend.append('text')
      .attr('x', width / 2 +4 * (margin.left))
      .attr('y', margin.top/2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .text((d) => {
        if (d == 'metric_ly') {
          return ly_text;
        } else {
          return ty_text;
        }
      });



  }

  componentDidMount = () => {
    console.log('Component Mount -> ', this.props.data);
    this.createChart(this.props.data, this.props.ty_text, this.props.ly_text, this.props.y_axis_text);

    let svgElement = document.getElementById('sample');
    let jsonData = this.props.data;
/*    console.log("datapng:",datapng);
    console.log("SVG DOC:",document.getElementById('sample'));
    console.log("SVG DOC HTML:",document.getElementById('sample').outerHTML);*/
/*    saveSvgAsPng(document.getElementById("sample"), "diagram.png");
    console.log("SavePNGasPNGFinished!!!");
    console.log("Chart CSV DATA:",this.props.data);
    jsonexport(this.props.data,function(err, csv){
      if(err) return console.log(err);
     let blob = new Blob([csv], { type: 'text/plain;charset=utf-8' })
     saveAs(blob, 'd3_chart.csv')
    });*/
  };

  componentDidUpdate = () => {
    console.log('Component Update Mount -> ', this.props.data);
    this.createChart(this.props.data, this.props.ty_text, this.props.ly_text, this.props.y_axis_text);
  };

  render() {
    return (
      <div>
        <svg id="sample" ref="image" fontFamily="sans-serif" fontSize="10"> </svg>
      </div>
    );
  }
}

DualLineChart.propTypes = {

};

export default DualLineChart;
