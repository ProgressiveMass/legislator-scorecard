import React from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import ProgressBar from './ProgressBar'
import { BREAKPOINTS } from '../../utilities'

const ContextualProgressBar = ({ data: d, large, sessionNumber, utilizeGradeOnlyFlag }) => {
  const [gradeOnly, setGradeOnly] = React.useState(false)

  useEffect(() => {
    if (window.innerWidth > BREAKPOINTS.tablet) {
      setGradeOnly(false);
    } else if (window.innerWidth <= BREAKPOINTS.tablet) {
      setGradeOnly(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > BREAKPOINTS.tablet) {
        setGradeOnly(false);
      } else if (window.innerWidth <= BREAKPOINTS.tablet) {
        setGradeOnly(true);
      }
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  let noScoreClasses =
    'badge badge-secondary d-block text-center px-3 py-1 rounded progress-alternative'
  noScoreClasses = large ? noScoreClasses : noScoreClasses + ' progress small'
  if (!d.score) {
    const sessionClause = sessionNumber
      ? ' from ' + sessionNumber + ' sess.'
      : ''
    return (
      <div className={noScoreClasses}>
        N/A{gradeOnly ? '' : <>:&nbsp; {`no voting data${sessionClause}`}</>}
      </div>
    )
  } else if (d.score === 'n/a') {
    const sessionClause = sessionNumber
      ? ' for ' + sessionNumber + ' sess.'
      : ''
    return (
      <div className={noScoreClasses}>
        N/A{gradeOnly ? '' : <>:&nbsp; no rating available{sessionClause}</>}
      </div>
    )
  } else if (d.recordedVotePercentage < 90) {
    return (
      <div className={noScoreClasses}>
        N/A{gradeOnly ? '' : <>: missed at least 10% of scored votes</>}
      </div>
    )
  } else {
    return (
      <div>
        <ProgressBar
          width={d.score}
          large={large}
          key={d.id + 'prog-bar'}
          gradeOnly={utilizeGradeOnlyFlag ? gradeOnly : false}
        />
      </div>
    )
  }
}

ContextualProgressBar.propTypes = {
  data: PropTypes.object.isRequired,
  large: PropTypes.bool,
}

export default ContextualProgressBar
