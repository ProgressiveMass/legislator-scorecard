
var houseList = require('./data/house-list')
var senateList = require('./data/senate-list')

// http://docs.casperjs.org/en/latest/events-filters.html#remote-message
casper.on('remote.message', function (msg) {
  this.echo('Console: ' + msg)
})

// http://docs.casperjs.org/en/latest/events-filters.html#page-error
casper.on('page.error', function (msg, trace) {
  this.echo('Error: ' + msg)
    // maybe make it a little fancier with the code from the PhantomJS equivalent
})

// http://docs.casperjs.org/en/latest/events-filters.html#resource-error
casper.on('resource.error', function (resourceError) {
  this.echo('ResourceError: ' + JSON.stringify(resourceError, undefined, 4))
})

// http://docs.casperjs.org/en/latest/events-filters.html#page-initialized
casper.on('page.initialized', function (page) {
    // CasperJS doesn't provide `onResourceTimeout`, so it must be set through
    // the PhantomJS means. This is only possible when the page is initialized
  page.onResourceTimeout = function (request) {
    console.log('Response Timeout (#' + request.id + '): ' + JSON.stringify(request))
  }
})

function parseLegislatorList () {
  return [].slice.apply(document.querySelectorAll('tbody tr'))
  .map(function (el) { return el.textContent })
}

describe('Legislator Scorecard Index', function () {
  before(function () {
    casper.start('http://localhost:3000/all-legislators')
  })

  it('should retrieve correct page', function () {
    casper.then(function () {
      'Progressive Massachusetts | Legislator Scorecard'.should.matchTitle
    })
  })

  it('should show proper info for House', function () {
    expect(casper.evaluate(parseLegislatorList)).to.eql(houseList)
  })

  it('should show proper info for Senate', function () {
    casper.thenClick('#tab-1', function () {
      expect(casper.evaluate(parseLegislatorList)).to.eql(senateList)
    })
  })
})

describe('Legislator Detail Page', function () {
  before(function () {
    casper.start('http://localhost:3000/legislator/MAL000444')
  })

  it('should show correct information for legislator metadata', function (done) {
    casper.waitForSelector('.metadata', function () {
      casper.then(function () {
        expect(casper.evaluate(function () {
          return document.querySelector('.metadata__heading').textContent
        })).to.eql('Russell E. Holmes')

        expect(casper.evaluate(function () {
          return document.querySelector('#legislator-rating').textContent
        })).to.eql('74%  progressive')

        expect(casper.evaluate(function () {
          return document.querySelector('#sr-stats').textContent
        })).to.eql('Voted with the progressive position 74 percent of the time.The average democrat progressive rating was 75 percent.The average republican progressive rating was 21 percent.The House Speaker progressive rating was 78 percent.')

        expect(casper.evaluate(function () {
          return document.querySelector('#cosponsorship-summary').textContent
        })).to.eql('5 progressive bills')

        done()

        // now a quick hacky check to make sure cosponsorship info is reflected below

        // expect(casper.evaluate(function(){
        //   return document.querySelector('#cosponsorship-summary').textContent
        // })).to.eql("5 progressive bills")
      })
    })
  })
})
