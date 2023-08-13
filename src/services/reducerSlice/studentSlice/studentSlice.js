import { createSlice } from '@reduxjs/toolkit'
import { getCoursesStudent, getStudentProfile } from './studentAction'

const initialState = {
  studentProfile: {
    studentProfile: {},
    status: null,
  },
  getStudentCourses: [],
  getStudentCousesStatus: null,
}
const studentSlice = createSlice({
  name: 'studentSlice',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getStudentProfile.pending, (state) => {
        state.studentProfile.status = 'pending'
      })
      .addCase(getStudentProfile.fulfilled, (state, action) => {
        state.studentProfile.status = 'success'
        state.studentProfile.studentProfile = action.payload.profileStudent
      })
      .addCase(getStudentProfile.rejected, (state) => {
        state.studentProfile.status = 'error'
        state.studentProfile.studentProfile = []
      })
      // get student couses

      .addCase(getCoursesStudent.pending, (state) => {
        state.getStudentCousesStatus = 'pending'
      })
      .addCase(getCoursesStudent.fulfilled, (state, action) => {
        state.getStudentCousesStatus = 'success'
        state.getStudentCourses = action.payload.courses
      })
      .addCase(getCoursesStudent.rejected, (state) => {
        state.getStudentCousesStatus = 'error'
        state.getStudentCouses = []
      })
  },
})
export const studentAction = studentSlice.actions
export default studentSlice
