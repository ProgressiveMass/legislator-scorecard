import React from "react"
import PropTypes from "prop-types"
import ProgressBarWContext from "../progressBar"
import ProgressBar from "../progressBar/ProgressBar"
import InfoPopover from "../InfoPopover"

export default class RatingComponent extends React.Component {
  constructor(props) {
    super(props)
    this.renderVoteSection = this.renderVoteSection.bind(this)
    this.renderCosponsorshipSection = this.renderCosponsorshipSection.bind(this)
    this.renderAvgDem = this.renderAvgDem.bind(this)
  }

  renderAvgDem() {
    if (this.props.chamber === "upper") {
      return (
        <div className="flex-grow mr-2">
          <span className="label font-weight-normal">Avg Sen. Democrat</span>
          <ProgressBar
            width={this.props.rating.votes.cumulative.democratAverage}
          />
        </div>
      )
    } else if (this.props.chamber === "lower") {
      return (
        <div className="flex-grow mr-2">
          <span className="label font-weight-normal">
            Speaker Deleo (Dem)&nbsp;
            <InfoPopover text="The Speaker of the House's votes are highly predictive of the average Democratic vote." />
          </span>
          <ProgressBar width={this.props.rating.votes.cumulative.speaker} />
        </div>
      )
    }
  }

  renderVoteSection() {
    return (
      <div>
        <div className="sr-only">
          <h3>Vote information</h3>
          <p id="sr-stats">
            {`Voted with the progressive position ${
              this.props.rating.votes.voteRating
            } percent of the time.`}
            {`The average democrat progressive rating was ${
              this.props.rating.votes.cumulative.democratAverage
            } percent.`}
            {`The average republican progressive rating was ${
              this.props.rating.votes.cumulative.republicanAverage
            } percent.`}
            {this.props.rating.votes.cumulative.speaker
              ? `The House Speaker progressive rating was ${
                  this.props.rating.votes.cumulative.speaker
                } percent.`
              : ""}
          </p>
        </div>

        <div aria-hidden>
          <div className="mb-2">
            <span className="label d-block mb-1" style={{ fontSize: "1.1rem" }}>
              {this.props.chamber === "upper" ? "Sen." : "Rep."}&nbsp;
              {this.props.legislatorName}'s votes&nbsp;
              <span
                className="text-lowercase font-weight-normal"
                style={{ fontSize: "1rem" }}
              >
                (2017-18)
              </span>
            </span>
            <ProgressBarWContext data={this.props.rating.votes} animate large />
          </div>
          <div className="d-flex">
            {this.renderAvgDem()}
            <div className="flex-grow ml-2">
              <span className="label font-weight-normal">
                Avg {this.props.chamber === "upper" ? "Sen." : "House"}{" "}
                Republican
              </span>
              <ProgressBar
                width={this.props.rating.votes.cumulative.republicanAverage}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderCosponsorshipSection() {
    return (
      <div className="mt-4">
        <h3
          className="label"
          style={{ fontSize: "1.1rem", position: "relative", top: ".5rem" }}
        >
          {this.props.chamber === "upper" ? "Sen." : "Rep."}&nbsp;
          {this.props.legislatorName} cosponsored
        </h3>
        <div style={{ fontSize: "2.2rem" }} id="cosponsorship-summary">
          <b
            className={`${
              this.props.rating.cosponsorship.legislator > 3
                ? "text-primary"
                : "text-danger"
            }`}
          >
            {this.props.rating.cosponsorship.legislator}
          </b>
          &nbsp;
          <span className="font-weight-light">
            progressive{" "}
            {this.props.rating.cosponsorship.legislator === 1
              ? "bill"
              : "bills"}
          </span>
        </div>
        <div style={{ position: "relative", top: "-.4rem" }}>
          out of&nbsp;
          <b className="text-primary">
            {this.props.rating.cosponsorship.total}
          </b>
          &nbsp;endorsed by Prog. Mass for 2017-18&nbsp;
          <InfoPopover
            title="Which bills does Progressive Mass endorse?"
            text='Every session, Prog. Mass chooses a limited selection of progressive bills that advance its <a target="_blank" href="http://www.progressivemass.com/progressiveplatform">Progressive Platform.</a> There are, of course, worthy bills that do not make it into the selected group.'
          />
        </div>
      </div>
    )
  }

  render() {
    if (!this.props.rating) return null

    return (
      <div className="progress-component">
        <h2 className="sr-only">Progressive Ranking Summary</h2>
        {this.renderVoteSection()}
        {this.renderCosponsorshipSection()}
      </div>
    )
  }
}

RatingComponent.propTypes = {
  rating: PropTypes.object.isRequired,
  chamber: PropTypes.string.isRequired,
  legislatorName: PropTypes.string.isRequired,
}
