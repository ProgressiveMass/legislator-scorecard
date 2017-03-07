import React, { PropTypes } from 'react'

export default class SenatorMetadataComponent extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (!this.props.metadata) return (<div>loading...</div>)

    const senator = this.props.metadata
    return (
      <div className='clearfix metadata' style={{ marginBottom : senator.newSenator ? '0' : '5rem' }}>
        <div className='float-sm-left mb-4'>
          <img src={senator.photo_url} alt='senator profile picture' />
        </div>
        <div>
          <a href={senator.urls[0]} target='_blank'>
            <h2>{senator.name} ({senator.party.slice(0, 1)})</h2>
          </a>
          <div className='lead mb-2'>
            {senator.district}
          </div>
          { senator.twitter
            ? <div className='text-lg mb-2'>
              <a href={'http://twitter.com/' + senator.twitter.split('@')[1]} target='_blank'>
                <i className='fa fa-fw fa-twitter' aria-hidden />&nbsp;
                <span className='sr-only'>Twitter:</span>
                {senator.twitter}
              </a>
            </div>
          : null}

        </div>
        <div className='text-lg'>
          <a href={senator.urls[0]} target='_blank'>
            <i className='fa fa-fw fa-user' aria-hidden />&nbsp;Official Profile & Contact Info
          </a>
        </div>
      </div>)
  }
}

SenatorMetadataComponent.propTypes = {
}
