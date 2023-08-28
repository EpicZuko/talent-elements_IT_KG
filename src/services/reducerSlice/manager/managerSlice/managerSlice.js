import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiFetch, { appFile } from '../../../../api/ApiFetch'
import {
  // getManagerMyprofileUrl,
  managergetProfileUrl,
  managergetCardGroupsUrl,
  managerStudentsUrl,
  getManagerNotificationUrl,
  managerInstructorMentorUrl,
  managerStaffAdminUrl,
  getManagerSeoAdminUrl,
  getAllManagerGroupUrl,
  // postManagerSavePhotoProfileUrl,
  // postManagerSavePhotoProfileUrl,
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
          students: response[i].count,
          title: response[i].name,
        })
      }
      // console.log(response))
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
        url: `api/managers/block/User?id=${props.id}`,
        method: 'PUT',
        body: { userId: props.id },
      })
      dispatch(managerGetNotifications(), managerGetProfile())
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
      const response = await ApiFetch({
        url: `api/managers/select/role/teacher/?id=${props.body.id}&roleRequest=${props.body.roleRequest}`,
        method: 'POST',
        body: props.body,
      })
      dispatch(managerGetNotifications(), managerGetProfile())
      return response
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
        const successBlock = 'success'
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

      instructorMentorProfile.lessonNames.push({
        id: response.id,
        name: response.fullName,
        email: response.email,
      })
      response.groupName.forEach((group) => {
        group.lessonTipResponses.forEach((lesson) => {
          instructorMentorProfile.tableNames.push({
            id: group.groupId,
            number: group.groupId,
            groups: group.groupName,
            lessons: lesson.lessonName,
          })
        })
      })
      return { instructorMentorProfile }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const managerCreatedGroup = createAsyncThunk(
  'managerSlice/managerCreatedGroup',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('file', props.body.file)
      const response = await appFile({
        url: `api/managers/create_group?name=${props.body.name}`,
        method: 'POST',
        body: formData,
      })
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const managerStaffAdmin = createAsyncThunk(
  'managerStaffAdmin/managerStaffAdmin',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: managerStaffAdminUrl,
      })
      const staffAdminArray = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        const dateString = response[i].date
        const dateObject = new Date(dateString)
        const dateAddOne =
          dateObject.getMonth() < 10
            ? `0${dateObject.getMonth() + 1}`
            : dateObject.getMonth() + 1
        const formattedDate = `${dateObject.toLocaleString('en-US', {
          day: '2-digit',
        })}.${dateAddOne}.${dateObject.getFullYear()}`
        staffAdminArray.push({
          id: response[i]?.id,
          raiting: response[i]?.id,
          img: response[i]?.photo,
          name: response[i]?.name,
          dateOfRegistration: formattedDate,
          action: response[i]?.block,
        })
      }
      return { staffAdminArray }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const managerStaffAdminPutBlockOrUnBlock = createAsyncThunk(
  'managerSlice/managerStaffAdminPutBlockOrUnBlock',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: `api/managers/block/User?id=${props.id}`,
        method: 'PUT',
        body: { id: props.id },
      })
      const block = 'success'
      dispatch(managerStaffAdmin())
      return { response, block }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const getManagerSeoAdmin = createAsyncThunk(
  'managerSlice/getManagerSeoAdmin',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: getManagerSeoAdminUrl,
      })
      const seoAdminArray = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        const dateString = response[i].date
        const dateObject = new Date(dateString)
        const dateAddOne =
          dateObject.getMonth() < 10
            ? `0${dateObject.getMonth() + 1}`
            : dateObject.getMonth() + 1
        const formattedDate = `${dateObject.toLocaleString('en-US', {
          day: '2-digit',
        })}.${dateAddOne}.${dateObject.getFullYear()}`
        seoAdminArray.push({
          id: response[i].id,
          raiting: response[i].id,
          img: response[i].photo,
          name: response[i].name,
          dateOfRegistration: formattedDate,
          action: response[i].block,
        })
      }
      return { seoAdminArray }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const managerSeoAdminBlockOrUnBlock = createAsyncThunk(
  'managerSlice/managerSeoAdminBlockOrUnBlock',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: `api/managers/block/User?id=${props.id}`,
        method: 'PUT',
        body: { id: props.id },
      })
      const block = 'success'
      dispatch(getManagerSeoAdmin())
      return { response, block }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getAllManagerGroup = createAsyncThunk(
  'managerSlice/getAllManagerGroup',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: getAllManagerGroupUrl,
      })
      const group = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        group.push({
          groupId: response[i].groupId,
          name: response[i].name,
        })
      }
      return { group }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const managerAddToStudents = createAsyncThunk(
  'managerSlice/managerAddToStudents',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: `api/managers/addStudents/Id/ToGroup?studentId=${props.studentId}&groupId=${props.groupId}`,
        method: 'PUT',
        body: { studentId: props.studentId, groupId: props.groupId },
      })
      dispatch(managerGetStudents())
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const managerGetStudentGroups = createAsyncThunk(
  'manager/managerGetStudentGroup',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/managers/rating/students/by/groupId?groupId=${props.id}`,
      })
      const groupId = {
        group: '',
        studentdata: [],
      }
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        groupId.group = response[i].groupName
        const dateString = response[i].date
        const dateObject = new Date(dateString)
        const dateAddOne =
          dateObject.getMonth() < 10
            ? `0${dateObject.getMonth() + 1}`
            : dateObject.getMonth() + 1
        const formattedDate = `${dateObject.toLocaleString('en-US', {
          day: '2-digit',
        })}.${dateAddOne}.${dateObject.getFullYear()}`
        groupId.studentdata.push({
          id: response[i]?.studentId,
          raiting: response[i].rating,
          img: response[i].photo,
          name: response[i].name,
          dateOfRegistration: formattedDate,
          group: response[i].groupName,
        })
      }
      return { groupId }
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)
export const managerDeleteStudentGroups = createAsyncThunk(
  'manager/managerDeleteStudentGroup',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: `api/managers/delete/student/id?studentId=${props.id}`,
        method: 'PUT',
        body: { body: props.id },
      })
      dispatch(managerGetStudentGroups())
      return response
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)

export const managerAddToGroupMetorInstructors = createAsyncThunk(
  'managerSlice/managerAddToGroupMetorInstructors',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      if (props.teacherRole === 'instructor') {
        const response = await ApiFetch({
          url: `api/managers/save/teacher/group?teacherId=${props.teacherId}&groupId=${props.groupId}`,
          method: 'POST',
          body: { teacherId: props.teacherId, groupId: props.groupId },
        })
        dispatch(managerInstructorMentor())
        return response
      }
      if (props.teacherRole === 'mentor') {
        const response = await ApiFetch({
          url: `api/managers/save/mentor/group?teacherId=${props.teacherId}&groupId=${props.groupId}`,
          method: 'POST',
          body: { teacherId: props.teacherId, groupId: props.groupId },
        })
        dispatch(managerInstructorMentor())
        return response
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const managerProfileGet = createAsyncThunk(
  'managerSlice/managerProfilePost',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      if (props.file !== '') {
        const formData = new FormData()
        formData.append('photo', props.file)
        await appFile({
          url: 'api/managers/save/photo',
          body: formData,
        })
        dispatch(managerGetProfile())
      }
      const response = await ApiFetch({
        url: 'api/managers/see/profile',
      })
      const profile = {
        profileImg: response.photo,
        profile: [],
      }
      profile.profile.push({
        name: response.fullName,
        email: response.email,
      })
      return { profile }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const deleteGroupManager = createAsyncThunk(
  'managerSlice/deleteGroupManager',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiFetch({
        url: `api/managers/delete_group/${props.id}`,
        method: 'DELETE',
        body: { id: props.id },
      })
      dispatch(managerGetAllGroups())
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
