import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="bg-container-home">
          <div className="bg-card-container-home">
            <h1 className="main-heading-home">
              Find The Job That Fits Your Life
            </h1>
            <p className="para-home">
              Millions of people are searching for jobs, salary information,
              company review. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs">
              <button
                type="button"
                onClick={this.onClickFindJob}
                className="button-find-job-home"
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Home
