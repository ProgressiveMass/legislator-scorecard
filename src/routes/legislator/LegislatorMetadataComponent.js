import React, { PropTypes } from 'react'
import RatingComponent from './RatingComponent'

export default class SenatorMetadataComponent extends React.Component {

  render () {
    return (
      <div className='module-container module-container--full-width-on-small'>
        <div className='metadata heading-font' key={this.props.data.url}>
          <div className='row no-gutters align-items-md-center'>
            <div className='col-md-6'>
              <div className='label' style={{ fontSize : '1.1rem' }}>
                {this.props.chamber === 'upper' ? 'Senator' : 'Representative'}
              </div>
              <h2 className='metadata__heading'>
                {/* keep that space below in between spans -- it's important for wrapping */}
                <span className='font-weight-light'>{this.props.data.first_name}</span> <span className='font-weight-normal'>{this.props.data.last_name}</span>
              </h2>
              <div className='d-flex align-items-md-center flex-column flex-md-row'>
                <div className='pb-4 py-md-0'>
                  {
                    this.props.data.photo_url
                      ? <img src={this.props.data.photo_url} alt='senator profile picture' />
                      : null
                  }
                </div>

                <div>
                  <div className='text-lg font-weight-bold'>
                    {this.props.data.party} Party
                  </div>
                  <div className='text-lg mb-2 text-uppercase' style={{ position: 'relative', top: '.2rem' }}>
                    {this.props.data.district}
                  </div>
                  { this.props.data.url
                    ? <div style={{ fontSize: '1.2rem' }}>
                      <a href={this.props.data.url} target='_blank'>
                        Official Profile & Contact Info
                      </a>
                    </div>
                  : null }
                </div>
              </div>
            </div>
            <div className='col-md-6 pl-md-4 pl-lg-5 pt-4 pt-md-0'>
              <RatingComponent
                chamber={this.props.chamber}
                legislatorName={this.props.legislatorName}
                rating={this.props.rating}
              />
            </div>
          </div>

        </div>

      </div>)
  }
}

SenatorMetadataComponent.propTypes = {
  data : PropTypes.object.isRequired,
  chamber : PropTypes.string.isRequired,
  legislatorName : PropTypes.string.isRequired,
  rating : PropTypes.object.isRequired
}
