var houseList = require('./data/house-list')
var senateList = require('./data/senate-list')

function parseLegislatorList (chamber) {
  return [].slice.apply(document.querySelectorAll('table tbody tr'))
  .map(function (r) {
    var legName = chamber === 'house' ? 'Representative' : 'Senator'
    var name = r.querySelector('td[data-label=' + legName + '}] b').innerText
    var party = r.querySelector('td[data-label="Party"]').innerText
    var rating = r.querySelector('td[data-label="Progressive Rating"]').innerText.trim()
    return name + '  ' + party + '  ' + rating
  })
}

describe('Legislator Scorecard', function () {
  before(function () {
    casper.start('https://progressive-mass.firebaseapp.com/all-legislators')
  })

  it('should retrieve correct page', function () {
    casper.then(function () {
      'Progressive Massachusetts | Legislator Scorecard'.should.matchTitle
    })
  })

  it('should show proper info for House', function () {
    console.log(casper.evaluate(parseLegislatorList('house')))
    console.log(houseList)
    expect(casper.evaluate(parseLegislatorList('house'))).to.eql(houseList)
  })
})
