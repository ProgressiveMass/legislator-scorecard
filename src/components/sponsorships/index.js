import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../components/layout'
import LegislatorTable from '../../components/legislator/LegislatorTable'
import ListPageHeading from '../../components/ListPageHeading'
import InfoPopover from '../../components/InfoPopover'
import { consolidateBillNumbers } from '../../utilities'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 4rem;
  gap: 1rem;
  justify-items: center;
  align-items: center;

  @media (max-width: 950px) {
    padding: 0 2rem;
  }
`

const SponsorshipRow = (props) => {
  const { tags, rowData, isCurrentYear, familyName } = props
  const {
    bill_number,
    showPairedDisclaimer,
    shorthand_title,
    description,
    yourLegislator,
    url,
    otherNames,
  } = rowData

  // TODO: replace this with data from GoogleSheets, for now just hardcoding
  const isUniversalSchoolMeals = shorthand_title.toLowerCase().includes('meals')
  return (
    <tr>
      <td className='text-muted' style={{ width: '15%' }}>
        <div className='font-weight-bold'>
          {otherNames ? [bill_number, ...otherNames.filter(Boolean)].join(' / ') : bill_number}
          &nbsp;
          {showPairedDisclaimer ? (
            <InfoPopover text='This bill has two distinct versions in the House and Senate, but for the purposes of tracking sponsorship we treat them as a single bill.' />
          ) : null}
        </div>

        <div>{tags}</div>
      </td>
      <td style={{ width: '25%', fontWeight: 'bold' }}>
        <div>
          <Link to={`/sponsorships/${bill_number}`}>{`${shorthand_title}`}</Link>
        </div>
      </td>
      <td style={{ width: '10%', textAlign: 'center' }}>
        <span
          className={`badge ${isUniversalSchoolMeals ? 'badge-green' : 'badge-gray'}`}
          style={{ fontSize: '.9rem' }}>
          {isUniversalSchoolMeals ? 'Yes!' : 'Not Yet'}
        </span>
      </td>

      <td style={{ width: '50%' }} data-label=''>
        <p>{description}</p>
      </td>
    </tr>
  )
}

export default function SponsoredBills({ pageContext: { sponsoredBills, legislationData } }) {
  return (
    <Layout>
      <div className='tinted-background'>
        <Container>
          <ListPageHeading>All Sponsored bills</ListPageHeading>
          <div className='bill-list'>
            <LegislatorTable
              title='Sponsored Bills'
              description={''}
              rowData={consolidateBillNumbers(
                sponsoredBills.map(([billNumber, billData]) => {
                  return {
                    otherNames: [''],
                    ...billData,
                  }
                }),
                'name'
              )}
              familyName={''}
              isCurrentYear={true}
              head={
                <>
                  <tr>
                    <th style={{ width: '15%' }}>Bill</th>
                    <th style={{ width: '25%' }}>Title</th>
                    <th style={{ width: '10%' }}>Passed?</th>
                    <th style={{ width: '50%' }}>
                      Summary from{' '}
                      <a href='http://www.progressivemass.com/' target='_blank' rel='noreferrer'>
                        Progressive Mass
                      </a>
                    </th>
                  </tr>
                </>
              }
              rowComponent={SponsorshipRow}
            />
          </div>
        </Container>
      </div>
    </Layout>
  )
}
