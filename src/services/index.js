import { configureStore } from '@reduxjs/toolkit'
import { MentorInstructorBodySlice } from './mentorInstructorSlice/Body'
import { MentorInstructorHeaderSlice } from './mentorInstructorSlice/HeaderSlice'
import loginOrRegisterSlice from './reducerSlice/authSlice/loginOrRegisterSlice'

const store = configureStore({
  reducer: {
    login: loginOrRegisterSlice.reducer,
    mentorInstructorBody: MentorInstructorBodySlice.reducer,
    mentorInstructorHeader: MentorInstructorHeaderSlice.reducer,
  },
})
export default store
