import React from 'react'
import { Link } from 'gatsby'

export default function SponsoredBills({ pageContext: { sponsoredBills } }) {
  return (
    <>
      {sponsoredBills.map((bill) => {
        const [billNumber, billData] = bill
        return (
          <div key={billNumber}>
            <Link to={`/sponsorships/${billNumber}`}>{billNumber}</Link>
          </div>
        )
      })}
    </>
  )
}
