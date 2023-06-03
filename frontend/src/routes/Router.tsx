import '../styles/pages/home.css'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material'
import Footer from '../layout/footer/Footer'
import AddOffer from '../pages/AddOffer'
import Cart from '../pages/Cart'
import Contact from '../pages/Contact'
import Home from '../pages/Home'
import OfferList from '../pages/OfferList'
import Offer from '../pages/Offer'
import Navbar from '../layout/navbar/Navbar'
import Profile from '../pages/Profile'
import AuthRoute from './protection_factors/ProtectedRoute'
import theme from '../utils/materialUI/colorScheme'
import SignIn from '../pages/SignIn'
import SignOut from '../pages/SignOut'
import SignUp from '../pages/SignUp'
import NotFoundPage from '../pages/NotFound'

const RouterRoot = () => {
  const user = {
    id: '123',
    nickname: 'John',
    roles: ['admin'],
  }

  document.title = 'POST LEASE GOODS'

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
          minHeight: '100vh',
        }}
      >
        <Router>
          <Navbar />
          <Box
            className="boxClass"
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            <Routes>
              <Route element={<AuthRoute user={user} protectionType="auth" />}>
                <Route path="/addoffer" element={<AddOffer />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route
                element={<AuthRoute user={user} protectionType="noAuth" />}
              >
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
              </Route>

              <Route path="/" element={<Home />} />
              <Route path="/offers" element={<OfferList />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/offerdetails" element={<Offer />} />
              <Route path="/signout" element={<SignOut />} />
              <Route path="/cart" element={<Cart />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>
        </Router>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default RouterRoot
