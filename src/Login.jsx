import './App.css'
import React, { useState } from 'react'
import authService from './services/Auth'
import md5 from 'md5'

const Login = ({ setIsPositive, setMessage, setShowMessage, setLoggedInUser, setToken }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Submit clicked!", username, password)
    const userForAuth = {
      username: username,
      password: md5(password)
    }

    authService.authenticate(userForAuth)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem("username", response.data.username)
          localStorage.setItem("accesslevelId", response.data.accesslevelId)
          localStorage.setItem("token", response.data.token)

          setLoggedInUser(response.data.username)
          setToken(response.data.token)
          setMessage(`Kirjauduttu sisään: ${response.data.username}`)
          setIsPositive(true)
          setShowMessage(true)
          setTimeout(() => setShowMessage(false), 5000)
        }
      })
      .catch(error => {
        setMessage("Kirjautuminen epäonnistui. Tarkista käyttäjätunnus ja salasana.")
        setIsPositive(false)
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 6000)
      })
  }

  const emptyFields = () => {
    setUsername('')
    setPassword('')
  }

  return (
    <div className="post-card" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Kirjaudu sisään</h2>
      <form onSubmit={handleSubmit} className="customer-form">
        <label>Käyttäjänimi
          <input type="text" value={username} placeholder="Käyttäjänimi" onChange={({ target }) => setUsername(target.value)} required />
        </label>
        <label>Salasana
          <input type="password" value={password} placeholder="Salasana" onChange={({ target }) => setPassword(target.value)} required />
        </label>
        <div className="laskuri-napit" style={{ marginTop: '12px' }}>
          <input type="submit" value="Kirjaudu" />
          <input type="button" value="Tyhjennä" onClick={emptyFields} />
        </div>
      </form>
    </div>
  )
}

export default Login