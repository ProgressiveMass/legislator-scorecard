import React, { PropTypes } from 'react'

export default class SearchFormComponent extends React.Component {

  state = {
    loading : false
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    this.setState({ loading : true })
    const address = this.refs.address.value + ' MA ' + this.refs.zip.value
    const push = this.props.history.push
    push(`/my-legislators/${address}`)
  }

  render () {
    return (
      <div className='blue-floated'>
        <div className='row'>
          <div className='col-md-6'>
            <h2>Learn about local politics</h2>
            <ol className='lead mt-4'>
              <li className='mb-2'>Find your state Senator and House Representative</li>
              <li className='mb-2'>Learn about their positions on progressive legislation based on their votes & legislation cosponsorship</li>
              <li>Take action</li>
            </ol>
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
                        : 'Find My Legislators'
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
