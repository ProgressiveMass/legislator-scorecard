import React from 'react'
import SearchFormComponent from './search/SearchFormComponent'

export default class LandingPageComponent extends React.Component {

  render () {
    return (
      <div>

        <div className='landing__header'>

          <div className='heading-font landing__header--1 pb-3'>

            <div className='module-container'>
              <div className='row'>
                <div className='col-sm-12'>
                  <h1 className='pt-5 pb-3'>
                    Are your MA representatives fighting for your values?
                  </h1>
                </div>
              </div>

              <div className='row align-items-stretch'>

                <div className='col-md-6 pb-3 landing__header__main'>

                  <img src={require('./../../img/cards.png')}
                    alt='Progressive Massachusetts Legislator Report Card'
                    className='img-fluid mx-auto mb-2 mt-md-1 d-block' style={{ maxWidth: '330px' }} />
                  <p className='text-lg'>
                    <a href='http://www.progressivemass.com/' target='_blank'>Progressive Massachusetts</a> is a grassroots organization that tracks legislation in order to provide people with the knowledge they need to enact positive local change.
                  </p>

                </div>

                <div className='col-md-6  blue-background pl-md-5 pt-lg-3'>
                  <SearchFormComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='landing__section--1 tinted-background'>
          <div className='module-container'>
            <div className='row'>
              <div className='col-sm-12'>
                <h2 className='h1 pt-3 pb-5'>The Legislator Scorecard can help you...</h2>
              </div>
            </div>
            <div className='row align-items-stretch pb-4'>
              <div className='col-md-4 mb-3 mb-md-0'>
                <div className='white-floated p-3 mb-3 mb-md-0'>
                  <img src={require('./../../img/track-legislation.svg')} alt='chart symbol' />
                  <h2 className='h4'>Track Legislation</h2>
                  <p>Progressive Mass provides summaries of important bills and follows their paths through the State House.</p>
                </div>

              </div>
              <div className='col-md-4 mb-3 mb-md-0'>
                <div className='white-floated p-3'>
                  <img src={require('./../../img/learn-more.svg')} alt='person reading symbol' />

                  <h2 className='h4'>Learn About Your Representatives</h2>
                  <p>By viewing which legislation your local representatives cosponsored and voted for or against, you can begin to understand their legislative priorities.</p>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='white-floated p-3'>
                  <img src={require('./../../img/take-action.svg')} alt='gear symbol' />

                  <h2 className='h4'>Take Action <span className='h5 text-muted mb-3'> (Coming Soon)</span></h2>
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
