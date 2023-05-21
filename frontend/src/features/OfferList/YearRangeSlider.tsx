import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

function valuetext(value: number) {
  return `${value}`
}

const YearRangeSlider: React.FC = () => {
  const [value, setValue] = React.useState<number[]>([1980, 2023])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Year range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  )
}

export default YearRangeSlider
