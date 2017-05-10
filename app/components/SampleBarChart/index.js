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

console.log("Inside the bar plot -=-=-=-=-====-=-=-=-",JSON.stringify(data));
    // let data = [{"parent_supplier":"Bob","profit_product":33},{"parent_supplier":"Robin","profit_product":12},{"parent_supplier":"Anne","profit_product":41},{"parent_supplier":"Mark","profit_product":16},{"parent_supplier":"Joe","profit_product":59},{"parent_supplier":"Eve","profit_product":38},{"parent_supplier":"Karen","profit_product":21},{"parent_supplier":"Kirsty","profit_product":25},{"parent_supplier":"Chris","profit_product":30},{"parent_supplier":"Lisa","profit_product":47},{"parent_supplier":"Tom","profit_product":5},{"parent_supplier":"Stacy","profit_product":20},{"parent_supplier":"Charles","profit_product":13},{"parent_supplier":"Mary","profit_product":29}];
let containerWidth = document.getElementById(id).clientWidth;
// set the dimensions and margins of the graph
    let margin = {top: 20, right: 20, bottom: 30, left: 150},
      width = containerWidth - margin.left - margin.right,
      height = containerWidth - margin.top - margin.bottom;

// set the ranges
    let y = d3.scaleBand()
      .range([height, 0])
      .padding(0.1);

    let x = d3.scaleLinear()
      .range([0, width]);

    let svg = d3.select(`#${id}`);

    svg.selectAll("*").remove();

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    svg = d3.select("#"+id).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // format the data
    data.forEach(function(d) {
      d.val = +d.val;
    });

    // Scale the range of the data in the domains
    x.domain([0, d3.max(data, function(d){ return d.val; })])
    y.domain(data.map(function(d) { return d.parent_supplier; }));
    //y.domain([0, d3.max(data, function(d) { return d.profit_product; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      //.attr("x", function(d) { return x(d.profit_product); })
      .attr("width", function(d) {return x(d.val); } )
      .attr("y", function(d) { return y(d.parent_supplier); })
      .attr("height", y.bandwidth());

    let wrap = (text, width) => {
      text.each(function () {
        let text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em").style("font-size", "8px");
        console.log("water", text);
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          console.log('line1',line);
          console.log('width',width);
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            console.log('line2',line);
            tspan.text(line.join(" "));
            console.log('tspan.text',tspan.text);
            line = [word];
            console.log('line',line);
            console.log('lineNumber',lineNumber);
            console.log('word',word);
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word).style("font-size", "8px");
          }
        }
      });
    }



    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll(".tick text")
      .call(wrap, margin.left + 10);



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
      <div>
        <div id={this.props.id}></div>
      </div>
    );
  }
}

SampleBarChart.propTypes = {

};

export default SampleBarChart;
