import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import AuthRoute from './protection_factors/ProtectedRoute'
import theme from '../utils/materialUI/colorScheme'
import Navbar from '../pages/Navbar'

const RouterRoot = () => {
  // Mock of user data get from local store in future
  const user = {
    id: '123',
    nickname: 'John',
    roles: ['admin'],
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Navbar />
        <Box style={{ width: '100%', height: '1000px' }}>
          <Router>
            <Routes>
              <Route index element={<Home />} />
              <Route element={<AuthRoute user={user} protectionType="admin" />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </Router>
        </Box>
        <div style={{ height: '200px', width: '100%', background: 'pink' }}>
          footer
        </div>
      </Box>
    </ThemeProvider>
  )
}

export default RouterRoot
