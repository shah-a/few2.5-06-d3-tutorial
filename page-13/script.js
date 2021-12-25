const handleData = (data) => {
  const width = 600
  const height = 600
  const margin = 40

  const countries = [...new Set(data.map(d => d.country))]

  const colourScale = d3.scaleSequential()
    .domain([0, data.length])
    .interpolator(d3.interpolateRainbow)

  const pieGen = d3.pie()

  const cityData = pieGen(data.map(d => d.population))
  const countryData = pieGen(countries.map((country) => {
    let population = 0
    data.forEach(d => {
      if (d.country === country) {
        population += parseInt(d.population)
      }
    })
    return population
  }))

  const cityGen = d3.arc()
    .innerRadius(40)
    .outerRadius(200)
    .padAngle(0.01)
  const countryGen = d3.arc()
    .innerRadius(205)
    .outerRadius(210)
    .padAngle(0.01)
  const labelGen = d3.arc()
    .innerRadius(160)
    .outerRadius(160)

  const svg = d3.select('#svg')
  const legend = svg.append('g')
  const cityGroup = svg.append('g')
    .attr('transform', `translate(${width - (210 + margin)}, ${height - (210 + margin)})`)
  const countryGroup = svg.append('g')
    .attr('transform', `translate(${width - (210 + margin)}, ${height - (210 + margin)})`)
  const labels = svg.append('g')
    .attr('transform', `translate(${width - (210 + margin)}, ${height - (210 + margin)})`)

  cityGroup.selectAll('path')
    .data(cityData)
    .enter()
    .append('path')
    .attr('d', cityGen)
    .attr('fill', (d, i) => colourScale(i))

  countryGroup.selectAll('path')
    .data(countryData)
    .enter()
    .append('path')
    .attr('d', countryGen)
    .attr('fill', (d, i) => colourScale(i))

  legend.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', 10)
    .attr('cy', (d, i) => (20 * i) + 15)
    .attr('r', 5)
    .attr('fill', (d, i) => colourScale(i))

  legend.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => `${d.label}, ${d.country}`)
    .attr('x', 20)
    .attr('y', (d, i) => (20 * i) + 20)
    .attr('font-family', 'Helvetica, sans-serif')
    .attr('font-size', '12px')

  labels.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d.label)
    .attr('transform', (d, i) => `translate(${labelGen.centroid(cityData[i])})`)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Helvetica, sans-serif')
    .attr('font-size', '12px')
}

const data = await d3.csv('../data/cities.csv')
handleData(data)
