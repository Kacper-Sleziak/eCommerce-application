import React from 'react'
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import Looks3Icon from '@mui/icons-material/Looks3'
import Looks4Icon from '@mui/icons-material/Looks4'
import Looks5Icon from '@mui/icons-material/Looks5'
import ItemsToBuy from '../features/Cart/ItemsToBuy'
import DeliveryData from '../features/Cart/DeliveryData'
import PaymentMethod from '../features/Cart/PaymentMethod'
import RecipentData from '../features/Cart/RecipentData'
import Summary from '../features/Cart/Summary'

interface NumberedTypographyProps {
  number: React.ReactElement
  text: string
}

const NumberedTypography: React.FC<NumberedTypographyProps> = ({
  number,
  text,
}) => {
  return (
    <Box display="flex" alignItems="center" sx={{ marginTop: '1rem' }}>
      {number}
      <Typography variant="h5" sx={{ marginLeft: '0.5rem', fontWeight: 600 }}>
        {text}
      </Typography>
    </Box>
  )
}

const Cart: React.FC = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        width: '80%',
      }}
    >
      <NumberedTypography
        number={<LooksOneIcon sx={{ fontSize: 40 }} />}
        text="Items"
      />
      <ItemsToBuy />
      <NumberedTypography
        number={<LooksTwoIcon sx={{ fontSize: 40 }} />}
        text="Recipent data"
      />
      <RecipentData />
      <NumberedTypography
        number={<Looks3Icon sx={{ fontSize: 40 }} />}
        text="Delivery method"
      />
      <DeliveryData />
      <NumberedTypography
        number={<Looks4Icon sx={{ fontSize: 40 }} />}
        text="Payment method"
      />
      <PaymentMethod />
      <NumberedTypography
        number={<Looks5Icon sx={{ fontSize: 40 }} />}
        text="Summary"
      />
      <Summary />
      <FormControlLabel
        control={<Checkbox value="allowExtraEmails" color="secondary" />}
        label="I declare that I have read the terms and conditions and agree with them.*"
        sx={{ marginTop: '1rem' }}
      />
      <div className="orderAndPayButton">
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            width: '20%',
            background: '#FCA311',
            color: '#FFF',
            borderRadius: '10px',
            boxSizing: 'border-box',
            fontSize: '18px',
            textTransform: 'none',
            '&:hover': {
              background: '#121D35',
            },
          }}
        >
          Order and Pay
        </Button>
      </div>
    </Card>
  )
}

export default Cart
