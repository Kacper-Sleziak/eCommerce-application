import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  isAuth: boolean
  redirectPath?: string
}

const defaultProps = {
  redirectPath: '/',
}

const AuthRoute = ({ isAuth, redirectPath }: Props & typeof defaultProps) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />
  }
  return <Outlet />
}

AuthRoute.defaultProps = defaultProps

export default AuthRoute
