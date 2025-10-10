import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import InfoPopover from '../InfoPopover'
import LegislatorTable from './LegislatorTable'
import { QUERIES } from '../../utilities'

const StyledTableRow = styled.tr`
  border-bottom: 1px solid #eee;
  @media ${QUERIES.tabletAndSmaller} {
    margin: 15px;
    border-radius: 15px;
    background-color: #f9f9f9;
  }
`

const billWidth = 15
const titleWidth = 25
const statusWidth = 15
const summaryWidth = 45
const summaryWidthCurrentYear = 30
const cosponsoredWidth = 15

const Cosponsorship = ({ indicator, isCurrentSponsorshipYear }) => {
  if (indicator === false) {
    if (isCurrentSponsorshipYear) {
      return <span className='badge badge-danger'>Not Yet</span>
    } else {
      return <span className='badge badge-danger'>No</span>
    }
  } else if (indicator === true) {
    return <span className='badge badge-primary'>Yes</span>
  } else {
    return <span className='badge badge-clear'>N/A</span>
  }
}

const SponsorshipRow = ({
  tags,
  rowData: {
    bill_number,
    showPairedDisclaimer,
    shorthand_title,
    description,
    yourLegislator,
    houseStatus,
    senateStatus
  },
  isCurrentYear,
  familyName,
}) => {

  return (
    <StyledTableRow>
      <td className='text-muted' style={{ width: `${billWidth}%` }}>
        <div className='font-weight-bold'>
          {bill_number}&nbsp;
          {showPairedDisclaimer ? (
            <InfoPopover text='This bill has two distinct versions in the House and Senate, but for the purposes of tracking sponsorship we treat them as a single bill.' />
          ) : null}
        </div>

        <div>{tags}</div>
      </td>
      <td style={{ width: `${titleWidth}%` }}>
        <div>
          <a href={`/sponsorships/${bill_number}`} className='font-weight-bold'>
            {shorthand_title}
          </a>
        </div>
      </td>
      {isCurrentYear && (<td
        id='status'
        data-label='Status'
        style={{ width: `${statusWidth}%` }}>
          <div><span style={{"font-weight": "bold"}}>House:</span> {houseStatus}</div>
          <div><span style={{"font-weight": "bold"}}>Senate:</span> {senateStatus}</div>
      </td>)}
      <td style={{ width: `${isCurrentYear ? summaryWidthCurrentYear : summaryWidth}%` }} data-label=''>
        <p>{description}</p>
      </td>
      <td style={{ width: `${cosponsoredWidth}%` }} data-label={`${familyName} Cosponsored?`}>
        <Cosponsorship
          indicator={yourLegislator}
          isCurrentSponsorshipYear={isCurrentYear}
        />
      </td>
    </StyledTableRow>
  )
}

const description = (
  <>
    Cosponsoring legislation is an important way for a legislator to help put momentum behind
    certain bills. To learn more about which bills Progressive Mass thinks are most important to
    support, you can view{' '}
    <a
      className='font-weight-bold'
      target='_blank'
      href='http://www.progressivemass.com/agenda/'
      rel='noreferrer'>
      our Legislative Agenda
    </a>
    .
  </>
)

const SponsorshipTable = ({ data: { sponsorship, isCurrentSponsorshipYear }, familyName }) => {
  return (
    <LegislatorTable
      title='Cosponsored Bills'
      description={description}
      rowData={sponsorship}
      familyName={familyName}
      isCurrentYear={isCurrentSponsorshipYear}
      head={
        <>
          <tr>
            <th style={{ width: `${billWidth}%` }}>Bill</th>
            <th style={{ width: `${titleWidth}%` }}>Title</th>
            {isCurrentSponsorshipYear && <th style={{ width: `${statusWidth}%` }}>Status</th>}
            <th style={{ width: `${isCurrentSponsorshipYear ? summaryWidthCurrentYear : summaryWidth}%` }}>
              Summary from{' '}
              <a href='http://www.progressivemass.com/' target='_blank' rel='noreferrer'>
                Progressive Mass
              </a>
            </th>
            <th style={{ width: `${cosponsoredWidth}%` }}>{familyName} Cosponsored?</th>
          </tr>
        </>
      }
      rowComponent={SponsorshipRow}
    />
  )
}

export default SponsorshipTable

SponsorshipTable.propTypes = {
  data: PropTypes.object.isRequired,
  legislatorName: PropTypes.string.isRequired,
}
