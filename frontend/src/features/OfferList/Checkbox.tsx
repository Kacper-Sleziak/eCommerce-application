/* eslint-disable react/jsx-props-no-spreading */
import Checkbox from '@mui/material/Checkbox'
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react'
import type { FilterRefInterface } from './interface/filterCallInterface'
import { updateFilters } from '../../store/slices/OfferFiltersSlice'

interface Category {
  title: string
}

interface Filter {
  value: []
  categories: Category[]
  filterlabel: string
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const CheckboxCategories = forwardRef<FilterRefInterface, Filter>(
  (props: Filter, ref) => {
    const { filterlabel } = props

    const changeFormatOfPropsValue = () => {
      const formatedProps: any = []

      props.value.forEach((element) => {
        const formatedElement = { title: element }
        formatedProps.push(formatedElement)
      })

      return formatedProps
    }

    const formatedValueProps = changeFormatOfPropsValue()
    const [value, setValue] = useState<Category[]>(formatedValueProps)

    useEffect(() => {
      const newFormatedValueProps = changeFormatOfPropsValue()
      setValue(newFormatedValueProps)
    }, [props.value])

    const dispatch = useDispatch()

    useImperativeHandle(ref, () => ({
      pushFiltersToStore() {
        const data = value?.map((filter) => filter.title)
        if (data) {
          dispatch(updateFilters({ filterName: filterlabel, data }))
        }
      },
      clearFilter() {
        setValue([])
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
        isOptionEqualToValue={(option, value) => option.title === value.title}
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
