import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPageComponent = (props) => {
  return (
    <div className='white-floated text-center'>
      <p className='lead'>Sorry, something went wrong.</p>
      <div>
        <Link to='/' className='btn btn-secondary'>
          <i className="fa fa-arrow-circle-o-left"></i>
          &nbsp;Try again
        </Link>
      </div>
    </div>
  )
}

export default ErrorPageComponent
