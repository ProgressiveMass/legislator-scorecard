import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPageComponent = (props) => {
  return (
    <div className='white-floated'>
      <p>Sorry, something went wrong.</p>
      <div>
        <Link to='/' className='btn btn-default'>Try again</Link>
      </div>
    </div>
  )
}

export default ErrorPageComponent
