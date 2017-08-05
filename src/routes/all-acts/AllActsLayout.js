import React from 'react'

import LoadingComponent from '../legislator/LoadingViewComponent'
import ErrorViewComponent from '../legislator/ErrorViewComponent'

import ActsTable from './ActsTableComponent'

import getFromScorecardBackend from '../../services/api/getFromScorecardBackend'

export default class AllActsLayout extends React.Component {

  state = {
    apiData : undefined,
    error : false
  }

  componentDidMount () {
    getFromScorecardBackend('/acts', this)
  }

  render () {
    if (this.state.error) { return <ErrorViewComponent error={this.state.error} /> }
    if (!this.state.apiData) { return <LoadingComponent /> }

    return (
      <div className='tinted-background'>
        <h1 className='text-center h2 mt-4 font-weight-light' style={{ marginBottom: '3rem' }}>
          Progressive Mass Legislative Agenda
        </h1>
        <div className='module-container module-container--full-width-on-small'>
          <div className='metadata'>
            <ActsTable data={this.state.apiData} />
          </div>
        </div>
      </div>
    )
  }
}
