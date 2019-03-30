import React from "react"
import SearchForm from "./SearchForm"
import "../../styles/index.scss"
import Layout from "../../components/layout"

export default () => {
  return (
    <Layout>
      <section className="landing__header">
        <div className="heading-font landing__header--1">
          <div className="module-container">
            <div
              className="row no-gutters align-items-center"
              style={{ minHeight: "50vh" }}
            >
              <div className="col-md-6 py-md-0">
                <h1 className="landing__cta">
                  Are your <b>Massachusetts</b> representatives fighting for
                  your <b>progressive</b> values?
                </h1>
              </div>

              <div className="col-md-6  blue-background pl-md-5 pt-lg-3">
                <div className="mx-auto" style={{ maxWidth: "500px" }}>
                  <SearchForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="module-container">
        <h2 className="sr-only">About Progressive Massachusetts</h2>

        <div className="landing__section--1 row no-gutters align-items-center">
          <div className="col-md-5 offset-md-1 pr-md-3 mb-5 mb-md-0">
            <img
              src={require("./images/cards.png")}
              alt="snap shots of three different Progressive Massachusetts Legislator Report Cards"
              className="img-fluid mx-auto d-block"
              style={{ maxHeight: "500px" }}
            />
          </div>
          <div className="col-md-4 mb-5 mb-md-0 text-lg ">
            <p>
              <a
                href="http://www.progressivemass.com/"
                target="_blank"
                className="heading-font text-lg"
              >
                Progressive Massachusetts
              </a>
              <br />
              is a grassroots organization that tracks legislation in order to
              provide people with the knowledge they need to enact positive
              local change.
            </p>
          </div>
        </div>
      </section>

      <section className="landing__section--2">
        <div className="module-container">
          <div className="row">
            <div className="col-sm-12">
              <h2 className="h1 mb-0 pb-5">
                The Legislator Scorecard can help you:
              </h2>
            </div>
          </div>
          <div className="row align-items-stretch pb-4">
            <div className="col-md-4 mb-4 mb-md-0">
              <div
                className="white-floated p-3 mx-auto"
                style={{ maxWidth: "400px" }}
              >
                <h3 className="h4">
                  <img
                    src={require("./images/fine_print.svg")}
                    alt=""
                    style={{ width: "80px" }}
                    className="my-4"
                  />
                  Track Legislation
                </h3>
                <p>
                  Progressive Mass provides summaries of important bills and
                  follows their paths through the State House.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div
                className="white-floated p-3 mx-auto"
                style={{ maxWidth: "400px" }}
              >
                <h3 className="h4">
                  <img
                    src={require("./images/legislator.svg")}
                    alt=""
                    style={{ width: "80px" }}
                    className="my-4"
                  />
                  Learn About Your Reps
                </h3>
                <p>
                  By viewing which legislation your local representatives
                  cosponsored and voted for or against, you can begin to
                  understand their legislative priorities.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="white-floated p-3 mx-auto"
                style={{ maxWidth: "400px" }}
              >
                <h3 className="h4">
                  <img
                    src={require("./images/collaboration.svg")}
                    alt=""
                    style={{ width: "80px" }}
                    className="my-4"
                  />
                  Take Action
                </h3>
                <p>
                  Call or email your local legislators and talk to them about
                  legislation that's important to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
