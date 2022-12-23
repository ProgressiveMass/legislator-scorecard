import React from 'react'
import PropTypes from 'prop-types'
import SponsorshipTable from './SponsorshipTable'
import VoteTable from './VoteTable'

const sponsorship = 'sponsorship'
const votes = 'votes'

export default class TermLayout extends React.Component {
  constructor(props) {
    super(props)
    // if no votes, set active to sponsorship
    const active =
      !props.data.votes || !props.data.votes.length ? sponsorship : votes
    this.state = {
      active,
    }
  }

  render() {
    const onTabClick = (active) => (e) => {
      e.preventDefault()
      this.setState({ active })
    }

    const hasSponsorship =
      this.props.data.sponsorship && this.props.data.sponsorship.length
    const sponsorshipTab = (
      <li className='nav-item'>
        <div
          role='link'
          className={`nav-link ${
            this.state.active === sponsorship ? 'active' : ''
          } ${!hasSponsorship ? 'disabled' : ''}`}
          href='#'
          aria-current={this.state.active === sponsorship ? 'page' : false}
          onClick={
            hasSponsorship
              ? onTabClick('sponsorship')
              : function (e) {
                  e.preventDefault()
                }
          }
          onKeyDown={
            hasSponsorship
              ? onTabClick('sponsorship')
              : function (e) {
                  e.preventDefault()
                }
          }
          disabled={!hasSponsorship}>
          Cosponsorship
        </div>
      </li>
    )
    const hasVotes = this.props.data.votes && this.props.data.votes.length
    const voteTab = (
      <li className='nav-item'>
        <div
          role='link'
          className={`nav-link ${this.state.active === votes ? 'active' : ''} ${
            !hasVotes ? 'disabled' : ''
          }`}
          aria-current={this.state.active === votes ? 'page' : false}
          href='#'
          onClick={
            hasVotes
              ? onTabClick('votes')
              : function (e) {
                  e.preventDefault()
                }
          }
          onKeyDown={
            hasVotes
              ? onTabClick('votes')
              : function (e) {
                  e.preventDefault()
                }
          }
          disabled={!hasVotes}>
          Voting Record
        </div>
      </li>
    )

    let BodyComponent

    if (this.state.active === sponsorship) {
      BodyComponent = (
        <SponsorshipTable
          data={this.props.data}
          lastName={this.props.lastName}
        />
      )
    } else if (this.state.active === votes) {
      BodyComponent = (
        <VoteTable data={this.props.data} lastName={this.props.lastName} />
      )
    }
    return (
      <div className='white-background mb-4'>
        <ul className='nav justify-content-center'>
          {sponsorshipTab}
          {voteTab}
        </ul>
        <div>{BodyComponent}</div>
      </div>
    )
  }
}

TermLayout.propTypes = {
  data: PropTypes.object.isRequired,
}
