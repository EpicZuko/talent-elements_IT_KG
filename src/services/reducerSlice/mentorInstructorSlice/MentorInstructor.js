/* eslint-disable no-plusplus */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiFetch, { appFile } from '../../../api/ApiFetch'
import {
  MentorDeleteAssignmentByIdUrl,
  MentorDeleteLessonByIdUrl,
  MentorGetLessonByGroupIdUrl,
  MentorGetVotedStudentByAssignmentIdUrl,
  MentorRemoveStudentsUrl,
  mentorGetStudentsUrl,
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
        url: mentorGetStudentsUrl + props.groupId,
      })
      const getStudents = []
      for (let i = 0; i < response.length; i++) {
        getStudents.push({
          name: response[i].name,
          id: response[i].id,
          img: response[i].photo,
          score: response[i].score,
          raiting: response[i].rating,
          studentId: response[i].studentId,
        })
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
        url: MentorRemoveStudentsUrl + props.id,
        method: 'PUT',
      })
      dispatch(getMentorStudents(props))
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
        url: mentorNotificationsUrl,
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
          file: response[i].submissionResponse.file,
          type: response[i].submissionResponse.submissionType,
        })
      }
      return { getNotifications }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const postMentorLessons = createAsyncThunk(
  'mentor-instructor/postLessons',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    const formData = new FormData()
    formData.append('file', props.file)
    try {
      await appFile({
        url: `api/teachers/create_lesson?title=${props.title}&titleYoutube=${props.titleYoutube}&youtube=${props.youtube}&titleFile=${props.titleFile}&groupId=${props.id}`,
        method: 'POST',
        body: formData,
      })
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const getMentorLessons = createAsyncThunk(
  'mentor-instructor/getLessons',
  async (props, { rejectWithValue }) => {
    try {
      const lessons = {
        lesson: [],
      }
      const getLessons = await ApiFetch({
        url: MentorGetLessonByGroupIdUrl + props.groupId,
      })
      for (let i = 0; i < getLessons.length; i++) {
        lessons.lesson.push({
          id: getLessons[i].id,
          text: getLessons[i].title,
          title: getLessons[i].titleYoutube,
          youtube: getLessons[i].youtube,
          titleFile: getLessons[i].titleFile,
          file: getLessons[i].file,
          assignments: getLessons[i].assignments,
        })
      }
      return { getLessons: lessons }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const putMentorLessons = createAsyncThunk(
  'mentor-instructor/putMentorLessons',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    const formData = new FormData()
    formData.append('file', props.file)
    try {
      await appFile({
        url: `api/teachers/update_lesson/${props.lessonId}?title=${props.title}&titleYoutube=${props.titleYoutube}&youtube=${props.youtube}&fileTitle=${props.titleFile}`,
        method: 'PUT',
        body: formData,
      })
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
        url: MentorGetVotedStudentByAssignmentIdUrl + props.id,
      })
      return { getVotedStudents }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteMentorLesson = createAsyncThunk(
  'mentor-instrcutor/deleteLessons',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      await ApiFetch({
        url: MentorDeleteLessonByIdUrl + props.id,
        method: 'DELETE',
      })
      dispatch(getMentorLessons(props))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const postMentorAssignments = createAsyncThunk(
  'mentor-instructor/postAssignments',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    const formData = new FormData()
    formData.append('file', props.img)
    try {
      await appFile({
        url: `api/teachers/save_assigment/?title=${props.title}&description=${props.description}&day=${props.day}&score=${props.score}&lessonId=${props.id}`,
        method: 'POST',
        body: formData,
      })
    } catch (error) {
      return rejectWithValue(error.meassage)
    }
  }
)
export const deleteMentorAssignmnentsById = createAsyncThunk(
  'mentor-instructor/deleteMentorAssignmnets',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      await ApiFetch({
        url: MentorDeleteAssignmentByIdUrl + props.id,
        method: 'DELETE',
      })
      dispatch(getMentorLessons(props))
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
      dispatch(getMentorProfile())
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
      state.isSuccess = true
      state.status = 'error'
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
    // delete mentor students by id
    [putMentorStudents.fulfilled]: (state) => {
      state.isSuccess = true
      state.status = 'success'
    },
    // post mentor lessons
    [postMentorLessons.fulfilled]: (state) => {
      state.isSuccess = true
      state.status = 'success'
    },
    [postMentorLessons.rejected]: (state) => {
      state.isSuccess = true
      state.status = 'error'
    },
    // put mentor lessons
    [putMentorLessons.fulfilled]: (state) => {
      state.isSuccess = true
      state.status = 'success'
    },
    [putMentorLessons.rejected]: (state) => {
      state.isSuccess = true
      state.status = 'error'
    },
    // post mentor assignments
    [postMentorAssignments.fulfilled]: (state) => {
      state.isSuccess = true
      state.status = 'success'
    },
    [postMentorAssignments.rejected]: (state) => {
      state.isSuccess = true
      state.status = 'error'
    },
    // delete mentor lesson
    [deleteMentorLesson.fulfilled]: (state) => {
      state.isSuccess = true
      state.status = 'success'
    },
    [deleteMentorLesson.rejected]: (state) => {
      state.isSuccess = true
      state.status = 'error'
    },
    // delete mentor assignments
    [deleteMentorAssignmnentsById.fulfilled]: (state) => {
      state.isSuccess = true
      state.status = 'success'
    },
    [deleteMentorAssignmnentsById.rejected]: (state) => {
      state.isSuccess = true
      state.staus = 'error'
    },
  },
})

export const MentorInstructorAction = MentorInstructorSlice.actions
