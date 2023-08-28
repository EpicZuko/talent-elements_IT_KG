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
          type: 'removeItem',
          key: 'login',
        })
        LocalStorageFunction({
          type: 'setItem',
          key: 'login',
          body: {
            email: response.email,
            jwt: response.token,
            role: response.role,
            status: response.status,
            message: response.message,
            verificated: true,
          },
        })
        return { response, verificated: true }
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
          body: {
            email: response.email,
            jwt: response.token,
            role: response.role,
            status: response.status,
            message: response.message,
            verificated: false,
          },
        })
        return response
      }
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)
export const putVerificateUser = createAsyncThunk(
  'auth/verification',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `checking/code?email=${props.email}&code=${props.code}`,
        method: 'PUT',
      })
      return { message: response?.message }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getForgetPassword = createAsyncThunk(
  'auth/getForgetPassword',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `forget/password?email=${props.email}`,
      })
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const putCheckCodeForRestorePassword = createAsyncThunk(
  'auth/chekCodeForRestorePassowrd',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `checking/code/password?email=${props.email}&code=${props.code}`,
        method: 'PUT',
      })
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const putNewPassword = createAsyncThunk(
  'auth/putNewPassword',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `new/password?email=${props.email}&password1=${props.password}&password2=${props.repeatPassword}`,
        method: 'PUT',
      })
      return { message: response?.message }
    } catch (error) {
      return rejectWithValue(error.message)
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
    verificated: null,
  },
  vfn: null,
  emailStats: null,
  emailIsSuccess: null,
  restoreVfnSatus: null,
  restoreVfn: null,
  restoreStatus: null,
  restoreIsSuccess: false,
  codeIsSuccess: false,
  codeStatus: null,
  restoreVfnCode: false,
  isVerificated: false,
}
const loginOrRegisterSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    snackBarClose(state, action) {
      state.Isuccess = action.payload.Isuccess
      state.status = action.payload.status
      state.restoreStatus = action.payload.restoreStatus
      state.restoreIsSuccess = action.payload.restoreIsSuccess
      state.codeIsSuccess = action.payload.codeIsSuccess
      state.codeStatus = action.payload.codeStatus
      state.emailStats = action.payload.emailStats
      state.emailIsSuccess = action.payload.emailIsSuccess
    },
    emailCheckBack(state) {
      state.restoreVfn = null
      state.restoreStatus = null
    },
  },
  extraReducers: {
    [postLoginOrRegister.pending]: (state) => {
      state.status = 'pending'
    },
    [postLoginOrRegister.fulfilled]: (state, action) => {
      state.login.role = action?.payload?.response?.role
      state.login.email = action?.payload?.response?.email
      state.login.jwt = action?.payload?.response?.token
      state.login.message = action?.payload?.response?.message
      state.login.verificated = action?.payload?.verificated
      state.vfn = false
    },
    [postLoginOrRegister.rejected]: (state, action) => {
      state.status = 'error'
      state.Isuccess = true
      state.error = action.payload?.error
      LocalStorageFunction({
        type: 'removeItem',
        key: 'auth',
      })
    },
    [putVerificateUser.fulfilled]: (state, action) => {
      if (action.payload?.message === 'успешно проверено') {
        state.Isuccess = true
        state.isVerificated = true
        state.status = 'success'
        state.vfn = null
        LocalStorageFunction({
          type: 'removeItem',
          key: 'login',
        })
      }
      if (action.payload?.message === 'не верно') {
        state.Isuccess = true
        state.status = 'error'
      }
    },
    [putVerificateUser.rejected]: (state) => {
      state.Isuccess = true
      state.status = 'error'
    },
    [getForgetPassword.fulfilled]: (state, action) => {
      if (action.payload?.message === 'вы указали неверную почту') {
        state.restoreVfn = null
        state.emailIsSuccess = true
        state.emailStatus = 'error'
      } else {
        state.restoreVfn = true
        state.restoreVfnSatus = 'success'
      }
    },
    [getForgetPassword.rejected]: (state) => {
      state.restoreVfn = null
      state.restoreVfnSatus = 'error'
    },
    [putCheckCodeForRestorePassword.fulfilled]: (state, action) => {
      if (action.payload?.message === 'успешно проверено') {
        state.restoreVfn = false
        state.restoreVfnSatus = 'success'
        state.codeIsSuccess = true
        state.codeStatus = 'success'
      }
      if (action.payload?.message === 'не верно') {
        state.codeIsSuccess = true
        state.codeStatus = 'error'
      }
    },
    [putCheckCodeForRestorePassword.rejected]: (state) => {
      state.restoreVfn = false
      state.restoreIsSuccess = true
      state.restoreVfnSatus = 'error'
      state.codeIsSuccess = true
      state.codeStatus = 'error'
    },
    [putNewPassword.fulfilled]: (state, action) => {
      if (
        action.payload.message ===
        'Неверный пароль. Пароль должен содержать не менее 6 символов, 1 заглавную букву, 1 цифру и 1 символ.'
      ) {
        state.restoreIsSuccess = true
        state.restoreStatus = 'error'
        state.restoreVfnCode = true
      } else {
        state.restoreIsSuccess = true
        state.restoreStatus = 'success'
        state.restoreVfn = null
      }
    },
    [putNewPassword.rejected]: (state) => {
      state.restoreIsSuccess = true
      state.restoreStatus = 'error'
    },
  },
})

export const LoginSliceAction = loginOrRegisterSlice.actions
export default loginOrRegisterSlice
