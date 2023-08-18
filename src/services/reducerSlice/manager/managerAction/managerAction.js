import { createSlice } from '@reduxjs/toolkit'
import {
  managerGetProfile,
  managerGetAllGroups,
  managerGetStudents,
  managerStudentProfile,
  managerGetNotifications,
  managerPostNotificationSelect,
  managerBlockUser,
} from '../managerSlice/managerSlice'

const managerSlice = createSlice({
  name: 'managerSlice',
  initialState: {
    status: null,
    statusblock: null,
    Insuccess: false,
    managerCard: [],
    error: null,
    managerProfile: {},
    managerStudentsStatus: null,
    managerStudents: [],
    managerStudentProfile: {
      email: null,
      profileImg: null,
      studentProfileArray: [],
      studentProfileRegister: [],
    },
    managerStudentProfleStatus: null,
    managerNotifications: [],
    managerNotificationsStatus: null,
  },

  reducers: {
    snackBarClose(state, action) {
      state.Insuccess = action.payload.Isuccess
      state.status = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(managerGetAllGroups.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(managerGetAllGroups.fulfilled, (state, action) => {
        state.loading = 'success'
        state.managerCard = action.payload?.managerCardGroup
      })
      .addCase(managerGetAllGroups.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.payload?.error.message
      })
      // get profile
      .addCase(managerGetProfile.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(managerGetProfile.fulfilled, (state, action) => {
        state.loading = 'success'
        state.managerProfile = action.payload?.managerProfile
      })
      .addCase(managerGetProfile.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.payload?.error.message
      })
      // managerStudents
      .addCase(managerGetStudents.pending, (state) => {
        state.managerStudentsStatus = 'pending'
      })
      .addCase(managerGetStudents.fulfilled, (state, action) => {
        state.managerStudentsStatus = 'success'
        state.managerStudents = action.payload?.managerStudents
      })
      .addCase(managerGetStudents.rejected, (state, action) => {
        state.managerStudentsStatus = 'error'
        state.error = action.payload?.error.message
      })
      // manager student profile
      .addCase(managerStudentProfile.pending, (state) => {
        state.managerStudentProfleStatus = 'pending'
      })
      .addCase(managerStudentProfile.fulfilled, (state, action) => {
        state.managerStudentProfleStatus = 'success'
        state.managerStudentProfile.email = action.payload.studentProfile.email
        state.managerStudentProfile.profileImg =
          action.payload.studentProfile.profileImg
        state.managerStudentProfile.studentProfileArray =
          action.payload.studentProfile.studentProfileArray
        state.managerStudentProfile.studentProfileRegister =
          action.payload.studentProfile.studentProfileRegister
      })
      .addCase(managerStudentProfile.rejected, (state) => {
        state.managerStudentProfleStatus = 'error'
        state.managerStudentProfile.studentProfileArray = []
        state.managerStudentProfile.studentProfileRegister = []
      })

      // managerNotifications
      .addCase(managerGetNotifications.pending, (state) => {
        state.managerNotificationsStatus = 'pending'
      })
      .addCase(managerGetNotifications.fulfilled, (state, action) => {
        state.managerNotificationsStatus = 'success'
        state.managerNotifications = action.payload.managerNotifications
      })
      .addCase(managerGetNotifications.rejected, (state, action) => {
        state.managerNotificationsStatus = 'error'
        state.error = action.payload?.error.message
      })
      // managerNotificationsSelected
      .addCase(managerPostNotificationSelect.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(managerPostNotificationSelect.fulfilled, (state) => {
        state.Insuccess = true
        state.status = 'success'
      })
      .addCase(managerPostNotificationSelect.rejected, (state) => {
        state.status = 'error'
        state.Insuccess = true
      })
      // managerNotificationBlock
      .addCase(managerBlockUser.pending, (state) => {
        state.statusblock = 'pending'
      })
      .addCase(managerBlockUser.fulfilled, (state) => {
        state.Insuccess = true
        state.statusblock = 'success'
      })
      .addCase(managerBlockUser.rejected, (state) => {
        state.statusblock = 'error'
        state.Insuccess = true
      })
  },
})

export const managerAction = managerSlice.actions
export default managerSlice
