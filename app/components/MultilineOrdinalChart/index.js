/**
*
* MultilineOrdinalChart
*
 *
 * CALLING THIS COMPONENT
 * <MultilineOrdinalChart data={[{chart_data:price_gravity_data,xaxis_col_name:'price_gravity',yaxis_col_name:'sku_gravity',series_col_name:'id',xaxis_bands:price_gravity_axis_bands},"id2",'£ ']}/>
 *  chart_data ---- Chart data
 *  xaxis_col_name ---- the column name in the data which should be the x axis data
 *  yaxis_col_name ---- the column name in the data which should be the y axis data
 *  series_col_nam ---- the column name in the data which will form the different groups ( lines)
 *  xaxis_bands ---- the x axis bands
 *
 * DATA STRUCTURE:
 *  "price_gravity_data": {
          ordinal_axis_bands:["6.51 - 7.63","7.63 - 19.00", "3.04 - 5.27", "5.27 - 6.07","6.07 - 6.51"],
          data:[
            {
                "id": "Asda",
                "sku_gravity": 11,
                "price_gravity": "6.51 - 7.63"
            },
            {
                "id": "Asda",
                "sku_gravity": 8,
                "price_gravity": "7.63 - 19.00"
            },
            {
                "id": "Asda",
                "sku_gravity": 20,
                "price_gravity": "3.04 - 5.27"
            },
            {
                "id": "Asda",
                "sku_gravity": 13,
                "price_gravity": "5.27 - 6.07"
            },
            {
                "id": "Asda",
                "sku_gravity": 6,
                "price_gravity": "6.07 - 6.51"
            },
            {
                "id": "JS",
                "sku_gravity": 7,
                "price_gravity": "6.51 - 7.63"
            },
            {
                "id": "JS",
                "sku_gravity": 7,
                "price_gravity": "7.63 - 19.00"
            },
            {
                "id": "JS",
                "sku_gravity": 9,
                "price_gravity": "3.04 - 5.27"
            },
            {
                "id": "JS",
                "sku_gravity": 2,
                "price_gravity": "5.27 - 6.07"
            },

            {
                "id": "JS",
                "sku_gravity": 8,
                "price_gravity": "6.07 - 6.51"
            },
            {
                "id": "Coop",
                "sku_gravity": 10,
                "price_gravity": "6.51 - 7.63"
            },
            {
                "id": "Coop",
                "sku_gravity": 8,
                "price_gravity": "7.63 - 19.00"
            },
            {
                "id": "Coop",
                "sku_gravity": 6,
                "price_gravity": "3.04 - 5.27"
            },
            {
                "id": "Coop",
                "sku_gravity": 4,
                "price_gravity": "5.27 - 6.07"
            },

            {
                "id": "Coop",
                "sku_gravity": 2,
                "price_gravity": "6.07 - 6.51"
            }
        ]
    }}
 *
 *
 *
*/


import React from 'react';
import * as d3 from 'd3';
import styles from './style.scss';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';



class MultilineOrdinalChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    createOrdinalChart = (data2,chart_id,axis_prefix) =>{

      console.log("---insde the graaaaphs----",data2);

      //--------Extracting the data and other parameters
        let combined=data2.chart_data;
        let color_hash = data2.color_order;
        let yaxis_col_name=data2.yaxis_col_name;
        let xaxis_col_name=data2.xaxis_col_name;
        let series_type_col_name=data2.series_col_name;
        let xaxis_bands=data2.xaxis_bands;
        // console.log(combined,yaxis_col_name,xaxis_col_name,series_type_col_name,xaxis_bands)
console.log("MultilineOrdinalChartId:",chart_id);


        let xaxis_title="Price buckets (£) ";
        let yaxis_title="# of SKUs";



      //--------Functions used

      //Calculating the maximum
      let max_value_calculation=(data,column_name)=>{
        let max_value=d3.max(data, function(d) {
          return d[column_name];
        });
        return max_value;
      };

      //Calculating the minimum
      let min_value_calculation=(data,column_name)=>{
        let min_value=d3.min(data, function(d) {
          return d[column_name];
        });
        return min_value;
      };

      let series_type_values=[];
        let dataGroup = d3.nest()
            .key(function(d) {
                return d[series_type_col_name];
            })
            .entries(combined);
      console.log("MultiLineOrdinalChart dataGroup",dataGroup);
        dataGroup.forEach(function(d) {
            series_type_values.push(d.key)
        });
      console.log("MultiLineOrdinalChart dataGroup",dataGroup);

      //--------------Configurations & Axis definitions

      //Configurations
        var containerWidth = document.getElementById(chart_id).clientWidth;
        let margin = {top: 20, right: 5, bottom: 60, left:50},
          width = containerWidth - margin.left - margin.right,
          height = containerWidth*0.25 - margin.top - margin.bottom;

        let spaceForLegends=65;
        //Axis
        let xScale = d3.scalePoint()
                      .range([0, width-spaceForLegends])
                      .domain(xaxis_bands);

        let yScale = d3.scaleLinear()
                    .domain([0,max_value_calculation(combined,yaxis_col_name)+5])
                    .range([height, 0]);

        let xAxis = d3.axisBottom(xScale)
          .tickFormat(function(d) {
            return (d);
          });

        let yAxis = d3.axisLeft(yScale)
            .tickFormat(function(d) {
                return (d);
            });

        //Colour
        // let color_hash = ["#b2b2b2", "#7fb256", "#c288d6", "#896219", "#f60909", "#e5f213", "#0931f6"];

      //---------- Adding the chart(svg)

      let svg = d3.select('#'+chart_id);
      svg.selectAll("*").remove();
      let chart = svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + (containerWidth + 200)+ " " + (containerWidth*0.25 + 150))
        //class to make it responsive
        .classed("svg-content-responsive", true)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")")
        .attr("width",width + margin.left + margin.right).attr("height",height + margin.top + margin.bottom);


      //--------- Removing Height and Width property from svg
      setTimeout(function(){
        d3.select('#'+chart_id).attr("width",null).attr("height",null)
      },100)
      //---------- Adding the axis
      chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .classed("axis xaxis", true)
            .call(xAxis);

        chart.append("g")
            .classed("axis yaxis", true)
            .call(yAxis);


      //---------- Adding the the lines
        let lineFun = d3.line()
            .curve(d3.curveBasis)
            .x(function(d) {
                return xScale(d[xaxis_col_name]);})
            .y(function(d) {
                return yScale(d[yaxis_col_name]); });




        dataGroup.forEach(function(d,i) {
            let colour_no=color_hash[i];

            chart.append('path')
                .attr("stroke-width",2)
                .attr("stroke",colour_no)
                .attr("d",lineFun(d.values))
                .attr("fill","none")
        });

      //---------- Adding the axis titles

      //X axis
      chart.append("text")
        .attr("transform","translate(" + (width/2) + " ," +(height + margin.top+(margin.bottom/2)) + ")")
        .style("text-anchor", "middle")
        .text(xaxis_title);

      //Y axis
      chart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - (margin.left)+10)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(yaxis_title);


      //---------- Adding the legends

        let legend = chart.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(series_type_values)
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 25 + ")";
            });

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", function (d, i) {
                return color_hash[i];
            });

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function (d) {
                return d;
            });

    };

    componentDidMount = () => {
        console.log('Component Mount -> ', this.props.data);
        console.log('Component Mount -> ', this.props.data[0]);
        console.log('Component Mount -> ', this.props.data[1]);
        console.log('Component Mount -> ', this.props.data[2]);

        this.createOrdinalChart(this.props.data[0],this.props.data[1],this.props.data[2]);
    };

    componentDidUpdate = () => {
        // this.createOrdinalChart (this.props.data[0],this.props.data[1],this.props.data[2])
      this.createOrdinalChart(this.props.data[0],this.props.data[1],this.props.data[2]);
    };


  render() {



      return (
      <div>
        <div>
          <svg id={this.props.data[1]} width="1100" height="320" fontFamily="sans-serif" fontSize="10"> </svg>
        </div>
      </div>
    );
  }
}

MultilineOrdinalChart.propTypes = {

};

export default MultilineOrdinalChart;
