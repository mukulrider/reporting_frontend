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

class DualLineChart2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  createChart = (data, x_axis, y_axis,legendTY, legendLY, id) => {
    const data1 = data;
    console.log('This is my data',data1);

    let containerWidth = document.getElementById(id).clientWidth;
    let margin = {top: 30, right: 80, bottom: 80, left: 90},
      width = containerWidth - margin.left - margin.right,
      height = containerWidth*0.8 - margin.top - margin.bottom;

    const parseTime = d3.timeParse('%A');

    let domainArray = [];
    for (let i = 0; i < data1.length; i++) {
      domainArray.push(data1[i].week_day_str);
    }

// set the ranges
    const x = d3.scalePoint().range([0, width]).domain(domainArray);
    const y = d3.scaleLinear().range([height, 0]);


    const z = d3.scaleOrdinal()
      .range(['#02958B','#CFDB39']);

    const xAxis = d3.axisBottom()
      .scale(x);

    let format = d3.format(',');

    const yAxis = d3.axisLeft()
      .scale(y)
      .tickFormat((d) => {
        if ((d / 1000) >= 1 || (d / 1000) <= -1) {
          d = d / 1000;
          if (y_axis == "Volume") {
            return `${format(d)} K`;
          }
          else {
            return `£ ${format(d)} K`;
          }
        }
        else {
          if (y_axis == "Volume") {
            return (Math.round(d));
          }
          else {
            return ('£ ' + Math.round(d));
          }
        }
      });

// define the 1st line
    const valueline = d3.line()
      .x((d) => x(d.week_day_str))
      .y((d) => y(d.tot_val));

// define the 2nd line
    const valueline2 = d3.line()
      .x((d) => x(d.week_day_str))
      .y((d) => y(d.tot_val_ly));

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

    let svg = d3.select(`#${id}`);

    svg.selectAll('*').remove();

    svg = d3.select("#" + id).append("svg")
      .attr("id", id + '_svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        `translate(${margin.left},${margin.top})`);


    // Add the valueline path.
    y.domain([d3.min(data1, (d) => (Math.min(d.tot_val, d.tot_val_ly))), d3.max(data1, (d) => (Math.max(d.tot_val, d.tot_val_ly)))]);


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
      .call(xAxis);
      // .selectAll('text')
      // .style('text-anchor', 'end')
      // .attr('dx', '-.8em')
      // .attr('dy', '.15em')
      // .attr('transform', 'rotate(-65)');

    svg.append('text')
      .attr('x', width / 3.5)
      .attr('y', height+2.5*margin.top)
      .attr('dx', '0.71em')
      .attr('fill', '#000')
      .style('text-anchor', 'middle')
      .style('font', '18px sans-serif')
      .text(x_axis);

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
      .text((d) => y_axis);

    const legend = svg.selectAll('.legend')
      .data(['tot_val', 'tot_val_ly'])
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0,${i * 20})`)
      .style('font', '12px sans-serif');

    legend.append('rect')
      .attr('x', width / 3 + 2 * (margin.left))
      .attr('y',  height+1.5*margin.top)
      .attr('width', 25)
      .attr('height', 2.5)
      .attr('fill', z);

    legend.append('text')
      .attr('x', width / 3 +3 * (margin.left))
      .attr('y', height+1.5*margin.top)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .text((d) => {
        if (d == 'tot_val') {
          return legendTY;
        } else {
          return legendLY;
        }
      });



  }

  componentDidMount = () => {
    console.log('Component Mount -> ');
    this.createChart(this.props.data,this.props.x_axis, this.props.y_axis,this.props.legendTY, this.props.legendLY, this.props.id);

  };

  componentDidUpdate = () => {
    console.log('Component Update Mount -> ');
    this.createChart(this.props.data,this.props.x_axis,this.props.y_axis,this.props.legendTY, this.props.legendLY,this.props.id);
  };

  render() {
    return (
      <div id={this.props.id} style={{background:"#fff", border: "1px solid #ccc"}}>
      </div>
    );
  }
}

DualLineChart2.propTypes = {

};

export default DualLineChart2;
