import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'

class SearchFormComponent extends React.Component {

  constructor (props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  state = {
    loading : false
  }

  onFormSubmit (e) {
    e.preventDefault()
    this.setState({ loading : true })
    const address = this.refs.address.value + ' MA ' + this.refs.zip.value
    this.props.history.push(`/my-legislators/${address}`)
  }

  render () {
    return (
      <div className='container' style={{ position: 'relative' }}>

        <div className='row'>
          <div className='col-lg-6 text-lg'>

            <h2 className='h1'
              style={{ lineHeight: '3rem' }}
            >
              Learn about progressive politics in Massachusetts
            </h2>

            <ul className='mt-4'>
              <li className='mb-2'>Find your state Senator and House Representative</li>
              <li className='mb-2'>Learn about their positions on progressive legislation based on their votes & cosponsorship of bills</li>
            </ul>
            <p className='mt-4'>
              Most of the data is provided by&nbsp;<a href='http://www.progressivemass.com/' className='font-weight-bold'>
                Progressive Massachusetts
              </a>, a statewide grassroots organization.
            </p>
          </div>
          <div className='col-lg-6'>

            <form onSubmit={this.onFormSubmit} className='search-form vertical-center'>

              <div>
                <div className='form-group'>
                  <label>
                    Address
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
                  <div className='text-lg'>
                    Massachusetts
                  </div>
                </div>
                <div className='mt-4'>
                  <button className='btn btn-primary btn-block heading-font font-weight-bold text-lg'>
                    {this.state.loading
                      ? <span><i className='fa fa-spinner fa-pulse' />&nbsp;Loading</span>
                        : 'Find My Local Legislators'
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

const SearchFormWithRouter = withRouter(SearchFormComponent)

export default SearchFormWithRouter
