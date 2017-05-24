/**
 *
 * BarChart2
 *
 */

import React from 'react';
import * as d3 from 'd3';
import styles from './style.scss';
import {FormattedMessage} from 'react-intl';

class HorizontalBarChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (data,chartId) => {
    const data1=data;
    console.log("HorizontalBarChart:",data1);
    console.log("Id:",chartId);
    let margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 350 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

// set the ranges
    const y = d3.scaleBand()
      .range([height, 0])
      .padding(0.1);

    const x = d3.scaleLinear()
      .range([0, width]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    let svg = d3.select('#HorizontalBarChart');
    svg.selectAll('*').remove();

    svg = d3.select("#" + chartId).append("svg")
      .attr("id",chartId+'_svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr('transform',
        `translate(${margin.left},${margin.top})`);

    // format the data

    let tooltip = d3.select("#" + chartId+'_svg').append("div").attr("class", "toolTip");

    // Scale the range of the data in the domains
    x.domain([d3.min(data1, (d) => (Math.min(0, d.value))), d3.max(data, (d) => (Math.max(d.value)))])
    y.domain(data1.map(function(d) { return d.retailer }));
    //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
      .data(data1)
      .enter().append("rect")
      .attr("class", "bar")
      //.attr("x", function(d) { return x(d.sales); })
      .attr("width", function(d) {return x(d.value); } )
      .attr("y", function(d) { return y(d.retailer); })
      .attr("height", y.bandwidth())
        .on("mouseover", function(d){
          console.log("Entered tooltip:");
          tooltip.style("left", d3.event.pageX - 5 + "px")
            .style("top", d3.event.pageY - 7 + "px")
            .style("display", "inline-block")
            .text((d.retailer) + ":" + (d.value)+"%");
        })
        .on("mouseout", function(d){ tooltip.style("display", "none");});

    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));


  }
  componentDidMount = () => {
    this.createChart(this.props.data,this.props.id);
  };

  componentDidUpdate = () => {
    console.log('Component Update Mount -> ', this.props.data);
    this.createChart(this.props.data,this.props.id);
  };

  render() {
    return (
      <div id={this.props.id}>
      </div>
    );
  }
}

HorizontalBarChart.propTypes = {};

export default HorizontalBarChart;
