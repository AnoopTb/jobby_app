import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserDetailCard extends Component {
  state = {
    userDetails: [],
    userDetailPageStage: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserDataLogin()
  }

  getUserDataLogin = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedUserDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userDetails: updatedUserDetails,
        userDetailPageStage: apiStatusConstants.success,
      })
    } else {
      this.setState({userDetailPageStage: apiStatusConstants.failure})
    }
  }

  loaderLoading = () => (
    <div className="loader-container loader-center" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getUserDetails = () => {
    const {userDetails} = this.state
    const {name, profileImageUrl, shortBio} = userDetails
    return (
      <div className="bg-container-user-details-jobs">
        <img
          className="user-img-user-details-jobs"
          src={profileImageUrl}
          alt="profile"
        />
        <h1 className="name-user-details-jobs">{name}</h1>
        <p className="para-user-details-jobs">{shortBio}</p>
      </div>
    )
  }

  onRetryUserDetail = () => this.getUserDataLogin()

  failureRetry = () => (
    <div className="user-detail-failure-page">
      <button
        type="button"
        onClick={this.onRetryUserDetail}
        className="button-retry-user-detail"
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {userDetailPageStage} = this.state

    switch (userDetailPageStage) {
      case apiStatusConstants.success:
        return this.getUserDetails()
      case apiStatusConstants.failure:
        return this.failureRetry()
      default:
        return this.loaderLoading()
    }
  }
}

export default UserDetailCard
