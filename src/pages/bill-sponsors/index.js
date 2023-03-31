import React from 'react'
import Layout from '../../components/layout'
import useGoogleSheets from 'use-google-sheets'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import { getLegislatorUrlParams } from '../../utilities'

const legislatorQuery = graphql`
  {
    allSenateLegislatorsJson {
      edges {
        node {
          id
          name
          givenName
          familyName
          party
          district
          image
          email
          phone
          url
        }
      }
    }
    allHouseLegislatorsJson {
      edges {
        node {
          id
          name
          givenName
          familyName
          party
          district
          image
          email
          phone
          url
        }
      }
    }
  }
`

const SPONSORED_BILLS_2021 = [
  'Common Start',
  'Debt-Free College',
  'Medicare for All',
  'Affordable Housing & Climate Resilience',
  'Real Estate Transfer Fee',
  'HOMES Act',
  'Safe Communities Act',
  'Work & Family Mobility Act',
  'Curbing Solitary Confinement',
  'No Cost Calls',
  'Alternative Crisis Response',
  'IPCC by 2030',
  'Building Justice with Jobs',
  'VOTES Act',
]

const getBillInfo = (data) => {
  if (!data.length) return

  let alLSponsoredBillsList = data.find(
    (item) => item.id === 'Sponsored_Bills'
  ).data
  let bills = alLSponsoredBillsList.reduce((storage, item) => {
    let group = item['shorthand_title']?.trim().toLowerCase()
    storage[group] = storage[group] || { house: {}, senate: {} }
    if (item.bill_number.includes('H.')) {
      storage[group].house = item
    } else {
      storage[group].senate = item
    }
    return storage
  }, {})

  return bills
}

const getSponsorshipInfo = (data, graphQLData) => {
  if (!data.length || !graphQLData) return

  let alLSponsoredBillsList = data.find(
    (item) => item.id === 'Sponsorship'
  ).data

  let legislatorNameMap = alLSponsoredBillsList[0]

  let bills = alLSponsoredBillsList.reduce((storage, item) => {
    let group = item['']?.trim().toLowerCase() // get bill name and normalize for casing
    if (group !== 'shorthand_title') {
      storage[group] = storage[group] || { yesVotes: [], noVotes: [] }
      for (const openStatesId in item) {
        let sponsoringLegislatorInfo = {}
        if (openStatesId !== '') {
          sponsoringLegislatorInfo.name = legislatorNameMap[openStatesId]
          sponsoringLegislatorInfo.openStatesId = openStatesId
          sponsoringLegislatorInfo.sponsorsBill = item[openStatesId] === 'Y'
          let houseRep =
            graphQLData.allHouseLegislatorsJson?.edges?.find(
              ({ node }) => node.id === openStatesId
            ) ?? {}
          let senator =
            graphQLData.allSenateLegislatorsJson?.edges?.find(
              ({ node }) => node.id === openStatesId
            ) ?? {}

          sponsoringLegislatorInfo = {
            ...sponsoringLegislatorInfo,
            ...houseRep.node,
            ...senator.node,
          }
        }
        if (sponsoringLegislatorInfo.sponsorsBill) {
          storage[group].yesVotes.push(sponsoringLegislatorInfo)
        } else if (sponsoringLegislatorInfo.sponsorsBill === false) {
          storage[group].noVotes.push(sponsoringLegislatorInfo)
        }
      }
    }
    return storage
  }, {})

  return bills
}

const BillSponsors = () => {
  const graphQLData = useStaticQuery(legislatorQuery)
  const {
    data: data2021,
    loading: loading2021,
    error: error2021,
  } = useGoogleSheets({
    apiKey: process.env.GATSBY_GOOGLE_API_KEY,
    sheetId: '1_WD66ZAMR4gQRq9f3s0ITayesaLoQcHIMZVTHkTA6Ug',
  })

  const {
    data: data2019,
    loading: loading2019,
    error: error2019,
  } = useGoogleSheets({
    apiKey: process.env.GATSBY_GOOGLE_API_KEY,
    sheetId: '17SfLTsqLaoBG8WE5vKHmBY_J6Iz1IFKThm_wAqsHZdg',
  })

  const billInfo = React.useCallback(getBillInfo(data2021), [loading2021])
  const sponsorshipInfo = React.useCallback(
    getSponsorshipInfo(data2021, graphQLData),
    [loading2021, !!graphQLData, data2021]
  )

  if (loading2019 || loading2021)
    return (
      <Layout>
        <div
          style={{
            display: 'grid',
            justifyContent: 'center',
            height: '100vh',
            placeContent: 'center',
          }}>
          <div>Loading...</div>
        </div>
      </Layout>
    )

  return (
    <Layout>
      <div className='white-background pt-5 mb-5'>
        <div className='mx-auto'>
          <table className='table mx-auto table-hover table-clickable-rows'>
            <thead>
              <tr>
                <th />
                <th>
                  <span className='label d-inline-block pr-3'>{`Bill Name`}</span>
                </th>
                <th>
                  <span className='label d-inline-block pr-3'>{`Description`}</span>
                </th>
                <th>
                  <span className='label d-inline-block pr-3'>{`Sponsors`}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {SPONSORED_BILLS_2021.map((billName, i) => {
                return (
                  <tr key={i}>
                    <td></td>
                    <td>{billName}</td>
                    <td>
                      {billInfo?.[billName.toLowerCase()]?.house?.description ??
                        ''}
                    </td>
                    <td>
                      <div className='images-container'>
                        {sponsorshipInfo?.[
                          billName.toLowerCase()
                        ]?.yesVotes.map((legislator) => (
                          <Link
                            to={`/legislator/${getLegislatorUrlParams(
                              legislator
                            )}`}
                            key={legislator.openStatesId}>
                            <a href={'#/'}>{legislator.name}</a>
                          </Link>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default BillSponsors
