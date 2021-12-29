import './App.css'
import BarChart from './BarChart'
import { useState, useEffect } from 'react'
import * as d3 from 'd3'

function App() {
  const [data, setData] = useState([])

  const row = d => {
    d.population = +d.population
    return d
  }

  useEffect(() => {
    // Use '/data/cities.csv' for same city data as other tutorial pages. Works in prod, but not dev (vite can't see outside react app folder)
    // './cities' works in prod and dev, but uses a copy of cities.csv; if original file changes, this one needs to be updated manually
    d3.csv('./cities.csv', row).then(data => {
      data.sort((a, b) => {
        return (a.country > b.country) ? 1 : (a.country < b.country) ? -1 : 0
      })
      setData(data)
    })
  }, [])

  return (
    <div className="App">
      <BarChart data={data} />
    </div>
  )
}

export default App
