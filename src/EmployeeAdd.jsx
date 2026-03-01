import './App.css'
import React, { useState } from 'react'
import employeeService from './services/Employee'

const EmployeeAdd = ({ setLisäystila, setIsPositive, setMessage, setShowMessage }) => {

  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newCity, setNewCity] = useState('')
  const [newCountry, setNewCountry] = useState('')
  const [newHomePhone, setNewHomePhone] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newEmployee = {
      firstName: newFirstName,
      lastName: newLastName,
      title: newTitle,
      city: newCity,
      country: newCountry,
      homePhone: newHomePhone,
      titleOfCourtesy: null,
      birthDate: null,
      hireDate: null,
      address: null,
      region: null,
      postalCode: null,
      extension: null,
      photo: null,
      notes: null,
      reportsTo: null
    }

    employeeService.create(newEmployee)
      .then(response => {
        if (response.status === 200) {
          setMessage(`Lisätty uusi työntekijä: ${newEmployee.firstName} ${newEmployee.lastName}`)
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
      <h2>Lisää työntekijä</h2>
      <form onSubmit={handleSubmit} className="customer-form">
        <label>Etunimi
          <input type="text" value={newFirstName} placeholder="Etunimi" onChange={({ target }) => setNewFirstName(target.value)} required />
        </label>
        <label>Sukunimi
          <input type="text" value={newLastName} placeholder="Sukunimi" onChange={({ target }) => setNewLastName(target.value)} required />
        </label>
        <label>Titteli
          <input type="text" value={newTitle} placeholder="Titteli" onChange={({ target }) => setNewTitle(target.value)} />
        </label>
        <label>Kaupunki
          <input type="text" value={newCity} placeholder="Kaupunki" onChange={({ target }) => setNewCity(target.value)} />
        </label>
        <label>Maa
          <input type="text" value={newCountry} placeholder="Maa" onChange={({ target }) => setNewCountry(target.value)} />
        </label>
        <label>Puhelin
          <input type="text" value={newHomePhone} placeholder="Puhelin" onChange={({ target }) => setNewHomePhone(target.value)} />
        </label>

        <div className="laskuri-napit" style={{ marginTop: '12px' }}>
          <input type="submit" value="Tallenna" />
          <input type="button" value="Peruuta" onClick={() => setLisäystila(false)} />
        </div>
      </form>
    </div>
  )
}

export default EmployeeAdd