import React, { PropTypes } from 'react'

import axios from 'axios'
import LegislatorPageComponent from './LegislatorPageComponent'
import TestData from './test_data.json'

export default class ResultsLayoutComponent extends React.Component {
  constructor (props) {
    super(props)

    this.getLegislatorData = this.getLegislatorData.bind(this)
  }

  state = {
    data : undefined,
    activeTab : 'upper'
  }

  getSummaryRanking (voteInfo) {
    const districtVals = Object.values(voteInfo)
    return parseInt(districtVals.map((v) => {
      return parseInt(v['2015-2016'].voteRating.replace('%', ''))
    }).reduce((a, b) => a + b) / districtVals.length)
  }

  getLegislatorData (address) {
    this.setState({
      data : TestData
    })
    return
  //   let apiEndpoint
  //   if (process.env.NODE_ENV === 'production') {
  //     apiEndpoint = 'foo'
  //   } else {
  //     apiEndpoint = 'http://localhost:4000/local-legislators'
  //   }
  //   axios.get(apiEndpoint, {
  //     params : {
  //       address
  //     }
  //   })
  // .then((response) => {
  //   this.setState({
  //     data : response.data
  //   })
  // })
  }

  componentDidMount () {
    const address = this.props.match.params.address
    // sets state with proper values for this senator
    this.getLegislatorData(address)
  }

  render () {
    if (!this.state.data) { return (<div>loading...</div>) }

    const legislatorData = this.state.activeTab === 'upper'
    ? this.state.data.upper
    : this.state.data.lower

    return (<div className=''>
      <ul className='nav nav-pills nav-justified'>
        <li className='nav-item'>
          <a href='#'
            className={`nav-link ${this.state.activeTab === 'upper' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); this.setState({ activeTab : 'upper' }) }}
          >
            <div className='text-uppercase'>Your Senator</div>
          </a>
        </li>
        <li className='nav-item'>
          <a href='#'
            className={`nav-link ${this.state.activeTab === 'lower' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); this.setState({ activeTab : 'lower' }) }}
          >
            <div className='text-uppercase'>Your House Rep</div>
          </a>
        </li>
      </ul>
      <LegislatorPageComponent
        data={legislatorData.data}
        legislator={legislatorData.legislator}
        chamber={this.state.activeTab}
      />
    </div>)
  }
}

ResultsLayoutComponent.propTypes = {
  match : PropTypes.object.isRequired
}
