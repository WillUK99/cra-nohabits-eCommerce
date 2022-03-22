import React from 'react'
import { Routes, Route } from 'react-router-dom'

import "./App.css"
import NavBar from './routes/navigation/navigation.component'
import Home from './routes/home/home.component'
import Authentication from './routes/authentication/authentication.component'

function App() {
  return (
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Authentication/>} />
        </Route>
      </Routes> 
  )
}

export default App