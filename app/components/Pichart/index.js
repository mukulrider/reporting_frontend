/**
 *
 * Pichart
 *
 */

import React from 'react';
import * as d3 from 'd3';
import './style.scss';

import {FormattedMessage} from 'react-intl';
import messages from './messages';

class Pichart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (pieChartData, id, wowValue) => {
    //transform data
    let data = pieChartData.map(function (row) {
      return row.pie_chart_value;
    })

    console.log("PieChart Data", data)
    let frameWidth = document.getElementById(id).clientWidth;
    let margin = {top: 0, right: frameWidth / 30, bottom: frameWidth / 5.25, left: frameWidth / 30},
      // let margin = {top: 0, right: frameWidth/30, bottom: 55, left: frameWidth/30},
      // let margin = {top: 20, right: 30, bottom: 10, left: 30},
      width = frameWidth - margin.left - margin.right,
      height = frameWidth * 1.45 - margin.top - margin.bottom,
      radius = Math.min(width, height) / 2;

    // alert(radius);

    let color = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6"]);

    let arc = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(0);

    let labelArc = d3.arc()
      .outerRadius(radius - 60)
      .innerRadius(radius - 60);

    let pie = d3.pie()
      .sort(null)
      .value(function (d) {
        return d;
      });

    let svg = d3.select("#" + id + '_svg')
      .attr("width", width)
      .attr("height", height)
      // .attr("height", 405)
      //responsive SVG needs these 2 attributes and no width and height attr
      //.attr("preserveAspectRatio", "xMinYMin meet")
      //.attr("viewBox", "0 0 " + (height) + " " + (width))
      //class to make it responsive

      .classed("svg-content-responsive", true)
      .append("g")
      //  .attr("transform", "translate(" + margin.left+ "," + margin.top + ")");
      .attr("transform", "translate(" + (radius + margin.left) + " " + (radius + margin.top) + ")");

    // setTimeout(function(){
    //   d3.select('#'+id+'_svg').attr("width",null).attr("height",null)
    // },100)
    let g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("x", frameWidth / 2 + frameWidth / 8)
      .attr("y", 55)
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .attr("x", frameWidth / 2)
      .attr("y", 55)
      .style("fill", function (d) {
        return color(d.data);
      });

    g.append("text")
      .attr("transform", function (d) {
        return "translate(" + labelArc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .text(function (d) {
        return (d.data + '%');
      });


    let dataGroup = [{"key": 'Market Share'}, {"key": 'Tesco Share'}]


    // Legend
    const legendWidth = frameWidth / 3;
    let legend = svg.append("g")
      .attr("font-family", "sans-serif")
      //.attr("font-size", 14)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(dataGroup)
      .enter().append("g")
      .attr("transform", function (d, i) {
        return "translate(" + (i * legendWidth - (width / 3) + margin.left) + ",0)";
      });


    let color_hash = ["#98abc5", "#8a89a6"];

    legend.append("rect")
      .attr("x", 45).attr("y", radius)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d, i) {
        return color_hash[i];
      });

    legend.append("text")
      .attr("x", 35)
      .attr("y", radius + 10)
      .attr("dy", "0.32em")
      .text(function (d) {
        console.log("PieChart text d.key", d.key)
        return d.key;
      });

    svg.append("text")
      .attr("x", -65)
      .attr("y", radius + 60)
      .text("WoW :  ")
      .attr("font-size", '18px')
      .attr("font-weight", 'bold')
      // .text(function (d) {
      //   let wowText = "WoW:" + wowValue;
      //   return wowText;
      // })

    svg.append("svg:foreignObject")
      .attr("width", 20)
      .attr("height", 40)
      .attr("y", radius + 43)
      .attr("x", -5)
      .append("xhtml:span")
      // .attr("class", "control glyphicon glyphicon-triangle-top glyphiconPositive");
      .attr("class", function (d) {
        if(wowValue > 0) {
          let glyphiconClass = "control glyphicon glyphicon-triangle-top glyphiconPositive";
          return glyphiconClass;
        } else if(wowValue < 0){
          let glyphiconClass = "control glyphicon glyphicon-triangle-bottom glyphiconNegative";
          return glyphiconClass;
        } else {
          let glyphiconClass = "control glyphicon glyphicon-minus-sign glyphiconNeutral";
          return glyphiconClass;
        }
        })

    svg.append("text")
      .attr("x", 35)
      .attr("y", radius + 60)
      // .text("WoW:")
      .text(function (d) {
        let wowText = wowValue;
        return wowText;
      })
      .attr("font-size", '18px')

  }

  componentDidMount = () => {
    console.log("inside Pi chart -------", this.props, this.props.wowValue);
    // this.createChart([10, 20],'pi_chart');
    this.createChart(this.props.data, this.props.id, this.props.wowValue);
  }

  componentDidUpdate = () => {
    this.createChart(this.props.data, this.props.id, this.props.wowValue);
  };

  render() {
    return (
      <div id={this.props.id}>
        <svg id={this.props.id + '_svg'}></svg>
      </div>
    );
  }
}

Pichart.propTypes = {};

export default Pichart;
