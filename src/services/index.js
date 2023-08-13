import { configureStore } from '@reduxjs/toolkit'
import loginOrRegisterSlice from './reducerSlice/authSlice/loginOrRegisterSlice'
import managerSlice from './reducerSlice/manager/managerAction/managerAction'
import { MentorInstructorSlice } from './reducerSlice/mentorInstructorSlice/MentorInstructor'
import getSeoAdminGroupSlice from './reducerSlice/seoAdminGroupsSlice/allGroups'
import staffAdminSlice from './reducerSlice/staffAdminSlice/staffAdmin'
import studentSlice from './reducerSlice/studentSlice/studentSlice'

const store = configureStore({
  reducer: {
    login: loginOrRegisterSlice.reducer,
    manager: managerSlice.reducer,
    mentorInstructor: MentorInstructorSlice.reducer,
    seoAdmin: getSeoAdminGroupSlice.reducer,
    staffAdmin: staffAdminSlice.reducer,
    student: studentSlice.reducer,
  },
})
export default store
