/* eslint-disable no-return-assign */
/* eslint-disable no-console */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiFetch from '../../../api/ApiFetch'
import {
  MentorInstructorHeaderSeeUrl,
  MentorInstructorNotificationsUrl,
} from '../../../utils/constants/url'

export const MentorRequest = createAsyncThunk(
  'mentor-instructor/requests',
  // eslint-disable-next-line consistent-return
  async (props) => {
    try {
      if (props.page === 'groups') {
        const response = await ApiFetch({
          url: `api/teachers/${props.id}/groups`,
        })
        return response
      }
      if (props.page === 'lessons') {
        const response = await ApiFetch({
          url: `api/teachers/${props.id}/lessons`,
        })
        return response
      }
      if (props.page === 'notifcations') {
        const response = await ApiFetch({
          url: `${MentorInstructorNotificationsUrl}`,
        })
        return response
      }
    } catch {
      throw new Error('error')
    }
  }
)
export const MentorHeaderRequest = createAsyncThunk(
  'header/request',
  async () => {
    const response = await ApiFetch({
      url: `${MentorInstructorHeaderSeeUrl}`,
    })
    return response
  }
)

const initialState = {
  status: null,
  groups: [],
  lessons: [],
  notifications: [],
  courseName: '',
  name: '',
  avatar: null,
  notificationsCount: null,
}

export const MentorInstructorBodySlice = createSlice({
  name: 'mentor-instructor',
  initialState,
  reducers: {
    findLessonsByCourseName(state, action) {
      state.courseName = action.payload
    },
  },
  extraReducers: {
    [MentorRequest.pending]: (state) => {
      state.status = 'pending'
    },
    [MentorRequest.fulfilled]: (state, action) => {
      state.status = 'fullfilled'
      state.groups = action.payload
      state.lessons = action.payload
      state.notifications = action.payload
    },
    [MentorRequest.rejected]: (state) => {
      state.status = 'rejected'
    },
    [MentorHeaderRequest.pending]: (state) => {
      state.status = 'pending'
    },
    [MentorHeaderRequest.fulfilled]: (state, action) => {
      state.status = 'fullfilled'
      state.name = action.payload.fullName
      state.avatar = action.payload.photo
    },
    [MentorHeaderRequest.rejected]: (state) => {
      state.status = 'rejected'
    },
  },
})

export const MentorInstructorAction = MentorInstructorBodySlice.actions
