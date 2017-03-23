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

  getLegislatorData (address) {
    let apiEndpoint
    if (process.env.NODE_ENV === 'production') {
      apiEndpoint = 'https://progressive-mass.herokuapp.com/local-legislators'
    } else {
      apiEndpoint = 'http://localhost:4000/local-legislators'
    }
    axios.get(apiEndpoint, {
      params : {
        address
      }
    })
  .then((response) => {
    this.setState({
      data : response.data
    })
  })
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
            Your Senator
          </a>
        </li>
        <li className='nav-item'>
          <a href='#'
            className={`nav-link ${this.state.activeTab === 'lower' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); this.setState({ activeTab : 'lower' }) }}>

            Your House Rep
          </a>
        </li>
      </ul>
      <LegislatorPageComponent
        data={legislatorData.data}
        legislator={legislatorData.legislator}
        chamber={this.state.activeTab}
        rating={legislatorData.rating}
      />
    </div>)
  }
}

ResultsLayoutComponent.propTypes = {
  match : PropTypes.object.isRequired
}
