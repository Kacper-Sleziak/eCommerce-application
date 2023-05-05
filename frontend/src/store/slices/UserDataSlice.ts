import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export enum Role {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  CONTRAST = 'contrast',
}

export interface IUserInfo {
  name: string
  email: string
  nickname: string | null
  roles: Role[]
}

export interface IUserPreferences {
  theme: Theme
  fontSize: number
}

export interface IUserDataState {
  userInfo: IUserInfo | null
  userPreferences: IUserPreferences
}

const initialState: IUserDataState = {
  userInfo: {
    name: 'Olga',
    email: 'fasolka@wp.pl',
    nickname: 'oldzii',
    roles: [Role.ADMIN, Role.CLIENT],
  },
  userPreferences: { theme: Theme.CONTRAST, fontSize: 10 },
}

export const UserDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<IUserInfo | null>) => {
      state.userInfo = action.payload
    },

    updateUserPreferences: (state, action: PayloadAction<IUserPreferences>) => {
      state.userPreferences = action.payload
    },
  },
})

export const { updateUserInfo, updateUserPreferences } = UserDataSlice.actions

export const selectUserInfo = (state: { userData: { userInfo: IUserInfo } }) =>
  state.userData.userInfo
export const selectPreferencesInfo = (state: {
  userData: { userPreferences: IUserPreferences }
}) => state.userData.userPreferences

export default UserDataSlice.reducer
