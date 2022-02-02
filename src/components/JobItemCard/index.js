import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'

import './index.css'

const JobItemCard = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = data

  return (
    <Link to={`/jobs/${id}`} className="link-change">
      <li className="bg-container-job-Item-Card">
        <div className="card1-company-logo-rating-container-job-Item-Card">
          <img
            className="company-logo-job-Item-Card"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="job-rating-container-job-Item-Card">
            <h1 className="job-heading-job-Item-Card">{title}</h1>
            <div className="rating-container-job-Item-Card">
              <BsFillStarFill className="rating-logo-job-Item-Card" />
              <p className="rating-value-job-Item-Card">{rating}</p>
            </div>
          </div>
        </div>

        <div className="card2-container-location-lpa-job-Item-Card">
          <div className="location-type-container-job-Item-Card">
            <IoLocationSharp className="location-logo-job-Item-Card" />
            <p className="location-para-job-Item-Card">{location}</p>
            <BsFillBriefcaseFill className="location-logo-job-Item-Card" />
            <p className="location-para-job-Item-Card">{employmentType}</p>
          </div>
          <p className="lpa-para-job-Item-Card">{packagePerAnnum}</p>
        </div>

        <hr className="cross-line-job-Item-Card" />

        <div className="card3-container-description-job-Item-Card">
          <h1 className="heading-card3-job-Item-Card">Description</h1>
          <p className="para-card3-job-Item-Card">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItemCard
