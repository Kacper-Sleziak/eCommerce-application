import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { adminOnly, noAuthOnly, authOnly } from './protectionFunctions'
import { selectUserAuth } from '../../store/slices/UserDataSlice'
import type { IUserAuth } from '../../store/slices/UserDataSlice'

interface IUser {
  id: string
  nickname: string
  roles: string[]
}

interface IProps {
  user: IUser
  redirectPath?: string
  protectionType?: string
}

const defaultProps = {
  redirectPath: '/',
  protectionType: 'auth',
}

type ProtectionFunctionType = (user: IUserAuth) => boolean
interface StringFunctionMap extends Record<string, ProtectionFunctionType> {}
const protectionFunctions: StringFunctionMap = {
  auth: authOnly,
  admin: adminOnly,
  noAuth: noAuthOnly,
}

const ProtectedRoute = ({
  user,
  redirectPath,
  protectionType,
}: IProps & typeof defaultProps) => {
  const userAuth: IUserAuth = useSelector(selectUserAuth)

  const protectionFunction = protectionFunctions[protectionType]
  if (!protectionFunction(userAuth)) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

ProtectedRoute.defaultProps = defaultProps

export default ProtectedRoute
