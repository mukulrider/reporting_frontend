/**
 *
 * WaterFallChartExec
 *
 */

import React from 'react';
// import styled from 'styled-components';

import * as d3 from 'd3';
import styles from './style.scss';

import {FormattedMessage} from 'react-intl';
import messages from './messages';

class WaterFallChartExec extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (data, id, yAxisName, formatter, positive_text, negative_text, total_text, xAxisName) => {

    let frameWidth = document.getElementById(id).clientWidth;
    let margin = {top: 100, right: 130, bottom: 40, left: 50},
      width = frameWidth - margin.left - margin.right,
      height = frameWidth*0.6 - margin.top;
      // height = frameWidth*0.6 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .rangeRound([0, width]);

    const y = d3.scaleLinear()
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);

    //FUNCTION FOR ADDING COMMA, POUND SYMBOL

    const formatSales = (i) => {
        if (i >= 1000 || i <= -1000) {
          const rounded = Math.round(i / 1000);
          let a = `£ ${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}K`;
          // alert("if greater than 0")
          // alert(a);
          return (`£ ${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}K`);
        } else {
          // alert("else less than 0");
          let b = `£ ${Math.round(i)}`;
          // alert(b);
          return (`${Math.round(i)}`);
        }

    };

    const yAxis = d3.axisLeft(y)
      .tickFormat((d) => (formatSales(d)))
      // .tickFormat(formatSales(d));

    let chart = d3.select(`#${id + '_svg'}`);
    chart.selectAll("*").remove();
    chart
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      // .attr("preserveAspectRatio", "xMinYMin meet")
      // .attr("viewBox", "0 0 650 500")
      // //class to make it responsive
      // .classed("svg-content-responsive", true)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);


    // setTimeout(function(){
    //   console.log("Waterfall removing height : " + id)
    //   d3.select(`#${id + '_svg'}`).attr("height",null)
    //     .attr("width",null)
    // },200)

    let yaxis_title = yAxisName;
    let xaxis_title = xAxisName;
    chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (margin.top) + 0)
      .attr("x", 0)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yaxis_title);

    chart.append("text")
      .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + (margin.bottom / 2)) + ")")
      .style("text-anchor", "middle")
      .text(xaxis_title);

    let cumulative2 = 0
    let test2 = 0
    let test3 = 0;
    for (let i = 0; i < data.length; i++) {
      cumulative2 += data[i].value;
      if (i == 0) {
        test3 = cumulative2;
      }
      if (test2 < cumulative2) {
        test2 = cumulative2;
      }
      if (test3 > cumulative2) {
        test3 = cumulative2;
      }
    }

// Transform data (i.e., finding cumulative values and total) for easier charting
    let cumulative = 0;
    for (let i = 0; i < data.length; i++) {
      if (i == 0) {
        data[i].start = test3 * 0.99 + cumulative;
      }
      else {
        data[i].start = cumulative;
      }
      cumulative += data[i].value;
      data[i].end = cumulative;
      let positive_text1 = 'positive';
      let negative_text1 = 'negative';
      let blueClass = 'blueClass';
      data[i].class = (i == 0) ? blueClass : ((data[i].value >= 0) ? positive_text : negative_text);
    }
    //data[data.length-1].class = total_text;
    data.push({
      name: 'Sales TY',
      end: cumulative,
      start: test3 * 0.99,
      class: total_text,
      value: cumulative,
    });

    // d3.extent((data, d.end) =>  return d.end);


    x.domain(data.map((d) => d.name));

// function to find the maximum value in the chart
    const max = d3.max(data, (d) => d.end);
    const min = d3.min(data, (d) => d.end);

// function to caculate the value by adding 20% more
    const add = max + (max * 20 / 100);
    const sub = min + (min * 20 / 100);
// function to round the value to the nearest whole number
    const newRound = (Math.round(add / 100000) * 100000);
    let newRound1 = (Math.round(sub / 100000) * 100000);
    let yAxisHandling = (number) => {
      if (number >= 0) {
        number = 0;
        return number;
      } else {
        return number;
      }
    }


    y.domain([min - 0.01 * min, max]);

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


    chart.append('g')
    // .attr('class', 'x axis')
    // .attr('transform', `translate(0,${height})`)
      .attr("transform", "translate(" + margin.left*1.6 + "," + (height + margin.top) + ")")
      .classed("axis xaxis", true)
      .call(xAxis)
      .selectAll(".tick text")
      // // .call(wrap, x.rangeBand());
      .call(wrap, x.bandwidth());

    chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin.left*1.5},${margin.top})`)
      .call(yAxis);

    const bar = chart.selectAll('.bar')
      .data(data)
      .enter().append('g')
      .attr('class', (d) => `bar ${d.class}`)
      .attr('transform', (d) => `translate(${x(d.name) + margin.left*2},${ margin.top})`);
//))
    bar.append('rect')
      .attr('y', (d) => y(Math.max(d.start, d.end)))
      .attr('height', (d) => Math.abs(y(d.start) - y(d.end) + 1))
      // function to draw the tooltip

      .attr('width', (x.bandwidth() / 2));

    const formatText = (i, d) => {
      if (i == 0 || i == data.length-1) {
        console.log('(d.end).toFixed(2)', (d.end).toFixed(2));
        return (d.end).toFixed(2);
      } else {
        console.log('(d.end - d.start).toFixed(2);', (d.end - d.start).toFixed(2));
        return (d.end - d.start).toFixed(2);
      }
    };


    bar.append('text')
      .attr('x', (x.bandwidth() / 2 - margin.right / 4))
      .attr('y', (d) =>{ return (y((((d.end - d.start > 0 )? d.end:d.start )))-5)})
      .text((d,i) => ((d)))
      // .text((d,i) => (formatText(i,d)))
      .style("font-size", "10px")
      .style('fill', 'black');

    let colorArray = ['#cc3333','#58ee81', '#1d1ccc'];
    let series_type_values = ["Loss", "Gain","Net Loss/Gain"];
    const legendWidth = frameWidth/3;
    let legend = chart.append("g")
      .attr("font-family", "Tesco")
      .attr("font-size", 10).attr("text-anchor", "start")
      .selectAll("g")
      .data(series_type_values)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate("  + (i*legendWidth) + "," + (frameWidth*0.6 - margin.bottom) + ")";
      });
    legend.append("rect")
      .attr("x", 45)
      .attr("y", 25)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d, i) {
          return colorArray[i];
        }
      );

    legend.append("text")
      .attr("x", 40)
      .attr("y", 55)
      .attr("dy", "0.32em")
      .style("text-anchor", "start")
      .text(function (d) {
        return d;
      });


  };
  componentDidMount = () => {
    this.createChart(this.props.data, this.props.id, this.props.yAxisName, this.props.formatter, this.props.positive_text, this.props.negative_text, this.props.total_text, this.props.xAxisName);
  };

  componentDidUpdate = () => {
    this.createChart(this.props.data, this.props.id, this.props.yAxisName, this.props.formatter, this.props.positive_text, this.props.negative_text, this.props.total_text, this.props.xAxisName);
  };

  render() {
    return (
      <div  id={this.props.id}>
        <svg id={this.props.id + '_svg'}></svg>
      </div>
    );
  }
}

WaterFallChartExec.propTypes = {};

export default WaterFallChartExec;
