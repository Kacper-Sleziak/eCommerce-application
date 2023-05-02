import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material'
import {
  selectUserInfo,
  selectPreferencesInfo,
  updateUserPreferences,
  Theme,
} from '../store/userData/UserDataSlice'
import { useGetRandomJokeMutation } from '../store/userData/UserDataApi'

const ExampleDispatchButton = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(updateUserPreferences({ fontSize: 12, theme: Theme.DARK }))
  }

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Change user preferences
    </Button>
  )
}

const GetAJokeButton = () => {
  const [getJoke, getJokeResult] = useGetRandomJokeMutation()

  const handleClick = () => {
    getJoke({})
  }

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClick}>
        Get random joke
      </Button>
      <Typography>
        {getJokeResult?.data?.setup} <br /> {getJokeResult?.data?.punchline}
      </Typography>
    </>
  )
}
const HowToUseStoreExample = () => {
  const userInfo = useSelector(selectUserInfo)
  const userPreferences = useSelector(selectPreferencesInfo)

  return (
    <>
      <ExampleDispatchButton />
      <Typography>
        Welcome Home {userInfo.name}, my roles are: {userInfo.roles.join(', ')}{' '}
        <br /> I like font size {userPreferences.fontSize} and{' '}
        {userPreferences.theme} theme
      </Typography>
      <GetAJokeButton />
    </>
  )
}

export default HowToUseStoreExample
