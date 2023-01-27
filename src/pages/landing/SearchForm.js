import React from 'react'
import { navigate } from 'gatsby'
import axios from 'axios'
import { geolocate } from '../../../functions/getLocalLegislatorsData/geolocate'

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

const transformOpenStatesId = (id) => encodeURI(id.replace('ocd-person/', ''))

const SearchForm = () => {
  const [loading, setLoading] = React.useState(false)
  const [street, setStreet] = React.useState('')
  const [city, setCity] = React.useState('')

  const randomizeLocation = () => {
    const randomLocation =
      randomLocations[Math.floor(Math.random() * randomLocations.length)]
    setCity(randomLocation.city)
    setStreet(randomLocation.street)
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const address = street + ', ' + city + ', MA'

    const { lat, lng } = await axios
      .get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: 'AIzaSyCFrj78MU9xtD6m4RBFEmLwKvVQoUrWRdI',
        },
      })
      .then(function (response) {
        if (response.data.results.length) {
          return response.data.results[0].geometry.location
        } else {
          // couldn't geolocate the address
          throw new Error(
            JSON.stringify({
              name: "Couldn't locate that Massachusetts address.",
              data: response.data,
            })
          )
        }
      })

    const response = await axios(
      `https://v3.openstates.org/people.geo?lat=${lat}&lng=${lng}&apikey=${
        process.env.OPENSTATES_API_KEY ?? 'f1eb1d05-e80a-4fa3-8157-46aa0227ff11'
      }`
    )
    setLoading(false)
    const [representative, senator, ...rest] = response.data.results

    navigate(
      `/legislator/${transformOpenStatesId(
        senator.id
      )}?yourRep=${transformOpenStatesId(representative.id)}`
    )
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
          type='submit'>
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
