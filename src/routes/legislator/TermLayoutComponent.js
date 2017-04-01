import React, { PropTypes } from 'react'
import CosponsorshipTable from './CosponsorshipTableComponent'
import VoteTable from './VoteTableComponent'

const cosponsorship = 'cosponsorship'
const votes = 'votes'

export default class TermLayout extends React.Component {

  constructor (props) {
    super(props)
    // if no votes, set active to cosponsorship
    const active = (!props.data.votes || !props.data.votes.length)
    ? cosponsorship : votes
    this.state = {
      active
    }
  }

  render () {
    const onTabClick = (active) => (e) => {
      e.preventDefault()
      this.setState({ active })
    }

    const hasCosponsorship = this.props.data.cosponsorship && this.props.data.cosponsorship.length
    const cosponsorshipTab = (
      <li className='nav-item'>
        <a className={`nav-link ${this.state.active === cosponsorship ? 'active' : ''} ${!hasCosponsorship ? 'disabled' : ''}`}
          href='#'
          onClick={hasCosponsorship ? onTabClick('cosponsorship') : null}
          disabled={!hasCosponsorship}
        >
          Cosponsored Bills
        </a>
      </li>
    )

    const voteTab = (
      <li className='nav-item'>
        <a className={`nav-link ${this.state.active === votes ? 'active' : ''}`}
          href='#'
          onClick={onTabClick('votes')}
        >
          Voting Record
        </a>
      </li>
    )

    let BodyComponent

    if (this.state.active === cosponsorship) {
      BodyComponent = <CosponsorshipTable {...this.props}
                      />
    } else if (this.state.active === votes) {
      BodyComponent = <VoteTable {...this.props}
                      />
    }
    return (
      <div className='white-floated mb-4'>
        <ul className='nav justify-content-center'>
          { cosponsorshipTab }
          {voteTab}
        </ul>
        <div>
          {BodyComponent}
        </div>
      </div>
    )
  }
}

TermLayout.propTypes = {
  data : PropTypes.object.isRequired
}
