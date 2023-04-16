import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import AuthRoute from './protection_factors/ProtectedRoute'
import theme from '../utils/materialUI/colorScheme'

const RouterRoot = () => {
  // Mock of user data get from local store in future
  const user = {
    id: '123',
    nickname: 'John',
    roles: ['admin'],
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route element={<AuthRoute user={user} protectionType="admin" />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default RouterRoot
