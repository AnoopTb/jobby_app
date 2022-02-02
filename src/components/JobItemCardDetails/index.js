import {Component} from 'react'
import Cookies from 'js-cookie'
import {
  BsFillStarFill,
  BsBoxArrowUpRight,
  BsFillBriefcaseFill,
} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'

import Loader from 'react-loader-spinner'

import SkillsNeeded from '../SkillsNeeded'
import Header from '../Header'
import SimilarJob from '../SimilarJob'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemCardDetails extends Component {
  state = {
    jobDetails: {},
    lifeAtCompany: {},
    skills: [],
    similarJobs: [],
    loadingData: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCardDetail()
  }

  getCardDetail = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updateJobDetails = {
        title: data.job_details.title,
        rating: data.job_details.rating,
        packagePerAnnum: data.job_details.package_per_annum,
        location: data.job_details.location,
        jobDescription: data.job_details.job_description,
        id: data.job_details.id,
        employmentType: data.job_details.employment_type,
        companyWebsiteUrl: data.job_details.company_website_url,
        companyLogoUrl: data.job_details.company_logo_url,
      }

      const updatedLifeAtCompany = {
        imageUrl: data.job_details.life_at_company.image_url,
        description: data.job_details.life_at_company.description,
      }

      const updatedSkills = data.job_details.skills.map(eachItem => ({
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))

      const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetails: updateJobDetails,
        lifeAtCompany: updatedLifeAtCompany,
        skills: updatedSkills,
        similarJobs: updatedSimilarJobs,
        loadingData: apiStatusConstants.success,
      })
    } else {
      this.setState({loadingData: apiStatusConstants.failure})
    }
  }

  successPageDisplay = () => {
    const {jobDetails, lifeAtCompany, skills, similarJobs} = this.state
    const {
      title,
      rating,
      packagePerAnnum,
      location,
      jobDescription,
      employmentType,
      companyWebsiteUrl,
      companyLogoUrl,
    } = jobDetails

    return (
      <>
        <div className="bg-container-job-Item-Card-detail">
          <div className="card1-company-logo-rating-container-job-Item-Card-detail">
            <img
              className="company-logo-job-Item-Card-detail"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="job-rating-container-job-Item-Card-detail">
              <h1 className="job-heading-job-Item-Card-detail">{title}</h1>
              <div className="rating-container-job-Item-Card-detail">
                <BsFillStarFill className="rating-logo-job-Item-Card-detail" />
                <p className="rating-value-job-Item-Card-detail">{rating}</p>
              </div>
            </div>
          </div>

          <div className="card2-container-location-lpa-job-Item-Card-detail">
            <div className="location-type-container-job-Item-Card-detail">
              <IoLocationSharp className="location-logo-job-Item-Card-detail" />
              <p className="location-para-job-Item-Card-detail">{location}</p>
              <BsFillBriefcaseFill className="location-logo-job-Item-Card-detail" />
              <p className="location-para-job-Item-Card-detail">
                {employmentType}
              </p>
            </div>
            <p className="lpa-para-job-Item-Card-detail">{packagePerAnnum}</p>
          </div>

          <hr className="cross-line-job-Item-Card-detail" />

          <div className="card3-container-description-job-Item-Card-detail">
            <div className="description-container-detail">
              <h1 className="heading-card3-job-Item-Card-detail">
                Description
              </h1>
              <a href={companyWebsiteUrl}>
                <div className="link-container-detail">
                  <p className="visit-link-details">Visit</p>
                  <BsBoxArrowUpRight className="visit-link-logo-details" />
                </div>
              </a>
            </div>
            <p className="para-card3-job-Item-Card-details">{jobDescription}</p>
          </div>
          <div>
            <h1 className="heading-card3-job-Item-Card-detail">Skills</h1>
            <ul className="skill-container-details">
              {skills.map(eachSkill => (
                <SkillsNeeded eachSkill={eachSkill} key={eachSkill.name} />
              ))}
            </ul>
          </div>
          <div className="life-of-company-details">
            <h1 className="heading-card3-job-Item-Card-detail">
              Life at Company
            </h1>
            <div className="life-of-company-card-details">
              <p className="para-card3-job-Item-Card-details">
                {lifeAtCompany.description}
              </p>
              <img
                className="life-of-company-img-details"
                src={lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <h1 className="heading-card3-job-Item-Card-detail">Similar Jobs</h1>
        <ul className="similar-job-list-container">
          {similarJobs.map(eachJob => (
            <SimilarJob eachJob={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </>
    )
  }

  getFailurePage = () => (
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
      <button
        type="button"
        onClick={this.getRetryList}
        className="failure-button-job-details"
      >
        Retry
      </button>
    </div>
  )

  getRetryList = () => this.getCardDetail()

  getPage = () => {
    const {loadingData} = this.state
    switch (loadingData) {
      case apiStatusConstants.success:
        return this.successPageDisplay()
      case apiStatusConstants.failure:
        return this.getFailurePage()
      default:
        return this.loaderLoading()
    }
  }

  loaderLoading = () => (
    <div
      className="loader-container failure-bg-container-job-details"
      testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="bg-container-jobs-detail">{this.getPage()}</div>
      </>
    )
  }
}

export default JobItemCardDetails
