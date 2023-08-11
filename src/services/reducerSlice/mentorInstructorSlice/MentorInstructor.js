/* eslint-disable no-plusplus */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiFetch from '../../../api/ApiFetch'
import { MentorInstructorHeaderSeeUrl } from '../../../utils/constants/url'

export const MentorGroupRequest = createAsyncThunk(
  'mentor-instructor/bodyRequests',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/teachers/${props.id}/groups`,
      })
      const data = []
      for (let i = 0; i < response.length; i++) {
        data.push({
          id: response[i].id,
          title: response[i].name,
          students: response[i].studentsId || 0,
          lesson: response[i].lessonId || 0,
          img: response[i].photo,
        })
      }
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const MentorHeaderRequest = createAsyncThunk(
  'mentor-instructor/headerRequest',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `${MentorInstructorHeaderSeeUrl}`,
      })
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  status: null,
  groups: [],
  profile: {},
}

export const MentorInstructorBodySlice = createSlice({
  name: 'mentor-instructor',
  initialState,
  extraReducers: {
    [MentorGroupRequest.pending]: (state) => {
      state.status = 'pending'
    },
    [MentorGroupRequest.fulfilled]: (state, action) => {
      state.status = 'fullfilled'
      state.groups = action.payload
    },
    [MentorGroupRequest.rejected]: (state) => {
      state.status = 'rejected'
    },
    [MentorHeaderRequest.pending]: (state) => {
      state.status = 'pending'
    },
    [MentorHeaderRequest.fulfilled]: (state, action) => {
      state.status = 'fullfilled'
      const profile = {
        name: action.payload?.fullName,
        avatar: action.payload?.photo,
        notificationsCount: action.payload?.count,
      }
      state.profile = profile
    },
    [MentorHeaderRequest.rejected]: (state) => {
      state.status = 'rejected'
    },
  },
})

export const MentorInstructorAction = MentorInstructorBodySlice.actions
