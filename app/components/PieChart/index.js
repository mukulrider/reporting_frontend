/**
*
* PieChart
*
*/

import React from 'react';
import * as d3 from 'd3';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './style.scss';
class PieChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (data,id) =>
  { console.log("Piechart inside createChart check 1",data);
    // let data = [10, 20];
    var containerWidth = document.getElementById(id).clientWidth;
    let margin = {top: 120, right: 20, bottom: 30, left: 50},
      width = containerWidth - margin.left - margin.right,
      height = containerWidth - margin.top - margin.bottom,
      radius = Math.min(width, height) / 1.5;
    console.log("Piechart inside createChart margin",margin);

    let arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);
    console.log("Piechart inside createChart arc",arc);
    let labelArc = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);
    console.log("Piechart inside createChart labelArc",labelArc);
    console.log("Piechart inside createChart check 2",data);

    let total = 0;
    data.forEach(function(d){total += d.value});



    let pie = d3.pie()
      .sort(null)
      .value(function(d) { return d.value; });
    var color = d3.scaleOrdinal()
      .range(["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"]);
    let color_hash = ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"];
    let svg = d3.select(`#${id}`);
    svg.selectAll("*").remove();
    console.log("Inside pie chart check 3",data);
    svg = d3.select("#" + id).append("svg")
      .attr("id",id + '_svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", containerWidth*0.5 + margin.top + margin.bottom)
      .append("g")
      //  .attr("transform", "translate(" + margin.left+ "," + margin.top + ")");
      .attr("transform", "translate(" + width / 2 + "," + height / 1.5 + ")");

    let g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("x", 55)
      .attr("y", 55)
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .attr("x", 55)
      .attr("y", 55)
      .style("fill", function(d) { return color(d.value); });



    g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) {

        return Math.round(d.value*100/total)+'%'; });

    let dataGroup = data;


    // Legend

    const legendWidth = containerWidth/5;
    let legend = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function (d, i) {
        return "translate(" + (i*-legendWidth) + "," + (radius*1.4) + ")";
      });

    // let color_hash = ["#f6eff7","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016450"];


    legend.append("rect")
      .attr("x", 140 )
      .attr("y", 0 )
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d, i) {
        return color_hash[i];
      });

    legend.append("text")
      .attr("x", 140 + legendWidth/2)
      .attr("y", 30)
      .attr("dy", "0.32em")
      .text(function (d) {
        console.log("PieChart text d.key",d.label)
        return d.label;
      });


  }

  componentDidMount = () =>{
    console.log("inside Pie chart -----",this.props);
    // this.createChart([10, 20],'pi_chart');
    this.createChart(this.props.data,this.props.id);
  }

  componentDidUpdate = () =>
  {
    this.createChart(this.props.data,this.props.id);
  };

  render() {
    return (
      <div className="pieContainer" id = {this.props.id}>
      </div>
    );
  }
}

PieChart.propTypes = {

};

export default PieChart;
