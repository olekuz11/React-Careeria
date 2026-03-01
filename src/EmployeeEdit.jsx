import './App.css'
import React, { useState } from 'react'
import employeeService from './services/Employee'

const EmployeeEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaEmployee }) => {

  const [newFirstName, setNewFirstName] = useState(muokattavaEmployee.firstName)
  const [newLastName, setNewLastName] = useState(muokattavaEmployee.lastName)
  const [newTitle, setNewTitle] = useState(muokattavaEmployee.title || '')
  const [newCity, setNewCity] = useState(muokattavaEmployee.city || '')
  const [newCountry, setNewCountry] = useState(muokattavaEmployee.country || '')
  const [newHomePhone, setNewHomePhone] = useState(muokattavaEmployee.homePhone || '')

  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedEmployee = {
      employeeId: muokattavaEmployee.employeeId,
      firstName: newFirstName,
      lastName: newLastName,
      title: newTitle,
      city: newCity,
      country: newCountry,
      homePhone: newHomePhone,
      titleOfCourtesy: muokattavaEmployee.titleOfCourtesy,
      birthDate: muokattavaEmployee.birthDate,
      hireDate: muokattavaEmployee.hireDate,
      address: muokattavaEmployee.address,
      region: muokattavaEmployee.region,
      postalCode: muokattavaEmployee.postalCode,
      extension: muokattavaEmployee.extension,
      photo: null,
      notes: muokattavaEmployee.notes,
      reportsTo: muokattavaEmployee.reportsTo
    }

    employeeService.update(updatedEmployee)
      .then(response => {
        if (response.status === 200) {
          setMessage(`Muokattu työntekijää: ${updatedEmployee.firstName} ${updatedEmployee.lastName}`)
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
      <h2>Muokkaa työntekijää</h2>
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
          <input type="button" value="Peruuta" onClick={() => setMuokkaustila(false)} />
        </div>
      </form>
    </div>
  )
}

export default EmployeeEdit