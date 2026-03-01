import './App.css'
import React, { useState, useEffect } from 'react'
import userService from './services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({ setIsPositive, setMessage, setShowMessage, accessLevel }) => {
  const [users, setUsers] = useState([])
  const [lisäystila, setLisäystila] = useState(false)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [muokattavaUser, setMuokattavaUser] = useState(null)
  const [reload, setReload] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    userService.getAll().then(data => setUsers(data))
  }, [lisäystila, reload, muokkaustila])

  const editUser = (user) => {
    setMuokattavaUser(user)
    setMuokkaustila(true)
  }

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const deleteUser = (user) => {
    let vastaus = window.confirm(`Remove user ${user.userName}?`)
    if (vastaus === true) {
      userService.remove(user.userId)
        .then(res => {
          if (res.status === 200) {
            setMessage(`Successfully removed ${user.userName}`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollTo(0, 0)
            setTimeout(() => setShowMessage(false), 8000)
            setReload(!reload)
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
  }

  const filtered = users
    .filter(u => u.lastName.toLowerCase().indexOf(search) > -1)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <h2>Users</h2>
        {!lisäystila && !muokkaustila && (
          <button onClick={() => setLisäystila(true)}>Lisää uusi</button>
        )}
      </div>

      {lisäystila && (
        <UserAdd
          setLisäystila={setLisäystila}
          setIsPositive={setIsPositive}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
        />
      )}

      {muokkaustila && muokattavaUser && (
        <UserEdit
          setMuokkaustila={setMuokkaustila}
          setIsPositive={setIsPositive}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
          muokattavaUser={muokattavaUser}
        />
      )}

      {!lisäystila && !muokkaustila && (
        <>
          <input
            className="search-input"
            placeholder="Hae sukunimellä..."
            value={search}
            onChange={handleSearchInputChange}
          />
          <table className="user-table-full">
            <thead>
              <tr>
                <th>Etunimi</th>
                <th>Sukunimi</th>
                <th>Email</th>
                <th>Käyttäjänimi</th>
                <th>Taso</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.userId}>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>{u.email}</td>
                  <td>{u.userName}</td>
                  <td>{u.accesslevelId}</td>
                  <td>
                    {accessLevel === 1 && (
                      <>
                        <button onClick={() => editUser(u)}>Edit</button>
                        <button onClick={() => deleteUser(u)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default UserList