import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ApiFetch from '../../../api/ApiFetch'
import {
  seoAdminGetAllGroupsUrl,
  seoAdminProfileUrl,
} from '../../../utils/constants/url'

export const getProfile = createAsyncThunk(
  'seoAdmin/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `${seoAdminProfileUrl}`,
      })
      const notification = {
        avatarImg: response?.photo,
        name: response?.fullName,
        notificationNumberCount: response?.count,
      }
      return notification
    } catch (error) {
      return rejectWithValue(error?.card)
    }
  }
)

export const getAllGroups = createAsyncThunk(
  'seoAdmin/getAllGroups',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `${seoAdminGetAllGroupsUrl}`,
      })
      const cardGroup = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        cardGroup.push({
          id: response[i].id,
          img: response[i].photo,
          students: response[i].countStudent,
          title: response[i].groupName,
        })
      }
      return cardGroup
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)

export const getSeoAdminInstructorMentor = createAsyncThunk(
  'seoAdmin/getSeoAdminInstructorMentor',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: 'api/v1/seo/admin/get/all/teachers/for/seoAdmin',
      })
      const teachersArray = []
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

        teachersArray.push({
          id: response[i].id,
          raiting: response[i].id,
          name: response[i].fullName,
          img: response[i].photo,
          group: response[i].groupName,
          doctrine: response[i].lessonNames,
          dateOfRegistration: formattedDate,
        })
      }
      return { teachersArray }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const getStudentsId = createAsyncThunk(
  'seoAdmin/getStudentsId',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/v1/seo/admin/find/all/student/group/by/id?groupId=${props?.id}`,
      })
      const studentsId = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        const dateString = response[i].created
        const dateObject = new Date(dateString)
        const dateAddOne =
          dateObject.getMonth() < 10
            ? `0${dateObject.getMonth() + 1}`
            : dateObject.getMonth() + 1
        const formattedDate = `${dateObject.toLocaleString('en-US', {
          day: '2-digit',
        })}.${dateAddOne}.${dateObject.getFullYear()}`
        studentsId.push({
          id: response[i].id,
          raiting: response[i].id,
          img: response[i].photo,
          name: response[i].name,
          dateOfRegistration: formattedDate,
        })
      }
      return { studentsId }
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)
const getSeoAdminGroupSlice = createSlice({
  name: 'seoAdminGroupsSlce',
  initialState: {
    card: [],
    error: null,
    profileSeoAdmin: {},
    teachers: [],
    teachersStatus: null,
    studentsStatus: null,
    students: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroups.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.loading = 'success'
        state.card = action.payload
      })
      .addCase(getAllGroups.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.payload?.error.message
      })
      // get profile
      .addCase(getProfile.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = 'success'
        state.profileSeoAdmin = action.payload
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.payload?.error.message
      })
      // getallteachers seo admin
      .addCase(getSeoAdminInstructorMentor.pending, (state) => {
        state.teachersStatus = 'pending'
      })
      .addCase(getSeoAdminInstructorMentor.fulfilled, (state, action) => {
        state.teachersStatus = 'success'
        state.teachers = action.payload?.teachersArray
      })
      .addCase(getSeoAdminInstructorMentor.rejected, (state) => {
        state.teachersStatus = 'error'
      })
      // getStudentsId seo admin
      .addCase(getStudentsId.pending, (state) => {
        state.studentsStatus = 'pending'
      })
      .addCase(getStudentsId.fulfilled, (state, action) => {
        state.studentsStatus = 'success'
        state.students = action.payload?.studentsId
      })
      .addCase(getStudentsId.rejected, (state) => {
        state.studentsStatus = 'error'
      })
  },
})

export const getAllGroupAction = getSeoAdminGroupSlice.actions
export default getSeoAdminGroupSlice
