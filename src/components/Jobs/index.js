import {Component} from 'react'
import Cookies from 'js-cookie'

import FilterList from '../FilterList'
import Header from '../Header'
import './index.css'
import UserDetailCard from '../UserDetailCard'
import JobItemListContainer from '../JobItemListContainer'
import FilterSalary from '../FilterSalary'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    employeeType: [],
    salarySelect: [],
    jobList: [],
    filterList: '',
    loadingList: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemList()
  }

  getJobItemList = async () => {
    const {filterList, employeeType, salarySelect} = this.state
    const updatedSalarySelect = salarySelect.join()
    const updatedEmployeeType = employeeType.join()
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${updatedEmployeeType}&minimum_package=${updatedSalarySelect}&search=${filterList}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      if (data.total === 0) {
        this.setState({
          jobList: updatedData,
          loadingList: apiStatusConstants.failure,
        })
      } else {
        this.setState({
          jobList: updatedData,
          loadingList: apiStatusConstants.success,
        })
      }
    } else {
      this.passFailureJobItemList()
    }
  }

  passFailureJobItemList = () => (
    <div className="failure-bg-container-job-details">
      <img
        className="failure-img-job-container"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading-job-details">
        Oops! Something Went Wrong
      </h1>
      <p className="failure-para-job-details">
        We cannot seem to find the page you are looking for
      </p>
    </div>
  )

  getSalaryFilter = id => {
    const {salarySelect} = this.state
    const isNewId = salarySelect.includes(id)

    let newType = []
    if (isNewId) {
      const checkFilter = salarySelect.filter(eachItem => eachItem !== id)

      newType = [...checkFilter]
    } else {
      newType = [...salarySelect, id]
    }

    this.setState({salarySelect: newType}, this.getJobItemList)
  }

  getEmployeeTypeFilter = id => {
    const {employeeType} = this.state
    const isNewId = employeeType.includes(id)

    let newType = []
    if (isNewId) {
      const checkFilter = employeeType.filter(eachItem => eachItem !== id)
      newType = [...checkFilter]
    } else {
      newType = [...employeeType, id]
    }

    this.setState({employeeType: newType}, this.getJobItemList)
  }

  getUserDetailsFilterList = () => {
    const {employeeType} = this.state
    return (
      <div className="bg-filter-section-container-jobs">
        <UserDetailCard />
        <hr />
        <h1 className="filter-heading">Type of Employment</h1>
        <ul>
          {employmentTypesList.map(eachItem => (
            <FilterList
              getEmployeeTypeFilter={this.getEmployeeTypeFilter}
              eachItem={eachItem}
              key={eachItem.employmentTypeId}
              isActive={employeeType}
            />
          ))}
        </ul>
        <hr />
        <h1 className="filter-heading">Salary Range</h1>
        <ul>
          {salaryRangesList.map(eachItem => (
            <FilterSalary
              key={eachItem.salaryRangeId}
              eachItem={eachItem}
              getSalaryFilter={this.getSalaryFilter}
            />
          ))}
        </ul>
      </div>
    )
  }

  onCallFilterList = data => {
    this.setState({filterList: data}, this.getJobItemList)
  }

  getListDetail = () => {
    const {jobList, loadingList} = this.state
    return (
      <JobItemListContainer
        onCallFilterList={this.onCallFilterList}
        jobList={jobList}
        loadingList={loadingList}
      />
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="bg-container-jobs">
          {this.getUserDetailsFilterList()}
          {this.getListDetail()}
        </div>
      </>
    )
  }
}

export default Jobs
