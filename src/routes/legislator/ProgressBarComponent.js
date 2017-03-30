import React, { PropTypes } from 'react'

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
        <div className={`progress-bar bg-primary ${this.props.large ? 'progress-bar--large' : ''}`}
          style={{ width: `${this.props.animate ? '0' : this.props.width}%` }}
          ref={(el) => this.bar = el}
           >
          <b>{this.props.width}%</b>&nbsp;&nbsp;progressive
        </div>
      </div>
    </div>)
  }
}

ProgressBar.propTypes = {
  width: PropTypes.number.isRequired,
  large: PropTypes.bool,
  animate: PropTypes.bool
}
