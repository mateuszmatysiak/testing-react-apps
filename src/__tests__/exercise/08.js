// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {renderHook, act} from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import TestRenderer from 'react-test-renderer'

const Counter = props => {
  const {count, increment, decrement} = useCounter(props)

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  )
}

// const setup = (initialProps = {}) => {
//   const result = {}
//   function TestComponent() {
//     Object.assign(results, useCounter(initialProps))
//     return null
//   }

//   render(<TestComponent />)

//   return result
// }

test('exposes the count and increment/decrement functions', () => {
  // const result = setup()
  const {result} = renderHook(() => useCounter())
  const {act} = TestRenderer

  act(() => result.current.decrement())

  expect(result.current.count).toBe(-1)

  act(() => result.current.increment())

  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  // const result = setup({initialCount: 2})
  const {result} = renderHook(() => useCounter({initialCount: 2}))
  const {act} = TestRenderer

  act(() => result.current.decrement())

  expect(result.current.count).toBe(1)

  act(() => result.current.increment())

  expect(result.current.count).toBe(2)
})

test('allows customization of the step', () => {
  // const result = setup({step: 3})
  const {result} = renderHook(() => useCounter({step: 3}))
  const {act} = TestRenderer

  act(() => result.current.decrement())

  expect(result.current.count).toBe(-3)

  act(() => result.current.increment())

  expect(result.current.count).toBe(0)
})

test('step can changed', () => {
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 3}})

  act(() => result.current.decrement())

  expect(result.current.count).toBe(-3)

  rerender({step: 4})
  act(() => result.current.increment())

  expect(result.current.count).toBe(1)
})

// test('exposes the count and increment/decrement functions', () => {
//   render(<Counter />)

//   userEvent.click(screen.getByRole('button', {name: /decrement/i}))

//   expect(screen.getByText(/count/i)).toHaveTextContent('Count: -1')

//   userEvent.click(screen.getByRole('button', {name: /increment/i}))

//   expect(screen.getByText(/count/i)).toHaveTextContent('Count: 0')
// })

test('checks working of the passed props initialCount and step to Counter', () => {
  render(<Counter initialCount={2} step={2} />)

  userEvent.click(screen.getByRole('button', {name: /decrement/i}))

  expect(screen.getByText(/count/i)).toHaveTextContent('Count: 0')

  userEvent.click(screen.getByRole('button', {name: /increment/i}))

  expect(screen.getByText(/count/i)).toHaveTextContent('Count: 2')
})

test('checks working of the passed props initialCount to Counter', () => {
  render(<Counter initialCount={2} />)

  userEvent.click(screen.getByRole('button', {name: /decrement/i}))

  expect(screen.getByText(/count/i)).toHaveTextContent('Count: 1')

  userEvent.click(screen.getByRole('button', {name: /increment/i}))

  expect(screen.getByText(/count/i)).toHaveTextContent('Count: 2')
})

test('checks working of the passed props step to Counter', () => {
  render(<Counter step={2} />)

  userEvent.click(screen.getByRole('button', {name: /decrement/i}))

  expect(screen.getByText(/count/i)).toHaveTextContent('Count: -2')

  userEvent.click(screen.getByRole('button', {name: /increment/i}))

  expect(screen.getByText(/count/i)).toHaveTextContent('Count: 0')
})

/* eslint no-unused-vars:0 */
