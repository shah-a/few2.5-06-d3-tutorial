d3.csv('../data/cities.csv').then(data => {
  // const minX = d3.min(data, d => parseFloat(d.x))
  // const maxX = d3.max(data, d => parseFloat(d.x))
  const xExtent = d3.extent(data, d => parseFloat(d.x))

  // const minY = d3.min(data, d => parseFloat(d.y))
  // const maxY = d3.max(data, d => parseFloat(d.y))
  const yExtent = d3.extent(data, d => parseFloat(d.y))

  // const minPop = d3.min(data, d => parseInt(d.population))
  // const maxPop = d3.max(data, d => parseInt(d.population))
  const popExtent = d3.extent(data, d => parseInt(d.population))

  const countries = [...new Set(data.map(d => d.country))] // filter for unique values
  const colours = ['cornflowerblue', 'gold', 'green', 'tomato']

  const xScale = d3.scaleLinear()
    .domain(xExtent)
    .range([100, 600])

  const yScale = d3.scaleLinear()
    .domain(yExtent)
    .range([400, 100])

  const countryScale = d3.scaleOrdinal()
    .domain(countries)
    .range(colours)

  const popScale = d3.scaleSqrt()
    .domain(popExtent)
    .range([10, 100])

  d3.select('#svg')
    .style('border', '1px solid')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .attr('r', d => popScale(d.population))
    .attr('fill', d => countryScale(d.country))
    .attr('opacity', 0.25)
})
