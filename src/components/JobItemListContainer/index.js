import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobItemCard from '../JobItemCard'

import './index.css'

class JobItemListContainer extends Component {
  state = {
    searchInput: '',
  }

  onSearchTab = event => {
    this.setState({searchInput: event.target.value})
  }

  checkKey = event => {
    if (event.code === 'Enter') {
      this.searchOnList()
    }
  }

  onClickSearch = () => {
    this.searchOnList()
  }

  searchOnList = () => {
    const {onCallFilterList} = this.props
    const {searchInput} = this.state

    onCallFilterList(searchInput)
  }

  getList = () => {
    const {jobList} = this.props
    return (
      <ul className="job-unordered-list-container">
        {jobList.map(eachData => (
          <JobItemCard data={eachData} />
        ))}
      </ul>
    )
  }

  loaderLoading = () => (
    <div className="loader-container loader-center" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getEmptyList = () => (
    <div className="failure-bg-container-job-details">
      <img
        className="failure-img-job-container"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="failure-heading-job-details">No Jobs Found</h1>
      <p className="failure-para-job-details">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  getListPage = () => {
    const {loadingList} = this.props

    switch (loadingList) {
      case 'SUCCESS':
        return this.getList()
      case 'FAILURE':
        return this.getEmptyList()
      default:
        return this.loaderLoading()
    }
  }

  render() {
    return (
      <div className="bg-container-job-item-list-container">
        <div className="input-container-job-item-list-container">
          <input
            onChange={this.onSearchTab}
            type="search"
            className="search-input"
            onKeyDown={this.checkKey}
          />
          <button
            onClick={this.onClickSearch}
            type="button"
            testid="searchButton"
            className="search-button"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.getListPage()}
      </div>
    )
  }
}
export default JobItemListContainer
