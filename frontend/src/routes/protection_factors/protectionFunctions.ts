import type { IUserAuth } from '../../store/slices/UserDataSlice'

export const adminOnly = (user: IUserAuth): boolean => {
  // if (user.roles.includes('admin')) {
  //   return true
  // }
  return false
}

export const noAuthOnly = (userAuth: IUserAuth): boolean => {
  if (userAuth !== null) {
    return false
  }
  return true
}

export const authOnly = (userAuth: IUserAuth): boolean => {
  if (userAuth !== null) {
    return true
  }
  return false
}
