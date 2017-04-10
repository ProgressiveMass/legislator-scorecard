/* eslint-disable max- */

import React from 'react'

const Footer = (props) => {
  return (<footer>
    <div className='dark-tint'>
      <div className='module-container'>
        <div className=''>
          <p className='text-center'>
            <b>Like the scorecard?</b> Consider becoming <a href='https://progressivemass.nationbuilder.com/contribute'>a contributing member of Progressive Mass.</a>
          </p>
        </div>
      </div>
    </div>
    <div className='module-container'>

      <div className='row no-gutters align-items-top py-4'>
        <div className='col-md-6 d-flex'>

          <a href='http://www.progressivemass.com/' className='mr-3 mb-3 mb-md-0'>
            <img src={require('./../img/progressive-mass-logo.png')}
              alt='Progressive Massachusetts Logo'
            />
          </a>

          <p className='pt-3 pt-md-0'>
            Please contact us at <br /> <b>grassroots@progressivemass.com</b><br />
            if you spot an error or have a question.
          </p>

        </div>

        <div className='col-md-5 offset-md-1'>
          <p>
            Site created by <a href='http://alex.holachek.com' target='_blank'>Alex Holachek</a>.
          </p>

          <p>
            Supplemental legislator information sourced from the <a href='http://docs.openstates.org/en/latest/api/' target='_blank'>Open States API</a>.
          </p>
        </div>
      </div>
      <small className='font-weight-light'>Statehouse Dome image by <a href='https://www.flickr.com/photos/the-o/2334197459/in/photolist-4ygnzM-gKhvzq-78NEvk-e7RzWQ-dy5Lu-pZenn1-4vc5da-4F7BpN-dy5NE-gJNU2h-gKhzpS-93bS2-eD5LY-4F7BqA-4F7Bqu-R6Jckn-yTyo3-qHg6gw-e7KUZX-hRuy1S-pCitCS-gKhkJ5-4A4wRg-4oPPHq-2tMvEY-9XP2vH-4vgbko-doC1Wi-haZcum-RND2eC-atWgCm-oXcM1Z-dpfhz2-2Tj4PG-cEUBDY-78Nq6n-d63pqd-8ewVc5-jeDVsR-emH2iq-jCkdKY-6Q5yKJ-81MeTh-AA9y-4A8MxE-4F7Bq9-bBB2SN-SC9mbw-62g9Pz-8WuDvH'>David Ohmer</a></small>

    </div>

  </footer>)
}

export default Footer
