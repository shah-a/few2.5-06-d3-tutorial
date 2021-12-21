function getDataForState(data, state) {
  return data
    .filter((d) => d.state === state)
    // .filter((d) => !isNaN(d.precipitation))
    .map((d) => {
      d.precipitation = parseFloat(d.precipitation)
      return d
    })
}

function handleData(data) {
  const width = 600
  const height = 400
  const margin = 40

  // const states = [...new Set(data.map((d) => d.state))] // Unique state names
  // states.forEach((state) => getDataForState(data, state))
  const baData = getDataForState(data, 'BA')
  const precipitationExtent = d3.extent(baData, d => d.precipitation)

  const parseTime = d3.timeParse('%d/%m/%Y')
  baData.forEach(d => d.date = parseTime(d.date))

  const dateExtent = d3.extent(baData, d => d.date)

  // const xScale = d3.scaleLinear()
  //   .domain([0, baData.length])
  //   .range([10, 590])

  const xScale = d3.scaleTime()
    .domain(dateExtent)
    .range([margin, width - margin])
    .nice()

  const yScale = d3.scaleLinear()
    .domain(precipitationExtent)
    .range([height - margin, margin])
    .nice()

  const radiusScale = d3.scaleSqrt()
    .domain(precipitationExtent)
    .range([1, 10])
    .nice()

  // const colourScale = d3.scaleOrdinal()
  //   .domain(dateExtent)
  //   .range(d3.schemeTableau10)

  const colourScale = d3.scaleSequential()
    .domain(dateExtent)
    .interpolator(d3.interpolateSpectral)

  const lineGen = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.precipitation))
    .curve(d3.curveLinear)

  const svg = d3.select('#svg')
  const graph = svg.append('g')
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)

  graph.append('path')
    .attr('d', lineGen(baData))
    .attr('stroke', 'cornflowerblue')
    .attr('stroke-width', 2)
    .attr('fill', 'none')

  svg.append('g')
    .attr('transform', `translate(0, ${height - margin})`)
    .call(xAxis)

  svg.append('g')
    .attr('transform', `translate(${margin}, 0)`)
    .call(yAxis)

  svg.append('g')
    .selectAll('circle')
    .data(baData)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.date))
    .attr('cy', d => yScale(d.precipitation))
    .attr('r', d => radiusScale(d.precipitation))
    // .attr('fill', 'rgba(255, 0, 0, 0.3)')
    .attr('fill', d => colourScale(d.date))
};

d3.csv('../data/precipitation.csv').then(handleData);
