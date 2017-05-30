/**
*
* MultilinePromo
*
*/

import React from 'react';
// import styled from 'styled-components';
import * as d3 from 'd3';
import './style.scss';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class MultilinePromo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createMultilinePromoChart = (data,chart_id,label_ty,label_ly,xaxis_title,yaxis_title,no_pref,no_suffix,width=800,legend_width=650,legend_text_width=645) => {

console.log("HARSHIT",data)
    // let frameWidth = document.getElementById(chart_id).clientWidth;
    let frameWidth = 600;
    let margin = {top: 20, right: 100, bottom: 50, left: 60};
        width = frameWidth - margin.left - margin.right;
    let height = frameWidth*0.5 - margin.top - margin.bottom;
    // set the ranges
    let x = d3.scalePoint().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    // Scale the range of the data
    x.domain(data.map(function(d) { return d.tesco_week.toString(); }));
    y.domain([0, d3.max(data, function(d) {
      return Math.max(+d.value_ty, +d.value_ly); })]);

    let xAxis = d3.axisBottom(x)
      .tickFormat(function(d) {
        return (d);
      });

    let a = 0;

    let yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickFormat(function(d) {
        if(d>1000) {
          a = d/ 1000;
          a=a+'K';
        }
        else
          a = d;
          a = no_pref + a + no_suffix;
        return (a);
      });

//Tooltip
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

// define the 1st line
    let valueline = d3.line()
      .x(function(d) { return x(d.tesco_week); })
      .y(function(d) { return y(+d.value_ty); });

// define the 2nd line
    let valueline2 = d3.line()
      .x(function(d) { return x(d.tesco_week); })
      .y(function(d) { return y(+d.value_ly); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

    let svg = d3.select('#'+chart_id);
       svg.selectAll("*").remove();
       svg = d3.select('#'+chart_id).append("svg")
         .attr("id",chart_id + '_svg')
      .attr("width", frameWidth)
      .attr("height", frameWidth*0.6)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline)
      .on('mouseover', function(d) {
        // console.log("harshit");
        // console.log("------d",d);
        d.map((obj)=> {
        tooltip.html("Week : "+obj.tesco_week+"<br/>"+"Value : "+obj.value_ty);
        tooltip.style("visibility", "visible");})
      })
      .on('mousemove', function() {
        // console.log("y--"+(d3.event.pageY)+"x-----"+(d3.event.pageX))
        return tooltip.style("top", (d3.event.pageY-100)+"px").style("left",(d3.event.pageX+5)+"px");
      })
      .on('mouseout', function(){return tooltip.style("visibility", "hidden");});

    // Add the valueline2 path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "red")
      .attr("d", valueline2);


    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .classed("axis xaxis", true)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "translate(0,20)rotate(-45)");

    // Add the Y Axis
    svg.append("g")
      .classed("axis yaxis", true)
      .call(yAxis);

    //Y axis title
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (margin.left))
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", " middle")
      .text(yaxis_title);

    //X axis title
    svg.append("text")
      .attr("transform","translate(" + (width/2) + " ," +(height + margin.top+(margin.bottom/1.5))+")")
      .style("text-anchor", "middle")
      .text(xaxis_title);



    //Legend
    let legendWidth = width/5;
    let data_label = [{"label":label_ty},{"label":label_ly}]

    let legend = svg.append("svg")
      .attr("font-family", "sans-serif")
      .attr("x",0)
      .attr("y",-10) //c
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(data_label)
      .enter().append("g")
      .attr("transform", function (d, i) {
        return "translate(" + (legendWidth*i - width-20) +  "," + (height + margin.top + margin.bottom) + ")";
      });

    let color_hash = ["steelblue","red"];

    legend.append("rect")
      .attr("x", frameWidth-5 )
      .attr("y", 20)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d, i) {
        return color_hash[i];
      });


    legend.append("text")
      .attr("x", frameWidth-10)
      .attr("y", 30)
      .attr("dy", "0.32em")
      .text(function (d) {
        return d.label;
      });


  }

  componentDidMount = () => {
    this.createMultilinePromoChart(this.props.data,this.props.id,this.props.label_ty,this.props.label_ly,this.props.xaxis_title,this.props.yaxis_title,this.props.no_pref,this.props.no_suffix,this.props.containerWidth,
    this.props.containerHeight);
  };

  componentDidUpdate = () => {
    this.createMultilinePromoChart(this.props.data,this.props.id,this.props.label_ty,this.props.label_ly,this.props.xaxis_title,this.props.yaxis_title,this.props.no_pref,this.props.no_suffix,this.props.containerWidth,
      this.props.containerHeight);
  };



  render() {

    return (
      <div style={{background:"#fff",width:'400px'}} id={this.props.id}>
      </div>
    );
  }
}

MultilinePromo.propTypes = {

};

export default MultilinePromo;
