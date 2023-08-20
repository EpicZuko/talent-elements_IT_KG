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
export const getMentorMaterials = createAsyncThunk(
  'mentor-instrcutor/getMaterials',
  async (props, { rejectWithValue }) => {
    const getMaterials = []
    try {
      const response = await ApiFetch({
        url: `api/teachers/get_all_materials/by/groupId?groupId=${props.groupId}`,
      })
      for (let i = 0; i < response.length; i++) {
        getMaterials.push({
          title: response[i].title,
          id: response[i].id,
          file: response[i].file,
        })
      }
      return { getMaterials }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getMentorLessons = createAsyncThunk(
  'mentor-instructor/getLessons',
  async (props, { rejectWithValue, dispatch }) => {
    dispatch(getMentorMaterials(props))
    try {
      const lessons = {
        lesson: [],
      }
      const getLessons = await ApiFetch({
        url: `api/teachers/get/lessons/by/groupId?groupId=${props.groupId}`,
      })
      for (let i = 0; i < getLessons.length; i++) {
        lessons.lesson.push({
          id: getLessons[i].lesson.id,
          text: getLessons[i].lesson.title,
          youtube: getLessons[i].lesson.youtube,
          assignment: getLessons[i].assignments,
        })
      }
      return { getLessons: lessons }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getMentorVotedStudentsByAssignmentId = createAsyncThunk(
  'mentor-instructor/getVotedStudentsByAssignmentId',
  async (props, { rejectWithValue }) => {
    try {
      const getVotedStudents = await ApiFetch({
        url: `api/teachers/assigment/id/find/student/submission?assigmentId=${props.id}`,
      })
      return { getVotedStudents }
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
  getLessons: [],
  getLessonsStatus: null,
  getVotedStudents: {},
  getVotedStudentsStatus: null,
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
    // get mentor lessons
    [getMentorLessons.pending]: (state) => {
      state.getLessonsStatus = 'pending'
    },
    [getMentorLessons.fulfilled]: (state, action) => {
      state.getLessonsStatus = 'success'
      state.getLessons = action.payload?.getLessons
    },
    [getMentorLessons.rejected]: (state) => {
      state.getLessonsStatus = 'error'
    },
    // get voted students by assignmentId
    [getMentorVotedStudentsByAssignmentId.pending]: (state) => {
      state.getVotedStudentsStatus = 'pending'
    },
    [getMentorVotedStudentsByAssignmentId.fulfilled]: (state, action) => {
      state.getVotedStudentsStatus = 'success'
      state.getVotedStudents = action.payload?.getVotedStudents
    },
    [getMentorVotedStudentsByAssignmentId.rejected]: (state) => {
      state.getVotedStudentsStatus = 'error'
    },
  },
})

export const MentorInstructorAction = MentorInstructorSlice.actions
