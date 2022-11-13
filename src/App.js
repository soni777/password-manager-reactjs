import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordManager from './Components/PasswordManager'

import './App.css'

const backgroundColors = [
  'lite-orange',
  'green',
  'lite-green',
  'lite-blue',
  'red',
  'grey',
  'orange',
]

class App extends Component {
  state = {
    searchText: '',
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    show: false,
  }

  onChangeSearch = event => {
    this.setState({searchText: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({show: !prevState.show}))
  }

  onClickDelete = id => {
    this.setState(prevState => {
      let {passwordsList} = prevState
      passwordsList = passwordsList.filter(each => each.id !== id)
      return {passwordsList}
    })
  }

  onFormSubmit = event => {
    event.preventDefault()
    this.setState(prevState => {
      const displayColor =
        backgroundColors[Math.ceil(Math.random() * backgroundColors.length - 1)]
      const newPassword = {
        id: uuidv4(),
        website: prevState.website,
        username: prevState.username,
        password: prevState.password,
        displayColor,
      }

      return {
        passwordsList: [...prevState.passwordsList, newPassword],
        website: '',
        username: '',
        password: '',
        searchText: '',
      }
    })
  }

  renderTopContainer = () => {
    const {website, username, password} = this.state
    return (
      <div className="top-container">
        <img
          className="image"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          alt="password manager"
        />
        <div className="card">
          <h1 className="heading">Add New Password</h1>
          <form onSubmit={this.onFormSubmit}>
            <div className="input-container">
              <img
                className="icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                className="input"
                value={website}
                type="text"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-container">
              <img
                className="icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                className="input"
                type="text"
                value={username}
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-container">
              <img
                className="icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                className="input"
                type="password"
                value={password}
                placeholder="Enter Password"
                onChange={this.onChangePassword}
              />
            </div>
            <div className="btn-container">
              <button className="add-btn" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>

        <img
          className="image-lg"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          alt="password manager"
        />
      </div>
    )
  }

  renderBottomContainer = () => {
    const {searchText, passwordsList, show} = this.state
    const filteredList = passwordsList.filter(each =>
      each.website.includes(searchText),
    )
    const count = filteredList.length
    return (
      <div className="bottom-container">
        <div className="bottom-card">
          <div className="count-container">
            <h1 className="below-heading">Your Passwords</h1>
            <p className="count">{count}</p>
          </div>
          <div className="search-container">
            <img
              className="search-icon"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
            />
            <input
              className="search-input"
              value={searchText}
              type="search"
              placeholder="Search"
              onChange={this.onChangeSearch}
            />
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="show-pwd-container">
          <input
            className="checkbox"
            id="checkbox"
            type="checkbox"
            checked={show}
            onChange={this.onChangeCheckbox}
          />
          <label htmlFor="checkbox">Show Passwords</label>
        </div>
        {count === 0 && (
          <div>
            <img
              className="image2"
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
            />
            <p className="text">No Passwords</p>
          </div>
        )}
        {count > 0 && (
          <ul className="list-container">
            {filteredList.map(eachitem => (
              <PasswordManager
                key={eachitem.id}
                profileDetails={eachitem}
                show={show}
                onClickDelete={this.onClickDelete}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        {this.renderTopContainer()}
        {this.renderBottomContainer()}
      </div>
    )
  }
}

export default App
