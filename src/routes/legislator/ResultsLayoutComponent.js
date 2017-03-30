import React, { PropTypes } from 'react'
import Tabs from 'react-responsive-tabs'
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
    error : false
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
    if (this.state.error) { return <ErrorViewComponent error={this.state.error} /> }
    if (!this.state.data) { return <LoadingComponent /> }

    const tabItems = [
      {
        title : 'Your House Rep',
        component : (
          <LegislatorPageComponent
            data={this.state.data.lower}
            legislator={this.state.data.lower.legislator}
            chamber='lower'
            rating={this.state.data.lower.rating}
            />)
      },
      {
        title : 'Your Senator',
        component : (
          <LegislatorPageComponent
            data={this.state.data.upper}
            legislator={this.state.data.upper.legislator}
            chamber='upper'
            rating={this.state.data.upper.rating}
          />)
      }
    ]
    .map((t) => {
      return {
        title: t.title,
        getContent: () => t.component
      }
    })

    return (
      <div className='mt-5'>
        <Tabs items={tabItems}
          showMore={false}
          transform={false}
        />
      </div>
    )
  }
}

ResultsLayoutComponent.propTypes = {
  match : PropTypes.object.isRequired
}
