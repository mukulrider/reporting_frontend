/**
 *
 * StackedChart
 *
 */

import React from 'react';
import * as d3 from 'd3';
import { FormattedMessage } from 'react-intl';

class BarChartSimple extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createBarChartSimple = (data,chart_id,label_ty,label_ly,xaxis_title,yaxis_title,no_pref='',no_suffix='') => {

    // Fetching container Width
    let containerWidth = document.getElementById(chart_id).clientWidth;
    // Define Legend Parameters
    let legend_width = containerWidth*1.8, legend_text_width=containerWidth*1.8 -20;
    //defining the colors for the chart bars
    let color_hash = ["steelblue","red"];
    // creating legend object for chart
    let data_label = [{"label":"Dummy Label"},{"label":"Dummy Label2"}] // defining the legend label variable


    let svg = d3.select('#'+this.props.id + '_svg');
    svg.selectAll("*").remove();

    var margin = {top: 20, right: 0, bottom: 30, left: 100},
      width = containerWidth,
      height = containerWidth*0.9;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);
    svg
      .attr("height",height)
      .attr("width",width)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 600 600")
      .classed("svg-content", true);

    //Removing the height and width property for preserveAspectRatio
    setTimeout(function(){
      d3.select('#'+chart_id + '_svg')
        .attr("height",null)
        .attr("width",null);
    },10);

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // data = [{'label' :'A' , 'value' : 20},
    //   {'label' : 'B', 'value' : 25},
    //   {'label' : 'C', 'value' : 45},
    //   {'label' : 'D', 'value' : 35},
    //   {'label' : 'E', 'value' : 55},
    //   { 'label' : 'F' , 'value' : 30}];

    x.domain(data.map(function(d) { return d.label; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size","22px")
      .call(d3.axisBottom(x));
    let a = 0;
    g.append("g")
      .style("font-size","22px")
      .call(d3.axisLeft(y).tickFormat(function(d) {
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
      }))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")

      .text("value");


    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.label); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function (d, i) {
        return color_hash[i];
      });


    let legend = svg.append("svg")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(data_label)
      .enter().append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 25 + ")";
      });
    legend.append("rect")
      .attr("x", legend_width )
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d, i) {
        return color_hash[i];
      });

    legend.append("text")
      .attr("x", legend_text_width)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function (d) {
        console.log("Multiline text d.label",d.label)
        return d.label;
      });


  }

  componentDidMount = () => {
    this.createBarChartSimple(this.props.data,this.props.id,this.props.label_ty,this.props.label_ly,this.props.xaxis_title,this.props.yaxis_title,this.props.no_pref,this.props.no_suffix);
  };

  componentDidUpdate = () => {
    this.createBarChartSimple(this.props.data,this.props.id,this.props.label_ty,this.props.label_ly,this.props.xaxis_title,this.props.yaxis_title,this.props.no_pref,this.props.no_suffix);
  };



  render() {
    return (
      <div id={this.props.id}><svg id={this.props.id + '_svg'}></svg></div>
    );
  }
}

BarChartSimple.propTypes = {

};

export default BarChartSimple;
