import React, { PropTypes } from 'react'
import uri from 'urijs'

import voteInfo from './2015senate_votes.json'
import billInfo from './2015senate_bills.json'

import SenatorMetadataComponent from './SenatorMetadataComponent'
import VoteTableComponent from './VoteTableComponent'
import ProgressComponent from './ProgressComponent'
import NewSenatorMessageComponent from './NewSenatorMessageComponent'

import { keys } from 'lodash'

export default class ResultsLayoutComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      metadata : undefined,
      votes : undefined
    }

    this.findSenatorByDistrict = this.findSenatorByDistrict.bind(this)
    this.renderNewSenatorComponent = this.renderNewSenatorComponent.bind(this)
  }

  getSummaryRanking (voteInfo) {
    const districtVals = Object.values(voteInfo)
    return parseInt(districtVals.map((v) => {
      return parseInt(v['2015-2016'].voteRating.replace('%', ''))
    }).reduce((a, b) => a + b) / districtVals.length)
  }

  findSenatorByDistrict (district) {
    const simplifyDistrict = (district) => {
      return district
      .replace(/\band\b/g, '')
      .replace(/\W/g, '')
      .replace(/District/g, '')
    }

    const metadata = voteInfo[district]
    const metadata2015 = Object.assign(
    { district },
    metadata.senators[metadata['2015-2016'].senator],
    metadata['2015-2016']
  )

    const metadata2017 = Object.assign(
    { district },
    metadata.senators[metadata['2017-2018'].senator],
    metadata['2017-2018'])

      // get a nice array of data about senator's votes and
      // general vote descriptions
    const votes = metadata['2015-2016'].votes.map((v) => {
      const voteId = Object.keys(v)[0]
      const dataForThisBill = billInfo[voteId]
      return {
        ...dataForThisBill,
        senatorVote : v[voteId]
      }
    })

    this.setState({
      metadata2015,
      metadata2017,
      votes,
      voteSummary : this.getSummaryRanking(voteInfo)
    })
  }

  componentDidMount () {
    const district = this.props.match.params.district
    // sets state with proper values for this senator
    this.findSenatorByDistrict(district)
  }

  renderNewSenatorComponent () {
    return (
      <div className='blue-floated'>
        <SenatorMetadataComponent
          metadata={this.state.metadata2017}
          newSenator
        />
        <NewSenatorMessageComponent />
      </div>
    )
  }

  render () {
    if (!this.state.metadata2015) { return (<div>loading...</div>) }

    const newSenator = (this.state.metadata2015.senator !== this.state.metadata2017.senator)

    return (<div className='senator-page'>

      { newSenator ? this.renderNewSenatorComponent() : null}

      <div className='blue-floated'>
        <SenatorMetadataComponent metadata={this.state.metadata2015} />
        <VoteTableComponent
          voteRating={this.state.metadata2015.voteRating}
          votes={this.state.votes}
          voteSummary={this.state.voteSummary}
          lastName={this.state.metadata2015.senator.split(',')[0]}
        />
      </div>
    </div>)
  }
}

ResultsLayoutComponent.propTypes = {
}
