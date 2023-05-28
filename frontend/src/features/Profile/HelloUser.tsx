import PropTypes from 'prop-types'
import '../../styles/pages/profile.css'
import { Button, Card, IconButton, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

interface IUserProps {
  username: string
  useremail: string
}

const HelloUser: React.FC<IUserProps> = ({ username, useremail }) => {
  return (
    <Card className="cardHelloUser">
      <div className="textHelloUser">
        <Typography variant="h4" sx={{ marginTop: '1rem' }}>
          Hello {username}
        </Typography>
        <Typography
          variant="h6"
          sx={{ marginBottom: '1rem', color: '#585858' }}
        >
          {useremail}
        </Typography>
      </div>
      <div className="buttonHelloUser">
        <Button
          color="primary"
          endIcon={<ArrowForwardIcon />}
          sx={{
            width: '160px',
            height: '60px',
            background: '#FCA311',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            borderRadius: '10px',
            fontWeight: '600',
            textTransform: 'none',
            fontSize: '16px',
            '&:hover': {
              background: '#121D35',
            },
          }}
        >
          Check your auctions
        </Button>
      </div>
    </Card>
  )
}

HelloUser.propTypes = {
  username: PropTypes.string.isRequired,
  useremail: PropTypes.string.isRequired,
}

export default HelloUser
