/**
 *
 * WaterFallChart2
 *
 */

import React from 'react';
// import styled from 'styled-components';

import * as d3 from 'd3';
import styles from './style.scss';

import {FormattedMessage} from 'react-intl';
import messages from './messages';

class WaterFallChart2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (data, id, yAxisName, formatter, positive_text, negative_text, total_text,xAxisName) => {
    let margin = {top: 20, right: 80, bottom: 40, left: 25},
      width = 550 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom,
      padding = 0.3;

    const x = d3.scaleBand()
            .rangeRound([0, width]);
    // .padding(0.3);

    const y = d3.scaleLinear()
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);

    const formatSales = (i, chart_id) => {
      if (chart_id != "waterfallChart_2") {
        if (i >= 1000 || i <= -1000) {
          const rounded = Math.round(i / 1000);
          let a = `${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
          // alert("if greater than 0")
          // alert(a);
          return (`${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);
        } else {
          // alert("else less than 0");
          let b = `£ ${Math.round(i)}` ;
          // alert(b);
          return (`${Math.round(i)}`);
        }
      } else {
        if (i >= 1000 || i <= -1000) {
          const rounded = Math.round(i / 1000);
          let a = (`${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);
          console.log("aaa", a);
          return (`${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);
        } else {
          let a = Math.round(i);
          console.log("a else", a);
          return (Math.round(i));
        }
      }
    };


    const formatVolume = (i) => {
      if (i >= 1000 || i <= -1000) {
        const rounded = Math.round(i / 1000);
        return (`${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}K`);
      } else {
        return (Math.round(i));
      }
    };

    const formatYAxis = (i) => {
      if (i >= 1000 || i <= -1000) {
        const rounded = Math.round(i / 1000);
        return ( rounded );
      } else {
        return ( Math.round(i) );
      }
    };

    const yAxis = d3.axisLeft(y)
    // .tickFormat((d) => (
      .tickFormat((d) => (formatSales(d, id)))
    //   .tickFormat((d) => (d))


    let chart = d3.select(`#${id}`);


    chart.selectAll("*").remove();


    chart = d3.select(`#${id}`)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    let yaxis_title = yAxisName;

    let xaxis_title = xAxisName;
    chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (margin.left) + 10)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yaxis_title);

    chart.append("text")
      .attr("transform","translate(" + (width/2) + " ," +(height + margin.top+(margin.bottom/2)) + ")")
      .style("text-anchor", "middle")
      .text(xaxis_title);


// data = [
//   {"name": "Product Revenue", "value": 420000},
//   {"name": "Services Revenue", "value": 210000},
//   {"name": "Employee Revenue", "value": 190000},
//   {"name": "Fixed Costs", "value": -170000},
//   {"name": "Variable Costs", "value": -140000}
// ];

    const keys = Object.keys(data[0]);

// Transform data (i.e., finding cumulative values and total) for easier charting
    let cumulative = 0;
    for (let i = 0; i < data.length; i++) {
      data[i].start = cumulative;
      cumulative += data[i].value;
      data[i].end = cumulative;

      let positive_text1 = 'positive';
      let negative_text1 = 'negative';

      data[i].class = (data[i].value >= 0) ? positive_text : negative_text;
      console.log("data[i].class", data[i].class)
    }
    data.push({
      name: 'Potential Gain/Loss',
      end: cumulative,
      start: 0,
      class: total_text,
      value: cumulative,
    });


    x.domain(data.map((d) => d.name));

// function to find the maximum value in the chart
    const max = d3.max(data, (d) => d.end);

    const min = d3.min(data, (d) => d.end);
// alert(min);
// console.log("max value "+max);
// function to caculate the value by adding 20% more
    const add = max + (max * 20 / 100);
    const sub = min + (min * 20 / 100);
// console.log("the new  value "+add);
// function to round the value to the nearest whole number
    const newRound = (Math.round(add / 100000) * 100000);
    let newRound1 = (Math.round(sub / 100000) * 100000);
// alert(newRound);
//     alert(newRound1);
// console.log("the round value is  "+newRound);
// y.domain([min, newRound]);

    let yAxisHandling = (number) => {
      if (number >= 0) {
        number = 0;
        return number;
      } else {
        return number;
      }
    }

    newRound1 = yAxisHandling(min);
    // newRound1 = yAxisHandling(newRound1);
    // alert(newRound1);

    y.domain([99, max]);

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
      .attr("transform", "translate(25," + (height) + ")")
      .classed("axis xaxis", true)
      .call(xAxis)
      .selectAll(".tick text")
      // // .call(wrap, x.rangeBand());
      .call(wrap, x.bandwidth());

    chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis);

    const bar = chart.selectAll('.bar')
      .data(data)
      .enter().append('g')
      .attr('class', (d) => `bar ${d.class}`)
      .attr('transform', (d) => `translate(${x(d.name) + margin.right - margin.right/2},0)`);
//))
    bar.append('rect')
      .attr('y', (d) => y(Math.max(d.start, d.end)))
      .attr('height', (d) => Math.abs(y(d.start) - y(d.end) + 1))
      // function to draw the tooltip

      .attr('width', (x.bandwidth()/2));
      // .attr('width', (x.bandwidth() - 5));


    bar.append('text')
      .attr('x', (x.bandwidth()/2 -  margin.right/4))
      .attr('y', (d) => y((d.end + d.start)/2))
      .text((d) => ((formatSales((d.end - d.start), id))))
      .style("font-size", "10px")
      .style('fill', 'black');

    function type(d) {
      d.value = +d.value;
      return d;
    }

    function percentage(n) {
      n = Math.round(n);
      let result = n;
      if (Math.abs(n) > 100) {
        result = `${Math.round(n / 100)}%`;
      }
      return result;
    }
  }
  ;

  componentDidMount = () => {
    this.createChart(this.props.data, this.props.id, this.props.yAxisName, this.props.formatter, this.props.positive_text, this.props.negative_text, this.props.total_text,this.props.xAxisName );
  };

  componentDidUpdate = () => {
    this.createChart(this.props.data, this.props.id, this.props.yAxisName, this.props.formatter, this.props.positive_text, this.props.negative_text, this.props.total_text,this.props.xAxisName);
  };

  render() {
    return (
      <div>
        <svg id={this.props.id}></svg>
      </div>
    );
  }
}

WaterFallChart2.propTypes = {};

export default WaterFallChart2;
