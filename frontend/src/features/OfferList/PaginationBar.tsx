import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import {
  selectPagination,
  updatePaginationLimit,
} from '../../store/slices/OfferFiltersSlice'

const PaginationBar: React.FC = () => {
  const pagination = useSelector(selectPagination)
  const { limit } = pagination

  const dispatch = useDispatch()

  const handleSelectChange = (event: any) => {
    dispatch(updatePaginationLimit(event.target.value))
  }

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Items</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleSelectChange}
          value={limit}
          label="Items"
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
