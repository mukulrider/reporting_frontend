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
    var containerWidth = document.getElementById(id).clientWidth;
    let margin = {top: 20, right: 20, bottom: 30, left: 10},
      width = containerWidth - margin.left - margin.right,
      height = containerWidth*0.7 - margin.top - margin.bottom,
      radius = Math.min(width, height) / 2;

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

    let svg = d3.select(`#${id}`);

    svg.selectAll("*").remove();

     svg = d3.select("#" + id).append("svg")
       .attr("id",id + '_svg')
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       // //responsive SVG needs these 2 attributes and no width and height attr
       // .attr("preserveAspectRatio", "xMinYMin meet")
       // .attr("viewBox", "0 0 300 300")
       // //class to make it responsive
       // .classed("svg-content-responsive", true)
       .append("g")
      .attr("transform", "translate(200," + (width/3) + ")");

     setTimeout(function(){
       d3.select('#' + id + '_svg').attr("width",null).attr("height",null)
     },200)
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
      .text(function(d) { return d.data + '%'; });


    let dataGroup = [{"key":'Market Share'},{"key":'Tesco Share'}]


    // Legend

    let legend = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(dataGroup)
      .enter().append("g")
      .attr("transform", function (d, i) {
        console.log("PieChart d.key",d.key)
        return "translate(0," + i * 25 + ")";
      });

    let color_hash = ["#98abc5", "#8a89a6"];


    legend.append("rect")
      .attr("x", 85 )
      .attr("width", 19)
      .attr("height", 19)
      .attr("y", 75)
      .attr("fill", function (d, i) {
        return color_hash[i];
      });

    legend.append("text")
      .attr("x", 80)
      .attr("y", 85)
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
      </div>
    );
  }
}

Pichart.propTypes = {

};

export default Pichart;
