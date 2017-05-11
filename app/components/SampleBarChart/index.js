/**
*
* SampleBarChart
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import style from './style.scss';
import * as d3          from 'd3';


class SampleBarChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  createChart = (data,id) => {
    var containerWidth = document.getElementById(id).clientWidth;
    var margin = {top: 30, right: 10, bottom: 50, left: 50},
      width = containerWidth,
      height = containerWidth*0.6;

 //var data = [{"val": 0.6808082857468343, "parent_supplier": "1530. - I UK", "tot_ty": 5266381.36, "tot_ly": 4809842.76}, {"val": -0.6645449347229002, "parent_supplier": "2180. - CONSTELLATION WINES", "tot_ty": 4823698.68, "tot_ly": 5269331.35}, {"val": -3.6886770407150795, "parent_supplier": "2053. - DIAGEO", "tot_ty": 4695267.49, "tot_ly": 7168832.35}, {"val": -2.2089248079057566, "parent_supplier": "646. - HEINEKEN UK", "tot_ty": 3323103.44, "tot_ly": 4804371.31}, {"val": 1.1315509664965708, "parent_supplier": "2081. - DE VERE GROUP", "tot_ty": 3134628.38, "tot_ly": 2375829.31}, {"val": 1.8387991928131238, "parent_supplier": "1346. - KINGSLAND WINES & SPIRITS", "tot_ty": 3083279.5, "tot_ly": 1850211.65}, {"val": 0.4338303423982114, "parent_supplier": "2170. - COORS BREWERS LTD", "tot_ty": 2630615.55, "tot_ly": 2339696.21}, {"val": 0.5135491600847835, "parent_supplier": "229. - VINA CONCHA Y TORO SA", "tot_ty": 2525925.18, "tot_ly": 2181547.74}, {"val": 0.45119610696027934, "parent_supplier": "928. - PERNOD RICARD UK", "tot_ty": 1809945.63, "tot_ly": 1507381.1}, {"val": -0.2738421116640983, "parent_supplier": "1873. - FIRST DRINKS BRANDS LTD", "tot_ty": 1719151.56, "tot_ly": 1902785.48}]

// Add svg to
    var svg = d3.select('#'+id + '_svg')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 600 400")
      //class to make it responsive
      .classed("svg-content-responsive", true)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

 setTimeout(function(){
   d3.select('#'+id + '_svg').attr("width",null).attr("height",null)
 },100)
// set the ranges
    var y = d3.scaleBand()
      .range([height, 0])
      .padding(0.1);

    var x = d3.scaleLinear()
      .range([0, width]);

    var getValueRange = function(){
      let d3_extent = d3.extent(data, function (d) {
        return d.val;
      })
      if(d3_extent[0] < 0 && d3_extent[1] < 0){ d3_extent[1] = 0 ; return d3_extent; }
      else if(d3_extent[0] > 0 && d3_extent[1] > 0){ d3_extent[0] = 0 ; return d3_extent;}
      else{ return d3_extent; }
    }

    // Scale the range of the data in the domains
    x.domain(getValueRange());
    y.domain(data.map(function (d) {
      return d.parent_supplier;
    }));

// append the rectangles for the bar chart
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", function (d) {
        return "bar bar--" + (d.val < 0 ? "negative" : "positive");
      })
      .attr("x", function (d) {
        return x(Math.min(0, d.val));
      })
      .attr("y", function (d) {
        return y(d.parent_supplier);
      })
      .attr("width", function (d) {
        return Math.abs(x(d.val) - x(0));
      })
      .attr("height", y.bandwidth());

// add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

// add the y Axis
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(d3.axisRight(y));


  }

  componentDidMount = () =>{
    console.log("Inside sample bar chart------",this.props)
    this.createChart(this.props.data[0],this.props.id);

  };

  componentDidUpdate= () =>{
    this.createChart(this.props.data[0],this.props.id);

  };

  render() {
    return (
        <div id={this.props.id}>
          <svg id={this.props.id + '_svg'}></svg>
        </div>
    );
  }
}

SampleBarChart.propTypes = {

};

export default SampleBarChart;
