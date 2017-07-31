import React, { PropTypes } from 'react'
import Tabs from 'react-responsive-tabs'

import LoadingComponent from '../legislator/LoadingViewComponent'
import ErrorViewComponent from '../legislator/ErrorViewComponent'
import ActMetadataComponent from './ActMetadataComponent'
import FilterableLegislatorList from './FilterableLegislatorListComponent'

import getFromScorecardBackend from '../../services/api/getFromScorecardBackend'

export default class ActLayout extends React.Component {

  state = {
    apiData : undefined,
    error : false
  }

  componentDidMount () {
    const id = this.props.match.params.id
    getFromScorecardBackend(`/act/${id}`, this)
  }

  render () {
    if (this.state.error) { return <ErrorViewComponent error={this.state.error} /> }
    if (!this.state.apiData) { return <LoadingComponent /> }
    const tabItems = [
      {
        title : 'Cosponsors',
        component : (<FilterableLegislatorList
          data={this.state.apiData.cosponsors}
        />)
      },
      {
        title : 'Not Yet Cosponsors',
        component : (<FilterableLegislatorList
          data={this.state.apiData.notYetCosponsors}
        />)
      }
    ].map((t) => {
      return {
        title: t.title,
        getContent: () => t.component
      }
    })

    return (
      <div className='tinted-background'>
        <ActMetadataComponent data={this.state.apiData.metadata} />
        <h1 className='text-center h2 mt-4 font-weight-light' style={{ marginBottom: '3rem' }}>
          Cosponsorship
        </h1>
        <div className='mt-4 inverted-tabs'>
          <Tabs items={tabItems}
            showMore={false}
            transform={false}
          />
        </div>
      </div>
    )
  }
}

ActLayout.propTypes = {
  match: PropTypes.object.isRequired
}
