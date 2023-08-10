import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiFetch from '../../../api/ApiFetch'
import {
  staffAdminGetAllGroups,
  staffAdmingetProfile,
} from '../../../utils/constants/url'

export const getAllCouseCardStaffAdmin = createAsyncThunk(
  'staffAdmin/getAllCouseCardStaffAdmin',
  // eslint-disable-next-line consistent-return
  async (_, rejectWithValue) => {
    try {
      const response = await ApiFetch({
        url: staffAdminGetAllGroups,
      })
      const getAllCouseStaffAdmin = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        getAllCouseStaffAdmin.push({
          id: response[i].id,
          title: response[i].description,
          img: response[i].photo,
          students: response[i].studentsId,
          lesson: response[i].lessonId,
        })
      }

      return { getAllCouseStaffAdmin }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
// api/v1/staff/admin/see/header/profile
export const getProfileStaffAdmin = createAsyncThunk(
  'staffAdmin/getProfileStaffAdmin',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: staffAdmingetProfile,
      })
      const getProfileStaffAdmin = {
        avatarImg: response?.photo,
        name: response?.fullName,
        notificationNumberCount: response?.count,
      }

      return { getProfileStaffAdmin }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
const staffAdminSlice = createSlice({
  name: 'staffAdminSlice',
  initialState: {
    cardCouses: [],
    statusgetAllCouseCard: null,
    getProfileStaffAdmin: {},
    statusgetProfile: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCouseCardStaffAdmin.pending, (state) => {
        state.getAllCouseCardStaffAdmin = 'pending'
      })
      .addCase(getAllCouseCardStaffAdmin.fulfilled, (state, action) => {
        state.statusgetAllCouseCard = 'success'
        state.cardCouses = action.payload?.getAllCouseStaffAdmin
      })
      .addCase(getAllCouseCardStaffAdmin.rejected, (state) => {
        state.statusgetAllCouseCard = 'error'
      })
      // staffAdming get profile
      .addCase(getProfileStaffAdmin.pending, (state) => {
        state.statusgetProfile = 'pending'
      })
      .addCase(getProfileStaffAdmin.fulfilled, (state, action) => {
        state.statusgetProfile = 'success'
        state.getProfileStaffAdmin = action.payload?.getProfileStaffAdmin
      })
      .addCase(getProfileStaffAdmin.rejected, (state) => {
        state.statusgetProfile = 'error'
      })
  },
})
export const staffAdminAction = staffAdminSlice.actions
export default staffAdminSlice
