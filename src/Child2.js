import React, { Component } from 'react';
import * as d3 from 'd3';

class Child2 extends Component {
  componentDidMount() {
    this.drawScatterplot();
  }

  componentDidUpdate() {
    this.drawScatterplot();
  }

  drawScatterplot = () => {
    const data = this.props.data.map(d => ({
        x: parseFloat(d.x),
        y: parseFloat(d.y),
        category: d.category
      }));
    const svg = d3.select('.child2_svg')
    .attr('width', 500) 
    .attr('height', 500); 

    const padding = 50; 
    const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.x)) 
    .range([padding, 500 - padding]); 

    const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.y)) 
    .range([500 - padding, padding]); 

    var tooltip = d3.select("body")
    .selectAll(".tooltip_div")
    .data([0])  
    .join("div")  
    .attr("class", "tooltip_div")  
    .style("position", "absolute")  
    .style("visibility", "hidden"); 


    const circles = svg.selectAll('.dot')
    .data(data)
    .join('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .attr('r', 2) 
    .attr('fill', 'blue');

    
    circles.append('title')
    .text(d => `x: ${d.x}, y: ${d.y}`);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const g = d3.select('.g_2')

    g.selectAll('.axis')
    .data([xAxis, yAxis])
    .join('g')
    .attr('class', 'axis')
    .each(function(d, i) {
        d3.select(this)
        .attr('transform', i === 0 ? `translate(0, ${500 - padding})` : `translate(${padding}, 0)`)
        .call(d);
        
    })

    g.append('text')
    .attr('transform', `translate(${500 / 2}, ${500 - padding + 40})`) 
    .style('text-anchor', 'middle')
    .text('X');

    g.append('text')
    .attr('transform', `translate(${padding - 40}, ${500 / 2})`) 
    .style('text-anchor', 'middle')
    .text('Y');


  }
  
  render() {
    return (
      <div>
        <svg className="child2_svg">
            <g className="g_2"></g>
        </svg>
      </div>
    )
  }
}

export default Child2;