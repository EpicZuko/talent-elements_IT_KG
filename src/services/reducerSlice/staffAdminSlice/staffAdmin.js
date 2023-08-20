import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiFetch from '../../../api/ApiFetch'
import {
  staffAdminGetAllGroups,
  staffAdmingetProfile,
  staffAdminfindallteachers,
} from '../../../utils/constants/url'

export const getAllCouseCardStaffAdmin = createAsyncThunk(
  'staffAdmin/getAllCouseCardStaffAdmin',
  // eslint-disable-next-line consistent-return
  async (_, rejectWithValue) => {
    try {
      const response = await ApiFetch({
        url: staffAdminGetAllGroups,
      })
      const getAllCouseStaffAdmin = []
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        getAllCouseStaffAdmin.push({
          id: response[i].id,
          title: response[i].description,
          img: response[i].photo,
          students: response[i].count,
          lesson: response[i].lessonId,
        })
      }

      return { getAllCouseStaffAdmin }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
// api/v1/staff/admin/see/header/profile
export const getProfileStaffAdmin = createAsyncThunk(
  'staffAdmin/getProfileStaffAdmin',
  // eslint-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: staffAdmingetProfile,
      })
      const getProfileStaffAdmin = {
        avatarImg: response?.photo,
        name: response?.fullName,
        notificationNumberCount: response?.count,
      }

      return { getProfileStaffAdmin }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
// api/v1/staff/admin/find/all/teachers
export const getStudentStaffAdmin = createAsyncThunk(
  'staffAdmin/getStudentStaffAdmin',
  // eslin-disable-next-line consistent-return
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: staffAdminfindallteachers,
      })
      const getFindAllTeacehrs = []
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
        getFindAllTeacehrs.push({
          id: response[i].id,
          raiting: response[i].id,
          img: response[i].photo,
          name: response[i].fullName,
          group: response[i].groupName,
          doctrine: response[i].lessonNames,
          dateOfRegistration: formattedDate,
        })
      }
      return { getFindAllTeacehrs }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// api/v1/staff/admin/rating/group/by/id

export const getRatingGroupById = createAsyncThunk(
  'staffAdmin/getRaitingGroupById',

  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/v1/staff/admin/rating/group/by/id?groupId=${props.id}`,
      })
      const getRaitingBiId = {
        groupName: '',
        groups: [],
      }
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < response.length; i++) {
        getRaitingBiId.groupName = response[i].groupName
        getRaitingBiId.groups.push({
          id: response[i].id,
          img: response[i].photo,
          name: response[i].name,
          raiting: response[i].rating,
          score: response[i].score,
        })
      }
      return { getRaitingBiId }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// get profile instructor mentor
export const getProfileInstructorMentor = createAsyncThunk(
  'staffAdmin/getProfileInstructorMentor',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/v1/staff/admin/get/teacher/byId?teacherId=${props.id}`,
      })
      const lessons = []
      const groupsProfile = {
        id: response.id,
        profileImg: response.photo,
        name: response.fullName,
        email: response.email,
      }

      response.groupName.forEach((group) => {
        group.lessonTipResponses.forEach((lesson) => {
          const lessonNames = lesson.lessonName
          lessons.push({
            id: group.groupId,
            number: group.groupId,
            groups: group.groupName,
            lessons: lessonNames,
          })
        })
      })
      const getAllProfileInstructorMentor = {
        groupsProfil: groupsProfile,
        lesson: lessons,
      }
      return { getAllProfileInstructorMentor }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const getStaffAdminLesson = createAsyncThunk(
  'staffAdmin/getStaffAdminLesson',
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/v1/staff/admin/get/lessons/by/groupId?groupId=${props.id}`,
      })

      const staffAdminLesson = {
        groupName: null,
        staffAdminLesson: [],
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const item of response) {
        // eslint-disable-next-line no-restricted-syntax
        for (const elem of item.materials) {
          // eslint-disable-next-line no-restricted-syntax
          for (const el of item.assignments) {
            // eslint-disable-next-line no-await-in-loop
            const responseAssiment = await ApiFetch({
              url: `api/v1/staff/admin/assigment/id/find/student/submission?assigmentId=${el.id}`,
            })
            staffAdminLesson.groupName = item.courseOrGroupName
            const dateString = el.created
            const dateObject = new Date(dateString)
            const dateAddOne =
              dateObject.getMonth() < 10
                ? `0${dateObject.getMonth() + 1}`
                : dateObject.getMonth() + 1
            const formattedDate = `${dateObject.toLocaleString('en-US', {
              day: '2-digit',
            })}.${dateAddOne}.${dateObject.getFullYear()}`

            staffAdminLesson.staffAdminLesson.push({
              lessonId: item?.lesson?.id,
              materialsId: elem?.id,
              assignmentsId: el?.id,
              text: item?.lesson?.title,
              title: elem?.title,
              urlLesson: elem?.youtube,
              lesson: el?.title,
              date: formattedDate,
              votedStudents: el.countSubmission,
              students: [...responseAssiment.responseStudents],
            })
          }
        }
      }

      return { staffAdminLesson }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getStaffAdminHomeWorkStudent = createAsyncThunk(
  'staffAdmin/getStaffAdminHomeWorkStudent',
  // eslint-disable-next-line consistent-return
  async (props, { rejectWithValue }) => {
    try {
      const response = await ApiFetch({
        url: `api/v1/staff/admin/get/by/id/check/submission?submissionId=${props.submissionId}&assigmentId=${props.assigmentId}`,
      })
      const homeWorkId = {
        studentName: response.studentName,
        homeWorkArray: [],
        answer: [],
      }
      homeWorkId.homeWorkArray.push({
        taskTitle: response.titleAssigment,
        img: response.photo,
      })
      homeWorkId.answer.push({
        taskTitle: response.submissionResponse?.text,
        img: response?.submissionResponse?.file,
      })
      return { homeWorkId }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const staffAdminSlice = createSlice({
  name: 'staffAdminSlice',
  initialState: {
    cardCouses: [],
    statusgetAllCouseCard: null,
    getProfileStaffAdmin: {},
    statusgetProfile: null,
    getFindTeachers: [],
    statusFindTeacher: null,
    statusFindTeacherData: [],
    getStudentIdRainting: {
      groupName: '',
      getGroupBiId: [],
    },
    statusGroupBiId: null,
    getProfileInstructorMentor: {
      profileInstructorOrMentor: {},
      lesson: [],
      statusInstructorMentor: null,
    },
    getStaffAdminLesson: {
      groupName: null,
      staffAdminLesson: [],
    },
    getStaffAdminLessonStatus: null,
    getStaffAdminHomeWorkStudent: {
      studentName: null,
      homeWorkArray: [],
      answer: [],
    },
    getStaffAdminHomeWorkStudentStatus: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // staffAdminStudent
    builder
      .addCase(getAllCouseCardStaffAdmin.pending, (state) => {
        state.getAllCouseCardStaffAdmin = 'pending'
      })
      .addCase(getAllCouseCardStaffAdmin.fulfilled, (state, action) => {
        state.statusgetAllCouseCard = 'success'
        state.cardCouses = action.payload?.getAllCouseStaffAdmin
      })
      .addCase(getAllCouseCardStaffAdmin.rejected, (state) => {
        state.statusgetAllCouseCard = 'error'
      })
      // staffAdming get profile
      .addCase(getProfileStaffAdmin.pending, (state) => {
        state.statusgetProfile = 'pending'
      })
      .addCase(getProfileStaffAdmin.fulfilled, (state, action) => {
        state.statusgetProfile = 'success'
        state.getProfileStaffAdmin = action.payload?.getProfileStaffAdmin
      })
      .addCase(getProfileStaffAdmin.rejected, (state) => {
        state.statusgetProfile = 'error'
      })
      // staffAdminGroup
      .addCase(getStudentStaffAdmin.pending, (state) => {
        state.statusFindTeacher = 'pending'
      })
      .addCase(getStudentStaffAdmin.fulfilled, (state, action) => {
        state.statusFindTeacher = 'succes'
        state.statusFindTeacherData = action.payload?.getFindAllTeacehrs
      })
      .addCase(getStudentStaffAdmin.rejected, (state) => {
        state.statusFindTeacher = 'error'
      })
      // staffAdminStudentsId
      .addCase(getRatingGroupById.pending, (state) => {
        state.statusGroupBiId = 'pending'
      })
      .addCase(getRatingGroupById.fulfilled, (state, action) => {
        state.statusGroupBiId = 'succes'
        state.getStudentIdRainting.getGroupBiId =
          action.payload?.getRaitingBiId.groups
        state.getStudentIdRainting.groupName =
          action.payload?.getRaitingBiId.groupName
      })
      .addCase(getRatingGroupById.rejected, (state) => {
        state.statusGroupBiId = 'error'
      })
      // get profile instructor mentor
      .addCase(getProfileInstructorMentor.pending, (state) => {
        state.getProfileInstructorMentor.statusInstructorMentor = 'pending'
      })
      .addCase(getProfileInstructorMentor.fulfilled, (state, action) => {
        state.getProfileInstructorMentor.statusInstructorMentor = 'success'
        state.getProfileInstructorMentor.profileInstructorOrMentor =
          action.payload.getAllProfileInstructorMentor.groupsProfil
        state.getProfileInstructorMentor.lesson =
          action.payload.getAllProfileInstructorMentor.lesson
      })
      .addCase(getProfileInstructorMentor.rejected, (state) => {
        state.getProfileInstructorMentor.statusInstructorMentor = 'error'
      })
      // get staff admin lesson
      .addCase(getStaffAdminLesson.pending, (state) => {
        state.getStaffAdminLessonStatus = 'pending'
      })
      .addCase(getStaffAdminLesson.fulfilled, (state, action) => {
        state.getStaffAdminLessonStatus = 'success'
        state.getStaffAdminLesson.staffAdminLesson =
          action.payload.staffAdminLesson.staffAdminLesson
        state.getStaffAdminLesson.groupName =
          action.payload.staffAdminLesson.groupName
      })
      .addCase(getStaffAdminLesson.rejected, (state) => {
        state.getStaffAdminLessonStatus = 'error'
        state.getStaffAdminLesson.lesson = []
      })
      // get staff Admin home work id student
      .addCase(getStaffAdminHomeWorkStudent.pending, (state) => {
        state.getStaffAdminHomeWorkStudentStatus = 'pending'
      })
      .addCase(getStaffAdminHomeWorkStudent.fulfilled, (state, action) => {
        state.getStaffAdminHomeWorkStudentStatus = 'success'
        state.getStaffAdminHomeWorkStudent.answer =
          action.payload.homeWorkId.answer
        state.getStaffAdminHomeWorkStudent.homeWorkArray =
          action.payload.homeWorkId.homeWorkArray
        state.getStaffAdminHomeWorkStudent.studentName =
          action.payload.homeWorkId.studentName
      })
      .addCase(getStaffAdminHomeWorkStudent.rejected, (state) => {
        state.getStaffAdminHomeWorkStudentStatus = 'error'
        state.getStaffAdminHomeWorkStudentArray = []
      })
  },
})

export const staffAdminAction = staffAdminSlice.actions
export default staffAdminSlice
