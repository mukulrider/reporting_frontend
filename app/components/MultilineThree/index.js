/**
*
* MultilineThree
*
*/

import React from 'react';
// import styled from 'styled-components';
import * as d3 from 'd3';
import './style.scss';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class MultilineThree extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createMultilineThree = (data,chart_id,label_ty,label_ly,xaxis_title,yaxis_title,yaxis_title2,no_pref,no_suffix,no_pref2,no_suffix2) => {
    console.log("---insde the createMultilinePromoChart----",data);
    console.log("========= XAxis ",xaxis_title);
    console.log("========= YAxis",yaxis_title);
    // let data2 =   [
    //     {
    //       "tesco_week": "1-May-12",
    //       "value_ly": 68.13,
    //       "value_ty": 34.12
    //     },
    //     {
    //       "tesco_week": "30-Apr-12",
    //       "value_ly": 63.98,
    //       "value_ty": 45.56
    //     },
    //     {
    //       "tesco_week": "27-Apr-12",
    //       "value_ly": 67,
    //       "value_ty": 67.89
    //     },
    //     {
    //       "tesco_week": "26-Apr-12",
    //       "value_ly": 89.7,
    //       "value_ty": 78.54
    //     },
    //     {
    //       "tesco_week": "25-Apr-12",
    //       "value_ly": 99,
    //       "value_ty": 89.23
    //     },
    //     {
    //       "tesco_week": "24-Apr-12",
    //       "value_ly": 130.28,
    //       "value_ty": 99.23
    //     },
    //     {
    //       "tesco_week": "23-Apr-12",
    //       "value_ly": 166.7,
    //       "value_ty": 101.34
    //     },
    //     {
    //       "tesco_week": "20-Apr-12",
    //       "value_ly": 234.98,
    //       "value_ty": 122.34
    //     },
    //     {
    //       "tesco_week": "19-Apr-12",
    //       "value_ly": 345.44,
    //       "value_ty": 134.56
    //     },
    //     {
    //       "tesco_week": "18-Apr-12",
    //       "value_ly": 443.34,
    //       "value_ty": 160.45
    //     },
    //     {
    //       "tesco_week": "17-Apr-12",
    //       "value_ly": 543.7,
    //       "value_ty": 180.34
    //     },
    //     {
    //       "tesco_week": "16-Apr-12",
    //       "value_ly": 580.13,
    //       "value_ty": 210.23
    //     },
    //     {
    //       "tesco_week": "13-Apr-12",
    //       "value_ly": 605.23,
    //       "value_ty": 223.45
    //     },
    //     {
    //       "tesco_week": "12-Apr-12",
    //       "value_ly": 622.77,
    //       "value_ty": 201.56
    //     },
    //     {
    //       "tesco_week": "11-Apr-12",
    //       "value_ly": 626.2,
    //       "value_ty": 212.67
    //     },
    //     {
    //       "tesco_week": "10-Apr-12",
    //       "value_ly": 628.44,
    //       "value_ty": 310.45
    //     },
    //     {
    //       "tesco_week": "9-Apr-12",
    //       "value_ly": 636.23,
    //       "value_ty": 350.45
    //     },
    //     {
    //       "tesco_week": "5-Apr-12",
    //       "value_ly": 633.68,
    //       "value_ty": 410.23
    //     },
    //     {
    //       "tesco_week": "4-Apr-12",
    //       "value_ly": 624.31,
    //       "value_ty": 430.56
    //     },
    //     {
    //       "tesco_week": "3-Apr-12",
    //       "value_ly": 629.32,
    //       "value_ty": 460.34
    //     },
    //     {
    //       "tesco_week": "2-Apr-12",
    //       "value_ly": 618.63,
    //       "value_ty": 510.34
    //     },
    //     {
    //       "tesco_week": "30-Mar-12",
    //       "value_ly": 599.55,
    //       "value_ty": 534.23
    //     },
    //     {
    //       "tesco_week": "29-Mar-12",
    //       "value_ly": 609.86,
    //       "value_ty": 578.23
    //     },
    //     {
    //       "tesco_week": "28-Mar-12",
    //       "value_ly": 617.62,
    //       "value_ty": 590.12
    //     },
    //     {
    //       "tesco_week": "27-Mar-12",
    //       "value_ly": 614.48,
    //       "value_ty": 560.34
    //     },
    //     {
    //       "tesco_week": "26-Mar-12",
    //       "value_ly": 606.98,
    //       "value_ty": 580.12
    //     }
    //   ]
    //   console.log("---insde the createMultilinePromoChart mock_data",data2);
    // Add the valueline path.
    // set the dimensions and margins of the graph
    let containerWidth = document.getElementById(chart_id).clientWidth;
    let margin = {top: 20, right: 250, bottom: 60, left: 100},
      width = containerWidth - margin.left - margin.right,
      height = containerWidth*0.25 - margin.top - margin.bottom;

    console.log("---insde the createMultilinePromoChart---- check2",margin);
// set the ranges
    let x = d3.scaleLinear().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);
    let y2 = d3.scaleLinear().range([height, 0]);
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.tesco_week; }));
    y.domain([0, d3.max(data, function(d) {
      return Math.max(+d.value_ty); })]);
    y2.domain([0, d3.max(data, function(d) {
      return Math.max(+d.avg_ty, +d.avg_ly); })]);


    //Titles
    // let xaxis_title="Price buckets (£) ";
    // let yaxis_title="# of SKUs";


    let xAxis = d3.axisBottom(x)
      .tickFormat(function(d) {
        return (d);
      });

    let a = 0;

    let yAxis = d3.axisLeft(y)
      .tickFormat(function(d) {
        if(d>1000) {
          console.log("---------------------Y axis d",d);
          a = d/ 1000;
          a=a+'K';
          console.log("---------------------Y axis a",a);
        }
        else
          a = d;
        a = no_pref + a + no_suffix;
        return (a);
      });

    let yAxis2 = d3.axisRight(y2)
      .tickFormat(function(d) {

        a = d;
        a = no_pref2 + a + no_suffix2;
        return (a);
      });

// define the value line (primary axis)
    let valueline = d3.line()
      .x(function(d) { return x(d.tesco_week); })
      .y(function(d) { return y(+d.value_ty); });

// define the 1st line (Secondary Axis)
    let avgline1 = d3.line()
      .x(function(d) { return x(d.tesco_week); })
      .y(function(d) { return y2(+d.avg_ty); });

// define the 2nd line (Secondary Axis)
    let avgline2 = d3.line()
      .x(function(d) { return x(d.tesco_week); })
      .y(function(d) { return y2(+d.avg_ly); });



// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

    let svg = d3.select('#'+chart_id);
    svg.selectAll("*").remove();

    svg = d3.select('#' + chart_id)
      .append("svg")
      .attr("id",chart_id + '_svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 1200 350")
      .classed("svg-content", true)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Get the data

    // format the data
    data.forEach(function(d) {

      d.value_ty = +d.value_ty;
      d.avg_ty = +d.avg_ty;
      d.avg_ly = +d.avg_ly;
    });

    // Remove the width height property from svg
    setTimeout(function(){
      d3.select('#' + chart_id + '_svg').attr("height",null).attr("width",null);
    },200)
    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "orange")
      .attr("d", valueline);

    // Add the avgline1 path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "black")
      .attr("d", avgline1);

    // Add the avgline2 path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "blue")
      .attr("d", avgline2);


    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .classed("axis xaxis", true)
      .call(xAxis)
    .selectAll("text")
      .attr("x",25)
      .attr("transform","rotate(45)");


    // Add the Y Axis
    svg.append("g")
      .classed("axis yaxis", true)
      .call(yAxis);

    //Add the secondary Y Axis
    svg.append("g")
      .attr("class", "axisRed")
      .attr("transform", "translate( " + width + ", 0 )")
      .call(yAxis2);



  //X axis title
    svg.append("text")
      .attr("transform","translate(" + (width/2) + " ," +(height+10 + margin.top+(margin.bottom/2)) + ")")
      .style("text-anchor", "middle")
      .text(xaxis_title);

    //Y axis title
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (margin.left)+30)
      // .attr("y", 0 - (width / 2))
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yaxis_title);

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 + (margin.left)+840)
      // .attr("y", 0 - (width / 2))
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yaxis_title2);

    //Legend

    let data_label = [{"label":label_ty},{"label":label_ly},{"label":"Value TY"}]

    let legend = svg.append("svg")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(data_label)
      .enter().append("g")
      .attr("transform", function (d, i) {
        console.log("Multiline ---- d.label",d.label)
        return "translate(0," + i * 25 + ")";
      });

    let color_hash = ["black","blue","yellow"];

    legend.append("rect")
      .attr("x", width+95 )
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d, i) {
        return color_hash[i];
      });

    legend.append("text")
      .attr("x", width+90)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function (d) {
        console.log("Multiline text d.label",d.label)
        return d.label;
      });


  };

  componentDidMount = () => {
    console.log("XXXXXXXXXXXXXXX",this.props.xaxis_title)
    this.createMultilineThree(this.props.data,this.props.id,this.props.label_ty,this.props.label_ly
      ,this.props.xaxis_title,this.props.yaxis_title,this.props.yaxis_title2,this.props.no_pref,
      this.props.no_suffix,this.props.no_pref2, this.props.no_suffix2);
  };

  componentDidUpdate = () => {
    // this.createOrdinalChart (this.props.data[0],this.props.data[1],this.props.data[2])
    this.createMultilineThree(this.props.data,this.props.id,this.props.label_ty,
      this.props.label_ly,this.props.xaxis_title,this.props.yaxis_title,this.props.yaxis_title2,
      this.props.no_pref,this.props.no_suffix,this.props.no_pref2,this.props.no_suffix2);
  };




  render() {
    return (
      <div id={this.props.id}>
      </div>
    );
  }
}

MultilineThree.propTypes = {

};

export default MultilineThree;