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

    let color_hash = ["#98abc5", "#6b486b","#1FC546"];
    // creating legend object for chart
    let data_label = [{"label":"Budget"},{"label":"Sales"},{"label":"Forecast"}] // defining the legend label variable


    let tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .classed("tooltip_bubble",true)
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("color", "white")
      .style("padding", "8px")
      .style("background-color", "rgba(0, 0, 0, 0.75)")
      .style("border-radius", "6px")
      .style("font", "15px sans-serif")
      .text("tooltip");

    let svg = d3.select('#'+chart_id + '_svg');
    svg.selectAll("*").remove();

    var margin = {top: 20, right: 70, bottom: 50, left: 50},
      width = containerWidth - margin.right - margin.left,
      height = containerWidth*0.5 - margin.top - margin.bottom;
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.3),
      y = d3.scaleLinear().rangeRound([height, 0]);
    svg
      .attr("height",height+margin.top +margin.bottom*2)
      .attr("width",width+ margin.right + margin.left)
      .append("text")
      .attr("font-family", "Tesco")
      .attr("font-size", 12)
      .attr("transform", "rotate(-90)")
      .attr("y", 7)
      .attr("x",0 - (height / 2))
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Value");

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    x.domain(data.map(function(d) { return d.label; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    const formatVolume = (i) => {
      if (i >= 1000 || i <= -1000) {
        const rounded = Math.round(i / 1000);
        return (` £ ${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}K`);
      } else {
        return (Math.round(i));
      }
    };

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    let a = 0;
    g.append("g")
      .attr("transform","translate(20,0)")
      .call(d3.axisLeft(y).tickFormat(function(d) {
        return formatVolume(d);
      }));

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .on('mouseover', function(d) {
        console.log("bar mouseover",d);
      tooltip.html(d.label+":"+d.value);
        tooltip.style("visibility", "visible");
      })
      .on('mousemove', function() {
        // console.log("y--"+(d3.event.pageY)+"x-----"+(d3.event.pageX))
        return tooltip.style("top", (d3.event.pageY-100)+"px").style("left",(d3.event.pageX+5)+"px");
      })
      .on('mouseout', function(){return tooltip.style("visibility", "hidden");})
      .attr("x", function(d) { return x(d.label); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function (d, i) {
        return color_hash[i];
      });

    //For legends
    let legendWidth = containerWidth/3;
    let legend = svg.append("svg")
      .attr("font-family", "Tesco")
      .attr("font-size", 12)
      .attr("text-anchor", "start")
      .selectAll("g")
      .data(data_label)
      .enter().append("g")
      .attr("transform", function (d, i) {
        return "translate(" + (i*legendWidth + margin.left) + "," + (height + margin.bottom) + ")";
      });
    legend.append("rect")
      .attr("x", 20)
      .attr("y", 0)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d, i) {
        return color_hash[i];
      });

    legend.append("text")
      .attr("x", 40)
      .attr("y", 10)
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
