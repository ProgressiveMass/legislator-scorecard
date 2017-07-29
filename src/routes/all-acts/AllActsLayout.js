import React from 'react'
import axios from 'axios'

import LoadingComponent from '../legislator/LoadingViewComponent'
import ErrorViewComponent from '../legislator/ErrorViewComponent'

import ActsTable from './ActsTableComponent'

export default class AllActsLayout extends React.Component {
  constructor (props) {
    super(props)
    this.getAllActsData = this.getAllActsData.bind(this)
  }

  state = {
    actsData : undefined,
    error : false
  }

  getAllActsData () {
    let apiEndpoint
    if (process.env.NODE_ENV === 'production') {
      apiEndpoint = 'https://progressive-mass.herokuapp.com/acts'
    } else {
      apiEndpoint = 'http://localhost:4000/acts'
    }

    axios.get(apiEndpoint)
      .then((response) => {
        this.setState({
          actsData : response.data
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
    this.getAllActsData()
  }

  render () {
    if (this.state.error) { return <ErrorViewComponent error={this.state.error} /> }
    if (!this.state.actsData) { return <LoadingComponent /> }

    return (
      <div className='tinted-background'>
        <h1 className='text-center h2 mt-4 font-weight-light' style={{ marginBottom: '3rem' }}>
          Progressive Mass Tracked Legislation
        </h1>
        <div className='module-container module-container--full-width-on-small'>
          <div className='metadata'>
            <ActsTable data={this.state.actsData} />
          </div>
        </div>
      </div>
    )
  }
}
