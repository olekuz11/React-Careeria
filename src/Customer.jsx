import './App.css'
import React, { useState } from 'react'

const Customer = ({ customer }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div
      className={`post-card ${showDetails ? 'post-card-auki' : ''}`}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
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
        </div>
      )}
    </div>
  )
}

export default Customer