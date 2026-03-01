import './App.css'
import React, { useState, useEffect } from 'react'
import employeeService from './services/Employee'
import EmployeeAdd from './EmployeeAdd'
import EmployeeEdit from './EmployeeEdit'

const EmployeeList = ({ setIsPositive, setMessage, setShowMessage, accessLevel }) => {
  const [employees, setEmployees] = useState([])
  const [lisäystila, setLisäystila] = useState(false)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [muokattavaEmployee, setMuokattavaEmployee] = useState(null)
  const [reload, setReload] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    employeeService.getAll().then(data => setEmployees(data))
  }, [lisäystila, reload, muokkaustila])

  const editEmployee = (employee) => {
    setMuokattavaEmployee(employee)
    setMuokkaustila(true)
  }

  const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const deleteEmployee = (employee) => {
    let vastaus = window.confirm(`Remove employee ${employee.firstName} ${employee.lastName}?`)
    if (vastaus === true) {
      employeeService.remove(employee.employeeId)
        .then(res => {
          if (res.status === 200) {
            setMessage(`Successfully removed ${employee.firstName} ${employee.lastName}`)
            setIsPositive(true)
            setShowMessage(true)
            window.scrollTo(0, 0)
            setTimeout(() => setShowMessage(false), 8000)
            setReload(!reload)
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
  }

  const filtered = employees
    .filter(e => e.lastName.toLowerCase().indexOf(search) > -1)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <h2>Henkilöstö</h2>
        {!lisäystila && !muokkaustila && (
          <button onClick={() => setLisäystila(true)}>Lisää uusi</button>
        )}
      </div>

      {lisäystila && (
        <EmployeeAdd
          setLisäystila={setLisäystila}
          setIsPositive={setIsPositive}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
        />
      )}

      {muokkaustila && muokattavaEmployee && (
        <EmployeeEdit
          setMuokkaustila={setMuokkaustila}
          setIsPositive={setIsPositive}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
          muokattavaEmployee={muokattavaEmployee}
        />
      )}

      {!lisäystila && !muokkaustila && (
        <>
          <input
            className="search-input"
            placeholder="Hae sukunimellä..."
            value={search}
            onChange={handleSearchInputChange}
          />
          <table className="user-table-full">
            <thead>
              <tr>
                <th>Etunimi</th>
                <th>Sukunimi</th>
                <th>Titteli</th>
                <th>Kaupunki</th>
                <th>Maa</th>
                <th>Puhelin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.employeeId}>
                  <td>{e.firstName}</td>
                  <td>{e.lastName}</td>
                  <td>{e.title}</td>
                  <td>{e.city}</td>
                  <td>{e.country}</td>
                  <td>{e.homePhone}</td>
                  <td>
                    {accessLevel === 1 && (
                      <>
                        <button onClick={() => editEmployee(e)}>Edit</button>
                        <button onClick={() => deleteEmployee(e)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default EmployeeList