import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import EmployeeAdd from './EmployeeAdd'

jest.mock('./services/Employee')

test('EmployeeAdd form renders correctly', () => {
  render(
    <EmployeeAdd
      setLisäystila={jest.fn()}
      setIsPositive={jest.fn()}
      setMessage={jest.fn()}
      setShowMessage={jest.fn()}
    />
  )
  const element = screen.getByText('Lisää työntekijä')
  expect(element).toBeDefined()
})

test('EmployeeAdd form has required input fields', () => {
  render(
    <EmployeeAdd
      setLisäystila={jest.fn()}
      setIsPositive={jest.fn()}
      setMessage={jest.fn()}
      setShowMessage={jest.fn()}
    />
  )
  const firstNameInput = screen.getByPlaceholderText('Etunimi')
  const lastNameInput = screen.getByPlaceholderText('Sukunimi')
  const titleInput = screen.getByPlaceholderText('Titteli')
  expect(firstNameInput).toBeDefined()
  expect(lastNameInput).toBeDefined()
  expect(titleInput).toBeDefined()
})

test('Cancel button calls setLisäystila', () => {
  const mockSetLisäystila = jest.fn()
  render(
    <EmployeeAdd
      setLisäystila={mockSetLisäystila}
      setIsPositive={jest.fn()}
      setMessage={jest.fn()}
      setShowMessage={jest.fn()}
    />
  )
  const cancelButton = screen.getByDisplayValue('Peruuta')
  fireEvent.click(cancelButton)
  expect(mockSetLisäystila.mock.calls).toHaveLength(1)
})