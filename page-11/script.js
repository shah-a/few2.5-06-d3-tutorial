const getMonthlyTemps = (data) => [
  'JAN', 'FEB', 'MAR',
  'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP',
  'OCT', 'NOV', 'DEC'
].map((month) => ({ month, temp: parseFloat(data[month]) }))

const handleData = (data) => {
  const width = 600
  const height = 300
  const margin = 40

  const year1901 = data[0]
  const year1950 = data[49]
  const year2017 = data[116]

  const months1901 = getMonthlyTemps(year1901)
  const months1950 = getMonthlyTemps(year1950)
  const months2017 = getMonthlyTemps(year2017)

  const xScale = d3.scaleLinear()
    .domain([0, months1901.length - 1])
    .range([margin, width - margin])
    .nice()

  const yScale = d3.scaleLinear()
    .domain(d3.extent(months1901, d => d.temp))
    .range([height - margin, margin])
    .nice()

  const monthsScale = d3.scaleTime()
    .domain([new Date(1901, 0, 1), new Date(1901, 11, 1)])
    .range([margin, width - margin])
    .nice()

  const lineGen = d3.area()
    .x((d, i) => xScale(i))
    .y0(d => yScale(d.temp))
    .y1(height - margin)
    .curve(d3.curveCardinal)

  const svg = d3.select('#svg')
  const graph = svg.append('g')
  const xAxis = d3.axisBottom(monthsScale)
  const yAxis = d3.axisLeft(yScale)

  graph.append('path')
    .attr('d', lineGen(months1901))
    // .attr('stroke', 'cornflowerblue')
    // .attr('stroke-width', '2')
    .attr('fill', '#fbb4ae')
    .attr('fill-opacity', '0.3')

  graph.append('path')
    .attr('d', lineGen(months2017))
    // .attr('stroke', 'cornflowerblue')
    // .attr('stroke-width', '2')
    .attr('fill', '#b3cde3')
    .attr('fill-opacity', '0.3')

  graph.append('path')
    .attr('d', lineGen(months1950))
    // .attr('stroke', 'cornflowerblue')
    // .attr('stroke-width', '2')
    .attr('fill', '#ccebc5')
    .attr('fill-opacity', '0.3')

  svg.append('g')
    .attr('transform', `translate(0, ${height - margin})`)
    .call(xAxis)

  svg.append('g')
    .attr('transform', `translate(${margin}, 0)`)
    .call(yAxis)
}

const data = await d3.csv('../data/india-weather-1901-2017.csv')
handleData(data)
