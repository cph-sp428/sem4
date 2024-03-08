import { useState } from 'react'
import './App.css'
import Counter from './Counter'
import UseAuthComponent from './UseAuthComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Counter />
      <UseAuthComponent />
    </>
  )
}

export default App
