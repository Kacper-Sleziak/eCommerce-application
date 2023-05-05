import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material'
import Footer from '../layout/footer/Footer'
import Home from '../pages/Home'
// import OfferList from '../pages/OfferList'
// import Offer from '../pages/Offer'
import Navbar from '../layout/navbar/Navbar'
import Profile from '../pages/Profile'
import AuthRoute from './protection_factors/ProtectedRoute'
import theme from '../utils/materialUI/colorScheme'

const RouterRoot = () => {
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
          minWidth: '800px',
          maxWidth: '1200px',
          margin: 'auto',
        }}
      >
        <Navbar />
        <Box style={{ width: '100%', marginBottom: '1rem' }}>
          <Router>
            <Routes>
              <Route index element={<Home />} />
              <Route element={<AuthRoute user={user} protectionType="admin" />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </Router>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default RouterRoot
