import { useState } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

interface InputProps {
  label: string
}

const InputSearchBar = ({ label }: InputProps) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value)
  }

  return (
    <TextField
      label={label}
      color="warning"
      value={searchValue}
      onChange={handleSearchInputChange}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default InputSearchBar
