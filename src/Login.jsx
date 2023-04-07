import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './styles.css'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [submit, setSubmit] = useState(false)
  const [userData, setUserData] = useState({})
  const [showPopup, setShowPopup] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    fetch('user-data.json')
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error(error))
  }, [])

  const userNameChange = (e) => {
    console.log(e.target.value)
    if (e.target.name === 'name') {
      setUserName(e.target.value)
    } else {
      setUserPassword(e.target.value)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    setSubmit(true)
    if (userName === '' || userPassword === '') return
    // const userData = JSON.parse(localStorage.getItem('userData'))
    if (!(userName in userData) || userData[userName] === userPassword) {
      setUserName('')
      setUserPassword('')
      setSubmit(false)
      navigate('/form')
    } else {
      setShowPopup(true)
    }
  }

  return (
    <div>
      <form onSubmit={handleClick}>
        <label>Username : </label>
        <input
          value={userName}
          name="name"
          onChange={userNameChange}
          type="text"
        />
        {userName === '' && submit && <div> user name is required</div>}
        <label>Password</label>
        <input
          value={userPassword}
          name="password"
          onChange={userNameChange}
          type="text"
        />
        {userPassword === '' && submit && <div> user password is required</div>}
        <input type="submit" />
      </form>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <p>Invalid username or password</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
