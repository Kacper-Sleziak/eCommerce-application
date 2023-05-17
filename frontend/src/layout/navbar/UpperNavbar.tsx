import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import InputSearchBar from './InputMui'
import bubbles from '../../imgs/bubbles.png'
import '../../styles/layout/navbar.css'

const UpperNavbar: React.FC = () => {
  return (
    <div className="upperNavbar">
      <div className="logo">
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
        <Button
          variant="outlined"
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
