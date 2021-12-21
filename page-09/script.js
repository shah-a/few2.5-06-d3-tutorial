const handleData = (data) => {
  const margin = { top: 10, right: 10, bottom: 20, left: 40 }
  const width = 600
  const height = 300

  const populationExtent = d3.extent(data, d => parseInt(d.population))

  const xScale = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([margin.left, width - margin.left])
    .padding(0.3)

  const yScale = d3.scaleLinear()
    .domain(populationExtent)
    .range([height - margin.bottom, 10])
    .nice()

  const colourScale = d3.scaleOrdinal()
    .domain([...new Set(data.map(d => d.country))])
    .range(d3.schemePastel1)

  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)
    .tickFormat(d3.format('.2s'))
    .ticks(12)
    .tickSize(-width + margin.left + margin.right)
    // .tickValues([1000000, 5000000, 10000000, 15000000])

  const svg = d3.select('#svg')
  const barGroup = svg.append('g')

  barGroup.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.label))
    .attr('y', d => yScale(d.population))
    .attr('width', xScale.bandwidth())
    .attr('height', d => (height - margin.bottom) - yScale(d.population))
    .attr('fill', d => colourScale(d.country))

  svg.append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(xAxis)

  svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxis)
}

const data = await d3.csv('../data/cities.csv')
handleData(data)
