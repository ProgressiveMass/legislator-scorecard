import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import unorm from 'unorm'

import SortButton from './SortButtonComponent'
import ProgressBarWContext from './../legislator/ProgressBarWContextComponent'

class StateRepTable extends React.Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.sortData = this.sortData.bind(this)
    this.setSort = this.setSort.bind(this)
  }

  state = {
    sort : ['name', 'desc'],
    filter : ''
  }

  renderRow (d, i) {
    return (
      <tr key={d.name}
        onClick={(e) => { e.preventDefault(); this.props.history.push(`/legislator/${d.id}`) }}>
        <td>{i + 1}</td>
        <td data-label={this.props.chamber === 'upper' ? 'Senator' : 'Representative'}>
          <a href='#'><b>{d.name}</b></a>
        </td>
        <td data-label='Party'>{d.party.slice(0, 1)}</td>
        <td
          data-label='Progressive Rating (2015-2016)'
          style={{ verticalAlign : 'middle' }}>
          <div style={{ maxWidth: '300px' }}>
            <ProgressBarWContext data={d} />
          </div>
        </td>
      </tr>
    )
  }

  sortData (data) {
    const normalizeSortVal = (val) => {
      if (!val) {
        return 0
      } else if (typeof val === 'string') {
        return unorm.nfd(val.toLowerCase())
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

    const sortKey = this.state.sort[0]
    const order = this.state.sort[1]
    return data.sort((a, b) => {
      let aSort = normalizeSortVal(a[sortKey])
      let bSort = normalizeSortVal(b[sortKey])

      if (sortKey === 'voteRating') {
        // so that people who didnt vote much don't get sorted to the top
        aSort = normalizeRatingVal(aSort, a)
        bSort = normalizeRatingVal(bSort, b)
      }

      if (aSort < bSort) {
        return (order === 'asc' ? 1 : -1)
      } else if (aSort > bSort) {
        return (order === 'asc' ? -1 : 1)
      } else {
        // find an appropriate secondary sort
        if (sortKey === 'voteRating') {
          if (normalizeSortVal(a.name) < normalizeSortVal(b.name)) return -1
          else if (normalizeSortVal(a.name) > normalizeSortVal(b.name)) return 1
          // this will never happen...right...
          else return 0
        } else {
          return normalizeRatingVal(b.voteRating, b) - normalizeRatingVal(a.voteRating, a)
        }
      }
    })
  }

  setSort (sort) {
    if (this.state.sort[0] === sort) {
     // just switch between asc and desc
      const order = this.state.sort[1] === 'asc' ? 'desc' : 'asc'
      this.setState({ sort : [sort, order] })
    } else {
      this.setState({ sort : [sort, 'desc'] })
    }
  }

  filterData (rows) {
    const filterRegex = new RegExp('^' + this.state.filter.toLowerCase())
    return rows.filter((r) => {
      const names = r.name.split(',')
      return names.filter((n) => {
        return n.trim().toLowerCase().match(filterRegex)
      }).length > 0
    })
  }

  render () {
    // sort data
    const data = this.sortData(this.filterData(this.props.data))

    return (<div className='white-floated pt-5 mb-5'>
      <div className='mx-auto'>
        <div className='mb-3 mb-md-4'>
          <p>
            <a href='http://www.progressivemass.com/scorecards_and_roll_calls' target='_blank'>
              Learn more about how legislators are scored.
            </a>
          </p>
        </div>
        <div className='d-md-flex align-items-center mb-5 mb-md-4' style={{ maxWidth : '600px' }}>
          <label htmlFor='filterTable' className='d-inline-block mr-1' style={{ minWidth: '240px' }}>Filter By Legislator Name:</label>
          <input
            type='text'
            placeholder='type a name'
            id='filterTable'
            className='form-control'
            onChange={(e) => { this.setState({ filter : e.target.value }) }}
          />
        </div>

        <table className='table mx-auto table-hover table-clickable-rows'>
          <thead>
            <tr>
              <th />
              <th>
                <SortButton onClick={this.setSort} sort='name' currentSort={this.state.sort} title='Name' />
              </th>
              <th>
                <SortButton onClick={this.setSort} sort='party' currentSort={this.state.sort} title='Party' />
              </th>
              <th>
                <SortButton onClick={this.setSort} sort='voteRating' currentSort={this.state.sort} title='Prog. Rating (2015-2016)' />
              </th>

            </tr>
          </thead>
          <tbody>
            {data.map(this.renderRow)}
          </tbody>
        </table>
      </div>

    </div>)
  }
}

StateRepTable.propTypes = {
  data : PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  chamber : PropTypes.string.isRequired
}

export default withRouter(StateRepTable)
