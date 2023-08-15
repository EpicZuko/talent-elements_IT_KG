import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiFetch from '../../../api/ApiFetch'
import {
  getStudentProfileUrl,
  getCousesUrl,
  getStudentMyGroupUrl,
  getStudentMyprofileUrl,
} from '../../../utils/constants/url'

export const getStudentProfile = createAsyncThunk(
  'studentSlice/getStudentProfile',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: getStudentProfileUrl,
      })
      const profileStudent = {
        avatarImg: response.photo,
        name: response.fullName,
        notificationNumberCount: response.count,
      }
      return { profileStudent }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const getCoursesStudent = createAsyncThunk(
  'studentSlice/getStudentCouse',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: getCousesUrl,
      })
      const courses = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        courses.push({
          id: response[i].id,
          title: response[i].name,
          img: response[i].photo,
          percent: response[i].date_remainder,
        })
      }
      return { courses }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getStudentMyGroup = createAsyncThunk(
  'studentSlice/getStudentMyGroup',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: getStudentMyGroupUrl,
      })
      const studentMyGroupRaiting = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        studentMyGroupRaiting.push({
          id: response[i].groupId,
          img: response[i].photo,
          name: response[i].name,
          raiting: response[i].rating,
          score: response[i].score,
        })
      }
      return { studentMyGroupRaiting }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getStudentProfileProgress = createAsyncThunk(
  'studentSlice/getStudentProfileProgress',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/v1/user/getStudent/By/${props.id}`,
      })
      const studentProgressId = {
        email: response.email,
        profileImg: response.photo,
        completedCount: response.completedCount,
        inProgressCount: response.inProgressCount,
        notStartedCount: response.notStartedCount,
        studentProfileProgress: [],
      }
      studentProgressId.studentProfileProgress.push({
        id: response.id,
        email: response.email,
        name: response.name,
      })
      return { studentProgressId }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getStudentMyProfile = createAsyncThunk(
  'studentSlice/getStudentMyprofile',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      if (props.fileImg !== '') {
        await ApiFetch({
          method: 'PUT',
          url: `api/v1/user/update/photo?photo=${props.fileImg}`,
        })
        dispatch(getStudentProfile())
      }
      const response = await ApiFetch({
        url: getStudentMyprofileUrl,
      })
      const studentMyProfile = {
        profileImg: response.photo,
        completedCount: response.completedCount,
        inProgressCount: response.inProgressCount,
        notStartedCount: response.notStartedCount,
        studentMyProfile: [],
      }
      studentMyProfile.studentMyProfile.push({
        id: response.id,
        email: response.email,
        name: response.name,
      })
      return { studentMyProfile }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
