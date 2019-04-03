import React from 'react'
import PropTypes from 'prop-types'
import Rating from './Rating'

const LegislatorMetadata = props => {
  return (
    <div className="module-container module-container--full-width-on-small">
      <div className="metadata heading-font" key={props.data.url}>
        <div className="row no-gutters align-items-md-center">
          <div className="col-md-6">
            <div className="label" style={{ fontSize: '1.1rem' }}>
              {props.chamber === 'upper' ? 'Senator' : 'Representative'}
            </div>
            <h1 className="metadata__heading mt-1 mb-3">
              <span className="font-weight-normal">{props.data.name}</span>
            </h1>
            <div className="d-flex align-items-md-center flex-column flex-md-row">
              <div className="pb-4 py-md-0">
                {props.data.image ? (
                  <img
                    src={props.data.image}
                    alt="senator profile picture"
                    className="legislator-portrait"
                  />
                ) : null}
              </div>

              <div>
                <div className="text-lg font-weight-bold">
                  {props.data.party} Party
                </div>
                <div
                  className="text-lg mb-2 text-uppercase"
                  style={{ position: 'relative', top: '.2rem' }}
                >
                  {props.data.district}
                </div>
                <div style={{ fontSize: '1.2rem' }}>
                  <div>
                    <a href={`mailto:${props.data.email}`}>
                      {props.data.email}
                    </a>
                  </div>
                  <div>
                    <a href={`tel:${props.data.phone}`}>{props.data.phone}</a>
                  </div>
                  {props.data.url ? (
                    <div>
                      <a href={props.data.url} target="_blank">
                        Official Legislator Profile
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 pl-md-4 pl-lg-5 pt-4 pt-md-0">
            <Rating
              chamber={props.chamber}
              lastName={props.data.name.split('/s').slice(-1)[0]}
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
