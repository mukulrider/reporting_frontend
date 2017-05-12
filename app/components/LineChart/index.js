/**
 *
 * LineChart
 *
 */
import React from 'react';
// import styled from 'styled-components';
import {FormattedMessage} from 'react-intl';
import messages from './messages';
import Button from 'components/button';
import * as d3 from 'd3';
class LineChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  created3Graph = (data,y_axis) => {
    // console.log("This is my line chart data:",data);
    // let data1 = [
    //   {
    //     "tot_val": "17554460.700",
    //     "calendar_date": "2017-05-04"
    //   },
    //   {
    //     "tot_val": "15124515.440",
    //     "calendar_date": "2017-05-03"
    //   },
    //   {
    //     "tot_val": "15631658.030",
    //     "calendar_date": "2017-05-02"
    //   },
    //   {
    //     "tot_val": "14924648.100",
    //     "calendar_date": "2017-05-01"
    //   },
    //   {
    //     "tot_val": "15347016.900",
    //     "calendar_date": "2017-04-30"
    //   },
    //   {
    //     "tot_val": "28903519.880",
    //     "calendar_date": "2017-04-29"
    //   },
    //   {
    //     "tot_val": "28469925.330",
    //     "calendar_date": "2017-04-28"
    //   },
    //   {
    //     "tot_val": "19627733.270",
    //     "calendar_date": "2017-04-27"
    //   }
    // ];
    const data1=data;
    var svg = d3.select("#sampleSvg");
    svg.selectAll("*").remove();
    svg = d3.select("#sampleSvg");
    let  margin = {top: 20, right: 20, bottom: 60, left: 50};
    let  width = +svg.attr("width") - margin.left - margin.right;
    let  height = +svg.attr("height") - margin.top - margin.bottom;
    let  g = svg.append("g").attr("transform", "translate(100," + margin.top + ")");

    //.attr("transform",'translate(300,0)');
    // .attr('width',width+margin.left+margin.right)
    // .attr('height',height+margin.top+margin.bottom)
    // .append("g")
    // .attr('transform', 'translate(200,0)');   //Is not making a difference
    const parseTime = d3.timeParse("%Y-%m-%d");
    let x = d3.scaleTime()
      .rangeRound([0, width]);
    let y = d3.scaleLinear()
      .rangeRound([height, 0]);
    let line = d3.line()
      .x(function (d) {return x(d.calendar_date)})
      .y(function (d) {return y(d.tot_val)});
    let formatTime = d3.timeFormat("%d %b");
    // console.log("Parsed Value", formatTime(parseTime("June 30, 2015")));
    data1.forEach((d) => {
      // console.log("Parsed Value", parseTime(d.calendar_date));
      // console.log("Formated Value", formatTime(parseTime(d.calendar_date)));
      d.calendar_date = parseTime(d.calendar_date);
      // console.log("formatting",d3.time.format('%m-%d')(d.calendar_date));
      d.tot_val = +d.tot_val;
      return d;
    });
    x.domain(d3.extent(data1, function (d) {
      return d.calendar_date;
    }));
    y.domain(d3.extent(data1, function (d) {
      return d.tot_val;
    }));
    g.append("g")
      .attr("transform", "translate(0," + height + ")")      //Shift entire axis
      .call(d3.axisBottom(x).tickFormat(
        function(data){
          var dateObj = new Date(data);
          console.log("Raunak's date", dateObj);
          return dateObj.getDate() + '-' + dateObj.toLocaleString("en", { month: "short"  }) }).ticks(7)
      ).selectAll("text")
      .attr("transform","translate(0,0)rotate(0)")        //Shift axis labels
      .attr("width",1)
      .append("text")
      .attr("fill", "#000")
      .attr("text-anchor", "end")
      .text("Testing");
    //.select(".domain")
    //.remove();
    //Axis Title
    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "translate(0,0)rotate(-90)")     //change
      .attr("dy", "1.30em")
      .attr("text-anchor", "end")
      .text(this.props.y_axis)
    //.selectAll();
    g.append("g")
      .attr("transform", "translate(0,0)")     //Shift Y axis
      .call(d3.axisLeft(y));
    g.append("path")
      .datum(data1)
      .attr("transform","translate(0,0)rotate(0)")      //Change
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }
  componentDidMount = () => {
    console.log("Line Chart Data",this.props.data)
    this.created3Graph(this.props.data)
    console.log("Line Chart Props",this.props.y_axis)
  };
  componentDidUpdate = () => {
    console.log("updated.. line chart", this.props.data)
    this.created3Graph(this.props.data)
  };
  render() {
    return (
      <div>
        <svg width="700" height="300" id="sampleSvg" className="lineChart"></svg>
      </div>
    );
  }
}
LineChart.propTypes = {};
export default LineChart;
