const handleData = (data) => {
  const width = 500
  const height = 500

  const colourScale = d3.scaleSequential()
    .domain(d3.extent(data, d => d.population))
    .interpolator(d3.interpolateViridis)

  const numFormat = d3.format('.2s')

  const root = d3.hierarchy({ children: data })
    .sum(d => d.population)

  const pack = d3.pack()
    .size([width, height])
    .padding(3)

  const rootNode = pack(root)

  const svg = d3.select('#svg')

  svg.selectAll('g')
    .data(rootNode.leaves())
    .join('g')
    .attr('transform', d => `translate(${d.x}, ${d.y})`)
    .append('circle')
    .attr('r', d => d.r)
    .attr('fill', d => colourScale(d.data.population))

  svg.selectAll('g')
    .data(rootNode.leaves())
    .join('g')
    .append('text')
    .text(d => numFormat(d.data.population))
    .style('font-family', 'Helvetica, sans-serif')
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle')
    .style('mix-blend-mode', 'difference')
    .style('fill', 'white')
}

const data = await d3.csv('../data/cities.csv')
handleData(data)
