/**
 *
 * StackedChart
 *
 */

import React from 'react';
import * as d3 from 'd3';
import { FormattedMessage } from 'react-intl';

class StackedChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createStackedBarChart = (data,chart_id,label_ty,label_ly,xaxis_title,yaxis_title,no_pref,no_suffix) => {
    console.log("---insde the createStackedBarChart----",data);
    console.log("========= XAxis ",xaxis_title);
    console.log("========= YAxis",yaxis_title);
    window.onresize = function(){
      console.log("window.onresiz id",chart_id)
    }
    /*
    let margin = {top: 20, right: 200, bottom: 60, left: 100},
      width = 650 - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;*/
    var data = [
      {month: "Q1-2016", apples: -3840, bananas: -1920, cherries: -1960, dates: -400, oranges: -300, melons: -400},
      {month: "Q2-2016", apples: 1600, bananas: 1440, cherries: 960, dates: 400, oranges: 500, melons: 500},
      {month: "Q3-2016", apples:  40, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q4-2016", apples:  940, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q5-2016", apples:  840, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q6-2016", apples:  240, bananas:  560, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q7-2016", apples:  640, bananas:  960, cherries: 140, dates: 600, oranges: -300, melons: -900},
      {month: "Q8-2016", apples:  640, bananas:  960, cherries: 40, dates: 600, oranges: -300, melons: -900},
      {month: "Q9-2016", apples:  60, bananas:  960, cherries: 40, dates: 600, oranges: -300, melons: -900},
      {month: "Q10-2016", apples:  540, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q11-2016", apples:  740, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q12-2016", apples:  640, bananas:  1960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q13-2016", apples:  1140, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q14-2016", apples:  1840, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q15-2016", apples:  1640, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q16-2016", apples:  3640, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q17-2016", apples:  2640, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q18-2016", apples:  640, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q19-2016", apples:  1240, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q20-2016", apples:  2640, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q21-2016", apples:  2940, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q22-2016", apples:  3440, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q23-2016", apples:  40, bananas:  960, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q24-2016", apples:  140, bananas:  60, cherries: 40, dates: 600, oranges: -300, melons: -900},
      {month: "Q25-2016", apples:  40, bananas:  960, cherries: 40, dates: 60, oranges: -300, melons: -900},
      {month: "Q26-2016", apples:  340, bananas:  160, cherries: 640, dates: 600, oranges: -300, melons: -900},
      {month: "Q28-2016", apples:  920, bananas:  980, cherries: -640, dates: -400, oranges: -300, melons: -400},
      {month: "Q29-2016", apples:  320, bananas:  480, cherries: -640, dates: -400, oranges: -300, melons: -400},
      {month: "Q30-2016", apples:  320, bananas:  480, cherries: -640, dates: -400, oranges: -300, melons: -400},
      {month: "Q31-2016", apples:  320, bananas:  480, cherries: -640, dates: -400, oranges: -300, melons: -400},
      {month: "Q32-2016", apples:  320, bananas:  480, cherries: -640, dates: -400, oranges: -300, melons: -400},
      {month: "Q33-2016", apples:  320, bananas:  480, cherries: -640, dates: -400, oranges: -300, melons: -400},
      {month: "Q34-2016", apples:  320, bananas:  480, cherries: -640, dates: -400, oranges: -300, melons: -400},
      {month: "Q35-2016", apples:  320, bananas:  480, cherries: -640, dates: -400, oranges: -300, melons: -400},
      {month: "Q36-2016", apples:  320, bananas:  480, cherries: -640, dates: -400, oranges: -300, melons: -400},
      {month: "Q37-2016", apples:  320, bananas:  480, cherries: -640, dates: -400, oranges: -300, melons: -400}
    ];


    var series = d3.stack()
      .keys(["0","apples", "bananas", "cherries", "dates","oranges","melons"])
      .offset(stackOffsetDiverging)
      (data);
    console.log("Stackedbarline series",series);
    let containerWidth = document.getElementById(chart_id + '_svg').clientWidth;
    console.log(containerWidth)
    var margin = {top: 20, right: 30, bottom: 30, left: 60},
      width = 850 - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;

    var x = d3.scaleBand()
      .domain(data.map(function(d) { return d.month; }))
      .rangeRound([margin.left, width - margin.right])
      .padding(0.1);

    var y = d3.scaleLinear()
      .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
      .rangeRound([height - margin.bottom, margin.top]);

    var z = d3.scaleOrdinal()
      .range(["#99b", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    // define the 1st line
    let valueline = d3.line()
      .x(function(d) { return x(d.month); })
      .y(function(d) { return y(d.bananas); });


    let svg = d3.select('#'+this.props.id + '_svg');
    //svg.selectAll("*").remove();
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.left + margin.right)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 750 200")
      .classed("svg-content", true)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
      svg.selectAll("g")
      .data(series)
      .enter().append("g")
      .attr("fill", function(d) { console.log("StackedChart fill function",d.key); return z(d.key); })
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("width", x.bandwidth)
      .attr("x", function(d) { return x(d.data.month); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })

    //Removing the height and width property for preserveAspectRatio
    setTimeout(function(){
      svg
        .attr("height",null)
        .attr("width",null);
    },100);
    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);


    svg.append("g")
      .attr("transform", "translate(0," + y(0) + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("x", 25)
      .attr("transform", "rotate(45)");

    svg.append("g")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(d3.axisLeft(y));

    function stackMin(serie) {
      return d3.min(serie, function(d) { return d[0]; });
    }

    function stackMax(serie) {
      return d3.max(serie, function(d) { return d[1]; });
    }

    function stackOffsetDiverging(series, order) {
      if (!((n = series.length) > 1)) return;
      for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
        for (yp = yn = 0, i = 0; i < n; ++i) {
          if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
            d[0] = yp, d[1] = yp += dy;
          } else if (dy < 0) {
            d[1] = yn, d[0] = yn += dy;
          } else {
            d[0] = yp;
          }
        }
      }
    }

  }

  componentDidMount = () => {
    this.createStackedBarChart(this.props.data,this.props.id,this.props.label_ty,this.props.label_ly,this.props.xaxis_title,this.props.yaxis_title,this.props.no_pref,this.props.no_suffix);
  };

  componentDidUpdate = () => {
    this.createStackedBarChart(this.props.data,this.props.id,this.props.label_ty,this.props.label_ly,this.props.xaxis_title,this.props.yaxis_title,this.props.no_pref,this.props.no_suffix);
  };



  render() {
    return (
      <div id={this.props.id}><svg id={this.props.id + '_svg'}></svg></div>
    );
  }
}

StackedChart.propTypes = {
};

export default StackedChart;
