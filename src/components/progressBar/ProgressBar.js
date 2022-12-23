import React from 'react'
import PropTypes from 'prop-types'

function getLetterGrade(score) {
  const letterMap = {
    6: 'D',
    7: 'C',
    8: 'B',
    9: 'A',
  }
  const getSymbol = (num) => {
    if (num < 4) {
      return '-'
    } else if (num > 7) {
      return '+'
    } else {
      return ' '
    }
  }
  const num1 = (score + '').slice(0, 1)
  const num2 = (score + '').slice(1)
  if (score === 100) {
    return 'A+'
  } else if (score < 60) {
    return 'F'
  } else {
    return letterMap[num1] + getSymbol(num2)
  }
}

const ProgressBar = ({ width, large }) => {
  return (
    <div>
      <div className={`progress ${large ? 'progress--large' : ''}`}>
        <div className='progress__text-container'>
          <span
            style={{
              fontSize: '.85rem',
              position: 'relative',
            }}>
            <b>{getLetterGrade(width)}</b>&nbsp;&nbsp; ({width + '%'})
          </span>
        </div>

        <div
          className='progress-bar bg-primary'
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  width: PropTypes.number.isRequired,
  large: PropTypes.bool,
}

export default ProgressBar
