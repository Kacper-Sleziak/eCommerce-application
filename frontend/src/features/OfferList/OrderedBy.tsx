import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
// import Select, { SelectChangeEvent } from '@mui/material/Select'
import Select from '@mui/material/Select'

const OrderedBy: React.FC = () => {
  //   const [itemsPerPage, setItemsPerPage] = React.useState('')

  //   const handleChange = (event: SelectChangeEvent) => {
  //     setItemsPerPage(event.target.value as string)
  //   }

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Ordered by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //   value={itemsPerPage}
          label="Ordered by"
          //   onChange={handleChange}
        >
          <MenuItem value={10}>Price from lowest</MenuItem>
          <MenuItem value={25}>Price from highest</MenuItem>
          <MenuItem value={50}>Popularity</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default OrderedBy
