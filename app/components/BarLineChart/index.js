/**
 *
 * BarLineChart
 *
 */

import React from 'react';
import * as d3 from 'd3';
import './style.scss';
// import styled from 'styled-components';

import {FormattedMessage} from 'react-intl';
import messages from './messages';

class BarLineChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  createChart = (data, id,series_col_name) => {
    let frameWidth = document.getElementById(id).clientWidth;
    console.log("Inside BarLineChart -------", data);
    let margin = {top: 20, right: 40, bottom: 80, left: 70},
      width = frameWidth - margin.left - margin.right,
      height = frameWidth*0.6 - margin.top - margin.bottom;

    let x = d3.scaleBand()
      .rangeRound([0, width], .1)
      .paddingInner(0.1);

    let y = d3.scaleLinear()
      .range([height, 0]);

    let xAxis = d3.axisBottom()
      .scale(x);

    let yAxis = d3.axisLeft()
      .scale(y)
      .tickFormat(function(d){return d + '%'})
      .ticks(10, "");

    let svg = d3.select(`#${id}`);

    svg.selectAll("*").remove();

    svg = d3.select("#" + id).append("svg")
      .attr("id", id + '_svg')
      .attr("ref",'competitorOutperformSvg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + (width + margin.left + margin.right)  + " " + (height + margin.top + margin.bottom + 20))
      //class to make it responsive
      .classed("svg-content-responsive", true)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    console.log("barLineChart");
    console.log("barLineChart",data);
    x.domain(data.map(function (d) {
      return d.label_week;
    }));

    // setTimeout(function(){
    //   console.log("Removing height and width from BarLineChart :",id)
    //   d3.select("#" + id + '_svg').attr("height",null).attr("width",null)
    // },100);

    let a=d3.min(data, function (d) {
      return +d.tesco_growth});
    console.log("BarLineChart a",a);
    let b=d3.min(data, function (d) {
      return +d.market_outperform});
    console.log("BarLineChart b",b);
    let c=d3.min(data, function (d) {
      return +d.market_growth});
    console.log("BarLineChart c",c);
    let d=d3.min(data, function (d) {
      return +d.tesco_outperform});
    console.log("BarLineChart d",d);
    let e = [a,b,c,d];
    console.log("BarLineChart e",e);
    let range_min = d3.min(e, function (d) {
      return +d});
    a=d3.max(data, function (d) {

      return +d.tesco_growth});
    console.log("BarLineChart tesco_growth",data.tesco_growth);
    console.log("BarLineChart a",a);
    b=d3.max(data, function (d) {
      return +d.market_outperform});
    console.log("BarLineChart market_outperform",data.market_outperform);
    console.log("BarLineChart b",b);
    c=d3.max(data, function (d) {
      return +d.market_growth});
    console.log("BarLineChart market_growth",data.market_growth);
    console.log("BarLineChart c",c);
    d=d3.max(data, function (d) {
      return +d.tesco_outperform});
    console.log("BarLineChart tesco_outperform",data.tesco_outperform);
    console.log("BarLineChart d",d);

    e = [a,b,c,d];
    console.log("BarLineChart e",e);
    let range_max = d3.max(e, function (d) {
      return +d});
    console.log("BarLineChart range_max",range_max);
    console.log("BarLineChart range_min",range_min);
    y.domain([range_min, range_max]);

    let line1 = d3.line()
      .x(function (d) {
        return x(d.label_week);
      })
      .y(function (d) {
        return y(d.tesco_growth);
      });

    let line2 = d3.line()
      .x(function (d) {
        return x(d.label_week);
      })
      .y(function (d) {
        return y(d.market_outperform);
      });

    let line3 = d3.line()
      .x(function (d) {
        return x(d.label_week);
      })
      .y(function (d) {
        return y(d.market_growth);
      });

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
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        console.log("water", text);
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }

    svg.append("g")
    // .attr("class", "x axis")
    //  .attr("transform", "translate(0," + (margin.left - 6.5) + "," + height + ")")
      .attr("transform", "translate(0 ," + height + ")")
      .classed("axis xaxis", true)
      // .selectAll(".tick text")
      // .call(wrap, x.bandwidth())
      .call(xAxis)
      .selectAll(".tick text")
      .attr("transform","rotate(45)translate(20,0)");
//    .call(wrap, x.bandwidth());

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("tesco_growth");


    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", function(d) {
        if (+d.tesco_outperform < 0){
          return "bar negative";
        } else {
          return "bar positive";
        }
      })
      .attr("x", function (d) {
        return x(d.label_week);
      })

      .attr("width", x.bandwidth())
      // .attr("y", function (d) {
      //   return y(d.tesco_outperform);
      // })
      .attr("y", function(d) {

        if (d.tesco_outperform > 0) {
          return y(d.tesco_outperform);
        } else {
          return y(0);
        }
      })
        .attr("height", function(d) {
        return Math.abs(y(d.tesco_outperform) - y(0));
      });

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line1);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "yellow")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line2);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line3);

    svg.append("text")
      .attr("transform","translate(" + (width/2) + " ," +(height + margin.top+(margin.bottom/2.5)) + ")")
      // .attr("transform","translate(" + (width/2) + " ," +(height + margin.top+(margin.bottom)) + ")")
      .style("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("font-weight","bolder")
      .text("Week ---- >");

    //Y axis
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (margin.left)+10)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("font-size", 12)
      .attr("font-weight","bolder")
      .text("Value Growth (%) ---- >");

    function type(d) {
      d.tesco_growth = +d.tesco_growth;
      return d;
    }

    //---------- Adding the legends

    let dataGroup = [{"key":'Tesco Growth'},{"key":'Market Growth'},{"key":'Tesco Outperformance'}]
    const legendWidth = frameWidth/3;
    let legend = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(dataGroup)
      .enter().append("g")
      .attr("transform", function (d, i) {
        console.log("BarLineChart  d.key",d.key)
        return "translate(" + (i*legendWidth + margin.left) + "," + (height + margin.bottom - 10) + ")"; //(i*-legendWidth)
      });

    let color_hash = ['green','red','steelblue'];
    legend.append("rect")
      .attr("x", 0)
      .attr("y",-10)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d, i) {
        return color_hash[i];
      });

    legend.append("text")
      .attr("x", 0)
      .attr("dy", "0.32em")
      .text(function (d) {
        return d.key;
      });

  };

  componentDidMount = () => {
    console.log('BarLineChart index.js', this.props.data)

    this.createChart(this.props.data, this.props.id,this.props.series_col_name)
  };

  componentDidUpdate = () => {
    this.createChart(this.props.data, this.props.id,this.props.series_col_name)
  };

  render() {
    return (
      <div id={this.props.id}>
      </div>
    );
  }
}

BarLineChart.propTypes = {};

export default BarLineChart;
