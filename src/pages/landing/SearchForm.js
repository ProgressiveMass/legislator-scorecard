import React from 'react'
import { navigate, useStaticQuery, graphql } from 'gatsby'
import axios from 'axios'
import { getLegislatorUrlParams } from '../../utilities'

const randomLocations = [
  {
    street: '64 Weir St',
    city: 'Taunton',
  },

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
  { street: '1 Skyline Dr', city: 'Worcester' },
]

const SearchForm = () => {
  const [loading, setLoading] = React.useState(false)
  const [street, setStreet] = React.useState('')
  const [city, setCity] = React.useState('')

  const legislatorNamesAndMemberCodes = useStaticQuery(
    graphql`
      {
        allSenateLegislatorsJson {
          edges {
            node {
              givenName
              familyName
              memberCode
            }
          }
        }
        allHouseLegislatorsJson {
          edges {
            node {
              givenName
              familyName
              memberCode
            }
          }
        }
      }
    `
  )
  const memberCodesToUrls = Object.fromEntries(
    legislatorNamesAndMemberCodes.allHouseLegislatorsJson.edges.concat(
      legislatorNamesAndMemberCodes.allSenateLegislatorsJson.edges
    )
    .map(({ node }) => node)
    .map((data) => {
      return [
        data.memberCode,
        getLegislatorUrlParams(data),
      ]
    })
  )

  const randomizeLocation = () => {
    const randomLocation =
      randomLocations[Math.floor(Math.random() * randomLocations.length)]
    setCity(randomLocation.city)
    setStreet(randomLocation.street)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const address = street + ', ' + city + ', MA'

    return axios
      .post(`${process.env.GATSBY_SERVERLESS_ENDPOINT}/local-legislators`, {
        address,
      })
      .then((response) => {
        navigate(
          `/legislator/${memberCodesToUrls[
            response.data.senator
          ]}?yourRep=${memberCodesToUrls[
            response.data.representative
          ]}`
        )
      })
      .catch((error) => {
        // TODO: better error handling
        setLoading(false)
        console.error(error)
      })
  }

  const onChange = ({ target: { name, value } }) => {
    if (name === 'street') {
      setStreet(value)
    }
    if (name === 'city') {
      setCity(value)
    }
  }

  return (
    <form
      className='search-form mt-5 mb-4 my-md-0 white-background'
      onSubmit={onFormSubmit}>
      <div className='d-flex justify-content-end'>
        <button
          type='button'
          className='btn btn-outline-dark btn-sm'
          onClick={randomizeLocation}>
          randomize location
        </button>
      </div>
      <div className='form-group'>
        <label>
          Street Address
          <input
            value={street}
            type='text'
            className='form-control'
            name='street'
            onChange={onChange}
          />
        </label>
      </div>

      <div className='form-group'>
        <label>
          City
          <input
            value={city}
            type='text'
            className='form-control'
            name='city'
            onChange={onChange}
          />
        </label>
        <div className='mt-3'>Massachusetts</div>
      </div>

      <div className='mt-4'>
        <button
          className='btn btn-primary btn-block heading-font'
          type='submit' disabled={loading}>
          {loading ? (
            <span>
              <span aria-hidden='true' className='fa fa-spinner fa-pulse' />
              &nbsp;Loading...
            </span>
          ) : (
            'Find My Local Legislators'
          )}
        </button>
      </div>
    </form>
  )
}

export default SearchForm
