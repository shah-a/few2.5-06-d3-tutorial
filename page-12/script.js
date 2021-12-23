const generateOptions = (data, selectButton) => {
  data.forEach((d, i) => {
    const optionElement = document.createElement('option')
    optionElement.value = i
    optionElement.textContent = d.YEAR
    selectButton.appendChild(optionElement)
  })
}

const getMonthlyTemps = (data) => {
  const months = [
    'JAN', 'FEB', 'MAR', 'APR',
    'MAY', 'JUN', 'JUL', 'AUG',
    'SEP', 'OCT', 'NOV', 'DEC'
  ]
  return months.map((month) => ({ month, temp: data[month] }))
}

const handleData = (data) => {
  const width = 600
  const height = 300
  const margin = 40

  const selectButton1 = document.querySelector('#select-1')
  const selectButton2 = document.querySelector('#select-2')
  const selectButton3 = document.querySelector('#select-3')

  const monthlyData = data.map((d) => getMonthlyTemps(d))
  const allTemps = monthlyData.reduce((acc, month) => acc.concat(month.map((d) => d.temp)), [])

  const xScale = d3.scaleLinear()
    .domain([0, monthlyData[0].length - 1])
    .range([margin, width - margin])
    .nice()

  const yScale = d3.scaleLinear()
    .domain(d3.extent(allTemps))
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
  const path1 = graph.append('path')
  const path2 = graph.append('path')
  const path3 = graph.append('path')
  const xAxis = d3.axisBottom(monthsScale)
  const yAxis = d3.axisLeft(yScale)

  generateOptions(data, selectButton1)
  generateOptions(data, selectButton2)
  generateOptions(data, selectButton3)

  selectButton1.options[0].selected = true;
  selectButton2.options[4].selected = true;
  selectButton3.options[64].selected = true;

  svg.append('g')
    .attr('transform', `translate(0, ${height - margin})`)
    .call(xAxis)

  svg.append('g')
    .attr('transform', `translate(${margin}, 0)`)
    .call(yAxis)

  path1.attr('d', lineGen(monthlyData[0]))
    .attr('fill', `hsla(${0 / 116 * 360}, 100%, 50%, 0.3)`)

  path2.attr('d', lineGen(monthlyData[4]))
    .attr('fill', `hsla(${4 / 116 * 360}, 100%, 50%, 0.3)`)

  path3.attr('d', lineGen(monthlyData[64]))
    .attr('fill', `hsla(${64 / 116 * 360}, 100%, 50%, 0.3)`)

  selectButton1.addEventListener('change', (e) => {
    path1.transition()
      .duration(1000)
      .ease(d3.easeElasticOut)
      .attr('d', lineGen(monthlyData[e.target.value]))
      .attr('fill', `hsla(${e.target.value / 116 * 360}, 100%, 50%, 0.3)`)
  })

  selectButton2.addEventListener('change', (e) => {
    path2.transition()
      .duration(1000)
      .ease(d3.easeElasticOut)
      .attr('d', lineGen(monthlyData[e.target.value]))
      .attr('fill', `hsla(${e.target.value / 116 * 360}, 100%, 50%, 0.3)`)
  })

  selectButton3.addEventListener('change', (e) => {
    path3.transition()
      .duration(1000)
      .ease(d3.easeElasticOut)
      .attr('d', lineGen(monthlyData[e.target.value]))
      .attr('fill', `hsla(${e.target.value / 116 * 360}, 100%, 50%, 0.3)`)
  })
}

const data = await d3.csv('../data/india-weather-1901-2017.csv')
handleData(data)
