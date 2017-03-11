import React, { PropTypes } from 'react'
import { withRouter } from 'react-router-dom'

import * as d3 from 'd3'

import mapData from './simplified_mass_geo.json'
import voteData from './../results/2015senate_votes'

class SearchMapComponent extends React.Component {

  renderMap  = () => {

    const push = this.props.history.push

    const width = 960
    const height = 600
    const svg = d3.select(this.refs.svg)

    const progressivePercents = Object
    .values(voteData)
    .map((v)=>parseInt(v['2015-2016'].voteRating.replace('%', '')))

    const colorScale = d3.scaleLinear()
    .domain([d3.min(progressivePercents), d3.max(progressivePercents)])
    .range(['#d5d5d5', '#0275d8'])

    const map = svg.append('g').attr('class', 'map')

    const zoom = d3.zoom()
    .scaleExtent([1, 5])
    .on("zoom", ()=>{
      map.attr("transform", d3.event.transform);
    })

    svg.call(zoom)

    // https://github.com/veltman/d3-stateplane
    const projection = d3.geoConicConformal()
    .parallels([41 + 43 / 60, 42 + 41 / 60])
    .rotate([71 + 30 / 60, -41])
    .scale(13000)
    .translate([width/1.9, height/1.1 ])

    map.selectAll('path')
      .data(mapData.features)
      .enter()
      .append('path')
      .classed('district', true)
      .attr('d', d3.geoPath().projection(projection))
      .style('fill', (d)=>{
        try {
          let progressivePercent = voteData[d.properties.SEN_DIST]['2015-2016'].voteRating
          progressivePercent = parseInt(progressivePercent.replace('%', ''))
          return colorScale(progressivePercent)
        } catch (e) {
          console.log(e)
        }
      })
      .on('click', (d)=>{
        push(`/senator/${d.properties.SEN_DIST}`)
      })
  }

  componentDidMount () {
    this.renderMap()
  }

  render () {
    return (<div >
      <h2 className="h5">Click on a district to learn more about the senator's votes.</h2>
      <div>
        <div className='swatch swatch--less-progressive'></div>
        less progressive
        <div className='swatch swatch--more-progressive'></div>
        more progressive
      </div>
      <div className='svg-container'>
        <svg ref='svg' viewBox="0 0 960 500" preserveAspectRatio="xMinYMin meet"/>
      </div>
    </div>)
  }
}

export default withRouter(SearchMapComponent)

SearchMapComponent.propTypes = {
}
