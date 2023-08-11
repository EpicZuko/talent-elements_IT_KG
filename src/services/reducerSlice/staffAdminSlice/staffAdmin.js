import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiFetch from '../../../api/ApiFetch'
import {
  staffAdminGetAllGroups,
  staffAdmingetProfile,
  staffAdminfindallteachers,
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
// api/v1/staff/admin/find/all/teachers
export const getStudentStaffAdmin = createAsyncThunk(
  'staffAdmin/getStudentStaffAdmin',
  // eslin-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: staffAdminfindallteachers,
      })
      const getFindAllTeacehrs = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        const dateString = response[i].createdAt
        const dateObject = new Date(dateString)
        const dateAddOne =
          dateObject.getMonth() < 10
            ? `0${dateObject.getMonth() + 1}`
            : dateObject.getMonth() + 1
        const formattedDate = `${dateObject.toLocaleString('en-US', {
          day: '2-digit',
        })}.${dateAddOne}.${dateObject.getFullYear()}`
        getFindAllTeacehrs.push({
          raiting: response[i].id,
          img: response[i].photo,
          name: response[i].fullName,
          group: response[i].groupName,
          doctrine: response[i].lessonNames,
          dateOfRegistration: formattedDate,
        })
      }
      return { getFindAllTeacehrs }
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
    getFindTeachers: [],
    statusFindTeacher: null,
    statusFindTeacherData: [],
  },
  extraReducers: (builder) => {
    // staffAdminStudent
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
      // staffAdminStudent
      .addCase(getStudentStaffAdmin.pending, (state) => {
        state.statusFindTeacher = 'pending'
      })
      .addCase(getStudentStaffAdmin.fulfilled, (state, action) => {
        state.statusFindTeacher = 'succes'
        state.statusFindTeacherData = action.payload?.getFindAllTeacehrs
      })
      .addCase(getStudentStaffAdmin.rejected, (state) => {
        state.statusFindTeacher = 'error'
      })
  },
})

export const staffAdminAction = staffAdminSlice.actions
export default staffAdminSlice
