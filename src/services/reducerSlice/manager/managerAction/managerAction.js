import { createSlice } from '@reduxjs/toolkit'
import {
  managerGetProfile,
  managerGetAllGroups,
  managerGetStudents,
  managerStudentProfile,
  managerGetNotifications,
  managerPostNotificationSelect,
  managerBlockUser,
  managerInstructorMentor,
  managerInstructorMentorPutUnBlockOrBlock,
  managerInstructorMentorProfile,
} from '../managerSlice/managerSlice'

const managerSlice = createSlice({
  name: 'managerSlice',
  initialState: {
    status: null,
    statusblock: null,
    Insuccess: false,
    managerCard: [],
    error: null,
    managerProfile: {},
    managerStudentsStatus: null,
    managerStudents: [],
    managerStudentProfile: {
      email: null,
      profileImg: null,
      studentProfileArray: [],
      studentProfileRegister: [],
    },
    managerStudentProfleStatus: null,
    managerNotifications: [],
    managerNotificationsStatus: null,
    managerInstructorMentorArray: [],
    managerInstructorMentorStatus: null,
    managerInstructorMentorSnackBar: {
      managerStatusBlockOrUnBlock: null,
      open: false,
      status: null,
    },
    instructorMentorProfile: {
      profileImg: null,
      email: null,
      lessonNames: [],
      tableNames: [],
      status: null,
    },
  },

  reducers: {
    snackBarClose(state, action) {
      state.Insuccess = action.payload.Isuccess
      state.status = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(managerGetAllGroups.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(managerGetAllGroups.fulfilled, (state, action) => {
        state.loading = 'success'
        state.managerCard = action.payload?.managerCardGroup
      })
      .addCase(managerGetAllGroups.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.payload?.error.message
      })
      // get profile
      .addCase(managerGetProfile.pending, (state) => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(managerGetProfile.fulfilled, (state, action) => {
        state.loading = 'success'
        state.managerProfile = action.payload?.managerProfile
      })
      .addCase(managerGetProfile.rejected, (state, action) => {
        state.loading = 'error'
        state.error = action.payload?.error.message
      })
      // managerStudents
      .addCase(managerGetStudents.pending, (state) => {
        state.managerStudentsStatus = 'pending'
      })
      .addCase(managerGetStudents.fulfilled, (state, action) => {
        state.managerStudentsStatus = 'success'
        state.managerStudents = action.payload?.managerStudents
      })
      .addCase(managerGetStudents.rejected, (state, action) => {
        state.managerStudentsStatus = 'error'
        state.error = action.payload?.error.message
      })
      // manager student profile
      .addCase(managerStudentProfile.pending, (state) => {
        state.managerStudentProfleStatus = 'pending'
      })
      .addCase(managerStudentProfile.fulfilled, (state, action) => {
        state.managerStudentProfleStatus = 'success'
        state.managerStudentProfile.email = action.payload.studentProfile.email
        state.managerStudentProfile.profileImg =
          action.payload.studentProfile.profileImg
        state.managerStudentProfile.studentProfileArray =
          action.payload.studentProfile.studentProfileArray
        state.managerStudentProfile.studentProfileRegister =
          action.payload.studentProfile.studentProfileRegister
      })
      .addCase(managerStudentProfile.rejected, (state) => {
        state.managerStudentProfleStatus = 'error'
        state.managerStudentProfile.studentProfileArray = []
        state.managerStudentProfile.studentProfileRegister = []
      })

      // managerNotifications
      .addCase(managerGetNotifications.pending, (state) => {
        state.managerNotificationsStatus = 'pending'
      })
      .addCase(managerGetNotifications.fulfilled, (state, action) => {
        state.managerNotificationsStatus = 'success'
        state.managerNotifications = action.payload.managerNotifications
      })
      .addCase(managerGetNotifications.rejected, (state, action) => {
        state.managerNotificationsStatus = 'error'
        state.error = action.payload?.error.message
      })
      // managerNotificationsSelected
      .addCase(managerPostNotificationSelect.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(managerPostNotificationSelect.fulfilled, (state) => {
        state.Insuccess = true
        state.status = 'success'
      })
      .addCase(managerPostNotificationSelect.rejected, (state) => {
        state.status = 'error'
        state.Insuccess = true
      })
      // managerNotificationBlock
      .addCase(managerBlockUser.pending, (state) => {
        state.statusblock = 'pending'
      })
      .addCase(managerBlockUser.fulfilled, (state) => {
        state.Insuccess = true
        state.statusblock = 'success'
      })
      .addCase(managerBlockUser.rejected, (state) => {
        state.statusblock = 'error'
        state.Insuccess = true
      })
      // get manager instructor mentor
      // managerInstructorMentor
      .addCase(managerInstructorMentor.pending, (state) => {
        state.managerInstructorMentorStatus = 'pending'
      })
      .addCase(managerInstructorMentor.fulfilled, (state, action) => {
        state.managerInstructorMentorStatus = 'success'
        state.managerInstructorMentorArray =
          action.payload.instructorMentorArray
      })
      .addCase(managerInstructorMentor.rejected, (state) => {
        state.managerInstructorMentorStatus = 'error'
        state.managerInstructorMentorArray = []
      })
      // managerInstructorMentorPutUnBlockOrBlock
      .addCase(managerInstructorMentorPutUnBlockOrBlock.pending, (state) => {
        state.managerInstructorMentorSnackBar.managerInstructorMentorStatusBlockOrUnBlock =
          'pending'
        state.managerInstructorMentorSnackBar.open = false
      })
      .addCase(
        managerInstructorMentorPutUnBlockOrBlock.fulfilled,
        (state, action) => {
          state.managerInstructorMentorSnackBar.managerStatusBlockOrUnBlock =
            action.payload.successBlock
          state.managerInstructorMentorSnackBar.managerStatusBlockOrUnBlock =
            action.payload.successUnblock
          state.managerInstructorMentorSnackBar.open = true
          state.managerInstructorMentorSnackBar.status = 'success'
        }
      )
      .addCase(managerInstructorMentorPutUnBlockOrBlock.rejected, (state) => {
        state.managerInstructorMentorSnackBar.managerInstructorMentorStatusBlockOrUnBlock =
          'error'
        state.managerInstructorMentorSnackBar.open = true
      })
      // managerInstructorMentorProfile
      .addCase(managerInstructorMentorProfile.pending, (state) => {
        state.instructorMentorProfile.status = 'pending'
      })
      .addCase(managerInstructorMentorProfile.fulfilled, (state, action) => {
        state.instructorMentorProfile.status = 'success'
        state.instructorMentorProfile.email =
          action.payload.instructorMentorProfile.email
        state.instructorMentorProfile.lessonNames =
          action.payload.instructorMentorProfile.lessonNames
        state.instructorMentorProfile.profileImg =
          action.payload.instructorMentorProfile.profileImg
        state.instructorMentorProfile.tableNames =
          action.payload.instructorMentorProfile.tableNames
      })
      .addCase(managerInstructorMentorProfile.rejected, (state) => {
        state.instructorMentorProfile.status = 'error'
        state.instructorMentorProfile.email = ''
        state.instructorMentorProfile.lessonNames = []
        state.instructorMentorProfile.profileImg = ''
        state.instructorMentorProfile.tableNames = []
      })
  },
})

export const managerAction = managerSlice.actions
export default managerSlice
