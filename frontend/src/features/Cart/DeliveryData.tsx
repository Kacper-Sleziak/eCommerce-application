import React, { useState } from 'react'
import Card from '@mui/material/Card'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

const DeliveryData: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  return (
    <Card
      sx={{
        width: '270px',
        display: 'flex',
        flexDirection: 'row',
        padding: '1rem',
        borderRadius: '30px',
      }}
    >
      <RadioGroup
        aria-label="gender"
        name="gender"
        value={selectedValue}
        onChange={handleChange}
        sx={{ marginLeft: '1rem' }}
      >
        <FormControlLabel
          value="Courier delivery"
          control={<Radio color="secondary" />}
          label="Courier: 10zł"
        />
        <FormControlLabel
          value="Paczkomat"
          control={<Radio color="secondary" />}
          label="Paczkomat: 8zł"
        />
      </RadioGroup>
    </Card>
  )
}

export default DeliveryData
