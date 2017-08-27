import React, { PropTypes } from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { withRouter } from 'react-router'
import unorm from 'unorm'

import SortButton from '../all-legislators/SortButtonComponent'
import ProgressBarWContext from './../legislator/ProgressBarWContextComponent'

class FilterableLegislatorList extends React.Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.sortData = this.sortData.bind(this)
    this.setSort = this.setSort.bind(this)
    this.filterData = this.filterData.bind(this)
    this.toggleCPFilter = this.toggleCPFilter.bind(this)
    this.isFilterActive = this.isFilterActive.bind(this)
  }

  state = {
    sort: ['lastName', 'desc'],
    nameFilter: null,
    cpFilter: [null, null]
  }

  renderRow (r, i) {
    return (
      <tr
        key={r.legId}
        onClick={e => {
          e.preventDefault()
          this.props.history.push(`/legislator/${r.legId}`)
        }}
      >
        <td>{i + 1}</td>
        <td
          data-label={
            r.chamber === 'upper' ? 'Senator' : 'Representative'
          }
        >
          <a href='#'><b>{r.lastName}, {r.firstName}</b></a>
        </td>
        <td data-label='Chamber'>
          {r.chamber === 'upper' ? 'Senate' : 'House'}
        </td>
        <td data-label='Party'>{r.party.slice(0, 1)}</td>
        <td
          data-label='Progressive Rating (2015-2016)'
          style={{ verticalAlign: 'middle' }}
        >
          <div style={{ maxWidth: '300px' }}>
            <ProgressBarWContext data={r} />
          </div>
        </td>
      </tr>
    )
  }

  sortData (data) {
    const normalizeSortVal = val => {
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
        return order === 'asc' ? 1 : -1
      } else if (aSort > bSort) {
        return order === 'asc' ? -1 : 1
      } else {
        // find an appropriate secondary sort
        if (sortKey === 'voteRating') {
          if (normalizeSortVal(a.lastName) < normalizeSortVal(b.lastName)) return -1
          else if (normalizeSortVal(a.lastName) > normalizeSortVal(b.lastName)) return 1
          else
            // this will never happen...right...
            { return 0 } // eslint-disable-line brace-style
        } else {
          return (
            normalizeRatingVal(b.voteRating, b) -
            normalizeRatingVal(a.voteRating, a)
          )
        }
      }
    })
  }

  setSort (sort) {
    if (this.state.sort[0] === sort) {
      // just switch between asc and desc
      const order = this.state.sort[1] === 'asc' ? 'desc' : 'asc'
      this.setState({ sort: [sort, order] })
    } else {
      this.setState({ sort: [sort, 'desc'] })
    }
  }

  filterData (rows) {
    const filterDataByName = rows => {
      const filterRegex = new RegExp('^' + this.state.nameFilter.toLowerCase())
      return rows.filter(r => {
        const names = [r.lastName, r.firstName]
        return (
          names.filter(n => {
            return n.trim().toLowerCase().match(filterRegex)
          }).length > 0
        )
      })
    }

    const filterDataByChamberAndParty = rows => {
      if (this.state.cpFilter[0]) {
        rows = rows.filter(r => {
          return r.chamber.toLowerCase() === this.state.cpFilter[0].toLowerCase()
        })
      }

      if (this.state.cpFilter[1]) {
        rows = rows.filter(r => {
          return r.party.toLowerCase() === this.state.cpFilter[1].toLowerCase()
        })
      }

      return rows
    }

    if (this.state.nameFilter) {
      return filterDataByName(rows)
    } else if (this.state.cpFilter.some((e) => e)) {
      return filterDataByChamberAndParty(rows)
    } else {
      return rows
    }
  }

  toggleCPFilter (filterIndex, filterValue) {
    // Setting a chamber or party filter will clear the name filter, and vice versa
    const stateClone = {
      nameFilter: this.state.nameFilter,
      cpFilter: [this.state.cpFilter[0], this.state.cpFilter[1]]
    }

    if (filterValue === 'clear') {
      stateClone.cpFilter[filterIndex] = null
    } else {
      stateClone.nameFilter = null
      // also clear the name filter's text box
      this.nameFilter.value = ''
      stateClone.cpFilter[filterIndex] = filterValue.toLowerCase()
    }
    this.setState(stateClone)
  }

  isFilterActive (filterIndex, filterValue) {
    if (!this.state.cpFilter[filterIndex]) {
      return false
    }
    return this.state.cpFilter[filterIndex].toLowerCase() === filterValue
  }

  render () {
    // sort data
    const data = this.sortData(this.filterData(this.props.data))

    return (
      <div className='white-floated pt-5 mb-5'>
        <div className='mx-auto'>

          <label
            htmlFor='filterBox'
            className='d-block'
          >
            Filter By:
          </label>
          <div
            className='d-md-flex align-items-center mb-5 mb-md-4'
            style={{ maxWidth: '600px' }}
            id='filterBox'
          >
            <UncontrolledDropdown id='chamberFilterDropdown' className='mr-1'>
              <DropdownToggle caret>
                {{ lower: 'House', upper: 'Senate' }[this.state.cpFilter[0]] || 'Chamber'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  active={this.isFilterActive(0, 'lower')}
                  onClick={() => this.toggleCPFilter(0, 'lower')}
                >
                  House
                </DropdownItem>
                <DropdownItem
                  active={this.isFilterActive(0, 'upper')}
                  onClick={() => this.toggleCPFilter(0, 'upper')}
                >
                  Senate
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => this.toggleCPFilter(0, 'clear')}
                >
                  Clear Filter
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown id='partyFilterDropdown'  className='mr-1'>
              <DropdownToggle caret>
                {{ democratic: 'Democrats', republican: 'Republicans' }[this.state.cpFilter[1]] || 'Party'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  active={this.isFilterActive(1, 'democratic')}
                  onClick={() => this.toggleCPFilter(1, 'democratic')}
                >
                  Democrats
                </DropdownItem>
                <DropdownItem
                  active={this.isFilterActive(1, 'republican')}
                  onClick={() => this.toggleCPFilter(1, 'republican')}
                >
                  Republicans
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => this.toggleCPFilter(1, 'clear')}
                >
                  Clear Filter
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <input
              type='text'
              placeholder='Legislator Name'
              id='nameFilter'
              ref={el => { this.nameFilter = el }}
              className='form-control'
              onChange={e => {
                this.setState({ nameFilter: e.target.value, cpFilter: [null, null] })
              }}
            />
          </div>

          <table className='table mx-auto table-hover table-clickable-rows'>
            <thead>
              <tr>
                <th />
                <th>
                  <SortButton
                    onClick={this.setSort}
                    sort='lastName'
                    currentSort={this.state.sort}
                    title='Name'
                  />
                </th>
                <th>
                  <button
                    type='button'
                    className='btn btn-sm btn-icon text-left'
                    style={{ width: '100%' }}>
                    <span className='label d-inline-block pr-3'>Chamber</span>
                  </button>
                </th>
                <th>
                  <button
                    type='button'
                    className='btn btn-sm btn-icon text-left'
                    style={{ width: '100%' }}>
                    <span className='label d-inline-block pr-3'>Party</span>
                  </button>
                </th>
                <th>
                  <SortButton
                    onClick={this.setSort}
                    sort='voteRating'
                    currentSort={this.state.sort}
                    title='Prog. Rating (2015-2016)'
                  />
                </th>

              </tr>
            </thead>
            <tbody>
              {data.map(this.renderRow)}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}

FilterableLegislatorList.propTypes = {
  data: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(FilterableLegislatorList)
