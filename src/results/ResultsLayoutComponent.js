import React, { PropTypes } from 'react'
import axios from 'axios'

import voteInfo from './2015senate_votes.json'
import billInfo from './2015senate_bills.json'

import SenatorMetadataComponent from './SenatorMetadataComponent'
import VoteTableComponent from './VoteTableComponent'
import ProgressComponent from './ProgressComponent'

import { keys } from 'lodash'

export default class ResultsLayoutComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      metadata : undefined,
      votes : undefined
    }

    this.findSenatorByDistrict = this.findSenatorByDistrict.bind(this)
  }

  getSummaryRanking (voteInfo) {
    return parseInt(voteInfo.map((v) => {
      return parseInt(v.voteRating.replace('%', ''))
    }).reduce((a, b) => a + b) / voteInfo.length)
  }

  findSenatorByDistrict () {
    const simplifyDistrict = (district) => {
      return district
      .replace(/\band\b/g, '')
      .replace(/\W/g, '')
      .replace(/District/g, '')
    }
    axios.get('https://api.geocod.io/v1/geocode', {
      params: {
        api_key: '8f05bb78fef066b587eb78e855b015b4b66e508',
        q : this.props.location.query.address,
        fields : 'stateleg'
      }
    })
    .then((response) => {
      debugger
      return response.data.results[0].fields.state_legislative_districts.senate.name
    })
    .then((district) => {
      let metadata = voteInfo.filter((v) => {
        return simplifyDistrict(v.district) === simplifyDistrict(district)
      })[0]

      // get a nice array of data about senator's votes and
      // general vote descriptions
      const votes = metadata.votes.map((v) => {
        const voteId = Object.keys(v)[0]
        const dataForThisBill = billInfo[voteId]
        return {
          ...dataForThisBill,
          senatorVote : v[voteId]
        }
      })

      this.setState({
        metadata : metadata,
        votes : votes,
        voteSummary : this.getSummaryRanking(voteInfo)
      })
    })
  }

  componentDidMount () {
    const handleResponse = (response) => {
      // get data from response
      if (response.data.officials.length < 3) {
        // Google didn't return senator info b/c it
        // doesn't have it for some addresses D: D: D:
        this.findSenatorByDistrict()
        return
      }
      const googleSenatorInfo = response.data.officials[2]
      // add twitter if it's there (overrides progressive Mass's version)
      if (googleSenatorInfo.channels && googleSenatorInfo.channels.filter((c) => (c.type === 'Twitter'))[0]) {
        googleSenatorInfo.twitter = '@' + googleSenatorInfo.channels.filter((c) => (c.type === 'Twitter'))[0].id
      }
      // find senator in progressive mass votes data
      let nameKey = googleSenatorInfo.name.split(' ')
      // our data has senator names in the form lastname, firstname (no middle initial)
      nameKey = nameKey[nameKey.length - 1] + ', ' + nameKey[0]

      let massProgSenatorInfo = voteInfo.filter((v) => {
        return v.name === nameKey
      })[0]
      if (!massProgSenatorInfo) {
        // ========================================================
        //  probably a newly-elected senator, so just add what we have
        //  and make a note of it so we can render an apology since
        //  we don't have votes
        // ========================================================
        googleSenatorInfo.newSenator = true
        googleSenatorInfo.district = response.data.offices[1].name
        // google image url is broken so let's make one that should work instead
        const govID = googleSenatorInfo.urls[0].split('/')[ googleSenatorInfo.urls[0].split('/').length - 1]
        googleSenatorInfo.photo_url = `https://malegislature.gov/Legislators/Profile/170/${govID}.jpg`
        googleSenatorInfo.district = googleSenatorInfo.district.replace('MA State Senate District', '')
        this.setState({
          metadata: googleSenatorInfo,
          votes : [],
          voteSummary : this.getSummaryRanking(voteInfo)
        })
        return
      }

      // create votes and metadata to pass down
      // join data from Google and data from progressive massachussetts
      const metadata = Object.assign({}, googleSenatorInfo, massProgSenatorInfo)

      // google image url is broken so let's make one that should work instead
      const govID = googleSenatorInfo.urls[0].split('/')[ googleSenatorInfo.urls[0].split('/').length - 1]
      metadata.photo_url = `https://malegislature.gov/Legislators/Profile/170/${govID}.jpg`

      // get a nice array of data about senator's votes and
      // general vote descriptions
      const votes = metadata.votes.map((v) => {
        const voteId = Object.keys(v)[0]
        const dataForThisBill = billInfo[voteId]
        return {
          ...dataForThisBill,
          senatorVote : v[voteId]
        }
      })

      this.setState({
        metadata : metadata,
        votes : votes,
        voteSummary : this.getSummaryRanking(voteInfo)
      })
    }

    axios.get('https://www.googleapis.com/civicinfo/v2/representatives', {
      params: {
        key: 'AIzaSyAXk0apdH-wT0XbspGc3nyE6dLpt887Nm0',
        address: this.props.location.query.address,
        roles: 'legislatorUpperBody'
      }
    })
   .then(handleResponse)
   .catch(function (error) {
     console.log(error)
   })
  }

  render () {
    if (!this.state.metadata) { return (<div>loading...</div>) }

    return (<div className='senator-page'>

      <div className='blue-floated'>
        <SenatorMetadataComponent metadata={this.state.metadata} />
        <VoteTableComponent
          newSenator={this.state.metadata.newSenator}
          voteRating={this.state.metadata.voteRating}
          votes={this.state.votes}
          voteSummary={this.state.voteSummary}
          lastName={this.state.metadata.name.split(',')[0]}
        />
      </div>
    </div>)
  }
}

ResultsLayoutComponent.propTypes = {
}
