/**
*
* BubbleChart
*
*/

import React from 'react';
import * as d3 from 'd3';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class BubbleChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (data2) => {
    let dataBubbleUrlParams = '';
    console.log("Inside bubblechart js function",data2)
    //Chart configurations

    let margin = {top: 20, right: 20, bottom: 40, left: 30};
    let width = 700-margin.left-margin.right,
      height = 600-margin.top-margin.bottom;

    let svg = d3.select('#svgg');


    svg.selectAll("*").remove();
    //Adjusting position of the svg area
    let chart = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    let xScale = d3.scaleLinear().domain([0, d3.max(data2, function (d) {
      return d.cps_score;
    })+10]).range([0, width]);

    let yScale = d3.scaleLinear().domain([0, d3.max(data2, function (d) {
      return d.pps;
    })+10]).range([height, 0]);

    let rScale = d3.scaleLinear().domain([0, d3.max(data2, function (d) {
      return d.rate_of_sale;
    })]).range([5, 20]);


    //   let color = d3.scaleLinear().range(d3.schemeCategory20b);


    let xAxis = d3.axisBottom(xScale)
      .tickFormat(function (d) {
        return (Math.round(d*10)/10);
      });

    let yAxis = d3.axisLeft(yScale)
      .tickFormat(function (d) {
        return (Math.round(d*10)/10);
      });

    let colorArray=['steelblue','darkolivegreen'];
    // ---------- Appending AXIS to chart -----------------
    chart.append("g")
      .attr("transform", "translate(" + margin.left + ", " + height  + ")")
      .classed("axis", true)
      .call(xAxis);

    chart.append("g")
      .attr("transform", "translate(" + margin.left + ",0)")
      .classed("axis", true)
      .call(yAxis);


    // ------------- Adding data points-----------------
    chart.selectAll('circle')
      .data(data2)
      .enter()
      .append('circle')
      .attr("cx", function (d) {

        return (margin.left + xScale(d.cps));
      })
      .attr("cy", function (d) {

        return (yScale(d.pps));
      })
      .on('click',function(d){
        // let dataBubbleUrlParams = "base_product_number="+d.base_product_number;
        // console.log("bubble url",dataBubbleUrlParams);
        // bubbleFunc(dataBubbleUrlParams);
        // makeChart();
        // makeTable();
        // browserHistory.push(path.pathname + "?base_product_number="+d.base_product_number)
      })
      .attr("r", 0)
      .transition()
      .duration(2000)
      .attr("r", function (d) {
        return (rScale (d.rate_of_sale));
      })
      .style("fill",function(d){
        console.log("in_color_function",colorArray[0]);
        if(d.brand_ind=="Brand"){
          return colorArray[1];}
        else{return colorArray[0];}
      } );




    //This is for getting the axis labels
    chart.append("text")
      .attr("transform",
        "translate(" + (width/2) + " ," +(height + (margin.top*1.75)) + ")")
      .style("text-anchor", "middle")
      .text("CPS - Q");

    chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("PPS - Q");

  };

  componentDidMount = () => {
    console.log("Supplier Bubble",this.props.data[0])
    this.createChart(this.props.data[0])
    //,this.props.onSaveBubbleParam

  };

  componentDidUpdate = () => {
    // this.createChart(this.props.data);
    //  this.props.onSaveBubbleParam(databubbleUrlParams);
    //,this.props.onSaveBubbleParam,this.props.onFetchGraph,this.props.onGenerateTable
  };

  render() {
    return (
      <div>
        <svg id="svgg" width="800" height="600" fontFamily="sans-serif" fontSize="10"
             textAnchor="middle"> </svg>
      </div>
    );
  }
}

BubbleChart.propTypes = {

};

export default BubbleChart;
