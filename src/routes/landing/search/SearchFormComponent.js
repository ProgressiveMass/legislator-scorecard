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

  componentDidMount () {
    this.refs.address.focus()
  }

  render () {
    return (
      <div className='search-form mb-5'>
        <form onSubmit={this.onFormSubmit} >

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
              <div className='lead'>
                Massachusetts
              </div>
            </div>
            <div className='mt-4'>
              <button className='btn btn-primary btn-block heading-font text-md-lg'>
                {this.state.loading
                  ? <span><i className='fa fa-spinner fa-pulse' />&nbsp;Loading</span>
                          : 'Find My Local Legislators'
                }
              </button>

            </div>
          </div>

        </form>
      </div>

    )
  }
}

SearchFormComponent.propTypes = {
  history : PropTypes.object.isRequired
}

const SearchFormWithRouter = withRouter(SearchFormComponent)

export default SearchFormWithRouter
