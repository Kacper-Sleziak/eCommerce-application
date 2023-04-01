import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import React, { useState } from 'react'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import AuthRoute from './protection_factors/AuthRoute'

const RouterRoot = () => {
  // Mock of future auth logic
  const [isAuth] = useState(true)

  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route element={<AuthRoute isAuth={isAuth} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default RouterRoot
