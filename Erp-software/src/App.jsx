import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Customers from './Components/Customers/customers.jsx'
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
   <Routes>
    <Route path="/" element={<Customers/>} />
   </Routes>
    </Router>
  )
}

export default App
