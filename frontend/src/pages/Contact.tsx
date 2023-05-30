import '../styles/pages/contact.css'
import { Button, Card, Typography, TextField } from '@mui/material'

const Contact = () => {
  return (
    <Card sx={{ margin: '0 30%' }}>
      <div className="marginAll">
        <Typography variant="h4">If you have any questions,</Typography>
        <Typography variant="h4">feel free to contact us!</Typography>
      </div>
      <div className="formFlex">
        <TextField id="message" multiline label="Message" variant="outlined" />
        <TextField id="email" label="Your email" variant="outlined" />
        <Button
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
          Send
        </Button>
      </div>
    </Card>
  )
}

export default Contact
