import React, { useState } from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'

const App = () => {

  // App komponentin tila
const [showLaskuri, setShowLaskuri] = useState(false)

const huomio = () => {
  alert("Huomio!")
}

  return (
    <div className="App">
      <h1>Welcome to my React App!</h1>

      {showLaskuri && <Laskuri huomio={huomio}/>}

      <button onClick={() => setShowLaskuri(!showLaskuri)}>
        {showLaskuri ? "Piilota laskuri" : "Näytä laskuri"}
      </button>

      <Viesti teksti="Tämä on viesti komponentista!" />

    </div>
  )
}

export default App
