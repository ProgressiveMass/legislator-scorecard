import React from 'react'
import SearchFormComponent from './search/SearchFormComponent'

export default class LandingPageComponent extends React.Component {

  render () {
    return (
      <div>

        <div className='landing__header'>

          <div className='heading-font landing__header--1'>

            <div className='module-container'>

              <div className='row no-gutters align-items-center' style={{ minHeight : '50vh' }}>
                <div className='col-md-6 py-md-0'>
                  <h2 className='landing__cta'>
                    Are your <b>Massachusetts</b> representatives
                    fighting for your <b>progressive</b> values?
                  </h2>
                </div>

                <div className='col-md-6  blue-background pl-md-5 pt-lg-3'>
                  <div className='header__home-link d-flex align-items-center mx-auto mb-4 hidden-sm-down'
                    style={{ color : 'white', width : '322px' }}
                  >
                    <div className='pr-3'>
                      <img src={require('./../../img/logo.svg')}
                        alt='logo image of an inspection sheet'
                        className='img-fluid'
                        style={{ width: '45px' }}
                      />
                    </div>
                    <h1>
                      <div className='text-uppercase h6 mb-0' style={{ fontWeight: '300' }}>Progressive Massachusetts</div>
                      <div className='h4 mb-0' style={{ fontWeight: '400' }}>Legislator Scorecard</div>
                    </h1>
                  </div>
                  <div className='mx-auto' style={{ maxWidth: '500px' }}>
                    <SearchFormComponent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='module-container'>

          <div className='landing__section--1 row no-gutters align-items-center'>
            <div className='col-md-5 offset-md-1 pr-md-3 mb-5 mb-md-0'>
              <img src={require('./../../img/cards.png')}
                alt='Progressive Massachusetts Legislator Report Cards'
                className='img-fluid mx-auto d-block'
                style={{ maxHeight : '500px' }}
              />
            </div>
            <div className='col-md-4 mb-5 mb-md-0 text-lg '>
              <p>
                <a href='http://www.progressivemass.com/' target='_blank' className='heading-font text-lg'>Progressive Massachusetts</a><br />
                is a grassroots organization that tracks legislation in order to provide people with the knowledge they need to enact positive local change.
              </p>
            </div>
          </div>
        </div>
        <div className='landing__section--2'>
          <div className='module-container'>
            <div className='row'>
              <div className='col-sm-12'>
                <h2 className='h1 mb-0 pb-5'>The Legislator Scorecard can help you:</h2>
              </div>
            </div>
            <div className='row align-items-stretch pb-4'>
              <div className='col-md-4 mb-4 mb-md-0'>
                <div className='white-floated p-3 mx-auto' style={{ maxWidth : '400px' }}>
                  <img src={require('./../../img/fine_print.svg')}
                    alt='a symbol of a magnifying glass over a document'
                    style={{ width: '80px' }}
                    className='my-4'
                  />
                  <h3 className='h4'>Track Legislation</h3>
                  <p>Progressive Mass provides summaries of important bills and follows their paths through the State House.</p>
                </div>

              </div>
              <div className='col-md-4 mb-4 mb-md-0'>
                <div className='white-floated p-3 mx-auto' style={{ maxWidth : '400px' }}>
                  <img src={require('./../../img/legislator.svg')}
                    alt='symbol representing a person reading'
                    style={{ width: '80px' }}
                    className='my-4'

                  />

                  <h3 className='h4'>Learn About Your Reps</h3>
                  <p>By viewing which legislation your local representatives cosponsored and voted for or against, you can begin to understand their legislative priorities.</p>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='white-floated p-3 mx-auto' style={{ maxWidth : '400px' }}>
                  <img src={require('./../../img/collaboration.svg')}
                    alt='take action symbol'
                    style={{ width: '80px' }}
                    className='my-4'

                  />
                  <h3 className='h4'>Take Action <span className='h6 text-muted mb-3'> (Coming Soon)</span></h3>
                  <p>We're working to make it easier to take action based on the information in the scorecard.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }

      }
