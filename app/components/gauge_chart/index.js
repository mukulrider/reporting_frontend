/**
*
* SampleBarChart
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import style from './style.scss';
import * as d3          from 'd3';


class GaugeChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  createChart = (a,id) => {

    let width = 300;
    let height = 300;

    let svg = d3.select( "#"+id )
      .append( "svg" )
      .attr( "width", width )
      .attr( "height", height );

    let arc = d3.arc()
      .innerRadius( 50 )
      .outerRadius( 80 )
      .cornerRadius( 0 )
      .padAngle( 0 );

// an array of colors
    colors = [ "#00ff00", "#ffa500", "#ff0000" ];

// fetch the json data. In here we build the guage
//d3.json("data.json", function(error, data) {


    // initialize pie chart
    let pie = d3.pie()
      .startAngle( (-1*Math.PI) / 2 )
      .endAngle( Math.PI / 2 )
      .value( function( colors ) {
        return 100 / colors.length;
      } );

    // draw the arcs. one for each color
    let arcs = svg.selectAll( '.arc' )
      .data( pie( colors ) )
      .enter()
      .append( 'path' )
      .attr( "d", arc )
      .attr( "transform", "translate(100,100)" )
      .style( "fill", function( d, i ) {
        return colors[i]
      } );

    // set up the needle
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
        return " translate(100,100) rotate(" + d + ")"
      } );

   // a = 50
    console.log(svg.selectAll( ".needle" ))
    svg.selectAll( ".needle" ).data( [a] )
      .transition()
      .ease( d3.easeElasticOut )
      .duration( 2000 )
      .attr( "transform", function( d ) {
        return "translate(100,100) rotate(" + d*1.8 + ")"
      });

    svg.append('text').attr('x',25).attr('y',115).text("0.0")
    svg.append('text').attr('x',150).attr('y',115).text("100.0")



  }

  componentDidMount = () =>{
    console.log("Inside sample barchart------",this.props)
    this.createChart(this.props.data[0],this.props.id);

  };

  componentDidUpdate= () =>{


  };




  render() {
    return (
      <div>
        <div id={this.props.id}></div>
      </div>
    );
  }
}

SampleBarChart.propTypes = {

};

export default SampleBarChart;
