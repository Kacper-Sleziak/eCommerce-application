import Button from '@mui/material/Button'
import '../../styles/layout/navbar.css'

const LowerNavbar = (): JSX.Element => {
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
      >
        Automotive
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
      >
        Electronics
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
      >
        Office furniture
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
      >
        White goods
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
      >
        Contact
      </Button>
    </div>
  )
}

export default LowerNavbar
