function handleData(data) {
  // const states = [...new Set(data.map((d) => d.state))] // Unique state names
  // states.forEach((state) => getDataForState(data, state))
  const baData = getDataForState(data, 'BA')
  const precipitationExtent = d3.extent(baData, d => d.precipitation)

  const xScale = d3.scaleLinear()
    .domain([0, baData.length])
    .range([10, 590])

  const yScale = d3.scaleLinear()
    .domain(precipitationExtent)
    .range([390, 10])

  const lineGen = d3.line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d.precipitation))
    .curve(d3.curveLinear)

  d3.select('#svg')
    .append('path')
    .attr('d', lineGen(baData))
    .attr('stroke', 'cornflowerblue')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
};

function getDataForState(data, state) {
  return data
    .filter((d) => d.state === state)
    // .filter((d) => !isNaN(d.precipitation))
    .map((d) => {
      d.precipitation = parseFloat(d.precipitation)
      return d
    })
}

d3.csv('../data/precipitation.csv').then(handleData);
