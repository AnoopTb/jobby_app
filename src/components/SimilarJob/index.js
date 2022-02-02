import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'

import {IoLocationSharp} from 'react-icons/io5'

import './index.css'

const SimilarJob = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachJob

  return (
    <li className="bg-container-jobs-similar-job">
      <div className="card1-company-logo-rating-container-job-Item-Card-similar-job">
        <img
          className="company-logo-job-Item-Card-similar-job"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="job-rating-container-job-Item-Card-similar-job">
          <h1 className="job-heading-job-Item-Card-similar-job">{title}</h1>
          <div className="rating-container-job-Item-Card-similar-job">
            <BsFillStarFill className="rating-logo-job-Item-Card-similar-job" />
            <p className="rating-value-job-Item-Card-similar-job">{rating}</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="heading-card3-job-Item-Card-similar-card">
          Description
        </h1>
        <p className="para-card3-job-Item-Card-similar-card ">
          {jobDescription}
        </p>
      </div>

      <div className="location-type-container-job-Item-Card-similar-job">
        <IoLocationSharp className="location-logo-job-Item-Card-similar-job" />
        <p className="location-para-job-Item-Card-similar-job">{location}</p>
        <BsFillBriefcaseFill className="location-logo-job-Item-Card-similar-job" />
        <p className="location-para-job-Item-Card-similar-job">
          {employmentType}
        </p>
      </div>
    </li>
  )
}

export default SimilarJob
