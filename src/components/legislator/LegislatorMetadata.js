import React from 'react'
import PropTypes from 'prop-types'
import Rating from './Rating'
import defaultPhoto from '../../images/default-photo.jpg'

const LegislatorMetadata = props => {
  return (
    <div className="module-container module-container--full-width-on-small">
      <div className="metadata" key={props.data.url}>
        <div className="row no-gutters align-items-md-center">
          <div className="col-md-6">
            <div className="label  heading-font" style={{ fontSize: '1.1rem' }}>
              {props.chamber === 'senate' ? 'Senator' : 'Representative'}
            </div>
            <h1 className="metadata__heading mt-1">
              <span className="font-weight-normal">{props.data.name}</span>
            </h1>
            <div className="d-flex align-items-md-top flex-column flex-md-row">
              <div className="pb-4 py-md-0">
                {props.data.image ? (
                  <img
                    src={props.data.image}
                    alt={'Photo of ' + props.data.name}
                    className="legislator-portrait"
                    onError={(e) => {
                      if (e.target.src !== window.location.origin + defaultPhoto) {
                        e.target.src = defaultPhoto;
                      }
                    }}
                  />
                ) : null}
              </div>

              <div>
                <div className="font-weight-bold  heading-font">
                  {props.data.party} Party
                </div>
                <div>{props.data.district}</div>
                {props.data.url ? (
                  <div>
                    <a href={props.data.url} target="_blank">
                      Official Legislator Profile
                    </a>
                  </div>
                ) : null}
                <div>
                  <div>
                    <h2
                      className="font-weight-bold  heading-font mt-3 mb-1"
                      style={{ fontWeight: 'bold', fontSize: '18px' }}
                    >
                      Contact {props.legislatorTitle} {props.lastName}:
                    </h2>
                  </div>
                  <div>
                    <a href={`mailto:${props.data.email}`}>
                      {props.data.email}
                    </a>
                  </div>
                  <div>
                    <a href="https://www.progressivemass.com/ma_legislators_contact" target="_blank">
                      More contact information
                    </a>
                    {/* <a href={`tel:${props.data.phone}`}>{props.data.phone}</a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 pl-md-4 pl-lg-5 pt-4 pt-md-0">
            <Rating
              chamber={props.chamber}
              lastName={props.lastName}
              title={props.legislatorTitle}
              rating={props.rating}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

LegislatorMetadata.propTypes = {
  data: PropTypes.object.isRequired,
  chamber: PropTypes.string.isRequired,
  legislatorName: PropTypes.string.isRequired,
  rating: PropTypes.object.isRequired,
}

export default LegislatorMetadata
