import { configureStore } from '@reduxjs/toolkit'
import loginOrRegisterSlice from './reducerSlice/authSlice/loginOrRegisterSlice'
import managerSlice from './reducerSlice/manager/managerAction/managerAction'
import getSeoAdminGroupSlice from './reducerSlice/seoAdminGroupsSlice/allGroups'
import staffAdminSlice from './reducerSlice/staffAdminSlice/staffAdmin'

const store = configureStore({
  reducer: {
    login: loginOrRegisterSlice.reducer,
    manager: managerSlice.reducer,
    seoAdmin: getSeoAdminGroupSlice.reducer,
    staffAdmin: staffAdminSlice.reducer,
  },
})
export default store
