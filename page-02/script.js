function makeRandomData(n) {
  const array = []
  for (let i = 0; i < n; i += 1) {
    array.push({ a: Math.random(), b: Math.random(), c: Math.random() })
  }
  return array
}

const data = makeRandomData(20)

console.log(data)

d3.select('#svg')
  .style('border', '1px solid #000')
  .selectAll('ellipse')
  .data(data)
  .enter()
  .append('ellipse')
  .attr('cx', (d, i) => i * 500 / data.length)
  .attr('cy', d => d.a * 500)
  .attr('rx', d => d.a * 50)
  .attr('ry', d => d.c * 50)
  .attr('fill', d => `hsl(${d.a * 360}, 100%, 50%)`)
  .attr('opacity', '0.5')
  .attr('stroke', d => `hsl(${d.b * 360}, 50%, 50%)`)
  .attr('stroke-width', d => d.a * 25)
