/* eslint-disable react/jsx-props-no-spreading */
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import React from 'react'

interface Category {
  title: string
}

interface Filter {
  categories: Category[]
  filterlabel: string
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const CheckboxCategories = ({ categories, filterlabel }: Filter) => {
  const [value, setValue] = React.useState<Category[]>([])

  return (
    <Autocomplete
      style={{
        backgroundColor: '#FFF',
        borderRadius: '30px',
        width: 180,
      }}
      multiple
      id="checkboxes-tags-demo"
      options={categories}
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
}

export default CheckboxCategories
