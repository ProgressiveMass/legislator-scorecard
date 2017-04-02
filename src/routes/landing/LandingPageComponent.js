import React from 'react'
import SearchFormComponent from './search/SearchFormComponent'

export default class LandingPageComponent extends React.Component {

  render () {
    return (
      <div>

        <div className='landing__header'>

          <div className='heading-font landing__header--1 pb-3'>

            <div className='module-container'>

              <div className='row no-gutters align-items-center' style={{ minHeight : '85vh' }}>
                <div className='col-md-6 py-5 py-md-0'>
                  <h1 className='font-weight-normal'>
                    Are your MA representatives
                    fighting for your progressive values?
                  </h1>
                </div>

                <div className='col-md-6  blue-background pl-md-5 pt-lg-3'>
                  <div className='header__home-link d-flex align-items-center mx-auto mb-4 hidden-sm-down'
                    style={{ color : 'white', width : '350px' }}
                  >
                    <div className='pr-3'>
                      <img src={require('./../../img/logo.svg')}
                        alt='logo image of an inspection sheet'
                        className='img-fluid'
                        style={{ width: '45px' }}
                      />
                    </div>
                    <div>
                      <div className='text-uppercase h5 mb-0' style={{ fontWeight: 'normal' }}>Progressive Massachusetts</div>
                      <div className='h3 mb-0'>Legislator Scorecard</div>
                    </div>
                  </div>
                  <SearchFormComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='module-container row no-gutters align-items-center'>

          <div className='col-md-5 offset-md-1 landing__section--1 pr-md-3'>
            <img src={require('./../../img/cards.png')}
              alt='Progressive Massachusetts Legislator Report Card'
              className='img-fluid mx-auto' />
          </div>
          <div className='col-md-4 mb-5 mb-md-0 lead'>
            <p>
              <a href='http://www.progressivemass.com/' target='_blank'>Progressive Massachusetts</a> is a grassroots organization that tracks legislation in order to provide people with the knowledge they need to enact positive local change.
            </p>
          </div>

        </div>
        <div className='landing__section--2 pb-5'>
          <div className='module-container'>
            <div className='row'>
              <div className='col-sm-12'>
                <h1 className='py-5 mb-0'>The Legislator Scorecard can help you:</h1>
              </div>
            </div>
            <div className='row align-items-stretch pb-4'>
              <div className='col-md-4 mb-3 mb-md-0'>
                <div className='white-floated p-3 mb-3 mb-md-0'>
                  <img src={require('./../../img/fine_print.svg')}
                    alt='track legislation symbol'
                    style={{ width: '80px' }}
                    className='my-4'
                  />
                  <h2 className='h4'>Track Legislation</h2>
                  <p>Progressive Mass provides summaries of important bills and follows their paths through the State House.</p>
                </div>

              </div>
              <div className='col-md-4 mb-3 mb-md-0'>
                <div className='white-floated p-3'>
                  <img src={require('./../../img/legislator.svg')}
                    alt='symbol representing a legislator'
                    style={{ width: '80px' }}
                    className='my-4'

                  />

                  <h2 className='h4'>Learn About Your Reps</h2>
                  <p>By viewing which legislation your local representatives cosponsored and voted for or against, you can begin to understand their legislative priorities.</p>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='white-floated p-3'>
                  <img src={require('./../../img/take-action.svg')}
                    alt='take action symbol'
                    style={{ width: '80px' }}
                    className='my-4'

                  />
                  <h2 className='h4'>Take Action <span className='h6 text-muted mb-3'> (Coming Soon)</span></h2>
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
