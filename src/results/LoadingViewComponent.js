import React, { PropTypes } from 'react'

const LoadingComponent = (props) => {
  return (<div className='loading tinted-background d-flex align-items-center justify-content-center'>
    <h1>loading...</h1>
  </div>
  )
}

export default LoadingComponent

LoadingComponent.propTypes = {
}
