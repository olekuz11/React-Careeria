import React, { useState } from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import Message from './Message'

const App = () => {

  const [aktiivinen, setAktiivinen] = useState(null)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)

  const huomio = () => {
    alert("Huomio!")
  }

  return (
    <div className="App">
      <h1>Welcome to my React App!</h1>

      {showMessage && <Message message={message} isPositive={isPositive} />}

      <div className="napit">
        <button onClick={() => setAktiivinen(aktiivinen === 'laskuri' ? null : 'laskuri')}>
          {aktiivinen === 'laskuri' ? 'Piilota laskuri' : 'Näytä laskuri'}
        </button>

        <button onClick={() => setAktiivinen(aktiivinen === 'posts' ? null : 'posts')}>
          {aktiivinen === 'posts' ? 'Piilota postaukset' : 'Näytä postaukset'}
        </button>

        <button onClick={() => setAktiivinen(aktiivinen === 'customers' ? null : 'customers')}>
          {aktiivinen === 'customers' ? 'Piilota asiakkaat' : 'Näytä asiakkaat'}
        </button>
      </div>

      {aktiivinen === 'laskuri' && <Laskuri huomio={huomio} />}
      {aktiivinen === 'posts' && <Posts />}
      {aktiivinen === 'customers' && <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

      <Viesti teksti="Tämä on viesti komponentista!" />

    </div>
  )
}

export default App