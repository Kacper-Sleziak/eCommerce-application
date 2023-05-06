import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'

const RatingStart = () => {
  const [value] = useState<number | null>(2)

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly />
    </Box>
  )
}

export default RatingStart
