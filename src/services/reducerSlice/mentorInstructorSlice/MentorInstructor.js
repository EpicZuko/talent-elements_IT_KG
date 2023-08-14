/* eslint-disable no-plusplus */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiFetch from '../../../api/ApiFetch'
import {
  mentorInstructorGetAllGroupsUrl,
  mentorProfileUrl,
} from '../../../utils/constants/url'

export const getMentorGroups = createAsyncThunk(
  'mentor-instructor/getMentorGroups',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: mentorInstructorGetAllGroupsUrl,
      })
      const getGroups = []
      for (let i = 0; i < response.length; i++) {
        getGroups.push({
          id: response[i].id,
          title: response[i].groupName,
          students: response[i].countStudent,
          lesson: response[i].countCourses,
          img: response[i].photo,
        })
      }

      return { getGroups }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getMentorProfile = createAsyncThunk(
  'mentor-instructor/getMentorProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: mentorProfileUrl,
      })
      const getProfile = {
        name: response.fullName,
        avatar: response.photo,
        notificationsCount: response.count,
      }
      return { getProfile }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  getCardGroupsStatus: null,
  getCardGroups: [],
  getProfileStatus: null,
  getProfile: {},
}

export const MentorInstructorSlice = createSlice({
  name: 'mentor-instructor',
  initialState,
  extraReducers: {
    [getMentorGroups.pending]: (state) => {
      state.getCardGroupsStatus = 'pending'
    },
    [getMentorGroups.fulfilled]: (state, action) => {
      state.getCardGroupsStatus = 'fullfilled'
      state.getCardGroups = action.payload?.getGroups
    },
    [getMentorGroups.rejected]: (state) => {
      state.getCardGroupsStatus = 'rejected'
    },
    // get mentor profile
    [getMentorProfile.pending]: (state) => {
      state.getProfileStatus = 'pending'
    },
    [getMentorProfile.fulfilled]: (state, action) => {
      state.getProfileStatus = 'fullfilled'
      state.getProfile = action.payload?.getProfile
    },
    [getMentorProfile.rejected]: (state) => {
      state.getProfileStatus = 'rejected'
    },
  },
})

export const MentorInstructorAction = MentorInstructorSlice.actions
