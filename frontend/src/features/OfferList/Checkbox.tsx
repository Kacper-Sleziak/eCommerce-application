/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable */
import Checkbox from '@mui/material/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { IAlert } from './utils/filterCallInterface'
import {
  updateFilters,
  selectOfferFilters,
} from '../../store/slices/OfferFiltersSlice'

interface Category {
  title: string
}

interface Filter {
  categories: Category[]
  filterlabel: string
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const CheckboxCategories = forwardRef<IAlert, Filter>((props: Filter, ref) => {
  const { categories, filterlabel } = props
  const [value, setValue] = React.useState<Category[]>([])
  const dispatch = useDispatch()
  const filtersInfo = useSelector(selectOfferFilters)

  useImperativeHandle(ref, () => ({
    getAlert() {
      dispatch(updateFilters({ filterName: 'brand', data: ['bmw'] }))

    },
  }))

  return (
    <Autocomplete
      style={{
        backgroundColor: '#FFF',
        borderRadius: '30px',
        width: 180,
      }}
      multiple
      id="checkboxes-tags-demo"
      options={props.categories}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      onChange={(
        event: React.SyntheticEvent<Element, Event>,
        newValue: Category[],
        reason: string,
        details?: any,
      ) => {
        setValue(newValue)
      }}
      value={value}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={filterlabel}
          sx={{ '& label': { color: '#000' } }}
        />
      )}
    />
  )
})

export default CheckboxCategories
