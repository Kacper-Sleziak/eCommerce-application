import { Navigate, Outlet } from 'react-router-dom'
import { adminOnly, noAuthOnly, authOnly } from './protectionFunctions'

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

type ProtectionFunctionType = (user: IUser) => boolean
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
  const protectionFunction = protectionFunctions[protectionType]
  if (!protectionFunction(user)) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

ProtectedRoute.defaultProps = defaultProps

export default ProtectedRoute
