import { configureStore } from '@reduxjs/toolkit'
import loginOrRegisterSlice from './reducerSlice/authSlice/loginOrRegisterSlice'

const store = configureStore({
  reducer: {
    login: loginOrRegisterSlice.reducer,
  },
})
export default store
