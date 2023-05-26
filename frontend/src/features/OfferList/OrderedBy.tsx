import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'
import { useDispatch } from 'react-redux'
import { updateOrdering } from '../../store/slices/OfferFiltersSlice'

const OrderedBy: React.FC = () => {
  const [value, setValue] = React.useState('0')
  const dispatch = useDispatch()

  const orderingTable: {
    [key: string]: {
      orderBy: string
      order: string
    }
  } = {
    '0': { orderBy: 'total_price', order: 'ASC' },
    '1': { orderBy: 'total_price', order: 'DESC' },
  }

  const handleChange = (event: SelectChangeEvent) => {
    const key: string = event.target.value
    setValue(key)

    const paylod = orderingTable[key]
    dispatch(updateOrdering(paylod))
  }

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Ordered by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Ordered by"
          value={value}
          onChange={handleChange}
        >
          <MenuItem value="1">Price from lowest</MenuItem>
          <MenuItem value="2">Price from highest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default OrderedBy
