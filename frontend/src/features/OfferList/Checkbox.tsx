/* eslint-disable react/jsx-props-no-spreading */
import Checkbox from '@mui/material/Checkbox'
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import type { FilterRefInterface } from './utils/filterCallInterface'
import { updateFilters } from '../../store/slices/OfferFiltersSlice'

interface Category {
  title: string
}

interface Filter {
  categories: Category[]
  filterlabel: string
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const CheckboxCategories = forwardRef<FilterRefInterface, Filter>(
  (props: Filter, ref) => {
    const { filterlabel } = props
    const [value, setValue] = useState<Category[]>([])

    const dispatch = useDispatch()

    useImperativeHandle(ref, () => ({
      pushFiltersToStore() {
        const data = value.map((filter) => filter.title)
        dispatch(updateFilters({ filterName: filterlabel, data }))
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
  },
)
CheckboxCategories.displayName = 'CheckboxCategories'
export default CheckboxCategories
