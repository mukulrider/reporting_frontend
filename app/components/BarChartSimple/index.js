/**
 *
 * StackedChart
 *
 */

import React from 'react';
import * as d3 from 'd3';
import { FormattedMessage } from 'react-intl';

class BarChartSimple extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createBarChartSimple = (data,chart_id,label_ty,label_ly,xaxis_title,yaxis_title,no_pref,no_suffix) => {

    let svg = d3.select('#'+this.props.id + '_svg');
    svg.selectAll("*").remove();
    var margin = {top: 20, right: 30, bottom: 30, left: 100},
      width = 650 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);
    svg
      .attr("height",height)
      .attr("width",width)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 650 450")
      .classed("svg-content", true);

    //Removing the height and width property for preserveAspectRatio
    setTimeout(function(){
      svg
        .attr("height",null)
        .attr("width",null);
    },100);

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data = [{'letter' :'A' , 'frequency' : 20},
      {'letter' : 'B', 'frequency' : 25},
      {'letter' : 'C', 'frequency' : 45},
      {'letter' : 'D', 'frequency' : 35},
      {'letter' : 'E', 'frequency' : 55},
      { 'letter' : 'F' , 'frequency' : 30}];

    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size","22px")
      .call(d3.axisBottom(x));

    g.append("g")
      .style("font-size","22px")
      .call(d3.axisLeft(y).ticks(5, "%"))
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
      .attr("x", function(d) { return x(d.letter); })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.frequency); });



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
