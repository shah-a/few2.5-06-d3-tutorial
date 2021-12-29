import './BarChart.css'
import * as d3 from 'd3'
import useD3 from '../../hooks/useD3'

function BarChart({ data }) {
  const renderChartFn = (svg) => {
    const width = 800
    const height = 500
    const margin = { top: 20, right: 30, bottom: 30, left: 80 }

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .rangeRound([margin.left, width - margin.right])
      // .range([margin.left, width - margin.right])
      .padding(0.125)

    console.log(d3.extent(data, d => d.population))

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.population))
      // .domain([0, d3.max(data, d => d.population)])
      .rangeRound([height - margin.bottom, margin.top])
      // .range([height - margin.bottom, margin.top])
      .nice()

    const colourScale = d3.scaleOrdinal()
      .domain([...new Set(data.map(d => d.country))])
      .range(d3.schemePastel1)

    // const colourScale = d3.scaleOrdinal()
    //   .domain(data.map(d => d.country))
    //   .range(['cornflowerblue', 'gold', 'tomato', 'lime', 'firebrick'])

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    svg.select('g.x-axis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)

    svg.select('g.y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)

    svg.select('g.plot-area')
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.label))
      .attr('y', d => yScale(d.population))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(0) - yScale(d.population))
      .attr('fill', d => colourScale(d.country))
  }

  return (
    <div className="BarChart">
      <svg
        className="svg"
        ref={useD3(renderChartFn, [data.length])}
        width="800"
        height="500"
      >
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="plot-area" />
      </svg>
    </div>
  )
}

export default BarChart
