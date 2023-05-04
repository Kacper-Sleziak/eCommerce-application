import { Button, Stack } from '@mui/material'
import HowToUseStoreExample from '../components/HowToUseStoreExample'

const Home = () => {
  return (
    <Stack spacing={2} direction="column" alignItems="flex-start">
      <Button variant="contained" color="primary">
        Primary
      </Button>
      Home
      <HowToUseStoreExample />
    </Stack>
  )
}

export default Home
