import React, { useState } from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'

const App = () => {

  const [aktiivinen, setAktiivinen] = useState(null)

  const huomio = () => {
    alert("Huomio!")
  }

  return (
    <div className="App">
      <h1>Welcome to my React App!</h1>

      <div className="napit">
        <button onClick={() => setAktiivinen(aktiivinen === 'laskuri' ? null : 'laskuri')}>
          {aktiivinen === 'laskuri' ? 'Piilota laskuri' : 'Näytä laskuri'}
        </button>

        <button onClick={() => setAktiivinen(aktiivinen === 'posts' ? null : 'posts')}>
          {aktiivinen === 'posts' ? 'Piilota postaukset' : 'Näytä postaukset'}
        </button>
      </div>

      {aktiivinen === 'laskuri' && <Laskuri huomio={huomio} />}
      {aktiivinen === 'posts' && <Posts />}

      <Viesti teksti="Tämä on viesti komponentista!" />

    </div>
  )
}

export default App
