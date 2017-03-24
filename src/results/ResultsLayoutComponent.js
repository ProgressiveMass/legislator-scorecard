import React, { PropTypes } from 'react'

import axios from 'axios'
import LegislatorPageComponent from './LegislatorPageComponent'
import LoadingComponent from './LoadingViewComponent'
import ErrorViewComponent from './ErrorViewComponent'

export default class ResultsLayoutComponent extends React.Component {
  constructor (props) {
    super(props)
    this.getLegislatorData = this.getLegislatorData.bind(this)
  }

  state = {
    data : undefined,
    error : false,
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
  }, (error) => {
    if (error.response) {
      this.setState({ error : error.response.data, data : {} })
    } else {
      this.setState({ error : error.message, data : {} })
    }
    console.log(error.message)
  })
  }

  componentDidMount () {
    const address = this.props.match.params.address
    // sets state with proper values for this senator
    this.getLegislatorData(address)
  }

  render () {
    if (!this.state.data) { return <LoadingComponent /> }

    if (this.state.error) { return <ErrorViewComponent error={this.state.error} /> }

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
