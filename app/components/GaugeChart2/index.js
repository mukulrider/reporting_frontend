/**
*
* GaugeChart2
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import * as d3          from 'd3';


class GaugeChart2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (a,id,colors) => {
    console.log("Inside createchart of GaugeChart2")
    console.log(a)
    var containerWidth = document.getElementById(id).clientWidth;
    let width = containerWidth;
    let height = containerWidth*0.5;
    console.log("GaugeChart2 X :",containerWidth)
    let svg = d3.select("#"+id )
      .append( "svg" )
      .attr("id",id +"_svg")
      .attr( "width", width )
      .attr( "height", height )
      .attr("transform","translate(-" + 40 +")")
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 400 200")
      //class to make it responsive
      .classed("svg-content-responsive", true);
    svg.append('text').attr('x',width/2 + 20 - 80).attr('y',height/2 + 10).text("0.0")
    svg.append('text').attr('x',width/2 + 20 +80).attr('y',height/2 + 10).text("100.0%")
    let arc = d3.arc()
      .innerRadius( 50 )
      .outerRadius( 80 )
      .cornerRadius( 0 )
      .padAngle( 0 );

    // Removing height n width from svg
    setTimeout(function(){
      d3.select('#' + id + '_svg').attr("width",null).attr("height",null)
    },200)
//
// // an array of colors

//
// // fetch the json data. In here we build the guage
// //d3.json("data.json", function(error, data) {
//
//
//  // initialize pie chart
    //(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    let pie = d3.pie()
      .startAngle( (-1*Math.PI) / 2 )
      .endAngle( Math.PI / 2 )
      .value( function( colors ) {
        return 100 / colors.length;
      });
//
//     // draw the arcs. one for each color
    let arcs = svg.selectAll( '.arc' )
      .data( pie( colors ) )
      .enter()
      .append( 'path' )
      .attr( "d", arc )

      .attr( "transform", "translate(" + (width/2 + 30) + ",100)" )
      .style( "fill", function( d, i ) {
        return colors[i]
      } );

//     // set up the needle
    let needle = svg.selectAll( ".needle" )
      .data( [0] )
      .enter()
      .append( 'line' )
      .attr( "x1", 0 )
      .attr( "x2", -65 )
      .attr( "y1", 0 )
      .attr( "y2", 0 )
      .classed("needle", true)
      .style( "stroke", "black" )
      .attr( "transform", function( d ) {
        return " translate(" + 20 + ",100) rotate(" + d + ")"
      } );
//
//     // a = 50
//     console.log(svg.selectAll( ".needle" ))
    svg.selectAll( ".needle" ).data( [a] )
      .transition()
      .ease( d3.easeElasticOut )
      .duration( 2000 )
      .attr( "transform", function( d ) {
        return "translate(" + (width/2 + 30)+ ",100) rotate(" + d + ")"
      });





  }

  componentDidMount = () =>{
    console.log("Inside gauge barchart------",this.props)
    this.createChart(this.props.data[0],this.props.id,[ "#98abc5", "#8a89a6", "#7b6888" ]);
  };

  componentDidUpdate= () => {
  };

    render() {
    return (
      <div>
        <div id={this.props.id}></div>
      </div>
    );
  }
}

GaugeChart2.propTypes = {

};

export default GaugeChart2;
