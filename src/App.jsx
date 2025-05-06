import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PasswordHint from './components/PasswordHint'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PasswordHint></PasswordHint>
  
    </>
  )
}

export default App
