import React from 'react'
import {
  Card,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@mui/material'
import '../../styles/pages/cart.css'

const RecipentData = () => {
  return (
    <Card
      sx={{
        width: '750px',
        display: 'flex',
        flexDirection: 'row ',
        justifyContent: 'space-evenly',
        marginTop: '1rem',
        padding: '1rem',
        borderRadius: '30px',
      }}
    >
      <div className="firstRecipentData">
        <FormControl sx={{ marginTop: '1rem' }}>
          <InputLabel>Email</InputLabel>
          <Input color="warning" />
          <FormHelperText>Enter your email</FormHelperText>
        </FormControl>
        <FormControl sx={{ marginTop: '1rem' }}>
          <InputLabel>Name</InputLabel>
          <Input color="warning" />
          <FormHelperText>Enter your name</FormHelperText>
        </FormControl>
        <FormControl sx={{ marginTop: '1rem' }}>
          <InputLabel>Surname</InputLabel>
          <Input color="warning" />
          <FormHelperText>Enter your surname</FormHelperText>
        </FormControl>
        <FormControl sx={{ marginTop: '1rem' }}>
          <InputLabel>Phone</InputLabel>
          <Input color="warning" />
          <FormHelperText>Enter your phone number</FormHelperText>
        </FormControl>
      </div>
      <div className="thirdRecipentData">
        <div className="secondRecipentData">
          <FormControl sx={{ marginTop: '1rem', width: '65%' }}>
            <InputLabel>Street</InputLabel>
            <Input color="warning" />
            <FormHelperText>Enter the name of the street </FormHelperText>
          </FormControl>
          <FormControl sx={{ marginTop: '1rem', width: '30%' }}>
            <InputLabel>Number</InputLabel>
            <Input color="warning" />
            <FormHelperText>Enter building number </FormHelperText>
          </FormControl>
        </div>
        <div className="secondRecipentData">
          <FormControl sx={{ marginTop: '1rem', width: '35%' }}>
            <InputLabel>Postal Code</InputLabel>
            <Input color="warning" />
            <FormHelperText>Enter postal code </FormHelperText>
          </FormControl>
          <FormControl sx={{ marginTop: '1rem', width: '60%' }}>
            <InputLabel>City</InputLabel>
            <Input color="warning" />
            <FormHelperText>Enter the name of the city </FormHelperText>
          </FormControl>
        </div>
        <FormControl sx={{ marginTop: '1rem', width: '70%' }}>
          <InputLabel>Country</InputLabel>
          <Input color="warning" />
          <FormHelperText>Enter the name of the country </FormHelperText>
        </FormControl>
      </div>
    </Card>
  )
}

export default RecipentData
