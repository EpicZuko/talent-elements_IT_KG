import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiFetch from '../../../api/ApiFetch'
import { LoginUserUrl, registerUserUrl } from '../../../utils/constants/url'
import { LocalStorageFunction } from '../../../utils/helpers/localeStorage/LocalStorageFunction'

export const postLoginOrRegister = createAsyncThunk(
  'login/postLogin',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      if (props.fetchRole === 'login') {
        const response = await ApiFetch({
          url: `${LoginUserUrl}`,
          method: 'POST',
          body: props.body,
        })
        LocalStorageFunction({
          type: 'setItem',
          key: 'login',
          body: response,
        })
        return response
      }
      if (props.fetchRole === 'register') {
        const response = await ApiFetch({
          url: `${registerUserUrl}`,
          method: 'POST',
          body: props.body,
        })
        LocalStorageFunction({
          type: 'setItem',
          key: 'login',
          body: response,
        })
        return response
      }
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)

const initialState = {
  status: null,
  Isuccess: false,
  error: null,
  login: LocalStorageFunction({
    type: 'getItem',
    key: 'login',
  }) || {
    email: null,
    jwt: null,
    role: null,
    status: null,
    message: null,
  },
}
const loginOrRegisterSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    snackBarClose(state, action) {
      state.Isuccess = action.payload.Isuccess
      state.status = action.payload.status
    },
  },
  extraReducers: {
    [postLoginOrRegister.pending]: (state) => {
      state.status = 'pending'
    },
    [postLoginOrRegister.fulfilled]: (state, action) => {
      state.Isuccess = true
      state.status = 'success'
      state.login.role = action?.payload?.role
      state.login.email = action?.payload?.email
      state.login.jwt = action?.payload?.token
      state.login.message = action?.payload?.message
    },
    [postLoginOrRegister.rejected]: (state, action) => {
      state.status = 'error'
      state.Isuccess = true
      state.error = action.payload?.error
    },
  },
})

export const LoginSliceAction = loginOrRegisterSlice.actions
export default loginOrRegisterSlice
