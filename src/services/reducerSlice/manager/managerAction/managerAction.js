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
  managerCreatedGroup,
  managerStaffAdmin,
  managerStaffAdminPutBlockOrUnBlock,
  getManagerSeoAdmin,
  managerSeoAdminBlockOrUnBlock,
  getAllManagerGroup,
  managerAddToStudents,
  managerGetStudentGroups,
  managerDeleteStudentGroups,
  managerAddToGroupMetorInstructors,
  managerProfileGet,
  deleteGroupManager,
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
      managerStatusBlock: null,
      managerStatusUnBlock: null,
      status: null,
    },
    instructorMentorProfile: {
      profileImg: null,
      email: null,
      lessonNames: [],
      tableNames: [],
      status: null,
    },
    managerCreatedGroupStatus: null,
    snackBarCreatedGroup: {
      open: false,
    },
    managerStaffAdmin: [],
    managerStaffAdminStatus: null,
    statusStaffAdmin: null,
    managerStaffAdminStatusBlock: null,
    managerStaffAdminStatusUnBlock: null,
    managerStaffAdminOpen: false,
    managerSeoAdmin: {
      seoAdmin: [],
      status: null,
      seoAdminStatus: null,
      statusBlock: null,
      statusUnBlock: null,
      open: false,
    },
    getAllGroup: {
      group: [],
      status: null,
      statusAddGroups: null,
      open: false,
    },
    SnackBarStatus: null,
    SnackBarOpen: false,
    managerStudentGroupStatus: null,
    managerStudentGroup: {
      group: '',
      students: [],
    },
    deleteStudentGroup: false,
    deleteStudentGroupStatus: null,
    headerNotificationStatus: null,
    headerNotification: false,
    mentorInstructoraddToGroupStatus: null,
    mentorInstructoraddToGroup: false,
    managerProfileGet: {
      profileImg: null,
      profile: [],
      status: null,
    },
    deleteGroup: {
      deleteStatus: null,
      open: false,
    },
  },

  reducers: {
    snackBarClose(state, action) {
      state.Insuccess = action.payload.Isuccess
      state.status = action.payload.status
    },
    snackBarCloseCreatedGroup(state, action) {
      state.snackBarCreatedGroup.open = action.payload.open
      state.managerCreatedGroupStatus = action.payload.status
    },
    snackBarCloseStaffAdmin(state, action) {
      state.statusStaffAdmin = action.payload.status
      state.managerStaffAdminOpen = action.payload.open
    },
    snackBarCloseSeoAdmin(state, action) {
      state.managerSeoAdmin.open = action.payload.open
      state.managerSeoAdmin.seoAdminStatus = action.payload.status
    },
    snackBarCloseAddGroup(state, action) {
      state.getAllGroup.open = action.payload.open
      state.getAllGroup.statusAddGroups = action.payload.status
    },
    snackBarCloseInstructorMentor(state, action) {
      state.SnackBarOpen = action.payload.SnackBarOpen
      state.SnackBarStatus = action.payload.SnackBarStatus
    },
    snackBarCloseStudentGroup(state, action) {
      state.deleteStudentGroup = action.payload.deleteStudentGroup
      state.deleteStudentGroupStatus = action.payload.deleteStudentGroupStatus
    },
    snackBarCloseHeaderNotification(state, action) {
      state.headerNotification = action.payload.headerNotification
      state.headerNotificationStatus = action.payload.headerNotificationStatus
    },
    snackBarCloseAddToMentorInstructor(state, action) {
      state.mentorInstructoraddToGroup =
        action.payload.mentorInstructoraddToGroup
      state.mentorInstructoraddToGroupStatus =
        action.payload.mentorInstructoraddToGroupStatus
    },
    snackBarDeleteGroupClose(state, action) {
      state.deleteGroup.open = action.payload.open
      state.deleteGroup.deleteStatus = action.payload.deleteStatus
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
        state.headerNotificationStatus = 'pending'
      })
      .addCase(managerPostNotificationSelect.fulfilled, (state) => {
        state.headerNotificationStatus = 'success'
        state.headerNotification = true
      })
      .addCase(managerPostNotificationSelect.rejected, (state) => {
        state.headerNotificationStatus = 'error'
        state.headerNotification = true
      })
      // managerNotificationBlock
      .addCase(managerBlockUser.pending, (state) => {
        state.statusblock = 'pending'
      })
      .addCase(managerBlockUser.fulfilled, (state) => {
        state.headerNotification = true
        state.statusblock = 'success'
      })
      .addCase(managerBlockUser.rejected, (state) => {
        state.statusblock = 'error'
        state.headerNotification = true
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
      // // managerInstructorMentorPutUnBlockOrBlock
      .addCase(managerInstructorMentorPutUnBlockOrBlock.pending, (state) => {
        state.managerInstructorMentorSnackBar.status = 'pending'
        state.SnackBarStatus = 'pending'
      })
      .addCase(
        managerInstructorMentorPutUnBlockOrBlock.fulfilled,
        (state, action) => {
          state.managerInstructorMentorSnackBar.managerStatusBlock =
            action.payload.successBlock
          state.managerInstructorMentorSnackBar.managerStatusUnBlock =
            action.payload.successUnblock
          state.managerInstructorMentorSnackBar.status = 'success'
          state.SnackBarOpen = true
          state.SnackBarStatus = 'success'
        }
      )
      .addCase(managerInstructorMentorPutUnBlockOrBlock.rejected, (state) => {
        state.managerInstructorMentorSnackBar.managerStatusBlock = 'error'
        state.managerInstructorMentorSnackBar.managerStatusUnBlock = 'error'
        state.managerInstructorMentorSnackBar.status = 'error'
        state.SnackBarStatus = 'error'
        state.SnackBarOpen = true
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
      // manager created group
      .addCase(managerCreatedGroup.pending, (state) => {
        state.managerCreatedGroupStatus = 'pending'
      })
      .addCase(managerCreatedGroup.fulfilled, (state) => {
        state.managerCreatedGroupStatus = 'success'
        state.snackBarCreatedGroup.open = true
      })
      .addCase(managerCreatedGroup.rejected, (state) => {
        state.managerCreatedGroupStatus = 'error'
        state.snackBarCreatedGroup.open = true
      })
      // manager staff admin get
      .addCase(managerStaffAdmin.pending, (state) => {
        state.managerStaffAdminStatus = 'pending'
      })
      .addCase(managerStaffAdmin.fulfilled, (state, action) => {
        state.managerStaffAdminStatus = 'success'
        state.managerStaffAdmin = action.payload.staffAdminArray
      })
      .addCase(managerStaffAdmin.rejected, (state) => {
        state.managerStaffAdminStatus = 'error'
        state.managerStaffAdmin = []
      })
      // mananger put block unblock
      .addCase(managerStaffAdminPutBlockOrUnBlock.pending, (state) => {
        state.statusStaffAdmin = 'pending'
      })
      .addCase(
        managerStaffAdminPutBlockOrUnBlock.fulfilled,
        (state, action) => {
          state.statusStaffAdmin = 'success'
          state.managerStaffAdminStatusBlock = action.payload.block
          state.managerStaffAdminStatusUnBlock = action.payload.unblock
          state.managerStaffAdminOpen = true
        }
      )
      .addCase(managerStaffAdminPutBlockOrUnBlock.rejected, (state) => {
        state.statusStaffAdmin = 'error'
        state.managerStaffAdminOpen = true
        state.managerStaffAdminStatusBlock = 'error'
        state.managerStaffAdminStatusUnBlock = 'error'
      })
      // getManagerSeoAdmin
      .addCase(getManagerSeoAdmin.pending, (state) => {
        state.managerSeoAdmin.status = 'pending'
      })
      .addCase(getManagerSeoAdmin.fulfilled, (state, action) => {
        state.managerSeoAdmin.status = 'success'
        state.managerSeoAdmin.seoAdmin = action.payload.seoAdminArray
      })
      .addCase(getManagerSeoAdmin.rejected, (state) => {
        state.managerSeoAdmin.status = 'error'
        state.managerSeoAdmin.seoAdmin = []
      })
      // managerSeoAdminBlockOrUnBlock
      .addCase(managerSeoAdminBlockOrUnBlock.pending, (state) => {
        state.managerSeoAdmin.seoAdminStatus = 'pending'
      })
      .addCase(managerSeoAdminBlockOrUnBlock.fulfilled, (state, action) => {
        state.managerSeoAdmin.seoAdminStatus = 'success'
        state.managerSeoAdmin.open = true
        state.managerSeoAdmin.statusBlock = action.payload.block
        state.managerSeoAdmin.statusUnBlock = action.payload.unblock
      })
      .addCase(managerSeoAdminBlockOrUnBlock.rejected, (state) => {
        state.managerSeoAdmin.seoAdminStatus = 'error'
        state.managerSeoAdmin.open = true
        state.managerSeoAdmin.statusBlock = 'error'
        state.managerSeoAdmin.statusUnBlock = 'error'
      })
      // get all manager group
      .addCase(getAllManagerGroup.pending, (state) => {
        state.getAllGroup.status = 'pending'
      })
      .addCase(getAllManagerGroup.fulfilled, (state, action) => {
        state.getAllGroup.status = 'success'
        state.getAllGroup.group = action.payload.group
      })
      .addCase(getAllManagerGroup.rejected, (state) => {
        state.getAllGroup.status = 'error'
      })
      // managerAddToStudents
      .addCase(managerAddToStudents.pending, (state) => {
        state.getAllGroup.statusAddGroups = 'pending'
      })
      .addCase(managerAddToStudents.fulfilled, (state) => {
        state.getAllGroup.statusAddGroups = 'success'
        state.getAllGroup.open = true
      })
      .addCase(managerAddToStudents.rejected, (state) => {
        state.getAllGroup.statusAddGroups = 'error'
        state.getAllGroup.open = true
      })
      // manager Student Group
      .addCase(managerGetStudentGroups.pending, (state) => {
        state.managerStudentGroupStatus = 'pending'
      })
      .addCase(managerGetStudentGroups.fulfilled, (state, action) => {
        state.managerStudentGroupStatus = 'success'
        state.managerStudentGroup.group = action.payload?.groupId.group
        state.managerStudentGroup.students = action.payload?.groupId.studentdata
      })
      .addCase(managerGetStudentGroups.rejected, (state) => {
        state.managerStudentGroupStatus = 'error'
      })
      // manager Delete StudentGroup
      .addCase(managerDeleteStudentGroups.pending, (state) => {
        state.deleteStudentGroupStatus = 'pending'
      })
      .addCase(managerDeleteStudentGroups.fulfilled, (state) => {
        state.deleteStudentGroupStatus = 'success'
        state.deleteStudentGroup = true
      })
      .addCase(managerDeleteStudentGroups.rejected, (state) => {
        state.deleteStudentGroupStatus = 'error'
        state.deleteStudentGroup = true
      })
      // managerMetorInstructor addto group
      .addCase(managerAddToGroupMetorInstructors.pending, (state) => {
        state.mentorInstructoraddToGroupStatus = 'pending'
      })
      .addCase(managerAddToGroupMetorInstructors.fulfilled, (state) => {
        state.mentorInstructoraddToGroupStatus = 'success'
        state.mentorInstructoraddToGroup = true
      })
      .addCase(managerAddToGroupMetorInstructors.rejected, (state) => {
        state.mentorInstructoraddToGroupStatus = 'error'
        state.mentorInstructoraddToGroup = true
      })
      // get manager profile
      .addCase(managerProfileGet.pending, (state) => {
        state.managerProfileGet.status = 'pending'
      })
      .addCase(managerProfileGet.fulfilled, (state, action) => {
        state.managerProfileGet.profileImg = action.payload.profile.profileImg
        state.managerProfileGet.profile = action.payload.profile.profile
      })
      .addCase(managerProfileGet.rejected, (state) => {
        state.managerProfileGet.status = 'error'
      })
      // delete group
      .addCase(deleteGroupManager.fulfilled, (state) => {
        state.deleteGroup.deleteStatus = 'success'
        state.deleteGroup.open = true
      })
      .addCase(deleteGroupManager.rejected, (state) => {
        state.deleteGroup.deleteStatus = 'error'
        state.deleteGroup.open = true
      })
  },
})

export const managerAction = managerSlice.actions
export default managerSlice
