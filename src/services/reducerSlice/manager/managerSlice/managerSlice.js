import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiFetch from '../../../../api/ApiFetch'
import {
  managergetProfileUrl,
  managergetCardGroupsUrl,
  managerStudentsUrl,
  getManagerNotificationUrl,
  managerInstructorMentorUrl,
} from '../../../../utils/constants/url'

export const managerGetProfile = createAsyncThunk(
  'manager/managerGetProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: managergetProfileUrl,
      })
      const managerProfile = {
        avatarImg: response?.photo,
        name: response?.fullName,
        notificationNumberCount: response?.count,
      }
      return { managerProfile }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const managerGetAllGroups = createAsyncThunk(
  'manager/managerGetAllGroups',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: managergetCardGroupsUrl,
      })
      const managerCardGroup = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        managerCardGroup.push({
          id: response[i]?.id,
          img: response[i].photo,
          students: response[i].studentsId,
          title: response[i].name,
        })
      }
      // console.log(response)
      return { managerCardGroup }
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)
export const managerGetStudents = createAsyncThunk(
  'manager/managerGetStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: managerStudentsUrl,
      })
      const managerStudents = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        const dateString = response[i].date_now
        const dateObject = new Date(dateString)
        const dateAddOne =
          dateObject.getMonth() < 10
            ? `0${dateObject.getMonth() + 1}`
            : dateObject.getMonth() + 1
        const formattedDate = `${dateObject.toLocaleString('en-US', {
          day: '2-digit',
        })}.${dateAddOne}.${dateObject.getFullYear()}`
        managerStudents.push({
          id: response[i]?.id,
          raiting: response[i].id,
          img: response[i].photo,
          name: response[i].name,
          group: response[i].groupName,
          dateOfRegistration: formattedDate,
          payment: response[i].pay,
          action: response[i].block,
        })
      }
      return { managerStudents }
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)
export const managerGetNotifications = createAsyncThunk(
  'manager/managerGetNotification',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: getManagerNotificationUrl,
      })
      const managerNotifications = []
      // eslint-disable-next-line no-plusplus, no-unreachable-loop
      for (let i = 0; i < response.length; i++) {
        const dateString = response[i].createdAt
        const dateObject = new Date(dateString)
        const dateAddOne =
          dateObject.getMonth() < 10
            ? `0${dateObject.getMonth() + 1}`
            : dateObject.getMonth() + 1
        const formattedDate = `${dateObject.toLocaleString('en-US', {
          day: '2-digit',
        })}.${dateAddOne}.${dateObject.getFullYear()}`
        managerNotifications.push({
          id: response[i].id,
          number: response[i].studentId,
          username: response[i].name,
          nickname: response[i].username,
          email: response[i].email,
          date: formattedDate,
        })
      }
      return { managerNotifications }
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)
export const managerPutPaidStudents = createAsyncThunk(
  'manager/managerPutStudents',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: `api/managers/get/by/id/student/pay/true?studentId=${props.id}`,
        method: 'PUT',
        body: { studentId: props.id },
      })
      dispatch(managerGetStudents(), managerStudentProfile())
      return response
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)
export const managerPutNotPaidStudents = createAsyncThunk(
  'manager/managerPutStudents',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: `api/managers/get/by/id/student/pay/false?studentId=${props.id}`,
        method: 'PUT',
        body: { studentId: props.id },
      })
      dispatch(managerGetStudents(), managerStudentProfile())
      return response
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)
export const managerBlockStudents = createAsyncThunk(
  'manager/managerPutStudents',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: `api/managers/block/${props.id}`,
        method: 'PUT',
        body: { studentId: props.id },
      })
      dispatch(managerGetStudents())
      return response
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)
export const managerUnlockStudents = createAsyncThunk(
  'manager/managerPutStudents',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: `api/managers/unblock/${props.id}`,
        method: 'PUT',
        body: { studentId: props.id },
      })
      dispatch(managerGetStudents())
      return response
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)

export const managerStudentProfile = createAsyncThunk(
  'managerSlice/managerStudentProfile',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/managers/get/by/id/student?studetId=${props.studentId}`,
      })
      const dateString = response?.date
      const dateObject = new Date(dateString)
      const dateAddOne =
        dateObject.getMonth() < 10
          ? `0${dateObject.getMonth() + 1}`
          : dateObject.getMonth() + 1
      const formattedDate = `${dateObject.toLocaleString('en-US', {
        day: '2-digit',
      })}.${dateAddOne}.${dateObject.getFullYear()}`
      const studentProfile = {
        email: response?.email,
        profileImg: response?.image,
        studentProfileArray: [],
        studentProfileRegister: [],
      }
      studentProfile.studentProfileArray.push({
        block: response?.pay,
        name: response?.name,
        email: response?.email,
      })
      studentProfile.studentProfileRegister.push({
        groups: response?.groupName,
        date: formattedDate,
      })
      return { studentProfile }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const managerBlockUser = createAsyncThunk(
  'manager/managerBlockUser',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: `api/managers/block/${props.id}`,
        method: 'PUT',
        body: { userId: props.id },
      })
      dispatch(managerGetNotifications())
      return response
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)
export const managerPostNotificationSelect = createAsyncThunk(
  'login/managerPostNotificationSelect',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      if (props.fetchRole === 'user') {
        const response = await ApiFetch({
          url: `api/managers/select/role?id=${props.body.id}&roleRequest=${props.body.roleRequest}`,
          method: 'POST',
          body: props.body,
        })
        dispatch(managerGetNotifications())
        return response
      }
      if (props.fetchRole === 'teacher') {
        const response = await ApiFetch({
          url: `api/managers/select/role/teacher/?id=${props.body.id}&roleRequest=${props.body.roleRequest}`,
          method: 'POST',
          body: props.body,
        })
        dispatch(managerGetNotifications())
        return response
      }
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)

export const managerInstructorMentor = createAsyncThunk(
  'managerSlice/managerInstructorMentor',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: managerInstructorMentorUrl,
      })
      const instructorMentorArray = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        const dateString = response[i].createdAt
        const dateObject = new Date(dateString)
        const dateAddOne =
          dateObject.getMonth() < 10
            ? `0${dateObject.getMonth() + 1}`
            : dateObject.getMonth() + 1
        const formattedDate = `${dateObject.toLocaleString('en-US', {
          day: '2-digit',
        })}.${dateAddOne}.${dateObject.getFullYear()}`
        instructorMentorArray.push({
          id: response[i].id,
          raiting: response[i].id,
          img: response[i].photo,
          group: response[i].groupName,
          name: response[i].email,
          doctrine: response[i].lessonNames,
          dateOfRegistration: formattedDate,
          action: response[i].blocked,
        })
      }
      return { instructorMentorArray }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const managerInstructorMentorPutUnBlockOrBlock = createAsyncThunk(
  'managerSlice/managerInstuctorMentorPutUnblockOrBlock',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      if (props.block === 'block') {
        const response = await ApiFetch({
          url: `api/managers/block/teacher/by/${props.id}`,
          method: 'PUT',
          body: props.id,
        })
        const successBlock = 'successs'
        dispatch(managerInstructorMentor())
        return { response, successBlock }
      }
      if (props.block === 'unblock') {
        const response = await ApiFetch({
          url: `api/managers/unblock/teacher/by/${props.id}`,
          method: 'PUT',
          body: props.id,
        })
        const successUnblock = 'success'
        dispatch(managerInstructorMentor())
        return { response, successUnblock }
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const managerInstructorMentorProfile = createAsyncThunk(
  'managerSlice/managerInstructorMentorProfile',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/managers/get/teacher/byId?teacherId=${props.id}`,
      })
      const instructorMentorProfile = {
        profileImg: response.photo,
        email: response.email,
        lessonNames: [],
        tableNames: [],
      }
      response.groupName.forEach((group) => {
        group.lessonTipResponses.forEach((lesson) => {
          instructorMentorProfile.tableNames.push({
            id: group.groupId,
            number: group.groupId,
            groups: group.groupName,
            lessons: lesson.lessonName,
          })
          instructorMentorProfile.lessonNames.push({
            id: response.id,
            name: response.fullName,
            email: response.email,
          })
        })
      })
      return { instructorMentorProfile }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
