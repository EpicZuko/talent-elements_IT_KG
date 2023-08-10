import { configureStore } from '@reduxjs/toolkit'
import loginOrRegisterSlice from './reducerSlice/authSlice/loginOrRegisterSlice'
import getSeoAdminGroupSlice from './reducerSlice/seoAdminGroupsSlice/allGroups'

const store = configureStore({
  reducer: {
    login: loginOrRegisterSlice.reducer,
    seoAdmin: getSeoAdminGroupSlice.reducer,
  },
})
export default store
