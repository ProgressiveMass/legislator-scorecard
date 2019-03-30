import React from "react"
import PropTypes from "prop-types"
import ProgressBar from "./ProgressBar"

const ContextualProgressBar = ({ data: d }) => {
  if (!d.voteRating) {
    return (
      <div className="badge badge-default d-block text-left pl-3 py-1">
        N/A:&nbsp; no voting data from 190th sess.
      </div>
    )
  } else if (d.recordedVotePercentage < 50) {
    return (
      <div className="badge badge-default d-block text-left pl-3 py-1">
        N/A:&nbsp; voted less than 50% of 190th sess.
      </div>
    )
  } else if (d.voteRating === "n/a") {
    return (
      <div className="badge badge-default d-block text-left pl-3 py-1">
        N/A:&nbsp; no rating available for 190th sess.
      </div>
    )
  } else if (d.recordedVotePercentage < 90) {
    return (
      <div>
        <ProgressBar
          width={d.voteRating}
          animate={this.props.animate}
          key={d.id + "prog-bar"}
          large={this.props.large}
        />
        <small
          style={{
            lineHeight: 1.3,
            display: "inline-block",
            marginTop: ".1rem",
          }}
        >
          *Missing several scored votes
        </small>
      </div>
    )
  } else {
    return (
      <div>
        <ProgressBar
          width={d.voteRating}
          animate={this.props.animate}
          large={this.props.large}
          key={d.id + "prog-bar"}
        />
      </div>
    )
  }
}

ContextualProgressBar.propTypes = {
  data: PropTypes.object.isRequired,
  animate: PropTypes.bool,
  large: PropTypes.bool,
}

export default ContextualProgressBar
