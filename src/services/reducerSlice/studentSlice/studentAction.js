import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiFetch, { appFile } from '../../../api/ApiFetch'
import {
  getStudentProfileUrl,
  getCousesUrl,
  getStudentMyGroupUrl,
  getStudentMyprofileUrl,
  getStudentNotificationUrl,
  studentNotificationManagerUrl,
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
      courses.push({
        id: response.id,
        title: response.name,
        img: response.photo,
        date_start: response.date_start,
        date_finish: response.date_finish,
        date_count: response.date_count,
      })
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
        const formData = new FormData()
        formData.append('photo', props.fileImg)
        await appFile({
          url: 'api/v1/user/save/photo',
          body: formData,
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

export const getStudentNotification = createAsyncThunk(
  'studentSlice/getStudentNotification',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: getStudentNotificationUrl,
      })
      dispatch(getStudentProfile())
      const getStudentNotificationArray = []

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        getStudentNotificationArray.push({
          value: response[i].assigment,
          name: response[i].lessonName,
          score: response[i].gradeCount,
          commentValue: response[i].comment,
          lesson: response[i].assigment,
        })
      }

      return { getStudentNotificationArray }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const getStudentLesson = createAsyncThunk(
  'studentSlice/getStudentLesson',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: 'api/v1/user/get/lessons/by/groupId',
      })
      const studentLesson = {
        studentLesson: response.length > 0 ? [...response] : [],
      }

      return { studentLesson }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const getStudentHomeWork = createAsyncThunk(
  'studentSlice/getStudentHomeWork',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/v1/user/find/assigment/by/id?assigmentId=${props.id}`,
      })

      const studentHomeWork = {
        groupName: response.groupName,
        homeWork: {
          id: response?.submissionResponse?.id,
          taskTitle: response?.titleAssigment,
          img: response?.photo,
          kods: response?.assigmentDescription,
          text: response?.submissionResponse?.text,
        },
      }
      const studentHomeWorkArray = []
      studentHomeWorkArray.push(studentHomeWork?.homeWork)
      return { studentHomeWorkArray, studentHomeWork }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const postStudentFileUpload = createAsyncThunk(
  'studentSlice/postStudentFileUpload',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('file', props.file)
      const response = appFile({
        url: `api/v1/user/upload_file/${props.id}/`,
        body: formData,
      })
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const postStudentTextForm = createAsyncThunk(
  'studentSlice/postStudentTextForm',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = ApiFetch({
        url: `api/v1/user/send_text_document/${props.id}/?text=${props.text}`,
        method: 'POST',
      })
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const notificationStudentManager = createAsyncThunk(
  'studentSlice/notificationStudentManager',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: studentNotificationManagerUrl,
      })
      const managerMessage = []

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        managerMessage.push({
          id: response[i].id,
          name: 'менеджер',
          commentValue: response[i].message,
          days: 10,
        })
      }

      return { managerMessage }
    } catch (error) {
      return rejectWithValue()
    }
  }
)
