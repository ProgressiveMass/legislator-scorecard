import React, { PropTypes } from 'react'
import InfoPopover from './../../general-components/InfoPopover'

export default class ActMetadataComponent extends React.Component {

  render () {
    return (
      <div className='module-container module-container--full-width-on-small'>
        <div className='metadata heading-font'>
          <div className='row no-gutters align-items-md-center'>
            <div className='col-md-6'>
              <div className='label' style={{ fontSize : '1.1rem' }}>
                {this.props.billNumberDisplay}&nbsp;
                {this.props.data.showPairedDisclaimer
                  ? <InfoPopover
                    text='This bill has two distinct versions in the House and Senate, but for the purposes of tracking cosponsorship we treat them as a single bill.'
                    /> : null}
              </div>
              <div className='d-flex align-items-md-center flex-column flex-md-row'>
                <div className='pb-4 py-md-0'>
                  <img src={require('./../../img/progressive-mass-logo.png')}
                    alt='Progressive Massachusetts'
                    className='legislator-portrait'
                  />
                </div>
                <div>
                  <div className='text-lg mb-2' style={{ position: 'relative', top: '.2rem' }}>
                    {this.props.title}
                  </div>
                  {this.props.houseUrl &&
                    <div style={{ fontSize: '1.2rem' }}>
                      <a href={this.props.houseUrl} target='_blank'>
                        Official House Bill Profile
                      </a>
                    </div>
                  }
                  {this.props.senateUrl &&
                    <div style={{ fontSize: '1.2rem' }}>
                      <a href={this.props.senateUrl} target='_blank'>
                        Official Senate Bill Profile
                      </a>
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className='col-md-6 pl-md-4 pl-lg-5 pt-4 pt-md-0'>
              {this.props.description}
            </div>
          </div>

        </div>

      </div>)
  }
}

ActMetadataComponent.propTypes = {
  data: PropTypes.object.isRequired,
  billNumberDisplay: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  houseUrl: PropTypes.string,
  senateUrl: PropTypes.string
}
