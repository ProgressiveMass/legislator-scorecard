import React from 'react'

import LoadingComponent from '../legislator/LoadingViewComponent'
import ErrorViewComponent from '../legislator/ErrorViewComponent'

import ActsGrid from './ActsGridComponent'

import getFromScorecardBackend from '../../services/api/getFromScorecardBackend'

export default class AllActsLayout extends React.Component {
  state = {
    apiData: undefined,
    error: false
  }

  componentDidMount () {
    getFromScorecardBackend('/acts', this)
  }

  render () {
    if (this.state.error) {
      return <ErrorViewComponent error={this.state.error} />
    }
    if (!this.state.apiData) {
      return <LoadingComponent />
    }

    return (
      <div className='tinted-background'>
        <div className='module-container'>
          <ActsGrid data={this.state.apiData} />
        </div>
      </div>
    )
  }
}
