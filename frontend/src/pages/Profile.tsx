import HelloUser from '../features/Profile/HelloUser'
import EditProfile from '../features/Profile/EditProfile'
import '../styles/pages/profile.css'

const Profile = () => {
  return (
    <div className="profileCards">
      <HelloUser username="Olek" useremail="olek@gmail.com" />
      <EditProfile />
    </div>
  )
}
export default Profile
