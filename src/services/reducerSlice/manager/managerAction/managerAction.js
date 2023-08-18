import { createSlice } from '@reduxjs/toolkit'
import {
  managerGetProfile,
  managerGetAllGroups,
  managerGetStudents,
  managerGetNotifications,
  managerPostNotificationSelect,
} from '../managerSlice/managerSlice'

const managerSlice = createSlice({
  name: 'managerSlice',
  initialState: {
    status: null,
    Insuccess: false,
    managerCard: [],
    error: null,
    managerProfile: {},
    managerStudentsStatus: null,
    managerStudents: [],
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
  },
})

export const managerAction = managerSlice.actions
export default managerSlice
