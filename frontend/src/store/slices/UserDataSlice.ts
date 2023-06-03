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

export interface IUserAuth {
  accessToken: string
}

export interface IUserPreferences {
  theme: Theme
  fontSize: number
}

export interface IUserDataState {
  userInfo: IUserInfo | null
  userPreferences: IUserPreferences
  userAuth: IUserAuth | null
}

const initialState: IUserDataState = {
  userInfo: {
    name: '',
    email: '',
    nickname: '',
    roles: [Role.ADMIN, Role.CLIENT],
  },
  userPreferences: { theme: Theme.CONTRAST, fontSize: 10 },
  userAuth: null,
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

    updateUserAuth: (state, action: PayloadAction<IUserAuth>) => {
      state.userAuth = action.payload
    },

    logoutUser: (state) => {
      console.log(state.userAuth)
      state.userAuth = null
    },
  },
})

export const {
  updateUserInfo,
  updateUserPreferences,
  updateUserAuth,
  logoutUser,
} = UserDataSlice.actions

export const selectUserInfo = (state: { userData: { userInfo: IUserInfo } }) =>
  state.userData.userInfo
export const selectPreferencesInfo = (state: {
  userData: { userPreferences: IUserPreferences }
}) => state.userData.userPreferences
export const selectUserAuth = (state: { userData: { userAuth: IUserAuth } }) =>
  state.userData.userAuth

export default UserDataSlice.reducer
