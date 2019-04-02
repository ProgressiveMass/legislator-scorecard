import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const ErrorViewComponent = props => {
  return (
    <div className="tinted-background">
      <div
        className="mx-auto white-floated p-4"
        style={{ maxWidth: "500px", marginTop: "12vh", marginBottom: "15vh" }}
      >
        <h1 className="h2 mb-4">Sorry, there was an error.</h1>
        <p className="text-lg mb-4">{props.error}</p>
        <Link to="/" className="btn btn-primary btn-block text-lg heading-font">
          Try again
        </Link>
      </div>
    </div>
  )
}

export default ErrorViewComponent

ErrorViewComponent.propTypes = {
  error: PropTypes.string,
}
