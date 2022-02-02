import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="bg-container-navbar">
      <ul className="bg-link-container ">
        <Link className="home-link-navbar" to="/">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="img-logo-navbar"
              alt="website logo"
            />
          </li>
        </Link>
        <div className="link-container-navbar">
          <Link className="home-link-navbar" to="/">
            <li>Home</li>
          </Link>
          <Link className="job-link-navbar" to="/jobs">
            <li>Jobs</li>
          </Link>
        </div>
        <button
          className="logout-button-navbar"
          onClick={onClickLogout}
          type="button"
        >
          Logout
        </button>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
