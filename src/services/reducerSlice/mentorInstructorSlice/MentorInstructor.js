import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiFetch from '../../../api/ApiFetch'
import {
  MentorInstructorHeaderSeeUrl,
  MentorInstructorNotificationsUrl,
} from '../../../utils/constants/url'

export const MentorGroupRequest = createAsyncThunk(
  'mentor-instructor/bodyRequests',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/teachers/${props.id}/groups`,
      })
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const MentorCoursesRequest = createAsyncThunk(
  'mentor-instructor/coursesRequest',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/teachers/${props.id}/courses`,
      })
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const MentorNotificationsRequest = createAsyncThunk(
  'mentor-instructor/notificationsRequest',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `${MentorInstructorNotificationsUrl}`,
      })
      const notifications = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        const arr = [
          {
            message: response[i].message,
          },
        ]
        notifications.push(arr)
      }
      return notifications
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const MentorLessonsRequest = createAsyncThunk(
  'mentor-instructor/lessonsRequest',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/teachers/${props.id}/lessons`,
      })
      return response
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
  courses: [],
  lessons: [],
  notifications: [],
  profile: {},
  courseId: '',
  courseName: '',
  lessonsName: '',
}

export const MentorInstructorBodySlice = createSlice({
  name: 'mentor-instructor',
  initialState,
  reducers: {
    findCoursesBy(state, action) {
      state.courseId = action.payload.id
      state.courseName = action.payload.name
    },
    findLessonsBy(state, action) {
      state.lessonsName = action.payload.lessonsname
    },
  },
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
    [MentorCoursesRequest.pending]: (state) => {
      state.status = 'pending'
    },
    [MentorCoursesRequest.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.courses = action.payload
    },
    [MentorCoursesRequest.rejected]: (state) => {
      state.status = 'rejected'
    },
    [MentorNotificationsRequest.pending]: (state) => {
      state.status = 'pending'
    },
    [MentorNotificationsRequest.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.notifications = action.payload
    },
    [MentorNotificationsRequest.rejected]: (state) => {
      state.status = 'rejected'
    },
    [MentorLessonsRequest.pending]: (state) => {
      state.status = 'pending'
    },
    [MentorLessonsRequest.fulfilled]: (state, action) => {
      state.status = 'fullfilled'
      state.lessons = action.payload
    },
    [MentorLessonsRequest.rejected]: (state) => {
      state.status = 'rejected'
    },
  },
})

export const MentorInstructorAction = MentorInstructorBodySlice.actions
