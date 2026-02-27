import './App.css'
import React, { useState } from 'react'
import userService from './services/User'
import md5 from 'md5'

const UserEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser }) => {

  const [newFirstName, setNewFirstName] = useState(muokattavaUser.firstName)
  const [newLastName, setNewLastName] = useState(muokattavaUser.lastName)
  const [newEmail, setNewEmail] = useState(muokattavaUser.email)
  const [newUserName, setNewUserName] = useState(muokattavaUser.userName)
  const [newPassword, setNewPassword] = useState('')
  const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaUser.accesslevelId)

  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedUser = {
      userId: muokattavaUser.userId,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      userName: newUserName,
      password: newPassword ? md5(newPassword) : null,
      accesslevelId: parseInt(newAccesslevelId)
    }

    userService.update(updatedUser)
      .then(response => {
        if (response.status === 200) {
          setMessage(`Muokattu käyttäjää: ${updatedUser.firstName} ${updatedUser.lastName}`)
          setIsPositive(true)
          setShowMessage(true)
          window.scrollTo(0, 0)
          setTimeout(() => setShowMessage(false), 8000)
          setMuokkaustila(false)
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
      <h2>Muokkaa käyttäjää</h2>
      <form onSubmit={handleSubmit} className="customer-form">
        <label>Etunimi
          <input type="text" value={newFirstName} placeholder="Etunimi" onChange={({ target }) => setNewFirstName(target.value)} required />
        </label>
        <label>Sukunimi
          <input type="text" value={newLastName} placeholder="Sukunimi" onChange={({ target }) => setNewLastName(target.value)} required />
        </label>
        <label>Email
          <input type="email" value={newEmail || ''} placeholder="Email" onChange={({ target }) => setNewEmail(target.value)} />
        </label>
        <label>Käyttäjänimi
          <input type="text" value={newUserName || ''} placeholder="Käyttäjänimi" onChange={({ target }) => setNewUserName(target.value)} />
        </label>
        <label>Uusi salasana (jätä tyhjäksi jos ei muutosta)
          <input type="password" value={newPassword} placeholder="Uusi salasana" onChange={({ target }) => setNewPassword(target.value)} />
        </label>
        <label>Käyttöoikeustaso
          <input type="number" value={newAccesslevelId || 2} placeholder="Käyttöoikeustaso" onChange={({ target }) => setNewAccesslevelId(target.value)} />
        </label>

        <div className="laskuri-napit" style={{ marginTop: '12px' }}>
          <input type="submit" value="Tallenna" />
          <input type="button" value="Peruuta" onClick={() => setMuokkaustila(false)} />
        </div>
      </form>
    </div>
  )
}

export default UserEdit