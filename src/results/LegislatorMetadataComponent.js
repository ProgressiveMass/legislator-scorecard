import React, { PropTypes } from 'react'

export default class SenatorMetadataComponent extends React.Component {

  render () {
    if (!this.props.data) return (<div>loading...</div>)

    const twitter = this.props.data.twitter === 'none' ? null : this.props.data.twitter

    return (
      <div className='clearfix metadata' key={this.props.data.url}>
        {
          this.props.data.photo_url ? (<div className='float-sm-left mb-4'>
            <img src={this.props.data.photo_url} alt='senator profile picture' />
          </div>) : null
        }

        <div>
          <h2>{this.props.data.full_name} ({this.props.data.party.slice(0, 1)})</h2>

          <div className='lead mb-2 text-uppercase'>
            {this.props.data.district}
          </div>
          { twitter
            ? <div className='text-lg mb-2'>
              <a href={'http://twitter.com/' + twitter.split('@')[1]} target='_blank'>
                <i className='fa fa-fw fa-twitter' aria-hidden />&nbsp;
                <span className='sr-only'>Twitter:</span>
                {twitter}
              </a>
            </div>
          : null}

        </div>
        { this.props.data.url
          ? <div className='text-lg'>
            <a href={this.props.data.url} target='_blank'>
              Official Profile & Contact Info
            </a>
          </div>
        : null }

      </div>)
  }
}

SenatorMetadataComponent.propTypes = {
  data : PropTypes.object.isRequired
}
