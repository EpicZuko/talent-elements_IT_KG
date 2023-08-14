import { createSlice } from '@reduxjs/toolkit'
import {
  getCoursesStudent,
  getStudentMyGroup,
  getStudentProfile,
} from './studentAction'

const initialState = {
  studentProfile: {
    studentProfile: {},
    status: null,
  },
  getStudentCourses: [],
  getStudentCousesStatus: null,
  getStudentMyGroup: [],
  getStudentMyGroupStatus: null,
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
      // getStudentMyGroup
      .addCase(getStudentMyGroup.pending, (state) => {
        state.getStudentMyGroupStatus = 'pending'
      })
      .addCase(getStudentMyGroup.fulfilled, (state, action) => {
        state.getStudentMyGroupStatus = 'success'
        state.getStudentMyGroup = action.payload.studentMyGroupRaiting
      })
      .addCase(getStudentMyGroup.rejected, (state) => {
        state.getStudentMyGroup = 'error'
        state.getStudentMyGroup = []
      })
  },
})
export const studentAction = studentSlice.actions
export default studentSlice
