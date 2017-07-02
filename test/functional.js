import { Selector, ClientFunction } from 'testcafe'

// ========================================================
//  utility functions
// ========================================================
const getBillStatuses = ClientFunction(() => {
  const elements = [].slice.apply(document.querySelectorAll('table tbody tr'))
  return elements.map((el) => {
    return `${el.querySelector('td:first-of-type div:first-of-type').textContent} ${el.querySelector('td:last-of-type').textContent}`
  })
})

fixture `House Reps`
    .page `http://localhost:3000/all-legislators`

test('House legislator list is ok', async t => {
  await t
  .expect(Selector('table tbody tr:first-of-type').textContent).eql('1Arciero, James DC+  (78%)', 'Aricero')
  .expect(Selector('table tbody tr:last-of-type').textContent).eql('161Zlotnik, Jonathan D. DF  (52%)')

  // sort by score highest to lowest
  await t
  .click(Selector('table th:last-of-type button'))
  .click(Selector('table th:last-of-type button'))
  .expect(Selector('table tbody tr:first-of-type').textContent).eql('1Hecht, Jonathan DA+  (100%)')
  .expect(Selector('table tbody tr:last-of-type').textContent).eql('161Williams, Bud DN/A:  no voting data from 189th sess.')
})

test('House legislator detail page is ok', async t => {
  // move to legislator detail page
  await t
  .click(Selector('a').withText('Holmes, Russell E'))
  .expect(Selector('.metadata__heading').textContent).eql('Russell Holmes')
  .expect(Selector('.progress__text-container').textContent)
  .eql('C   (74%)')
  .expect(Selector('#sr-stats').textContent)
  .eql('Voted with the progressive position 74 percent of the time.The average democrat progressive rating was 75 percent.The average republican progressive rating was 21 percent.The House Speaker progressive rating was 78 percent.')
  .expect(Selector('#cosponsorship-summary').textContent)
  .eql('5 progressive bills')

  await t
  .expect(getBillStatuses())
  .eql(
    [
      'H2365  No',
      'H2172  No',
      'S81  No',
      'H2987  No',
      'S223  Yes',
      'H633 more informationThis bill has two distinct versions in the House and Senate, but for the purposes of tracking cosponsorship we treat them as a single bill. No',
      'H2308  Yes',
      'H741  No',
      'H3269  Yes',
      'H2359  Yes',
      'H536  No',
      'H2091  Yes',
      'S1880  No',
      'H2706  No',
      'H3400  No',
      'H1726 more informationThis bill has two distinct versions in the House and Senate, but for the purposes of tracking cosponsorship we treat them as a single bill. No'
    ]
  )
})

fixture `Senate Reps`
    .page `http://localhost:3000/all-legislators`

test('Senate legislator list is ok', async t => {
  await t
  .click(Selector('div[role="tab"]').withText('Senators'))
  .expect(Selector('table tbody tr:first-of-type').textContent).eql('1Barrett, Michael J. DB   (87%)')
  .expect(Selector('table tbody tr:last-of-type').textContent).eql('40Welch, James T.DC   (76%)')

  // sort by score highest to lowest
  await t
  .click(Selector('table th:last-of-type button'))
  .click(Selector('table th:last-of-type button'))
  .expect(Selector('table tbody tr:first-of-type').textContent).eql('1Eldridge, James B.DA+  (100%)')
  .expect(Selector('table tbody tr:last-of-type').textContent).eql('40Timilty, Walter F. DN/A:  no voting data from 189th sess.')
})

test('Senator legislator detail page is ok', async t => {
  // move to legislator detail page
  // check out metadata
  await t
  .click(Selector('div[role="tab"]').withText('Senators'))
  .click(Selector('a').withText('Jehlen, Patricia D'))
  .expect(Selector('.metadata__heading').textContent).eql('Patricia Jehlen')
  .expect(Selector('.progress__text-container').textContent)
  .eql('A   (97%)')
  .expect(Selector('#sr-stats').textContent)
  .eql('Voted with the progressive position 97 percent of the time.The average democrat progressive rating was 77 percent.The average republican progressive rating was 15 percent.')
  .expect(Selector('#cosponsorship-summary').textContent)
  .eql('16 progressive bills')

  await t
  .expect(getBillStatuses())
  .eql(
    [ 'S1004  Yes',
      'S1048  Yes',
      'S81  Yes',
      'S619  Yes',
      'S223  Yes',
      'S681 more informationThis bill has two distinct versions in the House and Senate, but for the purposes of tracking cosponsorship we treat them as a single bill. Yes',
      'S791  Yes',
      'S819  Yes',
      'S1305  Yes',
      'S777  Yes',
      'S499  Yes',
      'S373  Yes',
      'S1880  Yes',
      'S1846  Yes',
      'S1847  Yes',
      'S1821 more informationThis bill has two distinct versions in the House and Senate, but for the purposes of tracking cosponsorship we treat them as a single bill. Yes'
    ]
  )
})
