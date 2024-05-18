import React from 'react'
import PropTypes from 'prop-types'
import ProgressBar from './ProgressBar'

const ContextualProgressBar = ({ data: d, large, sessionNumber }) => {
  let noScoreClasses =
    'badge badge-secondary d-block text-center pl-3 py-1 rounded progress-alternative'
  noScoreClasses = large ? noScoreClasses : noScoreClasses + ' progress small'
  if (!d.score) {
    const sessionClause = sessionNumber
      ? ' from ' + sessionNumber + ' sess.'
      : ''
    return (
      <div className={noScoreClasses}>
        N/A:&nbsp; no voting data{sessionClause}
      </div>
    )
  } else if (d.score === 'n/a') {
    const sessionClause = sessionNumber
      ? ' for ' + sessionNumber + ' sess.'
      : ''
    return (
      <div className={noScoreClasses}>
        N/A:&nbsp; no rating available{sessionClause}
      </div>
    )
  } else if (d.recordedVotePercentage < 90) {
    return (
      <div className={noScoreClasses}>
        N/A: missed at least 10% of scored votes
      </div>
    )
  } else {
    return (
      <div>
        <ProgressBar width={d.score} large={large} key={d.id + 'prog-bar'} />
      </div>
    )
  }
}

ContextualProgressBar.propTypes = {
  data: PropTypes.object.isRequired,
  large: PropTypes.bool,
}

export default ContextualProgressBar
