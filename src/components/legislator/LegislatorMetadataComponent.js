import React from "react"
import PropTypes from "prop-types"
import RatingComponent from "./RatingComponent"

const SenatorMetadataComponent = props => {
  return (
    <div className="module-container module-container--full-width-on-small">
      <div className="metadata heading-font" key={props.data.url}>
        <div className="row no-gutters align-items-md-center">
          <div className="col-md-6">
            <div className="label" style={{ fontSize: "1.1rem" }}>
              {props.chamber === "upper" ? "Senator" : "Representative"}
            </div>
            <h1 className="metadata__heading">
              {/* keep that space below in between spans -- it's important for wrapping */}
              <span className="font-weight-light">{props.data.first_name}</span>{" "}
              <span className="font-weight-normal">{props.data.last_name}</span>
            </h1>
            <div className="d-flex align-items-md-center flex-column flex-md-row">
              <div className="pb-4 py-md-0">
                {props.data.photo_url ? (
                  <img
                    src={props.data.photo_url}
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
                  style={{ position: "relative", top: ".2rem" }}
                >
                  {props.data.district}
                </div>
                <div style={{ fontSize: "1.2rem" }}>
                  Contact {props.chamber === "upper" ? "Sen." : "Rep."}
                  &nbsp;
                  {props.legislatorName}
                  <div style={{ fontSize: ".8rem" }}>
                    Email:{" "}
                    <a href={`mailto:${props.data.email}`}>
                      {props.data.email}
                    </a>
                  </div>
                  <div style={{ fontSize: ".8rem" }}>
                    State House Switchboard:{" "}
                    <a href="tel:617-722-2000">617-722-2000</a>
                  </div>
                  {props.data.url ? (
                    <div style={{ fontSize: ".9rem" }}>
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
            <RatingComponent
              chamber={props.chamber}
              legislatorName={props.legislatorName}
              rating={props.rating}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

SenatorMetadataComponent.propTypes = {
  data: PropTypes.object.isRequired,
  chamber: PropTypes.string.isRequired,
  legislatorName: PropTypes.string.isRequired,
  rating: PropTypes.object.isRequired,
}

export default SenatorMetadataComponent
