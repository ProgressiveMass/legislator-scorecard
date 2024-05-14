import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { navigate } from 'gatsby'
import SortButton from './SortButton'
import ProgressBar from '../../components/progressBar'
import InfoPopover from '../../components/InfoPopover'
import defaultPhoto from '../../images/default-photo.jpg'
import { QUERIES, getLegislatorUrlParams } from '../../utilities'
import styled from 'styled-components'

const StyledRow = styled.tr`
  @media ${QUERIES.phoneAndSmaller} {
    display: grid;
    grid-template-areas: 'name party' 'score score';
    grid-template-columns: 1fr min-content;
    grid-template-rows: 1fr min-content;

    & > td:first-child {
      grid-area: name;
      border-bottom: none;
    }

    & > td[data-label='Party'] {
      grid-area: party;
      border-bottom: none;
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    & > td[data-label='Party'] > span {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    & > td[data-label*='Progressive Rating'] {
      grid-area: score;
      border-top: none;
      align-self: self-end;
    }

    & > td[data-label*='Progressive Rating'] > div {
      max-width: revert !important;
    }
  }
`

const LegislatorRow = ({ legislator, i, chamber, sessionNumber }) => {
  return (
    <StyledRow
      key={legislator.id}
      className='legislator-row'
      onClick={(e) => {
        e.preventDefault()
        navigate(`/legislator/${getLegislatorUrlParams(legislator)}`)
      }}>
      <td data-label={chamber === 'upper' ? 'Senator' : 'Representative'}>
        <a href='#/' className='legislator-row__name'>
          <b>
            <LazyLoad once height='4rem' offset={100}>
              <img
                src={legislator.image}
                alt={'Photo of ' + legislator.name}
                className='legislator-list__profile-img'
                onError={(e) => {
                  if (e.target.src !== window.location.origin + defaultPhoto) {
                    e.target.src = defaultPhoto
                  }
                }}
              />
            </LazyLoad>
            {legislator.name}&nbsp;
            {legislator.specialElectionUrl ? (
              <InfoPopover
                text={`${chamber === 'upper' ? 'Senator' : 'Representative'} ${
                  legislator.givenName
                } is no longer a member of the Massachusetts Legislature. There is a <a target="_blank" href="${
                  legislator.specialElectionUrl
                }">special election</a> pending to elect a replacement.`}
              />
            ) : null}
          </b>
        </a>
      </td>
      <td data-label='Party'>
        <span>{legislator.party.slice(0, 1)}</span>
      </td>
      <td data-label='Progressive Rating (2023-2024)'>
        <div style={{ maxWidth: '300px' }}>
          <ProgressBar data={legislator} sessionNumber={sessionNumber} />
        </div>
      </td>
    </StyledRow>
  )
}

const LegislatorList = (props) => {
  const [sort, setSort] = React.useState(['name', 'desc'])
  const [filter, setFilter] = React.useState('')

  const sortData = (data) => {
    const normalizeSortVal = (val) => {
      if (!val) {
        return 0
      } else if (typeof val === 'string') {
        return val.toLowerCase()
      } else {
        return val
      }
    }

    const normalizeRatingVal = (val, data) => {
      if (data.recordedVotePercentage < 50) {
        return 0
      } else {
        return val
      }
    }

    const sortKey = sort[0]
    const order = sort[1]
    return data.sort((a, b) => {
      let aSort = normalizeSortVal(a[sortKey])
      let bSort = normalizeSortVal(b[sortKey])

      if (sortKey === 'score') {
        // so that people who didnt vote much don't get sorted to the top
        aSort = normalizeRatingVal(aSort, a)
        bSort = normalizeRatingVal(bSort, b)
      }

      if (aSort < bSort) {
        return order === 'asc' ? 1 : -1
      } else if (aSort > bSort) {
        return order === 'asc' ? -1 : 1
      } else {
        // find an appropriate secondary sort
        if (sortKey === 'score') {
          if (normalizeSortVal(a.name) < normalizeSortVal(b.name)) return -1
          else if (normalizeSortVal(a.name) > normalizeSortVal(b.name)) return 1
          // this will never happen...right...
          else {
            return 0
          } // eslint-disable-line brace-style
        } else {
          return normalizeRatingVal(b.score, b) - normalizeRatingVal(a.score, a)
        }
      }
    })
  }

  const handleSort = (currentSort) => {
    if (sort[0] === currentSort) {
      // just switch between asc and desc
      const order = sort[1] === 'asc' ? 'desc' : 'asc'
      setSort([currentSort, order])
    } else {
      setSort([currentSort, 'desc'])
    }
    setTimeout(forceCheck, 1)
  }

  const filterData = (rows = []) => {
    const filterRegex = new RegExp('^' + filter.toLowerCase())
    return rows.filter((r) => {
      const names = r.name.split(',')
      return (
        names.filter((n) => {
          return n.trim().toLowerCase().match(filterRegex)
        }).length > 0
      )
    })
  }

  const data = sortData(filterData(props.data))

  return (
    <div className='white-background pt-5 mb-5'>
      <div className='mx-auto'>
        <div className='d-md-flex align-items-center mb-5 mb-md-4' style={{ maxWidth: '600px' }}>
          <label
            htmlFor='filterTable'
            className='d-inline-block mr-1 mb-0'
            style={{ minWidth: '240px', marginBottom: 0 }}>
            Filter By Legislator Name:
          </label>
          <input
            type='text'
            placeholder='Type a name'
            id='filterTable'
            className='form-control'
            onChange={(e) => {
              setFilter(e.target.value)
              setTimeout(forceCheck, 1)
            }}
          />
        </div>

        <table className='table mx-auto table-hover table-clickable-rows'>
          <thead>
            <tr>
              <th>
                <SortButton onClick={handleSort} sort='name' currentSort={sort} title='Name' />
              </th>
              <th>
                <SortButton onClick={handleSort} sort='party' currentSort={sort} title='Party' />
              </th>
              <th>
                <SortButton
                  onClick={handleSort}
                  sort='score'
                  currentSort={sort}
                  title='Prog. Rating (2023-2024)'
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((legislator, i) => (
              <LegislatorRow
                key={legislator.id}
                legislator={legislator}
                i={i}
                chamber={props.chamber}
                sessionNumber={props.sessionNumber}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

LegislatorList.propTypes = {
  data: PropTypes.array.isRequired,
  chamber: PropTypes.string.isRequired,
  sessionNumber: PropTypes.string.isRequired,
}

export default LegislatorList
