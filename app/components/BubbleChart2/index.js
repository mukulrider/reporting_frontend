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

    //Chart configurations
    let margin = {top: 20, right: 20, bottom: 40, left: 30};
    let width = 750 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    let svg = d3.select('#svgg');

    let colorArray = ['#00838f', '#33691e'];
    let opacity = [1, 0.4];

    svg.selectAll("*").remove();
    //Adjusting position of the svg area

    let chart = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);

    let yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

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

      .on('click', function (d) {
        //Bubble opacity
        let dataBubbleUrlParams2 = d.base_product_number;
        let deselectBubFlag = 0;

        // Will be used to just store the product number to decide the opacity
        for (let i = 0; i < forOpacity.length; i++) {
          if (forOpacity[i] !== dataBubbleUrlParams2) {
            console.log("comparing-=-=-=-=", forOpacity[i], dataBubbleUrlParams2)
            deselectBub.push(forOpacity[i]);
          }
          else {
            console.log("DESELECTION OF BUBBLE")
            deselectBubFlag = 1;
          }
        }

        if (deselectBubFlag === 0) {
          console.log("NOT DESELECTION OF BUBBLE" + deselectBubFlag)
          deselectBub.push(dataBubbleUrlParams2);
        }
        console.log("selecting for the first time",deselectBub);
        let dejsonBub = JSON.stringify(deselectBub);
        bubbleFunc2(dejsonBub);

        //For updating table below
        let dataBubbleUrlParams = "base_product_number=" + d.base_product_number;
        let deselect = 0;

        for (let i = 0; i < forTable.length; i++) {
          if (forTable[i] !== dataBubbleUrlParams) {
            deselectArr.push(forTable[i]);
          } else {
            deselect = 1;
          }
        }

        if (deselect == 0) {
          deselectArr.push(dataBubbleUrlParams);
        }

        let dejsonTable = JSON.stringify(deselectArr);
        bubbleFunc(dejsonTable);
        makeTable();
        console.log("============================")

      })

      .attr("r", 0)
      .transition()
      .duration(500)
      .attr("r", function (d) {
        return (rScale(d.rate_of_sale));
      })

      .style("fill", function (d) {
        if (d.brand_ind == "Brand") {
          return colorArray[1];
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
          return opacity[0];
        }
      });

    //This is for getting the axis labels
    chart.append("text")
      .attr("transform",
        "translate(" + (width / 2) + " ," + (height + (margin.top * 1.75)) + ")")
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .text("CPS percentile");

    chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .text("Profit per store percentile (CGM)");

    //This is for getting legends
    let series_type_values = ["OL", "Brand"];

    let legend = chart.append("g")
      .attr("font-family", "Tesco")
      .attr("font-size", 10).attr("text-anchor", "end")
      .selectAll("g")
      .data(series_type_values)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 25 + ")";
      });

    legend.append("rect")
      .attr("x", 800)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d, i) {
          return colorArray[i];
        }
      );

    legend.append("text")
      .attr("x", 770)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d;
      });
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
      <div>
        <svg id="svgg" width="900" height="600" fontFamily="sans-serif" fontSize="10"
             textAnchor="middle"> </svg>
      </div>
    );
  }
}

BubbleChart2.propTypes = {};

export default BubbleChart2;
