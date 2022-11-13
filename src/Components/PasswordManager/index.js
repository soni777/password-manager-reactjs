import {Component} from 'react'

import './index.css'

class PasswordManager extends Component {
  render() {
    const {profileDetails, show, onClickDelete} = this.props
    const {website, username, password, id, displayColor} = profileDetails
    const onClickDeleteIcon = () => {
      onClickDelete(id)
    }
    return (
      <li className="profile-container">
        <p className={`display-profile ${displayColor}`}>
          {username[0].toUpperCase()}
        </p>
        <div>
          <p className="website">{website}</p>

          <p>{username}</p>
          {!show && (
            <img
              className="star-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
          {show && <p>{password}</p>}
        </div>

        <button
          testid="delete"
          className="btn"
          type="button"
          onClick={onClickDeleteIcon}
        >
          <img
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
          />
        </button>
      </li>
    )
  }
}

export default PasswordManager
