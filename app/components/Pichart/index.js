/**
*
* Pichart
*
*/

import React from 'react';
import * as d3 from 'd3';
import './style.scss';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Pichart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (data,id) =>
  {
    // let data = [10, 20];
    let frameWidth = document.getElementById(id).clientWidth;
    let margin = {top: 30, right: 30, bottom: 30, left: 30},
      width = frameWidth - margin.left - margin.right,
      height = frameWidth - margin.top - margin.bottom,
      radius = Math.min(width, height) / 1.5;

    let color = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6"]);

    let arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    let labelArc = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    let pie = d3.pie()
      .sort(null)
      .value(function(d) { return d; });




     let svg = d3.select("#" + id + '_svg')
       .attr("width", frameWidth)
       .attr("height", frameWidth*0.8)
       //responsive SVG needs these 2 attributes and no width and height attr
       .attr("preserveAspectRatio", "xMinYMin meet")
       .attr("viewBox", "0 0 400 400")
       //class to make it responsive
       .classed("svg-content-responsive", true)
      .append("g")
     //  .attr("transform", "translate(" + margin.left+ "," + margin.top + ")");
      .attr("transform", "translate(" + radius + " " + radius+ ")");

    setTimeout(function(){
      d3.select('#'+id+'_svg').attr("width",null).attr("height",null)
    },100)
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
      .style("fill", function(d) { return color(d.data); });

    g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".45em")
      .text(function(d) { return d.data; });


    let dataGroup = [{"key":'Tesco Share'},{"key":'Market Share'}]


    // Legend

    let legend = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 14)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(dataGroup)
      .enter().append("g")
      .attr("transform", function (d, i) {
        console.log("PieChart d.key",d.key)
        return "translate(" + radius + "," + i * 25 + ")";
      });

    let color_hash = ["#98abc5", "#8a89a6"];


    legend.append("rect")
      .attr("x", 10 ).attr("y", radius)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d, i) {
        return color_hash[i];
      });

    legend.append("text")
      .attr("x", 0)
      .attr("y", radius + 10)
      .attr("dy", "0.32em")
      .text(function (d) {
        console.log("PieChart text d.key",d.key)
        return d.key;
      });


  }

  componentDidMount = () =>{
    console.log("inside Pi chart -----",this.props);
    // this.createChart([10, 20],'pi_chart');
    this.createChart(this.props.data,this.props.id);
  }

  componentDidUpdate = () =>
  {
    this.createChart(this.props.data,this.props.id);
  };

  render() {
    return (
      <div id = {this.props.id}>
        <svg id = {this.props.id + '_svg'}></svg>
      </div>
    );
  }
}

Pichart.propTypes = {

};

export default Pichart;
