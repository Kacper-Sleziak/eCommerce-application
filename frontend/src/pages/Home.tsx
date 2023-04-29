import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material'
import { selectUserInfo, selectPreferencesInfo, updateUserPreferences, Theme } from '../store/userData/UserDataSlice'


const ExampleDispatchButton = () => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateUserPreferences({ fontSize: 12, theme: Theme.DARK }))
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Change user preferences
      </Button>
    </>
  )
}

const Home = () => {
  const userInfo = useSelector(selectUserInfo)
  const userPreferences = useSelector(selectPreferencesInfo);

  return (
    <>
      <ExampleDispatchButton />
      <Typography>Welcome Home {userInfo.name}, my roles are: {userInfo.roles.join(', ')} <br /> I like font size {userPreferences.fontSize} and {userPreferences.theme} theme</Typography>
    </>
  )
}

export default Home
