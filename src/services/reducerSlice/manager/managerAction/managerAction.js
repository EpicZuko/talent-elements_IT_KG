import { createSlice } from '@reduxjs/toolkit'
import {
  managerGetProfile,
  managerGetAllGroups,
  managerGetStudents,
} from '../managerSlice/managerSlice'

const managerSlice = createSlice({
  name: 'managerSlice',
  initialState: {
    managerCard: [],
    error: null,
    managerProfile: {},
    managerStudentsStatus: null,
    managerStudents: [],
  },

  reducers: {},
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
  },
})

export const managerAction = managerSlice.actions
export default managerSlice
