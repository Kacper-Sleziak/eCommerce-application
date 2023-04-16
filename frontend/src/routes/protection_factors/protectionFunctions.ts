interface IUser {
  id: string
  nickname: string
  roles: string[]
}

export const adminOnly = (user: IUser): boolean => {
  if (user.roles.includes('admin')) {
    return true
  }
  return false
}

export const noAuthOnly = (user: IUser): boolean => {
  if (user !== undefined) {
    return false
  }
  return true
}

export const authOnly = (user: IUser): boolean => {
  if (user !== undefined) {
    return true
  }
  return false
}
