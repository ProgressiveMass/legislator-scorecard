import React, { PropTypes } from 'react'
import InfoPopover from './../../general-components/InfoPopover'
import tagMap from '../all-acts/tagMap'

const ActMetadataComponent = props => {
  let containerClass, marginClass

  if (props.data.showPairedDisclaimer) {
    containerClass = ''
    marginClass = 'mt-0'
  } else {
    containerClass = 'module-container'
    marginClass = ''
  }

  const tags = props.data.tags.map(t => {
    return (
      <img src={require(`../../img/platform_logos/${tagMap[t].logo}`)}
        alt={t}
        className='mr-1'
        style={{ width: '60px', maxHeight: '60px' }}
      />
    )
  })
  return (
    <div className={`${containerClass} module-container--full-width-on-small`}>
      <div className={`metadata heading-font ${marginClass}`}>
        <div>
          <div>
            {tags}
          </div>
          <div className='label text-muted font-weight-bold mb-md-1 text-lg'>
            {props.billNumberDisplay}&nbsp;
            {props.data.showPairedDisclaimer
              ? <InfoPopover text='This bill has two distinct versions in the House and Senate, but for the purposes of tracking cosponsorship we treat them as a single bill.' />
              : null}
          </div>
          {props.data.hasPassed
            ? <h3 className='text-primary'>PASSED&#10004;</h3>
            : null}
          <h1 className='h3 mt-2'>
            {props.title}
          </h1>
          <div className='my-3'>
            {props.houseUrl &&
              <a href={props.houseUrl} target='_blank'>
                House Bill
              </a>}{' '}
            {props.houseUrl && props.senateUrl ? '|' : null }{' '}
            {props.senateUrl &&
              <a href={props.senateUrl} target='_blank'>
                Senate Bill
              </a>}
          </div>
          <div style={{ maxWidth: '720px' }}>
            {props.description}
          </div>
        </div>
      </div>
    </div>
  )
}

ActMetadataComponent.propTypes = {
  data: PropTypes.object.isRequired,
  billNumberDisplay: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  houseUrl: PropTypes.string,
  senateUrl: PropTypes.string
}

export default ActMetadataComponent
