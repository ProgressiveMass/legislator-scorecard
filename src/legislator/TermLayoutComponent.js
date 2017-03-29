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
    const cosponsorshipTab = (
      <li className='nav-item'>
        <a className={`nav-link ${this.state.active === cosponsorship ? 'active' : ''}`}
          href='#'
          onClick={onTabClick('cosponsorship')}
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
      <div className='white-floated'>
        <ul className='nav justify-content-center'>
          {this.props.data.cosponsorship && this.props.data.cosponsorship.length
            ? cosponsorshipTab : null
          }
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
}
