import React from 'react'
import PropTypes from 'prop-types'
import ProgressBar from './ProgressBar'

const ContextualProgressBar = ({ data: d, animate, large }) => {
  if (!d.score) {
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
  } else if (d.score === 'n/a') {
    return (
      <div className="badge badge-default d-block text-left pl-3 py-1">
        N/A:&nbsp; no rating available for 190th sess.
      </div>
    )
  } else if (d.recordedVotePercentage < 90) {
    return (
      <div>
        <ProgressBar
          width={d.score}
          animate={animate}
          key={d.id + 'prog-bar'}
          large={large}
        />
        <small
          style={{
            lineHeight: 1.3,
            display: 'inline-block',
            marginTop: '.1rem',
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
          width={d.score}
          animate={animate}
          large={large}
          key={d.id + 'prog-bar'}
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
