import React, { PropTypes } from 'react'
import axios from 'axios'

import getDistrict from './getDistrict'

export default class SearchFormComponent extends React.Component {

  state = {
    loading : false
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    this.setState({ loading : true })
    const address = this.refs.address.value + ' MA ' + this.refs.zip.value

    const push = this.props.history.push

    // ========================================================
    //  key is limited to queries from the app's domain to prevent abuse
    // ========================================================
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        api_key: 'AIzaSyAXk0apdH-wT0XbspGc3nyE6dLpt887Nm0',
        address : address
      }
    })
    .then((response) => {
      const point = response.data.results[0].geometry.location
      const districtData = getDistrict(point)
      if (typeof districtData === 'string') {
          // couldn't locate the user, show error message
        push('/error')
      } else {
        push(`/senator/${districtData.SEN_DIST}`)
      }
    })
  }

  render () {
    return (
      <div className='blue-floated'>
        <div className='row'>
          <div className='col-md-6'>
            <h2 className='mb-3 h4'>Check out your local representative's 2015-2016 voting record</h2>
            <div className='mb-3'>You'll find information about:</div>
            <ul>
              <li>The person who represents you in the Massachusetts Senate</li>
              <li>His or her position on the issues</li>
              <li>The bills that came to a vote in the most recent session</li>
            </ul>
            <p className='mt-4'>Most of the data is provided by <a href='http://www.progressivemass.com/'>
            Progressive Massachusetts</a>, a statewide grassroots organization.
            </p>
          </div>
          <div className='col-md-6'>

            <form onSubmit={this.onFormSubmit}>

              <div className='vertical-center'>
                <div className='form-group'>
                  <label>
                     Home Address
                    <input type='text' className='form-control' ref='address' placeholder='123 Main St, Cambridge' />
                  </label>
                </div>

                <div className='form-group'>

                  <label>
                     Zip Code
                    <input type='text' className='form-control' ref='zip' placeholder='02140' />
                  </label>
                </div>
                <div className='form-group'>
                  <span className='label'>State</span>
                  <div className='lead'>
                     Massachussetts
                  </div>
                </div>
                <div className='mt-4'>
                  <button className='btn btn-danger btn-block'>
                    {this.state.loading
                       ? <span><i className='fa fa-spinner fa-pulse' />&nbsp;Loading</span>
                        : 'Find My State Senator'
                     }
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>

      </div>
    )
  }
}

SearchFormComponent.propTypes = {
  history : PropTypes.object.isRequired
}
