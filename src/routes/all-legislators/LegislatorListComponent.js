import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import SortButton from './SortButtonComponent'
import ProgressBarComponent from './../legislator/ProgressBarComponent'

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
      <tr onClick={() => this.props.history.push(`/legislator/${d.id}`)}>
        <td>{i + 1}</td>
        <td data-label={this.props.chamber === 'upper' ? 'Senator' : 'Representative'}><Link to={`/legislator/${d.id}`}><b>{d.name}</b></Link></td>
        <td data-label='Party'>{d.party.slice(0, 1)}</td>
        <td
          data-label='Progressive Rating'
          style={{ verticalAlign : 'middle' }}>
          {d.pm_vote_score
          ? <ProgressBarComponent width={d.pm_vote_score} animate key={d.id + 'prog-bar'} />
          : <b>N/A</b>
        }
        </td>
      </tr>

    )
  }

  sortData (data) {
    const normalizeSortVal = (val) => {
      if (!val) {
        return 0
      } else if (typeof val === 'string') {
        return val.toLowerCase()
      } else {
        return val
      }
    }

    const sortKey = this.state.sort[0]
    const order = this.state.sort[1]
    return data.sort((a, b) => {
      const aSort = normalizeSortVal(a[sortKey])
      const bSort = normalizeSortVal(b[sortKey])
      if (aSort < bSort) {
        return (order === 'asc' ? 1 : -1)
      } else if (aSort > bSort) {
        return (order === 'asc' ? -1 : 1)
      } else {
        // use rating as secondary sort
        return normalizeSortVal(b.pm_vote_score) - normalizeSortVal(a.pm_vote_score)
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

    return (<div className='white-floated pt-5'>
      <div className='mx-auto' style={{ maxWidth : '750px' }}>
        <div style={{ maxWidth : '300px' }} className='mb-4'>
          <label htmlFor='filterTable'>Filter:</label>
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
                <SortButton onClick={this.setSort} sort='pm_vote_score' currentSort={this.state.sort} title='Prog. Rating' />
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
  data : PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  chamber : PropTypes.string.isRequired
}

export default withRouter(StateRepTable)
