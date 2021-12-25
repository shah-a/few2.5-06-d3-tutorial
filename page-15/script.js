const handleData = (data) => {
  const width = 500
  const height = 500

  const numFormat = d3.format('.2s')
  const countries = [...new Set(data.map(d => d.country))]

  const colourScale = d3.scaleOrdinal(d3.schemeSet3)

  const hierarchy = {
    label: 'World',
    population: data.reduce((acc, d) => acc + parseInt(d.population), 0),
    children: []
  }

  countries.forEach(d1 => {
    const cities = data.filter(d2 => d2.country === d1)
    const population = cities.reduce((acc, d2) => acc + parseInt(d2.population), 0)
    hierarchy.children.push({
      label: d1,
      population,
      children: cities
    })
  })

  const root = d3.hierarchy(hierarchy)
    .sum(d => d.population)

  const pack = d3.pack(root)
    .size([width, height])
    .padding(2)

  const rootNode = pack(root)

  const nodes = d3.select('#svg')
    .selectAll('g')
    .data(rootNode.descendants())
    .join('g')
    .attr('transform', d => `translate(${d.x}, ${d.y})`)

  nodes.append('circle')
    .attr('r', d => d.r)
    .attr('fill', d => d.data.country ? colourScale(d.data.country) : colourScale(d.data.label))
    .attr('stroke', 'black')
    .attr('opacity', d => d.data.country ? '0.7' : '0.3')

  nodes.append('text')
    .text(d => `${numFormat(d.data.population)}`)
    .attr('transform', 'translate(0, 8)')
    .style('font-family', 'Helvetica, sans-serif')
    .style('font-size', '12px')
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle')
    .style('mix-blend-mode', 'difference')
    .style('fill', 'white')

  nodes.append('text')
    .text(d => `${d.data.label}`)
    .attr('transform', d => d.data.country ? 'translate(0, -8)' : `translate(0, -${d.r - 12})`)
    .style('font-family', 'Helvetica, sans-serif')
    .style('font-size', '12px')
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle')
    .style('mix-blend-mode', 'difference')
    .style('fill', d => d.data.country ? 'white' : 'black')
}

const data = await d3.csv('../data/cities.csv')
handleData(data)
