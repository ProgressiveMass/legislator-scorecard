import React from 'react'
import PropTypes from 'prop-types'
import SponsorshipTable from './SponsorshipTable'
import VoteTable from './VoteTable'

const sponsorship = 'sponsorship'
const votes = 'votes'

const TermLayout = (props) => {
  // if no votes, set active to sponsorship
  const [active, setActive] = React.useState(
    !props.data.votes || !props.data.votes.length ? sponsorship : votes
  )
  const hasSponsorship = props.data.sponsorship && props.data.sponsorship.length
  const hasVotes = props.data.votes && props.data.votes.length

  const onTabClick = (activeTab) => (e) => {
    if (activeTab === 'sponsorship' && hasSponsorship) {
      setActive(activeTab)
    } else if (activeTab === 'votes' && hasVotes) {
      setActive(activeTab)
    }
    e.preventDefault()
  }

  const sponsorshipTab = (
    <li className='nav-item'>
      <div
        role='link'
        className={`nav-link ${active === sponsorship ? 'active' : ''} ${
          !hasSponsorship ? 'disabled' : ''
        }`}
        href='#'
        aria-current={active === sponsorship ? 'page' : false}
        onClick={onTabClick('sponsorship')}
        onKeyDown={onTabClick('sponsorship')}
        disabled={!hasSponsorship}>
        Cosponsorship
      </div>
    </li>
  )

  const voteTab = (
    <li className='nav-item'>
      <div
        role='link'
        className={`nav-link ${active === votes ? 'active' : ''} ${
          !hasVotes ? 'disabled' : ''
        }`}
        aria-current={active === votes ? 'page' : false}
        href='#'
        onClick={onTabClick('votes')}
        onKeyDown={onTabClick('votes')}
        disabled={!hasVotes}>
        Voting Record
      </div>
    </li>
  )

  let BodyComponent

  if (active === sponsorship) {
    BodyComponent = (
      <SponsorshipTable data={props.data} lastName={props.lastName} />
    )
  } else if (active === votes) {
    BodyComponent = <VoteTable data={props.data} lastName={props.lastName} />
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

export default TermLayout

TermLayout.propTypes = {
  data: PropTypes.object.isRequired,
}
