import React, { Component } from 'react';
import * as d3 from 'd3';

class Child1 extends Component {
  componentDidMount() {
    const data = this.props.data;

    const frequency = data.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});

    const svg = d3.select('.child1_svg')
      .attr('width', 500)
      .attr('height', 500);

    const g = svg.select('.g_1')
      .attr('transform', 'translate(50, 50)');

    const xScale = d3.scaleBand()
      .domain(Object.keys(frequency))
      .range([0, 400])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(Object.values(frequency))])
      .range([400, 0]);

    const bars = g.selectAll('.bar')
      .data(Object.entries(frequency))
      .join('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d[0]))
      .attr('y', d => yScale(d[1]))
      .attr('width', xScale.bandwidth())
      .attr('height', d => 400 - yScale(d[1]))
      .attr('fill', '#6ab3a3');

      g.selectAll('.label')
      .data(Object.entries(frequency))
      .join('text')
      .attr('class', 'label')
      .attr('x', (d) => xScale(d[0]) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d[1]) + 20) 
      .text((d) => d[1])
      .attr('text-anchor', 'middle');


    g.selectAll('.x-axis')
      .data([null])
      .join('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0, 400)')
      .call(d3.axisBottom(xScale));

    g.append('text')
      .attr('transform', `translate(${400 / 2}, ${440})`)
      .style('text-anchor', 'middle')
      .text('categories');


  }


  render() {
    return (
      <div>
        <svg className="child1_svg">
          <g className="g_1"></g>
        </svg>
      </div>
    )
  }
}

export default Child1;