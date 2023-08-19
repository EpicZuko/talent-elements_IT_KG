/* eslint-disable no-plusplus */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiFetch from '../../../api/ApiFetch'
import {
  mentorInstructorGetAllGroupsUrl,
  mentorNotificationsUrl,
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
        avatarImg: response.photo,
        notificationNumberCount: response.count,
      }
      return { getProfile }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getMentorStudents = createAsyncThunk(
  'mentor-instructor/getStudents',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/teachers/rating/group/by/id?groupId=${props.id}`,
      })
      const getStudents = []
      for (let i = 0; i < response.length; i++) {
        const obj = {
          name: response[i].name,
          id: response[i].id,
          img: response[i].photo,
          score: response[i].score,
          raiting: response[i].rating,
          studentId: response[i].studentId,
        }
        getStudents.push(obj)
      }
      return { getStudents }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const putMentorStudents = createAsyncThunk(
  'mentor-instrcutor/putStudents',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      await ApiFetch({
        url: `api/teachers/remove_student/${props.id}`,
        method: 'PUT',
      })
      dispatch(getMentorStudents())
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getMentorNotifications = createAsyncThunk(
  'mentor-instructor/getNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `${mentorNotificationsUrl}`,
      })
      const getNotifications = []
      for (let i = 0; i < response.length; i++) {
        getNotifications.push({
          id: response[i].id,
          email: response[i].email,
          value: response[i].assignmentResponse.title,
          username: response[i].name,
          date: response[i].createdAt,
          group: response[i].groupName,
          comment: response[i].assignmentResponse.description,
          lesson: response[i].lessonName || 'null',
          nickname: response[i].username,
          studentId: response[i].studentId,
          submissionId: response[i].submissionResponse.id,
        })
      }
      return { getNotifications }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const postMentorStudentSubmission = createAsyncThunk(
  'mentor-instructor/postStudentSubmission',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      await ApiFetch({
        url: `api/teachers/check/submission/student?studentId=${props.studentId}&submissionId=${props.submissionId}&comment=${props.comment}&score=${props.score}`,
        method: 'POST',
      })
      dispatch(getMentorNotifications())
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
  getStudents: [],
  getStudentsStatus: null,
  getNotifications: [],
  getNotificationsStatus: null,
  isSuccess: false,
  status: null,
}

export const MentorInstructorSlice = createSlice({
  name: 'mentor-instructor',
  initialState,
  reducers: {
    SnackbarClose(state, action) {
      state.status = action.payload.status
      state.isSuccess = action.payload.isSuccess
    },
  },
  extraReducers: {
    [getMentorGroups.pending]: (state) => {
      state.getCardGroupsStatus = 'pending'
    },
    [getMentorGroups.fulfilled]: (state, action) => {
      state.getCardGroupsStatus = 'success'
      state.getCardGroups = action.payload?.getGroups
    },
    [getMentorGroups.rejected]: (state) => {
      state.getCardGroupsStatus = 'error'
    },
    // get mentor profile
    [getMentorProfile.pending]: (state) => {
      state.getProfileStatus = 'pending'
    },
    [getMentorProfile.fulfilled]: (state, action) => {
      state.getProfileStatus = 'success'
      state.getProfile = action.payload?.getProfile
    },
    [getMentorProfile.rejected]: (state) => {
      state.getProfileStatus = 'error'
    },
    // get mentor students
    [getMentorStudents.pending]: (state) => {
      state.getStudentsStatus = 'pending'
    },
    [getMentorStudents.fulfilled]: (state, action) => {
      state.getStudentsStatus = 'success'
      state.getStudents = action.payload?.getStudents
    },
    [getMentorStudents.rejected]: (state) => {
      state.getStudentsStatus = 'error'
    },
    // get mentor notfications
    [getMentorNotifications.pending]: (state) => {
      state.getNotificationsStatus = 'pending'
    },
    [getMentorNotifications.fulfilled]: (state, action) => {
      state.getNotificationsStatus = 'success'
      state.getNotifications = action.payload?.getNotifications
    },
    [getMentorNotifications.rejected]: (state) => {
      state.getNotificationsStatus = 'error'
    },
    // post mentor-student submission
    [postMentorStudentSubmission.fulfilled]: (state) => {
      state.isSuccess = true
      state.status = 'success'
    },
    [postMentorStudentSubmission.rejected]: (state) => {
      state.status = 'error'
      state.isSuccess = true
    },
  },
})

export const MentorInstructorAction = MentorInstructorSlice.actions
