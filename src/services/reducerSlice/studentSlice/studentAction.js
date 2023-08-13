import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiFetch from '../../../api/ApiFetch'
import {
  getStudentProfileUrl,
  getCousesUrl,
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
