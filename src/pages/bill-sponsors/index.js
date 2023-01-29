import React from 'react'
import Layout from '../../components/layout'
import useGoogleSheets from 'use-google-sheets'

const BillSponsors = ({ location }) => {
  console.log('location.state', location.state)
  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.GATSBY_GOOGLE_API_KEY,
    sheetId: process.env.GATSBY_GOOGLE_SHEETS_ID,
  })

  console.log('data', data)
  if (loading) return <div>Loading...</div>

  let sponsoredBills = data.find((item) => item.id === 'Sponsorship')
  console.log('sponsoredBills', sponsoredBills)

  console.log('sponsoredBills.data', sponsoredBills.data[0])
  // let repsById = {}
  // Object.fromEntries(sponsoredBills?.data?.[0]).forEach(
  //   ([openStatesId, repName]) => {
  //     if (openStatesId && !repsById[openStatesId]) {
  //       repsById[openStatesId] = repName
  //     }
  //   }
  // )

  // console.log('repsById', repsById)

  // let sponsorsByBill = sponsoredBills?.data.forEach(item => {
  //   const billName = item[""]
  //   Object.entries(item).find(([openStatesId,]))
  // const
  //   return {
  //     billName,

  //   }

  // })
  let homesAct = sponsoredBills?.data?.find((item) =>
    item[''].includes('HOMES Act ')
  )
  console.log('homesAct', homesAct)
  // const getVotesByBill = () => {
  let voteInfo = {
    bill: '',
    yesVotes: [],
    noVotes: [],
    other: [],
  }
  Object.entries(homesAct).map(([key, value]) => {
    if (key === '') {
      voteInfo.bill = value
    } else {
      if (value.includes('Y')) {
        voteInfo.yesVotes.push(sponsoredBills.data[0][key])
      } else if (value.includes('N')) {
        voteInfo.noVotes.push(sponsoredBills.data[0][key])
      }
    }
  })
  console.log('voteInfo', voteInfo)
  // }
  // getVotesByBill()
  return (
    <Layout>
      <div
        style={{
          display: 'grid',
          justifyContent: 'center',
          placeContent: 'center',
        }}>
        {voteInfo.bill}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          yesvotes:{' '}
          {voteInfo.yesVotes.map((vote) => (
            <div key={vote}>{vote}</div>
          ))}
        </div>
        <div>
          novotes:{' '}
          {voteInfo.noVotes.map((vote) => (
            <div key={vote}>{vote}</div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default BillSponsors
