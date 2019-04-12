import React from 'react'
import { Link, navigate } from 'gatsby'
import axios from 'axios'

const randomLocations = [
  {
    street: '50 Nauset Road',
    city: 'Eastham',
  },
  {
    street: ' 820 Front St',
    city: 'Chicopee',
  },
  {
    street: '304 Dutton Street',
    city: 'Lowell',
  },
  {
    street: '15 Oak Bluffs Ave',
    city: 'Oak Bluffs',
  },
  {
    street: '2101 Commonwealth Avenue',
    city: 'Boston',
  },
  {
    street: '2101 Commonwealth Avenue',
    city: 'Boston',
  },
  {
    street: '908 N Montello St',
    city: 'Brockton',
  },
]

const transformOpenStatesId = id => encodeURI(id.replace('ocd-person/', ''))

class SearchForm extends React.Component {
  state = {
    loading: false,
    street: '',
    city: '',
  }

  randomizeLocation = () => {
    const randomLocation =
      randomLocations[Math.floor(Math.random() * randomLocations.length)]
    this.setState(randomLocation)
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.setState({ loading: true })
    const address = this.state.street + ' MA ' + this.state.city

    return axios
      .post(`${process.env.GATSBY_SERVERLESS_ENDPOINT}/local-legislators`, {
        address,
      })
      .then(response => {
        navigate(
          `/legislator/${transformOpenStatesId(
            response.data.senator
          )}?yourRep=${transformOpenStatesId(response.data.representative)}`
        )
      })
      .catch(error => {
        // TODO: better error handling
        this.setState({ loading: false })
        console.error(error)
      })
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    return (
      <form
        className="search-form mt-5 mb-4 my-md-0 white-background"
        onSubmit={this.onFormSubmit}
      >
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={this.randomizeLocation}
          >
            randomize location
          </button>
        </div>
        <div className="form-group">
          <label>
            Street Address
            <input
              value={this.state.street}
              type="text"
              className="form-control"
              placeholder="123 Main St"
              name="street"
              onChange={this.onChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            City
            <input
              value={this.state.city}
              type="text"
              className="form-control"
              placeholder="Cambridge"
              name="city"
              onChange={this.onChange}
            />
          </label>
          <div className="mt-3">Massachussetts</div>
        </div>

        <div className="mt-4">
          <button
            className="btn btn-primary btn-block heading-font"
            type="submit"
          >
            {this.state.loading ? (
              <span>
                <span aria-hidden="true" className="fa fa-spinner fa-pulse" />
                &nbsp;Loading
              </span>
            ) : (
              'Find My Local Legislators'
            )}
          </button>
        </div>
      </form>
    )
  }
}

export default SearchForm
