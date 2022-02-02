import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    failureMsg: '',
  }

  onUserName = event => {
    this.setState({username: event.target.value})
  }

  onUserPassword = event => {
    this.setState({password: event.target.value})
  }

  passSuccessCall = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    history.replace('/')
  }

  passFailedCall = msg => {
    this.setState({failureMsg: msg})
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.passSuccessCall(data.jwt_token)
    } else {
      this.passFailedCall(data.error_msg)
      this.setState({username: '', password: ''})
    }
  }

  inputPage = () => {
    const {failureMsg} = this.state

    return (
      <form
        className="bg-card-container-login"
        onSubmit={this.onSubmitUserDetails}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo-img-login"
        />
        <div className="input-container-login">
          <label className="label-username-login" htmlFor="userNameId">
            USERNAME
          </label>
          <input
            value={this.username}
            onChange={this.onUserName}
            type="text"
            id="userNameId"
            placeholder="Username"
            className="input-username-login"
          />
        </div>
        <div className="input-container-login">
          <label className="label-password-login" htmlFor="passwordId">
            PASSWORD
          </label>
          <input
            onChange={this.onUserPassword}
            type="password"
            id="passwordId"
            value={this.userPassword}
            placeholder="password"
            className="input-password-login"
          />
        </div>
        <div className="button-msg-container-login">
          <button className="button-login" type="submit">
            Login
          </button>
          {failureMsg !== '' ? (
            <p className="failure-msg-login">{`*${failureMsg}`}</p>
          ) : null}
        </div>
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return <div className="bg-container-login">{this.inputPage()}</div>
  }
}

export default Login
