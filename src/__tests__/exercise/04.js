// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'
import {build, fake, sequence} from '@jackfranklin/test-data-bot'

const buildLoginForm = overrides => {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  }
}

test('submitting the form calls onSubmit with username and password', () => {
  // let submittedData
  // const handleSubmit = data => (submittedData = data)

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const userBuilder = build('User', {
    fields: {
      username: fake(f => f.internet.userName()),
      password: fake(f => f.internet.password()),
    },
  })

  const {username, password} = userBuilder()

  // const {username, password} = buildLoginForm({password: 'abc'})

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)

  // expect(submittedData).toEqual({
  //   username: 'username-test',
  //   password: 'password-test',
  // })
})

/*
eslint
  no-unused-vars: "off",
*/
