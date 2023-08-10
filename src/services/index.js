import { configureStore } from '@reduxjs/toolkit'
import loginOrRegisterSlice from './reducerSlice/authSlice/loginOrRegisterSlice'
import getSeoAdminGroupSlice from './reducerSlice/seoAdminGroupsSlice/allGroups'
import staffAdminSlice from './reducerSlice/staffAdminSlice/staffAdmin'

const store = configureStore({
  reducer: {
    login: loginOrRegisterSlice.reducer,
    seoAdmin: getSeoAdminGroupSlice.reducer,
    staffAdmin: staffAdminSlice.reducer,
  },
})
export default store
