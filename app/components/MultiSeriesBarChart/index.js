/**
 *
 * MultiSeriesBarChart
 *
 */

import React from 'react';
// import styled from 'styled-components';

import {FormattedMessage} from 'react-intl';
import messages from './messages';
import * as d3 from 'd3';
import styles from './style.scss'


class MultiSeriesBarChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (graphdata, x_axis, y_axis,legendTY,legendLY, id) => {

    console.log("MultiSeriesBarChartData:",graphdata);
    let data = graphdata.cum_graph_data;
    let keys = graphdata.labels_bar;
    let colors = ["#CFDB39","#02958B"];


    let wrap = (text, width)=> {
      text.each(function() {
        let text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
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

    let containerWidth = document.getElementById(id).clientWidth;
    let margin = {top: 30, right: 0, bottom: 80, left: 90},
      width = containerWidth - margin.left - margin.right,
      height = containerWidth*0.8 - margin.top - margin.bottom;


    let svg = d3.select('#'+id);
    svg.selectAll('*').remove();

    svg = d3.select('#'+id).append("svg")
      .attr("id", id + '_svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        `translate(${margin.left},${margin.top})`);

    let tooltip = svg.append("div").attr("class", "toolTip");
    let spaceForLegends=65;
    const x0 = d3.scaleBand().rangeRound([0, width-spaceForLegends]).paddingInner(0.2),
      x1 = d3.scaleBand().rangeRound([height, 0]),
      y = d3.scaleLinear().rangeRound([height, 0]),

      z = d3.scaleOrdinal().range(colors);

    let format = d3.format(',');

    let yAxis = d3.axisLeft()
      .scale(y)
      .tickFormat((d) => {
        if ((d / 1000) >= 1 || (d / 1000) <= -1) {
          d = d / 1000;
        }
        if (y_axis == "Volume") {
          return `${format(d)} K`;
        }
        else {
          return `£ ${format(d)} K`;
        }
      });

    // Mapping domains
    x0.domain(data.map(function (d) {
      return d.week_day_str;
    }));

    x1.domain(keys)
      .rangeRound([0, x0.bandwidth()]);

    y.domain([d3.min(data, function (d) {
      return d3.min(keys, function (key) {
        return d[key];
      });
    }), d3.max(data, function (d) {
      return d3.max(keys, function (key) {
        return d[key];
      });
    })]).nice();


    // GRAPH
    svg.append("g")
      .selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function (d) {
        return "translate(" + x0(d.week_day_str) + ",0)";
      })
      .selectAll("rect")
      .data(function (d) {
        return keys.map(function (key) {
          return {key: key, value: d[key]};
        });
      })
      .enter().append("rect")
      .attr("x", function (d) {
        return x1(d.key);
      })
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("width", x1.bandwidth())
      .attr("height", function (d) {
        return height - y(d.value);
      })
      .attr("fill", function (d) {
        return z(d.key);
      })
      .on("mousemove", function(d){
        console.log("Entered tooltip:");
        tooltip
          .text((d.week_day_str) + ":%");
      })
      .on("mouseout", function(d){ tooltip.style("display", "none");});

    svg.append("g")
      .attr("class", "chartAxisLabel")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));
      // .selectAll(".tick text");
      // .call(wrap, x0.bandwidth());

    svg.append("g")
      .attr("class", "chartAxisLabel")
      .call(yAxis);

    //AXIS TITLES
    svg.append('text')
      .attr('x', width / 3.5)
      .attr('y', height+2.5*margin.top)
      .attr('dx', '0.71em')
      .attr('fill', '#000')
      .style('text-anchor', 'middle')
      .style('font', '18px sans-serif')
      .text(x_axis);

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr('y', 0 - (margin.left))
      .attr('x', 0 - (height / 2) - 15)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font', '18px sans-serif')
      .text(y_axis);


    // g.append("text")
    //   .attr("y",height )
    //   .attr("x",0 - (width / 2))
    //   .style("text-anchor", "middle")
    // .text("CHECk");


    // LEGENDS
    let legend = svg.append("g")
      .attr("class", "chartLegend")
      .selectAll("g")
      .data(keys.slice())
      .enter().append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 30 + ")";
      })
      .style('font', '12px sans-serif');

    legend.append("rect")
      .attr('x', width / 3 + 2 * (margin.left))
      .attr('y',  height+1*margin.top)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", z);

    legend.append("text")
      .attr('x', width / 3 +2.5 * (margin.left))
      .attr('y', height+1*margin.top)
      .attr('dy', '.95em')
      .attr('text-anchor', 'middle')
      .text(function (d) {
       if (d == 'tot_val') {
          return legendTY;
        } else {
          return legendLY;
        }
      });
    // });



  };


  componentDidMount = () => {
    this.createChart(this.props.data,this.props.x_axis, this.props.y_axis, this.props.legendTY, this.props.legendLY,this.props.id)
  };

  componentDidUpdate = () => {
    // console.log(this.props.data);
    this.createChart(this.props.data, this.props.x_axis, this.props.y_axis,this.props.legendTY, this.props.legendLY, this.props.id)
  };


  render() {
    return (
      <div id={this.props.id} style={{background:"#fff", border: "1px solid #ccc"}}>
      </div>
    );
  }
}

MultiSeriesBarChart.propTypes = {};

export default MultiSeriesBarChart;
