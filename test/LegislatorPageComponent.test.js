import React from "react"
import LegislatorPageComponent from "./../src/routes/legislator/LegislatorPageComponent"
import Renderer from "react-test-renderer"
import * as Sticky from 'react-sticky'

Sticky.Sticky = (props) => <div></div>
Sticky.StickyContainer = (props) => <div></div>
jest.setMock('react-sticky', Sticky)

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

const props = {
  "data": {
    "legislator": {
      "last_name": "Arciero",
      "updated_at": "2017-06-30 09:59:35",
      "sources": [
        {
          "url": "https://malegislature.gov/Legislators/Profile/J_A1"
        }
      ],
      "full_name": "James Arciero",
      "id": "MAL000509",
      "first_name": "James",
      "middle_name": "",
      "district": "Second Middlesex",
      "state": "ma",
      "party": "Democratic",
      "email": "James.Arciero@mahouse.gov",
      "all_ids": [
        "MAL000509"
      ],
      "leg_id": "MAL000509",
      "active": true,
      "photo_url": "https://malegislature.gov/Legislators/Profile/170/J_A1.jpg",
      "roles": [
        {
          "term": "190",
          "end_date": null,
          "district": "Second Middlesex",
          "chamber": "lower",
          "state": "ma",
          "party": "Democratic",
          "type": "member",
          "start_date": null
        },
        {
          "term": "190",
          "committee_id": "MAC000123",
          "chamber": "lower",
          "state": "ma",
          "subcommittee": null,
          "committee": "House Committee on Ways and Means",
          "position": "member",
          "type": "committee member"
        }
      ],
      "url": "https://malegislature.gov/Legislators/Profile/J_A1",
      "created_at": "2017-01-09 06:44:02",
      "chamber": "lower",
      "offices": [
        {
          "fax": null,
          "name": "Capitol office",
          "phone": "617-722-2019",
          "address": "24 Beacon St.\nRoom 172\nBoston, MA, 02133",
          "type": "capitol",
          "email": null
        },
        {
          "fax": null,
          "name": "District Office",
          "phone": null,
          "address": null,
          "type": "district",
          "email": "James.Arciero@mahouse.gov"
        }
      ],
      "suffixes": ""
    },
    "rating": {
      "votes": {
        "voteRating": 78,
        "recordedVotePercentage": 100,
        "cumulative": {
          "democratAverage": 75,
          "republicanAverage": 21,
          "totalAverage": 63,
          "speaker": 78
        }
      },
      "cosponsorship": {
        "legislator": 3,
        "average": 6,
        "total": 16
      }
    },
    "data": [
      {
        "term": "2015-2016",
        "votes": [
          {
            "number": "H2015 5",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00005.pdf",
            "title": "Tax Roll Call",
            "granularTags": "Revenue, Investment, Taxes",
            "tags": [
              "shared prosperity"
            ],
            "description": "Vote on House rules would have required a 2/3 majority to increase taxes, creating a very high threshold to raise revenue for the Commonwealth.",
            "date": "1/29/2015",
            "progressivePosition": "No",
            "yesVotes": "34",
            "noVotes": "121",
            "url": "https://malegislature.gov/Bills/189/H2015",
            "yourLegislator": "+"
          },
          {
            "number": "H2015 12",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00012.pdf",
            "title": "Term Limits for Speaker",
            "granularTags": "Good Gov't., Democracy, Rules Reform: Leadership",
            "tags": [
              "good govt/strong democracy"
            ],
            "description": "This vote on House rules would have retained term limits for the position of Speaker of the House, one of few checks on the vast power of the position. (With this vote, there is now no term limit for the Speaker of the House).",
            "date": "1/29/2015",
            "progressivePosition": "Yes",
            "yesVotes": "45",
            "noVotes": "110",
            "url": "https://malegislature.gov/Bills/189/H2015",
            "yourLegislator": "-"
          },
          {
            "number": "H3400 38",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00038.pdf",
            "title": "Treble Damages",
            "granularTags": "Labor, Wage Theft (Treble Damages)",
            "tags": [
              "shared prosperity"
            ],
            "description": "Vote would have repealed a 2008 law where workers, when denied their wages, are compensated by employers' payment of 3x their wages. This is an important worker protection, disincentivizing employers from wage theft.",
            "date": "4/28/2015",
            "progressivePosition": "No",
            "yesVotes": "37",
            "noVotes": "122",
            "url": "https://malegislature.gov/Bills/189/H3400",
            "yourLegislator": "+"
          },
          {
            "number": "H3400 43",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00043.pdf",
            "title": "Further to 575",
            "granularTags": "Housing, Immigration",
            "tags": [
              "all means all",
              "shared prosperity"
            ],
            "description": "Vote was to send to study an amendment (575) that would prohibit mixed-status immigrant families from living in public housing.",
            "date": "4/29/2015",
            "progressivePosition": "Yes",
            "yesVotes": "115",
            "noVotes": "44",
            "url": "https://malegislature.gov/Bills/189/H3400",
            "yourLegislator": "+"
          },
          {
            "number": "H3400 48",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00048.pdf",
            "title": "Earned Sick Time Date Change",
            "granularTags": "Labor, Earned Sick Time",
            "tags": [
              "shared prosperity"
            ],
            "description": "Vote was to delay the implementation of Earned Sick Time for workers, a law which was passed by the voters on the 2014 ballot.",
            "date": "7/29/2015",
            "progressivePosition": "No",
            "yesVotes": "45",
            "noVotes": "114",
            "url": "https://malegislature.gov/Bills/189/H3400",
            "yourLegislator": "+"
          },
          {
            "number": "H3650 60",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00060.pdf",
            "title": "Correctional / Prisoners Legal Services",
            "granularTags": "Criminal Justice",
            "tags": [
              "all means all"
            ],
            "description": "Vote was to override the Governor's veto of increased funding for prisoner legal services.",
            "date": "7/29/2015",
            "progressivePosition": "Yes",
            "yesVotes": "120",
            "noVotes": "34",
            "url": "https://malegislature.gov/Bills/189/H3650",
            "yourLegislator": "+"
          },
          {
            "number": "H3650 64",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00064.pdf",
            "title": "UMASS Veto override",
            "granularTags": "Public Education, UMass",
            "tags": [
              "shared prosperity"
            ],
            "description": "Vote was to override the Governor's veto of increased funding for the UMass higher education system.",
            "date": "7/29/2015",
            "progressivePosition": "Yes",
            "yesVotes": "140",
            "noVotes": "16",
            "url": "https://malegislature.gov/Bills/189/H3650",
            "yourLegislator": "+"
          },
          {
            "number": "H3650 72",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00072.pdf",
            "title": "Mass. Rental Voucher Program",
            "granularTags": "Housing, Rental Vouchers",
            "tags": [
              "shared prosperity"
            ],
            "description": "Vote was to override the Governor's veto of increased funding for the Massachusetts Rental Voucher Program (MRVP), to provide affordable housing to low-income families.",
            "date": "7/29/2015",
            "progressivePosition": "Yes",
            "yesVotes": "134",
            "noVotes": "20",
            "url": "https://malegislature.gov/Bills/189/H3650",
            "yourLegislator": "+"
          },
          {
            "number": "H3650 74",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00074.pdf",
            "title": "Birth through Preschool",
            "granularTags": "Public Education, Early Childhood",
            "tags": [
              "shared prosperity"
            ],
            "description": "Vote was to override the Governor's veto of increased funding for early childhood education programs.",
            "date": "7/29/2015",
            "progressivePosition": "Yes",
            "yesVotes": "146",
            "noVotes": "10",
            "url": "https://malegislature.gov/Bills/189/H3650",
            "yourLegislator": "+"
          },
          {
            "number": "H3659 102",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00102.pdf",
            "title": "Sales Tax holiday",
            "granularTags": "Revenue, Sales Tax Holiday",
            "tags": [
              "shared prosperity"
            ],
            "description": "Vote would establish a two-day sales tax holiday during Aug. 2015, reducing state revenue by approximately $50 million, with dubious economic benefits.",
            "date": "7/30/2015",
            "progressivePosition": "No",
            "yesVotes": "136",
            "noVotes": "20",
            "url": "https://malegislature.gov/Bills/189/H3659",
            "yourLegislator": "-"
          },
          {
            "number": "H3755 161",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00161.pdf",
            "title": "Further to 3",
            "granularTags": "Criminal Justice Reform, Mandatory Minimums",
            "tags": [
              "all means all"
            ],
            "description": "Vote was to send to study an amendment establishing a mandatory minimum sentence for trafficking fentanyl. Mandatory minimum sentences for drug-related crimes have a disproportionate impact on minority communities, contribute to prison overcrowding and costs, and are not effective deterrents to crime.",
            "date": "10/7/2015",
            "progressivePosition": "Yes",
            "yesVotes": "109",
            "noVotes": "43",
            "url": "https://malegislature.gov/Bills/189/H3755",
            "yourLegislator": "+"
          },
          {
            "number": "S2015 165",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00165.pdf",
            "title": "Clear Title to Property",
            "granularTags": "Housing, Banks, Foreclosures",
            "tags": [
              "all means all"
            ],
            "description": "Vote was to allow banks to clear titles of illegally foreclosed homes, and limit wrongly foreclosed homeowners' ability to sue banks that illegally foreclosed their homes. Bill benefits big banks and title insurance companies, at the expense of often financially struggling former homeowners.",
            "date": "10/14/2015",
            "progressivePosition": "No",
            "yesVotes": "127",
            "noVotes": "23",
            "url": "https://malegislature.gov/Bills/189/S2015",
            "yourLegislator": "-"
          },
          {
            "number": "H3854 175",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00175.pdf",
            "title": "Providing for the establishment of a comprehensive adaptation management plan in response to climate change",
            "granularTags": "Economy, Alternative Energy, Solar",
            "tags": [
              "infrastructure/environment"
            ],
            "description": "This vote (the House \"solar netmetering bill\") reduces the netmetering rates for solar owners, cuts subsidies for solar installed on affordable housing and community solar, and eliminates grandfathering of the net metering rate of current solar installations. This bill moves MA away from a progressive energy policy, aggressively combating climate change, and supporting solar industry jobs.",
            "date": "11/17/15",
            "progressivePosition": "No",
            "yesVotes": "151",
            "noVotes": "2",
            "url": "https://malegislature.gov/Bills/189/H3854",
            "yourLegislator": "-"
          },
          {
            "number": "S2021 183",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00183.pdf",
            "title": "An Act relative to motor vehicle license suspension",
            "granularTags": "Criminal Justice, Jobs, War on Drugs",
            "tags": [
              "all means all",
              "shared prosperity"
            ],
            "description": "This vote repeals the law that automatically suspends drivers' licenses from persons convicted of drug crimes. It also removes the $500 fine for license reinstatement. Loss of driving privileges creates barriers to employment and successful re-entry into the community. Fines and fees disproportionately impact low-income persons and communities of color.",
            "date": "1/6/2016",
            "progressivePosition": "YES",
            "yesVotes": "150",
            "noVotes": "0",
            "url": "https://malegislature.gov/Bills/189/S2021",
            "yourLegislator": "+"
          },
          {
            "number": "H4200 222",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00222.pdf",
            "title": "612 further\r\n",
            "granularTags": "Revenue, Taxation",
            "tags": [
              "shared prosperity"
            ],
            "description": "Vote was on defeating a proposal to roll back the sales tax to 5% by sending it to study. Rolling back the sales tax would have reduced state revenue and led to future budget cuts and a continuation of chronic underinvestment in social priorities.\r\n(Roll Call #222, Bill H4200, Amdt 612.1,  4/25/16, Progressive Position: YES)\r\n.",
            "date": "4/25/2016",
            "progressivePosition": "Yes",
            "yesVotes": "116",
            "noVotes": "42",
            "url": "https://malegislature.gov/Bills/189/H4200",
            "yourLegislator": "+"
          },
          {
            "number": "H4200 227",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00227.pdf",
            "title": "Secure Funding for Secure Communities",
            "granularTags": "Immigration, Policing",
            "tags": [
              "all means all"
            ],
            "description": "Vote was on banning towns from receiving government aid if they refuse to cooperate with the federal anti-immigrant Secure Communities program. The bill could harm immigrant families across the Commonwealth and make communities less safe by discouraging people from reporting crimes out of fear for themselves and their families.",
            "date": "4/25/2016",
            "progressivePosition": "No",
            "yesVotes": "34",
            "noVotes": "124",
            "url": "https://malegislature.gov/Bills/189/H4200",
            "yourLegislator": "+"
          },
          {
            "number": "H4200 237",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00237.pdf",
            "title": "Section 12J Violation Funding Prohibition",
            "granularTags": "Reproductive Rights, Health Care",
            "tags": [
              "all means all"
            ],
            "description": "Vote was on banning state money from going to organizations that experiment on human fetuses. The amendment was designed as an attack on Planned Parenthood.",
            "date": "4/25/2016",
            "progressivePosition": "No",
            "yesVotes": "40",
            "noVotes": "117",
            "url": "https://malegislature.gov/Bills/189/H4200",
            "yourLegislator": "+"
          },
          {
            "number": "H3933 253",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00253.pdf",
            "title": "Fair Share Amendment\r\n",
            "granularTags": "Taxation, Revenue, Education, Transportation",
            "tags": [
              "shared prosperity"
            ],
            "description": "Vote on the the Fair Share Amendment, which would create a surtax on income above $1 million, with the revenue earmarked for education and transportation spending.",
            "date": "5/18/2016",
            "progressivePosition": "Yes",
            "yesVotes": "102",
            "noVotes": "50",
            "url": "https://malegislature.gov/Bills/189/H3933",
            "yourLegislator": "+"
          },
          {
            "number": "S735 260",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00260.pdf",
            "title": "Exemption for multiple capacity showers and locker rooms",
            "granularTags": "LGBTQ Rights",
            "tags": [
              "all means all"
            ],
            "description": "Vote was on allowing for discrimination against transgender individuals in multiple-capacity showers and locker rooms, continuing toxic stereotypes that have no basis in reality.",
            "date": "6/1/2016",
            "progressivePosition": "No",
            "yesVotes": "45",
            "noVotes": "110",
            "url": "https://malegislature.gov/Bills/189/S735",
            "yourLegislator": "+"
          },
          {
            "number": "S735 273",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00273.pdf",
            "title": "Gender identity amendment\r\n",
            "granularTags": "LGBTQ Rights",
            "tags": [
              "all means all"
            ],
            "description": "Vote was an attempt to sow confusion around the transgender accommodations law and its enforcement by redundantly criminalizing acts of trespassing, attempting to prey upon toxic stereotypes about transgender persons, with no relation to reality.",
            "date": "6/1/2016",
            "progressivePosition": "No",
            "yesVotes": "63",
            "noVotes": "88",
            "url": "https://malegislature.gov/Bills/189/S735",
            "yourLegislator": "+"
          },
          {
            "number": "H543 286",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00286.pdf",
            "title": "An act relative to disclosure of top contributors for independence expenditures or electioneering communications",
            "granularTags": "Campaign Finance",
            "tags": [
              "good govt/strong democracy"
            ],
            "description": "Vote was on requiring direct mailings and billboards to list the top five donors with contributions over $5,000 when a group buys a political ad.",
            "date": "6/22/2016",
            "progressivePosition": "Yes",
            "yesVotes": "146",
            "noVotes": "10",
            "url": "https://malegislature.gov/Bills/189/H543",
            "yourLegislator": "+"
          },
          {
            "number": "S2407 293",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00293.pdf",
            "title": "An act relative to transgender discrimination\r\n",
            "granularTags": "LGBTQ Rights\r\n",
            "tags": [
              "all means all"
            ],
            "description": "Vote was on accepting the Conference Committee report on the transgender rights bill, which would guarantee equal access to public places for all regardless of gender identity.",
            "date": "7/7/2016",
            "progressivePosition": "Yes",
            "yesVotes": "118",
            "noVotes": "36",
            "url": "https://malegislature.gov/Bills/189/S2407",
            "yourLegislator": "+"
          },
          {
            "number": "H4488 304",
            "rollCallUrl": "http://www.mass.gov/legis/journal/RollCallPdfs/189/00304.pdf",
            "title": "Governor's amendment to An act relative to the federal REAL ID law",
            "granularTags": "Immigration",
            "tags": [
              "all means all"
            ],
            "description": "Vote was on prohibiting undocumented immigrants from obtaining state-issued IDs and creating additional hurdles for documented immigrants to do so.",
            "date": "7/14/2016",
            "progressivePosition": "No",
            "yesVotes": "125",
            "noVotes": "34",
            "url": "https://malegislature.gov/Bills/189/H4488",
            "yourLegislator": "-"
          }
        ]
      },
      {
        "term": "2017-2018",
        "cosponsorship": [
          {
            "title": "An Act to improve the Commonwealth’s economy with a strong minimum wage and a strong tipped minimum wage",
            "description": "Raises minimum wage to $15 by 2021 and indexes it to inflation. Ensures that tipped employees’ wages plus tips equal the new strengthened minimum wage.",
            "number": "HD2719/SD984",
            "tags": [
              "shared prosperity"
            ],
            "finalNumber": "H2365",
            "url": "https://malegislature.gov/Bills/190/H2365",
            "chamber": "lower",
            "showPairedDisclaimer": false,
            "yourLegislator": "N"
          },
          {
            "title": "An Act establishing a paid family and medical leave insurance program",
            "description": "Makes employees eligible for job-protected paid leave to recover from a serious illness or injury, to care for a seriously ill or injured family member, or to care for a new child.",
            "number": "HD2573/SD1768",
            "tags": [
              "shared prosperity"
            ],
            "finalNumber": "H2172",
            "url": "https://malegislature.gov/Bills/190/H2172",
            "chamber": "lower",
            "showPairedDisclaimer": false,
            "yourLegislator": "N"
          },
          {
            "title": "An Act promoting housing and sustainable development",
            "description": "Upgrades state’s zoning laws to encourage more affordable housing and transit-oriented, walkable development, and promotes inclusionary zoning  practices.",
            "number": "SD1609",
            "tags": [
              "shared prosperity"
            ],
            "finalNumber": "S81",
            "url": "https://malegislature.gov/Bills/190/S81",
            "chamber": "upper",
            "showPairedDisclaimer": false,
            "yourLegislator": "N"
          },
          {
            "title": "An Act establishing Medicare for All in Massachusetts",
            "description": "Establishes a single payer system, in which the state provides health care to all residents as a right.",
            "number": "HD3249/SD698",
            "tags": [
              "shared prosperity"
            ],
            "finalNumber": "H2987",
            "url": "https://malegislature.gov/Bills/190/H2987",
            "chamber": "lower",
            "showPairedDisclaimer": false,
            "yourLegislator": "N"
          },
          {
            "title": "An Act modernizing the Foundation Budget for the 21st century",
            "description": "Requires the state to implement the recommendations of the the 2015 Foundation Budget Review Commission on K-12 education.",
            "number": "SD1905",
            "tags": [
              "shared prosperity"
            ],
            "finalNumber": "S223",
            "url": "https://malegislature.gov/Bills/190/S223",
            "chamber": "upper",
            "showPairedDisclaimer": false,
            "yourLegislator": "N"
          },
          {
            "title": "An Act making public higher education in Massachusetts free for residents of the state",
            "description": "Establishes free college tuition and fees for all Massachusetts residents.",
            "number": "HD771/SD945",
            "tags": [
              "shared prosperity"
            ],
            "finalNumber": "H633",
            "url": "https://malegislature.gov/Bills/190/H633",
            "chamber": "lower",
            "showPairedDisclaimer": true,
            "yourLegislator": "Y"
          },
          {
            "title": "An Act for justice reinvestment",
            "description": "Enacts comprehensive justice reform, complementing reductions in sentencing with jobs training, youth jobs, and pre-apprenticeship programs.",
            "number": "HD2714/SD1128",
            "tags": [
              "all means all",
              "shared prosperity"
            ],
            "finalNumber": "H2308",
            "url": "https://malegislature.gov/Bills/190/H2308",
            "chamber": "lower",
            "showPairedDisclaimer": false,
            "yourLegislator": "N"
          },
          {
            "title": "An Act to eliminate mandatory minimum sentences related to drug offenses",
            "description": "Restores judicial discretion in sentencing for nonviolent drug charges, reducing the economic and social costs of extended prison terms.",
            "number": "HD1794/SD500",
            "tags": [
              "all means all"
            ],
            "finalNumber": "H741",
            "url": "https://malegislature.gov/Bills/190/H741",
            "chamber": "lower",
            "showPairedDisclaimer": false,
            "yourLegislator": "N"
          },
          {
            "title": "An Act to protect the civil rights and safety of all Massachusetts residents (“Safe Communities Act”)",
            "description": "Prohibits the use of state resources for mass deportations or deportation raids, limits local and state police collaboration with federal immigration agents, and prohibits state support for Muslim registry.",
            "number": "HD3052/SD1596",
            "tags": [
              "all means all"
            ],
            "finalNumber": "H3269",
            "url": "https://malegislature.gov/Bills/190/H3269",
            "chamber": "lower",
            "showPairedDisclaimer": false,
            "yourLegislator": "N"
          },
          {
            "title": "An Act to reduce the criminalization of poverty",
            "description": "Eliminates or reduces numerous fees, such as parole supervision, and ensures indigent residents are not jailed or given unreasonable fees simply because they struggle to pay court-related fines.",
            "number": "HD2929/SD1389",
            "tags": [
              "all means all"
            ],
            "finalNumber": "H2359",
            "url": "https://malegislature.gov/Bills/190/H2359",
            "chamber": "lower",
            "showPairedDisclaimer": false,
            "yourLegislator": "N"
          },
          {
            "title": "An Act relative to advancing contraceptive coverage and economic security in our state (ACCESS)",
            "description": "Updates MA’s contraceptive coverage equity law to require insurance carriers to provide all contraceptive methods without a copay.",
            "number": "HD450/SD939",
            "tags": [
              "all means all"
            ],
            "finalNumber": "H536",
            "url": "https://malegislature.gov/Bills/190/H536",
            "chamber": "lower",
            "showPairedDisclaimer": false,
            "yourLegislator": "Y"
          },
          {
            "title": "An Act automatically registering eligible voters and enhancing safeguards against fraud",
            "description": "Modernizes voter registration by automatically registering citizens who interact with government agencies (\"opt-out\" instead of \"opt-in\") and ensures that such information is handled in a secure fashion.",
            "number": "HD2500/SD1791",
            "tags": [
              "good govt/strong democracy"
            ],
            "finalNumber": "H2091",
            "url": "https://malegislature.gov/Bills/190/H2091",
            "chamber": "lower",
            "showPairedDisclaimer": false,
            "yourLegislator": "Y"
          },
          {
            "title": "An Act creating 21st Century Massachusetts clean energy jobs",
            "description": "Establishes a climate adaptation and management program, sets greenhouse gas reduction targets for 2030 and 2040, accelerates the state’s Renewable Portfolio Standard (RPS), and increases commitment to offshore wind.",
            "number": "SD2049",
            "tags": [
              "infrastructure/environment"
            ],
            "finalNumber": "S1880",
            "url": "https://malegislature.gov/Bills/190/S1880",
            "chamber": "upper",
            "showPairedDisclaimer": false,
            "yourLegislator": "N"
          },
          {
            "title": "An Act relative to solar power and the green economy",
            "description": "Accelerates the state’s commitment to clean energy (RPS increase) and sets 25% by 2030 solar target.",
            "number": "HD2157/SD1632",
            "tags": [
              "infrastructure/environment"
            ],
            "finalNumber": "H2706",
            "url": "https://malegislature.gov/Bills/190/H2706",
            "chamber": "lower",
            "showPairedDisclaimer": false,
            "yourLegislator": "N"
          },
          {
            "title": "An Act clarifying authorities and responsibilities of the Department of Public Utilities",
            "description": "Holds gas companies to a high standard with regards to new infrastructure and prevents massive public subsidy of new interstate gas pipelines.",
            "number": "HD3204/SD1727",
            "tags": [
              "infrastructure/environment"
            ],
            "finalNumber": "H3400",
            "url": "https://malegislature.gov/Bills/190/H3400",
            "chamber": "lower",
            "showPairedDisclaimer": false,
            "yourLegislator": "N"
          },
          {
            "title": "An Act to promote green infrastructure, reduce greenhouse gas emissions, and create jobs",
            "description": "Enacts revenue-positive carbon pricing. 80% is rebated to residents while 20% is invested in green infrastructure, with a carve-out for low-income communities.",
            "number": "HD1504/SD1021",
            "tags": [
              "infrastructure/environment"
            ],
            "finalNumber": "H1726",
            "url": "https://malegislature.gov/Bills/190/H1726",
            "chamber": "lower",
            "showPairedDisclaimer": true,
            "yourLegislator": "N"
          }
        ],
        "votes": []
      }
    ]
  },
  "legislator": {
    "last_name": "Arciero",
    "updated_at": "2017-06-30 09:59:35",
    "sources": [
      {
        "url": "https://malegislature.gov/Legislators/Profile/J_A1"
      }
    ],
    "full_name": "James Arciero",
    "id": "MAL000509",
    "first_name": "James",
    "middle_name": "",
    "district": "Second Middlesex",
    "state": "ma",
    "party": "Democratic",
    "email": "James.Arciero@mahouse.gov",
    "all_ids": [
      "MAL000509"
    ],
    "leg_id": "MAL000509",
    "active": true,
    "photo_url": "https://malegislature.gov/Legislators/Profile/170/J_A1.jpg",
    "roles": [
      {
        "term": "190",
        "end_date": null,
        "district": "Second Middlesex",
        "chamber": "lower",
        "state": "ma",
        "party": "Democratic",
        "type": "member",
        "start_date": null
      },
      {
        "term": "190",
        "committee_id": "MAC000123",
        "chamber": "lower",
        "state": "ma",
        "subcommittee": null,
        "committee": "House Committee on Ways and Means",
        "position": "member",
        "type": "committee member"
      }
    ],
    "url": "https://malegislature.gov/Legislators/Profile/J_A1",
    "created_at": "2017-01-09 06:44:02",
    "chamber": "lower",
    "offices": [
      {
        "fax": null,
        "name": "Capitol office",
        "phone": "617-722-2019",
        "address": "24 Beacon St.\nRoom 172\nBoston, MA, 02133",
        "type": "capitol",
        "email": null
      },
      {
        "fax": null,
        "name": "District Office",
        "phone": null,
        "address": null,
        "type": "district",
        "email": "James.Arciero@mahouse.gov"
      }
    ],
    "suffixes": ""
  },
  "chamber": "lower",
  "rating": {
    "votes": {
      "voteRating": 78,
      "recordedVotePercentage": 100,
      "cumulative": {
        "democratAverage": 75,
        "republicanAverage": 21,
        "totalAverage": 63,
        "speaker": 78
      }
    },
    "cosponsorship": {
      "legislator": 3,
      "average": 6,
      "total": 16
    }
  }
}


it("renders correctly", () => {
  const component = Renderer
  .create(<LegislatorPageComponent {...props} />)
  expect(component.toJSON()).toMatchSnapshot()
})
