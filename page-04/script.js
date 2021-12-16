d3.csv('../data/cities.csv').then(data => {
  const xScale = d3.scaleLinear()
    .domain([-180, 180])
    .range([0, 700])

  const yScale = d3.scaleLinear()
    .domain([-90, 90])
    .range([0, 500])

  const countryScale = d3.scaleOrdinal()
    // .domain(data.map(d => d.country))
    .domain([...new Set(data.map(d => d.country))]) // unique values
    .range(['cornflowerblue', 'gold', 'green', 'tomato'])

  const popScale = d3.scaleSqrt()
    .domain([500_000, 15_000_000])
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
