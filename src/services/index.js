import { configureStore } from '@reduxjs/toolkit'
import loginOrRegisterSlice from './reducerSlice/authSlice/loginOrRegisterSlice'
import { MentorInstructorSlice } from './reducerSlice/mentorInstructorSlice/MentorInstructor'
import getSeoAdminGroupSlice from './reducerSlice/seoAdminGroupsSlice/allGroups'
import staffAdminSlice from './reducerSlice/staffAdminSlice/staffAdmin'

const store = configureStore({
  reducer: {
    login: loginOrRegisterSlice.reducer,
    mentorInstructor: MentorInstructorSlice.reducer,
    seoAdmin: getSeoAdminGroupSlice.reducer,
    staffAdmin: staffAdminSlice.reducer,
  },
})
export default store
