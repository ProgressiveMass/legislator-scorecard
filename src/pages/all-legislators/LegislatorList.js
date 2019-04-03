import React from "react"
import PropTypes from "prop-types"
import LazyLoad, { forceCheck } from "react-lazyload"
import { navigate } from "gatsby"
import SortButton from "./SortButton"
import ProgressBar from "../../components/progressBar"
import InfoPopover from "../../components/InfoPopover"

class LegislatorList extends React. {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.sortData = this.sortData.bind(this)
    this.setSort = this.setSort.bind(this)
  }

  state = {
    sort: ["name", "desc"],
    filter: "",
  }

  renderRow(d, i) {
    return (
      <tr
        key={d.name}
        className="legislator-row"
        onClick={e => {
          e.preventDefault()
          navigate(`/legislator/${d.id.replace("ocd-person/", "")}`)
        }}
      >
        <td style={{ verticalAlign: "middle" }}>{i + 1}</td>
        <td
          data-label={
            this.props.chamber === "upper" ? "Senator" : "Representative"
          }
        >
          <a href="#">
            <b>
              <LazyLoad once height="4rem" offset={100}>
                <img
                  src={d.image}
                  alt=""
                  className="legislator-list__profile-img"
                />
              </LazyLoad>
              {d.name}&nbsp;
              {d.specialElectionUrl ? (
                <InfoPopover
                  text={`${
                    this.props.chamber === "upper"
                      ? "Senator"
                      : "Representative"
                  } ${
                    d.name.split(",")[0]
                  } is no longer a member of the Massachusetts Legislature. There is a <a target="_blank" href="${
                    d.specialElectionUrl
                  }">special election</a> pending to elect a replacement.`}
                />
              ) : null}
            </b>
          </a>
        </td>
        <td data-label="Party">{d.party.slice(0, 1)}</td>
        <td data-label="Progressive Rating (2017-2018)">
          <div style={{ maxWidth: "300px" }}>
            <ProgressBar data={d} />
          </div>
        </td>
      </tr>
    )
  }

  sortData(data) {
    const normalizeSortVal = val => {
      if (!val) {
        return 0
      } else if (typeof val === "string") {
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

    const sortKey = this.state.sort[0]
    const order = this.state.sort[1]
    return data.sort((a, b) => {
      let aSort = normalizeSortVal(a[sortKey])
      let bSort = normalizeSortVal(b[sortKey])

      if (sortKey === "score") {
        // so that people who didnt vote much don't get sorted to the top
        aSort = normalizeRatingVal(aSort, a)
        bSort = normalizeRatingVal(bSort, b)
      }

      if (aSort < bSort) {
        return order === "asc" ? 1 : -1
      } else if (aSort > bSort) {
        return order === "asc" ? -1 : 1
      } else {
        // find an appropriate secondary sort
        if (sortKey === "score") {
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

  setSort(sort) {
    if (this.state.sort[0] === sort) {
      // just switch between asc and desc
      const order = this.state.sort[1] === "asc" ? "desc" : "asc"
      this.setState({ sort: [sort, order] })
    } else {
      this.setState({ sort: [sort, "desc"] })
    }
    setTimeout(forceCheck, 1)
  }

  filterData(rows) {
    const filterRegex = new RegExp("^" + this.state.filter.toLowerCase())
    return rows.filter(r => {
      const names = r.name.split(",")
      return (
        names.filter(n => {
          return n
            .trim()
            .toLowerCase()
            .match(filterRegex)
        }).length > 0
      )
    })
  }

  render() {
    const data = this.sortData(this.filterData(this.props.data))

    return (
      <div className="white-background pt-5 mb-5">
        <div className="mx-auto">
          <div
            className="d-md-flex align-items-center mb-5 mb-md-4"
            style={{ maxWidth: "600px" }}
          >
            <label
              htmlFor="filterTable"
              className="d-inline-block mr-1"
              style={{ minWidth: "240px" }}
            >
              Filter By Legislator Name:
            </label>
            <input
              type="text"
              placeholder="type a name"
              id="filterTable"
              className="form-control"
              onChange={e => {
                this.setState({ filter: e.target.value })
                setTimeout(forceCheck, 1)
              }}
            />
          </div>

          <table className="table mx-auto table-hover table-clickable-rows">
            <thead>
              <tr>
                <th />
                <th>
                  <SortButton
                    onClick={this.setSort}
                    sort="name"
                    currentSort={this.state.sort}
                    title="Name"
                  />
                </th>
                <th>
                  <SortButton
                    onClick={this.setSort}
                    sort="party"
                    currentSort={this.state.sort}
                    title="Party"
                  />
                </th>
                <th>
                  <SortButton
                    onClick={this.setSort}
                    sort="score"
                    currentSort={this.state.sort}
                    title="Prog. Rating (2017-2018)"
                  />
                </th>
              </tr>
            </thead>
            <tbody>{data.map(this.renderRow)}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

LegislatorList.propTypes = {
  data: PropTypes.array.isRequired,
  chamber: PropTypes.string.isRequired,
}

export default LegislatorList
