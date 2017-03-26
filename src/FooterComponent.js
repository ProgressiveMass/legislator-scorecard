import React from 'react'

const Footer = (props) => {
  return (<footer className='container-fluid'>
    <div className='row align-items-center no-gutters'>
      <div className='col-sm-12 col-md-3 p-3'>
        <img src={require('./img/progressive-mass-logo.png')}
          alt='Progressive Massachusetts Logo'
        />
      </div>
      <div className='col-sm-12 col-md-6 col-lg-5 p-3'>
        <div className='heading-font font-weight-bold text-lg p-md-l-5'>
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
      </div>
    </div>
  </footer>)
}

export default Footer
