import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateOrdering,
  updatePage,
  selectOrdering,
} from '../../store/slices/OfferFiltersSlice'

type OrderingTableType = Record<string, { orderBy: string; order: string }>

const OrderedBy: React.FC = () => {
  const ordering = useSelector(selectOrdering)
  const order = ordering?.order

  const [value, setValue] = React.useState('0')

  const orderingTable: OrderingTableType = {
    '0': { orderBy: 'total_price', order: 'ASC' },
    '1': { orderBy: 'total_price', order: 'DESC' },
  }

  useEffect(() => {
    for (const key in orderingTable) {
      if (order && orderingTable[key].order === order) {
        setValue(key)
      }
    }
  }, [order])

  const dispatch = useDispatch()

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(updatePage(1))
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
          <MenuItem value="0">Price from lowest</MenuItem>
          <MenuItem value="1">Price from highest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default OrderedBy
