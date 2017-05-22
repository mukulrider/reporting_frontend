/**
*
* MultilineThree
*
*/

import React from 'react';
// import styled from 'styled-components';
import * as d3 from 'd3';
import './style.scss';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class MultilineThree extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createMultilineThree = (data,chart_id,label_ty,label_ly,xaxis_title,yaxis_title,yaxis_title2,no_pref,no_suffix,no_pref2,no_suffix2) => {

    // Add the valueline path.
    // set the dimensions and margins of the graph
    // let containerWidth = document.getElementById(chart_id).clientWidth;
    let containerWidth = 1000;
    let margin = {top: 20, right: 200, bottom: 60, left: 100},
      width = containerWidth - margin.left - margin.right,
      height = containerWidth*0.3 - margin.top - margin.bottom;

    console.log("---insde the createMultilinePromoChart---- check2",margin);
// set the ranges
    let x = d3.scaleLinear().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);
    let y2 = d3.scaleLinear().range([height, 0]);
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.tesco_week; }));
    y.domain([0, d3.max(data, function(d) {
      return Math.max(+d.value_ty); })]);
    y2.domain([0, d3.max(data, function(d) {
      return Math.max(+d.avg_ty, +d.avg_ly); })]);


    //Titles
    // let xaxis_title="Price buckets (£) ";
    // let yaxis_title="# of SKUs";


    let xAxis = d3.axisBottom(x)
      .tickFormat(function(d) {
        return (d);
      });

    let a = 0;

    let yAxis = d3.axisLeft(y)
      .tickFormat(function(d) {
        if(d>1000) {
          console.log("---------------------Y axis d",d);
          a = d/ 1000;
          a=a+'K';
          console.log("---------------------Y axis a",a);
        }
        else
          a = d;
        a = no_pref + a + no_suffix;
        return (a);
      });

    let yAxis2 = d3.axisRight(y2)
      .tickFormat(function(d) {

        a = d;
        a = no_pref2 + a + no_suffix2;
        return (a);
      });

// define the value line (primary axis)
    let valueline = d3.line()
      .x(function(d) { return x(d.tesco_week); })
      .y(function(d) { return y(+d.value_ty); });

// define the 1st line (Secondary Axis)
    let avgline1 = d3.line()
      .x(function(d) { return x(d.tesco_week); })
      .y(function(d) { return y2(+d.avg_ty); });

// define the 2nd line (Secondary Axis)
    let avgline2 = d3.line()
      .x(function(d) { return x(d.tesco_week); })
      .y(function(d) { return y2(+d.avg_ly); });



// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

    let svg = d3.select('#'+chart_id);
    svg.selectAll("*").remove();

    svg = d3.select('#' + chart_id)
      .append("svg")
      .attr("id",chart_id + '_svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .classed("svg-content", true)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Get the data

    // format the data
    data.forEach(function(d) {

      d.value_ty = +d.value_ty;
      d.avg_ty = +d.avg_ty;
      d.avg_ly = +d.avg_ly;
    });

    // Remove the width height property from svg
    // setTimeout(function(){
    //   d3.select('#' + chart_id + '_svg').attr("height",null).attr("width",null);
    // },200)
    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "orange")
      .attr("d", valueline);

    // Add the avgline1 path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "black")
      .attr("d", avgline1);

    // Add the avgline2 path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "blue")
      .attr("d", avgline2);


    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .classed("axis xaxis", true)
      .call(xAxis)
    .selectAll("text")
      .attr("x",25)
      .attr("transform","rotate(45)");


    // Add the Y Axis
    svg.append("g")
      .classed("axis yaxis", true)
      .call(yAxis);

    //Add the secondary Y Axis
    svg.append("g")
      .attr("class", "axisRed")
      .attr("transform", "translate( " + width + ", 0 )")
      .call(yAxis2);



  //X axis title
    svg.append("text")
      .attr("transform","translate(" + (width/2) + " ," +(height+10 + margin.top+(margin.bottom/2)) + ")")
      .style("text-anchor", "middle")
      .text(xaxis_title);

    //Y axis title
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (margin.left)+30)
      // .attr("y", 0 - (width / 2))
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yaxis_title);

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 + (margin.left)+840)
      // .attr("y", 0 - (width / 2))
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yaxis_title2);

    //Legend

    let data_label = [{"label":label_ty},{"label":label_ly},{"label":"Value TY"}]

    let legend = svg.append("svg")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(data_label)
      .enter().append("g")
      .attr("transform", function (d, i) {
        console.log("Multiline ---- d.label",d.label)
        return "translate(0," + i * 25 + ")";
      });

    let color_hash = ["black","blue","yellow"];

    legend.append("rect")
      .attr("x", width+105 )
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d, i) {
        return color_hash[i];
      });

    legend.append("text")
      .attr("x", width+100)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function (d) {
        console.log("Multiline text d.label",d.label)
        return d.label;
      });


  };

  componentDidMount = () => {

    this.createMultilineThree(this.props.data,this.props.id,this.props.label_ty,this.props.label_ly
      ,this.props.xaxis_title,this.props.yaxis_title,this.props.yaxis_title2,this.props.no_pref,
      this.props.no_suffix,this.props.no_pref2, this.props.no_suffix2);
  };

  componentDidUpdate = () => {

    this.createMultilineThree(this.props.data,this.props.id,this.props.label_ty,
      this.props.label_ly,this.props.xaxis_title,this.props.yaxis_title,this.props.yaxis_title2,
      this.props.no_pref,this.props.no_suffix,this.props.no_pref2,this.props.no_suffix2);
  };




  render() {
    return (
      <div id={this.props.id}>
      </div>
    );
  }
}

MultilineThree.propTypes = {

};

export default MultilineThree;
