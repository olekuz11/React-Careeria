import './App.css'
import React, { useState } from 'react'

//Propsi otettu vastaan suoraan nimellä
const Laskuri = ({ huomio }) => {

    // Komponentin tilan määritys
  const [luku, setLuku] = useState(0)

  return (
    <>
      <h3>{luku}</h3>
        <div className="laskuri-napit">
            <button onClick={() => setLuku(luku + 1)}>+</button>
            <button onClick={() => setLuku(luku - 1)}>-</button>
            <button className="huomio-nappi" onClick={huomio}>Huomio!</button>
        </div>

        <div>
            <button onClick={() => setLuku(0)}>Reset</button>
        </div>
    </>
  )
}

export default Laskuri