import './App.css'
import React, { useState, useEffect } from 'react'
import customerService from './services/Customer'
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'

const CustomerList = () => {
  const [customers, setCustomers] = useState([])
  const [lisäystila, setLisäystila] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    customerService.getAll().then(data => setCustomers(data))
  }, [lisäystila])

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <h2>Customers</h2>
            {!lisäystila && (
              <button onClick={() => setLisäystila(true)}>Lisää uusi</button>
        )}
      </div>

      {message && (
        <div className={message.ok ? 'message-ok' : 'message-error'}>
          {message.text}
        </div>
      )}

      {lisäystila && (
        <CustomerAdd setLisäystila={setLisäystila} setMessage={setMessage} />
      )}

      <div className="posts-container">
        {customers && customers.map(c => (
          <Customer key={c.customerId} customer={c} />
        ))}
      </div>
    </>
  )
}

export default CustomerList