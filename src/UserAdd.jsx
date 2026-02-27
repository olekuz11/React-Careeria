import './App.css'
import React, { useState } from 'react'
import userService from './services/User'
import md5 from 'md5'

const UserAdd = ({ setLisäystila, setIsPositive, setMessage, setShowMessage }) => {

  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newUserName, setNewUserName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newAccesslevelId, setNewAccesslevelId] = useState(2)

  const handleSubmit = (event) => {
    event.preventDefault()
    const newUser = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      userName: newUserName,
      password: md5(newPassword),
      accesslevelId: parseInt(newAccesslevelId)
    }

    userService.create(newUser)
      .then(response => {
        if (response.status === 200) {
          setMessage(`Lisätty uusi käyttäjä: ${newUser.firstName} ${newUser.lastName}`)
          setIsPositive(true)
          setShowMessage(true)
          window.scrollTo(0, 0)
          setTimeout(() => setShowMessage(false), 8000)
          setLisäystila(false)
        }
      })
      .catch(error => {
        setMessage(error.message)
        setIsPositive(false)
        setShowMessage(true)
        window.scrollTo(0, 0)
        setTimeout(() => setShowMessage(false), 8000)
      })
  }

  return (
    <div className="post-card" style={{ maxWidth: '400px', margin: '16px auto' }}>
      <h2>Lisää käyttäjä</h2>
      <form onSubmit={handleSubmit} className="customer-form">
        <label>Etunimi
          <input type="text" value={newFirstName} placeholder="Etunimi" onChange={({ target }) => setNewFirstName(target.value)} required />
        </label>
        <label>Sukunimi
          <input type="text" value={newLastName} placeholder="Sukunimi" onChange={({ target }) => setNewLastName(target.value)} required />
        </label>
        <label>Email
          <input type="email" value={newEmail} placeholder="Email" onChange={({ target }) => setNewEmail(target.value)} />
        </label>
        <label>Käyttäjänimi
          <input type="text" value={newUserName} placeholder="Käyttäjänimi" onChange={({ target }) => setNewUserName(target.value)} />
        </label>
        <label>Salasana
          <input type="password" value={newPassword} placeholder="Salasana" onChange={({ target }) => setNewPassword(target.value)} />
        </label>
        <label>Käyttöoikeustaso
          <input type="number" value={newAccesslevelId} placeholder="Käyttöoikeustaso" onChange={({ target }) => setNewAccesslevelId(target.value)} />
        </label>

        <div className="laskuri-napit" style={{ marginTop: '12px' }}>
          <input type="submit" value="Tallenna" />
          <input type="button" value="Peruuta" onClick={() => setLisäystila(false)} />
        </div>
      </form>
    </div>
  )
}

export default UserAdd