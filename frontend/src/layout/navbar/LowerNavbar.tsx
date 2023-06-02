import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import '../../styles/layout/navbar.css'

const LowerNavbar = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className="lowerNavbar">
      <Button
        sx={{
          color: '#000',
          background: '#fff',
          border: '#000 !important',
          fontSize: '18px',
          fontWeight: '550',
          fontStyle: 'normal',
          textTransform: 'none',
          '&:hover': {
            background: '#fca311',
          },
        }}
        onClick={() => {
          navigate('/offers')
        }}
      >
        Offers
      </Button>
      <Button
        sx={{
          color: '#000',
          background: '#fff',
          border: '#000 !important',
          fontSize: '18px',
          fontWeight: '550',
          fontStyle: 'normal',
          textTransform: 'none',
          '&:hover': {
            background: '#fca311',
          },
        }}
        onClick={() => {
          navigate('/contact')
        }}
      >
        Contact
      </Button>
    </div>
  )
}

export default LowerNavbar
