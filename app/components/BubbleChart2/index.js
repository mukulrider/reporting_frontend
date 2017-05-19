/**
 *
 * BubbleChart2
 *
 */

import React from 'react';
import * as d3 from 'd3';
import Button from 'components/button';
import {browserHistory} from 'react-router';


class BubbleChart2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (data2, forTable, forOpacity, bubbleFunc, bubbleFunc2, makeTable) => {
    let dataBubbleUrlParams = '';
    let prodArr = [];
    let deselectArr = [];
    let deselectBub = [];


    forTable = JSON.parse(forTable);
    forOpacity = JSON.parse(forOpacity);
    console.log("-=-=-====-=-= "+ data2)
    //Chart configurations
    var containerWidth = document.getElementById('bubbleChart2_div').clientWidth;

    let margin = {top: 20, right: 180, bottom: 180, left: 30};
    let width = containerWidth - margin.left - margin.right,
      height = containerWidth*0.6 - margin.top - margin.bottom;
    console.log("BubbleChart2 X,Y -> ", containerWidth,containerWidth*0.5)
    let svg = d3.select('#bubbleChart2_svg')
      .attr("height",containerWidth*0.5)
      .attr("width",containerWidth)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 " + containerWidth + " " + containerWidth*0.5)
      //class to make it responsive
      .classed("svg-content-responsive", true);

    // setTimeout(function(){
    //   d3.select('#bubbleChart2_svg').attr("width",null).attr("height",null);
    // },200)
    let colorArray = ['#00838f', '#33691e'];
    let opacity = [1, 0.4];

    svg.selectAll("*").remove();
    //Adjusting position of the svg area

    let chart = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // let xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
    let xScale = d3.scaleLinear().domain([0, d3.max(data2, function (d) {return d.cps;})]).range([0, width]);
    let yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    // domain([
    //   d3.min(data2, function (c) {
    //     return d3.min(c.values, function (d) {
    //       return d.date;
    //     });
    //   }),
    //   d3.max(cities, function (c) {
    //     return d3.max(c.values, function (d) {
    //       return d.date;
    //     });
    //   })
    // ])


    let rScale = d3.scaleLinear().domain([0, d3.max(data2, function (d) {
      return d.rate_of_sale;
    })]).range([5, 20]);


    let xAxis = d3.axisBottom(xScale)
      .tickFormat(function (d) {
        return (Math.round(d * 10) / 10);
      });

    let yAxis = d3.axisLeft(yScale)
      .tickFormat(function (d) {
        return (Math.round(d * 10) / 10);
      });

    // ---------- Appending AXIS to chart -----------------
    chart.append("g")
      .attr("transform", "translate(" + margin.left + ", " + height + ")")
      .classed("axis", true)
      .call(xAxis);

    chart.append("g")
      .attr("transform", "translate(" + margin.left + ",0)")
      .classed("axis", true)
      .call(yAxis);

    // ------------- Tooltip-----------------


    let tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .classed("tooltip_bubble",true)
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("color", "white")
      .style("padding", "8px")
      .style("background-color", "rgba(0, 0, 0, 0.75)")
      .style("border-radius", "6px")
      .style("font", "15px sans-serif")
      .text("tooltip");

    // ------------- Adding data points-----------------
    chart.selectAll('circle')
      .data(data2)
      .enter()
      .append('circle')
      .attr("cx", function (d) {

        return (margin.left + xScale(d.cps));
      })
      .attr("cy", function (d) {
        return (yScale(d.pps));
      })

      .on('mouseover', function(d) {
        // console.log("------d"+d);
        tooltip.html(d.long_description+"<br/>"+"CPS : "+d.cps+"<br/>"+"PPS : "+d.pps);
        tooltip.style("visibility", "visible");
      })
      .on('mousemove', function() {
        // console.log("y--"+(d3.event.pageY)+"x-----"+(d3.event.pageX))
        return tooltip.style("top", (d3.event.pageY-100)+"px").style("left",(d3.event.pageX+5)+"px");
      })
      .on('mouseout', function(){return tooltip.style("visibility", "hidden");})

      .attr("r", 0)
      .transition()
      .duration(500)
      .attr("r", function (d) {
        return (rScale(d.rate_of_sale));
      })

      .style("fill", function (d) {
        if (d.brand_ind == "Brand") {
          return colorArray[0];
        }
        else {
          return colorArray[0];
        }
      })
      .style("opacity", function (d) {
        let selected = 0;
        if (forOpacity.length > 0) {
          for (let i = 0; i < forOpacity.length; i++) {
            if (d.base_product_number === forOpacity[i]) {
              return opacity[0];
            }
            else {
              selected = 0;

            }
          }

          if (selected === 0) {
            return (opacity[1]);
          }
        }
        else {
          return 0.75;
        }
      });

    //This is for getting the axis labels
    chart.append("text")
      .attr("transform",
        "translate(" + (width / 2) + " ," + (height + (margin.top * 1.75)) + ")")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("CPS percentile");

    chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Profit per store percentile (CGM)");

    //This is for getting legends
    let series_type_values = ["OL", "Brand"];

    // let legend = chart.append("g")
    //   .attr("font-family", "Tesco")
    //   .attr("font-size", 10).attr("text-anchor", "end")
    //   .selectAll("g")
    //   .data(series_type_values)
    //   .enter()
    //   .append("g")
    //   .attr("transform", function (d, i) {
    //     return "translate(0," + i * 25 + ")";
    //   });
    //
    // legend.append("rect")
    //   .attr("x", 950)
    //   .attr("width", 19)
    //   .attr("height", 19)
    //   .attr("fill", function (d, i) {
    //       return colorArray[i];
    //     }
    //   );
    //
    // legend.append("text")
    //   .attr("x", 975)
    //   .attr("y", 9.5)
    //   .attr("dy", "0.32em")
    //   .style("text-anchor", "middle")
    //   .text(function (d) {
    //     return d;
    //   });
    // let color = d3.scaleLinear().range(d3.schemeCategory20b);
  };

  componentDidMount = () => {
    this.createChart(this.props.data, this.props.selectedBubbleTable, this.props.selectedBubbleOpacity, this.props.onSaveBubbleParam, this.props.onSaveBubbleParam2,
      this.props.onGenerateTable)
  };

  componentDidUpdate = () => {
    this.createChart(this.props.data, this.props.selectedBubbleTable, this.props.selectedBubbleOpacity, this.props.onSaveBubbleParam, this.props.onSaveBubbleParam2,
      this.props.onGenerateTable);
  };

  render() {

    return (
      <div id="bubbleChart2_div" style={{backgroundColor: "#fff", border: "1px solid #ccc"}}>
        <svg id="bubbleChart2_svg" fontFamily="sans-serif" fontSize="10" textAnchor="middle"> </svg>
      </div>
    );
  }
}

BubbleChart2.propTypes = {};

export default BubbleChart2;
