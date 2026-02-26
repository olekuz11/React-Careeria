import './App.css'
import React, { useState } from 'react'
import customerService from './services/Customer'

const CustomerAdd = ({ setLisäystila, setIsPositive, setMessage, setShowMessage }) => {

  const [newCustomerId, setNewCustomerId] = useState('')
  const [newCompanyName, setNewCompanyName] = useState('')
  const [newContactName, setNewContactName] = useState('')
  const [newContactTitle, setNewContactTitle] = useState('')
  const [newCountry, setNewCountry] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [newCity, setNewCity] = useState('')
  const [newPostalCode, setNewPostalCode] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFax, setNewFax] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newCustomer = {
      customerId: newCustomerId.toUpperCase(),
      companyName: newCompanyName,
      contactName: newContactName,
      contactTitle: newContactTitle,
      country: newCountry,
      address: newAddress,
      city: newCity,
      postalCode: newPostalCode,
      phone: newPhone,
      fax: newFax
    }

    customerService.create(newCustomer)
      .then(response => {
        if (response.status === 200) {
          setMessage('Asiakas ' + newCustomer.companyName + ' lisätty!')
          setIsPositive(true)
          setShowMessage(true)
          setTimeout(() => setShowMessage(false), 8000)
          setLisäystila(false)
        }
      })
      .catch(error => {
        setMessage(error.message)
        setIsPositive(false)
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 8000)
      })
  }

  return (
    <div className="post-card" style={{ maxWidth: '400px', margin: '16px auto' }}>
      <h2>Lisää asiakas</h2>
      <form onSubmit={handleSubmit} className="customer-form">
        <input type="text" value={newCustomerId} placeholder="ID (5 isoa kirjainta)" maxLength="5" minLength="5" onChange={({ target }) => setNewCustomerId(target.value)} required />
        <input type="text" value={newCompanyName} placeholder="Yrityksen nimi" onChange={({ target }) => setNewCompanyName(target.value)} required />
        <input type="text" value={newContactName} placeholder="Yhteyshenkilö" onChange={({ target }) => setNewContactName(target.value)} />
        <input type="text" value={newContactTitle} placeholder="Titteli" onChange={({ target }) => setNewContactTitle(target.value)} />
        <input type="text" value={newCountry} placeholder="Maa" onChange={({ target }) => setNewCountry(target.value)} />
        <input type="text" value={newAddress} placeholder="Osoite" onChange={({ target }) => setNewAddress(target.value)} />
        <input type="text" value={newCity} placeholder="Kaupunki" onChange={({ target }) => setNewCity(target.value)} />
        <input type="text" value={newPostalCode} placeholder="Postinumero" onChange={({ target }) => setNewPostalCode(target.value)} />
        <input type="text" value={newPhone} placeholder="Puhelin" onChange={({ target }) => setNewPhone(target.value)} />
        <input type="text" value={newFax} placeholder="Faksi" onChange={({ target }) => setNewFax(target.value)} />

        <div className="laskuri-napit" style={{ marginTop: '12px' }}>
          <input type="submit" value="Tallenna" />
          <input type="button" value="Peruuta" onClick={() => setLisäystila(false)} />
        </div>
      </form>
    </div>
  )
}

export default CustomerAdd