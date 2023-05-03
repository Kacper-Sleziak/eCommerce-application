import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography } from '@mui/material'
import '../styles/home.css'

const TabCard = ({ to, text, backgroundColor, startIcon: StartIcon }) => {
  return (
    <Link to={to}>
      <Card
        sx={{
          maxWidth: '240px',
          height: '150px',
          background: backgroundColor,
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '30px',
          display: 'flex',
          fontSize: '1rem',
          alignContent: 'center',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <StartIcon
            sx={{
              color: '#FFFFFF',
              fontSize: '3rem',
              marginRight: '1rem',
            }}
          />
          <Typography variant="body1" className="styledA">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

TabCard.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  startIcon: PropTypes.elementType.isRequired,
  backgroundColor: PropTypes.string.isRequired,
}

export default TabCard
