import React, { PropTypes } from 'react'
import ProgressBarComponent from './ProgressBarComponent'

export default class ProgressBarWContext extends React.Component {

  render () {
    const d = this.props.data
    if (!d.voteRating) {
      return <div className='badge badge-default d-block text-left pl-3 py-1'>
        N/A:&nbsp;
        no voting data from 189th sess.
      </div>
    } else if (d.recordedVotePercentage < 50) {
      return <div className='badge badge-default d-block text-left pl-3 py-1'>
        N/A:&nbsp;
        voted less than 50% of 189th sess.
      </div>
    } else if (d.recordedVotePercentage < 90) {
      return (<div>
        <ProgressBarComponent
          width={d.voteRating}
          animate={this.props.animate}
          key={d.id + 'prog-bar'}
          large={this.props.large}
        />
        <small style={{ lineHeight: 1.3, display: 'inline-block', marginTop : '.1rem' }}>
          *Missed several scored votes
        </small>
      </div>
      )
    } else {
      return (<div>
        <ProgressBarComponent
          width={d.voteRating}
          animate={this.props.animate}
          large={this.props.large}
          key={d.id + 'prog-bar'}
        />
      </div>)
    }
  }

}

ProgressBarWContext.propTypes = {
  data : PropTypes.object.isRequired,
  animate : PropTypes.bool,
  large : PropTypes.bool
}
