import { configureStore } from '@reduxjs/toolkit'
import loginOrRegisterSlice from './reducerSlice/authSlice/loginOrRegisterSlice'
import { MentorInstructorBodySlice } from './reducerSlice/mentorInstructorSlice/MentorInstructor'
import getSeoAdminGroupSlice from './reducerSlice/seoAdminGroupsSlice/allGroups'

const store = configureStore({
  reducer: {
    login: loginOrRegisterSlice.reducer,
    mentorInstructor: MentorInstructorBodySlice.reducer,
    seoAdmin: getSeoAdminGroupSlice.reducer,
  },
})
export default store
