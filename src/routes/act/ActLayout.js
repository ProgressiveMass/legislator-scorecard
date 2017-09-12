import React, { PropTypes } from 'react'
import Tabs from 'react-responsive-tabs'

import LoadingComponent from '../legislator/LoadingViewComponent'
import ErrorViewComponent from '../legislator/ErrorViewComponent'
import ActMetadataComponent from './ActMetadataComponent'
import FilterableLegislatorList from './FilterableLegislatorListComponent'

import getFromScorecardBackend from '../../services/api/getFromScorecardBackend'

export default class ActLayout extends React.Component {

  constructor (props) {
    super(props)
    this.renderMetadataSection = this.renderMetadataSection.bind(this)
  }

  state = {
    apiData : undefined,
    error : false
  }

  componentDidMount () {
    const id = this.props.match.params.id
    getFromScorecardBackend(`/act/${id}`, this)
  }

  renderMetadataSection () {
    if (this.state.apiData.metadata.showPairedDisclaimer) {
      const tabItems = [
        {
          title: 'House Bill',
          component: (<ActMetadataComponent
            data={this.state.apiData.metadata}
            billNumberDisplay={this.state.apiData.metadata.houseNumber}
            title={this.state.apiData.metadata.houseTitle}
            description={this.state.apiData.metadata.houseDescription}
            houseUrl={this.state.apiData.metadata.houseUrl}
            senateUrl={null}
          />)
        },
        {
          title: 'Senate Bill',
          component: (<ActMetadataComponent
            data={this.state.apiData.metadata}
            billNumberDisplay={this.state.apiData.metadata.senateNumber}
            title={this.state.apiData.metadata.senateTitle}
            description={this.state.apiData.metadata.senateDescription}
            houseUrl={null}
            senateUrl={this.state.apiData.metadata.senateUrl}
          />)
        }
      ].map((t) => {
        return {
          title: t.title,
          getContent: () => t.component
        }
      })

      return (
        <div className='my-4 inverted-tabs'>
          <Tabs items={tabItems}
            showMore={false}
            transform={false}
          />
        </div>
      )
    } else {
      return (
        <ActMetadataComponent
          data={this.state.apiData.metadata}
          billNumberDisplay={this.state.apiData.metadata.combinedNumber}
          title={this.state.apiData.metadata.houseTitle || this.state.apiData.metadata.senateTitle}
          description={this.state.apiData.metadata.houseDescription || this.state.apiData.metadata.senateDescription}
          houseUrl={this.state.apiData.metadata.houseUrl}
          senateUrl={this.state.apiData.metadata.senateUrl}
        />
      )
    }
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
        {this.renderMetadataSection()}
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
