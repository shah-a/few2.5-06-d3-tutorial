const handleData = (data) => {
  const width = 600
  const height = 600
  const margin = 40

  const colourScale = d3.scaleSequential()
    .domain([0, data.length])
    .interpolator(d3.interpolateRainbow)

  const pieGen = d3.pie()
  const arcData = pieGen(data.map(d => d.population))
  const arcGen = d3.arc()
    .innerRadius(40)
    .outerRadius(200)
    .padAngle(0.01)

  const svg = d3.select('#svg')
  const pieGroup = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  const piePath = pieGroup.selectAll('path')
    .data(arcData)
    .enter()
    .append('path')
    .attr('d', arcGen)
    .attr('fill', (d, i) => colourScale(i))
}

const data = await d3.csv('../data/cities.csv')
handleData(data)
