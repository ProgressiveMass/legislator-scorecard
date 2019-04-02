import React from "react"
import PropTypes from "prop-types"
import CosponsorshipTable from "./CosponsorshipTableComponent"
import VoteTable from "./VoteTableComponent"

const cosponsorship = "sponsorship"
const votes = "votes"

export default class TermLayout extends React.Component {
  constructor(props) {
    super(props)
    // if no votes, set active to cosponsorship
    const active =
      !props.data.votes || !props.data.votes.length ? cosponsorship : votes
    this.state = {
      active,
    }
  }

  render() {
    const onTabClick = active => e => {
      e.preventDefault()
      this.setState({ active })
    }

    const hasCosponsorship =
      this.props.data.cosponsorship && this.props.data.cosponsorship.length
    const cosponsorshipTab = (
      <li className="nav-item">
        <a
          className={`nav-link ${
            this.state.active === cosponsorship ? "active" : ""
          } ${!hasCosponsorship ? "disabled" : ""}`}
          href="#"
          aria-current={this.state.active === cosponsorship ? "page" : false}
          onClick={
            hasCosponsorship
              ? onTabClick("cosponsorship")
              : function(e) {
                  e.preventDefault()
                }
          }
          disabled={!hasCosponsorship}
        >
          Cosponsored Bills
        </a>
      </li>
    )
    const hasVotes = this.props.data.votes && this.props.data.votes.length
    const voteTab = (
      <li className="nav-item">
        <a
          className={`nav-link ${this.state.active === votes ? "active" : ""} ${
            !hasVotes ? "disabled" : ""
          }`}
          aria-current={this.state.active === votes ? "page" : false}
          href="#"
          onClick={
            hasVotes
              ? onTabClick("votes")
              : function(e) {
                  e.preventDefault()
                }
          }
          disabled={!hasVotes}
        >
          Voting Record
        </a>
      </li>
    )

    let BodyComponent

    if (this.state.active === cosponsorship) {
      BodyComponent = <CosponsorshipTable {...this.props} />
    } else if (this.state.active === votes) {
      BodyComponent = <VoteTable {...this.props} />
    }
    return (
      <div className="white-floated mb-4">
        <ul className="nav justify-content-center">
          {cosponsorshipTab}
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
