import './App.css'
import React, { useState } from 'react'
import customerService from './services/Customer'

const Customer = ({ customer, setIsPositive, setMessage, setShowMessage, reload, reloadNow, editCustomer }) => {
  const [showDetails, setShowDetails] = useState(false)

  const deleteCustomer = (customer) => {
    let vastaus = window.confirm(`Remove customer ${customer.companyName}?`)
    if (vastaus === true) {
      customerService.remove(customer.customerId)
        .then(res => {
          if (res.status === 200) {
            setMessage(`Successfully removed ${customer.companyName}`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollTo(0, 0)
            setTimeout(() => setShowMessage(false), 8000)
            reloadNow(!reload)
          }
        })
        .catch(error => {
          setMessage(error.message)
          setIsPositive(false)
          setShowMessage(true)
          window.scrollTo(0, 0)
          setTimeout(() => setShowMessage(false), 8000)
        })
    } else {
      setMessage('Poisto peruttu onnistuneesti.')
      setIsPositive(true)
      setShowMessage(true)
      window.scrollTo(0, 0)
      setTimeout(() => setShowMessage(false), 8000)
    }
  }

  return (
    <div
      className={`post-card ${showDetails ? 'post-card-auki' : ''}`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <span className="post-number">{customer.customerId}</span>
      <h4>{customer.companyName}</h4>

      {showDetails && (
        <div className="post-details">
          <table className="customer-table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Phone</th>
                <th>Address</th>
                <th>City</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{customer.contactName}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>{customer.city}</td>
                <td>{customer.country}</td>
              </tr>
            </tbody>
          </table>
          <div className="laskuri-napit" style={{ marginTop: '10px' }}>
            <button onClick={(e) => { e.stopPropagation(); editCustomer(customer) }}>Edit</button>
            <button onClick={(e) => { e.stopPropagation(); deleteCustomer(customer) }}>Delete</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Customer