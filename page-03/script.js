d3.csv('../data/cities.csv').then(data => {
  console.log(data)
  d3.select('#svg')
    .style('border', '1px solid')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => parseFloat(d.x) * 1.75 + 250)
    .attr('cy', d => parseFloat(d.y) * -1.75 + 250)
    .attr('r', d => parseInt(d.population) * 0.00001)
    .attr('opacity', 0.25)
    .attr('fill', d => {
      if (d.country === 'USA') {
        return 'cornflowerblue'
      } else if (d.country === 'Pakistan') {
        return 'gold'
      } else if (d.country === 'Italy') {
        return 'green'
      } else if (d.country === 'Brazil') {
        return 'tomato'
      }
    })
})
