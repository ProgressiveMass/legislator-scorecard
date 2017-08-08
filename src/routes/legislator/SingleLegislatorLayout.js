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
    legislatorData : undefined,
    error : false
  }

  getLegislatorData (id) {
    let apiEndpoint
    if (process.env.REACT_APP_ENV === 'test') {
      apiEndpoint = 'https://progressive-mass-test.herokuapp.com/legislator'
    } else if (process.env.NODE_ENV === 'production') {
      apiEndpoint = 'https://progressive-mass.herokuapp.com/legislator'
    } else {
      apiEndpoint = 'http://localhost:4000/legislator'
    }
    axios.get(apiEndpoint, {
      params : {
        id
      }
    })
  .then((response) => {
    this.setState({
      legislatorData : response.data
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
    const id = this.props.match.params.id
    // sets state with proper values for this senator
    this.getLegislatorData(id)
  }

  render () {
    if (this.state.error) { return <ErrorViewComponent error={this.state.error} /> }
    if (!this.state.legislatorData) { return <LoadingComponent /> }

    return (
      <LegislatorPageComponent
        data={this.state.legislatorData}
        legislator={this.state.legislatorData.legislator}
        chamber={this.state.legislatorData.legislator.chamber}
        rating={this.state.legislatorData.rating}
        />
    )
  }
}

ResultsLayoutComponent.propTypes = {
  match : PropTypes.object.isRequired
}
