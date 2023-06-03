import { useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import HelloUser from '../features/Profile/HelloUser'
import EditProfile from '../features/Profile/EditProfile'
import '../styles/pages/profile.css'
import { useGetMeQuery } from '../store/services/UserDataApi'
import { selectUserAuth } from '../store/slices/UserDataSlice'

const Profile = () => {
  const userAuth = useSelector(selectUserAuth)

  const { data, error, isLoading } = useGetMeQuery(userAuth.accessToken)

  const renderProfile = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )
    }

    if (error !== undefined) {
      if ('status' in error) {
        const errMsg =
          'error' in error ? error.error : JSON.stringify(error.data)

        return (
          <div>
            <div>An error has occurred:</div>
            <div>{errMsg}</div>
          </div>
        )
      }
      return <div>{error.message}</div>
    }

    if (data !== undefined) {
      return (
        <div className="profileCards">
          <HelloUser username={data.username} useremail={data.email} />
          <EditProfile />
        </div>
      )
    }
    return <h1>No data to show</h1>
  }

  return <>{renderProfile()}</>
}
export default Profile
