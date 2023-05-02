import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

const InputMui = ({ title, search }) => {
  return (
    <TextField
      id="input-with-icon-textfield"
      label={title}
      variant="outlined"
      InputProps={
        search != null && search
          ? {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }
          : {}
      }
    />
  )
}

InputMui.defaultProps = {
  search: false,
}

InputMui.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool,
}

export default InputMui
