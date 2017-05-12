/**
 *
 * StackedChart
 *
 */

import React from 'react';
import * as d3 from 'd3';
import { FormattedMessage } from 'react-intl';

class BarChartSimple extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createBarChartSimple = (data,chart_id,label_ty,label_ly,xaxis_title,yaxis_title,no_pref='',no_suffix='',col_a) => {

    // Fetching container Width
    let containerWidth = document.getElementById(chart_id).clientWidth;
    // Define Legend Parameters
    let legend_width = containerWidth*1.8, legend_text_width=containerWidth*1.8 -20;
    //defining the colors for the chart bars
    let color_hash = ["#98abc5", "#6b486b"];
    // creating legend object for chart
    let data_label = [{"label": col_a},{"label":"Sales"}] // defining the legend label variable


    let svg = d3.select('#'+chart_id + '_svg');
    svg.selectAll("*").remove();

    var margin = {top: 20, right: 70, bottom: 50, left: 50},
      width = containerWidth - margin.right - margin.left,
      height = containerWidth*0.8 - margin.top - margin.bottom;
      // width = containerWidth - margin.right*2 - margin.left*2,
      // height = containerWidth*0.8 - margin.top - margin.bottom;

      console.log(width);
      console.log(height);

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.3),
      y = d3.scaleLinear().rangeRound([height, 0]);
    svg
      .attr("height",height+margin.top +margin.bottom)
      .attr("width",width+ margin.right + margin.left)
      // .attr("preserveAspectRatio", "xMinYMin meet")
      // .attr("viewBox", "0 0 600 400")
      // .classed("svg-content", true);

    //Removing the height and width property for preserveAspectRatio
    // setTimeout(function(){
    //   d3.select('#'+chart_id + '_svg')
    //     .attr("height",null)
    //     .attr("width",null);
    // },100);

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

    const formatVolume = (i) => {
      if (i >= 1000 || i <= -1000) {
        const rounded = Math.round(i / 1000);
        return (`${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}K`);
      } else {
        return (Math.round(i));
      }
    };


    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    let a = 0;
    g.append("g")
      .call(d3.axisLeft(y).tickFormat(function(d) {
        // if(d>1000) {
        //   console.log("---------------------Y axis d",d);
        //   a = d/ 1000;
        //   a=a+'K';
        //   console.log("---------------------Y axis a",a);
        // }
        // else
        //   a = d;
        // a = no_pref + a + no_suffix;
        // return (a);
        return formatVolume(d);

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
      .attr("font-family", "Tesco")
      .attr("font-size", 12).attr("text-anchor", "start")
      .selectAll("g")
      .data(data_label)
      .enter().append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 25 + ")";
      });
    legend.append("rect")
      .attr("x", containerWidth-margin.right-20)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d, i) {
        return color_hash[i];
      });

    legend.append("text")
      .attr("x", containerWidth-margin.right)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function (d) {
        return d.label;
      });


  }

  componentDidMount = () => {
    this.createBarChartSimple(this.props.data,this.props.id,this.props.label_ty,this.props.label_ly,this.props.xaxis_title,this.props.yaxis_title,this.props.no_pref,this.props.no_suffix,this.props.col_a);
  };

  componentDidUpdate = () => {
    this.createBarChartSimple(this.props.data,this.props.id,this.props.label_ty,this.props.label_ly,this.props.xaxis_title,this.props.yaxis_title,this.props.no_pref,this.props.no_suffix,this.props.col_a);
  };



  render() {
    return (
      <div id={this.props.id}><svg id={this.props.id + '_svg'} style={{fontSize:"22px"}}></svg></div>
    );
  }
}

BarChartSimple.propTypes = {

};

export default BarChartSimple;
