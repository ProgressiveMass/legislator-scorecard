import React from 'react'
import PropTypes from 'prop-types'
import InfoPopover from '../InfoPopover'
import LegislatorTable from './LegislatorTable'

const Cosponsorship = ({ indicator }) => {
  if (!indicator) {
    return <span className="badge badge-clear">N/A</span>
  } else if (indicator === 'Y') {
    return <span className="badge badge-primary">Yes</span>
  } else if (indicator === 'N') {
    return <span className="badge badge-danger">No</span>
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
    url,
  },
  lastName,
}) => {
  return (
    <tr>
      <td className="text-muted" style={{ width: '15%' }}>
        <div className="font-weight-bold">
          {bill_number}&nbsp;
          {showPairedDisclaimer ? (
            <InfoPopover text="This bill has two distinct versions in the House and Senate, but for the purposes of tracking sponsorship we treat them as a single bill." />
          ) : null}
        </div>

        <div>{tags}</div>
      </td>
      <td style={{ width: '30%' }}>
        <div>
          <a href={url} className="font-weight-bold" target="_blank">
            {shorthand_title}
          </a>
        </div>
      </td>
      <td style={{ width: '40%' }} data-label="">
        <p>{description}</p>
      </td>
      <td style={{ width: '15%' }} data-label={`${lastName} Cosponsored?`}>
        <Cosponsorship indicator={yourLegislator} />
      </td>
    </tr>
  )
}

const description = (
  <>
    Cosponsoring legislation is an important way for a legislator to help put
    momentum behind certain bills. To learn more about which bills Progressive
    Mass thinks are most important to support, you can view the{' '}
    <a
      className="font-weight-bold"
      target="_blank"
      href="https://d3n8a8pro7vhmx.cloudfront.net/progressivemass/pages/5393/attachments/original/1553983553/2019_PM_Fact_Sheet_Compilation_March_2019.pdf"
    >
      guide to progressive legislation for the 2019-2020 term.
    </a>
  </>
)

const SponsorshipTable = ({ data: { sponsorship }, lastName }) => {
  return (
    <LegislatorTable
      title="Cosponsored Bills"
      description={description}
      rowData={sponsorship}
      lastName={lastName}
      head={
        <>
          <tr>
            <th style={{ width: '15%' }}>Bill</th>
            <th style={{ width: '30%' }}>Title</th>
            <th style={{ width: '40%' }}>
              Summary from{' '}
              <a href="http://www.progressivemass.com/" target="_blank">
                Progressive Mass
              </a>
            </th>
            <th style={{ width: '15%' }}>{lastName} Cosponsored?</th>
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
