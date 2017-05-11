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
    // var margin = {top: 20, right: 30, bottom: 30, left: 40},
    //   width = 560 - margin.left - margin.right ,
    //   height = 300 - margin.top - margin.bottom,
    //   padding = 0.3;

    // var x = d3.scaleOrdinal()
    //   // .rangeRoundBands([0, width], padding);
    //       .rangeRound([0, width], padding);

    // var x = d3.scale.ordinal()
    //   .rangeRoundBands([0, width], .1);

    // var x = d3.scaleBand()
    //   .rangeRound([0, width])
    //   // .padding(0.3);
    //
    // var y = d3.scaleLinear()
    //   .range([height, 0]);
    //
    // // var xAxis = d3.svg.axis()
    // //   .scale(x)
    // //   .orient("bottom");
    //
    // var xAxis = d3.axisBottom(x)
    //
    // // var yAxis = d3.svg.axis()
    // //   .scale(y)
    // //   .orient("left")
    // //   .tickFormat(function(d) { return dollarFormatter(d); });
    //
    //
    // var yAxis = d3.axisLeft(y)
    //
    //   .tickFormat(function (d) {
    //     return dollarFormatter(d);
    //   });
    //
    // var chart = d3.select('#'+ id)
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom)
    //   .append("g")
    //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //
    // // d3.csv("https://gist.githubusercontent.com/chucklam/f3c7b3e3709a0afd5d57/raw/6ef027d73223efe5e82a875e1c3c572258a1b08f/data.csv", type, function (error, data) {
    //
      // var data = [
      //   {"name": "Product Revenue", "value": 420000},
      //   {"name": "Services Revenue", "value": 210000},
      //   {"name": "Employee Revenue", "value": 190000},
      //   {"name": "Fixed Costs", "value": -170000},
      //   {"name": "Variable Costs", "value": -140000}
      //
      // ];
    //
    //   console.log(data);
    //   let keys = Object.keys(data[0])
    //   keys.shift()
    //   console.log(keys);
    //
    //   // Transform data (i.e., finding cumulative values and total) for easier charting
    //   var cumulative = 0;
    //   for (var i = 0; i < data.length; i++) {
    //     data[i].start = cumulative;
    //     cumulative += data[i].value;
    //     data[i].end = cumulative;
    //
    //     data[i].class = ( data[i].value >= 0 ) ? 'positive' : 'negative'
    //   }
    //   data.push({
    //     name: 'Total',
    //     end: cumulative,
    //     start: 0,
    //     class: 'total'
    //   });
    //
    //   x.domain(data.map(function (d) {
    //     return d.name;
    //   }));
    //   y.domain([0, d3.max(data, function (d) {
    //     return d.end;
    //   })]);
    //
    //   chart.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(xAxis);
    //
    //   chart.append("g")
    //     .attr("class", "y axis")
    //     .call(yAxis);
    //
    //   var bar = chart.selectAll(".bar")
    //     .data(data)
    //     .enter().append("g")
    //     .attr("class", function (d) {
    //       return "bar " + d.class
    //     })
    //     .attr("transform", function (d) {
    //       return "translate(" + x(d.name) + ",0)";
    //     });
    //
    //   bar.append("rect")
    //     .attr("y", function (d) {
    //       return y(Math.max(d.start, d.end));
    //     })
    //     .attr("height", function (d) {
    //       return Math.abs(y(d.start) - y(d.end));
    //     })
    //     // .attr("width", x.rangeBand());
    //     .attr("width", x.bandwidth());
    //
    //   bar.append("text")
    //     .attr("x", x.bandwidth() / 2)
    //     .attr("y", function (d) {
    //       return y(d.end) + 5;
    //     })
    //     .attr("dy", function (d) {
    //       return ((d.class == 'negative') ? '-' : '') + ".75em"
    //     })
    //     .text(function (d) {
    //       return dollarFormatter(d.end - d.start);
    //     });
    //
    //   bar.filter(function (d) {
    //     return d.class != "total"
    //   }).append("line")
    //     .attr("class", "connector")
    //     .attr("x1", x.bandwidth() + 5)
    //     .attr("y1", function (d) {
    //       return y(d.end)
    //     })
    //     .attr("x2", x.bandwidth() / ( 1 - padding) - 5)
    //     .attr("y2", function (d) {
    //       return y(d.end)
    //     })
    // // });
    //
    // function type(d) {
    //   d.value = +d.value;
    //   return d;
    // }
    //
    // function dollarFormatter(n) {
    //   n = Math.round(n);
    //   var result = n;
    //   if (Math.abs(n) > 1000) {
    //     result = Math.round(n / 1000) + 'K';
    //   }
    //   return '$' + result;
    // }

    // var margin = {top: 20, right: 30, bottom: 30, left: 40},
    //   width = 960 - margin.left - margin.right,
    //   height = 500 - margin.top - margin.bottom,
    //   padding = 0.3;

    let margin = {top: 20, right: 100, bottom: 40, left: 30},
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
          let b = `£ ${Math.round(i)}`;
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
    // .tickFormat((d) => (formatSales(d, id)))
      .tickFormat((d) => (d))

// var tooltip = d3.select("body").append("div")
//   .attr("class", "tooltip")
//   .style("opacity", 0)
//   .attr("align", "middle");

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
      .attr("y", 0 - (margin.left) + 0)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yaxis_title);

    chart.append("text")
      .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + (margin.bottom / 2)) + ")")
      .style("text-anchor", "middle")
      .text(xaxis_title);


data = [
  {"name": "Product Revenue", "value": 420000},
  {"name": "Services Revenue", "value": 210000},
  {"name": "Employee Revenue", "value": 190000},
  {"name": "Fixed Costs", "value": -170000},
  {"name": "Variable Costs", "value": -140000}
];

    // const keys = Object.keys(data[0]);
//   keys.shift()
//   console.log(keys);

    let cumulative2 = 0
    let test2 = 0
    let test3 = 0;
    for (let i = 0; i < data.length; i++) {

      console.log('data', data[i].value);

      cumulative2 += data[i].value;

      console.log('cumulative2', cumulative2);

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
    console.log('test3', test3);
    console.log('test2', test2);

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


      // data[i].class = (data[i].value >= 0) ? positive_text : negative_text;

      data[i].class = (i == 0) ? blueClass : ((data[i].value >= 0) ? positive_text : negative_text);

      console.log("data[i].class", data[i].class)
    }
    data.push({
      name: 'Potential Gain/Loss',
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

    console.log('min', min);
    console.log('max', max);


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
      .attr('transform', (d) => `translate(${x(d.name) + margin.right - margin.right / 2},0)`);
//))
    bar.append('rect')
      .attr('y', (d) => y(Math.max(d.start, d.end)))
      .attr('height', (d) => Math.abs(y(d.start) - y(d.end) + 1))
      // function to draw the tooltip

      .attr('width', (x.bandwidth() / 2));
    // .attr('width', (x.bandwidth() - 5));
//   .on("mouseover", function (d) {
//   // to find the parent node,to calculate the x position
//   var parentG = d3.select(this.parentNode);
//   var barPos = parseFloat(parentG.attr('transform').split("(")[1]);
//   var xPosition = barPos + x.bandwidth() / 2;
//   //to find the y position
//   var yPosition = parseFloat(d3.select(this).attr("y")) + Math.abs(y(d.start) - y(d.end)) / 2;
//   tooltip.transition()
//     .duration(200)
//     .style("opacity", .9);
//   tooltip.html(d.name + "<br/>" + (d.value))
//     .style("left", xPosition + "px")
//     .style("top", yPosition + "px");
// }).on("mouseout", function (d) {
//   tooltip.transition()
//     .duration(500)
//     .style("opacity", 0);
// });

    // bar.append('text')
    //   .attr('x', (x.bandwidth() +  margin.right))
    //   // .attr('y', (d) =>  (Math.abs( y(d.start) - y(d.end))/2))
    //   // .attr('y', (d) => (d.end))
    //   // .attr('y', (d) => y(d.end) + 5)
    //   .attr('y', (d) => y((d.end + d.start) / 2))
    //   // .attr('dy', (d) => `${(d.class == 'negative') ? '-' : ''}.75em`)
    //   // .text((d) => ((d.end - d.start)/1000));
    //   .text((d) => ((formatSales((d.end - d.start), id))))
    //   .style("font-size", "10px")
    //   .style('fill', 'black');


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
      // .attr('y', (d) =>  (Math.abs( y(d.start) - y(d.end))/2))
      // .attr('y', (d) => (d.end))
      // .attr('y', 100)
      // .attr('y', 100)
      // .attr('y', (d) => y(d.end) + 5)


      // .attr('y', (d) => y((d.end + d.start) / 2))

      .attr('y', (d) =>{ return (y((((d.end - d.start > 0 )? d.end:d.start )))-5)})

      // .attr('dy', (d) => `${(d.class == 'negative') ? '-' : ''}.75em`)
      // .text((d) => ((d.end - d.start)/1000));
      .text((d,i) => (formatText(i,d)))
      .style("font-size", "10px")
      .style('fill', 'black');

    // bar.filter((d) => d.class != 'total').append('line')
    // bar.filter((d) => d.class != total_text).append('line')
    //   .attr('class', 'connector')
    //   .attr('x1', x.bandwidth()/2)
    //   .attr('y1', (d) => y(d.end))
    //   .attr('x2', x.bandwidth() / (1 - padding) - 5)
    //   .attr('y2', (d) => y(d.end));

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
    this.createChart(this.props.data, this.props.id, this.props.yAxisName, this.props.formatter, this.props.positive_text, this.props.negative_text, this.props.total_text, this.props.xAxisName);
  };

  componentDidUpdate = () => {
    this.createChart(this.props.data, this.props.id, this.props.yAxisName, this.props.formatter, this.props.positive_text, this.props.negative_text, this.props.total_text, this.props.xAxisName);
  };

  render() {
    return (
      <div>
        <svg id={this.props.id}></svg>
      </div>
    );
  }
}

WaterFallChartExec.propTypes = {};

export default WaterFallChartExec;
