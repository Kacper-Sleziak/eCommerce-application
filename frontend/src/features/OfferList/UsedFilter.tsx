import { Box, Card, Typography } from '@mui/material'

interface UsedFilterProps {
  filtername: string
  filterdetail: string
}

const UsedFilter = ({ filtername, filterdetail }: UsedFilterProps) => {
  return (
    <Box sx={{ padding: '1rem' }}>
      <Typography
        sx={{
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '23px',
          color: '#000',
        }}
      >
        {filtername}
      </Typography>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box',
          width: '158px',
          height: '51px',
          left: '81px',
          top: '310px',
          background: '#FCA311',
          borderRadius: '10px',
        }}
      >
        <Typography
          sx={{
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '23px',
            color: '#000',
          }}
        >
          {filterdetail}
        </Typography>
      </Card>
    </Box>
  )
}

export default UsedFilter
