import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const PaginationBar: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setItemsPerPage(event.target.value as string)
  }

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Items</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemsPerPage}
          label="Items"
          onChange={handleChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default PaginationBar
