import React, { useState } from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import Message from './Message'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {

  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)

  const huomio = () => {
    alert("Huomio!")
  }

  return (
    <div className="App">
      <Router>
         <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href='/customers'>Asiakkaat</Nav.Link>
              <Nav.Link href='/posts'>Postaukset</Nav.Link>
              <Nav.Link href='/laskuri'>Laskuri</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link href='/users'>Käyttäjät</Nav.Link>
            </Nav>
          </Navbar>

        <h1>Northwind Traders</h1>

        {showMessage && <Message message={message} isPositive={isPositive} />}

        <Routes>
          <Route path="/customers" element={<CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />} />
          <Route path="/users" element={<UserList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/laskuri" element={<Laskuri huomio={huomio} />} />
        </Routes>

        <Viesti teksti="Tämä on viesti komponentista!" />

      </Router>
    </div>
  )
}

export default App