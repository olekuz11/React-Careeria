import './App.css'
import React, { useState, useEffect } from 'react'
import customerService from './services/Customer'
import Customer from './Customer'

const CustomerList = () => {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    customerService.getAll().then(data => setCustomers(data))
  }, [])

  return (
    <>
      <h2>Customers</h2>
      <div className="posts-container">
        {customers && customers.map(c => (
          <Customer key={c.customerId} customer={c} />
        ))}
      </div>
    </>
  )
}

export default CustomerList