import React, { PropTypes } from 'react'

export default class SenatorMetadataComponent extends React.Component {

  render () {
    if (!this.props.metadata) return (<div>loading...</div>)

    const senator = this.props.metadata

    const twitter = senator.twitter === 'none' ? null : senator.twitter

    // dynamic margin bottom based on whether there's an image/whether there's
    // a progress component
    let marginBottom
    if (!this.props.newSenator && !senator.photo_url) {
      marginBottom = '6.5rem'
    } else if (!this.props.newSenator) {
      marginBottom = '5rem'
    } else if (this.props.newSenator) {
      marginBottom = '0'
    }

    return (
      <div className='clearfix metadata'
        style={{ marginBottom : marginBottom }}
      >
        {
          senator.photo_url ? (<div className='float-sm-left mb-4'>
            <img src={senator.photo_url} alt='senator profile picture' />
          </div>) : null
        }

        <div>{
          senator.url ? <a href={senator.url} target='_blank'>
            <h2>{senator.senator} ({senator.party.slice(0, 1)})</h2>
          </a> : <h2>{senator.senator} ({senator.party.slice(0, 1)})</h2>
        }
          <div className='lead mb-2'>
            {senator.district}
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
        { senator.url
          ? <div className='text-lg'>
            <a href={senator.url} target='_blank'>
              <i className='fa fa-fw fa-user' aria-hidden />&nbsp;Official Profile & Contact Info
            </a>
          </div>
        : null }

      </div>)
  }
}

SenatorMetadataComponent.propTypes = {
  newSenator : PropTypes.bool.isRequired,
  metadata : PropTypes.object.isRequired
}
