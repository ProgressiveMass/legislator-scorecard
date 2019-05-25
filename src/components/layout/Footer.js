/* eslint-disable max */
import React from 'react'
import progressiveMassLogo from '../../images/progressive-mass-logo.png'

const Footer = () => {
  return (
    <footer>
      <div className="dark-tint">
        <div className="module-container">
          <div className="d-md-flex align-items-center justify-content-center">
            <a
              href="http://www.progressivemass.com/"
              className="mr-3 mb-3 mb-md-0 d-block"
              style={{ maxWidth: '80px' }}
            >
              <img
                src={progressiveMassLogo}
                alt="Progressive Massachusetts"
                className="img-fluid"
              />
            </a>
            <p>
              You can support Progressive Mass by becoming{' '}
              <a href="https://progressivemass.nationbuilder.com/contribute">
                a contributing member
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="module-container">
        <div className="row no-gutters align-items-top py-4">
          <div className="col-md-6">
            <div className="pt-3 pt-md-0">
              <p>
                This scorecard is the work of a volunteer-led team. <br /> If
                you spot an error, please contact us at{' '}
                <b>corrections@progressivemass.com.</b>
              </p>
            </div>
          </div>

          <div className="col-md-5 offset-md-1">
            <p>
              The code for this site is{' '}
              <a
                href="https://github.com/ProgressiveMass/legislator-scorecard"
                target="_blank"
              >
                publically available on Github.
                <span className="sr-only">opens in new window</span>
              </a>
            </p>

            <p>
              Supplemental legislator information sourced from the{' '}
              <a
                href="http://docs.openstates.org/en/latest/api/v2/index.html"
                target="_blank"
              >
                Open States API.
                <span className="sr-only"> opens in new window</span>
              </a>
            </p>
          </div>
        </div>
        <small className="font-weight-light">
          Statehouse Dome image by{' '}
          <a href="https://www.flickr.com/photos/the-o/2334197459/in/photolist-4ygnzM-gKhvzq-78NEvk-e7RzWQ-dy5Lu-pZenn1-4vc5da-4F7BpN-dy5NE-gJNU2h-gKhzpS-93bS2-eD5LY-4F7BqA-4F7Bqu-R6Jckn-yTyo3-qHg6gw-e7KUZX-hRuy1S-pCitCS-gKhkJ5-4A4wRg-4oPPHq-2tMvEY-9XP2vH-4vgbko-doC1Wi-haZcum-RND2eC-atWgCm-oXcM1Z-dpfhz2-2Tj4PG-cEUBDY-78Nq6n-d63pqd-8ewVc5-jeDVsR-emH2iq-jCkdKY-6Q5yKJ-81MeTh-AA9y-4A8MxE-4F7Bq9-bBB2SN-SC9mbw-62g9Pz-8WuDvH">
            David Ohmer
          </a>
        </small>
      </div>
    </footer>
  )
}

export default Footer
