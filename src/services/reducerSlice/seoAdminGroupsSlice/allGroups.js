import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ApiFetch, { appFile } from '../../../api/ApiFetch'
import {
  getSeoAdminProfileUrl,
  postSeoAdminProfileSavePhotoUrl,
  seoAdminGetAllGroupsUrl,
  seoAdminProfileUrl,
  seoAdmingetFindAllManagerUrl,
} from '../../../utils/constants/url'

export const getProfile = createAsyncThunk(
  'seoAdmin/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `${seoAdminProfileUrl}`,
      })
      const notification = {
        avatarImg: response?.photo,
        name: response?.fullName,
        notificationNumberCount: response?.count,
      }
      return notification
    } catch (error) {
      return rejectWithValue(error?.card)
    }
  }
)

export const getAllGroups = createAsyncThunk(
  'seoAdmin/getAllGroups',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `${seoAdminGetAllGroupsUrl}`,
      })
      const cardGroup = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        cardGroup.push({
          id: response[i].id,
          img: response[i].photo,
          students: response[i].countStudent,
          title: response[i].groupName,
        })
      }
      return { cardGroup }
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)

export const getSeoAdminInstructorMentor = createAsyncThunk(
  'seoAdmin/getSeoAdminInstructorMentor',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: 'api/v1/seo/admin/get/all/teachers/for/seoAdmin',
      })
      const teachersArray = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        const dateString = response[i]?.createdAt || ''
        const [year, month, day] = dateString.split('T')[0].split('-')
        const formattedDate = `${day}.${month}.${year}`
        teachersArray.push({
          id: response[i].id,
          raiting: response[i].id,
          name: response[i].fullName,
          img: response[i].photo,
          group: response[i].groupName,
          doctrine: response[i].lessonNames,
          dateOfRegistration: formattedDate,
        })
      }
      return { teachersArray }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const getStudentsId = createAsyncThunk(
  'seoAdmin/getStudentsId',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/v1/seo/admin/find/all/student/group/by/id?groupId=${props?.id}`,
      })
      const studentsId = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        const dateString = response[i].created
        const dateObject = new Date(dateString)
        const dateAddOne =
          dateObject.getMonth() < 10
            ? `0${dateObject.getMonth() + 1}`
            : dateObject.getMonth() + 1
        const formattedDate = `${dateObject.toLocaleString('en-US', {
          day: '2-digit',
        })}.${dateAddOne}.${dateObject.getFullYear()}`
        studentsId.push({
          id: response[i].id,
          raiting: response[i].id,
          img: response[i].photo,
          name: response[i].name,
          dateOfRegistration: formattedDate,
        })
      }
      return { studentsId }
    } catch (error) {
      return rejectWithValue(error?.message)
    }
  }
)

export const getSeoAdminManager = createAsyncThunk(
  'seoAdmin/getSeoAdminManager',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: seoAdmingetFindAllManagerUrl,
      })
      const managerArray = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        const dateString = response[i]?.date || ''
        const [year, month, day] = dateString.split('T')[0].split('-')
        const formattedDate = `${day}.${month}.${year}`
        managerArray.push({
          id: response[i].id,
          raiting: response[i].id,
          img: response[i].photo,
          name: response[i].username,
          dateOfRegistration: formattedDate,
        })
      }
      return { managerArray }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

// get seo admin student profile
export const getStudentIDProfile = createAsyncThunk(
  'seoAdmin/getStudentIDProfile',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/v1/seo/admin/find/by/id/student/info?studentId=${props?.id}`,
      })
      const getStudentId = {
        email: response.email,
        group: response.group,
        profileImg: response.photo,
        groups: [],
      }

      const dateString = response?.created
      const dateObject = new Date(dateString)
      const dateAddOne =
        dateObject?.getMonth() < 10
          ? `0${dateObject.getMonth() + 1}`
          : dateObject.getMonth() + 1
      const formattedDate = `${dateObject?.toLocaleString('en-US', {
        day: '2-digit',
      })}.${dateAddOne}.${dateObject.getFullYear()}`
      getStudentId.groups.push({
        name: response?.name,
        email: response?.email,
        groups: response?.group,
        date: formattedDate,
      })

      return { getStudentId }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
// api/v1/seo/admin/get/byId/teachers/for/seoAdmin?teacherId=1
export const getSeoAdminByIdTeachers = createAsyncThunk(
  'seoAdmin/getSeoAdminByIdTeachers',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/v1/seo/admin/get/byId/teachers/for/seoAdmin?teacherId=${props.id}`,
      })
      const instructorOrMentor = {
        id: response.id,
        profileImg: response.photo,
        email: response.email,
        groups: [],
        lessonNames: response.groupName,
      }
      instructorOrMentor.groups.push({
        id: response.id,
        name: response.fullName,
        email: response.email,
      })

      return { instructorOrMentor }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const getSeoAdminProfile = createAsyncThunk(
  'seoAdminSlice/getSeoAdminProfile',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue, dispatch }) => {
    try {
      if (props.fileImg !== '') {
        const formData = new FormData()
        formData.append('photo', props.fileImg)
        await appFile({
          url: postSeoAdminProfileSavePhotoUrl,
          body: formData,
        })
        dispatch(getProfile())
      }

      const response = await ApiFetch({
        url: getSeoAdminProfileUrl,
      })
      const getProfileObject = {
        seoAdminProfile: [],
        profileImg: response.photo,
      }
      getProfileObject.seoAdminProfile.push({
        id: response.id,
        name: response.fullName,
        email: response.email,
      })
      return { getProfileObject }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const getSeoAdminGroupSlice = createSlice({
  name: 'seoAdminGroupsSlce',
  initialState: {
    card: [],
    error: null,
    profileSeoAdmin: {},
    teachers: [],
    teachersStatus: null,
    studentsStatus: null,
    students: [],
    manager: [],
    managerStatus: null,
    studentIdProfileArray: {
      email: '',
      group: '',
      profileImg: '',
      groups: [],
    },
    studentIdStatus: null,
    byIdTeachers: {
      id: null,
      profileImg: '',
      email: '',
      groups: [],
      lessonNames: [],
    },
    byIdTeachersStatus: null,
    getProfile: {
      seoAdminProfile: [],
      profileImg: null,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroups.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.loading = 'success'
        state.card = action.payload.cardGroup
      })
      .addCase(getAllGroups.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.payload?.error.message
      })
      // get profile
      .addCase(getProfile.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = 'success'
        state.profileSeoAdmin = action.payload
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.payload?.error.message
      })
      // getallteachers seo admin
      .addCase(getSeoAdminInstructorMentor.pending, (state) => {
        state.teachersStatus = 'pending'
      })
      .addCase(getSeoAdminInstructorMentor.fulfilled, (state, action) => {
        state.teachersStatus = 'success'
        state.teachers = action.payload?.teachersArray
      })
      .addCase(getSeoAdminInstructorMentor.rejected, (state) => {
        state.teachersStatus = 'error'
      })
      // getStudentsId seo admin
      .addCase(getStudentsId.pending, (state) => {
        state.studentsStatus = 'pending'
      })
      .addCase(getStudentsId.fulfilled, (state, action) => {
        state.studentsStatus = 'success'
        state.students = action.payload?.studentsId
      })
      .addCase(getStudentsId.rejected, (state) => {
        state.studentsStatus = 'error'
      })
      // get manager
      .addCase(getSeoAdminManager.pending, (state) => {
        state.managerStatus = 'pending'
      })
      .addCase(getSeoAdminManager.fulfilled, (state, action) => {
        state.managerStatus = 'success'
        state.manager = action.payload?.managerArray
      })
      .addCase(getSeoAdminManager.rejected, (state, action) => {
        state.managerStatus = 'error'
        state.errorManager = action.payload
      })
      // get studentId  profile
      .addCase(getStudentIDProfile.pending, (state) => {
        state.studentIdStatus = 'pending'
      })
      .addCase(getStudentIDProfile.fulfilled, (state, action) => {
        state.studentIdStatus = 'success'
        state.studentIdProfileArray.groups = action.payload.getStudentId?.groups
        state.studentIdProfileArray.group = action.payload.getStudentId?.group
        state.studentIdProfileArray.email = action.payload.getStudentId?.email
        state.studentIdProfileArray.profileImg =
          action.payload.getStudentId?.profileImg
      })
      .addCase(getStudentIDProfile.rejected, (state) => {
        state.studentIdStatus = 'error'
      })
      // getSeoAdminByIdTeachers
      .addCase(getSeoAdminByIdTeachers.pending, (state) => {
        state.byIdTeachersStatus = 'pending'
      })
      .addCase(getSeoAdminByIdTeachers.fulfilled, (state, action) => {
        state.byIdTeachersStatus = 'success'
        state.byIdTeachers.email = action.payload.instructorOrMentor.email
        state.byIdTeachers.groups = action.payload.instructorOrMentor.groups
        state.byIdTeachers.id = action.payload.instructorOrMentor.id
        state.byIdTeachers.lessonNames =
          action.payload.instructorOrMentor.lessonNames
        state.byIdTeachers.profileImg =
          action.payload.instructorOrMentor.profileImg
      })
      .addCase(getSeoAdminByIdTeachers.rejected, (state) => {
        state.byIdTeachersStatus = 'error'
      })
      // get seo admin profile
      .addCase(getSeoAdminProfile.pending, (state) => {
        state.getProfileStatus = 'pending'
      })
      .addCase(getSeoAdminProfile.fulfilled, (state, action) => {
        state.getProfileStatus = 'success'
        state.getProfile.seoAdminProfile =
          action.payload.getProfileObject.seoAdminProfile
        state.getProfile.profileImg = action.payload.getProfileObject.profileImg
      })
      .addCase(getSeoAdminProfile.rejected, (state) => {
        state.getProfileStatus = 'error'
      })
  },
})

export const getAllGroupAction = getSeoAdminGroupSlice.actions
export default getSeoAdminGroupSlice
