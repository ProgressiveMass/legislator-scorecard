import React, { PropTypes } from 'react'

export default class RepresentativeSearch extends React.Component {
  constructor (props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit (e) {
    e.preventDefault()
    const address = this.refs.address.value + ' MA ' + this.refs.zip.value
    this.props.router.push({
      pathname: '/senator',
      query: { address : address }
    })
  }

  render () {
    return (<div className='search-page'>
      <main>

        <div className='blue-floated'>
          <div className='row'>
            <div className='col-md-6'>
              <h2 className='mb-3'>Check out their voting record for the 2015-2016 session</h2>
              <div className='mb-3 lead'>You'll find information about:</div>
              <ul>
                <li>- Your state senator</li>
                <li>- Their position on the issues</li>
                <li>- All the bills that came to a vote in the most recent session</li>
              </ul>
              <p className='mt-4 lead'>All data is provided by <a href='http://www.progressivemass.com/'>
              Progressive Massachussetts</a>, a statewide grassroots organization.
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
                      Find My State Senator
                    </button>
                  </div>
                </div>

              </form>

            </div>
          </div>

        </div>

      </main>

    </div>)
  }
}

RepresentativeSearch.propTypes = {
}
