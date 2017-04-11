var houseList = require('./data/house-list')
var senateList = require('./data/senate-list')

function parseLegislatorList () {
  return [].slice.apply(document.querySelectorAll('tbody tr'))
  .map(function (el) { return el.textContent })
}

describe('Legislator Scorecard', function () {
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
