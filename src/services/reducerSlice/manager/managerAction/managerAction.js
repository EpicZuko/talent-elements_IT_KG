import { createSlice } from '@reduxjs/toolkit'
import {
  managerGetProfile,
  managerGetAllGroups,
} from '../managerSlice/managerSlice'

const managerSlice = createSlice({
  name: 'managerSlice',
  initialState: {
    managerCard: [],
    error: null,
    managerProfile: {},
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
  },
})

export const managerAction = managerSlice.actions
export default managerSlice
