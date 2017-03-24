import React from 'react'

const Footer = (props) => {
  return (<footer className='d-flex justify-content-between align-items-center container p-x-0 p-y-3'>
    <img src={require('./img/progressive-mass-logo.png')}
      alt='Progressive Massachusetts Logo'
      style={{ maxHeight: '200px', height: 'auto' }}
    />
    <div className='heading-font font-weight-bold text-lg'>
      <p>
        A collaboration between&nbsp;
        <a href='http://www.progressivemass.com/' target='_blank'>Progressive Massachusetts</a>
        &nbsp;and&nbsp;
        <a href='http://alex.holachek.com' target='_blank'>Alex Holachek</a>.
      </p>
      <p>
        Legislator information provided by the <a href='http://docs.openstates.org/en/latest/api/' target='_blank'>Open States API</a>.
      </p>
    </div>

  </footer>)
}

export default Footer
