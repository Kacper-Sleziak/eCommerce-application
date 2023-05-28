// import PropTypes from 'prop-types'
import '../../styles/pages/profile.css'
import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material'
import PasswordStrengthBar from 'react-password-strength-bar'

const EditProfile = () => {
  return (
    <Card className="editProfileCard">
      <Typography variant="h4">Edit your profile</Typography>
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input
          color="warning"
          // value={data.name}
          // onChange={(e) => { updateData({ type: 'name', payload: e.target.value }) }}
        />
        <FormHelperText>Enter the new email</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel>Username</InputLabel>
        <Input
          color="warning"
          // value={data.name}
          // onChange={(e) => { updateData({ type: 'name', payload: e.target.value }) }}
        />
        <FormHelperText>Enter the new username</FormHelperText>
      </FormControl>
      <Typography variant="h5">Change your password</Typography>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
      <Button
        sx={{
          width: '141px',
          height: '53px',
          filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
          background: '#FCA311',
          borderRadius: '10px',
          boxSizing: 'border-box',
          textTransform: 'none',
          fontSize: '18px',
          '&:hover': {
            background: '#121D35',
          },
        }}
      >
        Save
      </Button>
    </Card>
  )
}

export default EditProfile
