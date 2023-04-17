import * as React from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
// seach in input or in diffrent component?
import SearchIcon from '@mui/icons-material/Search'

interface InputProps {
  title: string
  search?: boolean
}

// add basic value for search
const InputMui = ({ title, search }: InputProps) => {
  // Unexpected nullable boolean value in conditional. Please handle the nullish case explicitly
  return (
    <TextField
      id="input-with-icon-textfield"
      label={title}
      variant="outlined"
      InputProps={
        search
          ? {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }
          : {}
      }
    />
  )
}

InputMui.defaultProps = {
  search: false,
}

export default InputMui
