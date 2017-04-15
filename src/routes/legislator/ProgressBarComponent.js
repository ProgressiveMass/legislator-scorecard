import React, { PropTypes } from 'react'

function getLetterGrade (score) {
  const letterMap = {
    '6' : 'D',
    '7' : 'C',
    '8' : 'B',
    '9' : 'A'
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

export default class ProgressBar extends React.Component {

  componentDidMount () {
    if (this.props.animate) {
      setTimeout(() => {
        this.bar.style.width = this.props.width + '%'
      }, 1)
    }
  }

  render () {
    return (<div>
      <div className='progress'>
        <div className='progress__text-container'>
          <b>{getLetterGrade(this.props.width)}</b>&nbsp;&nbsp;
          <span style={{ opacity : 0.68, fontSize : '.85rem', position : 'relative', top: '-2px' }}>
            ({this.props.width + '%'})
          </span>
        </div>

        <div className={`progress-bar bg-primary ${this.props.large ? 'progress-bar--large' : ''}`}
          style={{ width: `${this.props.animate ? '0' : this.props.width}%` }}
          ref={(el) => this.bar = el}
        />
      </div>

    </div>)
  }
}

ProgressBar.propTypes = {
  width: PropTypes.number.isRequired,
  large: PropTypes.bool,
  animate: PropTypes.bool
}
