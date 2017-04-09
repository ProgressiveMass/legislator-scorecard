import React, { PropTypes } from 'react'
import ProgressBarComponent from './ProgressBarComponent'

export default class ProgressBarWContext extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const d = this.props.data
    if (!d.voteRating) {
      return <div className='badge badge-default d-block p-1'>
        N/A:&nbsp;
        no voting data from 189th sess.
      </div>
    } else if (d.recordedVotePercentage < 50) {
      return <div className='badge badge-default d-block p-1'>
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
        <small>voted between 50-90% of 189th sess.</small>
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
  data : PropTypes.object.isRequired
}
