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

  const node = d3.select('#svg')
    .style('border', '1px solid')
    .selectAll('g')
    .data(data)
    .enter()

  const groups = node.append('g')

  groups.append('circle')
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .attr('r', d => popScale(d.population))
    .attr('fill', d => countryScale(d.country))
    .attr('opacity', 0.25)

  groups.append('text')
    .text(d => d.label)
    .attr('x', d => xScale(d.x) + (popScale(d.population) + 15) * Math.cos(Math.PI / 4))
    .attr('y', d => yScale(d.y) - (popScale(d.population) + 15) * Math.sin(Math.PI / 4))
    .attr('font-size', '10px')
    .style('font-family', 'Helvetica')
    .style('font-size', '18px')

  // groups.append('line')
  //   .attr('x1', d => xScale(d.x))
  //   .attr('y1', d => yScale(d.y))
  //   .attr('x2', d => xScale(d.x) + (popScale(d.population) + 10) * Math.cos(Math.PI / 4))
  //   .attr('y2', d => yScale(d.y) - (popScale(d.population) + 10) * Math.sin(Math.PI / 4))
  //   .attr('stroke', '#000')

  groups.append('path')
    .attr('d', d => {
      const x1 = xScale(d.x)
      const y1 = yScale(d.y)
      const x2 = xScale(d.x) + (popScale(d.population) + 10) * Math.cos(Math.PI / 4)
      const y2 = yScale(d.y) - (popScale(d.population) + 10) * Math.sin(Math.PI / 4)
      const x3 = x2 + 30
      const y3 = y2
      return d3.line()([[x1, y1], [x2, y2], [x3, y3]])
    })
    .attr('stroke', '#000')
    .attr('fill', 'none')
})
