import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'
import Simulator from './simulation'

function App() {
  return (
    <Simulator cycles={1} />
  )
}

export default App
