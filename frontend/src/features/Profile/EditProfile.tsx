// import PropTypes from 'prop-types'
import '../../styles/pages/profile.css'
import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import PasswordStrengthBar from 'react-password-strength-bar'

const EditProfile = () => {
  return (
    <Card className="editProfileCard">
      <Typography variant="h4" sx={{ marginTop: '1rem', marginLeft: '1rem' }}>
        Change your password
      </Typography>
      <div className="editInputs">
        <Grid className="changePasswordGrid">
          <TextField
            required
            fullWidth
            name="password"
            label="Current password"
            type="password"
            id="password"
            //   autoComplete="new-password"
            color="secondary"
          />
        </Grid>
        <Grid className="changePasswordGrid">
          <TextField
            required
            fullWidth
            name="password"
            label="New password"
            type="password"
            id="password"
            autoComplete="new-password"
            color="secondary"
          />
          <PasswordStrengthBar />
        </Grid>
      </div>
      <div className="saveButton">
        <Button
          sx={{
            width: '141px',
            height: '53px',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            background: '#FCA311',
            borderRadius: '10px',
            boxSizing: 'border-box',
            textTransform: 'none',
            fontWeight: '600',
            fontSize: '16px',
            '&:hover': {
              background: '#121D35',
            },
          }}
        >
          Save
        </Button>
      </div>
    </Card>
  )
}

export default EditProfile
