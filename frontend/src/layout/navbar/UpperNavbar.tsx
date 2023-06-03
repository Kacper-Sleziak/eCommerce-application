import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import InputSearchBar from './InputMui'
import ProfileBar from './ProfileBar'
import bubbles from '../../imgs/bubbles.png'
import '../../styles/layout/navbar.css'
import { selectUserAuth, logoutUser } from '../../store/slices/UserDataSlice'
import type { IUserAuth } from '../../store/slices/UserDataSlice'

const UpperNavbar: React.FC = () => {
  const userAuth: IUserAuth = useSelector(selectUserAuth)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/signin')
  }

  const handleMyProfile = () => {
    navigate('/profile')
  }

  const navigateToCart = () => {
    navigate('/cart')
  }

  const renderSignIn = () => {
    if (userAuth === null) {
      return (
        <Button
          href="/signin"
          className="signInButton"
          variant="outlined"
          sx={{
            color: '#000',
            background: '#fff',
            border: '2px solid #000 !important',
            fontWeight: '500',
            fontStyle: 'normal',
            fontSize: '20px',
            lineHeight: '23px',
            textTransform: 'none',
            padding: '0.5rem 1rem',
          }}
        >
          Sign in
        </Button>
      )
    }
    return null
  }

  return (
    <div className="upperNavbar">
      <div
        className="logo"
        onClick={() => {
          navigate('/')
        }}
      >
        <Card style={{ boxShadow: 'none' }}>
          <CardMedia className="logoIcon" image={bubbles} title="My Image" />
        </Card>
        <Typography
          variant="h4"
          component="h2"
          className="logoText"
          sx={{ fontFamily: 'Arial' }}
        >
          Post-lease
        </Typography>
      </div>
      <InputSearchBar label="Search..." />
      <div className="upperNavbarButtons">
        <ProfileBar onLogout={handleLogout} onMyProfile={handleMyProfile} />
        {renderSignIn()}
        <Button
          onClick={navigateToCart}
          variant="outlined"
          href="/"
          startIcon={<ShoppingBagIcon />}
          sx={{
            color: '#000',
            background: '#fff',
            border: '#000 !important',
            fontSize: '20px',
            fontWeight: '500',
            fontStyle: 'normal',
            textTransform: 'none',
          }}
        >
          Cart (0)
        </Button>
      </div>
    </div>
  )
}

export default UpperNavbar
