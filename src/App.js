import React, { useState, useEffect } from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import Message from './Message'
import Login from './Login'
import customerService from './services/Customer'
import userService from './services/User'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const App = () => {

  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('')
  const [accessLevel, setAccessLevel] = useState(1)

  const huomio = () => {
    alert("Huomio!")
  }

  useEffect(() => {
    let storedUser = localStorage.getItem("username")
    let storedToken = localStorage.getItem("token")
    let storedLevel = localStorage.getItem("accesslevelId")
    if (storedUser !== null) {
      setLoggedInUser(storedUser)
      customerService.setToken(storedToken)
      userService.setToken(storedToken)
      if (storedLevel !== null) {
        setAccessLevel(parseInt(storedLevel))
      }
    }
  }, [])

  const logout = () => {
    localStorage.clear()
    setLoggedInUser('')
    setAccessLevel(1)
    setMessage('Kirjauduttu ulos onnistuneesti!')
    setIsPositive(true)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 4000)
  }

  return (
    <div className="App">
      {!loggedInUser && (
        <>
          {showMessage && <Message message={message} isPositive={isPositive} />}
          <Login
            setMessage={setMessage}
            setIsPositive={setIsPositive}
            setShowMessage={setShowMessage}
            setLoggedInUser={setLoggedInUser}
            setAccessLevel={setAccessLevel}
            setToken={(token) => {
              customerService.setToken(token)
              userService.setToken(token)
            }}
          />
        </>
      )}

      {loggedInUser && (
        <Router>
          <Navbar bg="dark" variant="dark">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Etusivu</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/customers">
                <Nav.Link>Asiakkaat</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/posts">
                <Nav.Link>Postaukset</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/laskuri">
                <Nav.Link>Laskuri</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className="ms-auto">
              <LinkContainer to="/users">
                <Nav.Link>Käyttäjät</Nav.Link>
              </LinkContainer>

              <button onClick={logout} style={{ margin: '8px 16px' }}>
                Kirjaudu ulos ({loggedInUser})
              </button>
            </Nav>
          </Navbar>

          <h1>Northwind Traders</h1>

          {showMessage && <Message message={message} isPositive={isPositive} />}

          <Routes>
            <Route path="/" element={<Viesti teksti="Tämä on viesti komponentista!" />} />

            <Route path="/customers" element={
              <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} accessLevel={accessLevel} />
            } />

            <Route path="/users" element={
              <UserList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} accessLevel={accessLevel} />
            } />

            <Route path="/posts" element={<Posts />} />
            <Route path="/laskuri" element={<Laskuri huomio={huomio} />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      )}
    </div>
  )
}

export default App